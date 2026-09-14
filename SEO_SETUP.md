# De vergeten vader — livegang en Search Console

## 1. Bevestig de boek- en bedrijfsgegevens

`lib/site.ts` is de bron voor titel, auteur, prijzen in eurocenten, omslag, beschikbaarheid, ISBN, paginatal, verzendkosten en domein. Paperback blijft €22,50; e-bookprijs blijft €12,50 maar het e-book is niet verkoopbaar zolang digitale levering ontbreekt. Gratis verzending in NL is overgenomen uit de bestaande site, geen nieuw aanbod.

Nog door Mitchell te bevestigen:

- Verwachte verzendperiode. Vul `NEXT_PUBLIC_PREORDER_SHIPPING_PERIOD` in met een concrete periode, bijvoorbeeld de werkelijk afgesproken maand en jaar. Er is bewust geen datum verzonnen. `NEXT_PUBLIC_PREORDER_SHIPPING_DATE` is optioneel, ISO `YYYY-MM-DD`.
- Publicatiedatum, definitief paginatal en ISBN. Live stond 118 pagina's; de repository bevatte 208. Onbekende waarden worden niet getoond of opgenomen in JSON-LD.
- Gratis NL-verzending, verzending vanuit Nederland en eventuele uitbreiding naar andere landen. De huidige checkout ondersteunt alleen Nederlandse adressen.
- Eigendom en bereikbaarheid van `hallo@devergetenvader.nl`. Het .com-domein is canoniek; het bestaande .nl-adres is niet vervangen door een verzonnen mailbox.
- De authenticiteit en publicatietoestemming voor Thomas, Ilse en Joost. Hun reacties zijn verwijderd bij gebrek aan bewijs; ze blijven beschikbaar in git. Geen review/ratingschema.
- De bestaande persoonlijke auteurstekst en het fragment toetsen aan het definitieve manuscript. De enige concrete hoofdstukverwijzing is gecorrigeerd naar hoofdstuk 10, zoals opgedragen. Een auteursfoto is niet gefabriceerd.
- Bedrijfsnaam, vestigingsadres, KvK, btw-id indien toepasselijk, retouradres en voorwaarden. Er bestond geen voorwaardenpagina in de repository en de live URL gaf 404. De nieuwe basisvoorwaarden vereisen inhoudelijke controle vóór verkoop.
- Privacytekst: concrete databaseleverancier, hosting/verwerkers, vervoerder, bewaartermijnen en eventuele internationale doorgiften vastleggen en tekst waar nodig aanvullen.

## 2. Orderopslag en betaling instellen

De bestaande Supabase-database kan worden gebruikt. Kies in Supabase **Connect → Transaction pooler** en zet de PostgreSQL-verbindingsstring als `DATABASE_URL` in de serveromgeving (geen anon/public API-key). De client gebruikt één verbinding per instantie en `prepare: false`. De migratie plaatst uitsluitend tabellen in het aparte schema `bookshop`, met RLS ingeschakeld en zonder publieke schema/table-rechten; stel dit schema niet beschikbaar aan de Supabase Data API. De serververbinding moet eigenaar/bevoegd beheerder van deze tabellen zijn. Bewaar businessdata buiten dit schema ongewijzigd.

**Direct lokaal testen:** `npm run dev:checkout` gebruikt je echte Mollie-testkey uit `.env.local`, een lokale PGlite-testdatabase en http://localhost:3001/bestellen. Je voert fictieve gegevens in en kiest een status in de Mollie-testcheckout. De status wordt na terugkeer via de echte Mollie-API opgehaald. Er wordt geen e-mail gestuurd; de order en voorbereide bevestiging blijven in de testdatabase. De lokale modus registreert geen onbereikbare webhook. Voor een volledige webhooktest gebruik je een publieke testdeployment met Supabase.

**Publieke testdeployment:** zet `CHECKOUT_ENABLED=true`, `CHECKOUT_TEST_MODE=true`, de Mollie-testkey, `DATABASE_URL`, `ORDER_TOKEN_SECRET` en een bereikbare HTTPS-`CHECKOUT_BASE_URL`. Testmodus toont een duidelijke melding en verstuurt geen e-mails. Deze modus kan zonder verzenddatum/definitieve bedrijfsgegevens worden getest omdat er geen echte aankoop is. Met een livekey wordt deze uitzondering altijd geweigerd: voor echte verkoop zijn de normale gegevens verplicht. Zet `CHECKOUT_TEST_MODE=false` vóór livegang. `CHECKOUT_LOCAL_TEST` is uitsluitend intern voor het lokale startscript en hoort niet op Vercel.

