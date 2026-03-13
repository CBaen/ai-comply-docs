import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    const stats = readingTime(raw);

    return {
      title: data.title as string,
      slug: data.slug as string,
      description: data.description as string,
      date: data.date as string,
      author: data.author as string,
      readTime: stats.text,
      tags: (data.tags as string[]) ?? [],
      published: (data.published as boolean) ?? false,
    };
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPostFull | null {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    if (data.slug === slug) {
      const stats = readingTime(raw);
      return {
        title: data.title as string,
        slug: data.slug as string,
        description: data.description as string,
        date: data.date as string,
        author: data.author as string,
        readTime: stats.text,
        tags: (data.tags as string[]) ?? [],
        published: (data.published as boolean) ?? false,
        content,
      };
    }
  }

  return null;
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPostMeta[] {
  return getAllBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}
