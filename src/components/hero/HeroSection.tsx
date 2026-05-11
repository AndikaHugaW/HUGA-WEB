"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

// Dynamic import untuk komponen berat (Vortex dengan particle system)
const Vortex = dynamic(
  () => import("@/components/ui/vortex").then(mod => ({ default: mod.Vortex })), 
  {
    ssr: false,
    loading: () => null,
  }
);

// CSS-only static gradient - TIDAK ADA ANIMASI untuk performa scroll
const StaticBackground = () => (
  <div className="absolute inset-0 bg-black overflow-hidden">
    {/* Static gradient orbs - tanpa animasi untuk performa scroll */}
    <div 
      className="absolute w-[500px] h-[500px] rounded-full opacity-20"
      style={{
        background: 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 60%)',
        top: '15%',
        left: '25%',
        filter: 'blur(60px)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
    <div 
      className="absolute w-[400px] h-[400px] rounded-full opacity-15"
      style={{
        background: 'radial-gradient(circle, rgba(0,255,136,0.25) 0%, transparent 60%)',
        bottom: '15%',
        right: '25%',
        filter: 'blur(50px)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  </div>
);

export default function HeroSection() {
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [showVortex, setShowVortex] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Deteksi scroll untuk pause animasi berat
  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
    
    // Clear timeout sebelumnya
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set tidak scrolling setelah 150ms idle
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [isScrolling]);

  useEffect(() => {
    // Tambahkan scroll listener dengan passive untuk performa
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    // Set hasAnimated setelah animasi awal selesai (2 detik)
    const animTimer = setTimeout(() => setHasAnimated(true), 2000);
    
    // OPTIMASI: Cek apakah mobile device
    const isMobile = window.innerWidth < 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Load Vortex setelah delay, hanya jika:
    // 1. User tidak prefer reduced motion
    // 2. Bukan mobile device
    if (!prefersReducedMotion && !isMobile) {
      const vortexTimer = setTimeout(() => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => setShowVortex(true), { timeout: 3000 });
        } else {
          setShowVortex(true);
        }
      }, 2500); // Delay lebih lama untuk prioritaskan konten
      
      return () => {
        clearTimeout(animTimer);
        clearTimeout(vortexTimer);
      };
    }
    
    return () => clearTimeout(animTimer);
  }, [prefersReducedMotion]);

  // Optimasi: Gunakan CSS animation setelah initial mount
  const getAnimationProps = (delay: number) => {
    if (hasAnimated) {
      // Setelah animasi awal, tidak perlu Framer Motion
      return {};
    }
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay }
    };
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
      style={{ 
        willChange: 'auto',
        contain: 'layout style paint',
      }}
    >
      {/* LAYER 1: Static CSS Background - sangat ringan */}
      <StaticBackground />
      
      {/* LAYER 2: Vortex - hanya tampil jika tidak scroll dan tidak reduced motion */}
      <AnimatePresence>
        {showVortex && !isScrolling && !prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 z-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'opacity' }}
          >
            <Vortex
              backgroundColor="transparent"
              baseHue={140}
              particleCount={100}
              rangeY={200}
              baseSpeed={0.2}
              rangeSpeed={0.8}
              className="w-full h-full"
              containerClassName="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content - dengan GPU acceleration hints */}
      <div 
        className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-12 lg:py-20"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Mobile Layout (default) / Desktop Layout (lg:) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 min-h-[85vh] lg:min-h-[80vh]">
          
          {/* Mobile: Center content first / Desktop: Left Statistics */}
          <div 
            className="order-3 lg:order-1 lg:col-span-2 flex lg:flex-col justify-center lg:justify-end items-center lg:items-start gap-4 lg:gap-6 animate-fadeInLeft lg:self-end"
            style={{ 
              animationDelay: '0.2s',
              animationFillMode: 'backwards',
            }}
          >
            <div className="text-center lg:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#00ff88] mb-1 lg:mb-4 leading-none">
                50+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-bold uppercase tracking-wider whitespace-nowrap">
                Project Done
              </div>
            </div>
            
            <div className="hidden lg:block h-px w-24 bg-[#00ff88]/50"></div>
            <div className="block lg:hidden w-px h-6 bg-[#00ff88]/50"></div>
            
            <div className="text-center lg:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#00ff88] mb-1 lg:mb-4 leading-none">
                50+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-bold uppercase tracking-wider whitespace-nowrap">
                Happy Clients
              </div>
            </div>
          </div>

          {/* Center: Profile Image + Overlay Text */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[800px] pt-16 sm:pt-20 lg:pt-0">
            {/* Profile Image */}
            <div 
              className="relative z-10 mt-20 sm:mt-28 md:mt-36 lg:mt-56 animate-fadeInUp"
              style={{ 
                animationDelay: '0.3s',
                animationFillMode: 'backwards',
              }}
            >
              <div className="relative">
                {/* Image container */}
                <div 
                  className="w-48 sm:w-64 md:w-80 lg:w-[500px] xl:w-[550px] aspect-square rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative"
                  style={{
                    boxShadow: '0 0 60px rgba(0,255,136,0.3)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src="/images/hero/foto-huga.jpg"
                    alt="Andika Huga Widyatama"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 550px"
                    className="object-cover"
                    priority
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAgcBAAAAAAAAAAAAAQIDBAAFESESITFBUWFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEEQA/9cx4dRpT2ork9eeN0mUOjKwIIOQQR0Oah1LV6GnxRtZndFlOEZIXfdT4yJxjH7jGMD/2Q=="
                  />
                </div>
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-full -z-10 scale-125 opacity-30"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,255,136,0.4) 0%, transparent 60%)',
                    filter: 'blur(40px)',
                  }}
                />
              </div>
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Hi I'm Huga */}
                <div
                  className="absolute top-[8%] sm:top-[7%] md:top-[6%] lg:top-[9%] pointer-events-auto cursor-pointer animate-fadeInDown"
                  style={{ 
                    animationDelay: '0.4s',
                    animationFillMode: 'backwards',
                  }}
                  onMouseEnter={() => setHoveredText("hi")}
                  onMouseLeave={() => setHoveredText(null)}
                >
                  <div 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-8xl xl:text-9xl leading-[0.85] whitespace-nowrap transition-all duration-300 ${
                      hoveredText === "hi" ? "font-black" : "font-medium"
                    }`}
                    style={{
                      WebkitTextStroke: "1px #00ff88",
                      WebkitTextFillColor: hoveredText === "hi" ? "#00ff88" : "transparent",
                      color: hoveredText === "hi" ? "#00ff88" : "transparent",
                      willChange: 'color',
                    }}
                  >
                    <TextReveal
                      text="Hi I'm Huga"
                      variant="glitch"
                      className=""
                      delay={0.4}
                    />
                  </div>
                </div>

                {/* Full Stack Dev */}
                <div
                  className="absolute top-[22%] sm:top-[24%] md:top-[25%] lg:top-[29%] pointer-events-auto cursor-pointer animate-fadeInUp"
                  style={{ 
                    animationDelay: '0.5s',
                    animationFillMode: 'backwards',
                  }}
                  onMouseEnter={() => setHoveredText("dev")}
                  onMouseLeave={() => setHoveredText(null)}
                >
                  <div 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-8xl xl:text-9xl leading-[0.85] whitespace-nowrap transition-all duration-300 ${
                      hoveredText === "dev" ? "font-black" : "font-medium"
                    }`}
                    style={{
                      WebkitTextStroke: "1px #00ff88",
                      WebkitTextFillColor: hoveredText === "dev" ? "#00ff88" : "transparent",
                      color: hoveredText === "dev" ? "#00ff88" : "transparent",
                      willChange: 'color',
                    }}
                  >
                    <TextReveal
                      text="Full Stack Dev"
                      variant="glitch"
                      className=""
                      delay={0.6}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Description + CTA */}
          <div 
            className="order-2 lg:order-3 lg:col-span-3 space-y-4 lg:space-y-8 lg:pl-4 lg:self-end animate-fadeInRight text-center lg:text-left"
            style={{ 
              animationDelay: '0.4s',
              animationFillMode: 'backwards',
            }}
          >
            <div className="space-y-2 lg:space-y-4">
              <TextReveal
                text="I'M A FULL STACK DEVELOPER"
                variant="word"
                className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-wide leading-tight"
                delay={0.6}
              />
              
              <TextReveal
                text="WITH 1+ YEARS OF EXPERIENCE."
                variant="word"
                className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-wide leading-tight"
                delay={0.7}
              />
              
              <TextReveal
                text="FOCUSED ON WEB DEVELOPMENT AND UI/UX DESIGN."
                variant="word"
                className="text-[10px] sm:text-xs md:text-sm text-white font-medium leading-relaxed"
                delay={0.8}
              />
            </div>

            <div className="pt-2 lg:pt-4">
              <MagneticButton
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.1)] rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 w-full justify-center backdrop-blur-md"
                magneticStrength={0.3}
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="font-semibold tracking-wide">Get Started</span>
                <span className="text-lg sm:text-xl text-[#00ff88] group-hover:translate-x-1 transition-transform">→</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>


      {/* CSS Keyframes untuk animasi ringan */}
      <style jsx global>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-scrollBounce { animation: scrollBounce 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
