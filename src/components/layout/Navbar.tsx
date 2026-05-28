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

  // Mobile Floating Menu Theme & Styles (Premium Awwwards visual standard)
  const mobileMenuBg: React.CSSProperties = {
    background: "linear-gradient(180deg, rgba(15, 15, 22, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  };

  // Active item glow effect
  const activeGlowPill: React.CSSProperties = {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 102, 255, 0.15) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 0 20px rgba(0, 102, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
  };

  // Scrolled mobile top bar background style
  const mobileScrolledBg: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0, 102, 255, 0.95) 0%, rgba(0, 80, 220, 0.9) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 12px 40px rgba(0, 102, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)",
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

      {/* 2. MOBILE VERSION OF NAVBAR (RE-DESIGNED FOR AWWWARDS STANDARD) */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden w-full transition-all duration-500">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full transition-all duration-500 relative px-4"
          style={isScrolled ? mobileScrolledBg : { background: "transparent" }}
        >
          <div className={`relative flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-14' : 'h-[72px]'
          }`}>
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
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'h-7' : 'h-9'
                }`}
                priority
              />
            </motion.div>

            {/* Hamburger circular button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 rounded-full flex flex-col justify-center items-center gap-[4px] relative focus:outline-none bg-white/5 border border-white/10 active:scale-95 transition-all duration-300"
              aria-label="Open menu"
            >
              <span className="w-4 h-[1.5px] bg-white rounded-full" />
              <span className="w-4 h-[1.5px] bg-white rounded-full" />
              <span className="w-4 h-[1.5px] bg-white rounded-full" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Awwwards Premium Mobile Floating Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 left-4 right-4 rounded-[28px] p-6 flex flex-col relative overflow-hidden"
              style={mobileMenuBg}
            >
              {/* Atmospheric Ambient Glow Circles */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#0066ff]/15 rounded-full blur-[70px] pointer-events-none" />
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

                {/* Circle Glass Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative focus:outline-none hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-[1.5px] bg-white rounded-full rotate-45" />
                    <span className="absolute w-4 h-[1.5px] bg-white rounded-full -rotate-45" />
                  </div>
                </button>
              </div>

              {/* Thin Premium Line Divider */}
              <div className="w-full h-[1px] bg-white/[0.08] my-4 relative z-10" />

              {/* Navigation Items - Staggered Vertical Entrance */}
              <div className="flex flex-col gap-2 relative z-10">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -16, filter: "blur(3px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 + 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`group relative rounded-xl w-full py-2.5 px-4 text-left transition-all duration-300 flex items-center`}
                    >
                      <span className="text-[10px] font-mono text-white/35 mr-4 tracking-wider">0{index + 1}</span>
                      <span className={`text-[14px] font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
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
