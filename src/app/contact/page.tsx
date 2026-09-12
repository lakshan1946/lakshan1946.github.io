import { ContactPanel } from "@/components/ContactPanel";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "CONTACT",
  description:
    "Professional contact, social links, and ways to reach Lakshan Madhusanka.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Reach out"
      title="CONTACT"
      description="Professional contact and social presence — easy to find for recruiters and collaborators."
    >
      <ContactPanel />
    </PageShell>
  );
}
