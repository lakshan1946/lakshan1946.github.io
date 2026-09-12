import Link from "next/link";
import type { Project } from "@/content";

export function ProjectShowcase({
  projects,
  detailed = false,
}: {
  projects: Project[];
  detailed?: boolean;
}) {
  return (
    <ul className="space-y-10">
      {projects.map((project) => (
        <li
          key={project.slug}
          className="grid gap-4 border-t border-border pt-8 md:grid-cols-[1fr_1.4fr]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {project.role}
              {project.placeholder && (
                <span className="placeholder-tag">Placeholder</span>
              )}
            </p>
            <h3 className="mt-2 text-2xl tracking-tight md:text-3xl">
              <Link
                href={`/build/${project.slug}`}
                className="hover:text-accent"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-muted">{project.tagline}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
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
          <div className="space-y-3 text-sm leading-relaxed md:text-base">
            <p>
              <span className="font-medium">Problem. </span>
              {project.problem}
            </p>
            {detailed && (
              <>
                <p>
                  <span className="font-medium">Solution. </span>
                  {project.solution}
                </p>
                <p>
                  <span className="font-medium">Contribution. </span>
                  {project.contribution}
                </p>
              </>
            )}
            {!detailed && (
              <p>
                <span className="font-medium">Contribution. </span>
                {project.contribution}
              </p>
            )}
            <Link
              href={`/build/${project.slug}`}
              className="inline-flex text-sm text-accent underline-offset-4 hover:underline"
            >
              Open case study →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
