import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { contentPages } from "@/lib/content";
import { book } from "@/lib/site";
import {
  articleSchema,
  bookSchema,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Order } from "@/components/Order";
import { RichText, plainText } from "@/components/RichText";
import { PreorderLink } from "@/components/PreorderLink";

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

export function generateStaticParams() {
  return contentPages.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = contentPages.find((p) => p.slug === slug);
  if (!entry) notFound();
  return pageMetadata(entry.title, entry.description, `/${slug}`);
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = contentPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const commercial = ["Het boek", "Cadeau-idee"].includes(page.category);
  const trail = [
    { name: book.title, path: "/" },
    { name: "Verhalen & tips", path: "/blog" },
    { name: page.heading, path: `/${slug}` },
  ];
  return (
    <>
      <JsonLd data={articleSchema(page, commercial)} />
      <JsonLd data={breadcrumbSchema(trail)} />
      {page.faq && (
        <JsonLd
          data={faqSchema(page.faq.map(({ q, a }) => ({ q, a: plainText(a) })))}
        />
      )}
      {slug === "boek-aanstaande-vader" && <JsonLd data={bookSchema()} />}
      <article className="content-shell prose">
        <nav className="breadcrumbs" aria-label="Broodkruimels">
          <Link prefetch={false} href="/">
            De vergeten vader
          </Link>
          <span aria-hidden="true"> / </span>
          <Link prefetch={false} href="/blog">
            Verhalen & tips
          </Link>
        </nav>
        <p className="kicker">{page.category}</p>
        <h1>{page.heading}</h1>
        {page.tagline && <p className="tagline">{page.tagline}</p>}
        <p className="intro">
          <RichText text={page.intro} />
        </p>
        <p className="byline">
          Door{" "}
          <Link prefetch={false} href="/over-sem">
            {book.author}
          </Link>{" "}
          · Bijgewerkt op{" "}
          <time dateTime={page.updated}>{dateLabel(page.updated)}</time>
        </p>
        {commercial && (
          <Image
            className="article-cover"
            src={book.coverImage}
            width={book.coverWidth}
            height={book.coverHeight}
            alt={`Boekomslag van ${book.title} van ${book.author}`}
            sizes="220px"
          />
        )}
        {page.sections.map((section) => {
          const List = section.ordered ? "ol" : "ul";
          return (
            <section key={section.heading} id={section.id}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
              {section.items && (
                <List className="item-list">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <h3>{item.title}</h3>
                      <p>
                        <RichText text={item.text} />
                      </p>
                    </li>
                  ))}
                </List>
              )}
              {section.after?.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </section>
          );
        })}
        {page.faq && (
          <section>
            <h2>Veelgestelde vragen</h2>
            <div className="faq">
              {page.faq.map(({ q, a }) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>
                    <RichText text={a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
        <p className="section-action">
          <PreorderLink />
        </p>
        <p>
          <Link prefetch={false} href="/#fragment">
            Lees het fragment uit hoofdstuk 10: Hormonen, een veldgids →
          </Link>
        </p>
        <aside className="related">
          <h2>Verder lezen</h2>
          <ul>
            {page.related.map((slug) => (
              <li key={slug}>
                <Link prefetch={false} href={`/${slug}`}>
                  {contentPages.find((p) => p.slug === slug)?.heading ||
                    "Over Sem de Wachter"}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
      <Order />
    </>
  );
}
