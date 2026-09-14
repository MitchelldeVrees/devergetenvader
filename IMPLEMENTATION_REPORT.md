# Implementatie — De vergeten vader

## Oorspronkelijke situatie

De repository was een Next.js 15/React 19 App Router-landingspagina met TypeScript en CSS Modules. Content werd al op de server weergegeven; een stackmigratie was niet nodig. README wees op Vercel. Er was geen betaalprovider, winkelmand, orderdatabase of analytics-integratie. Alle koopknoppen openden een Resend-wachtlijstdialoog. Algemene voorwaarden waren alleen tekst in de footer.

De bestaande componenten Hero, Nav, Reasons, Fragment, Order, Footer en WaitlistModal zijn hergebruikt. Author bestond al maar werd niet getoond en bevatte een fotoplaatshouder. Quotes bevatte drie onbevestigde reacties. De omslag is een JPEG van 1055 × 1491 pixels en 106.614 bytes; next/image was al aanwezig. Vier Google Fonts werden via next/font zelf gehost, maar de build was nog afhankelijk van het ophalen van fonts.

De **live site verschilde van de repository**: live waren al een FAQ, robots.txt en een sitemap met één URL aanwezig. Live stond 118 pagina's, in de repository 208. De live voorwaarden-URL gaf 404. Zowel live als in code stonden de achterhaalde afrondingsmelding, hoofdstuk twaalf en wachtlijstgerichte bestelknoppen. Mobiele CSS had vaste minimumkolommen van 280–320 px binnen pagina's met zijmarges; tekst op oranje had diverse contrastproblemen.

## Wat is veranderd

| Onderdeel                                                                      | Belangrijkste bestanden                                                                                                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Centrale boekgegevens, eurocentprijzen, verzendbeleid, onbekende ISBN/pagina's | `lib/site.ts`, `lib/pricing.ts`                                                                                                                                                |
| Bestaande vormgeving en conversie                                              | `components/Hero`, `Nav`, `Reasons`, `Fragment`, `Order`, `Author`, `Footer`, hun CSS Modules                                                                                  |
| Herhaalde CTA, FAQ, sticky mobiel, artikelen                                   | `components/PreorderLink.tsx`, `Faq.tsx`, `ArticleCards.tsx`, `Analytics.tsx`                                                                                                  |
| Content en statische routing                                                   | `lib/content.ts`, `app/[slug]/page.tsx`, `app/blog`, `app/over-sem`                                                                                                       |
| Metadata en schema                                                             | `lib/seo.ts`, `components/JsonLd.tsx`, `app/layout.tsx`, `app/page.tsx`                                                                                                        |
| Indexering, socials, redirects                                                 | `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`, `next.config.mjs`                                                                                |
| Checkout en status                                                             | `app/bestellen`, `app/bestelling/[id]`, `components/CheckoutForm.tsx`, `OrderStatus.tsx`                                                                                       |
| Betalen en orderopslag                                                         | `lib/orders.ts`, `mollie.ts`, `db.ts`, `checkout-config.ts`, `checkout-validation.ts`, `request-security.ts`, `app/api/checkout`, `app/api/payments/webhook`, `app/api/orders` |
| Database en lokaal testen                                                      | `db/001_orders.sql`, `scripts/migrate.mjs`, `scripts/dev-checkout.mjs`                                                                                                         |
| Privacy, voorwaarden, nieuwsbrief                                              | `app/privacy`, `app/algemene-voorwaarden`, `components/WaitlistModal.tsx`, `app/api/waitlist/route.ts`                                                                         |
| Fonts en buildveiligheid                                                       | `app/fonts.ts`, `public/fonts/`, `scripts/subset-fonts.py`, `package.json`, lockfile                                                                                           |
| Tests en documentatie                                                          | `tests/`, `playwright.config.ts`, `eslint.config.mjs`, `SEO_SETUP.md`, `README.md`, `.env.example`                                                                             |

De onbevestigde Quotes-component en de fictieve auteursfotoplaatshouder zijn verwijderd. De warme oranje/crème/blauwe identiteit, cover, doorgestreepte titel, humor, fragment en Vergeetschaal zijn behouden. De leesbaarheid is verhoogd met donkerdere tekst op oranje en donkerdere rode knoppen. De mobiele hero toont omslag naast titel en de koopactie direct onder de korte introductie.

## SEO en nieuwe routes

Alle openbare inhoud heeft unieke title, description, canonical, Open Graph- en Twittermetadata. Er is één H1 per pagina. De auteur staat consequent in de merkcontext. De zes contentroutes worden via generateStaticParams vooraf als HTML opgebouwd. Nieuwe artikelen kunnen via één contentregister worden toegevoegd, inclusief sitemaproute.

