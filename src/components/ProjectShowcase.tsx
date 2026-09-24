import Link from "next/link";
import type { Project } from "@/content";

export function ProjectShowcase({
  projects,
}: {
  projects: Project[];
  detailed?: boolean;
}) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/build/${project.slug}`}
            className="flex h-full flex-col border border-border bg-surface p-5 transition-colors hover:border-accent/50 md:p-6"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              {project.role}
              {project.placeholder && (
                <span className="placeholder-tag">Placeholder</span>
              )}
            </p>
            <h3 className="mt-2 text-2xl tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">
              {project.problem}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <span className="mt-5 text-sm text-accent">Open case study →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
