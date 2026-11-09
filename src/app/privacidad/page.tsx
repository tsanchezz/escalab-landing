import type { Metadata } from "next";
import { H2, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata Escalab los datos personales del formulario y de la analítica, conforme a la Ley 25.326 de Protección de los Datos Personales de Argentina.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta política explica cómo se tratarían los datos personales de quienes usan esta página, conforme a la Ley 25.326 de Protección de los Datos Personales de la República Argentina y su normativa complementaria.
      </p>

      <H2>Responsable del tratamiento</H2>
      <p>
        Escalab, proyecto académico de la UADE. Al ser una empresa ficticia no cuenta con razón social, CUIT ni domicilio; el contacto se publica al pie de esta página cuando está configurado.
      </p>

      <H2>Qué datos recibimos y para qué</H2>
      <ul className="grid list-disc gap-2 pl-6">
        <li>
          <strong className="text-ink">Formulario de contacto:</strong> nombre, inmobiliaria, email, teléfono (opcional), tamaño del equipo, plan de interés y mensaje. Los usamos únicamente para responderte y coordinar una demo.
        </li>
        <li>
          <strong className="text-ink">Analítica (opcional):</strong> si la aceptás, Google Analytics 4 (a través de Google Tag Manager) mide visitas, secciones alcanzadas y clics en botones, con la IP anonimizada. Sin tu aceptación no se carga.
        </li>
      </ul>

      <H2>Base legal</H2>
      <p>
        El tratamiento se basa en tu consentimiento libre, expreso e informado (art. 5 de la Ley 25.326), que das al marcar la casilla del formulario o al aceptar la analítica en el aviso de cookies. Podés retirarlo cuando quieras.
      </p>

      <H2>Destinatarios y transferencias</H2>
      <p>
        Los datos del formulario se envían a un flujo de automatización (n8n) para su gestión interna. La página se aloja en Vercel y, si aceptás la analítica, se usa Google Analytics; ambos proveedores pueden operar servidores fuera de Argentina. No vendemos ni cedemos tus datos a terceros con fines comerciales.
      </p>

      <H2>Conservación</H2>
      <p>Conservamos los datos del formulario solo el tiempo necesario para atender tu consulta y los eliminamos cuando lo pidas.</p>

      <H2>Tus derechos</H2>
      <p>
        Tenés derecho de acceso, rectificación, actualización y supresión de tus datos. El acceso es gratuito a intervalos no inferiores a seis meses, salvo que acredites un interés legítimo (art. 14, inc. 3, Ley 25.326). Para ejercerlos, escribinos al contacto indicado al pie.
      </p>

      <H2>Autoridad de control</H2>
      <p>
        La Agencia de Acceso a la Información Pública (AAIP), en su carácter de Órgano de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales. Más información en{" "}
        <a className="text-terracotta-deep underline underline-offset-4" href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">
          argentina.gob.ar/aaip
        </a>
        .
      </p>

      <H2>Menores</H2>
      <p>Esta página está dirigida a profesionales y empresas inmobiliarias; no recopilamos datos de menores de edad de forma intencional.</p>

      <H2>Fotografías</H2>
      <p>Las fotografías son de Unsplash y se usan bajo su licencia. Las propiedades, direcciones y conversaciones son ejemplos.</p>
    </LegalPage>
  );
}