1. De opgegeven Supabase-database is lokaal gekoppeld en de migratie is uitgevoerd in `bookshop`. Gebruik voor Vercel de geschikte pooler-URL als server-side `DATABASE_URL`; controleer back-ups en toegangsrechten. `npm run dev:checkout:cloud` test lokaal tegen deze database.
2. `.env.local` is lokaal ingericht en staat buiten git. Gebruik `.env.example` als sjabloon voor andere omgevingen, zonder het bestaande bestand te overschrijven. Productiegeheimen horen in Vercel Project Settings → Environment Variables, niet in git en niet in `NEXT_PUBLIC_*`.
3. Voer `npm run db:migrate` uit met de beoogde databaseverbinding. Het SQL-bestand `db/001_orders.sql` is herhaalbaar. Test de migratie eerst op een testdatabase. Geef databasebeheer alleen aan de eigenaar/bevoegde medewerkers.
4. Activeer Mollie en iDEAL voor het verkoopprofiel. Start met een echte **test**-API-key uit het Mollie-dashboard. Geen fictieve credentials gebruiken. De applicatie biedt Mollie's gehoste iDEAL-checkout, zonder accountplicht.
5. Genereer `ORDER_TOKEN_SECRET` met minstens 32 willekeurige bytes. Bewaar deze stabiel; roteer niet tijdens onopgeloste betaalpogingen. Zet ook een willekeurige `CRON_SECRET`.
6. Verifieer het verzenddomein in Resend en stel `RESEND_API_KEY` en `RESEND_FROM_EMAIL` in. Voor de bestaande wachtlijst zijn ook full-access rechten en `RESEND_WAITLIST_SEGMENT_ID` nodig. Kopers worden niet automatisch aan de wachtlijst toegevoegd.
7. Vul verzendperiode en bedrijfsgegevens in. Laat de voorwaarden en privacytekst controleren; zet pas daarna `TERMS_APPROVED=true`. Gebruik een nieuwe `TERMS_VERSION` bij inhoudelijke aanpassingen.
8. Zet `CHECKOUT_BASE_URL` op een publiek bereikbare HTTPS-origin van dezelfde omgeving. Voor testbetalingen kan dit een aparte preview/testhost zijn. Canonicals blijven naar de productiehost wijzen; bescherm previewdeployments met Vercel Deployment Protection.
9. Zet `CHECKOUT_ENABLED=true` en **bouw/deploy opnieuw**. Publieke content en de checkoutbeschikbaarheid worden tijdens de build vastgelegd. Zonder vereiste configuratie blijft het formulier eerlijk uitgeschakeld en accepteert de API geen orders.
10. Test op de publieke testhost: betaald, geannuleerd, mislukt, verlopen, pending, dubbele klik, refresh en vertraagde webhook. Controleer orderrij, bedrag, adres en pre-orderstatus. Mollie moet `/api/payments/webhook` kunnen bereiken; localhost en afgeschermde previewhosts werken niet zonder passende toegang. Expliciete testmodus verstuurt geen e-mail. Test echte Resend-aflevering apart met je eigen e-mailadres, volledige verkoopconfiguratie, `CHECKOUT_TEST_MODE=false` en nog steeds de Mollie-testkey; controleer één bevestigingsmail.
11. Plan elke 15 minuten een beveiligde GET naar `/api/orders/reconcile` met `Authorization: Bearer <CRON_SECRET>` via een scheduler. Er worden per run maximaal 50 orders behandeld. Monitor HTTP 503 en niet-verzonden bevestigingen. Scheduler/geheim staan bewust niet als productiecredential in de repo.
12. Vervang de testkey door de livekey, controleer `npm run check:launch`, deploy en voer zelf één kleine echte bestelling uit. Controleer betaling, e-mail en orderopslag voordat je verkeer stuurt. Deze opdracht heeft geen echte betaling uitgevoerd.

### Betrouwbaarheid en beheer

