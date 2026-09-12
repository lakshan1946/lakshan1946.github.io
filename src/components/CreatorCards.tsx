import { creators } from "@/content";

export function CreatorCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {creators.map((creator) => (
        <li
          key={creator.id}
          className="flex flex-col border border-border bg-surface p-6"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-accent">
            {creator.focus}
          </p>
          <h3 className="mt-3 text-2xl tracking-tight">{creator.name}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted">
            {creator.tagline}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
            {creator.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {creator.pillars.map((p) => (
              <li
                key={p}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs"
              >
                {p}
              </li>
            ))}
          </ul>
          <a
            href={`/create/${creator.slug}`}
            className="mt-6 inline-flex text-sm text-accent underline-offset-4 hover:underline"
          >
            Enter {creator.name} →
          </a>
        </li>
      ))}
    </ul>
  );
}
