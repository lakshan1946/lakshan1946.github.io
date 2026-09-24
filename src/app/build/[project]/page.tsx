import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getProjectBySlug, getPublishedProjects } from "@/content";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ project: string }>;
};

export async function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.tagline,
    path: `/build/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell
      eyebrow="Case study"
      title={project.title}
      description={project.tagline}
    >
      {project.placeholder && (
        <p className="mb-8 text-sm text-accent">
          Placeholder content — verify and replace before public launch. Sensitive
          employer details intentionally omitted.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-6">
        <p className="text-sm text-foreground">{project.role}</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <section className="border border-border bg-surface p-5 md:p-6">
          <h2 className="text-xs uppercase tracking-[0.16em] text-accent">
            Problem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
            {project.problem}
          </p>
        </section>
        <section className="border border-border bg-surface p-5 md:p-6">
          <h2 className="text-xs uppercase tracking-[0.16em] text-accent">
            Solution
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
            {project.solution}
          </p>
        </section>
      </div>

      <section className="mt-3 border border-border bg-surface p-5 md:p-6">
        <h2 className="text-xs uppercase tracking-[0.16em] text-accent">
          Contribution
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/90 md:text-base">
          {project.contribution}
        </p>
        {project.architectureNotes && (
          <p className="mt-4 max-w-3xl border-t border-border pt-4 text-sm leading-relaxed text-muted">
            {project.architectureNotes}
          </p>
        )}
      </section>

      {project.practices && project.practices.length > 0 && (
        <section className="mt-12" aria-labelledby="practices-heading">
          <h2
            id="practices-heading"
            className="text-2xl tracking-tight md:text-3xl"
          >
            Engineering practices
          </h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.practices.map((practice, index) => (
              <li
                key={practice}
                className="border border-border bg-surface p-5"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {practice}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-12" aria-labelledby="outcomes-heading">
        <h2
          id="outcomes-heading"
          className="text-2xl tracking-tight md:text-3xl"
        >
          Outcomes
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {project.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="border-t border-border pt-4 text-sm leading-relaxed text-muted md:text-base"
            >
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      {project.links && project.links.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-4 text-sm">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-12">
        <Link
          href="/build"
          className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Back to BUILD
        </Link>
      </p>
    </PageShell>
  );
}