Naast `/` zijn toegevoegd:

- `/boek-aanstaande-vader`
- `/cadeau-aanstaande-vader`
- `/eerste-keer-vader-worden`
- `/tips-aanstaande-vader`
- `/wat-niemand-aan-de-vader-vraagt`
- `/vader-tijdens-de-bevalling`
- `/blog`
- `/over-sem`
- `/bestellen`
- `/algemene-voorwaarden`
- `/privacy`

Individuele bestellingen staan onder `/bestelling/[id]` en zijn noindex/nofollow met no-store/no-referrer. API's staan niet in de sitemap. De sitemap bevat alle 12 canonieke openbare pagina's. Onbekende paden geven 404. De non-www-host verwijst met 301 naar www. HTTPS en alternatieve domeinen moeten in Vercel worden nagekeken.

JSON-LD bevat Book + Product met Offer/PreOrder op homepage en boekpagina, Person voor Sem de Wachter, WebSite en WebPage/Article waar passend. Prijs, EUR, auteur, afbeelding en URL komen uit de centrale configuratie. ISBN, paginatal, publicatiedatum en reviews zijn niet verzonnen. Lokaal zijn de vereiste Product-snippetvelden gecontroleerd; de daadwerkelijke Google Rich Results Test moet na publicatie worden uitgevoerd.

## Pre-order en betaling

De hoofdactie is consequent Pre-order nu. De prijs blijft €22,50. De wachtlijst is secundair. De checkout vraagt uitsluitend naam, e-mail, adres, aantal en akkoord met de voorwaarden, zonder account. Kosten, totaal en pre-orderkarakter staan vóór de betaalactie.

Mollie verwerkt iDEAL via een gehoste betaalpagina. De bestelling wordt **vóór** de betaalrequest duurzaam vastgelegd. Unieke request-ID's, PostgreSQL-vergrendeling en Mollie-idempotency voorkomen dubbele orders. De server bepaalt het bedrag. De betaalstatus wordt rechtstreeks bij Mollie gecontroleerd; een URL-parameter kan geen succesvolle aankoop veroorzaken.

Het afzonderlijke PostgreSQL-schema `bookshop` bewaart order-ID, koper, adres, formaat, aantal, prijs, totaal, betaald bedrag, status, tijdstip, verzendafspraak en pre-orderstatus. De door Mitchell verstrekte Supabase-database is verbonden en de tabellen zijn aangemaakt. RLS is gecontroleerd; de rollen anon en authenticated hebben geen toegang tot het schema. Er is geen publieke orderadministratie of databaseclient in de browser. De databasegegevens staan uitsluitend in het genegeerde `.env.local`.

Betaalde orders krijgen een persistente bevestigingsmailpayload voor Resend. Een webhook en beveiligde reconciliatieroute verzorgen verwerking en retries. Onzekere requests buiten de idempotency-termijnen vragen om controle in het provider-dashboard. Verzendadministratie en terugbetalingen worden door de eigenaar beheerd; er is geen labelprinter of adminportal toegevoegd.

De door Mitchell verstrekte Mollie-testkey staat uitsluitend in het genegeerde `.env.local`. De echte Mollie-API accepteerde de key (HTTP 200), meldde iDEAL beschikbaar en maakte een testcheckout aan via de applicatie. Drie gelijktijdige requests tegen de echte Supabase/Mollie-combinatie resulteerden in één order en dezelfde checkout voor EUR 22,50, mode=test, status=open. Er is geen livebetaling uitgevoerd. Lokaal testen met Supabase kan met `npm run dev:checkout:cloud` op poort 3001; de productieconfiguratie blijft apart. Testmodus kan nooit met een livekey betalen.

## Performance en toegankelijkheid

- Dezelfde vier fonts zijn lokaal gesubset: ongeveer 122 kB aan WOFF2-bestanden versus ongeveer 214 kB aan eerder geladen fonts. Licenties en reproduceerbaar script zijn inbegrepen; fontdownloads zijn niet meer nodig tijdens de build.
- Responsive WebP-cover met expliciete afmetingen, aangepaste mobiele sizes en prioriteit voor de hero. Ondersteunende afbeeldingen laden lui.
- De checkoutbundel ging tijdens de implementatie van circa 27 kB naar circa 2,9 kB door servervalidatie buiten de clientbundel te houden. Homepage First Load JS is circa 116 kB, checkout circa 109 kB.
- Geen analytics vóór toestemming. Geen onnodige voorlaadacties voor artikelroutes.
- Mobiele kolommen passen ook op 320 px. Er zijn zichtbare focusstijlen, een skiplink, labels, foutmeldingen, reduced-motion-ondersteuning en expliciete Tab/Shift+Tab-cycli in de nieuwsbriefdialoog.
- Next.js is binnen versie 15 bijgewerkt naar 15.5.25. PostCSS/sharp zijn gepatcht via overrides. De productieafhankelijkheden hebben geen gevonden npm-auditmeldingen bij deze controle.

