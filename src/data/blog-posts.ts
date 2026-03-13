export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    title: "What Is Illinois HB3773 and Do I Need to Care?",
    slug: "what-is-illinois-hb3773",
    description:
      "Illinois HB3773 is the state's AI hiring law — and it applies to more businesses than you'd think. Here's what it actually requires, who it covers, and what happens if you ignore it.",
    date: "2026-03-12",
    author: "AI Compliance Documents Team",
    readTime: "6 min read",
    tags: ["Illinois", "HB3773", "AI hiring law", "compliance"],
    published: true,
  },
  {
    title: "AI Compliance for Small Business: A No-BS Guide",
    slug: "ai-compliance-small-business",
    description:
      "Which AI laws actually apply to your small business? Spoiler: probably more than you think. We break down the deployer vs. developer distinction and what you actually need to do.",
    date: "2026-03-12",
    author: "AI Compliance Documents Team",
    readTime: "7 min read",
    tags: ["small business", "AI compliance", "deployer", "developer"],
    published: true,
  },
  {
    title: "Colorado SB24-205 Is Coming in June 2026: Here's What You Actually Need to Do",
    slug: "colorado-sb24-205-guide",
    description:
      "Colorado's AI law kicks in June 30, 2026 — and it has an affirmative defense provision that could save your company if you've done the work. Here's the plain-language breakdown.",
    date: "2026-03-12",
    author: "AI Compliance Documents Team",
    readTime: "7 min read",
    tags: ["Colorado", "SB24-205", "AI law", "compliance deadline"],
    published: true,
  },
];
