import { notFound } from "next/navigation";
import { CreatorIdentitySwitcher } from "@/components/CreatorIdentitySwitcher";
import { LatestContentGrid } from "@/components/LatestContentGrid";
import { PageShell } from "@/components/PageShell";
import { SocialSignals } from "@/components/SocialSignals";
import { creators, getCreatorBySlug } from "@/content";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ identity: string }>;
};

export function generateStaticParams() {
  return creators.map((c) => ({ identity: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { identity } = await params;
  const creator = getCreatorBySlug(identity);
  if (!creator) return {};
  return createMetadata({
    title: creator.name,
    description: creator.description,
    path: `/create/${creator.slug}`,
  });
}

export default async function CreatorIdentityPage({ params }: Props) {
  const { identity } = await params;
  const creator = getCreatorBySlug(identity);
  if (!creator) notFound();

  return (
    <PageShell
      eyebrow="CREATE"
      title={creator.name}
      description={creator.description}
    >
      <p className="mb-6 text-xs uppercase tracking-[0.14em] text-muted">
        {creator.tagline}
      </p>
      <CreatorIdentitySwitcher />
      <ul className="mt-8 flex flex-wrap gap-2">
        {creator.pillars.map((p) => (
          <li
            key={p}
            className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.12em]"
          >
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-12 space-y-12">
        <SocialSignals identity={creator.id} />
        <section aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className="mb-4 text-2xl tracking-tight"
          >
            Latest content
          </h2>
          <LatestContentGrid identity={creator.id} />
        </section>
      </div>
    </PageShell>
  );
}
