"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section only on home page
      if (pathname === "/") {
        const sections = navItems.map(item => item.href.substring(1));
        let current = "";
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if element is in the upper part of the viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${href}`);
    }
  };

  // Mobile theme logic:
  // - useBlueStyle: scrolled state OR not on the home page (e.g. projects page)
  const useBlueStyle = isScrolled || pathname !== "/";
  // - isTextBlue: on home page, not scrolled, but mobile menu is clicked/opened (White theme active)
  const isTextBlue = !useBlueStyle && isMobileMenuOpen;

  // Liquid glass white background style (active when mobile menu is opened in Hero section)
  const whiteLiquidGlassBar: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.8) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "1px solid rgba(0, 102, 255, 0.15)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  };

  // Liquid glass blue background style (active on mobile scrolled state or projects page dropdown)
  const blueLiquidGlassBarMobile: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0, 102, 255, 0.95) 0%, rgba(0, 80, 220, 0.9) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 12px 40px rgba(0, 102, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  // Determine navbar background styling for mobile viewport specifically
  const getMobileNavbarStyle = () => {
    if (useBlueStyle) return blueLiquidGlassBarMobile;
    if (isMobileMenuOpen) return whiteLiquidGlassBar;
    return { background: "transparent" };
  };

  // Active / hover item styling indicators for mobile dropdown menu list
  const lightBlueGlassPill: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0, 102, 255, 0.12) 0%, rgba(0, 102, 255, 0.04) 100%)",
    border: "1px solid rgba(0, 102, 255, 0.18)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 102, 255, 0.05)",
    backdropFilter: "blur(12px)",
  };

  const whiteGlassPill: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div ref={menuRef} className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'top-0 md:top-6 px-0 md:px-6' : 'top-0 px-0'
    }`}>
      {/* 1. DESKTOP VERSION OF NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`hidden md:block mx-auto w-full transition-all duration-500 ${
          isScrolled
            ? "max-w-[1400px] bg-[#0066ff]/90 backdrop-blur-[20px] border border-white/20 shadow-[0_20px_40px_rgba(0,102,255,0.3)] rounded-full px-[40px]"
            : "max-w-none bg-transparent px-10 lg:px-16"
        }`}
      >
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-[64px]' : 'h-28'
        }`}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="z-10 -ml-2 cursor-pointer"
            onClick={() => handleNavClick("#home")}
          >
            <Image
              src="/images/logo/logo-huga.png"
              alt="Huga Logo"
              width={300}
              height={100}
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-10 md:h-12' : 'h-20 md:h-24'
              }`}
              priority
            />
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <MagneticButton
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium font-sf-pro transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : isScrolled
                        ? "text-white/80 hover:text-white"
                        : "text-gray-400 hover:text-white"
                  }`}
                  magneticStrength={0.2}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/[0.25] backdrop-blur-xl border border-white/40 rounded-full z-0 shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </MagneticButton>
              );
            })}
          </div>

          {/* Contact Me Button - Right Side */}
          <div className="z-10">
            <MagneticButton
              onClick={() => handleNavClick("#contact")}
              className={`px-6 bg-white text-[#0066ff] font-semibold font-sf-pro rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-white/90 hover:shadow-[0_4px_30px_rgba(255,255,255,0.25)] active:scale-95 transition-all duration-300 ${
                isScrolled ? "py-2 text-xs" : "py-2.5 text-sm"
              }`}
              magneticStrength={0.3}
            >
              Contact Me
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* 2. MOBILE VERSION OF NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:hidden w-full transition-all duration-500 relative px-4"
        style={getMobileNavbarStyle()}
      >
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-14' : 'h-[72px]'
        }`}>
          {/* Logo - Left */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="z-10 cursor-pointer shrink-0"
            onClick={() => handleNavClick("#home")}
          >
            <Image
              src="/images/logo/logo-huga.png"
              alt="Huga Logo"
              width={300}
              height={100}
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-7' : 'h-9'
              }`}
              priority
            />
          </motion.div>

          {/* Hamburger Menu Toggle - Right */}
          <div className="z-10 shrink-0 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-[4px] relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-[2px] rounded-full origin-center ${useBlueStyle ? "bg-white" : isTextBlue ? "bg-[#0066ff]" : "bg-white"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={`w-5 h-[2px] rounded-full ${useBlueStyle ? "bg-white" : isTextBlue ? "bg-[#0066ff]" : "bg-white"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-[2px] rounded-full origin-center ${useBlueStyle ? "bg-white" : isTextBlue ? "bg-[#0066ff]" : "bg-white"}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu Card - Cascading Downwards */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden w-full border-b flex flex-col gap-1 px-4 py-3 relative z-40"
            style={useBlueStyle ? blueLiquidGlassBarMobile : whiteLiquidGlassBar}
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative rounded-xl w-full py-3 px-4 text-left font-semibold font-sf-pro transition-all duration-300 text-sm flex items-center justify-between
                    ${useBlueStyle
                      ? isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isTextBlue
                        ? isActive
                          ? "text-[#0066ff]"
                          : "text-[#0066ff]/70 hover:text-[#0066ff]"
                        : isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className={`w-1.5 h-1.5 rounded-full ${useBlueStyle ? "bg-white" : isTextBlue ? "bg-[#0066ff]" : "bg-white"}`}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-navbar-active"
                      className="absolute inset-0 rounded-xl z-0"
                      style={useBlueStyle ? whiteGlassPill : lightBlueGlassPill}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div
                      className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={useBlueStyle ? whiteGlassPill : lightBlueGlassPill}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
