import type { CreatorIdentity, SocialProfile } from "@/content";
import { SOCIAL_LATEST_LIMIT, YOUTUBE } from "./constants";
import {
  fallbackEnrichment,
  liveEnrichment,
  type ApiResult,
  type ProfileEnrichment,
  type SocialContentItem,
} from "./types";

function channelIdFor(identity: CreatorIdentity): string | undefined {
  return identity === "lakzJourney"
    ? process.env.YOUTUBE_CHANNEL_ID_LAKZJOURNEY
    : process.env.YOUTUBE_CHANNEL_ID_LAKSHAN;
}

/**
 * YouTube auto-generated playlists via official playlistItems API.
 * UC… → UULF… = long-form, UUSH… = Shorts.
 */
function autoPlaylistId(
  channelId: string,
  kind: keyof typeof YOUTUBE.playlistPrefix,
): string | null {
  if (
    !channelId.startsWith(YOUTUBE.channelIdPrefix) ||
    channelId.length < 3
  ) {
    return null;
  }
  return `${YOUTUBE.playlistPrefix[kind]}${channelId.slice(2)}`;
}

async function youtubeGet(
  path: string,
  params: Record<string, string>,
): Promise<ApiResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: YOUTUBE.errors.missingApiKey };
  }

  const url = new URL(`${YOUTUBE.apiBaseUrl}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();

    if (!res.ok) {
      const message =
        (data as { error?: { message?: string } })?.error?.message ??
        `YouTube HTTP ${res.status}`;
      return { ok: false, error: message };
    }

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : YOUTUBE.errors.fetchFailed,
    };
  }
}

function toYouTubeItem(
  identity: CreatorIdentity,
  videoId: string,
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: { medium?: { url?: string } };
  },
): SocialContentItem {
  return {
    id: videoId,
    platform: "youtube",
    identity,
    title: snippet?.title ?? "Untitled",
    url: YOUTUBE.watchUrl(videoId),
    thumbnailUrl: snippet?.thumbnails?.medium?.url,
    publishedAt: snippet?.publishedAt,
  };
}

async function fetchLongFormLatest(
  identity: CreatorIdentity,
  channelId: string,
): Promise<SocialContentItem[]> {
  const playlistId = autoPlaylistId(channelId, "long");
  if (!playlistId) return [];

  const playlist = await youtubeGet("playlistItems", {
    part: YOUTUBE.fields.playlistItems,
    playlistId,
    maxResults: String(SOCIAL_LATEST_LIMIT),
  });

  if (!playlist.ok) {
    console.error(
      `[social] YouTube long-form playlist failed for ${identity}:`,
      playlist.error,
    );
    return [];
  }

  const data = playlist.data as {
    items?: Array<{
      contentDetails?: { videoId?: string };
      snippet?: {
        title?: string;
        publishedAt?: string;
        thumbnails?: { medium?: { url?: string } };
        resourceId?: { videoId?: string };
      };
    }>;
  };

  const items: SocialContentItem[] = [];
  for (const item of data.items ?? []) {
    const videoId =
      item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
    if (!videoId) continue;
    items.push(toYouTubeItem(identity, videoId, item.snippet));
  }
  return items;
}

export async function fetchYouTubeEnrichment(
  profile: SocialProfile,
): Promise<ProfileEnrichment> {
  const channelId = channelIdFor(profile.identity);
  if (!process.env.YOUTUBE_API_KEY || !channelId) return null;

  const result = await youtubeGet("channels", {
    part: YOUTUBE.fields.channel,
    id: channelId,
  });

  if (!result.ok) {
    return fallbackEnrichment(result.error);
  }

  const data = result.data as {
    items?: Array<{
      statistics?: { subscriberCount?: string; videoCount?: string };
      snippet?: { thumbnails?: { default?: { url?: string } } };
    }>;
  };
  const item = data.items?.[0];
  if (!item) {
    return fallbackEnrichment(YOUTUBE.errors.channelNotFound(channelId));
  }

  const subscribers = Number(item.statistics?.subscriberCount);
  const videos = Number(item.statistics?.videoCount);

  return liveEnrichment({
    followerCount: Number.isFinite(subscribers) ? subscribers : undefined,
    postCount: Number.isFinite(videos) ? videos : undefined,
    avatarUrl: item.snippet?.thumbnails?.default?.url,
  });
}

export async function fetchYouTubeLatest(
  identity: CreatorIdentity,
): Promise<SocialContentItem[]> {
  const channelId = channelIdFor(identity);
  if (!process.env.YOUTUBE_API_KEY || !channelId) return [];

  // UULF… auto playlist = long-form uploads only (excludes Shorts).
  return fetchLongFormLatest(identity, channelId);
}
