import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { getBaseUrl, isProduction, site } from "@/lib/site";
import { WaitlistProvider } from "@/components/WaitlistModal";
import "./globals.css";

/** Lets Next resolve the relative OG image to an absolute URL. */
const baseUrl = getBaseUrl();

// Kept in one place: the SERP/share title. "cadeau" + "zwangerschap" are the
// two words gift-shoppers actually type, so they lead the title instead of
// just riding along in the description.
const seoTitle = `${site.title} — hét zwangerschapscadeau voor de aanstaande vader`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: seoTitle,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  keywords: [
    "cadeau voor aanstaande vader",
    "zwangerschapscadeau man",
    "cadeau voor a.s. vader",
    "boek voor mannen zwangerschap",
    "kraamcadeau vader",
    "De vergeten vader",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    // Only let Google index the real production domain — Vercel preview
    // and local builds share this same metadata and would otherwise create
    // duplicate, unindexed-but-crawlable copies of the homepage.
    index: isProduction(),
    follow: isProduction(),
  },
  authors: [{ name: site.author }],
  category: "books",
  openGraph: {
    title: seoTitle,
    description: site.description,
    url: "/",
    siteName: site.title,
    locale: "nl_NL",
    type: "book",
    images: [
      {
        url: "/cover.jpg",
        width: 1055,
        height: 1491,
        alt: `Omslag van ${site.title} — cadeau voor de aanstaande vader`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: site.description,
    images: ["/cover.jpg"],
  },
};

/**
 * Book + Offer structured data. Lives site-wide (not per-section) because
 * it describes the product the whole page sells — Google attaches it to
 * whichever URL it's found on, which today is only "/". Availability is
 * PreOrder until the waitlist flips to a real checkout; update then.
 */
const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: site.title,
  inLanguage: "nl",
  numberOfPages: site.pages,
  bookFormat: "https://schema.org/Paperback",
  image: `${baseUrl}/cover.jpg`,
  description: site.description,
  audience: {
    "@type": "Audience",
    audienceType: "Aanstaande vaders, partners tijdens zwangerschap",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Paperback",
      price: site.price.replace(/[^0-9,]/g, "").replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: `${baseUrl}/#bestel`,
    },
    {
      "@type": "Offer",
      name: "E-book",
      price: site.ebookPrice.replace(/[^0-9,]/g, "").replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: `${baseUrl}/#bestel`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
        />
        <WaitlistProvider>{children}</WaitlistProvider>
      </body>
    </html>
  );
}
