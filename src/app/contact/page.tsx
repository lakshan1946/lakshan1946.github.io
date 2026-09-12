import { ContactPanel } from "@/components/ContactPanel";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "CONTACT",
  description:
    "Work contact via email and LinkedIn, plus Lakshan Madhusanka and LakzJourney social channels.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Reach out"
      title="CONTACT"
      description="Work inquiries through professional channels. Creator content under two separate identities."
    >
      <ContactPanel />
    </PageShell>
  );
}
