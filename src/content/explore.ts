import { exploreItemSchema, type ExploreItem } from "./schemas";

export const exploreItems: ExploreItem[] = [
  exploreItemSchema.parse({
    id: "ride-roads",
    title: "Road stories",
    kind: "ride",
    summary:
      "PLACEHOLDER: Motorcycle journeys and the quiet lessons that come with long stretches of road.",
    published: true,
    placeholder: true,
  }),
  exploreItemSchema.parse({
    id: "travel-places",
    title: "Places & journeys",
    kind: "travel",
    summary:
      "PLACEHOLDER: Travel fragments — destinations, people, and moments worth keeping.",
    published: true,
    placeholder: true,
  }),
  exploreItemSchema.parse({
    id: "gear-reviews",
    title: "Reviews",
    kind: "review",
    summary:
      "PLACEHOLDER: Honest takes on gear, products, and experiences from the road and daily life.",
    published: true,
    placeholder: true,
  }),
  exploreItemSchema.parse({
    id: "day-moments",
    title: "Day-to-day specials",
    kind: "moment",
    summary:
      "PLACEHOLDER: Small moments that feel bigger than they look — inspiration from ordinary days.",
    published: true,
    placeholder: true,
  }),
].filter((i) => i.published);
