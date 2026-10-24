import { SiAirtable, SiGmail, SiGooglecalendar, SiGooglesheets, SiHubspot, SiInstagram, SiMessenger, SiN8N, SiNotion, SiTelegram, SiWhatsapp, SiZapier } from "react-icons/si";

const ITEMS = [
  { name: "Instagram", Icon: SiInstagram },
  { name: "WhatsApp", Icon: SiWhatsapp },
  { name: "Messenger", Icon: SiMessenger },
  { name: "Google Calendar", Icon: SiGooglecalendar },
  { name: "Google Sheets", Icon: SiGooglesheets },
  { name: "HubSpot", Icon: SiHubspot },
  { name: "Gmail", Icon: SiGmail },
  { name: "Notion", Icon: SiNotion },
  { name: "Airtable", Icon: SiAirtable },
  { name: "Telegram", Icon: SiTelegram },
  { name: "Zapier", Icon: SiZapier },
  { name: "n8n", Icon: SiN8N },
] as const;

/** Tira de integraciones que n8n conecta. Logos reales, sólo como referencia de compatibilidad. */
export function Integrations() {
  return (
    <section aria-label="Herramientas que conectamos con n8n" className="bg-navy-2 py-10">
      <p className="page-m t-small text-soft">n8n se conecta con las herramientas que ya usás.</p>
      <div className="marquee-mask mt-6 overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-3 pr-3">
          {[...ITEMS, ...ITEMS].map(({ name, Icon }, i) => (
            <li
              key={i}
              aria-hidden={i >= ITEMS.length}
              className="glass relative flex h-14 items-center gap-3 rounded-xl px-5 text-[15px] font-semibold"
            >
              <Icon size={22} className="shrink-0" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
