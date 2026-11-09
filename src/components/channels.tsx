import { SiGooglecalendar, SiGooglesheets, SiInstagram, SiMessenger, SiWhatsapp } from "react-icons/si";
import { Database, Globe } from "lucide-react";

const ITEMS = [
  { Icon: SiWhatsapp, label: "WhatsApp" },
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiMessenger, label: "Facebook Messenger" },
  { Icon: Globe, label: "Formulario de tu web" },
  { Icon: SiGooglecalendar, label: "Google Calendar" },
  { Icon: SiGooglesheets, label: "Google Sheets" },
  { Icon: Database, label: "Tu CRM" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center gap-12 pr-12 ${hidden ? "marquee-dup" : ""}`}>
      {ITEMS.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold text-ink">
          <Icon aria-hidden size={20} className="text-terracotta-deep" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function Channels() {
  return (
    <section aria-label="Canales y herramientas que conectamos" className="border-b border-line py-8 sm:py-10">
      <p className="t-eyebrow page-m text-center">Se conecta con lo que ya usás</p>
      <div className="marquee marquee-mask mt-6 overflow-hidden">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
      <p className="page-m mx-auto mt-6 max-w-[64ch] text-center text-[13px] leading-relaxed text-soft">
        Ejemplos de portales y CRM que se pueden integrar según cada caso: Zonaprop, Argenprop, MercadoLibre Inmuebles y Tokko Broker. Son ejemplos de integración posible, sin vínculo oficial con esas marcas.
      </p>
    </section>
  );
}
