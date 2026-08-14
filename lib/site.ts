/**
 * Single place for the numbers and strings that change per print run.
 * The design exposed `price` as an editable prop; here it is a constant
 * so every "Bestel"-knop and the order card stay in sync.
 */
export const site = {
  title: "De vergeten vader",
  price: "€22,50",
  ebookPrice: "€12,50",
  pages: 118,
  email: "hallo@devergetenvader.nl",
  // Meta description only (not rendered on the page — see Hero.tsx for the
  // on-page lede). Written for search snippets: leads with the "cadeau"
  // intent since that's how most of our traffic searches, not with the title.
  description:
    "Zwangerschapscadeau met humor: De vergeten vader is het boek voor de aanstaande vader, vol grappige, eerlijke verhalen vanaf de andere kant van de echo.",
  // TODO: swap in the real author name once confirmed — used in JSON-LD
  // and metadata.authors, both meaningful E-E-A-T/knowledge-graph signals.
  author: "TBD",
} as const;

/**
 * Resolves the deployed origin so metadata, robots.txt and sitemap.xml all
 * point at the real domain instead of localhost once this ships. Mirrors
 * the fallback chain Next.js recommends for Vercel deployments.
 */
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/** True only for the production deployment — used to keep preview/staging
 * URLs out of Google's index (and to gate the sitemap/robots allow rule). */
export function isProduction() {
  return process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
}
