"use client";

import { useState, useEffect } from "react";
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

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we are on another page (e.g. /projects), redirect to homepage with the hash
      router.push(`/${href}`);
    }
  };

  return (
    <div className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'top-0 md:top-6 px-0 md:px-6' : 'top-0 px-0'}`}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`mx-auto w-full transition-all duration-500 ${
          isScrolled
            ? "max-w-[1400px] bg-white/30 backdrop-blur-[24px] border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.05)] md:rounded-full px-[40px]"
            : "max-w-none bg-transparent px-10 lg:px-16"
        }`}
      >
        <div className={`relative flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-[64px]' : 'h-28'}`}>
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
              className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-10 md:h-12 invert' : 'h-20 md:h-24'}`}
              priority
            />
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <MagneticButton
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium font-sf-pro transition-all duration-300 ${
                    isActive
                      ? isScrolled ? "text-black" : "text-white"
                      : isScrolled ? "text-black/50 hover:text-black" : "text-gray-400 hover:text-white"
                  }`}
                  magneticStrength={0.2}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className={`absolute inset-0 rounded-full z-0 ${
                        isScrolled
                          ? "bg-black/[0.06] border border-black/[0.08] shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                          : "bg-white/[0.15] backdrop-blur-xl border border-white/25 rounded-full shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </MagneticButton>
              );
            })}
          </div>

          {/* Contact Me Button - Right Side */}
          <div className="hidden md:block z-10">
            <MagneticButton
              onClick={() => handleNavClick("#contact")}
              className={`px-6 font-medium font-sf-pro rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-black text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/20"
                  : "bg-white/[0.15] backdrop-blur-xl border border-white/25 text-white hover:bg-white/[0.25] hover:border-white/40 shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
              } ${
                isScrolled ? "py-2 text-xs" : "py-2.5 text-sm"
              }`}
              magneticStrength={0.3}
            >
              Contact Me
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-10"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : {}}
              className={`w-6 h-0.5 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-white"}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : {}}
              className={`w-6 h-0.5 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-white"}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : {}}
              className={`w-6 h-0.5 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-white"}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-t ${
                isScrolled ? "border-black/5 bg-white/90 backdrop-blur-xl" : "border-white/10 bg-black/45 backdrop-blur-xl"
              }`}
            >
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium font-sf-pro ${
                        isActive
                          ? isScrolled
                            ? "text-black bg-black/[0.05] border border-black/[0.08]"
                            : "text-white bg-white/[0.15] backdrop-blur-xl border border-white/25"
                          : isScrolled
                            ? "text-black/50 hover:text-black hover:bg-black/[0.02]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => handleNavClick("#contact")}
                  className={`w-full mt-6 px-6 py-3.5 font-medium font-sf-pro rounded-xl transition-all duration-300 ${
                    isScrolled
                      ? "bg-black text-white hover:bg-emerald-700"
                      : "bg-white/[0.15] backdrop-blur-xl border border-white/25 text-white hover:bg-white/[0.25] shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
                  }`}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

