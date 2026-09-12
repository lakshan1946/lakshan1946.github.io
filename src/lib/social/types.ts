import type {
  CreatorIdentity,
  SocialPlatform,
  SocialProfile,
} from "@/content";

export type SyncStatus = "live" | "cached" | "fallback";

export type EnrichedSocialProfile = SocialProfile & {
  status: SyncStatus;
  syncError?: string;
};

export type SocialContentItem = {
  id: string;
  platform: SocialPlatform;
  identity: CreatorIdentity;
  title: string;
  url: string;
  thumbnailUrl?: string;
  publishedAt?: string;
  metrics?: { views?: number; likes?: number };
};

export type SocialPayload = {
  profiles: EnrichedSocialProfile[];
  latestContent: SocialContentItem[];
  lastSyncedAt: string | null;
  source: "api" | "config-fallback";
};

export type ApiResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type ProfileEnrichment = Partial<EnrichedSocialProfile> | null;

export function liveEnrichment(
  fields: Omit<Partial<EnrichedSocialProfile>, "status" | "lastSyncedAt">,
): Partial<EnrichedSocialProfile> {
  return {
    ...fields,
    lastSyncedAt: new Date().toISOString(),
    status: "live",
  };
}

export function fallbackEnrichment(
  syncError: string,
): Partial<EnrichedSocialProfile> {
  return { status: "fallback", syncError };
}
