import Link from "next/link";
import { book } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy en cookies | De vergeten vader",
  "Hoe De vergeten vader omgaat met je bestelgegevens, boekupdates en optionele statistieken. Contact en informatie over je privacykeuzes.",
  "/privacy",
);
export default function Privacy() {
  return (
    <article className="content-shell prose">
      <p className="kicker">Je gegevens</p>
      <h1>Privacy</h1>
      <h2>Wie je kunt bereiken</h2>
      <p>
        {process.env.BUSINESS_NAME || book.author} beheert deze website. Vragen
        over je persoonsgegevens kun je sturen naar{" "}
        <Link prefetch={false} href={`mailto:${book.email}`}>
          {book.email}
        </Link>
        . De{" "}
        <Link prefetch={false} href="/algemene-voorwaarden">
          bedrijfsgegevens
        </Link>{" "}
        staan bij de bestelvoorwaarden.
      </p>
      <h2>Als je een boek bestelt</h2>
      <p>
        We verwerken naam, e-mailadres, bezorgadres, aantal boeken en
        betaalstatus om je bestelling uit te voeren. De bestelling wordt in een
        afgeschermde database bewaard. Mollie verwerkt de betaling; we ontvangen
        geen bankinloggegevens. Resend verstuurt de orderbevestiging. Voor de
        bezorging worden de noodzakelijke adresgegevens aan de gekozen
        vervoerder verstrekt.
      </p>
      <p>
        De grondslag voor het uitvoeren van je bestelling is de overeenkomst.
        Gegevens die nodig zijn voor wettelijke administratie worden daarvoor
        bewaard. We gebruiken je besteladres niet automatisch voor boekupdates.
      </p>
      <h2>Als je boekupdates wilt</h2>
      <p>
        Alleen wanneer je je zelf inschrijft, slaan we je e-mailadres op bij
        Resend voor boekupdates. Je toestemming is hiervoor de grondslag. Je
        kunt je via de uitschrijflink in iedere update afmelden, of mailen naar
        het contactadres hierboven.
      </p>
      <h2>Statistieken en lokale opslag</h2>
      <p>
        Optionele Google Analytics-statistieken worden pas geladen nadat je
        toestemming hebt gegeven. We meten dan bezoeken, het lezen van het
        fragment, pre-orderklikken, gestarte checkouts, aankopen en
        inschrijvingen. Namen, e-mailadressen, bezorgadressen en geheime
        bestellinks sturen we niet mee. Bij aankopen gebruiken we een
        willekeurig bestelnummer, bedrag en aantal. Advertentiefuncties zijn
        uitgeschakeld.
      </p>
      <p>
        Je keuze kun je wijzigen via ‘Privacyvoorkeuren wijzigen’ onderaan de
        pagina wanneer statistieken zijn ingesteld. Zonder toestemming kun je de
        site en checkout gewoon gebruiken. Google kan gegevens buiten de
        Europese Economische Ruimte verwerken; informatie hierover staat in{" "}
        <Link prefetch={false} href="https://policies.google.com/privacy">
          het privacybeleid van Google
        </Link>
        .
      </p>
      <p>
        Je browser bewaart je privacykeuze en tijdelijk een willekeurige
        checkoutcode om een betaalpoging veilig te herhalen. De geheime
        toegangscode tot je bestelstatus wordt alleen voor jouw browsersessie
        bewaard. De webshop slaat geen adresvelden lokaal op.
      </p>
      <h2>Bewaren en verwijderen</h2>
      <p>
        We bewaren gegevens zolang dat nodig is voor de bestelling, service en
        wettelijke administratie. Je kunt verzoeken om inzage, correctie of
        verwijdering en, waar van toepassing, overdracht of beperking van de
        verwerking. Sommige administratieve gegevens moeten we wettelijk
        bewaren. Trek je toestemming voor updates of statistieken in, dan
        stoppen we die verwerking.
      </p>
      <h2>Een vraag of klacht</h2>
      <p>
        Mail {book.email}. Je kunt ook een klacht indienen bij de{" "}
        <Link
          prefetch={false}
          href="https://www.autoriteitpersoonsgegevens.nl/"
        >
          Autoriteit Persoonsgegevens
        </Link>
        .
      </p>
    </article>
  );
}
