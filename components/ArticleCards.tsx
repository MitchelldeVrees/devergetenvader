import Link from "next/link";
import { contentPages } from "@/lib/content";
export function ArticleCards() {
  return (
    <section className="content-shell">
      <p className="kicker">Voor tussen de afspraken door</p>
      <h2>Ook naast het boek valt er iets te lezen</h2>
      <div className="article-grid">
        {contentPages
          .filter((p) => !["Het boek", "Cadeau-idee"].includes(p.category))
          .map((page) => (
            <article className="article-card" key={page.slug}>
              <p className="kicker">{page.category}</p>
              <h3>
                <Link prefetch={false} href={`/${page.slug}`}>
                  {page.heading}
                </Link>
              </h3>
              <p>{page.description}</p>
            </article>
          ))}
      </div>
    </section>
  );
}
