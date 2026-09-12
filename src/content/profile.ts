import { profileSchema, type Profile } from "./schemas";

export const profile: Profile = profileSchema.parse({
  fullName: "Lakshan Madhusanka",
  wordmark: "LAKSHAN MADHUSANKA",
  identityStatement: "I BUILD. I LEARN. I EXPLORE. I SHARE.",
  supportingLine:
    "Software Engineer @ iVedha · Computer Science & Engineering · Creator of LakzJourney & Lakshan Madhusanka",
  currentRole: "Software Engineer @ iVedha",
  education: "Computer Science & Engineering",
  rotatingSentences: [
    "Currently building software.",
    "Sometimes chasing roads.",
    "Always learning something.",
    "Sharing what I figure out.",
  ],
  links: {
    github: "https://github.com/lakshan1946",
    linkedin: "https://www.linkedin.com/in/lakshan1946",
    email: "hello@lakshan.me",
  },
});
