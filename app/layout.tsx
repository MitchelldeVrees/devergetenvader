import Link from "next/link";
import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { book } from "@/lib/site";
import { WaitlistProvider } from "@/components/WaitlistModal";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(book.canonicalDomain),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={fontVariables}>
      <body>
        <Link prefetch={false} href="#main" className="skip-link">
          Naar de inhoud
        </Link>
        <WaitlistProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </WaitlistProvider>
      </body>
    </html>
  );
}
