import Link from "next/link";
import { book, absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Order } from "@/components/Order";
export const metadata = pageMetadata(
  "Sem de Wachter | Auteur van De vergeten vader",
  "Maak kennis met Sem de Wachter, auteur van De vergeten vader. Waarom hij het boek schreef dat hij zelf had willen lezen toen hij vader werd.",
  "/over-sem",
);
export default function AuthorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": absoluteUrl("/over-sem#author"),
          name: book.author,
          url: absoluteUrl("/over-sem"),
          description:
            "Auteur van De vergeten vader, een persoonlijk en humoristisch boek over vader worden.",
        }}
      />
      <article className="content-shell prose">
        <p className="kicker">De auteur</p>
        <h1>Sem de Wachter</h1>
        <p className="intro">Ik was die vergeten vader.</p>
        <h2>Het boek dat ik zelf had willen lezen</h2>
        <p>
          Negen maanden lang zat ik in wachtkamers waar niemand mij iets vroeg.
          Ik heb alles opgeschreven: de blunders, de zenuwen, de reclames met
          honden. Dit boek is wat ik zelf had willen lezen.
        </p>
        <p>
          Inmiddels ben ik vader. Nog steeds geen expert — wel
          ervaringsdeskundige.
        </p>
        <h2>De man naast de buik</h2>
        <p>
          De vergeten vader vertelt over betrokken zijn en ondertussen zoeken
          naar je eigen plek. Met korte hoofdstukken, droge humor en De
          Vergeetschaal. Geen medisch handboek, maar een persoonlijk perspectief
          op vader worden.
        </p>
        <p>
          <Link prefetch={false} href="/#fragment">
            Lees het fragment uit het boek
          </Link>{" "}
          of ontdek{" "}
          <Link prefetch={false} href="/boek-aanstaande-vader">
            voor wie De vergeten vader geschreven is
          </Link>
          .
        </p>
        <h2>Contact</h2>
        <p>
          Een vraag over het boek of je bestelling? Mail naar{" "}
          <Link prefetch={false} href={`mailto:${book.email}`}>
            {book.email}
          </Link>
          .
        </p>
      </article>
      <Order />
    </>
  );
}
