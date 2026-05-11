"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import Image from "next/image";
import { projects, type Project } from "@/constants/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bypass Lenis & Handle Scroll
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    if (isOpen) {
      lenis?.stop();
      overlay.addEventListener("wheel", handleWheel, { passive: true });
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!mounted || !project) return null;

  // Filter recommendations (other projects)
  const recommendations = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Scrollable Overlay Container */}
          <div
            ref={overlayRef}
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full h-full overflow-y-auto scrollbar-hide py-0 md:py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            {/* Inner Content Container */}
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[1440px] mx-auto bg-[#0a0a0a] min-h-screen md:min-h-0 md:rounded-3xl overflow-hidden shadow-2xl border border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── STICKY TOP BAR ── */}
              <div className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#00ff88] to-[#00cc6a] p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                      <Image 
                        src="/images/hero/foto-huga.jpg" 
                        alt="Author" 
                        width={40} 
                        height={40} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">Andika Huga W.</h4>
                    <p className="text-[#00ff88] text-[11px] font-bold uppercase tracking-widest">Available for work</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className={`h-10 px-5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                      isSaved 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`h-10 px-5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                      isLiked 
                        ? "bg-[#ea4c89] text-white shadow-[0_0_20px_rgba(234,76,137,0.4)]" 
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <motion.svg 
                      animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                      width="16" height="16" viewBox="0 0 24 24" 
                      fill={isLiked ? "currentColor" : "none"} 
                      stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </motion.svg>
                    <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all ml-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              {/* ── HERO IMAGE ── */}
              <div className="w-full px-6 md:px-10 pt-8">
                <div className="w-full overflow-hidden rounded-2xl bg-[#111] ring-1 ring-white/[0.06]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1440}
                    height={810}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* ── PROJECT TITLE ── */}
              <div className="px-6 md:px-10 pt-12 pb-8">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-[11px] font-bold uppercase tracking-widest rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── TWO COLUMN BODY ── */}
              <div className="px-6 md:px-10 pb-20 grid lg:grid-cols-12 gap-12 lg:gap-20 border-t border-white/[0.06] pt-12">
                <div className="lg:col-span-8 space-y-6">
                  <p className="text-xl text-white/80 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="pt-8 space-y-8 text-white/60 leading-relaxed">
                    <p>
                      This project represents a deep dive into modern user experience patterns, 
                      blending high-performance technology with an uncompromising aesthetic. 
                      Every interaction was designed to feel natural and intuitive, reducing 
                      friction while maximizing user engagement.
                    </p>
                    <p>
                      The technical architecture focuses on scalability and accessibility, 
                      ensuring that the platform performs flawlessly across all devices 
                      and network conditions.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Client</span>
                      <p className="text-white font-bold">Huga Studio Inc.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Role</span>
                      <p className="text-white font-bold">Full Stack Developer & UI Designer</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Year</span>
                      <p className="text-white font-bold">2024</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Tools</span>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {["React", "Next.js", "Framer", "Tailwind"].map(tool => (
                          <span key={tool} className="text-[11px] font-bold text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-white text-black font-black rounded-xl hover:bg-[#00ff88] transition-colors duration-300"
                  >
                    View Live Site
                  </a>
                </div>
              </div>

              {/* ── RECOMMENDATIONS SECTION ── */}
              <div className="px-6 md:px-10 py-20 bg-white/[0.02] border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-white">More Projects</h3>
                  <div className="h-px flex-1 mx-8 bg-white/[0.06] hidden md:block" />
                  <p className="text-[#00ff88] text-[11px] font-bold uppercase tracking-widest">Recommended for you</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="group cursor-pointer flex flex-col"
                      onClick={() => {
                        overlayRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                        // We need to change the project. Since it's passed via prop, 
                        // the parent should handle this. For now, we scroll to top.
                      }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-[#111]">
                        <Image
                          src={rec.image}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm">View Work</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">{rec.title}</h4>
                      <p className="text-white/40 text-sm mt-1">{rec.tags[0]} • {rec.tags[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
