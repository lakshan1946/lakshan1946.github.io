import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="identity-line text-accent">404</p>
      <h1 className="mt-3 text-4xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">
        That path is not part of this identity map. Return home or pick another
        dimension.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
      >
        Back to LAKSHAN
      </Link>
    </div>
  );
}
