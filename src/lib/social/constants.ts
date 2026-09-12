/** Non-secret social integration constants. Secrets stay in env vars. */

export const SOCIAL_LATEST_LIMIT = 4;

export const SOCIAL_CACHE = {
  /** Client TanStack Query stale time (ms). */
  clientStaleMs: 5 * 60 * 1000,
  /** Browser Cache-Control for /api/social. */
  apiMaxAgeSeconds: 60,
  apiStaleWhileRevalidateSeconds: 300,
} as const;

export const YOUTUBE = {
  apiBaseUrl: "https://www.googleapis.com/youtube/v3",
  watchUrl: (videoId: string) =>
    `https://www.youtube.com/watch?v=${videoId}`,
  channelIdPrefix: "UC",
  /** Auto playlists: UC… → UULF… (long-form) / UUSH… (Shorts). */
  playlistPrefix: {
    long: "UULF",
    shorts: "UUSH",
  },
  fields: {
    channel: "statistics,snippet",
    playlistItems: "snippet,contentDetails",
    search: "snippet",
  },
  errors: {
    missingApiKey: "YOUTUBE_API_KEY is not set",
    fetchFailed: "YouTube fetch failed",
    channelNotFound: (channelId: string) =>
      `No YouTube channel found for id ${channelId}`,
  },
} as const;

export const META = {
  graphVersion: "v21.0",
  graphBaseUrl: "https://graph.facebook.com",
  /** Minimum length for a real Page access token (App IDs are short digits). */
  minAccessTokenLength: 40,
  captionPreviewLength: 120,
  fields: {
    instagramUser: "username,followers_count,media_count,profile_picture_url",
    facebookPage: "name,fan_count,followers_count,link",
    instagramMedia:
      "id,caption,media_type,permalink,thumbnail_url,media_url,timestamp",
  },
  errors: {
    missingAccessToken: "META_ACCESS_TOKEN is not set",
    invalidAccessToken:
      "META_ACCESS_TOKEN looks like an App ID. Use a long-lived Page access token (usually starts with EAA…).",
    fetchFailed: "Meta fetch failed",
    missingIgUserId: (identity: string) =>
      `Missing META_IG_USER_ID for ${identity}`,
    missingFbPageId: (identity: string) =>
      `Missing META_FB_PAGE_ID for ${identity}`,
  },
  defaults: {
    instagramPostTitle: "Instagram post",
  },
} as const;

export function metaGraphUrl(path: string): string {
  const clean = path.replace(/^\//, "");
  return `${META.graphBaseUrl}/${META.graphVersion}/${clean}`;
}
