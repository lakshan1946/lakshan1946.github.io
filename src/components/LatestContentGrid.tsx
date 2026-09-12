"use client";

import { useQuery } from "@tanstack/react-query";
import type { CreatorIdentity, SocialPlatform } from "@/content";
import { PlatformIcon, platformLabel } from "@/components/PlatformIcon";
import { ContentCardSkeleton } from "@/components/Skeleton";
import { SOCIAL_CACHE, SOCIAL_LATEST_LIMIT } from "@/lib/social/constants";

type ContentItem = {
  id: string;
  title: string;
  url: string;
  platform: SocialPlatform | string;
  identity: CreatorIdentity;
  thumbnailUrl?: string;
  publishedAt?: string;
};

async function fetchLatest(): Promise<ContentItem[]> {
  const res = await fetch("/api/social", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.latestContent ?? [];
}

function isSocialPlatform(value: string): value is SocialPlatform {
  return ["youtube", "instagram", "facebook", "tiktok"].includes(value);
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-5 w-5"
    >
      <path d="M8.5 5.8v12.4L18 12 8.5 5.8Z" />
    </svg>
  );
}

export function LatestContentGrid({
  identity,
  emptyMessage = "Latest content will appear here once social APIs are connected.",
}: {
  identity?: CreatorIdentity;
  emptyMessage?: string;
}) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["social-latest"],
    queryFn: fetchLatest,
    staleTime: SOCIAL_CACHE.clientStaleMs,
  });

  const items = (identity
    ? data.filter((item) => item.identity === identity)
    : data
  ).slice(0, SOCIAL_LATEST_LIMIT);

  if (isLoading) {
    return (
      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading latest content"
      >
        {Array.from({ length: SOCIAL_LATEST_LIMIT }, (_, i) => (
          <li key={`content-skel-${i}`}>
            <ContentCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open: ${item.title}`}
            className="group relative block cursor-pointer overflow-hidden border border-border bg-surface outline-none transition-colors hover:border-accent/50 focus-visible:border-accent"
          >
            <div className="relative aspect-video overflow-hidden bg-background">
              {item.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted">
                  <PlayIcon />
                </div>
              )}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/35">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-foreground text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <PlayIcon />
                </span>
              </span>
            </div>

            <div className="p-4">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
                {isSocialPlatform(item.platform) && (
                  <span className="inline-flex">
                    <PlatformIcon
                      platform={item.platform}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                )}
                {isSocialPlatform(item.platform)
                  ? platformLabel(item.platform)
                  : item.platform}
              </p>
              <p className="mt-2 line-clamp-2 text-base transition-colors group-hover:text-accent">
                {item.title}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-foreground">
                Open video →
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
