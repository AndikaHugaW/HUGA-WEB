"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    id: 1,
    question: "What services do you specialize in?",
    answer:
      "I specialize in Full Stack Development, UI/UX Design, and Mobile App Development. Whether you need a high-converting Landing Page, a complex SaaS Platform, or a functional Mobile Application, I deliver solutions tailored to your goals.",
  },
  {
    id: 2,
    question: "Can you build SaaS platforms?",
    answer:
      "Yes, I have extensive experience building scalable SaaS applications. From database architecture (Supabase/PostgreSQL) and authentication to secure payment integration (Stripe) and interactive dashboards, I handle the full development lifecycle.",
  },
  {
    id: 3,
    question: "Do you offer UI/UX Design services only?",
    answer:
      "Absolutely. If you already have a development team but need a world-class design, I can provide high-fidelity Figma designs, wireframes, interactive prototypes, and a complete design system.",
  },
  {
    id: 4,
    question: "How long does a project typically take?",
    answer:
      "Timelines depend on the scope. A standard portfolio or landing page typically takes 1-3 weeks, while more complex projects like SaaS platforms or Mobile Apps may take 4-10 weeks. I prioritize quality while ensuring timely delivery.",
  },
  {
    id: 5,
    question: "Do you provide post-launch support?",
    answer:
      "Yes, I believe in long-term partnerships. I provide post-launch support to ensure everything runs smoothly, as well as optional maintenance packages for updates, security patches, and feature enhancements.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="relative bg-white text-black border-t border-b border-neutral-200 font-mono select-none flex flex-col"
    >
      <div className="max-w-[1800px] mx-auto w-full border-x border-neutral-200 flex-grow flex flex-col">
        {/* ═══════════════════════════════════════════════
            MAIN GRID — 4 cols, gap-[1px] lines
        ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-neutral-200 gap-[1px]">
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 1 — Header:  Badge  ·  FAQ title  ·  ∅  ·  ∅
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R1·C1] Badge */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-6 flex items-start min-h-[140px] relative">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
              12&nbsp;&nbsp;Help & Info
            </span>
          </div>

          {/* [R1·C2] Giant FAQ title */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-6 flex items-end min-h-[140px]">
            <h2 className="font-nippo text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.88] tracking-tighter text-black uppercase">
              FAQ
            </h2>
          </div>

          {/* [R1·C3] Empty */}
          <div className="bg-white hidden lg:block min-h-[140px]" />

          {/* [R1·C4] Empty */}
          <div className="bg-white hidden lg:block min-h-[140px]" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 2 — Accordion: spans col 2–4 (3 columns)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R2·C1] Empty spacer */}
          <div className="bg-white hidden lg:block" />

          {/* [R2·C2+C3+C4] FAQ Accordion items */}
          <div className="bg-white lg:col-span-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 xl:px-10 py-6 md:py-7 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors duration-200 cursor-pointer group"
                >
                  {/* :: icon */}
                  <span className="text-neutral-400 text-[10px] mr-5 flex-shrink-0 select-none font-mono">
                    ::
                  </span>

                  {/* Question text */}
                  <span className="flex-grow font-satoshi text-[14px] md:text-[15px] font-medium text-neutral-900 tracking-tight">
                    {faq.question}
                  </span>

                  {/* +/- toggle */}
                  <span className="flex-shrink-0 ml-6 text-neutral-400 text-lg font-light select-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 xl:px-10 pb-6 pt-0 pl-[calc(1.25rem+28px)] xl:pl-[calc(2.5rem+28px)]">
                        <p className="font-satoshi text-[13px] text-neutral-500 leading-[1.7] max-w-[640px]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 3 — CTA: Badge · STILL UNSURE? + Button · ∅ · Testimonial
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R3·C1] Badge */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-8 flex items-end min-h-[200px]">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
              Contact us directly
            </span>
          </div>

          {/* [R3·C2] STILL UNSURE? headline + ASK A QUESTION button */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-8 flex flex-col justify-end min-h-[200px] gap-6">
            <h3 className="font-nippo text-2xl md:text-3xl font-extrabold tracking-tighter text-black uppercase leading-[1.05]">
              Still Unsure?
            </h3>
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center justify-between w-full max-w-[280px] pb-2 cursor-pointer bg-transparent border-none relative"
            >
              <span className="text-[11px] font-black tracking-[0.18em] uppercase text-black">
                Ask a Question
              </span>
              <span className="text-sm font-light text-neutral-400 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
              {/* Gradient underline */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C113F2] via-[#F5B6A2] to-[#A5C8FF] rounded-full" />
            </button>
          </div>

          {/* [R3·C3] Empty */}
          <div className="bg-white hidden lg:block min-h-[200px]" />

          {/* [R3·C4] Testimonial quote */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-8 flex flex-col justify-end gap-5 min-h-[200px]">
            <p className="font-satoshi text-[14px] md:text-[15px] text-neutral-900 leading-[1.55] font-medium">
              My role is to make sure every client feels supported from day one.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0 grayscale">
                <Image
                  src="/images/hero/Huga.webp"
                  alt="Andika Huga"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div>
                <p className="text-[11px] font-black tracking-wide text-neutral-900 font-mono uppercase">
                  Andika Huga
                </p>
                <p className="text-[9px] font-bold tracking-widest text-neutral-400 font-mono uppercase">
                  Full-stack Developer
                </p>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 4 — Bottom spacer row (empty cells for grid lines)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="bg-white hidden lg:block min-h-[60px]" />
          <div className="bg-white hidden lg:block min-h-[60px]" />
          <div className="bg-white hidden lg:block min-h-[60px]" />
          <div className="bg-white hidden lg:block min-h-[60px]" />
        </div>
      </div>
    </section>
  );
}
