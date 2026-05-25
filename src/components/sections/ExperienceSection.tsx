"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  stack: string[];
}



// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCES: Experience[] = [
  {
    id: "01",
    role: "Full Stack Developer",
    company: "E-Softplay Agency",
    period: "6 Months",
    type: "Internship",
    description:
      "Internship at E-Softplay Agency building internal web tools and client-facing applications. Collaborated closely with senior engineers on full-stack features — from REST API design to front-end implementation in a real production environment.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "REST API"],
  },
  {
    id: "02",
    role: "UI / UX Designer",
    company: "Agency",
    period: "3 Months",
    type: "UI/UX Design",
    description:
      "Joined a design agency to craft user interfaces and experience flows for client projects. Responsible for wireframing, high-fidelity Figma designs, component libraries, and handing off specs to developers.",
    stack: ["Figma", "Wireframing", "Prototyping", "Component Library", "User Research"],
  },
  {
    id: "03",
    role: "Logo & Brand Designer",
    company: "Freelance",
    period: "Present",
    type: "Branding",
    description:
      "Working independently with clients to craft brand identities from the ground up — logo design, typography systems, color palettes, brand guidelines, and visual collateral that communicate clearly and last.",
    stack: ["Illustrator", "Figma", "Brand Guidelines", "Logo Design", "Typography"],
  },
];



// ─── Experience Row ────────────────────────────────────────────────────────────

function ExperienceRow({
  exp,
  index,
  isInView,
  isOpen,
  onToggle,
}: {
  exp: Experience;
  index: number;
  isInView: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Top border ── */}
      <div className="h-px w-full bg-white/[0.06]" />

      {/* ── Clickable header row ── */}
      <button
        onClick={onToggle}
        className="relative w-full text-left group flex items-center justify-between gap-6 py-7 md:py-8 cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        {/* Index — absolute, outside flow so role title stays flush left */}
        <span className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/15 tracking-widest select-none">
          {exp.id}
        </span>

        {/* Left: role title — flush left, aligns with heading */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium font-nippo text-white/75 group-hover:text-white transition-colors duration-300 tracking-tight truncate min-w-0">
          {exp.role}
        </h3>

        {/* Right: type tag + company + period + toggle */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          <span className="hidden lg:block text-[11px] font-sf-pro uppercase tracking-[0.2em] text-white/25">
            {exp.type}
          </span>
          <span className="hidden sm:block text-sm font-sf-pro text-white/35 font-light">
            {exp.company}
          </span>
          <span className="hidden md:block text-sm font-mono text-white/50 tabular-nums">
            {exp.period}
          </span>

          {/* Toggle icon */}
          <div className="relative w-7 h-7 shrink-0">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0.7 : 0.3 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex items-center justify-center text-white text-xl font-light leading-none select-none"
            >
              +
            </motion.span>
          </div>
        </div>
      </button>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-10 md:pb-12 flex flex-col gap-6 max-w-2xl">
              {/* Description */}
              <p className="text-white/50 font-sf-pro text-[15px] leading-[1.9] font-light">
                {exp.description}
              </p>

              {/* Stack pills — below description */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 text-[11px] font-sf-pro tracking-wide text-white/55 border border-white/[0.08] rounded-full bg-white/[0.02] hover:text-white/80 hover:border-white/[0.15] transition-all duration-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // First row open by default
  const [openId, setOpenId] = useState<string | null>("01");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#080809] py-32 md:py-40"
    >
      {/* Subtle top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* One single, restrained ambient glow — not distracting */}
      <div
        className="absolute top-0 left-0 w-[480px] h-[480px] -translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          {/* Left: label + title */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-px bg-white/20" />
              <span className="text-[10px] font-sf-pro uppercase tracking-[0.3em] text-white/30">
                Work History
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-nippo text-5xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.05] tracking-tight text-white"
            >
              My Experience
            </motion.h2>
          </div>

          {/* Right: intro copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white/40 font-sf-pro text-base md:text-[17px] leading-[1.85] font-light max-w-sm lg:pb-2"
          >
            A solo practitioner combining{" "}
            <span className="text-white/70">engineering depth</span> and{" "}
            <span className="text-white/70">design sensibility</span> — delivering
            complete digital products, end to end.
          </motion.p>
        </div>



        {/* ── Experience accordion ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-sf-pro uppercase tracking-[0.3em] text-white/20">
              Roles
            </span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="text-[10px] font-sf-pro text-white/15 font-mono">
              {EXPERIENCES.length.toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceRow
              key={exp.id}
              exp={exp}
              index={i}
              isInView={isInView}
              isOpen={openId === exp.id}
              onToggle={() => toggle(exp.id)}
            />
          ))}
          {/* Final bottom border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
            className="h-px w-full bg-white/[0.06]"
          />
        </div>

      </div>

      {/* Subtle bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}
