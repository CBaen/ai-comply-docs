import { NextResponse } from "next/server";
import { regulations } from "@/data/regulations";
import { faqItems } from "@/data/faq";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export interface SearchItem {
  id: string;
  type: "product" | "blog" | "faq";
  title: string;
  subtitle: string;
  url: string;
  keywords: string;
}

export async function GET() {
  const items: SearchItem[] = [];

  // Products
  regulations
    .filter((r) => r.ready)
    .forEach((r) => {
      items.push({
        id: `product-${r.slug}`,
        type: "product",
        title: r.shortName,
        subtitle: r.appliesToSummary || r.description.slice(0, 120),
        url: `/products/${r.slug}`,
        keywords: [r.state, r.name, r.category, ...(r.keywords || [])].join(" "),
      });
    });

  // Blog posts
  const posts = getAllBlogPosts();
  posts.forEach((p) => {
    items.push({
      id: `blog-${p.slug}`,
      type: "blog",
      title: p.title,
      subtitle: p.description,
      url: `/blog/${p.slug}`,
      keywords: (p.tags || []).join(" "),
    });
  });

  // FAQ
  faqItems.forEach((f, i) => {
    items.push({
      id: `faq-${i}`,
      type: "faq",
      title: f.question,
      subtitle: f.answer.slice(0, 120),
      url: `/faq#q${i}`,
      keywords: "",
    });
  });

  return NextResponse.json(items);
}
