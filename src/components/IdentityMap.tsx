"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, type PointerEvent } from "react";
import { dimensions } from "@/content";
import { useMode, withMode } from "@/lib/mode";
import { cn } from "@/lib/utils";

/**
 * Nodes sit on the outer ring (inset ~18% → radius ~32% from center).
 * Cardinal points: EDUCATE top, CREATE bottom, EXPLORE left, BUILD right.
 */
const radialSlots: {
  id: "educate" | "explore" | "build" | "create";
  className: string;
  enter: { x: number; y: number };
}[] = [
  {
    id: "educate",
    className: "left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2",
    enter: { x: 0, y: 20 },
  },
  {
    id: "create",
    className: "left-1/2 top-[82%] -translate-x-1/2 -translate-y-1/2",
    enter: { x: 0, y: -20 },
  },
  {
    id: "explore",
    className: "left-[18%] top-1/2 -translate-x-1/2 -translate-y-1/2",
    enter: { x: 20, y: 0 },
  },
  {
    id: "build",
    className: "left-[82%] top-1/2 -translate-x-1/2 -translate-y-1/2",
    enter: { x: -20, y: 0 },
  },
];

const springConfig = { stiffness: 90, damping: 28, mass: 0.55 };
const angleSpringConfig = { stiffness: 70, damping: 22, mass: 0.5 };

/** Ring radius in a 100×100 viewBox (matches CSS inset %). */
const OUTER_R = 32; // inset 18%
const INNER_R = 18; // inset 32%
const OUTER_RING_NORM = OUTER_R / 50;
const INNER_RING_NORM = INNER_R / 50;
const HIGHLIGHT_DEG = 48;

function circumference(radius: number) {
  return 2 * Math.PI * radius;
}

function arcLength(radius: number) {
  return circumference(radius) * (HIGHLIGHT_DEG / 360);
}

function proximityToRing(normalizedDist: number, ringRadius: number): number {
  const falloff = 0.22;
  return Math.max(0, 1 - Math.abs(normalizedDist - ringRadius) / falloff);
}

/** Keep angle continuous so it never jumps the long way around the circle. */
function unwrapDegrees(previous: number, next: number): number {
  const prevNorm = ((previous % 360) + 360) % 360;
  const nextNorm = ((next % 360) + 360) % 360;
  let delta = nextNorm - prevNorm;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return previous + delta;
}

