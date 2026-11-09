import type { Metadata } from "next";
import Link from "next/link";
import { H2, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio de Escalab, un proyecto académico de la UADE: alcance, precios de ejemplo y límites de responsabilidad.",
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>Al usar este sitio aceptás estas condiciones. Si no estás de acuerdo, te pedimos que no lo utilices.</p>

      <H2>Naturaleza del sitio</H2>
      <p>
        Escalab es un proyecto académico de la UADE. El sitio simula la presentación de un servicio de automatización de consultas para inmobiliarias; no constituye una oferta comercial real ni un contrato.
      </p>

      <H2>Precios y planes</H2>
      <p>Los planes y precios son ejemplos del proyecto académico, sin valor contractual. No se emiten facturas ni se realizan cobros.</p>

      <H2>Formulario de contacto</H2>
      <p>
        Los datos que envíes se tratan según la{" "}
        <Link className="text-terracotta-deep underline underline-offset-4" href="/privacidad">
          Política de privacidad
        </Link>
        . Enviar el formulario no genera ninguna obligación para ninguna de las partes.
      </p>

      <H2>Marcas e integraciones</H2>
      <p>
        Las marcas de portales, CRM y herramientas que se mencionan (por ejemplo Zonaprop, Argenprop, MercadoLibre Inmuebles, Tokko Broker, WhatsApp o Instagram) pertenecen a sus titulares y se citan solo como ejemplos de integración posible, sin vínculo ni aval de esas empresas.
      </p>

      <H2>Contenido y propiedad intelectual</H2>
      <p>
        Los textos y el diseño del sitio son parte del trabajo académico. Las fotografías son de Unsplash y se usan bajo su licencia. Las propiedades, direcciones y conversaciones mostradas son ficticias.
      </p>

      <H2>Límite de responsabilidad</H2>
      <p>
        El sitio se ofrece tal como está, con fines educativos. No garantizamos disponibilidad ni exactitud de los ejemplos, y no respondemos por decisiones tomadas a partir de ellos, como las estimaciones de la calculadora de ahorro.
      </p>

      <H2>Ley aplicable</H2>
      <p>Estos términos se rigen por las leyes de la República Argentina.</p>
    </LegalPage>
  );
}
