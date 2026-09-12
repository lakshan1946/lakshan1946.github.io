import { experience } from "@/content";

export function BuildTimeline() {
  return (
    <ol className="relative space-y-10 border-l border-border pl-6">
      {experience.map((item) => (
        <li key={item.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-[1.7rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
          />
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {item.period}
          </p>
          <h3 className="mt-1 text-xl tracking-tight">
            {item.title}{" "}
            <span className="text-muted">· {item.organization}</span>
          </h3>
          <p className="mt-2 max-w-2xl text-muted">{item.summary}</p>
          {item.highlights && item.highlights.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