function CursorRing({
  radius,
  dashed,
  opacity,
  dashOffset,
  reduce,
}: {
  radius: number;
  dashed?: boolean;
  opacity: ReturnType<typeof useSpring>;
  dashOffset: ReturnType<typeof useTransform> | ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const c = circumference(radius);
  const arc = arcLength(radius);

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      initial={reduce ? false : { opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth="0.4"
        strokeDasharray={dashed ? "2.2 2.4" : undefined}
        opacity={dashed ? 0.65 : 0.75}
      />
      {!reduce && (
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeDasharray={`${arc} ${c - arc}`}
          style={{ strokeDashoffset: dashOffset, opacity }}
        />
      )}
    </motion.svg>
  );
}

export function IdentityMap({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const pathname = usePathname();
  const { mode, orderedDimensions, reducedMotion: modeReduced } = useMode();
  const prefersReduced = useReducedMotion();
  const reduce = Boolean(prefersReduced || modeReduced);
  const stageRef = useRef<HTMLDivElement>(null);
  const continuousAngleRef = useRef<number | null>(null);

  const outerOpacity = useMotionValue(0);
  const innerOpacity = useMotionValue(0);
  const angleDegrees = useMotionValue(0);
  const outerOpacitySpring = useSpring(outerOpacity, springConfig);
  const innerOpacitySpring = useSpring(innerOpacity, springConfig);
  const angleSpring = useSpring(angleDegrees, angleSpringConfig);

  const outerC = circumference(OUTER_R);
  const innerC = circumference(INNER_R);
  const outerArc = arcLength(OUTER_R);
  const innerArc = arcLength(INNER_R);

  // Derive dash offsets from one continuous angle — no wrap jumps.
  const outerOffsetSpring = useTransform(
    angleSpring,
    (deg) => -(deg / 360) * outerC + outerArc / 2,
  );
  const innerOffsetSpring = useTransform(
    angleSpring,
    (deg) => -(deg / 360) * innerC + innerArc / 2,
  );

  const ordered = orderedDimensions
    .map((id) => dimensions.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const secondary = ordered.filter(
    (d) => !radialSlots.some((slot) => slot.id === d.id),
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const half = Math.min(rect.width, rect.height) / 2;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy) / half;

    // SVG stroke starts at 3 o'clock; atan2 matches that (0 = right).
    const rawDegrees = (Math.atan2(dy, dx) * 180) / Math.PI;
    const previous = continuousAngleRef.current;
    const smoothDegrees =
      previous === null ? rawDegrees : unwrapDegrees(previous, rawDegrees);
    continuousAngleRef.current = smoothDegrees;
    angleDegrees.set(smoothDegrees);

    outerOpacity.set(proximityToRing(dist, OUTER_RING_NORM));
    innerOpacity.set(proximityToRing(dist, INNER_RING_NORM));
  }

  function handlePointerLeave() {
    outerOpacity.set(0);
    innerOpacity.set(0);
    // Keep last angle so re-entry doesn't spin the wrong way.
  }

  return (
    <nav
      aria-label="Identity map"
      className={cn("w-full", variant === "full" ? "mt-10 md:mt-14" : "mt-6")}
    >
      <div className="relative mx-auto hidden max-w-3xl md:block">
        <div
          ref={stageRef}
          className="relative mx-auto grid aspect-square max-w-xl place-items-center"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <CursorRing
            radius={OUTER_R}
            opacity={outerOpacitySpring}
            dashOffset={outerOffsetSpring}
            reduce={reduce}
          />
          <CursorRing
            radius={INNER_R}
            dashed
            opacity={innerOpacitySpring}
            dashOffset={innerOffsetSpring}
            reduce={reduce}
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="relative z-10"
          >
            <Link
              href={withMode("/", mode)}
              className="block rounded-full border border-border bg-surface px-6 py-4 text-center shadow-sm focus-visible:outline-offset-4"
            >
              <span className="font-display block text-2xl tracking-tight">
                LAKSHAN
              </span>
              <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                identity map
              </span>
            </Link>
          </motion.div>

          {radialSlots.map((slot, index) => {
            const dim = dimensions.find((d) => d.id === slot.id);
            if (!dim) return null;
            const active = pathname.startsWith(dim.href);
            return (
              <div key={dim.id} className={cn("absolute z-10", slot.className)}>
                <motion.div
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          x: slot.enter.x,
                          y: slot.enter.y,
                          scale: 0.9,
                        }
                  }
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.28 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  <Link
                    href={withMode(dim.href, mode)}
                    className={cn(
                      "block min-w-28 rounded-full border px-4 py-2 text-center text-sm font-medium tracking-wide transition-colors",
                      active
                        ? "border-accent bg-accent text-background"
                        : "border-border bg-surface text-foreground hover:border-accent hover:text-accent",
                    )}
                  >
                    {dim.label}
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.ul
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.06,
                delayChildren: reduce ? 0 : 0.55,
              },
            },
          }}
        >
          {secondary.map((dim) => {
            const active = pathname.startsWith(dim.href);
            return (
              <motion.li
                key={dim.id}
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={withMode(dim.href, mode)}
                  className={cn(
                    "inline-flex rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:border-foreground hover:text-foreground",
                  )}
                >
                  {dim.label}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <motion.ul
        className="grid gap-2 md:hidden"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: reduce ? 0 : 0.05 },
          },
        }}
      >
        {ordered.map((dim) => {
          const active = pathname.startsWith(dim.href);
          return (
            <motion.li
              key={dim.id}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -10 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <Link
                href={withMode(dim.href, mode)}
                className={cn(
                  "flex items-baseline justify-between gap-4 rounded-lg border px-4 py-3 transition-colors",
                  active
                    ? "border-accent bg-accent/10"
                    : "border-border bg-surface hover:border-accent-soft",
                )}
              >
                <span className="text-sm font-semibold tracking-[0.12em]">
                  {dim.label}
                </span>
                <span className="max-w-[55%] text-right text-xs text-muted">
                  {dim.blurb}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
