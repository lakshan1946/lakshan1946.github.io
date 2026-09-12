import { labItems } from "@/content";

export function LabShowcase() {
  return (
    <ul className="space-y-10">
      {labItems.map((item) => (
        <li key={item.id} className="border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            Research / Lab
            {item.placeholder && (
              <span className="placeholder-tag">Placeholder</span>
            )}
          </p>
          <h3 className="mt-2 text-2xl tracking-tight md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-3xl text-muted">{item.summary}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed md:text-base">
            <span className="font-medium">Approach. </span>
            {item.approach}
          </p>
          <div className="mt-5">
            <h4 className="text-xs uppercase tracking-[0.16em] text-muted">
              Constraints
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {item.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
