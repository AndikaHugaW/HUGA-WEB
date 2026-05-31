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

  // Detect if we're on a subpage (not landing page)
  const isSubPage = pathname !== "/";

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

    // Set active section based on current route for subpages
    if (pathname.startsWith("/projects")) {
      setActiveSection("projects");
    }

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

  // Mobile Menu Blue Card Style (when active/pressed)
  const mobileMenuBg: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(26, 52, 255, 0.98) 0%, rgba(15, 30, 200, 0.98) 100%)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  };

  // Mobile Top Bar Scrolled State: Elegant Solid Blue Floating Capsule
  const mobileScrolledBg: React.CSSProperties = {
    background: "#1A34FF",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 40px rgba(26, 52, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  };

  // Mobile Top Bar Scrolled State for Sub Pages: Light floating capsule
  const mobileScrolledBgLight: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.85)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  };

  // Active / Hover item glow style in mobile dropdown
  const mobileActiveGlow: React.CSSProperties = {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div ref={menuRef} className="z-50 w-full">
      
      {/* 1. DESKTOP VERSION OF NAVBAR (UNTOUCHED / RESTORED TO ORIGINAL STATE) */}
      <div className={`fixed left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
        isScrolled ? 'top-0 md:top-4 px-0 md:px-6' : 'top-0 px-0'
      }`}>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mx-auto w-full transition-all duration-500 ${
            isScrolled
              ? isSubPage
                ? "max-w-[1300px] bg-white/75 backdrop-blur-[20px] border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-full px-[36px]"
                : "max-w-[1300px] bg-[#0066ff]/80 backdrop-blur-[20px] border border-white/15 shadow-[0_12px_24px_rgba(0,102,255,0.18)] rounded-full px-[36px]"
              : isSubPage
                ? "max-w-none bg-transparent px-10 lg:px-16"
                : "max-w-none bg-transparent px-10 lg:px-16"
          }`}
        >
          <div className={`relative flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-[56px]' : 'h-20'
          }`}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="z-10 -ml-2 cursor-pointer"
              onClick={() => handleNavClick("#home")}
            >
              <Image
                src={isSubPage ? "/images/logo/Logo2.png" : "/images/logo/Logo.png"}
                alt="Huga Logo"
                width={300}
                height={100}
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'h-6 md:h-7' : 'h-10 md:h-12'
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
                      isSubPage
                        ? isActive
                          ? ""
                          : isScrolled
                            ? ""
                            : ""
                        : isActive
                          ? "text-white"
                          : isScrolled
                            ? "text-white/80 hover:text-white"
                            : "text-gray-400 hover:text-white"
                    }`}
                    magneticStrength={0.2}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                      isSubPage
                        ? isActive
                          ? "text-white"
                          : isScrolled
                            ? "text-black/60 group-hover:text-white"
                            : "text-black/50 group-hover:text-white"
                        : ""
                    }`}>{item.name}</span>
                    {/* Active pill */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className={`absolute inset-0 backdrop-blur-xl rounded-full z-0 ${
                          isSubPage
                            ? "bg-[#0066ff]/80 border border-[#0066ff]/30 shadow-[0_4px_20px_rgba(0,102,255,0.35)]"
                            : "bg-white/[0.25] border border-white/40 shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover liquid glass pill (subpage only, non-active) */}
                    {isSubPage && !isActive && (
                      <div className="absolute inset-0 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#0066ff]/70 backdrop-blur-xl border border-[#0066ff]/25 shadow-[0_4px_20px_rgba(0,102,255,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]" />
                    )}
                  </MagneticButton>
                );
              })}
            </div>

            {/* Contact Me Button - Right Side (Liquid Glass Style) */}
            <div className="z-10">
              <MagneticButton
                onClick={() => handleNavClick("#contact")}
                className={`relative px-6 py-2.5 font-semibold font-sf-pro rounded-full overflow-hidden transition-all duration-300 active:scale-95 ${
                  isScrolled
                    ? isSubPage
                      ? "text-xs text-[#0066ff] bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-white hover:border-[#0066ff]/30"
                      : "text-xs text-[#0066ff] bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:bg-white"
                    : isSubPage
                      ? "text-sm text-white bg-[#0066ff] border border-[#0066ff] shadow-[0_8px_24px_rgba(0,102,255,0.2)] hover:bg-[#0055dd] hover:shadow-[0_8px_32px_rgba(0,102,255,0.3)]"
                      : "text-sm text-white bg-white/[0.1] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/[0.2] hover:border-white/30"
                }`}
                magneticStrength={0.3}
              >
                {/* Liquid Glass Shine Effect */}
                {!isSubPage && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
                )}
                <span className="relative z-10">Contact Me</span>
              </MagneticButton>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* 2. MOBILE VERSION OF NAVBAR */}
      <div className={`md:hidden z-50 transition-all duration-500 ${
        isScrolled 
          ? "fixed top-4 left-4 right-4" 
          : "fixed top-0 left-0 right-0 w-full"
      }`}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden transition-all duration-500 ${
            isScrolled 
              ? "px-4 py-2.5 rounded-[24px]" 
              : "px-4 bg-transparent border-none shadow-none"
          }`}
          style={isScrolled ? (isSubPage ? mobileScrolledBgLight : mobileScrolledBg) : undefined}
        >
          {isScrolled && !isSubPage && (
            /* Subtle shine layout reflection when scrolled */
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          )}
          
          <div className={`relative flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-[46px]' : 'h-[72px]'
          }`}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="z-10 cursor-pointer shrink-0"
              onClick={() => handleNavClick("#home")}
            >
              <Image
                src={isSubPage ? "/images/logo/Logo2.png" : "/images/logo/Logo.png"}
                alt="Huga Logo"
                width={300}
                height={100}
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'h-7' : 'h-9'
                }`}
                priority
              />
            </motion.div>

            {/* Custom Premium 3-Line Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center relative focus:outline-none transition-all duration-300 active:scale-95 border
                ${isSubPage
                  ? isScrolled
                    ? "bg-black/5 border-black/10 hover:bg-black/10"
                    : "bg-black/5 border-black/10 hover:bg-black/10"
                  : isScrolled 
                    ? "bg-white/10 border-white/15 hover:bg-white/20" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-[3.5px] items-end justify-center">
                <span className={`w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${isSubPage ? 'bg-black' : 'bg-white'}`} />
                <span className={`w-[12px] h-[1.5px] rounded-full transition-all duration-300 ${isSubPage ? 'bg-black' : 'bg-white'}`} />
                <span className={`w-[16px] h-[1.5px] rounded-full transition-all duration-300 ${isSubPage ? 'bg-black' : 'bg-white'}`} />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Awwwards Premium Mobile Floating Menu Overlay (Perfectly Centered & Highly Responsive) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            {/* Clickable backdrop overlay to close menu */}
            <div 
              className="absolute inset-0 w-full h-full" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[360px] xs:max-w-[400px] rounded-[28px] p-6 flex flex-col relative overflow-hidden z-10"
              style={mobileMenuBg}
            >
              {/* Atmospheric Ambient Glow Circles */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-white/5 rounded-full blur-[60px] pointer-events-none" />

              {/* Floating Menu Header */}
              <div className="flex items-center justify-between w-full relative z-10">
                <Image
                  src="/images/logo/Logo.png"
                  alt="Huga Logo"
                  width={300}
                  height={100}
                  className="w-auto h-8 object-contain"
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

              {/* Navigation Items - Staggered Vertical Entrance (White text on blue bg) */}
              <div className="flex flex-col gap-1.5 w-full relative z-10">
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
                          ? "text-white" 
                          : "text-white/60 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>

                      {/* Active item highlight glow */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-glow-active"
                          className="absolute inset-0 rounded-xl z-[-1]"
                          style={mobileActiveGlow}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover highlights */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={mobileActiveGlow}
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
