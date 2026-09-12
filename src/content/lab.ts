import { labItemSchema, type LabItem } from "./schemas";

export const labItems: LabItem[] = [
  labItemSchema.parse({
    id: "mri-super-resolution",
    title: "Lightweight 3D Generator for MRI Super Resolution",
    summary:
      "Final-year research exploring generative approaches for 3D MRI super-resolution under compute and preprocessing constraints.",
    approach:
      "Investigated a lightweight 3D generative / vision approach for MRI super-resolution, balancing quality against practical compute limits and preprocessing needs.",
    constraints: [
      "3D medical imaging volume and memory pressure",
      "Compute budget for training and inference",
      "Preprocessing pipeline complexity",
    ],
    tags: ["Research", "Medical imaging", "Generative AI", "Computer vision"],
    published: true,
    placeholder: true,
  }),
];
