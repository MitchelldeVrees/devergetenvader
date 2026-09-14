import Link from "next/link";
import { book, money } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Bestelvoorwaarden en pre-orders | De vergeten vader",
  "Informatie over pre-orderen, betaling, verzending, annuleren en contact bij een bestelling van De vergeten vader van Sem de Wachter.",
  "/algemene-voorwaarden",
);
export default function Terms() {
  return (
    <article className="content-shell prose">
      <p className="kicker">Helder voor je bestelt</p>
      <h1>Algemene voorwaarden</h1>
      {process.env.TERMS_APPROVED !== "true" && (
        <p className="notice">
          De verkoopvoorwaarden worden nog definitief gemaakt. Tot die tijd is
          betalen uitgeschakeld.
        </p>
      )}
      <h2>Verkoper en contact</h2>
      <p>
        {process.env.BUSINESS_NAME || book.author}
        <br />
        {process.env.BUSINESS_ADDRESS ||
          "Bedrijfsadres volgt vóór de start van de verkoop."}
        <br />
        {process.env.BUSINESS_KVK
          ? `KvK: ${process.env.BUSINESS_KVK}`
          : "KvK-gegevens volgen vóór de start van de verkoop."}
        {process.env.BUSINESS_VAT && (
          <>
            <br />
            Btw-id: {process.env.BUSINESS_VAT}
          </>
        )}
      </p>
      <p>
        Vragen over je bestelling?{" "}
        <Link prefetch={false} href={`mailto:${book.email}`}>
          {book.email}
        </Link>
        .
      </p>
      <h2>Wat je bestelt</h2>
      <p>
        Je bestelt de paperback van {book.title} van {book.author} voor{" "}
        {money(book.paperbackPrice)} inclusief btw per exemplaar.{" "}
        {book.shipping.policy}. Het aantal en totaalbedrag staan vóór betaling
        in het besteloverzicht.
      </p>
      <h2>Pre-order, betaling en levering</h2>
      <p>
        Dit is een pre-order. Je betaalt bij het bestellen via Mollie; het boek
        wordt later verzonden. De verwachte verzendperiode is:{" "}
        {book.expectedShippingPeriod}. De verzendperiode bij je bestelling wordt
        vastgelegd in je bevestiging. Bij een wijziging nemen we contact met je
        op.
      </p>
      <p>
        Je bestelling is bevestigd nadat de betaling door de betaalprovider is
        bevestigd. Bewaar je bestelnummer. Is de status onduidelijk, neem dan
        contact op voordat je opnieuw betaalt.
      </p>
      <h2>Annuleren en retourneren</h2>
      <p>
        Bij aankoop van de paperback op afstand heb je veertien dagen bedenktijd
        na de dag van ontvangst. Je kunt ook vóór levering laten weten dat je de
        aankoop wilt herroepen. Mail je naam en bestelnummer naar {book.email};
        je hoeft geen reden te geven.
      </p>
      <p>
        Na je herroepingsbericht heb je veertien dagen om het boek terug te
        sturen. De rechtstreekse retourkosten zijn voor jou. We betalen het
        aankoopbedrag en de standaard heenzendkosten binnen veertien dagen na je
        melding terug. We mogen wachten tot we het boek of een bewijs van
        terugzending hebben ontvangen. Gebruik het boek alleen zover nodig om
        het te beoordelen; bij verdergaand gebruik kan waardevermindering worden
        verrekend.
      </p>
      <p>
        Retouradres:{" "}
        {process.env.BUSINESS_RETURN_ADDRESS ||
          process.env.BUSINESS_ADDRESS ||
          "wordt vóór opening van de checkout gepubliceerd"}
        .
      </p>
      <h2>Voorbeeld voor herroeping</h2>
      <p>
        Je kunt deze tekst gebruiken, maar dat is niet verplicht: ‘Hierbij
        herroep ik mijn aankoop van De vergeten vader. Bestelnummer: … Besteld
        op: … Ontvangen op: … Naam: … Adres: … Datum: …’ Stuur dit naar het
        contactadres hierboven.
      </p>
      <h2>Er is iets mis met je bestelling</h2>
      <p>
        Is het boek beschadigd, ontbreekt er iets of heb je een andere klacht?
        Neem contact op met je bestelnummer en een beschrijving, zodat we het
        kunnen oplossen. Je wettelijke consumentenrechten blijven gelden.
      </p>
      <p>
        Versie: {process.env.TERMS_VERSION || "2026-09-14"}. Lees ook de{" "}
        <Link prefetch={false} href="/privacy">
          privacyinformatie
        </Link>
        .
      </p>
    </article>
  );
}
