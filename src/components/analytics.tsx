"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { GA_ID, GTM_ID } from "@/lib/analytics";
import { readConsent, subscribeConsent } from "@/lib/consent";

/** Borra las cookies de Google Analytics (_ga, _ga_*) al retirar el consentimiento. */
function clearGaCookies() {
  const host = location.hostname;
  const bases = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    for (const d of bases) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
  }
}

const CONSENT_DEFAULT = (analytics: "granted" | "denied") =>
  `gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: '${analytics}' });`;

/**
 * Medición: con NEXT_PUBLIC_GTM_ID se carga Google Tag Manager; si no, con NEXT_PUBLIC_GA_ID se carga gtag.js.
 * En ambos casos el script se descarga SÓLO después de que la persona aceptó la analítica. Si después la
 * rechaza, se informa Consent Mode "denied", se desactiva la medición y se borran las cookies _ga*.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const granted = consent === "granted";

  useEffect(() => {
    if (!GTM_ID && !GA_ID) return;
    if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !granted;
    if (!granted) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
  }, [granted]);

  if (!granted) return null;

  if (GTM_ID) {
    return (
      <>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
${CONSENT_DEFAULT("granted")}
dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          `}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
      </>
    );
  }

  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
${CONSENT_DEFAULT("granted")}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
