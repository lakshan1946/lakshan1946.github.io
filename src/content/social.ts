import { socialProfileSchema, type SocialProfile } from "./schemas";

/**
 * Public social profiles by creator identity.
 * Live metrics come from /api/social when credentials are configured.
 * Order: Lakshan first, then LakzJourney — YouTube → Instagram → Facebook → TikTok.
 */
export const socialProfiles: SocialProfile[] = [
  socialProfileSchema.parse({
    id: "yt-lakshan",
    platform: "youtube",
    identity: "lakshanMadhusanka",
    handle: "@lakshanma21",
    profileUrl: "https://www.youtube.com/@lakshanma21",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "ig-lakshan",
    platform: "instagram",
    identity: "lakshanMadhusanka",
    handle: "@lakshanma21",
    profileUrl: "https://www.instagram.com/lakshanma21",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "fb-lakshan",
    platform: "facebook",
    identity: "lakshanMadhusanka",
    handle: "@lakshanma21",
    profileUrl: "https://www.facebook.com/lakshanma21",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "tt-lakshan",
    platform: "tiktok",
    identity: "lakshanMadhusanka",
    handle: "@lakshanma21",
    profileUrl: "https://www.tiktok.com/@lakshanma21",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "yt-lakzjourney",
    platform: "youtube",
    identity: "lakzJourney",
    handle: "@LakzJourney",
    profileUrl: "https://www.youtube.com/@LakzJourney",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "ig-lakzjourney",
    platform: "instagram",
    identity: "lakzJourney",
    handle: "@lakzjourney",
    profileUrl: "https://www.instagram.com/lakzjourney",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "fb-lakzjourney",
    platform: "facebook",
    identity: "lakzJourney",
    handle: "@LakzJourney",
    profileUrl: "https://www.facebook.com/LakzJourney",
    published: true,
  }),
  socialProfileSchema.parse({
    id: "tt-lakzjourney",
    platform: "tiktok",
    identity: "lakzJourney",
    handle: "@lakzjourney",
    profileUrl: "https://www.tiktok.com/@lakzjourney",
    published: true,
  }),
].filter((p) => p.published);

export function getProfilesByIdentity(identity: SocialProfile["identity"]) {
  return socialProfiles.filter((p) => p.identity === identity);
}
