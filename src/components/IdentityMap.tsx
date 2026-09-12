"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dimensions } from "@/content";
import { useMode, withMode } from "@/lib/mode";
import { cn } from "@/lib/utils";

/** Spatial order matching the identity map diagram: top, left, right, bottom */
const radialSlots: {
  id: "educate" | "explore" | "build" | "create";
  className: string;
}[] = [
  { id: "educate", className: "left-1/2 top-[2%] -translate-x-1/2" },
  { id: "explore", className: "left-[2%] top-1/2 -translate-y-1/2" },
  { id: "build", className: "right-[2%] top-1/2 -translate-y-1/2" },
  { id: "create", className: "bottom-[2%] left-1/2 -translate-x-1/2" },
];

export function IdentityMap({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const pathname = usePathname();
  const { mode, orderedDimensions } = useMode();

  const ordered = orderedDimensions
    .map((id) => dimensions.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const secondary = ordered.filter(
    (d) => !radialSlots.some((slot) => slot.id === d.id),
  );

  return (
    <nav
      aria-label="Identity map"
      className={cn("w-full", variant === "full" ? "mt-10 md:mt-14" : "mt-6")}
    >
      <div className="relative mx-auto hidden max-w-3xl md:block">
        <div className="relative mx-auto grid aspect-square max-w-xl place-items-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[18%] rounded-full border border-border/70"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[32%] rounded-full border border-dashed border-border/50"
          />

          <Link
            href={withMode("/", mode)}
            className="relative z-10 rounded-full border border-border bg-surface px-6 py-4 text-center shadow-sm focus-visible:outline-offset-4"
          >
            <span className="font-display block text-2xl tracking-tight">
              LAKSHAN
            </span>
            <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              identity map
            </span>
          </Link>

          {radialSlots.map((slot) => {
            const dim = dimensions.find((d) => d.id === slot.id);
            if (!dim) return null;
            const active = pathname.startsWith(dim.href);
            return (
              <Link
                key={dim.id}
                href={withMode(dim.href, mode)}
                className={cn(
                  "absolute z-10 min-w-28 rounded-full border px-4 py-2 text-center text-sm font-medium tracking-wide transition-colors",
                  slot.className,
                  active
                    ? "border-accent bg-accent text-background"
                    : "border-border bg-surface text-foreground hover:border-accent hover:text-accent",
                )}
              >
                {dim.label}
              </Link>
            );
          })}
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {secondary.map((dim) => {
            const active = pathname.startsWith(dim.href);
            return (
              <li key={dim.id}>
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
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="grid gap-2 md:hidden">
        {ordered.map((dim) => {
          const active = pathname.startsWith(dim.href);
          return (
            <li key={dim.id}>
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
