"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";
import Image from "next/image";

const certificates = [
  { id: 1,  image: "/images/certificates/ai-applications.webp",                                                                 title: "AI Applications",                   issuer: "IBM SkillsBuild" },
  { id: 2,  image: "/images/certificates/ai-enabled-applications-for-customer-service.webp",                                    title: "AI for Customer Service",           issuer: "IBM SkillsBuild" },
  { id: 3,  image: "/images/certificates/ai-fundamentals-foundations-for-understanding-ai.webp",                                title: "AI Fundamentals",                   issuer: "IBM SkillsBuild" },
  { id: 4,  image: "/images/certificates/ai-literacy.webp",                                                                     title: "AI Literacy",                       issuer: "IBM SkillsBuild" },
  { id: 5,  image: "/images/certificates/artificial-intelligence-fundamentals.webp",                                            title: "Artificial Intelligence",           issuer: "IBM SkillsBuild" },
  { id: 6,  image: "/images/certificates/back-end-development.webp",                                                            title: "Back-End Development",              issuer: "IBM SkillsBuild" },
  { id: 7,  image: "/images/certificates/build-an-ai-agent.webp",                                                               title: "Build an AI Agent",                 issuer: "IBM SkillsBuild" },
  { id: 8,  image: "/images/certificates/building-ai-solutions-using-advanced-algorithms-and-open-source-frameworks.1.webp",   title: "AI Solutions",                      issuer: "IBM SkillsBuild" },
  { id: 9,  image: "/images/certificates/building-trustworthy-ai-enterprise-solutions.2.webp",                                  title: "Trustworthy AI",                    issuer: "IBM SkillsBuild" },
  { id: 10, image: "/images/certificates/build-smarter-ai-with-embeddings.webp",                                                title: "AI with Embeddings",                issuer: "IBM SkillsBuild" },
  { id: 11, image: "/images/certificates/code-generation-and-optimization-using-ibm-granite.webp",                              title: "IBM Granite",                       issuer: "IBM SkillsBuild" },
  { id: 12, image: "/images/certificates/data-analytics-for-machine-learning.webp",                                             title: "Data Analytics for ML",             issuer: "IBM SkillsBuild" },
  { id: 13, image: "/images/certificates/data-classification-and-summarization-using-ibm-gra.webp",                             title: "Data Classification",               issuer: "IBM SkillsBuild" },
  { id: 14, image: "/images/certificates/front-end-web-development.webp",                                                       title: "Front-End Development",             issuer: "IBM SkillsBuild" },
  { id: 15, image: "/images/certificates/generative-ai-essentials-using-llms-to-work-with-da.webp",                             title: "Generative AI Essentials",          issuer: "IBM SkillsBuild" },
  { id: 16, image: "/images/certificates/generative-ai-in-action.webp",                                                         title: "Generative AI in Action",           issuer: "IBM SkillsBuild" },
  { id: 17, image: "/images/certificates/getting-started-with-artificial-intelligence.webp",                                    title: "Getting Started with AI",           issuer: "IBM SkillsBuild" },
  { id: 18, image: "/images/certificates/getting-started-with-generative-ai.webp",                                              title: "Getting Started with Gen AI",       issuer: "IBM SkillsBuild" },
  { id: 19, image: "/images/certificates/machine-learning-methods-and-tools.webp",                                              title: "Machine Learning Methods",          issuer: "IBM SkillsBuild" },
  { id: 20, image: "/images/certificates/make-agentic-ai-work-for-you.webp",                                                    title: "Agentic AI",                        issuer: "IBM SkillsBuild" },
  { id: 21, image: "/images/certificates/natural-language-processing.1.webp",                                                   title: "Natural Language Processing",       issuer: "IBM SkillsBuild" },
  { id: 22, image: "/images/certificates/retrieval-augmented-generation-for-enhanced-ai-outp.webp",                             title: "Retrieval-Augmented Generation",    issuer: "IBM SkillsBuild" },
  { id: 23, image: "/images/certificates/supervised-learning-methods.webp",                                                     title: "Supervised Learning",               issuer: "IBM SkillsBuild" },
  { id: 24, image: "/images/certificates/unsupervised-learning-methods.webp",                                                   title: "Unsupervised Learning",             issuer: "IBM SkillsBuild" },
  { id: 25, image: "/images/certificates/web-development-fundamentals.webp",                                                    title: "Web Development Fundamentals",      issuer: "IBM SkillsBuild" },
];

