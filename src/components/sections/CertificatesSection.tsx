"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";
import Image from "next/image";

const certificates = [
  { id: 1,  image: "/images/certificates/ai-applications.webp",                                                                 title: "AI Applications",                   issuer: "IBM SkillsBuild", short: "AI" },
  { id: 2,  image: "/images/certificates/ai-enabled-applications-for-customer-service.webp",                                    title: "AI for Customer Service",           issuer: "IBM SkillsBuild", short: "CS" },
  { id: 3,  image: "/images/certificates/ai-fundamentals-foundations-for-understanding-ai.webp",                                title: "AI Fundamentals",                   issuer: "IBM SkillsBuild", short: "FND" },
  { id: 4,  image: "/images/certificates/ai-literacy.webp",                                                                     title: "AI Literacy",                       issuer: "IBM SkillsBuild", short: "LIT" },
  { id: 5,  image: "/images/certificates/artificial-intelligence-fundamentals.webp",                                            title: "Artificial Intelligence",           issuer: "IBM SkillsBuild", short: "AI" },
  { id: 6,  image: "/images/certificates/back-end-development.webp",                                                            title: "Back-End Development",              issuer: "IBM SkillsBuild", short: "BE" },
  { id: 7,  image: "/images/certificates/build-an-ai-agent.webp",                                                               title: "Build an AI Agent",                 issuer: "IBM SkillsBuild", short: "AGT" },
  { id: 8,  image: "/images/certificates/building-ai-solutions-using-advanced-algorithms-and-open-source-frameworks.1.webp",   title: "AI Solutions",                      issuer: "IBM SkillsBuild", short: "SOL" },
  { id: 9,  image: "/images/certificates/building-trustworthy-ai-enterprise-solutions.2.webp",                                  title: "Trustworthy AI",                    issuer: "IBM SkillsBuild", short: "TRU" },
  { id: 10, image: "/images/certificates/build-smarter-ai-with-embeddings.webp",                                                title: "AI with Embeddings",                issuer: "IBM SkillsBuild", short: "EMB" },
  { id: 11, image: "/images/certificates/code-generation-and-optimization-using-ibm-granite.webp",                              title: "IBM Granite",                       issuer: "IBM SkillsBuild", short: "GRN" },
  { id: 12, image: "/images/certificates/data-analytics-for-machine-learning.webp",                                             title: "Data Analytics for ML",             issuer: "IBM SkillsBuild", short: "DA" },
  { id: 13, image: "/images/certificates/data-classification-and-summarization-using-ibm-gra.webp",                             title: "Data Classification",               issuer: "IBM SkillsBuild", short: "CLS" },
  { id: 14, image: "/images/certificates/front-end-web-development.webp",                                                       title: "Front-End Development",             issuer: "IBM SkillsBuild", short: "FE" },
  { id: 15, image: "/images/certificates/generative-ai-essentials-using-llms-to-work-with-da.webp",                             title: "Generative AI Essentials",          issuer: "IBM SkillsBuild", short: "GEN" },
  { id: 16, image: "/images/certificates/generative-ai-in-action.webp",                                                         title: "Generative AI in Action",           issuer: "IBM SkillsBuild", short: "ACT" },
  { id: 17, image: "/images/certificates/getting-started-with-artificial-intelligence.webp",                                    title: "Getting Started with AI",           issuer: "IBM SkillsBuild", short: "BEG" },
  { id: 18, image: "/images/certificates/getting-started-with-generative-ai.webp",                                              title: "Getting Started with Gen AI",       issuer: "IBM SkillsBuild", short: "GEN" },
  { id: 19, image: "/images/certificates/machine-learning-methods-and-tools.webp",                                              title: "Machine Learning Methods",          issuer: "IBM SkillsBuild", short: "ML" },
  { id: 20, image: "/images/certificates/make-agentic-ai-work-for-you.webp",                                                    title: "Agentic AI",                        issuer: "IBM SkillsBuild", short: "AGT" },
  { id: 21, image: "/images/certificates/natural-language-processing.1.webp",                                                   title: "Natural Language Processing",       issuer: "IBM SkillsBuild", short: "NLP" },
  { id: 22, image: "/images/certificates/retrieval-augmented-generation-for-enhanced-ai-outp.webp",                             title: "Retrieval-Augmented Generation",    issuer: "IBM SkillsBuild", short: "RAG" },
  { id: 23, image: "/images/certificates/supervised-learning-methods.webp",                                                     title: "Supervised Learning",               issuer: "IBM SkillsBuild", short: "SUP" },
  { id: 24, image: "/images/certificates/unsupervised-learning-methods.webp",                                                   title: "Unsupervised Learning",             issuer: "IBM SkillsBuild", short: "UNS" },
  { id: 25, image: "/images/certificates/web-development-fundamentals.webp",                                                    title: "Web Development Fundamentals",      issuer: "IBM SkillsBuild", short: "WEB" },
];

const COPIES = 3;
const ITEMS = Array.from({ length: COPIES }, () => certificates).flat();
const MID = certificates.length;

interface CinematicCarouselProps {
  setSelectedCert: (cert: typeof certificates[0]) => void;
}

