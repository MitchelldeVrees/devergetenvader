"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  analyticsMeasurementId as measurementId,
  track,
} from "@/lib/analytics";
import { PreorderLink } from "./PreorderLink";
import { site } from "@/lib/site";
export function Analytics() {
  const pathname = usePathname();
  const privatePage = pathname.startsWith("/bestelling/");
  const [consent, setConsent] = useState<string | null>(null);
  const [consentLoaded, setConsentLoaded] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const declineButton = useRef<HTMLButtonElement>(null);
  const preferencesOpener = useRef<HTMLElement | null>(null);
  const showConsentBanner = Boolean(
    measurementId &&
    /^G-[A-Z0-9]+$/.test(measurementId) &&
    consentLoaded &&
    (consent === null || preferencesOpen),
  );
  const [ready, setReady] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dvv-analytics-consent");
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    } catch {
      setConsent("denied");
    }
    setConsentLoaded(true);
  }, []);
  useEffect(() => {
    function openPreferences() {
      preferencesOpener.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setPreferencesOpen(true);
    }
    window.addEventListener("dvv-open-privacy-preferences", openPreferences);
    return () =>
      window.removeEventListener(
        "dvv-open-privacy-preferences",
        openPreferences,
      );
  }, []);
  useEffect(() => {
    if (preferencesOpen) declineButton.current?.focus({ preventScroll: true });
  }, [preferencesOpen]);
  useEffect(() => {
    if (!showConsentBanner || !banner.current) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--consent-height",
        `${entry.target.getBoundingClientRect().height}px`,
      );
    });
    observer.observe(banner.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--consent-height");
    };
  }, [showConsentBanner]);
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
    setPreferencesOpen(false);
    if (preferencesOpen)
      preferencesOpener.current?.focus({ preventScroll: true });
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
      {showConsentBanner && (
        <aside
          ref={banner}
          className="consent-banner"
          aria-labelledby="consent-title"
        >
          <div className="consent-copy">
            <h2 id="consent-title">Even over je privacy</h2>
            <p>
              Mogen we met Google Analytics meten hoe je de website gebruikt? Zo
              weten we wat werkt. Je kunt je keuze altijd wijzigen.{" "}
              <Link prefetch={false} href="/privacy">
                Lees ons privacybeleid
              </Link>
              .
            </p>
          </div>
          <div className="consent-actions">
            <button ref={declineButton} onClick={() => choose("denied")}>
              Nee, bedankt
            </button>
            <button onClick={() => choose("granted")}>
              Statistieken toestaan
            </button>
          </div>
        </aside>
      )}
      {pastHero && !showConsentBanner && (
        <div className="sticky-preorder">
          <PreorderLink>Pre-order nu · {site.price}</PreorderLink>
        </div>
      )}
    </>
  );
}
