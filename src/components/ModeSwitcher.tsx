"use client";

import { modeLabels, siteModes, type SiteMode } from "@/content";
import { useMode } from "@/lib/mode";
import { cn } from "@/lib/utils";

export function ModeSwitcher() {
  const { mode, setMode } = useMode();

  return (
    <div
      role="group"
      aria-label="Site mode"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="mr-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
        Mode
      </span>
      {siteModes.map((m: SiteMode) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={active}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
              active
                ? "border-accent bg-accent text-background"
                : "border-border bg-transparent text-muted hover:border-foreground hover:text-foreground",
            )}
          >
            {modeLabels[m]}
          </button>
        );
      })}
    </div>
  );
}