function CinematicCarousel({ setSelectedCert }: CinematicCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cw, setCw] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const absRef = useRef(MID);
  const dragStartX = useRef(0);
  const dragStartMx = useRef(0);
  const dragging = useRef(false);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  // ── Responsive card dimensions (aspect-[4/3] landscape for raw document display) ─────────────────
  const cardW = cw === 0 ? 320
    : cw < 480  ? Math.floor(cw * 0.75)
    : cw < 768  ? Math.floor(Math.min(260, cw * 0.50))
    : cw < 1200 ? Math.floor(Math.min(280, cw * 0.35))
    : 320;
  const cardH = Math.floor(cardW * 0.75); // aspect-[4/3]
  const cardGap = cw < 480 ? 16 : cw < 768 ? 20 : 24;
  const step = cardW + cardGap;

  const mx = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.7 });

  const targetX = useCallback(
    (abs: number) => -(abs * step) + (cw / 2 - cardW / 2),
    [cw, step, cardW]
  );

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setCw(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Snap on mount / resize — instant
  useEffect(() => {
    if (cw > 0) {
      const tx = targetX(absRef.current);
      mx.set(tx);
      springX.set(tx);
    }
  }, [cw]); // eslint-disable-line

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (isPaused || cw === 0) return;
    const id = setInterval(() => {
      setActiveIdx(prev => {
        const nextLogical = (prev + 1) % certificates.length;
        const nextAbs = absRef.current + 1;

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

  const clearResume = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const scheduleResume = () => {
    clearResume();
    resumeTimer.current = setTimeout(() => setIsPaused(false), 3000);
  };

  // Pointer drag logic
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartMx.current = mx.get();
    clearResume();
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
    if (delta < -(cardW * 0.2)) next++;
    else if (delta > cardW * 0.2) next--;
    next = Math.max(0, Math.min(ITEMS.length - 1, next));
    absRef.current = next;
    setActiveIdx(next % certificates.length);
    animate(mx, targetX(next), { type: "spring", stiffness: 200, damping: 30, mass: 0.7 });
    scheduleResume();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{ height: cardH + 40 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scrolling track */}
      <motion.div
        className="absolute top-0 left-0 flex items-center cursor-grab active:cursor-grabbing"
        style={{ x: springX, gap: cardGap, height: cardH + 40, paddingBlock: 20 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {ITEMS.map((cert, abs) => {
          const diff = abs - absRef.current;
          const absDiff = Math.abs(diff);
          const visible = absDiff <= 3;

          if (!visible) {
            return <div key={`ph-${abs}`} style={{ width: cardW, height: cardH, flexShrink: 0 }} />;
          }

          const isActive = absDiff === 0;
          
          // Keep 3 middle cards (center card and its direct neighbors) unblurred, highly visible, and scaled
          const scale = isActive 
            ? 1 
            : absDiff === 1 
            ? 0.95 
            : Math.max(0.86, 1 - absDiff * 0.07);
            
          const opacity = isActive 
            ? 1 
            : absDiff === 1 
            ? 0.85 
            : Math.max(0.35, 1 - absDiff * 0.3);

          const blurVal = absDiff <= 1 ? "blur(0px)" : `blur(${Math.min((absDiff - 1) * 3.5, 7)}px)`;

          return (
            <motion.div
              key={`${cert.id}-${abs}`}
              className="relative flex-shrink-0 cursor-pointer"
              style={{ width: cardW, height: cardH, zIndex: 50 - absDiff }}
              animate={{ scale, opacity, filter: blurVal }}
              transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Only the raw certificate image (No borders, background cards, or text overlays/captions) */}
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-transparent">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain transition-transform duration-500 ease-out hover:scale-[1.02] z-0"
                  sizes={`(max-width:480px) 75vw, (max-width:768px) 50vw, (max-width:1200px) 35vw, 320px`}
                  draggable={false}
                  priority={absDiff <= 1}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function CertificatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="relative bg-white overflow-hidden w-full">
      {/* Subtle background grid */}
      <GridBackground className="opacity-[0.18]" dotColor="rgba(0, 0, 0, 0.05)" size={28} />

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-blue-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">

        {/* ── Header (stays aligned with page layout grids) ── */}
        <div className="mb-14 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Eyebrow badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1 border border-neutral-200 bg-white rounded-full text-[11px] font-medium text-neutral-800 shadow-sm font-mono uppercase tracking-wider mb-5"
            {...fadeUp(0.05)}
          >
            <svg className="w-3.5 h-3.5 text-neutral-600 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M17 5L7 19M22 12H2M17 19L7 5" />
            </svg>
            Credentials
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-satoshi font-bold leading-[1.1] mb-5 tracking-tighter text-black"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)" }}
            {...fadeUp(0.12)}
          >
            Real technical capabilities <br className="hidden md:inline" />
            validated through certifications
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[15px] text-neutral-500 max-w-[620px] leading-relaxed font-satoshi"
            {...fadeUp(0.2)}
          >
            Continuously expanding technical expertise and validation through rigorous, industry-recognized certification programs across software engineering and AI domains.
          </motion.p>
        </div>

        {/* ── Carousel stretching full screen width (no bounds) ── */}
        <div className="w-full relative overflow-hidden">
          <CinematicCarousel setSelectedCert={setSelectedCert} />
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full aspect-[4/3] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 backdrop-blur-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">{selectedCert.issuer}</span>
                <h4 className="text-xl font-bold font-satoshi mt-1">{selectedCert.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}