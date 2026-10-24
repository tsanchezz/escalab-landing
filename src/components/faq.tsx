"use client";

import { useState } from "react";
import { StickyNote } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/faq";
import { track } from "@/lib/analytics";

const TONES = ["#0f2c63", "#0e3550", "#0d3b3b"] as const;

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="page-m pb-20 pt-24 lg:pb-24 lg:pt-32">
      <Reveal>
        <NodeChip type="Sticky Note · Notas" name="Preguntas frecuentes" icon={<StickyNote size={18} />} />
      </Reveal>

      <div className="mt-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <Reveal delay={0.08} as="h2" className="t-h2 max-w-[14ch]">
            <span id="faq-title">Lo que nos preguntan.</span>
          </Reveal>

          <div className="mt-16">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.05} y={30} className="group/c relative -mt-[104px] first:mt-0">
                  <div
                    className="index-card pb-[104px] group-last/c:pb-6"
                    style={{ background: TONES[i % 3], ["--tab-x" as string]: `calc(${i} * var(--tab-step))` }}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        id={`faq-btn-${i}`}
                        aria-controls={`faq-${i}`}
                        onClick={() => {
                          setOpen(isOpen ? -1 : i);
                          if (!isOpen) track("faq_open", { question: f.q });
                        }}
                        className="relative block w-full text-left"
                      >
                        <span
                          className="t-micro absolute top-0 flex h-10 items-center justify-center text-ink"
                          style={{ left: "var(--tab-x)", width: "var(--tab-w)" }}
                        >
                          {f.topic}
                        </span>
                        <span className="mt-10 flex h-14 items-center justify-between gap-4 px-5 text-[17px] font-semibold md:text-[20px]">
                          {f.q}
                          <span aria-hidden className="faq-plus shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="grid transition-[grid-template-rows] duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[50ch] px-5 pb-2 pt-1 text-[16px] leading-relaxed md:text-[17px]">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
