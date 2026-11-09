import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Revisamos cómo recibís y atendés hoy las consultas: canales, horarios, preguntas frecuentes y quién se ocupa de qué.",
  },
  {
    n: "02",
    title: "Configuración",
    text: "Armamos el agente con tu cartera, tu tono y tus reglas de calificación, y lo conectamos a tu agenda y a tu planilla o CRM.",
  },
  {
    n: "03",
    title: "Puesta en marcha",
    text: "Lo probamos con consultas de ejemplo, lo activamos y lo ajustamos durante las primeras semanas con lo que vaya pasando.",
  },
];

export function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section cv bg-sand/60 [--cv-m:1026px] [--cv-d:668px]">
      <div className="page-m grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="t-eyebrow">Cómo lo armamos</p>
          <Reveal as="h2" className="t-h2 mt-4">
            <span id="proceso-title">
              A medida de tu inmobiliaria, <em>sin vueltas.</em>
            </span>
          </Reveal>
          <p className="t-lead mt-5 max-w-[42ch]">
            Todo corre sobre n8n, una plataforma de automatización abierta: cada paso es visible y se puede cambiar sin empezar de cero.
          </p>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className="grid grid-cols-[56px_1fr] gap-4 border-t border-line py-6 last:border-b sm:grid-cols-[72px_1fr]">
              <span className="font-serif text-[40px] italic leading-none text-terracotta-deep sm:text-[52px]">{s.n}</span>
              <div>
                <h3 className="t-h3">{s.title}</h3>
                <p className="mt-2 max-w-[52ch] text-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
