import { creatorSchema, type Creator } from "./schemas";

export const creators: Creator[] = [
  creatorSchema.parse({
    id: "lakzJourney",
    name: "LakzJourney",
    slug: "lakzjourney",
    tagline: "RIDE · EXPLORE · EXPERIENCE · INSPIRE · REVIEW",
    pillars: ["Ride", "Explore", "Experience", "Inspire", "Review"],
    description:
      "Personal and lifestyle creator identity — travel, motorcycle journeys, reviews, day-to-day special moments, and inspiration.",
    focus: "lifestyle",
  }),
  creatorSchema.parse({
    id: "lakshanMadhusanka",
    name: "Lakshan Madhusanka",
    slug: "education",
    tagline: "CODE · TECHNOLOGY · LEARN · TEACH · EXPLAIN",
    pillars: ["Code", "Technology", "Learn", "Teach", "Explain"],
    description:
      "Educational and technical creator identity — programming, software engineering, technology explanations, and tutorials.",
    focus: "education",
  }),
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
