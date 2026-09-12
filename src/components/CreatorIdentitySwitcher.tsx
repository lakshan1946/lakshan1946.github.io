"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { creators } from "@/content";
import { cn } from "@/lib/utils";

export function CreatorIdentitySwitcher() {
  const pathname = usePathname();

  return (
    <div
      role="navigation"
      aria-label="Creator identities"
      className="flex flex-wrap gap-3"
    >
      <Link
        href="/create"
        className={cn(
          "rounded-full border px-4 py-2 text-sm transition-colors",
          pathname === "/create"
            ? "border-accent bg-accent text-background"
            : "border-border hover:border-foreground",
        )}
      >
        Both identities
      </Link>
      {creators.map((creator) => {
        const href = `/create/${creator.slug}`;
        const active = pathname.startsWith(href);
        return (
          <Link
            key={creator.id}
            href={href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active
                ? "border-accent bg-accent text-background"
                : "border-border hover:border-foreground",
            )}
          >
            {creator.name}
          </Link>
        );
      })}
    </div>
  );
}
