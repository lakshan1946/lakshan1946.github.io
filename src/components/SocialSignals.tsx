"use client";

import { useQuery } from "@tanstack/react-query";
import type { CreatorIdentity, SocialPlatform, SocialProfile } from "@/content";
import { creators, socialProfiles } from "@/content";
import {
  identityLabel,
  PlatformIcon,
  platformLabel,
} from "@/components/PlatformIcon";
import { SocialProfileSkeleton } from "@/components/Skeleton";
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

const PLATFORM_ORDER: SocialPlatform[] = [
  "youtube",
  "instagram",
  "facebook",
  "tiktok",
];

/** Match contact page: Lakshan first, then LakzJourney. */
const IDENTITY_ORDER: CreatorIdentity[] = [
  "lakshanMadhusanka",
  "lakzJourney",
];

async function fetchSocial(): Promise<SocialApiResponse> {
  const res = await fetch("/api/social", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load social signals");
  return res.json();
}

function sortProfiles(profiles: EnrichedProfile[]) {
  return [...profiles].sort((a, b) => {
    const identityDiff =
      IDENTITY_ORDER.indexOf(a.identity) - IDENTITY_ORDER.indexOf(b.identity);
    if (identityDiff !== 0) return identityDiff;
    return (
      PLATFORM_ORDER.indexOf(a.platform) - PLATFORM_ORDER.indexOf(b.platform)
    );
  });
}

function ProfileCard({ profile }: { profile: EnrichedProfile }) {
  const followerLabel =
    profile.platform === "youtube" ? "subscribers" : "followers";
  const postLabel = profile.platform === "youtube" ? "videos" : "posts";
  const hasMetrics =
    typeof profile.followerCount === "number" ||
    typeof profile.postCount === "number";

  return (
    <a
      href={profile.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full items-center gap-4 border border-border bg-surface p-5 transition-colors hover:border-accent/50"
    >
      <div className="relative shrink-0 self-center">
        {profile.avatarUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface">
              <PlatformIcon
                platform={profile.platform}
                className="h-3.5 w-3.5"
              />
            </span>
          </>
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
            <PlatformIcon platform={profile.platform} className="h-6 w-6" />
          </span>
        )}
      </div>

      <div className="flex min-h-[4.75rem] min-w-0 flex-1 flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {platformLabel(profile.platform)}
        </p>
        <p className="mt-1 truncate text-lg tracking-tight transition-colors group-hover:text-accent">
          {profile.handle}
        </p>

        <div className="mt-2 flex min-h-6 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
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
          {profile.status === "live" && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em]",
                "border-accent/40 text-accent",
              )}
            >
              Live
            </span>
          )}
          {!hasMetrics && profile.status !== "live" && (
            <span className="text-xs text-muted/70">Open profile →</span>
          )}
        </div>
      </div>
    </a>
  );
}

function IdentityProfiles({
  identity,
  profiles,
  isLoading,
}: {
  identity: CreatorIdentity;
  profiles: EnrichedProfile[];
  isLoading: boolean;
}) {
  const creator = creators.find((c) => c.id === identity);
  const headingId = `social-${identity}`;

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-accent">
          Creator identity
        </p>
        <h3
          id={headingId}
          className="mt-1 font-display text-2xl tracking-tight md:text-3xl"
        >
          {creator?.name ?? identityLabel(identity)}
        </h3>
      </div>

      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-busy={isLoading}
      >
        {isLoading
          ? PLATFORM_ORDER.map((platform) => (
              <li key={`${identity}-skel-${platform}`} className="h-full">
                <SocialProfileSkeleton />
              </li>
            ))
          : profiles.map((profile) => (
              <li key={profile.id} className="h-full">
                <ProfileCard profile={profile} />
              </li>
            ))}
      </ul>
    </section>
  );
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

  const profiles = sortProfiles(
    data?.profiles ??
      socialProfiles.map((p) => ({ ...p, status: "fallback" as const })),
  );

  const identities = identity
    ? [identity]
    : IDENTITY_ORDER.filter((id) => profiles.some((p) => p.identity === id));

  return (
    <section aria-labelledby="social-heading" className="space-y-10">
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

      <div className="space-y-12">
        {identities.map((id) => (
          <IdentityProfiles
            key={id}
            identity={id}
            profiles={profiles.filter((p) => p.identity === id)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </section>
  );
}
