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

Alleen optioneel:

| Variabele              | Waarvoor                                                              |
| ---------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonieke URL voor de OG/Twitter-tags, bijv. `https://degevondenvader.nl` |

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
public/cover.png  omslag
```

Design-tokens (kleuren, `--gutter`, `--section-y`, `--title`) staan in
`app/globals.css`; prijs en contactgegevens in `lib/site.ts`.

## Nog aan te sluiten

Het originele design was een klikbaar prototype. Deze dingen zijn nog
placeholders:

- **`public/cover.png` is een plaatshouder.** Het echte omslag uit het
  design-project (469×640) kon niet worden opgehaald — het bestand is groter
  dan de leeslimiet van de design-koppeling. Download `assets/cover.png` uit
  het Claude Design-project en overschrijf `public/cover.png`. De afmetingen
  worden bij de build automatisch overgenomen, er hoeft verder niets aangepast.
- **"In de mand" en "E-book"** in `components/Order.tsx` linken naar `#bestel`.
  Vervang door de checkout-URL van je webshop.
- **Het inschrijfformulier** in `components/Order.tsx` toont alleen
  "Gelukt ✓" — er gaat nog niets naar een mailinglijst. Hang er een
  route handler of Mailchimp/Buttondown-endpoint achter.
- **Auteursfoto** in `components/Author.tsx` is een gestippelde plaatshouder.
- **Algemene voorwaarden** in de footer is nog platte tekst zonder pagina.
