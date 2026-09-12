import { JourneyGallery } from "@/components/JourneyGallery";
import { PageShell } from "@/components/PageShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "EXPLORE",
  description:
    "Travel, motorcycle journeys, reviews, places, and day-to-day special moments.",
  path: "/explore",
});

export default function ExplorePage() {
  return (
    <PageShell
      eyebrow="Lifestyle / journey"
      title="EXPLORE"
      description="Personal and lifestyle content — connected to the creator identity, clearly separate from professional engineering work."
    >
      <JourneyGallery />
    </PageShell>
  );
}
