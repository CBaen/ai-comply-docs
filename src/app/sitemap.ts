import { regulations } from "@/data/regulations";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aicomplydocs.com";

  const regulationPages = regulations.map((r) => ({
    url: `${base}/regulations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r.status === "in-effect" ? 0.9 : 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...regulationPages,
  ];
}
