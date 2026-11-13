import type { Metadata } from "next";
import { absoluteUrl, book } from "./site";
import type { ContentPage } from "./content";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  index = true,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: "nl_NL",
      siteName: `${book.title} — ${book.author}`,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${book.title} van ${book.author}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
export function bookSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Book", "Product"],
    "@id": absoluteUrl("/#book"),
    name: book.title,
    description: book.description,
    image: absoluteUrl(book.coverImage),
    url: absoluteUrl("/boek-aanstaande-vader"),
    author: {
      "@type": "Person",
      name: book.author,
      "@id": absoluteUrl("/over-sem#author"),
    },
    sku: book.sku,
    inLanguage: "nl",
    bookFormat: "https://schema.org/Paperback",
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.pages ? { numberOfPages: book.pages } : {}),
    ...(book.publicationDate ? { datePublished: book.publicationDate } : {}),
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/bestellen"),
      priceCurrency: "EUR",
      price: (book.paperbackPrice / 100).toFixed(2),
      availability: `https://schema.org/${book.availability === "preorder" ? "PreOrder" : book.availability === "in_stock" ? "InStock" : "OutOfStock"}`,
      ...(book.expectedShippingDate
        ? { availabilityStarts: book.expectedShippingDate }
        : {}),
    },
  };
}
const authorRef = {
  "@type": "Person",
  "@id": absoluteUrl("/over-sem#author"),
  name: book.author,
  url: absoluteUrl("/over-sem"),
};
export function articleSchema(page: ContentPage, commercial: boolean) {
  const url = absoluteUrl(`/${page.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": commercial ? "WebPage" : "Article",
    headline: page.heading,
    name: page.heading,
    description: page.description,
    url,
    inLanguage: "nl",
    mainEntityOfPage: url,
    image: absoluteUrl(book.coverImage),
    datePublished: page.published,
    dateModified: page.updated,
    author: authorRef,
    publisher: authorRef,
    ...(commercial ? { about: { "@id": absoluteUrl("/#book") } } : {}),
  };
}
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
