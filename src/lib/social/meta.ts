import type { CreatorIdentity, SocialProfile } from "@/content";
import {
  fallbackEnrichment,
  liveEnrichment,
  type ApiResult,
  type ProfileEnrichment,
  type SocialContentItem,
} from "./types";

const GRAPH_VERSION = "v21.0";
const LATEST_LIMIT = "4";
const INVALID_TOKEN_MESSAGE =
  "META_ACCESS_TOKEN looks like an App ID. Use a long-lived Page access token (usually starts with EAA…).";

/** Real tokens are long (often EAA…). Numeric App IDs are not access tokens. */
function looksLikeAccessToken(token: string): boolean {
  const value = token.trim();
  if (/^\d+$/.test(value)) return false;
  return value.length >= 40;
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
    return { ok: false, error: "META_ACCESS_TOKEN is not set" };
  }
  if (!looksLikeAccessToken(token)) {
    return { ok: false, error: INVALID_TOKEN_MESSAGE };
  }

  const url = new URL(
    `https://graph.facebook.com/${GRAPH_VERSION}/${path.replace(/^\//, "")}`,
  );
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
      error: error instanceof Error ? error.message : "Meta fetch failed",
    };
  }
}

async function enrichInstagram(
  identity: CreatorIdentity,
): Promise<ProfileEnrichment> {
  const igUserId = igUserIdFor(identity);
  if (!igUserId) {
    return fallbackEnrichment(`Missing META_IG_USER_ID for ${identity}`);
  }

  const result = await metaGet(igUserId, {
    fields: "username,followers_count,media_count,profile_picture_url",
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
    return fallbackEnrichment(`Missing META_FB_PAGE_ID for ${identity}`);
  }

  const result = await metaGet(pageId, {
    fields: "name,fan_count,followers_count,link",
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
    return fallbackEnrichment(INVALID_TOKEN_MESSAGE);
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
    fields: "id,caption,media_type,permalink,thumbnail_url,media_url,timestamp",
    limit: LATEST_LIMIT,
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
      title: (item.caption ?? "Instagram post").slice(0, 120),
      url: item.permalink!,
      thumbnailUrl: item.thumbnail_url ?? item.media_url,
      publishedAt: item.timestamp,
    }));
}
