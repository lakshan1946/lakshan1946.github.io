import { z } from "zod";

export const siteModeSchema = z.enum([
  "person",
  "engineer",
  "creator",
  "learner",
  "explorer",
]);
export type SiteMode = z.infer<typeof siteModeSchema>;

export const dimensionSchema = z.enum([
  "build",
  "create",
  "explore",
  "educate",
  "lab",
  "now",
  "social",
  "contact",
]);
export type Dimension = z.infer<typeof dimensionSchema>;

export const profileSchema = z.object({
  fullName: z.string(),
  wordmark: z.string(),
  identityStatement: z.string(),
  supportingLine: z.string(),
  currentRole: z.string(),
  education: z.string(),
  location: z.string().optional(),
  rotatingSentences: z.array(z.string()),
  links: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
});
export type Profile = z.infer<typeof profileSchema>;

export const experienceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()).optional(),
  published: z.boolean().default(true),
  redact: z.boolean().default(false),
});
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  role: z.string(),
  problem: z.string(),
  solution: z.string(),
  contribution: z.string(),
  stack: z.array(z.string()),
  outcomes: z.array(z.string()),
  architectureNotes: z.string().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string().url(),
      }),
    )
    .optional(),
  published: z.boolean().default(true),
  redact: z.boolean().default(false),
  featured: z.boolean().default(false),
  placeholder: z.boolean().default(false),
});
export type Project = z.infer<typeof projectSchema>;

export const capabilitySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  relatedProjectSlugs: z.array(z.string()).optional(),
});
export type Capability = z.infer<typeof capabilitySchema>;

export const labItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  approach: z.string(),
  constraints: z.array(z.string()),
  tags: z.array(z.string()),
  published: z.boolean().default(true),
  placeholder: z.boolean().default(false),
});
export type LabItem = z.infer<typeof labItemSchema>;

export const creatorIdentitySchema = z.enum([
  "lakzJourney",
  "lakshanMadhusanka",
]);
export type CreatorIdentity = z.infer<typeof creatorIdentitySchema>;

export const creatorSchema = z.object({
  id: creatorIdentitySchema,
  name: z.string(),
  slug: z.string(),
  tagline: z.string(),
  pillars: z.array(z.string()),
  description: z.string(),
  focus: z.string(),
});
export type Creator = z.infer<typeof creatorSchema>;

export const nowCategorySchema = z.enum([
  "building",
  "learning",
  "working",
  "creating",
  "exploring",
  "shipping",
]);
export type NowCategory = z.infer<typeof nowCategorySchema>;

export const nowItemSchema = z.object({
  category: nowCategorySchema,
  label: z.string(),
  detail: z.string(),
  updatedAt: z.string(),
  placeholder: z.boolean().default(false),
});
export type NowItem = z.infer<typeof nowItemSchema>;

export const socialPlatformSchema = z.enum([
  "youtube",
  "instagram",
  "facebook",
  "tiktok",
]);
export type SocialPlatform = z.infer<typeof socialPlatformSchema>;

export const socialProfileSchema = z.object({
  id: z.string(),
  platform: socialPlatformSchema,
  identity: creatorIdentitySchema,
  handle: z.string(),
  profileUrl: z.string().url(),
  avatarUrl: z.string().url().optional(),
  followerCount: z.number().optional(),
  postCount: z.number().optional(),
  lastSyncedAt: z.string().optional(),
  published: z.boolean().default(true),
  placeholder: z.boolean().default(false),
});
export type SocialProfile = z.infer<typeof socialProfileSchema>;

export const socialContentItemSchema = z.object({
  id: z.string(),
  platform: socialPlatformSchema,
  identity: creatorIdentitySchema,
  title: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  publishedAt: z.string().optional(),
  metrics: z
    .object({
      views: z.number().optional(),
      likes: z.number().optional(),
    })
    .optional(),
});
export type SocialContentItem = z.infer<typeof socialContentItemSchema>;

export const exploreItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.enum([
    "travel",
    "ride",
    "review",
    "place",
    "moment",
    "inspiration",
  ]),
  summary: z.string(),
  place: z.string().optional(),
  published: z.boolean().default(true),
  placeholder: z.boolean().default(false),
});
export type ExploreItem = z.infer<typeof exploreItemSchema>;

export const educateItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  url: z.string().url().optional(),
  published: z.boolean().default(true),
  placeholder: z.boolean().default(false),
});
export type EducateItem = z.infer<typeof educateItemSchema>;
