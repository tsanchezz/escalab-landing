import Image from "next/image";
import { Reveal } from "@/components/reveal";

const ITEMS = [
  {
    n: "01",
    title: "Responde",
    text: "Contesta al instante con los datos de tu ficha: precio, ambientes, expensas, ubicación y disponibilidad.",
    img: "/images/cap-responde.jpg",
    alt: "Cocina blanca con isla, banquetas y lámparas colgantes negras",
  },
  {
    n: "02",
    title: "Califica",
    text: "Entiende qué busca cada persona (operación, zona, presupuesto y plazo) y te la entrega ordenada.",
    img: "/images/cap-califica.jpg",
    alt: "Living luminoso con sillones de cuero, plantas y grandes ventanales",
  },
  {
    n: "03",
    title: "Agenda",
    text: "Propone horarios según la agenda de cada agente y confirma la visita en la misma conversación.",
    img: "/images/cap-agenda.jpg",
    alt: "Casa moderna con fachada de madera y vidrio",
  },
  {
    n: "04",
    title: "Registra",
    text: "Cada consulta queda guardada con la propiedad, el canal y el responsable, en tu planilla o CRM.",
    img: "/images/cap-registra.jpg",
    alt: "Comedor cálido con mesa de madera, sillones y plantas",
  },
  {
    n: "05",
    title: "Hace seguimiento",
    text: "Recuerda las visitas, escribe después y reactiva las consultas que se enfriaron.",
    img: "/images/cap-seguimiento.jpg",
    alt: "Living con sillón gris, biblioteca y plantas colgantes",
  },
];

export function Capabilities() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section cv [--cv-m:2085px] [--cv-d:1481px]">
      <div className="page-m">
        <p className="t-eyebrow">Qué resuelve</p>
        <Reveal as="h2" className="t-h2 mt-4 max-w-[22ch]">
          <span id="servicios-title">
            Lo que hoy se pierde entre chats, <em>resuelto.</em>
          </span>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 lg:grid-cols-6">
          {ITEMS.map((it, i) => {
            const big = i < 2;
            return (
              <Reveal as="li" key={it.n} delay={(i % 3) * 0.08} className={big ? "lg:col-span-3" : "lg:col-span-2"}>
                <article className="group">
                  <div className={`on-dark relative aspect-[4/3] overflow-hidden rounded-[6px] bg-night ${big ? "lg:aspect-[16/10]" : "lg:aspect-[4/5]"}`}>
                    <Image
                      src={it.img}
                      alt={it.alt}
                      fill
                      sizes={big ? "(min-width: 1200px) 580px, (min-width: 1024px) 50vw, 100vw" : "(min-width: 1200px) 380px, (min-width: 1024px) 33vw, 100vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div aria-hidden className="scrim-bottom absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="font-serif text-[16px] italic text-terracotta-soft">{it.n}</p>
                      <h3 className="t-h3 mt-1 text-cream">{it.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 max-w-[46ch] text-soft">{it.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
