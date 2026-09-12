import type { CreatorIdentity, SocialProfile } from "@/content";
import {
  fallbackEnrichment,
  liveEnrichment,
  type ApiResult,
  type ProfileEnrichment,
  type SocialContentItem,
} from "./types";

const LATEST_LIMIT = "4";

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
  kind: "long" | "shorts",
): string | null {
  if (!channelId.startsWith("UC") || channelId.length < 3) return null;
  const prefix = kind === "long" ? "UULF" : "UUSH";
  return `${prefix}${channelId.slice(2)}`;
}

async function youtubeGet(
  path: string,
  params: Record<string, string>,
): Promise<ApiResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "YOUTUBE_API_KEY is not set" };
  }

  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
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
      error: error instanceof Error ? error.message : "YouTube fetch failed",
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
    url: `https://www.youtube.com/watch?v=${videoId}`,
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
    part: "snippet,contentDetails",
    playlistId,
    maxResults: LATEST_LIMIT,
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

async function fetchSearchLatest(
  identity: CreatorIdentity,
  channelId: string,
): Promise<SocialContentItem[]> {
  const result = await youtubeGet("search", {
    part: "snippet",
    channelId,
    order: "date",
    maxResults: LATEST_LIMIT,
    type: "video",
  });

  if (!result.ok) {
    console.error(
      `[social] YouTube search failed for ${identity}:`,
      result.error,
    );
    return [];
  }

  const data = result.data as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        title?: string;
        publishedAt?: string;
        thumbnails?: { medium?: { url?: string } };
      };
    }>;
  };

  return (data.items ?? [])
    .filter((item) => Boolean(item.id?.videoId))
    .map((item) => toYouTubeItem(identity, item.id!.videoId!, item.snippet));
}

export async function fetchYouTubeEnrichment(
  profile: SocialProfile,
): Promise<ProfileEnrichment> {
  const channelId = channelIdFor(profile.identity);
  if (!process.env.YOUTUBE_API_KEY || !channelId) return null;

  const result = await youtubeGet("channels", {
    part: "statistics,snippet",
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
    return fallbackEnrichment(`No YouTube channel found for id ${channelId}`);
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

  // LakzJourney: long-form playlist only (avoids Shorts, including long Shorts).
  if (identity === "lakzJourney") {
    return fetchLongFormLatest(identity, channelId);
  }

  return fetchSearchLatest(identity, channelId);
}
