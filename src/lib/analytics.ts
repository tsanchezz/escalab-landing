export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CONSENT_KEY = "escalab-consent";

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Evento GA4. Si GA no está cargado (sin ID o sin consentimiento) no hace nada. */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !GA_ID) return;
  window.gtag?.("event", event, params);
}
