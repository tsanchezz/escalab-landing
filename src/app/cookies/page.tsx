import type { Metadata } from "next";
import { H2, LegalPage } from "@/components/legal-page";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies y almacenamiento local usa el sitio de Escalab, para qué sirven y cómo aceptarlas, rechazarlas o cambiar tu decisión.",
  alternates: { canonical: "/cookies" },
};

const ROWS = [
  ["escalab-consent", "Almacenamiento local", "Necesaria", "Recuerda tu elección sobre cookies.", "Hasta que borres los datos del sitio"],
  ["_ga, _ga_*", "Cookie de Google Analytics 4", "Analítica (con tu consentimiento)", "Distingue visitas y mide el uso de la página.", "Hasta 2 años"],
] as const;

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Las cookies son pequeños archivos que el navegador guarda al visitar un sitio. Usamos solo lo necesario para recordar tu elección y, únicamente si lo aceptás, las cookies de analítica.
      </p>

      <H2>Qué usamos</H2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <caption className="sr-only">Cookies y almacenamiento usados por el sitio</caption>
          <thead>
            <tr className="border-b border-line text-ink">
              {["Nombre", "Tipo", "Categoría", "Finalidad", "Duración"].map((h) => (
                <th key={h} scope="col" className="py-2 pr-4 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-b border-line align-top">
                {r.map((c, i) => (
                  <td key={i} className="py-3 pr-4">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Cómo funciona tu consentimiento</H2>
      <p>
        Google Tag Manager y Google Analytics 4 no se cargan hasta que lo aceptás en el aviso. Podés rechazarlo o configurarlo, y cambiar tu decisión en cualquier momento. Rechazar no afecta al uso del sitio.
      </p>
      <div>
        <CookiePreferencesButton className="btn btn-outline" />
      </div>

      <H2>Desde el navegador</H2>
      <p>También podés borrar o bloquear cookies desde la configuración de tu navegador; al hacerlo, el aviso volverá a mostrarse.</p>
    </LegalPage>
  );
}
