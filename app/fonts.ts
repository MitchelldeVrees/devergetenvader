import localFont from "next/font/local";

// Same four typefaces as the original site, locally subset for Dutch copy.
// Sources and SIL licenses: public/fonts; rebuild: scripts/subset-fonts.py.
export const anton = localFont({
  src: "../public/fonts/anton.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});
export const archivo = localFont({
  src: "../public/fonts/archivo.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-archivo",
});
export const garamond = localFont({
  src: "../public/fonts/garamond.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-garamond",
});
export const garamondItalic = localFont({
  src: "../public/fonts/garamond-italic.woff2",
  weight: "500",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-garamond-italic",
});
export const caveat = localFont({
  src: "../public/fonts/caveat.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-caveat",
});
export const fontVariables = [
  anton.variable,
  archivo.variable,
  garamond.variable,
  garamondItalic.variable,
  caveat.variable,
].join(" ");
