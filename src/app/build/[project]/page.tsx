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

      <dl className="grid gap-8 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted">Role</dt>
          <dd className="mt-2">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted">Stack</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-10 space-y-6 text-base leading-relaxed">
        <section>
          <h2 className="text-xl tracking-tight">Problem</h2>
          <p className="mt-2 text-muted">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-xl tracking-tight">Solution</h2>
          <p className="mt-2 text-muted">{project.solution}</p>
        </section>
        <section>
          <h2 className="text-xl tracking-tight">Contribution</h2>
          <p className="mt-2 text-muted">{project.contribution}</p>
        </section>
        {project.architectureNotes && (
          <section>
            <h2 className="text-xl tracking-tight">Architecture notes</h2>
            <p className="mt-2 text-muted">{project.architectureNotes}</p>
          </section>
        )}
        <section>
          <h2 className="text-xl tracking-tight">Outcomes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {project.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      </div>

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
