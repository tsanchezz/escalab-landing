import Link from "next/link";
import { SITE } from "@/lib/site";

const BLOCKS = [
  { ch: "E", color: "#174ed8", h: 100 },
  { ch: "S", color: "#2063d5", h: 86 },
  { ch: "C", color: "#269bd2", h: 94 },
  { ch: "A", color: "#42c5a4", h: 76 },
  { ch: "L", color: "#70d58a", h: 90 },
  { ch: "A", color: "#9fe07a", h: 68 },
  { ch: "B", color: "#c8eb63", h: 82 },
] as const;

const COLS = [
  { title: "Servicio", links: [["#como-funciona", "Cómo funciona"], ["#servicios", "Qué automatizamos"], ["#ahorro", "Calculadora"]] },
  { title: "Comercial", links: [["#planes", "Planes"], ["#faq", "Preguntas"], ["#contacto", "Contacto"]] },
  { title: "Legal", links: [["/privacidad", "Privacidad y cookies"]] },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-2 pb-8 pt-24">
      <div className="page-m">
        <svg role="img" aria-label="Escalab" viewBox="0 0 1000 340" className="block w-full">
          {BLOCKS.map((b, i) => {
            const w = (1000 - 6 * 8) / 7;
            const h = (340 * b.h) / 100;
            const x = i * (w + 8);
            return (
              <g key={i} className="footer-block">
                <rect x={x} y={340 - h} width={w} height={h} rx="8" fill={b.color} />
                <text x={x + w / 2} y={340 - h / 2} textAnchor="middle" dominantBaseline="central" fontSize="170" fontWeight="800" fill="#071421" style={{ fontFamily: "inherit" }}>
                  {b.ch}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="t-micro text-soft">{c.title}</p>
                <ul className="mt-4 grid gap-2.5 text-[15px]">
                  {c.links.map(([href, label]) => (
                    <li key={href}>
                      {href.startsWith("/") ? (
                        <Link href={href} className="transition-colors hover:text-lime">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="transition-colors hover:text-lime">
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <address className="text-[15px] not-italic leading-relaxed text-soft lg:col-span-4">
            <a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:text-lime">
              {SITE.email}
            </a>
            <br />
            Remoto · Latinoamérica
          </address>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-[14px] text-soft">
          <p>
            © {new Date().getFullYear()} Escalab. Proyecto académico: Escalab es una empresa ficticia. · {SITE.claim}
          </p>
          <a href="#top" className="btn btn-secondary !min-h-10 !px-4 !text-[13px]">
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
