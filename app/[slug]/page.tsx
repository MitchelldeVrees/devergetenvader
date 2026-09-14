import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { contentPages } from "@/lib/content";
import { book, absoluteUrl } from "@/lib/site";
import { bookSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Order } from "@/components/Order";
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
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": commercial ? "WebPage" : "Article",
          headline: page.heading,
          name: page.heading,
          description: page.description,
          url: absoluteUrl(`/${slug}`),
          inLanguage: "nl",
          mainEntityOfPage: absoluteUrl(`/${slug}`),
          image: absoluteUrl(book.coverImage),
          publisher: {
            "@type": "Person",
            name: book.author,
            url: absoluteUrl("/over-sem"),
          },
        }}
      />
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
        <p className="intro">{page.intro}</p>
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
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
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
