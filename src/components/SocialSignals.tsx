"use client";

import { useQuery } from "@tanstack/react-query";
import type { CreatorIdentity, SocialPlatform, SocialProfile } from "@/content";
import { socialProfiles } from "@/content";
import {
  identityLabel,
  PlatformIcon,
  platformLabel,
} from "@/components/PlatformIcon";
import { SOCIAL_CACHE } from "@/lib/social/constants";
import { cn, formatDate } from "@/lib/utils";

type EnrichedProfile = SocialProfile & {
  followerCount?: number;
  postCount?: number;
  lastSyncedAt?: string;
  status: "live" | "cached" | "fallback";
  syncError?: string;
};

type SocialApiResponse = {
  profiles: EnrichedProfile[];
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

function statusTone(status: EnrichedProfile["status"]) {
  if (status === "live") return "border-accent/40 text-accent";
  if (status === "cached") return "border-border text-muted";
  return "border-border text-muted";
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

  const profiles: EnrichedProfile[] =
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
        {filtered.map((profile) => {
          const followerLabel =
            profile.platform === "youtube" ? "subscribers" : "followers";
          const postLabel =
            profile.platform === "youtube" ? "videos" : "posts";

          return (
            <li key={profile.id}>
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 border border-border bg-surface p-5 transition-colors hover:border-accent/50"
              >
                <div className="relative shrink-0">
                  {profile.avatarUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profile.avatarUrl}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-foreground">
                        <span className="scale-75">
                          <PlatformIcon platform={profile.platform} />
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground">
                      <PlatformIcon platform={profile.platform} />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {platformLabel(profile.platform)}
                      <span className="mx-1.5 text-border">·</span>
                      {identityLabel(profile.identity)}
                    </p>
                    {profile.placeholder && (
                      <span className="placeholder-tag !ml-0">Placeholder</span>
                    )}
                  </div>

                  <p className="mt-1 truncate text-lg tracking-tight transition-colors group-hover:text-accent">
                    {profile.handle}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                    {typeof profile.followerCount === "number" && (
                      <span>
                        <span className="text-foreground">
                          {profile.followerCount.toLocaleString()}
                        </span>{" "}
                        {followerLabel}
                      </span>
                    )}
                    {typeof profile.postCount === "number" && (
                      <span>
                        <span className="text-foreground">
                          {profile.postCount.toLocaleString()}
                        </span>{" "}
                        {postLabel}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em]",
                        statusTone(profile.status),
                      )}
                    >
                      {profile.status}
                    </span>
                  </div>

                  {profile.syncError && (
                    <p className="mt-2 text-xs text-accent">
                      {profile.syncError}
                    </p>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
