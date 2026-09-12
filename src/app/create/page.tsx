import { CreatorCards } from "@/components/CreatorCards";
import { CreatorIdentitySwitcher } from "@/components/CreatorIdentitySwitcher";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "CREATE",
  description:
    "Creator ecosystem — LakzJourney lifestyle content and Lakshan Madhusanka educational channel.",
  path: "/create",
});

export default function CreatePage() {
  return (
    <PageShell
      eyebrow="Creator ecosystem"
      title="CREATE"
      description="Two sibling creator identities under one personal brand — lifestyle and education, not one channel with random categories."
    >
      <CreatorIdentitySwitcher />
      <div className="mt-10">
        <CreatorCards />
      </div>
    </PageShell>
  );
}
