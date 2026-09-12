import { ContactPanel } from "@/components/ContactPanel";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "CONTACT",
  description:
    "Reach Lakshan Madhusanka for work, collaborations, or creator conversations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Reach out"
      title="CONTACT"
      description="Open for roles, collaborations, and conversations. Use professional channels for work — or follow a creator identity below."
    >
      <ContactPanel />
    </PageShell>
  );
}
