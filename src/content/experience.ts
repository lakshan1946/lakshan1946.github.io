import { experienceItemSchema, type ExperienceItem } from "./schemas";

export const experience: ExperienceItem[] = [
  experienceItemSchema.parse({
    id: "ivedha-se",
    title: "Software Engineer",
    organization: "iVedha",
    period: "Present",
    summary:
      "Building and shipping product software across full-stack systems, with a focus on secure, maintainable delivery.",
    highlights: [
      "Contributes to product platforms in the security and compliance space.",
      "Works across interfaces, services, and cloud deployment concerns.",
    ],
    published: true,
    redact: false,
  }),
  experienceItemSchema.parse({
    id: "ivedha-intern",
    title: "Software Engineering Intern",
    organization: "iVedha",
    period: "Earlier",
    summary:
      "Grew from internship into a full Software Engineer role through hands-on product delivery.",
    highlights: [
      "Learned production workflows, collaboration, and shipping cadence.",
    ],
    published: true,
    redact: false,
  }),
].filter((item) => item.published && !item.redact);
