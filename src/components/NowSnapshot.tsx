import Link from "next/link";
import { nowItems } from "@/content";
import { formatDate } from "@/lib/utils";

export function NowSnapshot({
  limit,
  showLink = true,
}: {
  limit?: number;
  showLink?: boolean;
}) {
  const items = limit ? nowItems.slice(0, limit) : nowItems;
  const latest = nowItems
    .map((i) => i.updatedAt)
    .sort()
    .at(-1);

  return (
    <section aria-labelledby="now-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="identity-line text-accent">Living snapshot</p>
          <h2 id="now-heading" className="mt-2 text-3xl tracking-tight md:text-4xl">
            Right now
          </h2>
        </div>
        {latest && (
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Updated {formatDate(latest)}
          </p>
        )}
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.category}
            className="border-t border-border pt-4"
          >
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              {item.label}
              {item.placeholder && (
                <span className="placeholder-tag">Placeholder</span>
              )}
            </dt>
            <dd className="mt-2 text-base leading-relaxed">{item.detail}</dd>
          </div>
        ))}
      </dl>

      {showLink && (
        <Link
          href="/now"
          className="inline-flex text-sm text-accent underline-offset-4 hover:underline"
        >
          View full snapshot →
        </Link>
      )}
    </section>
  );
}
