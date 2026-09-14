/** Editorial and commercial facts. Prices are integer euro cents, including VAT. */
export const book = {
  title: "De vergeten vader",
  author: "Sem de Wachter",
  paperbackPrice: 2250,
  ebookPrice: 1250,
  ebookAvailable: false,
  isbn: null as string | null,
  pages: null as number | null, // Repository: 208; brief: 118. Await final PDF.
  publicationDate: null as string | null,
  expectedShippingDate: process.env.NEXT_PUBLIC_PREORDER_SHIPPING_DATE || null,
  expectedShippingPeriod:
    process.env.NEXT_PUBLIC_PREORDER_SHIPPING_PERIOD ||
    "Verzendperiode wordt nog bekendgemaakt",
  availability: "preorder" as "preorder" | "in_stock" | "unavailable",
  shipping: {
    countries: ["NL"],
    price: 0,
    policy: "Gratis verzending binnen Nederland",
  },
  description:
    "Een grappig en eerlijk boek over zwangerschap door de ogen van de man naast de buik. Voor aanstaande vaders én als origineel zwangerschapscadeau. Pre-order De vergeten vader.",
  coverImage: "/cover.jpg",
  coverWidth: 1055,
  coverHeight: 1491,
  canonicalDomain: "https://www.devergetenvader.com",
  email: "hallo@devergetenvader.nl", // Existing address; confirm ownership.
  sku: "DVV-PAPERBACK",
} as const;
export const money = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
export const site = {
  ...book,
  price: money(book.paperbackPrice),
  ebookPrice: money(book.ebookPrice),
};
export const absoluteUrl = (path = "/") =>
  path === "/"
    ? book.canonicalDomain
    : new URL(path, book.canonicalDomain).href;
