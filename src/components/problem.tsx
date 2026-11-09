import { ParallaxImage } from "@/components/parallax-image";
import { Reveal } from "@/components/reveal";

const POINTS = [
  {
    n: "01",
    title: "Consultas fuera de horario",
    text: "Las consultas no esperan al lunes. Cuando por fin se responden, la persona ya habló con otra inmobiliaria.",
  },
  {
    n: "02",
    title: "Siempre las mismas preguntas",
    text: "¿Sigue disponible? ¿Cuánto son las expensas? ¿Se puede visitar? Tu equipo contesta lo mismo, todo el día, en cada canal.",
  },
  {
    n: "03",
    title: "Leads sin dueño ni seguimiento",
    text: "Las consultas quedan repartidas entre chats, planillas y memorias. Nadie sabe cuál se enfrió ni a quién le tocaba.",
  },
];

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="section cv [--cv-m:1205px] [--cv-d:1048px]">
      <div className="page-m">
        <p className="t-eyebrow">El problema</p>

        <div className="on-dark relative mt-5 aspect-[4/5] overflow-hidden rounded-[6px] bg-night sm:aspect-[16/10] lg:aspect-[21/9]">
          <ParallaxImage
            src="/images/problema.jpg"
            alt="Casa moderna de madera oscura al atardecer, con las ventanas iluminadas y un árbol grande"
            sizes="(min-width: 1200px) 1200px, 100vw"
            position="50% 60%"
            strength={6}
          />
          <div aria-hidden className="scrim-bottom absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <h2 id="problema-title" className="t-h2 max-w-[20ch] text-cream">
              Un domingo a las 22 h, alguien preguntó por <em>tu propiedad.</em>
            </h2>
          </div>
        </div>

        <ul className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-10">
          {POINTS.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.08} className="border-t border-line pt-5">
              <p className="font-serif text-[18px] italic text-terracotta-deep">{p.n}</p>
              <h3 className="t-h3 mt-2">{p.title}</h3>
              <p className="mt-3 text-soft">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
