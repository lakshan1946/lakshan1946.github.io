import { capabilitySchema, type Capability } from "./schemas";

export const capabilities: Capability[] = [
  capabilitySchema.parse({
    id: "interfaces",
    label: "Product interfaces",
    description:
      "Building React, Next.js, and Vite surfaces for compliance workflows, scan dashboards, and device administration.",
    relatedProjectSlugs: ["trustnex", "botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "backend",
    label: "Backend services",
    description:
      "Designing Node, Django, and FastAPI services for compliance data, reporting, scheduling, and device inventory.",
    relatedProjectSlugs: ["trustnex", "botnex", "agentnex"],
  }),
  capabilitySchema.parse({
    id: "compliance",
    label: "Compliance product engineering",
    description:
      "Shipping frameworks, controls, policies, evidence, and audits as a full product — from schema to production.",
    relatedProjectSlugs: ["trustnex", "cloudnex"],
  }),
  capabilitySchema.parse({
    id: "cloud-security",
    label: "Cloud security checks",
    description:
      "Contributing to multi-cloud and Microsoft 365 assessments, scan performance, and compliance filters.",
    relatedProjectSlugs: ["cloudnex"],
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
      "Running and releasing Dockerized services so local product work matches how systems ship.",
    relatedProjectSlugs: ["trustnex", "botnex", "agentnex"],
  }),
];
