import { FAQS } from "@/lib/faq";
import { SITE, SITE_URL } from "@/lib/site";
import { PLANS } from "@/lib/plans";

/** Datos estructurados (schema.org) en un único @graph. */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE.name,
        slogan: SITE.claim,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
        email: SITE.email,
        description: SITE.description,
        areaServed: "Latinoamérica",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "es-AR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "es-AR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Automatización de ventas y atención con n8n",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Automatización de procesos comerciales",
        areaServed: "Latinoamérica",
        audience: { "@type": "Audience", audienceType: "Pymes" },
        description: SITE.description,
        offers: PLANS.map((p) => ({
          "@type": "Offer",
          name: `Plan ${p.name}`,
          price: p.price,
          priceCurrency: "USD",
          url: `${SITE_URL}/#planes`,
          priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "USD", unitText: "MONTH" },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
