import type { ProfileEnrichment } from "./types";

/** Stub until TikTok official API credentials and scopes are configured. */
export async function fetchTikTokEnrichment(): Promise<ProfileEnrichment> {
  if (!process.env.TIKTOK_ACCESS_TOKEN) return null;
  return null;
}
