"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { GA_ID } from "@/lib/analytics";
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

/**
 * Google Analytics 4: el script de gtag.js sólo se descarga si hay NEXT_PUBLIC_GA_ID y la persona aceptó
 * la analítica. Si después la rechaza, se desactiva la medición y se borran sus cookies.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const granted = consent === "granted";

  useEffect(() => {
    if (!GA_ID) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !granted;
    if (!granted) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
  }, [granted]);

  if (!GA_ID || !granted) return null;
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
