import { nowItemSchema, type NowItem } from "./schemas";

/**
 * Update this file to refresh the living snapshot — no layout changes needed.
 * Mark unfinished items with placeholder: true.
 */
export const nowItems: NowItem[] = [
  nowItemSchema.parse({
    category: "building",
    label: "Building",
    detail: "PLACEHOLDER: TrustNEX / current engineering work at iVedha.",
    updatedAt: "2026-09-12",
    placeholder: true,
  }),
  nowItemSchema.parse({
    category: "learning",
    label: "Learning",
    detail: "PLACEHOLDER: 3D medical imaging, generative AI, and related research topics.",
    updatedAt: "2026-09-12",
    placeholder: true,
  }),
  nowItemSchema.parse({
    category: "working",
    label: "Working",
    detail: "Software Engineer @ iVedha",
    updatedAt: "2026-09-12",
    placeholder: false,
  }),
  nowItemSchema.parse({
    category: "creating",
    label: "Creating",
    detail: "PLACEHOLDER: LakzJourney lifestyle content and Lakshan Madhusanka educational videos.",
    updatedAt: "2026-09-12",
    placeholder: true,
  }),
  nowItemSchema.parse({
    category: "exploring",
    label: "Exploring",
    detail: "PLACEHOLDER: Travel, motorcycle rides, reviews, and experiences.",
    updatedAt: "2026-09-12",
    placeholder: true,
  }),
  nowItemSchema.parse({
    category: "shipping",
    label: "Shipping",
    detail: "PLACEHOLDER: Latest public release or completed milestone.",
    updatedAt: "2026-09-12",
    placeholder: true,
  }),
];
