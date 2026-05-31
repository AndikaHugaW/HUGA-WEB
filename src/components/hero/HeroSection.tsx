"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const modelImages = [
  "/images/hero/Huga.webp",
  "/images/hero/Huga 2.webp",
  "/images/hero/Huga 3.webp",
];

const services = [
  { num: "01", label: "Branding" },
  { num: "02", label: "UI UX" },
  { num: "03", label: "Website Dev" },
  { num: "04", label: "Mobile App" },
];

const stats = [
  { num: "3+", label: "Years Experience" },
  { num: "20+", label: "Brand Recognition" },
  { num: "50+", label: "Happy Clients" },
  { num: "50+", label: "Project Completed" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % modelImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[100dvh] lg:h-screen lg:min-h-[900px] overflow-hidden bg-[#0a1428]"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes textShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shiny-text {
          background: linear-gradient(
            120deg,
            #ffffff 30%,
            #cbd5e1 40%,
            #ffffff 50%,
            #cbd5e1 60%,
            #ffffff 70%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 4s linear infinite;
          transition: all 0.3s ease;
        }
        
        .hover-fill-huga {
          transition: all 0.3s ease;
        }
        .hover-fill-huga:hover {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-text-stroke-color: rgba(255, 255, 255, 1) !important;
        }

        .hover-fill-stack {
          transition: all 0.3s ease;
        }
        .hover-fill-stack:hover {
          background: #ffffff !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: #ffffff !important;
          -webkit-text-stroke-color: rgba(255, 255, 255, 1) !important;
        }
      `}} />

      {/* LAYER 1: Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero/background hero.webp"
          alt="Hero Background"
          fill
          priority
          quality={95}
          className="object-cover object-center"
        />
      </motion.div>

      {/* LAYER 2: Grain Texture Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04] bg-[url('/noise.png')]" />

      {/* LAYER 3: Content Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {/* ========== TOP SECTION: Typography (behind photo on mobile) ========== */}
        <div className="absolute inset-0 w-full flex flex-col items-center justify-start pt-[25vh] sm:pt-[25vh] lg:pt-[18vh] px-4 z-[5] lg:z-10 pointer-events-none">
          {/* Line 1: HI I'M HUGA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center pointer-events-auto"
          >
            <h2
              className="text-[clamp(2.5rem,11vw,100px)] lg:text-[clamp(40px,6vw,100px)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-transparent select-none font-display hover-fill-huga cursor-pointer"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.35)",
              }}
            >
              HI I&apos;M HUGA
            </h2>
          </motion.div>

          {/* Line 2: FULL STACK DEV */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row mt-2 sm:mt-8 lg:mt-12 gap-x-1 sm:gap-x-2 lg:gap-x-3 relative items-center pointer-events-auto"
          >
            <span className="text-[clamp(2rem,10vw,115px)] sm:text-[clamp(20px,7vw,115px)] font-black uppercase leading-[0.85] lg:leading-[0.9] tracking-[-0.02em] font-display shiny-text select-none">
              FULL
            </span>
            <span
              className="text-[clamp(2rem,10vw,115px)] sm:text-[clamp(20px,7vw,115px)] font-black uppercase leading-[0.85] lg:leading-[0.9] tracking-[-0.02em] font-display hover-fill-stack cursor-pointer select-none"
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              }}
            >
              STACK
            </span>
            <span className="text-[clamp(2rem,10vw,115px)] sm:text-[clamp(20px,7vw,115px)] font-black uppercase leading-[0.85] lg:leading-[0.9] tracking-[-0.02em] font-display shiny-text select-none">
              DEV
            </span>
          </motion.div>
        </div>

        {/* ========== MIDDLE: MODEL IMAGE ========== */}
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center lg:block z-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative lg:absolute lg:bottom-0 lg:left-[38%]
              w-[100vw] sm:w-[80vw] h-[65vh] sm:h-[70vh] md:h-[75vh] lg:w-[min(520px,42vw)] lg:h-[82vh]
              ${currentImageIndex === 0 ? "z-20" : "z-40"} pointer-events-none`}
          >
            {/* Glow behind model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full bg-white/[0.03] blur-[60px] sm:blur-[80px] lg:blur-[150px]" />
            </div>

            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: currentImageIndex === 0 ? 1.08 : 1.0,
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full origin-bottom"
              >
                <Image
                  src={modelImages[currentImageIndex]}
                  alt="Andika Huga - Full Stack Developer"
                  fill
                  priority
                  quality={95}
                  className="object-contain object-bottom"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ========== LEFT SIDE: Description (Desktop only) ========== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute left-6 lg:left-16 z-10 hidden lg:block"
          style={{ top: '52%' }}
        >
          <p
            className="text-white leading-[1.8] font-body font-medium whitespace-nowrap tracking-[0.01em]"
            style={{ fontSize: '22px', textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
          >
            We dont just design. We strip away the
            <br />
            noise leaving only what matters timeless
            <br />
            visuals, and brand that breathe.
          </p>
        </motion.div>

        {/* ========== RIGHT SIDE: Services List (Desktop only) ========== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="absolute right-6 lg:right-16 z-10 hidden lg:flex flex-col items-end gap-2.5"
          style={{ top: '48%' }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <span className="text-white font-medium tracking-[0.08em] font-body group-hover:text-white/80 transition-colors" style={{ fontSize: '22px', textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                ({service.num})
              </span>
              <span className="text-white font-medium tracking-[0.06em] font-body group-hover:text-white/80 transition-colors" style={{ fontSize: '22px', textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                {service.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== BOTTOM SECTION ========== */}
        <div className="relative z-30 w-full px-4 sm:px-6 lg:px-16 pb-6 sm:pb-8 lg:pb-12 mt-auto">

          {/* Mobile Services Pills - visible on mobile/tablet */}
          <div className="flex lg:hidden justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-3 w-full scrollbar-hide snap-x">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + idx * 0.08 }}
                className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md whitespace-nowrap snap-center shrink-0"
              >
                <span className="text-white/60 text-xs font-body">
                  {service.num}
                </span>
                <span className="text-white text-sm font-medium font-body">
                  {service.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Stats + CTA | Mobile: CTA only */}
          <div className="flex items-end justify-center lg:justify-between gap-4 w-full">
            {/* Stats - visible on md+ */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="hidden lg:grid grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
                  className="flex flex-col"
                >
                  <span
                    className="text-5xl lg:text-[68px] font-medium text-white font-display leading-none select-none"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
                  >
                    {stat.num}
                  </span>
                  <span className="text-white/70 text-sm lg:text-[14px] tracking-[0.06em] font-body font-medium mt-2">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA: Tagline + Get Started - Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="hidden lg:flex flex-col items-end gap-6"
            >
              <div className="text-start" style={{ width: '388px' }}>
                <p className="text-white text-xl lg:text-2xl font-medium font-body leading-[1.4]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                  I&apos;m A Full Stack Developer
                </p>
                <p className="text-white text-xl lg:text-2xl font-medium font-body leading-[1.4] whitespace-nowrap" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                  With 3+ Years Of Experience
                </p>
              </div>

              {/* Get Started button + arrow */}
              <div className="relative" style={{ width: '388px', height: '85px' }}>
                <button 
                  onClick={handleScrollToContact}
                  className="w-full h-full rounded-full border border-white/25 bg-white/[0.15] backdrop-blur-xl text-white text-xl lg:text-2xl font-medium tracking-[0.04em] font-body hover:bg-white/[0.25] hover:border-white/40 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.06)] text-left pl-10" 
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
                >
                  Get Started
                </button>
                <div
                  onClick={handleScrollToContact}
                  className="absolute rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  style={{
                    width: '70px',
                    height: '70px',
                    top: '50%',
                    right: '8px',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Mobile/Tablet: Get Started Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="lg:hidden w-full flex justify-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[60px] sm:h-[64px]">
                <button 
                  onClick={handleScrollToContact}
                  className="w-full h-full rounded-full border border-white/25 bg-white/[0.15] backdrop-blur-xl text-white text-base sm:text-lg font-medium tracking-[0.04em] font-body hover:bg-white/[0.25] hover:border-white/40 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.06)] text-left pl-6 sm:pl-8" 
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
                >
                  Get Started
                </button>
                <div
                  onClick={handleScrollToContact}
                  className="absolute rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  style={{
                    width: '46px',
                    height: '46px',
                    top: '50%',
                    right: '7px',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