// ─── Carousel constants ────────────────────────────────────────────────────
const CARD_W   = 600;
const CARD_H   = 600;
const CARD_GAP = 28;
const STEP     = CARD_W + CARD_GAP;
const COPIES   = 3;
const ITEMS    = Array.from({ length: COPIES }, () => certificates).flat();
const MID      = certificates.length; // index of the middle copy start

// ─── Cinematic Carousel ────────────────────────────────────────────────────
function CinematicCarousel() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [isPaused,  setIsPaused]      = useState(false);
  const [cw,        setCw]            = useState(0);
  const containerRef                  = useRef<HTMLDivElement>(null);
  const absRef                        = useRef(MID);
  const dragStartX                    = useRef(0);
  const dragStartMx                   = useRef(0);
  const dragging                      = useRef(false);
  const resumeTimer                   = useRef<NodeJS.Timeout | null>(null);

  const mx      = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.7 });

  const targetX = useCallback(
    (abs: number) => -(abs * STEP) + (cw / 2 - CARD_W / 2),
    [cw]
  );

  // Measure
  useEffect(() => {
    const measure = () => { if (containerRef.current) setCw(containerRef.current.offsetWidth); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Snap on mount / resize
  useEffect(() => {
    if (cw > 0) mx.set(targetX(absRef.current));
  }, [cw]); // eslint-disable-line

  // Auto-slide every 2 s — pauses on hover/drag, resumes after idle
  useEffect(() => {
    if (isPaused || cw === 0) return;
    const id = setInterval(() => {
      setActiveIdx(prev => {
        const nextLogical = (prev + 1) % certificates.length;
        const nextAbs     = absRef.current + 1;

        if (nextAbs >= ITEMS.length - certificates.length) {
          absRef.current = MID + nextLogical;
          mx.set(targetX(absRef.current));
        } else {
          absRef.current = nextAbs;
          animate(mx, targetX(nextAbs), { type: "spring", stiffness: 200, damping: 30, mass: 0.7 });
        }
        return nextLogical;
      });
    }, 2000);
    return () => clearInterval(id);
  }, [isPaused, cw, targetX]); // eslint-disable-line

  // Helper: cancel any pending resume timer
  const clearResume = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  // Helper: schedule auto-slide resume after 3 s of inactivity
  const scheduleResume = () => {
    clearResume();
    resumeTimer.current = setTimeout(() => setIsPaused(false), 3000);
  };

  // Drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current    = true;
    dragStartX.current  = e.clientX;
    dragStartMx.current = mx.get();
    clearResume();          // cancel any pending resume
    setIsPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    mx.set(dragStartMx.current + (e.clientX - dragStartX.current));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const delta = e.clientX - dragStartX.current;
    let next = absRef.current;
    if (delta < -(CARD_W * 0.2))  next++;
    else if (delta > CARD_W * 0.2) next--;
    next = Math.max(0, Math.min(ITEMS.length - 1, next));
    absRef.current = next;
    setActiveIdx(next % certificates.length);
    animate(mx, targetX(next), { type: "spring", stiffness: 200, damping: 30, mass: 0.7 });
    scheduleResume();   // resume auto-slide 3 s after user lets go
  };



  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden rounded-2xl"
      style={{ height: CARD_H + 40, perspective: 1600, perspectiveOrigin: "50% 50%" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scrolling track */}
      <motion.div
        className="absolute top-0 left-0 flex items-center cursor-grab active:cursor-grabbing"
        style={{ x: springX, gap: CARD_GAP, height: CARD_H + 40, paddingBlock: 20 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {ITEMS.map((cert, abs) => {
          const diff    = abs - absRef.current;
          const absDiff = Math.abs(diff);
          const visible = absDiff <= 3;

          if (!visible) {
            return <div key={`ph-${abs}`} style={{ width: CARD_W, height: CARD_H, flexShrink: 0 }} />;
          }

          const isActive  = absDiff === 0;
          const scale     = isActive ? 1 : Math.max(0.80, 1 - absDiff * 0.09);
          const rotY      = Math.sign(diff) * Math.min(absDiff * 8, 22);
          const opacity   = isActive ? 1 : Math.max(0.55, 1 - absDiff * 0.22);
          // Soft-cover intensity: 0 for active, increases for neighbors
          const coverOpacity = isActive ? 0 : Math.min(0.55, absDiff * 0.28);

          return (
            <motion.div
              key={`${cert.id}-${abs}`}
              className="relative flex-shrink-0"
              style={{ width: CARD_W, height: CARD_H, zIndex: 50 - absDiff }}
              animate={{ scale, rotateY: rotY, opacity }}
              transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
            >
              {/* Active glow — contained tightly so it doesn't bleed onto neighbors */}
              {isActive && (
                <motion.div
                  className="absolute -inset-2 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: "0 0 40px 6px rgba(0,255,136,0.10)",
                  }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                />
              )}

              {/* Card shell */}
              <div
                className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500
                  ${isActive
                    ? "border border-[#00ff88]/25 shadow-[0_8px_60px_-12px_rgba(0,255,136,0.18),0_0_0_1px_rgba(0,255,136,0.08)]"
                    : "border border-white/[0.06] shadow-none"
                  }`}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                  sizes={`${CARD_W}px`}
                  draggable={false}
                  priority={absDiff <= 1}
                />

                {/* Soft white frosted cover on non-active cards */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-3xl"
                    animate={{ opacity: coverOpacity }}
                    transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
                    style={{
                      background: [
                        "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 65%)",
                        "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(200,210,220,0.08) 40%, transparent 70%)",
                      ].join(", "),
                      backdropFilter: "blur(0.5px)",
                    }}
                  />
                )}

                {/* Active bottom label */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 inset-x-0 px-6 py-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-white text-base font-semibold font-sf-pro leading-snug">{cert.title}</p>
                    <p className="text-[#00ff88]/70 text-xs font-sf-pro mt-1 tracking-wide">{cert.issuer}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function CertificatesSection() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      {/* Subtle grid */}
      <GridBackground className="opacity-[0.18]" dotColor="rgba(0, 255, 136, 0.18)" size={28} />

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40  w-[480px] h-[480px] bg-[#00ff88]/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-[#00ff88]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-28">

        {/* ── Header ── */}
        <div className="mb-14">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            {...fadeUp(0.05)}
          >
            <div className="w-6 h-px bg-[#00ff88]/50" />
            <span className="text-[#00ff88]/70 text-[11px] font-medium tracking-[0.22em] uppercase font-sf-pro">
              Credentials
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-nippo font-bold leading-[1.08] mb-5"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)" }}
            {...fadeUp(0.12)}
          >
            <span className="text-white">Professional </span>
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(120deg, rgba(0,255,136,0.85) 0%, rgba(0,255,136,0.45) 100%)" }}
            >
              Certifications
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[15px] text-white/38 max-w-[420px] leading-[1.75] font-sf-pro"
            {...fadeUp(0.2)}
          >
            Continuously expanding expertise through industry-recognized programs and professional certifications.
          </motion.p>
        </div>

        {/* ── Carousel ── */}
        <motion.div {...fadeUp(0.28)}>
          <CinematicCarousel />
        </motion.div>


      </div>
    </section>
  );
}