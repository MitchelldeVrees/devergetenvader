"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { PreorderLink } from "./PreorderLink";
import { site } from "@/lib/site";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export function Analytics() {
  const pathname = usePathname();
  const privatePage = pathname.startsWith("/bestelling/");
  const [consent, setConsent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    try {
      setConsent(localStorage.getItem("dvv-analytics-consent"));
    } catch {
      setConsent("denied");
    }
  }, []);
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || pathname !== "/") {
      setPastHero(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    function sampleClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest('a[href="/#fragment"], a[href="#fragment"]')
          : null;
      if (target) track("read_sample");
    }
    document.addEventListener("click", sampleClick);
    return () => document.removeEventListener("click", sampleClick);
  }, []);
  useEffect(() => {
    if (!ready || consent !== "granted") return;
    window.gtag?.("set", {
      page_location: `${site.canonicalDomain}${privatePage ? "/bestelling" : pathname}`,
      page_title: document.title,
      page_referrer: "",
    });
    if (!privatePage)
      window.gtag?.("event", "page_view", {
        page_location: `${site.canonicalDomain}${pathname}`,
        page_title: document.title,
        page_referrer: "",
      });
    if (["/", "/boek-aanstaande-vader", "/bestellen"].includes(pathname))
      track("view_book");
  }, [pathname, consent, ready, privatePage]);
  function choose(value: string) {
    try {
      localStorage.setItem("dvv-analytics-consent", value);
    } catch {
      /* Do not require storage. */
    }
    setConsent(value);
    if (value === "denied") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
      setReady(false);
    }
  }
  return (
    <>
      {measurementId &&
        /^G-[A-Z0-9]+$/.test(measurementId) &&
        consent === "granted" &&
        navigator.doNotTrack !== "1" && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            onReady={() => {
              window.dataLayer = window.dataLayer || [];
              // gtag's documented command queue uses the Arguments object, not a plain array.
              window.gtag = function () {
                window.dataLayer!.push(
                  // eslint-disable-next-line prefer-rest-params
                  arguments as unknown as Record<string, unknown>,
                );
              };
              window.gtag("consent", "default", {
                analytics_storage: "granted",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
              });
              window.gtag("js", new Date());
              window.gtag("config", measurementId, {
                send_page_view: false,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                page_location: `${site.canonicalDomain}${privatePage ? "/bestelling" : pathname}`,
                page_referrer: "",
              });
              for (const entry of window.dvvPendingEvents || [])
                window.gtag("event", entry.event, entry.data);
              window.dvvPendingEvents = [];
              setReady(true);
            }}
          />
        )}
      {measurementId && (
        <aside className="consent" aria-label="Privacyvoorkeuren">
          {consent === null ? (
            <>
              <p>
                Mogen we bezoek- en bestelstatistieken meten met Google
                Analytics? Zonder toestemming laden we geen analytics.{" "}
                <Link prefetch={false} href="/privacy">
                  Lees hoe dit werkt
                </Link>
                .
              </p>
              <button onClick={() => choose("denied")}>Nee, bedankt</button>
              <button onClick={() => choose("granted")}>
                Statistieken toestaan
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                choose("denied");
                setConsent(null);
              }}
            >
              Privacyvoorkeuren wijzigen
            </button>
          )}
        </aside>
      )}
      {pastHero && (
        <div className="sticky-preorder">
          <PreorderLink>Pre-order nu · {site.price}</PreorderLink>
        </div>
      )}
    </>
  );
}
