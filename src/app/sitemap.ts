import { regulations } from "@/data/regulations";
import { getAllBlogPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aicompliancedocuments.com";
  const siteLastUpdated = new Date("2026-03-14");

  const regulationPages = regulations.filter((r) => r.ready).map((r) => ({
    url: `${base}/regulations/${r.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "weekly" as const,
    priority: r.status === "in-effect" ? 0.9 : 0.8,
  }));

  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: siteLastUpdated, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/regulations`, lastModified: siteLastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ai-compliance-by-state`, lastModified: siteLastUpdated, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: siteLastUpdated, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/do-i-need-ai-compliance`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/faq`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.3 },
    ...regulationPages,
    ...blogPosts,
  ];
}
