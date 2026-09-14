# De vergeten vader

De bestaande warme, redactionele boekwebsite van Sem de Wachter, uitgebreid met statische inhoudspagina's, SEO en een pre-ordercheckout.

**Stack:** Next.js 15 App Router, React 19, TypeScript, CSS Modules, next/image, next/font. Content is statisch gegenereerd; checkout-API's draaien server-side op Node.js. Bestaande Vercel-deployment blijft bruikbaar. Mollie verwerkt iDEAL, PostgreSQL bewaart orders en Resend verwerkt bevestigingen en de bestaande wachtlijst.

```text
npm ci
npm run dev
```

Open http://localhost:3000. Zonder configuratie kun je alle inhoud bekijken; afrekenen is zichtbaar maar uitgeschakeld. Vul `.env.local` vanuit `.env.example` met je eigen gegevens. Zie **[SEO_SETUP.md](SEO_SETUP.md)** voor de volledige livegang, betaaltests, operationele controles en exacte Google Search Console-stappen.

Met een Mollie-testsleutel in `.env.local` kun je `npm run dev:checkout` starten. De werkende testcheckout staat dan op http://localhost:3001/bestellen. Dit gebruikt een lokale, blijvende testdatabase in `.test-db/`, simuleert betalingen via de echte Mollie-testomgeving en verstuurt geen boeken of e-mails. Productie blijft afzonderlijk beveiligd tegen ontbrekende configuratie. Voor Vercel/Supabase-testen kun je expliciet `CHECKOUT_TEST_MODE=true` gebruiken met een testkey; deze uitzondering werkt nooit met een livekey.

Gebruik `npm run dev:checkout:cloud` om dezelfde lokale testcheckout met de geconfigureerde Supabase-database te starten. De tabellen zijn aangemaakt in `bookshop`. Met die server actief voert `npm run test:mollie` drie gelijktijdige requests uit en controleert dat één testorder en één checkout ontstaan. Dit maakt een onbetaalde testbetaling aan; het doet geen echte afschrijving. `npm run test:checkout-ui` test het formulier met onderschepte API-responses.

## Waar je iets wijzigt

| Onderdeel                                           | Bestand                                        |
| --------------------------------------------------- | ---------------------------------------------- |
| Boek, prijzen, omslag, verzendbeleid, ISBN/pagina's | `lib/site.ts`                                  |
| Artikelen en commerciële landingspagina's           | `lib/content.ts`                               |
| Metadata en Product/Book/Offer                      | `lib/seo.ts`                                   |
| Homepage en bestaande secties                       | `app/page.tsx`, `components/`                  |
| Kleuren, typografie, mobiele lay-out                | `app/globals.css`, CSS Modules                 |
| Checkout, orders en providercontrole                | `lib/orders.ts`, `lib/mollie.ts`, `app/api/`   |
| Database                                            | `db/001_orders.sql`                            |
| Consent en events                                   | `components/Analytics.tsx`, `lib/analytics.ts` |

Artikelen toevoegen: voeg een object toe aan `contentPages`. Route, metadata en sitemap volgen automatisch. Plaats relevante interne links en voeg het artikel eventueel toe aan gerelateerde pagina's. Voeg geen fictieve recensies, data of auteursclaims toe.

## Kwaliteitscontroles

`npm run lint`, `npm run typecheck`, `npm test`, `npm run test:orders`, `npm run build`, `npm run test:e2e`. Browsercontroles gebruiken standaard Edge op Windows en draaien tegen de productiebuild. Rapporten/schermafbeeldingen staan lokaal in `playwright-report/` en `artifacts/` (niet in git).

Het testpakket bestrijkt prijsvalidatie, betaalverificatie, idempotency, databaseopslag, time-out-herstel, bevestiging zonder duplicaten, metadata, sitemap, openbare links, toetsenbord/dialog, toegankelijkheid, zes schermbreedtes en vervalste betaalstatussen. Echte providercredentials, e-mailbezorging, platformredirects en Google-indexering vergen de controles na deployment.
