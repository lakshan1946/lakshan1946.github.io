import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16">
      <header className="max-w-3xl">
        {eyebrow && (
          <p className="identity-line text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 text-base text-muted md:text-lg">{description}</p>
        )}
      </header>
      <div className="mt-10 md:mt-14">{children}</div>
    </div>
  );
}
