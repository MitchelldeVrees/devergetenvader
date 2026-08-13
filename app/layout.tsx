import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { site } from "@/lib/site";
import { WaitlistProvider } from "@/components/WaitlistModal";
import "./globals.css";

/** Lets Next resolve the relative OG image to an absolute URL. */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.title} — het boek voor de aanstaande vader`,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.title} — het boek voor de aanstaande vader`,
    description: site.description,
    locale: "nl_NL",
    type: "book",
    images: [
      {
        url: "/cover.png",
        width: 469,
        height: 640,
        alt: `Omslag van ${site.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.title} — het boek voor de aanstaande vader`,
    description: site.description,
    images: ["/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={fontVariables}>
      <body>
        <WaitlistProvider>{children}</WaitlistProvider>
      </body>
    </html>
  );
}
