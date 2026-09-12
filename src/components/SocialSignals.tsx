"use client";

import { useQuery } from "@tanstack/react-query";
import type { CreatorIdentity, SocialPlatform, SocialProfile } from "@/content";
import { socialProfiles } from "@/content";
import { SOCIAL_CACHE } from "@/lib/social/constants";
import { formatDate } from "@/lib/utils";

type SocialApiResponse = {
  profiles: Array<
    SocialProfile & {
      followerCount?: number;
      postCount?: number;
      lastSyncedAt?: string;
      status: "live" | "cached" | "fallback";
      syncError?: string;
    }
  >;
  latestContent: Array<{
    id: string;
    platform: SocialPlatform;
    identity: CreatorIdentity;
    title: string;
    url: string;
    thumbnailUrl?: string;
    publishedAt?: string;
  }>;
  lastSyncedAt: string | null;
  source: "api" | "config-fallback";
};

async function fetchSocial(): Promise<SocialApiResponse> {
  const res = await fetch("/api/social", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load social signals");
  return res.json();
}

export function SocialSignals({
  identity,
}: {
  identity?: CreatorIdentity;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["social"],
    queryFn: fetchSocial,
    staleTime: SOCIAL_CACHE.clientStaleMs,
  });

  const profiles: SocialApiResponse["profiles"] =
    data?.profiles ??
    socialProfiles.map((p) => ({ ...p, status: "fallback" as const }));

  const filtered = identity
    ? profiles.filter((p) => p.identity === identity)
    : profiles;

  return (
    <section aria-labelledby="social-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="social-heading" className="text-2xl tracking-tight md:text-3xl">
          Social signals
        </h2>
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {isLoading && "Syncing…"}
          {!isLoading && data?.lastSyncedAt && (
            <>Last synchronized {formatDate(data.lastSyncedAt)}</>
          )}
          {!isLoading && !data?.lastSyncedAt && "Showing profile links"}
          {isError && " · Live sync unavailable"}
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {filtered.map((profile) => (
          <li
            key={profile.id}
            className="border border-border bg-surface p-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {profile.platform} · {profile.identity}
              {profile.placeholder && (
                <span className="placeholder-tag">Placeholder</span>
              )}
            </p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-lg hover:text-accent"
            >
              {profile.handle}
            </a>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
              {typeof profile.followerCount === "number" && (
                <span>
                  {profile.followerCount.toLocaleString()}{" "}
                  {profile.platform === "youtube" ? "subscribers" : "followers"}
                </span>
              )}
              {typeof profile.postCount === "number" && (
                <span>
                  {profile.postCount.toLocaleString()}{" "}
                  {profile.platform === "youtube" ? "videos" : "posts"}
                </span>
              )}
              {"status" in profile && (
                <span className="uppercase tracking-[0.12em] text-[0.65rem]">
                  {profile.status}
                </span>
              )}
            </div>
            {profile.syncError && (
              <p className="mt-2 text-xs text-accent">{profile.syncError}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
