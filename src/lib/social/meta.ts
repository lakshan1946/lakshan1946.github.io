import type { CreatorIdentity, SocialProfile } from "@/content";
import { META, SOCIAL_LATEST_LIMIT, metaGraphUrl } from "./constants";
import {
  fallbackEnrichment,
  liveEnrichment,
  type ApiResult,
  type ProfileEnrichment,
  type SocialContentItem,
} from "./types";

/** Real tokens are long (often EAA…). Numeric App IDs are not access tokens. */
function looksLikeAccessToken(token: string): boolean {
  const value = token.trim();
  if (/^\d+$/.test(value)) return false;
  return value.length >= META.minAccessTokenLength;
}

function igUserIdFor(identity: CreatorIdentity): string | undefined {
  return identity === "lakzJourney"
    ? process.env.META_IG_USER_ID_LAKZJOURNEY
    : process.env.META_IG_USER_ID_LAKSHAN;
}

function fbPageIdFor(identity: CreatorIdentity): string | undefined {
  if (identity === "lakzJourney") {
    return process.env.META_FB_PAGE_ID_LAKZJOURNEY;
  }
  return undefined;
}

async function metaGet(
  path: string,
  params: Record<string, string> = {},
): Promise<ApiResult> {
  const token = process.env.META_ACCESS_TOKEN?.trim();
  if (!token) {
    return { ok: false, error: META.errors.missingAccessToken };
  }
  if (!looksLikeAccessToken(token)) {
    return { ok: false, error: META.errors.invalidAccessToken };
  }

  const url = new URL(metaGraphUrl(path));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    if (!res.ok || (data as { error?: unknown })?.error) {
      const message =
        (data as { error?: { message?: string } })?.error?.message ??
        `Meta HTTP ${res.status}`;
      return { ok: false, error: message };
    }
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : META.errors.fetchFailed,
    };
  }
}

async function enrichInstagram(
  identity: CreatorIdentity,
): Promise<ProfileEnrichment> {
  const igUserId = igUserIdFor(identity);
  if (!igUserId) {
    return fallbackEnrichment(META.errors.missingIgUserId(identity));
  }

  const result = await metaGet(igUserId, {
    fields: META.fields.instagramUser,
  });

  if (!result.ok) {
    return fallbackEnrichment(result.error);
  }

  const data = result.data as {
    followers_count?: number;
    media_count?: number;
    profile_picture_url?: string;
  };

  return liveEnrichment({
    followerCount:
      typeof data.followers_count === "number"
        ? data.followers_count
        : undefined,
    postCount:
      typeof data.media_count === "number" ? data.media_count : undefined,
    avatarUrl: data.profile_picture_url,
  });
}

async function enrichFacebook(
  identity: CreatorIdentity,
): Promise<ProfileEnrichment> {
  const pageId = fbPageIdFor(identity);
  if (!pageId) {
    return fallbackEnrichment(META.errors.missingFbPageId(identity));
  }

  const result = await metaGet(pageId, {
    fields: META.fields.facebookPage,
  });

  if (!result.ok) {
    return fallbackEnrichment(result.error);
  }

  const data = result.data as {
    fan_count?: number;
    followers_count?: number;
  };
  const count =
    typeof data.followers_count === "number"
      ? data.followers_count
      : typeof data.fan_count === "number"
        ? data.fan_count
        : undefined;

  return liveEnrichment({ followerCount: count });
}

export async function fetchMetaEnrichment(
  profile: SocialProfile,
): Promise<ProfileEnrichment> {
  const token = process.env.META_ACCESS_TOKEN?.trim();
  if (!token) return null;

  if (!looksLikeAccessToken(token)) {
    return fallbackEnrichment(META.errors.invalidAccessToken);
  }

  if (profile.platform === "instagram") {
    return enrichInstagram(profile.identity);
  }

  if (profile.platform === "facebook") {
    return enrichFacebook(profile.identity);
  }

  return null;
}

export async function fetchInstagramLatest(
  identity: CreatorIdentity,
): Promise<SocialContentItem[]> {
  const igUserId = igUserIdFor(identity);
  if (!process.env.META_ACCESS_TOKEN || !igUserId) return [];

  const result = await metaGet(`${igUserId}/media`, {
    fields: META.fields.instagramMedia,
    limit: String(SOCIAL_LATEST_LIMIT),
  });

  if (!result.ok) {
    console.error(
      `[social] Instagram media failed for ${identity}:`,
      result.error,
    );
    return [];
  }

  const data = result.data as {
    data?: Array<{
      id?: string;
      caption?: string;
      permalink?: string;
      thumbnail_url?: string;
      media_url?: string;
      timestamp?: string;
    }>;
  };

  return (data.data ?? [])
    .filter((item) => Boolean(item.id && item.permalink))
    .map((item) => ({
      id: item.id!,
      platform: "instagram" as const,
      identity,
      title: (item.caption ?? META.defaults.instagramPostTitle).slice(
        0,
        META.captionPreviewLength,
      ),
      url: item.permalink!,
      thumbnailUrl: item.thumbnail_url ?? item.media_url,
      publishedAt: item.timestamp,
    }));
}
