import type { MetadataRoute } from "next";
import { getBaseUrl, isProduction } from "@/lib/site";

/**
 * Blocks preview/local deployments from being crawled while still allowing
 * everything on the real domain — pairs with the `robots` block in
 * app/layout.tsx so a stray preview URL can never outrank production.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: isProduction() ? "/" : undefined,
      disallow: isProduction() ? undefined : "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
