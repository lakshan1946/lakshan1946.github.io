import Link from "next/link";
import { dimensions } from "@/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl tracking-tight">
            Lakshan Madhusanka
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            One person, multiple dimensions. Software Engineer · Creator ·
            Learner · Explorer.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {dimensions.map((d) => (
              <li key={d.id}>
                <Link href={d.href} className="hover:text-foreground">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted sm:px-8">
          © {new Date().getFullYear()} Lakshan Madhusanka · lakshan.me
        </p>
      </div>
    </footer>
  );
}
