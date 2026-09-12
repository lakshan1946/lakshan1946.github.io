import Link from "next/link";
import { creators, type Creator } from "@/content";
import { cn } from "@/lib/utils";

function CreatorMark({ focus }: { focus: Creator["focus"] }) {
  if (focus === "lifestyle") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden
        className="h-10 w-10"
      >
        <circle cx="14" cy="32" r="6" />
        <circle cx="34" cy="32" r="6" />
        <path d="M20 32h8M14 26l6-10h8l4 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 16h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
      className="h-10 w-10"
    >
      <rect x="8" y="10" width="32" height="24" rx="2" />
      <path d="M16 18h8M16 24h16M16 30h12" strokeLinecap="round" />
      <path d="M18 40h12" strokeLinecap="round" />
    </svg>
  );
}

export function CreatorCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {creators.map((creator, index) => (
        <li key={creator.id}>
          <Link
            href={`/create/${creator.slug}`}
            className={cn(
              "group relative flex h-full cursor-pointer flex-col overflow-hidden border border-border bg-surface p-6 outline-none transition-colors",
              "hover:border-accent/50 focus-visible:border-accent md:p-8",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-px bg-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {creator.focus}
                </p>
                <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
                  {creator.name}
                </h3>
              </div>
              <div className="flex flex-col items-end gap-3 text-muted transition-colors group-hover:text-foreground">
                <span className="text-[0.65rem] uppercase tracking-[0.18em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CreatorMark focus={creator.focus} />
              </div>
            </div>

            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {creator.tagline}
            </p>

            <p className="mt-5 max-w-md flex-1 text-sm leading-relaxed text-muted md:text-base">
              {creator.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {creator.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-full border border-border px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-foreground/80 transition-colors group-hover:border-accent/30"
                >
                  {pillar}
                </li>
              ))}
            </ul>

            <span className="mt-8 inline-flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-accent">
              Enter {creator.name}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
