import Script from "next/script";
import { GA_ID, CONSENT_KEY } from "@/lib/analytics";

/**
 * Google Analytics 4 con Consent Mode v2.
 * Sólo se carga si existe NEXT_PUBLIC_GA_ID. El consentimiento arranca en "denied"
 * y se actualiza con el banner (ver consent-banner.tsx).
 */
export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: stored === 'granted' ? 'granted' : 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
