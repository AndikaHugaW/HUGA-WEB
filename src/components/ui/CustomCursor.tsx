"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isDesktopRef = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Only show custom cursor on desktop
    const checkDesktop = () => {
      isDesktopRef.current = window.matchMedia("(pointer: fine)").matches;
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.display = isDesktopRef.current ? 'block' : 'none';
        dotRef.current.style.display = isDesktopRef.current ? 'block' : 'none';
      }
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // OPTIMASI: Gunakan refs + RAF bukan state untuk performa
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // OPTIMASI: Smooth animation dengan RAF
    const animate = () => {
      if (!isDesktopRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Lerp untuk smooth movement
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '40px';
        cursorRef.current.style.height = '40px';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", checkDesktop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ display: 'none' }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ display: 'none' }}
      />
    </>
  );
}
