import { Anton, Archivo, Caveat, EB_Garamond } from "next/font/google";

/**
 * Self-hosted via next/font — no runtime request to fonts.googleapis.com,
 * which is what the design's <link rel="preconnect"> was working around.
 *
 * Archivo, EB Garamond and Caveat are variable fonts, so `weight` is left off
 * and the whole axis ships; Anton is static and must name its single weight.
 */
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-garamond",
});

export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

export const fontVariables = [
  anton.variable,
  archivo.variable,
  garamond.variable,
  caveat.variable,
].join(" ");
