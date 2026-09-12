import { NowSnapshot } from "@/components/NowSnapshot";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "RIGHT NOW",
  description:
    "A living snapshot of what Lakshan is building, learning, creating, and exploring.",
  path: "/now",
});

export default function NowPage() {
  return (
    <PageShell
      eyebrow="Living personal snapshot"
      title="RIGHT NOW"
      description="Replaces a static About Me. Update content in src/content/now.ts — no layout changes required."
    >
      <NowSnapshot showLink={false} />
    </PageShell>
  );
}
