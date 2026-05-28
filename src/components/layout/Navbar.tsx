"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
      if (pathname === "/") {
        const sections = navItems.map(item => item.href.substring(1));
        let current = "";
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
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

  // Determine whether to use the Blue theme or White theme
  const useBlueStyle = isScrolled || pathname !== "/";

  // White liquid glass style (for Hero section, before scrolling)
  const whiteLiquidGlassBar: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 247, 250, 0.75) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "1px solid rgba(0, 102, 255, 0.15)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  };

  // Blue liquid glass style (for after scroll and other pages like /projects)
  const blueLiquidGlassBar: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0, 102, 255, 0.95) 0%, rgba(0, 80, 220, 0.9) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 12px 40px rgba(0, 102, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  // White glass pill for blue background (active / hover)
  const whiteGlassPill: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(12px)",
  };

  // Light blue glass pill for white background (active / hover)
  const lightBlueGlassPill: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0, 102, 255, 0.12) 0%, rgba(0, 102, 255, 0.04) 100%)",
    border: "1px solid rgba(0, 102, 255, 0.18)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 6px rgba(0, 102, 255, 0.05)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div ref={menuRef} className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500">
      {/* Outer Nav container - Full screen width */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full transition-all duration-500 relative px-4 md:px-10 lg:px-16"
        style={useBlueStyle ? blueLiquidGlassBar : whiteLiquidGlassBar}
      >
        <div className="relative flex items-center justify-between h-[60px] md:h-[72px] transition-all duration-500">

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
              className="w-auto h-7 md:h-10 object-contain transition-all duration-500"
              priority
            />
          </motion.div>

          {/* Navigation - Desktop Only */}
          <div className="hidden md:flex items-center gap-1.5 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative rounded-full font-semibold font-sf-pro transition-all duration-300 px-5 py-2.5 text-[13px] tracking-wide
                    ${useBlueStyle
                      ? isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isActive
                        ? "text-[#0066ff]"
                        : "text-[#0066ff]/70 hover:text-[#0066ff]"
                    }`}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full z-0"
                      style={useBlueStyle ? whiteGlassPill : lightBlueGlassPill}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div
                      className="absolute inset-0 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={useBlueStyle ? whiteGlassPill : lightBlueGlassPill}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Contact Me Button - Desktop Only */}
          <div className="hidden md:block z-10 shrink-0">
            <button
              onClick={() => handleNavClick("#contact")}
              className={`font-bold font-sf-pro rounded-full active:scale-95 transition-all duration-500 px-6 py-2.5 text-xs tracking-wider uppercase
                ${useBlueStyle
                  ? "bg-white text-[#0066ff] shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-white/90"
                  : "bg-[#0066ff] text-white shadow-[0_4px_15px_rgba(0,102,255,0.2)] hover:bg-[#0052cc]"
                }`}
            >
              Contact Me
            </button>
          </div>

          {/* Hamburger Menu Toggle - Mobile Only */}
          <div className="md:hidden z-10 shrink-0 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-[4px] relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-[2px] rounded-full origin-center ${useBlueStyle ? "bg-white" : "bg-[#0066ff]"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={`w-5 h-[2px] rounded-full ${useBlueStyle ? "bg-white" : "bg-[#0066ff]"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-[2px] rounded-full origin-center ${useBlueStyle ? "bg-white" : "bg-[#0066ff]"}`}
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
            style={useBlueStyle ? blueLiquidGlassBar : whiteLiquidGlassBar}
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
                      : isActive
                        ? "text-[#0066ff]"
                        : "text-[#0066ff]/70 hover:text-[#0066ff]"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className={`w-1.5 h-1.5 rounded-full ${useBlueStyle ? "bg-white" : "bg-[#0066ff]"}`}
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
