import { capabilitySchema, type Capability } from "./schemas";

export const capabilities: Capability[] = [
  capabilitySchema.parse({
    id: "interfaces",
    label: "Product interfaces",
    description:
      "Building clear React and Next.js surfaces for scan workflows, dashboards, and device administration.",
    relatedProjectSlugs: ["botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "backend",
    label: "Backend services",
    description:
      "Working with Django and FastAPI APIs that power reporting, scheduling, and device inventory.",
    relatedProjectSlugs: ["botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "realtime",
    label: "Real-time systems",
    description:
      "Keeping scan progress and device state visible with WebSockets and live UI updates.",
    relatedProjectSlugs: ["botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "containers",
    label: "Cloud and containers",
    description:
      "Running and integrating Dockerized services so local product work matches how systems ship.",
    relatedProjectSlugs: ["botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "security-product",
    label: "Security product engineering",
    description:
      "Shipping assessment and device-control features with attention to auth, roles, and public-safe delivery.",
    relatedProjectSlugs: ["botnex", "agentnex"],
  }),
];
