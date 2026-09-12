import type { Dimension, SiteMode } from "./schemas";

export const dimensions: {
  id: Dimension;
  label: string;
  href: string;
  blurb: string;
}[] = [
  {
    id: "build",
    label: "BUILD",
    href: "/build",
    blurb: "Engineering, projects, and shipped work",
  },
  {
    id: "create",
    label: "CREATE",
    href: "/create",
    blurb: "LakzJourney and educational content",
  },
  {
    id: "explore",
    label: "EXPLORE",
    href: "/explore",
    blurb: "Travel, rides, reviews, and moments",
  },
  {
    id: "educate",
    label: "EDUCATE",
    href: "/educate",
    blurb: "Technical teaching and explanations",
  },
  {
    id: "lab",
    label: "LAB",
    href: "/lab",
    blurb: "Research and experimental work",
  },
  {
    id: "now",
    label: "RIGHT NOW",
    href: "/now",
    blurb: "What is currently in motion",
  },
  {
    id: "social",
    label: "SOCIAL",
    href: "/social",
    blurb: "Public signals across platforms",
  },
  {
    id: "contact",
    label: "CONTACT",
    href: "/contact",
    blurb: "Professional reach and links",
  },
];

/** Mode rearranges emphasis — same IA, different priority order. */
export const modeEmphasis: Record<SiteMode, Dimension[]> = {
  person: ["now", "explore", "create", "contact", "build", "educate", "lab", "social"],
  engineer: ["build", "lab", "now", "contact", "educate", "create", "social", "explore"],
  creator: ["create", "social", "educate", "explore", "now", "build", "contact", "lab"],
  learner: ["lab", "educate", "now", "build", "create", "social", "explore", "contact"],
  explorer: ["explore", "create", "now", "social", "contact", "build", "educate", "lab"],
};

export const modeLabels: Record<SiteMode, string> = {
  person: "PERSON",
  engineer: "ENGINEER",
  creator: "CREATOR",
  learner: "LEARNER",
  explorer: "EXPLORER",
};

export const siteModes: SiteMode[] = [
  "person",
  "engineer",
  "creator",
  "learner",
  "explorer",
];
