import { projectSchema, type Project } from "./schemas";

/**
 * PLACEHOLDER: Project details are intentionally high-level and public-safe.
 * Replace with verified public descriptions before launch. Do not add confidential
 * iVedha architecture, internal URLs, customers, or unpublished details.
 */
export const projects: Project[] = [
  projectSchema.parse({
    slug: "trustnex",
    title: "TrustNEX",
    tagline: "Compliance and security automation platform",
    role: "Software Engineer",
    problem:
      "PLACEHOLDER: Organizations need reliable ways to manage compliance and security workflows without brittle, manual processes.",
    solution:
      "PLACEHOLDER: A product platform that automates compliance and security-related workflows, with thoughtful system design and cloud deployment.",
    contribution:
      "PLACEHOLDER: Contributed to product engineering across the stack—interfaces, services, and deployment concerns—while keeping details public-safe.",
    stack: ["Full-stack", "Cloud", "Automation", "Security"],
    outcomes: [
      "PLACEHOLDER: Shipped product features supporting compliance and security automation.",
      "PLACEHOLDER: Collaborated on system design and engineering decisions.",
    ],
    architectureNotes:
      "PLACEHOLDER: Architecture details redacted for public release. Update with approved public information only.",
    published: true,
    redact: false,
    featured: true,
    placeholder: true,
  }),
  projectSchema.parse({
    slug: "botnex",
    title: "BotNEX",
    tagline: "Vulnerability assessment and security platform",
    role: "Software Engineer",
    problem:
      "PLACEHOLDER: Security teams need clearer workflows for assessment, scheduling, and visibility into findings.",
    solution:
      "PLACEHOLDER: A security platform covering scanning workflows, APIs, dashboards, scheduling, and role-aware access.",
    contribution:
      "PLACEHOLDER: Worked on product interfaces, API surfaces, and operational concerns for vulnerability assessment flows.",
    stack: ["APIs", "Dashboards", "Scheduling", "Security", "Cloud"],
    outcomes: [
      "PLACEHOLDER: Supported scanning and assessment workflows.",
      "PLACEHOLDER: Helped shape role-based and scheduled operational features.",
    ],
    architectureNotes:
      "PLACEHOLDER: Sensitive deployment and customer details omitted.",
    published: true,
    redact: false,
    featured: true,
    placeholder: true,
  }),
  projectSchema.parse({
    slug: "moraconnect-unihub",
    title: "MoraConnect / UniHub",
    tagline: "Student-oriented platform concept",
    role: "Product & engineering contributor",
    problem:
      "PLACEHOLDER: Students need connected digital experiences that scale beyond a single campus workflow.",
    solution:
      "PLACEHOLDER: A student-oriented platform concept exploring product thinking, mobile direction, and scalability.",
    contribution:
      "PLACEHOLDER: Explored product direction, UX considerations, and scalable architecture thinking.",
    stack: ["Product thinking", "Mobile", "Scalability"],
    outcomes: [
      "PLACEHOLDER: Clarified product direction and mobile considerations.",
    ],
    published: true,
    redact: false,
    featured: false,
    placeholder: true,
  }),
];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published && !p.redact);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}
