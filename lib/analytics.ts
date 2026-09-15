"use client";
// Public ID; an explicitly empty environment override disables analytics.
export const analyticsMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-44KLVCL4WB";
export type AnalyticsEvent =
  | "view_book"
  | "read_sample"
  | "click_preorder"
  | "begin_checkout"
  | "purchase"
  | "newsletter_signup";
type Ecommerce = {
  transaction_id?: string;
  value?: number;
  currency?: "EUR";
  items?: {
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }[];
};
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    dvvPendingEvents?: { event: AnalyticsEvent; data: Ecommerce }[];
  }
}
export function track(event: AnalyticsEvent, data: Ecommerce = {}) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1")
    return false;
  try {
    if (localStorage.getItem("dvv-analytics-consent") !== "granted")
      return false;
  } catch {
    return false;
  }
  if (window.gtag) window.gtag("event", event, data);
  else (window.dvvPendingEvents ??= []).push({ event, data });
  return true;
}
