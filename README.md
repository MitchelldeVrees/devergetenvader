# De gevonden vader

Landingspagina voor het boek _De gevonden vader_. Next.js (App Router) +
TypeScript + CSS Modules, klaar om op Vercel te zetten.

Geport vanuit het Claude Design-bestand `De Gevonden Vader - Site.dc.html`.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployen op Vercel

Vercel herkent Next.js vanzelf — er is geen `vercel.json` nodig.

1. Push deze map naar een Git-repo (GitHub/GitLab/Bitbucket).
2. Vercel → **Add New… → Project** → repo importeren.
3. Framework preset staat op **Next.js**, build command `next build`. Deploy.

Of vanaf de commandline:

```bash
npx vercel        # preview
npx vercel --prod # productie
```

### Environment variables

| Variabele                     | Waarvoor                                                              |
| ----------------------------- | --------------------------------------------------------------------- |
| `RESEND_API_KEY`              | Resend API-key met **Full access**, nodig om contacten op te slaan    |
| `RESEND_WAITLIST_SEGMENT_ID`  | ID van het Resend-segment voor de boekwachtlijst                      |
| `NEXT_PUBLIC_SITE_URL`        | Optionele canonieke URL, bijv. `https://degevondenvader.nl`           |

Maak in Resend een segment aan voor de boekwachtlijst. Voeg de twee verplichte
variabelen daarna toe via **Vercel → Project Settings → Environment Variables**
en deploy opnieuw. Voor lokaal gebruik kun je `.env.example` kopiëren naar
`.env.local` en daar de echte waarden invullen. Zet API-keys nooit in een
variabele die met `NEXT_PUBLIC_` begint.

Zonder deze variabele valt de site terug op `VERCEL_PROJECT_PRODUCTION_URL`
(zet Vercel zelf) en lokaal op `http://localhost:3000`.

## Structuur

```
app/
  layout.tsx      metadata, fonts, globals
  page.tsx        zet de secties op volgorde
  globals.css     kleuren, ritme-tokens, keyframes
  fonts.ts        Anton / Archivo / EB Garamond / Caveat via next/font
components/       één component + één .module.css per sectie
lib/site.ts       prijs, paginacount, contactmail
public/cover.jpg  omslag
```

Design-tokens (kleuren, `--gutter`, `--section-y`, `--title`) staan in
`app/globals.css`; prijs en contactgegevens in `lib/site.ts`.

## Nog aan te sluiten

Het originele design was een klikbaar prototype. Deze dingen zijn nog
placeholders:

- **Algemene voorwaarden** in de footer is nog platte tekst zonder pagina.
