"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-purple-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-\[1440px\] mx-auto px-6 md:px-12 lg:px-24">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="z-10"
          >
            <Image
              src="/images/logo/logo-huga.png"
              alt="Huga Logo"
              width={300}
              height={100}
              className="h-24 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <MagneticButton
                key={index}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-[#00ff88] hover:bg-[#00ff88]/20 font-medium hover:font-extrabold px-3 py-2 rounded-lg transition-all duration-300"
                magneticStrength={0.2}
              >
                {item.name}
              </MagneticButton>
            ))}
          </div>

          {/* Contact Me Button - Right Side */}
          <div className="hidden md:block z-10">
            <MagneticButton
              onClick={() => handleNavClick("#contact")}
              className="px-6 py-2.5 bg-[#00ff88] text-black font-semibold rounded-full shadow-lg shadow-[#00ff88]/50 hover:shadow-[#00ff88]/70 transition-all duration-300"
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
              className="w-6 h-0.5 bg-purple-400"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : {}}
              className="w-6 h-0.5 bg-purple-400"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : {}}
              className="w-6 h-0.5 bg-purple-400"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-500/20"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-gray-300 hover:text-[#00ff88] hover:bg-[#00ff88]/20 font-medium hover:font-extrabold px-3 py-2 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => handleNavClick("#contact")}
                className="w-full mt-4 px-6 py-2.5 bg-[#00ff88] text-black font-semibold rounded-full shadow-lg shadow-[#00ff88]/50 transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

