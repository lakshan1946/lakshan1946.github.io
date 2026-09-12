"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
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

const springConfig = { stiffness: 160, damping: 24, mass: 0.5 };

/** Ring radius as a fraction of half the stage size (matches inset %). */
const OUTER_RING_RADIUS = 0.64; // inset 18%
const INNER_RING_RADIUS = 0.36; // inset 32%

function proximityToRing(normalizedDist: number, ringRadius: number): number {
  const falloff = 0.28;
  return Math.max(0, 1 - Math.abs(normalizedDist - ringRadius) / falloff);
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

  const outerMix = useMotionValue(0);
  const innerMix = useMotionValue(0);
  const outerMixSpring = useSpring(outerMix, springConfig);
  const innerMixSpring = useSpring(innerMix, springConfig);
  const outerBorderColor = useMotionTemplate`color-mix(in srgb, var(--accent) ${outerMixSpring}%, var(--border))`;
  const innerBorderColor = useMotionTemplate`color-mix(in srgb, var(--accent) ${innerMixSpring}%, var(--border))`;

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

    // Rings tint toward accent when the cursor is near that ring.
    outerMix.set(proximityToRing(dist, OUTER_RING_RADIUS) * 85);
    innerMix.set(proximityToRing(dist, INNER_RING_RADIUS) * 85);
  }

  function handlePointerLeave() {
    outerMix.set(0);
    innerMix.set(0);
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
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[18%] rounded-full border"
            style={
              reduce
                ? { borderColor: "var(--border)" }
                : { borderColor: outerBorderColor }
            }
            initial={reduce ? false : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[32%] rounded-full border border-dashed"
            style={
              reduce
                ? { borderColor: "var(--border)" }
                : { borderColor: innerBorderColor }
            }
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
