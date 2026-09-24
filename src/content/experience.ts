import { experienceItemSchema, type ExperienceItem } from "./schemas";

export const experience: ExperienceItem[] = [
  experienceItemSchema.parse({
    id: "ivedha-se",
    title: "Software Engineer",
    organization: "iVedha",
    period: "Jun 2026 to present",
    summary:
      "I still own TrustNEX and now spend part of my time on CloudNEX.",
    highlights: [
      "Moved TrustNEX email to a no reply address and let one user belong to more than one customer.",
      "Fixed evidence and policy bugs in TrustNEX after the release.",
      "Got CloudNEX scans running again and found why AWS scans were slow.",
      "Added Microsoft 365 checks for Defender, Entra and Intune and updated the compliance filters.",
    ],
    published: true,
    redact: false,
  }),
  experienceItemSchema.parse({
    id: "ivedha-ase",
    title: "Associate Software Engineer",
    organization: "iVedha",
    period: "Jun 2025 to May 2026",
    summary:
      "I kept working on BotNEX and AgentNEX, then built TrustNEX on my own from the first commit.",
    highlights: [
      "Built TrustNEX from scratch. I wrote the React app, the Node API and the Postgres schema and took it to production.",
      "Added frameworks, controls, policies, documents, tests, evidence upload and an MSP dashboard.",
      "Added multi tenancy, notifications, customer onboarding, CSV import for admins, an activity log and reports.",
      "Kept fixing BotNEX and AgentNEX and built the agent download flow.",
    ],
    published: true,
    redact: false,
  }),
  experienceItemSchema.parse({
    id: "ivedha-intern",
    title: "Software Engineering Intern",
    organization: "iVedha",
    period: "Dec 2024 to May 2025",
    summary:
      "Six months on BotNEX and AgentNEX. Most of my time went into the BotNEX frontend.",
    highlights: [
      "Built the BotNEX scan, schedule and scan history pages, dark mode and the login and password reset flows.",
      "Added CSV, PDF and Word reports and the dashboard charts.",
      "Added lazy loading, loading skeletons, Yup validation and unit tests to the frontend.",
      "Built the first AgentNEX dashboard in Next.js and connected it to the device and software APIs.",
    ],
    published: true,
    redact: false,
  }),
].filter((item) => item.published && !item.redact);
