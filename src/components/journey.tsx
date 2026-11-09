"use client";

import { useEffect, useRef, useState } from "react";
import { Bubble, Phone } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { STEPS } from "@/lib/journey";
import { track } from "@/lib/analytics";

/**
 * Recorrido de una consulta: seis hitos que se encienden al scrollear.
 * En escritorio el teléfono queda fijo (sticky de CSS, sin secuestrar el scroll) y muestra la conversación
 * acumulada; en móvil cada hito lleva su propia conversación debajo.
 */
export function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const seen = useRef(new Set<number>());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.i);
          setActive(i);
          if (!seen.current.has(i)) {
            seen.current.add(i);
            track("journey_step_reached", { step_index: i + 1, step_name: STEPS[i].title });
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="section cv border-y border-line bg-linen [--cv-m:2175px] [--cv-d:2797px]">
      <div className="page-m">
        <div className="max-w-[640px]">
          <p className="t-eyebrow">Cómo funciona</p>
          <Reveal as="h2" className="t-h2 mt-4">
            <span id="como-title">
              Una consulta, <em>de principio a fin.</em>
            </span>
          </Reveal>
          <p className="t-lead mt-5 max-w-[48ch]">
            Así recorre tu inmobiliaria cada mensaje que llega: sin esperas, sin copiar y pegar, y con todo registrado.
          </p>
        </div>
      </div>

      <div className="page-m mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-5 lg:sticky lg:top-24 lg:block lg:self-start">
          <Phone caption={false}>
            {STEPS.slice(0, active + 1).flatMap((s, si) =>
              s.msgs.map((m, mi) => <Bubble key={`${si}-${mi}`} msg={m} className="bubble-in" />),
            )}
          </Phone>
          <p className="mt-4 text-center text-[12px] text-soft">Conversación de ejemplo · simulación</p>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {STEPS.map((s, i) => {
            const reached = i <= active;
            const last = i === STEPS.length - 1;
            return (
              <li
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="relative grid grid-cols-[44px_1fr] gap-5 lg:min-h-[42vh]"
              >
                <div className="relative">
                  <span
                    className={`relative z-10 grid size-11 place-items-center rounded-full border font-serif text-[16px] transition-colors duration-500 motion-reduce:transition-none ${
                      reached ? "border-terracotta bg-terracotta text-linen" : "border-line bg-linen text-soft"
                    }`}
                  >
                    {s.n}
                  </span>
                  {!last && (
                    <>
                      <span aria-hidden className="absolute bottom-0 left-[21px] top-11 w-px bg-line" />
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-[21px] top-11 w-px origin-top bg-terracotta transition-transform duration-700 motion-reduce:transition-none"
                        style={{ transform: `scaleY(${i < active ? 1 : 0})` }}
                      />
                    </>
                  )}
                </div>

                <div className="pb-10 lg:pb-0">
                  <h3 className={`t-h3 pt-2 transition-colors duration-500 motion-reduce:transition-none ${reached ? "text-ink" : "text-soft"}`}>{s.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-soft">{s.text}</p>
                  <div className="mt-4 flex flex-col gap-2 rounded-[6px] bg-[#efe7db] p-3 lg:hidden">
                    {s.msgs.map((m, mi) => (
                      <Bubble key={mi} msg={m} />
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
