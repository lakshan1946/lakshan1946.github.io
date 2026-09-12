import { LatestContentGrid } from "@/components/LatestContentGrid";
import { PageShell } from "@/components/PageShell";
import { SocialSignals } from "@/components/SocialSignals";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "SOCIAL",
  description:
    "Public social signals across YouTube, Instagram, Facebook, and TikTok — supporting multiple identities per platform.",
  path: "/social",
});

export default function SocialPage() {
  return (
    <PageShell
      eyebrow="Public signals"
      title="SOCIAL"
      description="Designed for two identities per platform. Live metrics sync through official APIs when credentials are configured; otherwise profile links remain available."
    >
      <SocialSignals />
      <section className="mt-12" aria-labelledby="latest-social-heading">
        <h2
          id="latest-social-heading"
          className="mb-4 text-2xl tracking-tight"
        >
          Latest content
        </h2>
        <LatestContentGrid />
      </section>
    </PageShell>
  );
}
