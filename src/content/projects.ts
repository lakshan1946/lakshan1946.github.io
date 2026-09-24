import { projectSchema, type Project } from "./schemas";

/**
 * Public-safe project case studies only.
 * Do not add confidential architecture, internal URLs, customers, or unpublished details.
 */
export const projects: Project[] = [
  projectSchema.parse({
    slug: "botnex",
    title: "BotNEX",
    tagline: "Security scanning and assessment workflows",
    role: "Software Engineering Intern",
    problem:
      "Security teams need scheduled, visible assessment flows — not one-off manual scans with little progress feedback or reusable reporting.",
    solution:
      "A product platform for vulnerability assessment: scan setup, scheduling, scope control, live scan status, dashboards, and exportable reports.",
    contribution:
      "Primary internship focus (Dec 2024 – May 2025). Shipped product UI for scan workflows, scheduling, and scope exclusion; redesigned auth (login, signup, password reset, email verification) and dark mode; built CVE and scan-history views with lazy loading and skeletons; integrated assessment-data UI and CSV / PDF / Word report generation; wired dashboard charts to backend data; fixed scan-in-progress state across navigation; and raised quality with Yup validation, unit/integration tests, SonarQube fixes, and service-layer refactors.",
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
      "Shipped scan, schedule, report, dashboard, and auth work on a live security product.",
      "Improved frontend maintainability through tests, validation, and clearer service boundaries.",
    ],
    architectureNotes:
      "Public-facing product description only. Internal scan-engine and deployment details omitted.",
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
      "Operators need a controlled way to see devices, software inventory, and organization access — not ad-hoc scripts or unscoped admin tools.",
    solution:
      "A device-management platform with admin and org dashboards, backend APIs, and a device agent path for registration and operations.",
    contribution:
      "Ramped from a Feb 2025 kickoff; heavier delivery in Apr–May. Built the Next.js dashboard shell (sidebar, navbar, devices); integrated backend APIs for device and software lists; implemented frontend role-based access; added org-admin surfaces for organizations, admins, and device tokens; handled access-token expiry and auth redirects; and structured API/service layers for consistent frontend–backend contracts.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Rust",
    ],
    outcomes: [
      "Delivered first usable AgentNEX admin and device surfaces wired to real APIs.",
      "Established role-aware frontend flows for org and device administration.",
    ],
    architectureNotes:
      "Public-facing product description only. Agent internals and deployment details omitted.",
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
