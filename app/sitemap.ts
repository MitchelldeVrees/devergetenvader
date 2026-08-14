import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

/**
 * One URL today — this is a single-page site. Kept as its own file (rather
 * than skipped) so the moment a /blog or /fragment route is added, it has
 * somewhere to register itself instead of SEO work getting forgotten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
