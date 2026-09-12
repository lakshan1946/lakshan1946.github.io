import { capabilitySchema, type Capability } from "./schemas";

export const capabilities: Capability[] = [
  capabilitySchema.parse({
    id: "full-stack",
    label: "Full-stack systems",
    description:
      "Connecting product interfaces to reliable backend services end to end.",
    relatedProjectSlugs: ["trustnex", "botnex"],
  }),
  capabilitySchema.parse({
    id: "interfaces",
    label: "Product interfaces",
    description:
      "Building clear, usable product surfaces for complex security and compliance workflows.",
    relatedProjectSlugs: ["botnex", "trustnex"],
  }),
  capabilitySchema.parse({
    id: "backend",
    label: "Backend services",
    description:
      "Designing APIs and service boundaries that support real operational workflows.",
    relatedProjectSlugs: ["botnex"],
  }),
  capabilitySchema.parse({
    id: "cloud",
    label: "Cloud infrastructure",
    description:
      "Deploying and operating applications with cloud-aware constraints and reliability in mind.",
    relatedProjectSlugs: ["trustnex", "botnex"],
  }),
  capabilitySchema.parse({
    id: "automation",
    label: "Automation",
    description:
      "Turning repetitive security and compliance work into dependable automated flows.",
    relatedProjectSlugs: ["trustnex"],
  }),
];