- Prijs, verzendkosten en totaal komen van de server. De klant kan alleen formaat (paperback), aantal en adres aanleveren.
- Een checkoutpoging wordt eerst duurzaam opgeslagen. Een unieke request-ID, rijvergrendeling en Mollie-idempotency voorkomen dubbele orders bij herhalen of gelijktijdigheid.
- Mollie onthoudt idempotency-sleutels **één uur**. Na 50 minuten maakt een onopgeloste poging niet automatisch een nieuwe betaling. Zoek deze op met het ordernummer in Mollie; een echte webhook kan de koppeling alsnog herstellen. Roteer de Mollie-key niet tijdens zulke pogingen. Beslis daarna expliciet of opnieuw bestellen nodig is.
- De server haalt betalingen zelf bij Mollie op en controleert order-ID, payment-ID, bedrag, EUR en test/live-modus. Een return-URL of `status=paid` van de browser is geen betaalbewijs.
- Bevestigingen worden als stabiele e-mailinhoud in de order opgeslagen. Resend-idempotency en databasevergrendeling voorkomen duplicaten. Onzekere verzendingen ouder dan 23 uur vereisen controle in Resend voordat opnieuw wordt verzonden; Resend bewaart zijn idempotency-key 24 uur.
- De statuslink bevat een geheime code. Deze wordt bij openen uit de adresbalk gehaald; de pagina heeft `noindex`, `no-referrer` en `no-store`. Deel zulke links niet. De status-API retourneert geen bezorgadres of e-mailadres.
- `bookshop.orders.preorder_status='reserved'`, `payment_status='paid'` en `payment_mode='live'` vormen de verzendlijst. Exporteer via de beveiligde databaseconsole, controleer recente refunds/chargebacks in Mollie en markeer verzending in de database/het eigen fulfilmentproces. Testorders blijven uitgesloten. Een beheerdersinterface, labelprinter en automatische refundflow vallen buiten deze implementatie.
- Geen lokale JSON-bestanden als orderopslag: die zijn niet duurzaam op Vercel. Maak back-ups, monitor mislukte webhooks en beperk toegang tot kopergegevens. Regel opruimen van verlaten orders volgens het vastgestelde bewaarbeleid.

## 3. Domein, HTTPS en indexering

De canonieke host is **https://www.devergetenvader.com**. De app stuurt `devergetenvader.com` met HTTP 301 naar www, inclusief pad en query. Stel in Vercel Domains eveneens www als primaire host in. Controleer HTTP→HTTPS voor beide hosts in de hostinginstellingen; HTTPS-afhandeling gebeurt bij het platform en kan een permanente 308 gebruiken. Pas DNS alleen aan nadat de juiste deployment is gekoppeld.

Na deploy controleren:

- `/`, alle artikelroutes en `/bestellen`: HTTP 200, één H1, correcte title/description, self-canonical, index/follow.
- `/robots.txt`: normale inhoud toegestaan, sitemapverwijzing aanwezig.
- `/sitemap.xml`: alle 12 canonieke pagina's; geen API of individuele bestellingen.
- Onbekende URL: HTTP 404. Orderstatus: noindex/nofollow. Er wordt geen `Disallow` voor de statuspagina gebruikt: Google moet de noindex kunnen lezen.
- Bekijk broncode met JavaScript uit: hoofdinhoud en metadata moeten aanwezig zijn.
- Verzendperiode/prijs wijzigen: opnieuw bouwen/deployen; bestaande orders behouden hun eigen prijs en verzendafspraak.

## 4. Exacte stappen voor Google Search Console

