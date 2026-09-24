import { projectSchema, type Project } from "./schemas";

/**
 * Public-safe project case studies only.
 * Do not add confidential architecture, internal URLs, customers, or unpublished details.
 */
export const projects: Project[] = [
  projectSchema.parse({
    slug: "trustnex",
    title: "TrustNEX",
    tagline: "Compliance management platform",
    role: "Associate Software Engineer",
    problem:
      "Frameworks, controls, policies, evidence, and audits lived in different places. There was no app that kept them together for a customer.",
    solution:
      "TrustNEX is that app. One tenant can run frameworks, controls, policies, documents, tests, and evidence. MSPs get their own dashboard. Admins handle onboarding, imports, and reports.",
    contribution:
      "Built it from scratch between Oct 2025 and May 2026, then kept it as a software engineer. The React app, the Node API, and the Postgres schema were all part of the job. Screens cover frameworks, controls, policies, documents, and tests, plus evidence upload, password reset, notifications, customer onboarding, admin CSV import, mappings, an activity log, and reports. It went to QA, then production.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "TanStack Query",
      "Zod",
      "Node.js",
      "PostgreSQL",
      "Drizzle",
      "Docker",
    ],
    outcomes: [
      "TrustNEX is in QA and production.",
      "UI, API, database, and release were all part of this work.",
    ],
    architectureNotes:
      "React on Vite. Node API. Postgres through Drizzle. Admin, MSP, Portal, and Auth use the same API.",
    practices: [
      "Tables and a migration come before the feature. Queries go through Drizzle.",
      "Routes take the HTTP call. Controllers stay thin. Services hold the rules. Repositories run SQL.",
      "Zod checks the input. TypeScript types the response. A breaking change gets a new API version.",
      "Login is a server session. Roles are checked there. The tenant id comes from the session.",
      "A change is finished when auth, tenant checks, validation, and any migration are in.",
      "Wrote the design notes and the API doc, tested the endpoints, then released to QA and production.",
    ],
    published: true,
    redact: false,
    featured: true,
    placeholder: false,
  }),
  projectSchema.parse({
    slug: "cloudnex",
    title: "CloudNEX",
    tagline: "Multi-cloud security and compliance checks",
    role: "Software Engineer",
    problem:
      "Scans across cloud accounts and Microsoft 365 took too long, and the findings were awkward to filter by framework.",
    solution:
      "CloudNEX already scans AWS, Azure, GCP, Kubernetes, and Microsoft 365. You start a scan in the web app and read the findings there.",
    contribution:
      "Joined the existing product in Sep 2025. Most of the work is from Jun 2026. Got scans running, spent time on why AWS scans were slow, added Microsoft 365 checks for Defender, Entra, and Intune, and updated the compliance filters and audit tables.",
    stack: [
      "Python",
      "AWS",
      "Azure",
      "GCP",
      "Kubernetes",
      "Microsoft 365",
    ],
    outcomes: [
      "AWS scans finish in less time.",
      "Microsoft 365 checks and framework filters are in the product.",
    ],
    architectureNotes:
      "The web app starts a check, stores the findings, and filters them by framework. This work was scan time, Microsoft 365 checks, filters, and the audit tables.",
    published: true,
    redact: false,
    featured: true,
    placeholder: false,
  }),
  projectSchema.parse({
    slug: "botnex",
    title: "BotNEX",
    tagline: "Security scanning and assessment workflows",
    role: "Software Engineering Intern",
    problem:
      "Scans had no schedule, weak live status, and reports that were hard to hand over.",
    solution:
      "BotNEX is the scan app. You set a target, exclude scope, schedule a run, watch it, and export CSV, PDF, or Word.",
    contribution:
      "Main internship project, Dec 2024 to May 2025. Built the scan, schedule, and history screens, dark mode, and login (signup, password reset, email check). Dashboard charts come from the API. Reports export to CSV, PDF, and Word. Added Yup checks, tests, and moved page logic into services.",
    stack: [
      "React",
      "Redux",
      "Material UI",
      "Tailwind",
      "Django",
      "Python",
      "REST APIs",
      "WebSockets",
      "Docker",
      "Yup",
    ],
    outcomes: [
      "Scan, schedule, reports, dashboard, and login shipped on the live product.",
      "Pages have tests, Yup checks, and less logic sitting in the components.",
    ],
    architectureNotes:
      "React calls a Django API for scans, schedules, history, and reports. Progress comes over WebSockets and stays on screen if you change pages.",
    published: true,
    redact: false,
    featured: true,
    placeholder: false,
  }),
  projectSchema.parse({
    slug: "agentnex",
    title: "AgentNEX",
    tagline: "Device management with live monitoring and remote operations",
    role: "Software Engineering Intern",
    problem:
      "There was no clear screen for devices, installed software, or who in an org could see them.",
    solution:
      "AgentNEX is the device app. Admins see devices and software. Org admins manage orgs, admins, and device tokens. A device agent registers with the API.",
    contribution:
      "Started in Feb 2025. Most of the internship work was Apr–May. Built the Next.js shell (sidebar, navbar, device list) and hooked it to the API for devices and software. Added role checks, org and admin screens, device tokens, and handling for an expired access token.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Rust",
    ],
    outcomes: [
      "Device and admin screens talk to the real API.",
      "Org admins can manage orgs, admins, and device tokens from the UI.",
    ],
    architectureNotes:
      "Next.js dashboard, FastAPI backend, device agent for registration. Live updates use WebSockets.",
    published: true,
    redact: false,
    featured: true,
    placeholder: false,
  }),
];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published && !p.redact);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}
