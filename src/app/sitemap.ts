import { regulations } from "@/data/regulations";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aicomplydocs.com";

  const regulationPages = regulations.map((r) => ({
    url: `${base}/regulations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...regulationPages,
  ];
}
