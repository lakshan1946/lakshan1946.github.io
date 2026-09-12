import {
  socialProfiles,
  type CreatorIdentity,
  type SocialProfile,
} from "@/content";
import { fetchInstagramLatest, fetchMetaEnrichment } from "./meta";
import { fetchTikTokEnrichment } from "./tiktok";
import type {
  EnrichedSocialProfile,
  ProfileEnrichment,
  SocialPayload,
} from "./types";
import { fetchYouTubeEnrichment, fetchYouTubeLatest } from "./youtube";

export type {
  EnrichedSocialProfile,
  SocialContentItem,
  SocialPayload,
} from "./types";

function fallbackPayload(): SocialPayload {
  return {
    profiles: socialProfiles.map((p) => ({
      ...p,
      status: "fallback" as const,
    })),
    latestContent: [],
    lastSyncedAt: null,
    source: "config-fallback",
  };
}

async function enrichProfile(
  profile: SocialProfile,
): Promise<EnrichedSocialProfile> {
  try {
    let enrichment: ProfileEnrichment = null;

    switch (profile.platform) {
      case "youtube":
        enrichment = await fetchYouTubeEnrichment(profile);
        break;
      case "instagram":
      case "facebook":
        enrichment = await fetchMetaEnrichment(profile);
        break;
      case "tiktok":
        enrichment = await fetchTikTokEnrichment();
        break;
    }

    if (!enrichment) {
      return { ...profile, status: "fallback" };
    }

    return {
      ...profile,
      ...enrichment,
      status: enrichment.status ?? "live",
      placeholder:
        enrichment.status === "live" ? false : profile.placeholder,
    };
  } catch (error) {
    return {
      ...profile,
      status: "fallback",
      syncError:
        error instanceof Error ? error.message : "Unexpected enrichment error",
    };
  }
}

export async function getSocialPayload(): Promise<SocialPayload> {
  try {
    const profiles = await Promise.all(socialProfiles.map(enrichProfile));
    const identities = Array.from(
      new Set(socialProfiles.map((p) => p.identity)),
    ) as CreatorIdentity[];

    const [youtubeLatest, instagramLatest] = await Promise.all([
      Promise.all(identities.map((id) => fetchYouTubeLatest(id))),
      Promise.all(identities.map((id) => fetchInstagramLatest(id))),
    ]);

    const latestContent = [...youtubeLatest.flat(), ...instagramLatest.flat()];
    const synced = profiles
      .map((p) => p.lastSyncedAt)
      .filter((v): v is string => Boolean(v))
      .sort()
      .at(-1);
    const anyLive = profiles.some((p) => p.status === "live");

    return {
      profiles,
      latestContent,
      lastSyncedAt: synced ?? (anyLive ? new Date().toISOString() : null),
      source: anyLive ? "api" : "config-fallback",
    };
  } catch (error) {
    console.error("[social] payload build failed:", error);
    return fallbackPayload();
  }
}
