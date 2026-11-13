import type { MetadataRoute } from "next";
import { contentPages, publicRoutes } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => {
    const page = contentPages.find((p) => `/${p.slug}` === path);
    return {
      url: absoluteUrl(path),
      ...(page ? { lastModified: page.updated } : {}),
    };
  });
}
