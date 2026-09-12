import { capabilities } from "@/content";

export function CapabilityFlow() {
  return (
    <section aria-labelledby="capabilities-heading">
      <h2
        id="capabilities-heading"
        className="text-2xl tracking-tight md:text-3xl"
      >
        Technical capabilities
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Technologies appear in context — how they are used, not a wall of logos.
      </p>
      <ol className="mt-8 flex flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch">
        {capabilities.map((cap, index) => (
          <li
            key={cap.id}
            className="relative flex-1 border-t border-border py-5 md:min-w-[12rem] md:border-t-0 md:border-l md:px-5 md:py-0 md:first:border-l-0 md:first:pl-0"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg tracking-tight">{cap.label}</h3>
            <p className="mt-2 text-sm text-muted">{cap.description}</p>
            {index < capabilities.length - 1 && (
              <span
                aria-hidden
                className="mt-3 hidden text-accent md:mt-0 md:block md:absolute md:-right-2 md:top-1"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
