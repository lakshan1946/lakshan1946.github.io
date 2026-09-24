import { nowItemSchema, type NowItem } from "./schemas";

/**
 * Update this file to refresh the living snapshot — no layout changes needed.
 */
export const nowItems: NowItem[] = [
  nowItemSchema.parse({
    category: "building",
    label: "Building",
    detail: "TrustNEX and CloudNEX at iVedha, alongside earlier BotNEX and AgentNEX work.",
    updatedAt: "2026-09-24",
  }),
  nowItemSchema.parse({
    category: "learning",
    label: "Learning",
    detail: "3D medical imaging, generative AI, and related research.",
    updatedAt: "2026-09-12",
  }),
  nowItemSchema.parse({
    category: "working",
    label: "Working",
    detail: "Software Engineer @ iVedha",
    updatedAt: "2026-09-12",
  }),
  nowItemSchema.parse({
    category: "creating",
    label: "Creating",
    detail:
      "LakzJourney lifestyle content and Lakshan Madhusanka educational videos.",
    updatedAt: "2026-09-12",
  }),
  nowItemSchema.parse({
    category: "exploring",
    label: "Exploring",
    detail: "Travel, motorcycle rides, reviews, and experiences.",
    updatedAt: "2026-09-12",
  }),
  nowItemSchema.parse({
    category: "shipping",
    label: "Shipping",
    detail: "This identity platform — lakshan.me.",
    updatedAt: "2026-09-12",
  }),
];
