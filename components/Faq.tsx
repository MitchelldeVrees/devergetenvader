import Link from "next/link";
import { book, site } from "@/lib/site";
import { PreorderLink } from "./PreorderLink";
export function Faq() {
  return (
    <section className="content-shell">
      <p className="kicker">Nog één ding</p>
      <h2>Goede vragen. Geen examen.</h2>
      <div className="faq">
        <details>
          <summary>Voor wie is dit boek?</summary>
          <p>
            Voor de man die voor het eerst vader wordt en voor iedereen die hem
            iets herkenbaars wil geven. Lees meer over{" "}
            <Link prefetch={false} href="/boek-aanstaande-vader">
              het boek voor aanstaande vaders
            </Link>
            .
          </p>
        </details>
        <details>
          <summary>Is dit een zwangerschapshandboek?</summary>
          <p>
            Nee. Verwacht persoonlijke verhalen, droge humor en herkenning. Voor
            medische vragen ga je naar je verloskundige of arts.
          </p>
        </details>
        <details>
          <summary>Wanneer krijg ik mijn pre-order?</summary>
          <p>
            {book.expectedShippingPeriod}. Je betaalt bij het plaatsen van je
            bestelling. Het boek wordt later verstuurd; de afgesproken
            verzendperiode staat ook in je bevestiging.
          </p>
        </details>
        <details>
          <summary>Wat kost het, inclusief verzending?</summary>
          <p>
            De paperback kost {site.price}. {book.shipping.policy}. Het totaal
            staat vóór betaling in de checkout.
          </p>
        </details>
        <details>
          <summary>Kan ik het cadeau geven?</summary>
          <p>
            Zeker. Je kunt bij het afrekenen het bezorgadres van de ontvanger
            invullen. De bevestiging gaat naar jouw e-mailadres. Houd rekening
            met de verzendperiode: het is een pre-order.{" "}
            <Link prefetch={false} href="/cadeau-aanstaande-vader">
              Een cadeau voor de aanstaande vader
            </Link>
            .
          </p>
        </details>
        <details>
          <summary>Waar kan ik terecht met een vraag?</summary>
          <p>
            Mail naar{" "}
            <Link prefetch={false} href={`mailto:${book.email}`}>
              {book.email}
            </Link>
            . De{" "}
            <Link prefetch={false} href="/algemene-voorwaarden">
              bestelvoorwaarden
            </Link>{" "}
            en{" "}
            <Link prefetch={false} href="/privacy">
              privacyinformatie
            </Link>{" "}
            vind je ook onderaan iedere pagina.
          </p>
        </details>
      </div>
      <p className="section-action">
        <PreorderLink />
      </p>
    </section>
  );
}
