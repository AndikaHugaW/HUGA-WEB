"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNavClick = (href: string) => {
    if (pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${href}`);
    }
  };

  // Blue liquid glass bar (scrolled state)
  const liquidGlassBar: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(0,102,255,0.92) 0%, rgba(0,80,220,0.88) 50%, rgba(0,102,255,0.92) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -0.5px 0 rgba(255,255,255,0.05), 0 12px 40px rgba(0,102,255,0.35), 0 4px 12px rgba(0,0,0,0.15)",
  };

  // Liquid glass pill (active / hover)
  const liquidGlassPill: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.1)",
    backdropFilter: "blur(12px)",
  };

  return (
    <div className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'top-4 md:top-6 px-4 md:px-6' : 'top-0 px-0'
    }`}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`mx-auto w-full transition-all duration-500 ${
          isScrolled
            ? "max-w-[1400px] rounded-full px-4 md:px-[40px]"
            : "max-w-none bg-transparent px-4 md:px-10 lg:px-16"
        }`}
        style={isScrolled ? liquidGlassBar : undefined}
      >
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-[52px] md:h-[64px]' : 'h-14 md:h-28'
        }`}>

          {/* Logo - Left */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="z-10 cursor-pointer shrink-0"
            onClick={() => handleNavClick("#home")}
          >
            <Image
              src="/images/logo/logo-huga.png"
              alt="Huga Logo"
              width={300}
              height={100}
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-6 md:h-12' : 'h-9 md:h-24'
              }`}
              priority
            />
          </motion.div>

          {/* Navigation - Absolute Centered (same layout as desktop) */}
          <div className="flex items-center gap-0 md:gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative rounded-full font-medium font-sf-pro transition-all duration-300
                    px-[7px] py-1 text-[11px]
                    md:px-5 md:py-2 md:text-sm
                    ${isActive
                      ? "text-white"
                      : isScrolled
                        ? "text-white/80 hover:text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                  {/* Active: liquid glass pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full z-0"
                      style={liquidGlassPill}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover: liquid glass pill */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={liquidGlassPill}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Contact Me Button - Right */}
          <div className="z-10 shrink-0">
            <button
              onClick={() => handleNavClick("#contact")}
              className={`font-semibold font-sf-pro rounded-full active:scale-95 transition-all duration-500
                px-3 py-1 text-[10px]
                md:px-6 md:py-2 md:text-xs
                ${isScrolled
                  ? "bg-white text-[#0066ff] shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-white/90"
                  : "text-white bg-white/[0.08] backdrop-blur-[20px] border border-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.15] hover:border-white/[0.25]"
                }`}
            >
              Contact Me
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
