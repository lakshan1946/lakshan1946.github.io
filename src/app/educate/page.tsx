import { PageShell } from "@/components/PageShell";
import { educateItems } from "@/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "EDUCATE",
  description:
    "Technical education and knowledge-sharing from Lakshan Madhusanka.",
  path: "/educate",
});

export default function EducatePage() {
  return (
    <PageShell
      eyebrow="Knowledge layer"
      title="EDUCATE"
      description="Educational content as another expression of the same person — programming, technology, and clear explanations."
    >
      <ul className="space-y-8">
        {educateItems.map((item) => (
          <li key={item.id} className="border-t border-border pt-6">
            <h2 className="text-xl tracking-tight md:text-2xl">
              {item.title}
              {item.placeholder && (
                <span className="placeholder-tag">Placeholder</span>
              )}
            </h2>
            <p className="mt-3 max-w-3xl text-muted">{item.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm text-accent underline-offset-4 hover:underline"
              >
                Watch / read →
              </a>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
