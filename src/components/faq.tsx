"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/faq";
import { track } from "@/lib/analytics";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="section cv [--cv-m:1165px] [--cv-d:932px]">
      <div className="page-m grid gap-8 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="t-eyebrow">Preguntas</p>
          <Reveal as="h2" className="t-h2 mt-4">
            <span id="faq-title">
              Lo que nos preguntan las <em>inmobiliarias.</em>
            </span>
          </Reveal>
        </div>

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
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left font-serif text-[20px] leading-snug sm:text-[22px]"
                  >
                    {f.q}
                    <Plus aria-hidden size={20} className="shrink-0 text-terracotta-deep transition-transform duration-300 motion-reduce:transition-none" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pb-6 text-soft">{f.a}</p>
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
