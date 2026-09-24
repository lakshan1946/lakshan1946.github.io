import Link from "next/link";
import { BuildTimeline } from "@/components/BuildTimeline";
import { CapabilityFlow } from "@/components/CapabilityFlow";
import { PageShell } from "@/components/PageShell";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { getPublishedProjects } from "@/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "BUILD",
  description:
    "Engineering experience, projects, and skills — internship and shipped product work by Lakshan Madhusanka.",
  path: "/build",
});

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux",
  "Tailwind",
  "Material UI",
  "Django",
  "FastAPI",
  "Python",
  "Rust",
  "REST APIs",
  "WebSockets",
  "Docker",
  "Yup",
];

export default function BuildPage() {
  const projects = getPublishedProjects();

  return (
    <PageShell
      eyebrow="Engineering"
      title="BUILD"
      description="Internship and shipped product work — experience, projects, and the skills behind them. Built for recruiters who arrive from a CV."
    >
      <section aria-labelledby="skills-heading" className="mb-12 md:mb-16">
        <h2
          id="skills-heading"
          className="text-xs uppercase tracking-[0.16em] text-muted"
        >
          Skills in use
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-sm text-foreground/90"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience-heading" className="space-y-6">
        <h2 id="experience-heading" className="text-2xl tracking-tight md:text-3xl">
          Work experience
        </h2>
        <BuildTimeline />
      </section>

      <section
        aria-labelledby="projects-heading"
        className="mt-16 space-y-6 md:mt-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="projects-heading"
            className="text-2xl tracking-tight md:text-3xl"
          >
            Projects
          </h2>
          <Link
            href="/lab"
            className="text-sm text-accent underline-offset-4 hover:underline"
          >
            Visit LAB →
          </Link>
        </div>
        <ProjectShowcase projects={projects} />
      </section>

      <div className="mt-16 md:mt-20">
        <CapabilityFlow />
      </div>
    </PageShell>
  );
}
