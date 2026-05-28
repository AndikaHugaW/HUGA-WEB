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

  // Mobile Floating Menu Styles (Awwwards visual standard)
  const mobileMenuBg: React.CSSProperties = {
    background: "linear-gradient(180deg, rgba(15, 15, 25, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  };

  // Premium active item glow style
  const activeGlowPill: React.CSSProperties = {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(124, 140, 255, 0.25) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 0 30px rgba(124, 140, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
  };

  // Mobile Top Bar Default State (Floating glass capsule with soft blue accents)
  const mobileDefaultBg: React.CSSProperties = {
    background: "rgba(10, 10, 20, 0.35)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 20px rgba(0, 0, 0, 0.15)",
  };

  // Mobile Top Bar Scrolled State (Solid elegant blue)
  const mobileScrolledBg: React.CSSProperties = {
    background: "#1A34FF",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 40px rgba(26, 52, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  };

  return (
    <div ref={menuRef} className="z-50 w-full">
      
      {/* 1. DESKTOP VERSION OF NAVBAR (UNTOUCHED / RESTORED TO ORIGINAL STATE) */}
      <div className={`fixed left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
        isScrolled ? 'top-0 md:top-6 px-0 md:px-6' : 'top-0 px-0'
      }`}>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mx-auto w-full transition-all duration-500 ${
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
      </div>

      {/* 2. MOBILE VERSION OF NAVBAR (FLOATING PREMIUM PANEL PORTFOLIO STANDARD) */}
      <div className="fixed top-4 left-4 right-4 z-50 md:hidden transition-all duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative px-4 py-2.5 rounded-[24px] overflow-hidden transition-all duration-500"
          style={isScrolled ? mobileScrolledBg : mobileDefaultBg}
        >
          {/* Subtle noise texture or gradient shine effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative flex items-center justify-between h-[46px] transition-all duration-500">
            {/* Logo */}
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
                className="w-auto h-7 object-contain transition-all duration-500"
                priority
              />
            </motion.div>

            {/* Hamburger Button (Soft Glow Accent) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`w-10 h-10 rounded-full flex flex-col justify-center items-center gap-[4.5px] relative focus:outline-none transition-all duration-300 active:scale-95 border
                ${isScrolled 
                  ? "bg-white/10 border-white/10" 
                  : "bg-white/5 border-white/10"
                }`}
              aria-label="Open menu"
            >
              <span className={`w-4.5 h-[1.5px] rounded-full transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-[#8EA2FF]"}`} />
              <span className={`w-3.5 h-[1.5px] rounded-full transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-[#8EA2FF]"}`} />
              <span className={`w-4.5 h-[1.5px] rounded-full transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-[#8EA2FF]"}`} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Awwwards Premium Mobile Floating Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, scale: 0.96, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 left-4 right-4 rounded-[28px] p-6 flex flex-col relative overflow-hidden"
              style={mobileMenuBg}
            >
              {/* Atmospheric Ambient Glow Circles */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#1A34FF]/15 rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Floating Menu Header */}
              <div className="flex items-center justify-between w-full relative z-10">
                <Image
                  src="/images/logo/logo-huga.png"
                  alt="Huga Logo"
                  width={300}
                  height={100}
                  className="w-auto h-7 object-contain"
                  priority
                />

                {/* Circle Glass Close Button with Rotation */}
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center relative focus:outline-none transition-all duration-300"
                  aria-label="Close menu"
                >
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-[1.5px] bg-white rounded-full rotate-45" />
                    <span className="absolute w-4 h-[1.5px] bg-white rounded-full -rotate-45" />
                  </div>
                </motion.button>
              </div>

              {/* Thin Premium Line Divider */}
              <div className="w-full h-[1px] bg-white/[0.08] my-4 relative z-10" />

              {/* Navigation Items - Staggered Vertical Entrance */}
              <div className="flex flex-col gap-1.5 relative z-10">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -16, filter: "blur(3px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 + 0.08 }}
                      onClick={() => handleNavClick(item.href)}
                      className="group relative rounded-xl w-full py-2.5 px-4 text-left transition-all duration-300 flex items-center"
                    >
                      <span className="text-[10px] font-mono text-white/35 mr-4 tracking-wider">0{index + 1}</span>
                      
                      <span className={`text-[14px] font-medium tracking-tight transition-colors duration-300 ${
                        isActive 
                          ? "text-[#8EA2FF]" 
                          : "text-white/60 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>

                      {/* Active item highlight glow */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-glow-active"
                          className="absolute inset-0 rounded-xl z-[-1]"
                          style={activeGlowPill}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover highlights */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={activeGlowPill}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Thin Premium Line Divider */}
              <div className="w-full h-[1px] bg-white/[0.08] my-4 relative z-10" />

              {/* Footer Section: Social Links */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest px-4">Socials</span>
                <div className="flex items-center gap-4 px-4 py-1">
                  <a
                    href="https://www.instagram.com/huga_studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <span className="text-white/20 text-xs">•</span>
                  <a
                    href="https://www.linkedin.com/in/andika-huga-widyatama-737413246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <span className="text-white/20 text-xs">•</span>
                  <a
                    href="https://github.com/andikahuga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Thin Premium Line Divider */}
              <div className="w-full h-[1px] bg-white/[0.08] my-4 relative z-10" />

              {/* Tagline */}
              <div className="px-4 pb-2 relative z-10">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                  Creative Developer based in Indonesia
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
