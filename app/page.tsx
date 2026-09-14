import { Hero } from "@/components/Hero";
import { Reasons } from "@/components/Reasons";
import { Fragment } from "@/components/Fragment";
import { Order } from "@/components/Order";
import { Author } from "@/components/Author";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCards } from "@/components/ArticleCards";
import { bookSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, book } from "@/lib/site";
export const metadata = pageMetadata(
  `${book.title} | Boek voor aanstaande vaders – ${book.author}`,
  book.description,
  "/",
);
export default function Home() {
  return (
    <>
      <JsonLd data={bookSchema()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": absoluteUrl("/#website"),
          name: `${book.title} — ${book.author}`,
          url: absoluteUrl(),
        }}
      />
      <Hero />
      <Reasons />
      <Fragment />
      <Author />
      <Order />
      <ArticleCards />
      <Faq />
    </>
  );
}