1. Open https://search.google.com/search-console en kies **Property toevoegen → Domein**.
2. Vul `devergetenvader.com` in. Voeg het door Google gegeven TXT-record bij de DNS-provider toe. Verwijder dit record later niet. Klik na DNS-propagatie op **Verifiëren**.
3. Alternatief: kies **URL-prefix** met `https://www.devergetenvader.com/`, kies HTML-tag en kopieer alleen de `content`-waarde naar `GOOGLE_SITE_VERIFICATION`. Deploy opnieuw en klik op Verifiëren. Plak geen volledige HTML-tag in de variabele.
4. Open **Sitemaps** en dien `https://www.devergetenvader.com/sitemap.xml` in. Controleer dat Google deze met status ‘Geslaagd’ verwerkt.
5. Open **URL-inspectie** voor de homepage. Kies **Live URL testen**. Controleer HTTP 200, crawlen toegestaan, indexering toegestaan en de canonieke www-URL.
6. Kies **Indexering aanvragen** voor de homepage en `/boek-aanstaande-vader`, `/cadeau-aanstaande-vader` en `/over-sem`. Voor de overige pagina's helpt de sitemap bij ontdekking; aanvragen is geen garantie op indexering.
7. Test homepage en `/boek-aanstaande-vader` op https://search.google.com/test/rich-results. Controleer het Product/Offer-resultaat met PreOrder, EUR en de geconfigureerde prijs. Het lokale schema heeft de vereiste Product-snippetvelden; een live Google-test is pas zinvol na deployment. Geen fake reviews toevoegen om optionele waarschuwingen weg te werken.
8. Controleer na enkele dagen **Indexering → Pagina's** op robotsblokkades, onbedoelde noindex, soft 404, dubbele canonicals en crawlfouten. Individuele bestellingen horen niet geïndexeerd te worden.
9. Volg daarna **Prestaties → Zoekresultaten** per pagina en zoekopdracht: merk + Sem de Wachter, boek voor aanstaande vader en cadeau-intentie. Vergelijk commerciële en informatieve pagina's over meerdere weken.
10. Controleer **Verbeteringen/Productfragmenten** als Google die rapporten toont, plus **Core Web Vitals** zodra er genoeg echte bezoekersdata is. Lokale Lighthouse-metingen zijn labmetingen, geen velddata.

## 5. Analytics

Stel optioneel `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` in en deploy opnieuw. Accepteer/Weiger hebben gelijkwaardige knoppen. Er laadt niets van Google vóór toestemming. Do Not Track wordt gerespecteerd. De keuze kan onderaan worden ingetrokken.

Zet in de GA4-webstream **Enhanced measurement uit**, vooral automatische pageviews, formulierinteracties en URL/history-tracking. De applicatie verstuurt zelf gecontroleerde events zonder queryparameters, referrers of kopergegevens. Schakel Google Signals, advertentiepersonalisatie en onnodige data sharing uit; stel een passende retentie in.

Events via `lib/analytics.ts`: `view_book`, `read_sample`, `click_preorder`, `begin_checkout`, `purchase`, `newsletter_signup`. Purchase bevat `transaction_id`, `value`, `currency`, `items` en aantal, en wordt pas na serverbevestiging verzonden. GA4 dedupliceert op transaction-ID; de browser bewaart daarnaast een sessiemarkering. Een aankoop zonder terugkeer naar de site of zonder toestemming telt niet in analytics: de database/Mollie zijn de financiële bron van waarheid.

Test de navigatie-events in DebugView met een teststream. Mollie-testbetalingen sturen bewust geen purchase-event; controleer dat event bij de gecontroleerde livebestelling. Kopieer geen persoonsgegevens naar analytics. De functionaliteit voor het versturen van ordermails is getest met een fake provider; echte aflevering vereist een Resend-test.

## 6. Technische controles

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run test:orders
npm run build
npm run test:e2e
npm audit --omit=dev
```

Browsercontroles gebruiken standaard geïnstalleerde Edge op Windows; stel `PLAYWRIGHT_CHANNEL=chromium` in en installeer Playwright Chromium voor CI. Het orderintegratietestbestand gebruikt uitsluitend een lokale PGlite-database en fake Mollie/Resend-responses. Controleer databaseconcurrentie ook tegen de gekozen echte PostgreSQL-service vóór de livegang.

De technische keuzes zijn getoetst aan de primaire documentatie:

De originele Anton, Archivo, EB Garamond en Caveat staan nu als kleinere lokale WOFF2-subsets in `public/fonts/`, inclusief SIL-licenties. Geen Google Fonts-netwerkverbinding nodig tijdens build of bezoek. Nieuwe subsets maken: `python -m pip install fonttools brotli` en `python scripts/subset-fonts.py`. Het script behoudt Latijnse tekens, Nederlandse accenten en gebruikelijke leestekens. Voeg Unicode-bereiken toe als toekomstige artikelen andere schriften gebruiken.

- https://docs.mollie.com/reference/create-payment
- https://docs.mollie.com/reference/get-payment
- https://docs.mollie.com/reference/api-idempotency
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://consument.acm.nl/aankoop-dienst-annuleren/bedenktijd
- https://www.autoriteitpersoonsgegevens.nl/actueel/foute-cookiebanners-aangepast-na-ingrijpen-ap
