import { experienceItemSchema, type ExperienceItem } from "./schemas";

export const experience: ExperienceItem[] = [
  experienceItemSchema.parse({
    id: "ivedha-se",
    title: "Software Engineer",
    organization: "iVedha",
    period: "Jun 2025 – Present",
    summary:
      "Continued at iVedha after the internship — full-time product engineering. Detailed Associate / SE work coming next.",
    highlights: [],
    published: true,
    redact: false,
  }),
  experienceItemSchema.parse({
    id: "ivedha-intern",
    title: "Software Engineering Intern",
    organization: "iVedha",
    period: "Dec 2024 – May 2025",
    summary:
      "Six-month product internship across two security and operations platforms — BotNEX and AgentNEX — shipping UI, APIs, and reporting features on live products.",
    highlights: [
      "Built and shipped BotNEX product UI: scan workflows, scheduling, scope exclusion, dashboards, dark mode, and auth (login, signup, password reset, email verification).",
      "Added scan reporting (CSV / PDF / Word) and history views, plus dashboard charts wired to backend data.",
      "Raised frontend quality: lazy loading, loading skeletons, Yup validation, unit/integration tests, SonarQube fixes, and service-layer refactors.",
      "Stood up the AgentNEX dashboard (Next.js) and connected it to backend APIs for devices, software inventory, organizations, and role-based access.",
    ],
    published: true,
    redact: false,
  }),
].filter((item) => item.published && !item.redact);
