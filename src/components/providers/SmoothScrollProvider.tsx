"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

// Context to expose lenis instance for modal scroll control
const LenisContext = createContext<{ stop: () => void; start: () => void } | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const controlsRef = useRef({ stop: () => {}, start: () => {} });

  useEffect(() => {
    // OPTIMASI: Cek apakah user prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip smooth scroll untuk user yang prefer reduced motion
      return;
    }

    // OPTIMASI: Cek apakah device mobile (biasanya tidak perlu smooth scroll)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0, // Kurangi dari 1.2 untuk respons lebih cepat
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    controlsRef.current = {
      stop: () => lenis.stop(),
      start: () => lenis.start(),
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // OPTIMASI: Pause saat tab tidak aktif
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={controlsRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
