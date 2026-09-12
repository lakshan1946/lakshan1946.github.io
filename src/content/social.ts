import { socialProfileSchema, type SocialProfile } from "./schemas";

/**
 * PLACEHOLDER: Replace handles and URLs with real public profiles.
 * Live metrics come from /api/social when credentials are configured.
 */
export const socialProfiles: SocialProfile[] = [
  socialProfileSchema.parse({
    id: "yt-lakzjourney",
    platform: "youtube",
    identity: "lakzJourney",
    handle: "@LakzJourney",
    profileUrl: "https://www.youtube.com/@LakzJourney",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "yt-lakshan",
    platform: "youtube",
    identity: "lakshanMadhusanka",
    handle: "@LakshanMadhusanka",
    profileUrl: "https://www.youtube.com/@LakshanMadhusanka",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "ig-lakzjourney",
    platform: "instagram",
    identity: "lakzJourney",
    handle: "@lakzjourney",
    profileUrl: "https://www.instagram.com/lakzjourney",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "ig-lakshan",
    platform: "instagram",
    identity: "lakshanMadhusanka",
    handle: "@lakshanmadhusanka",
    profileUrl: "https://www.instagram.com/lakshanmadhusanka",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "fb-lakzjourney",
    platform: "facebook",
    identity: "lakzJourney",
    handle: "LakzJourney",
    profileUrl: "https://www.facebook.com/LakzJourney",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "tt-lakzjourney",
    platform: "tiktok",
    identity: "lakzJourney",
    handle: "@lakzjourney",
    profileUrl: "https://www.tiktok.com/@lakzjourney",
    published: true,
    placeholder: true,
  }),
  socialProfileSchema.parse({
    id: "tt-lakshan",
    platform: "tiktok",
    identity: "lakshanMadhusanka",
    handle: "@lakshanmadhusanka",
    profileUrl: "https://www.tiktok.com/@lakshanmadhusanka",
    published: true,
    placeholder: true,
  }),
].filter((p) => p.published);

export function getProfilesByIdentity(identity: SocialProfile["identity"]) {
  return socialProfiles.filter((p) => p.identity === identity);
}
