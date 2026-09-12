"use client";

import Link from "next/link";
import { useState } from "react";
import { dimensions } from "@/content";
import { ModeSwitcher } from "./ModeSwitcher";
import { useMode, withMode } from "@/lib/mode";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { mode } = useMode();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href={withMode("/", mode)}
          className="text-sm font-semibold tracking-[0.12em]"
        >
          LAKSHAN
        </Link>

        <div className="hidden lg:block">
          <ModeSwitcher />
        </div>

        <button
          type="button"
          className="rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-[0.14em] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-6xl space-y-4 px-5 py-4 sm:px-8">
          <ModeSwitcher />
          <ul className="grid gap-2">
            {dimensions.map((d) => (
              <li key={d.id}>
                <Link
                  href={withMode(d.href, mode)}
                  className="block rounded-md border border-border px-3 py-2 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
