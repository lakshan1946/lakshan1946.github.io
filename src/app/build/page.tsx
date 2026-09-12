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
    "Engineering work by Lakshan Madhusanka — experience, projects, and technical capabilities.",
  path: "/build",
});

export default function BuildPage() {
  const projects = getPublishedProjects();

  return (
    <PageShell
      eyebrow="Engineering"
      title="BUILD"
      description="Things actually built, shipped, improved, or researched — not a résumé clone."
    >
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
