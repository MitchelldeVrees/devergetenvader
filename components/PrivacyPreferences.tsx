"use client";
import { analyticsMeasurementId } from "@/lib/analytics";

export function PrivacyPreferences({ className }: { className?: string }) {
  if (!/^G-[A-Z0-9]+$/.test(analyticsMeasurementId)) return null;
  return (
    <button
      className={className}
      onClick={() =>
        window.dispatchEvent(new Event("dvv-open-privacy-preferences"))
      }
    >
      Privacyvoorkeuren wijzigen
    </button>
  );
}
