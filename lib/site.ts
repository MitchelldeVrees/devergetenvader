/**
 * Single place for the numbers and strings that change per print run.
 * The design exposed `price` as an editable prop; here it is a constant
 * so every "Bestel"-knop and the order card stay in sync.
 */
export const site = {
  title: "De vergeten vader",
  price: "€22,50",
  ebookPrice: "€12,50",
  pages: 208,
  email: "hallo@devergetenvader.nl",
  description:
    "Negen maanden lang gaat het over haar buik. Dit boek is voor hem — grappige, eerlijke verhalen vanaf de andere kant van de echo.",
} as const;
