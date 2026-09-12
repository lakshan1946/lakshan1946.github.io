"use client";

import { useQuery } from "@tanstack/react-query";
import type { CreatorIdentity, SocialPlatform } from "@/content";
import { PlatformIcon, platformLabel } from "@/components/PlatformIcon";
import { SOCIAL_CACHE } from "@/lib/social/constants";

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

  const items = identity
    ? data.filter((item) => item.identity === identity)
    : data;

  if (isLoading) {
    return <p className="text-sm text-muted">Loading latest content…</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="overflow-hidden border border-border bg-surface"
        >
          {item.thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnailUrl}
              alt=""
              className="aspect-video w-full object-cover"
            />
          )}
          <div className="p-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
              {isSocialPlatform(item.platform) && (
                <span className="text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">
                  <PlatformIcon platform={item.platform} />
                </span>
              )}
              {isSocialPlatform(item.platform)
                ? platformLabel(item.platform)
                : item.platform}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-base hover:text-accent"
            >
              {item.title}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
