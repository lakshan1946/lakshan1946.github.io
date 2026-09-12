import { exploreItems } from "@/content";

export function JourneyGallery() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {exploreItems.map((item) => (
        <li
          key={item.id}
          className="relative overflow-hidden border border-border bg-surface p-6"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-accent">
            {item.kind}
            {item.placeholder && (
              <span className="placeholder-tag">Placeholder</span>
            )}
          </p>
          <h3 className="mt-3 text-xl tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
          {item.place && (
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
              {item.place}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
