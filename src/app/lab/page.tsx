import { LabShowcase } from "@/components/LabShowcase";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "LAB",
  description:
    "Experimental and academic work, including MRI super-resolution research.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <PageShell
      eyebrow="Research & experiments"
      title="LAB"
      description="Academic and experimental work — where learning turns into tangible investigation."
    >
      <LabShowcase />
    </PageShell>
  );
}
