import type { SocialPlatform } from "@/content";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true as const,
  className: "h-5 w-5",
};

export function PlatformIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "youtube":
      return (
        <svg {...iconProps}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.8 15.5v-7.1L15.8 12l-6 3.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...iconProps}>
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Zm6.4-8.5a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 2.2c2.2 0 2.5 0 3.4.1 1.4.1 2.5.4 3.4 1.2.9.9 1.2 2 1.3 3.4.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c-.1 1.4-.4 2.5-1.3 3.4-.9.9-2 1.2-3.4 1.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-1.4-.1-2.5-.4-3.4-1.3-.9-.9-1.2-2-1.3-3.4C2.2 14.5 2.2 14.2 2.2 12s0-2.5.1-3.4c.1-1.4.4-2.5 1.3-3.4.9-.9 2-1.2 3.4-1.3.9-.1 1.2-.1 3.4-.1Zm0-2C9.7.2 9.4.2 8.5.3 6.8.3 5.3.8 4 2 2.8 3.3 2.3 4.8 2.3 6.5 2.2 7.4 2.2 7.7 2.2 12s0 4.6.1 5.5c.1 1.7.6 3.2 1.8 4.5 1.3 1.2 2.8 1.7 4.5 1.8.9.1 1.2.1 5.5.1s4.6 0 5.5-.1c1.7-.1 3.2-.6 4.5-1.8 1.2-1.3 1.7-2.8 1.8-4.5.1-.9.1-1.2.1-5.5s0-4.6-.1-5.5c-.1-1.7-.6-3.2-1.8-4.5C20.7.8 19.2.3 17.5.3 16.6.2 16.3.2 12 .2Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...iconProps}>
          <path d="M14 8.2h2.7V4.5H14c-2.7 0-4.5 1.6-4.5 4.4v1.8H7.2V14h2.3v7.5h3.7V14h2.8l.5-3.3h-3.3V9.3c0-.8.4-1.1 1.1-1.1Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...iconProps}>
          <path d="M19.6 7.3a5.7 5.7 0 0 1-3.4-1.1v7.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 2 2.7V2.2h2.8c.2 1.6 1.1 3 2.5 3.9.8.5 1.7.8 2.7.9v2.8c-.6 0-1.2-.1-1.8-.3Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function platformLabel(platform: SocialPlatform): string {
  switch (platform) {
    case "youtube":
      return "YouTube";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    case "tiktok":
      return "TikTok";
  }
}

export function identityLabel(identity: string): string {
  if (identity === "lakzJourney") return "LakzJourney";
  if (identity === "lakshanMadhusanka") return "Lakshan Madhusanka";
  return identity;
}