Meetresultaten en resterende livecontroles worden onderaan dit rapport vastgelegd. Lighthouse is een lokale labmeting; echte LCP/CLS/INP hangen mede af van productiehosting en bezoekersapparaten.

## Analytics

`view_book`, `read_sample`, `click_preorder`, `begin_checkout`, `purchase`, `newsletter_signup` lopen via een centrale helper. Purchase bevat transaction-ID, value, currency, items en quantity en volgt pas na servercontrole. Adres, naam en e-mail worden niet meegestuurd. GA4 is optioneel met expliciete toestemming, advertentiefuncties uit en intrekbare voorkeuren. De orderdatabase is de bron voor verkoopcijfers; niet iedere koper geeft toestemming of keert terug naar de site.

## Nog nodig buiten de code

- Publieke testdeployment voor een echte webhooktest; Supabase-verbindingsstring en migratie zijn lokaal aangesloten/uitgevoerd.
- Resend-afzender/API-instellingen en controle van echte e-mailaflevering.
- Verzendperiode, definitieve boekgegevens, contactadrescontrole, bedrijfsgegevens en definitieve voorwaarden/privacytekst.
- Later de live Mollie-key, testmodus uit en een echte bestelling door Mitchell ter controle.
- Deployment, Vercel-domein/HTTPS-controle, scheduler en monitoring.
- De precieze Search Console-procedure, verificatievariabelen, sitemapindiening, URL-inspectie, Rich Results Test en monitoring staan stap voor stap in `SEO_SETUP.md`.

De oorspronkelijke vraag over verzendperiode en de authenticiteit van de reviews is nog onbeantwoord. Die feiten zijn bewust niet ingevuld.

## Uitgevoerde controles

Lokale Lighthouse 12.8.2-meting van de productiebuild:

| Profiel | Performance | Toegankelijkheid | Best practices | SEO | LCP   | CLS  | TBT    |
| ------- | ----------- | ---------------- | -------------- | --- | ----- | ---- | ------ |
| Mobiel  | 92          | 100              | 100            | 100 | 2,8 s | 0,01 | 140 ms |
| Desktop | 100         | 100              | 100            | 100 | 0,6 s | 0    | 0 ms   |

De lokale HTML/JSON-rapporten staan in `artifacts/lighthouse-mobile-final.report.*` en `artifacts/lighthouse-desktop-final.report.*`. Dit is geen meting van de nog ongewijzigde live site en geen INP-veldmeting.

- Zes unitcontroles zijn geslaagd voor centrale prijzen, invoer, betaalbewijs, retrytermijn, metadata, schema, sitemap en robots.
- Zeven orderintegratiescenario's zijn geslaagd met PostgreSQL-semantiek via PGlite en fake providers voor concurrentie, netwerktime-outs, webhookherstel, betaaldetectie, één bevestigingsmail, bedragcontrole en de overstap van test naar live.
- Tien browsertests controleren alle twaalf publieke routes, interne links, canonicals, metadata, foutpagina's, consolefouten, zes schermbreedtes, toetsenbordbediening en toegankelijkheid. Axe vond geen overtredingen in de onderzochte pagina's.
- De checkout-UI is afzonderlijk gecontroleerd op totaalberekening, foutmelding, herhalen met dezelfde request-ID en blokkeren van dubbele verzending.
- De echte Supabase/Mollie-test controleerde drie gelijktijdige aanvragen: één opgeslagen order en dezelfde onbetaalde testcheckout. De status ‘paid’ en e-mailflow zijn met providerfakes getest; publieke webhooks en echte Resend-aflevering blijven livegangcontroles.

Testorders behouden hun eigen betaalmodus na het wisselen van de sleutel. Ze worden niet als liveorders hergebruikt of door de live e-mailverwerking behandeld, sturen geen purchase-event en horen niet in de verzendlijst.

Lint, TypeScript-controle en productiebuild zijn geslaagd. `npm audit` vond nul kwetsbaarheden, inclusief ontwikkelafhankelijkheden. Een controle van 88 commitbare bestanden vond geen ingestelde betaalkey, databasewachtwoord of applicatiegeheimen. `npm run check:launch` weigert de huidige lokale configuratie terecht voor echte verkoop: Resend, verzendperiode, bedrijfsgegevens, voorwaardenakkoord en een livekey ontbreken nog; `CHECKOUT_ENABLED` staat standaard uit.
