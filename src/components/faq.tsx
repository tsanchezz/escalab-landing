"use client";

import { useState } from "react";
import { Plus, StickyNote } from "lucide-react";
import { NodeChip } from "@/components/workflow";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/faq";
import { track } from "@/lib/analytics";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="page-m py-20 lg:py-24">
      <NodeChip type="Sticky Note · Notas" name="Preguntas frecuentes" icon={<StickyNote size={16} />} />

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-16">
        <Reveal as="h2" className="t-h2 md:col-span-5">
          <span id="faq-title">Lo que nos preguntan.</span>
        </Reveal>

        <div className="md:col-span-7">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-line last:border-b">
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
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold"
                  >
                    {f.q}
                    <Plus aria-hidden size={18} className="shrink-0 text-soft transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[56ch] pb-5 text-[15px] leading-relaxed text-soft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
