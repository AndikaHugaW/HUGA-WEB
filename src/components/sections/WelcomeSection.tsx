"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/andikahuga",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "bg-black",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andika-huga-widyatama-737413246",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: "bg-[#0077b5]",
  },
  {
    name: "Email",
    url: "mailto:andikahuga34@gmail.com",
    icon: (
      <Image 
        src="/images/logo/Gmail_Logo.svg" 
        alt="Gmail Logo" 
        width={24} 
        height={24}
        className="object-contain"
      />
    ),
    color: "bg-white",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/huga_studio/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "bg-[#e1306c]",
  },
];

export default function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Main Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center mb-16 text-center"
        >
          <div className="space-y-4 md:space-y-6 flex flex-col items-center justify-center w-full">
            <div className="w-full flex justify-center">
              <TextReveal
                text="WELCOME TO MY PORTFOLIO! I&apos;M"
                variant="word"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight flex justify-center flex-wrap"
                delay={0.3}
              />
            </div>
            <div className="w-full flex justify-center">
              <div className="flex justify-center flex-wrap">
                <TextReveal
                  text="A FULL STACK DEVELOPER &"
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight flex justify-center flex-wrap"
                  delay={0.4}
                />
                <TextReveal
                  text=" UI/UX DESIGNER,"
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#00ff88] uppercase leading-tight flex justify-center flex-wrap"
                  delay={0.5}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <TextReveal
                text="CREATING MODERN,"
                variant="word"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#00ff88] uppercase leading-tight flex justify-center flex-wrap"
                delay={0.6}
              />
            </div>
            <div className="w-full flex justify-center">
              <TextReveal
                text="RESPONSIVE WEBSITES THAT"
                variant="word"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#00ff88] uppercase leading-tight flex justify-center flex-wrap"
                delay={0.7}
              />
            </div>
            <div className="w-full flex justify-center">
              <TextReveal
                text="DELIVER SEAMLESS EXPERIENCES."
                variant="word"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight flex justify-center flex-wrap"
                delay={0.8}
              />
            </div>
          </div>
        </motion.div>

        {/* Available for Work + Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
        >
          <div className="text-lg md:text-xl text-white font-medium">
            Available for Work |
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center text-white border-2 border-white shadow-lg transition-all duration-300`}
                style={{ perspective: "1000px" }}
                whileHover={{ 
                  scale: 1.2,
                  rotateY: index % 2 === 0 ? 20 : -20,
                  rotateX: 15,
                  z: 50,
                  boxShadow: "0 20px 30px rgba(0,255,136,0.3)"
                }}
                whileTap={{ scale: 0.9, rotateX: 0, rotateY: 0 }}
              >
                <motion.div whileHover={{ translateZ: 30 }}>
                  {social.icon}
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

