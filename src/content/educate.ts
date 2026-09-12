import { educateItemSchema, type EducateItem } from "./schemas";

export const educateItems: EducateItem[] = [
  educateItemSchema.parse({
    id: "edu-programming",
    title: "Programming explanations",
    summary:
      "PLACEHOLDER: Clear walkthroughs of programming concepts for learners who want substance over hype.",
    tags: ["Programming", "Software Engineering"],
    published: true,
    placeholder: true,
  }),
  educateItemSchema.parse({
    id: "edu-web",
    title: "Web & systems thinking",
    summary:
      "PLACEHOLDER: Practical notes on building web software and understanding how systems fit together.",
    tags: ["Web", "Software Engineering"],
    published: true,
    placeholder: true,
  }),
  educateItemSchema.parse({
    id: "edu-ai",
    title: "AI / ML explorations",
    summary:
      "PLACEHOLDER: Educational takes on AI/ML topics grounded in real learning and research curiosity.",
    tags: ["AI/ML"],
    published: true,
    placeholder: true,
  }),
].filter((i) => i.published);
