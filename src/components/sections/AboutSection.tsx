"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: "04", text: "Years Building Digital Products" },
    { value: "50+", text: "Projects Shipped & Delivered" },
    { value: "12", text: "Long-Term Client Partnerships" },
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 bg-white overflow-hidden text-neutral-900">
      {/* Editorial top divider */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-[1px] bg-neutral-200 mb-16" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* LEFT SIDE (40%): Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Category Label */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">About Me</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
              </div>

              {/* Sophisticated Editorial Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-neutral-900 tracking-tight leading-[1.1] font-sf-pro">
                Designing systems that scale, code that endures.
              </h2>

              {/* Personal Human Storytelling */}
              <div className="space-y-6 text-neutral-500 font-sf-pro text-base leading-relaxed max-w-[480px]">
                <p>
                  Hi, I’m <span className="text-neutral-900 font-medium">Andika Huga</span>. I build digital systems at the intersection of engineering rigor and design simplicity. Over the last four years, I have worked with founders and digital product teams to translate complex business requirements into high-performance web systems and intuitive user interfaces.
                </p>
                <p>
                  My philosophy is simple: strip away the unnecessary noise. I believe a premium product is defined by clean typography, robust architecture, and flawless responsiveness.
                </p>
              </div>

              {/* Trusted by Founders / Partner Grayscale List */}
              <div className="flex items-center gap-4 py-4 border-t border-neutral-100 max-w-[480px]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale border border-neutral-200 bg-neutral-100 flex-shrink-0">
                  <Image 
                    src="/images/hero/Huga.webp" 
                    alt="Andika Huga" 
                    fill 
                    className="object-cover" 
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-sf-pro">Trusted by founders at</p>
                  <p className="text-xs font-semibold text-neutral-800 font-sf-pro mt-0.5">Fintech • SaaS • Web Systems • E-Commerce</p>
                </div>
              </div>

              {/* Refined Editorial Statistics */}
              <div className="grid grid-cols-1 gap-4 py-6 border-y border-neutral-100 max-w-[480px] text-sm text-neutral-600 font-sf-pro">
                {metrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="font-bold text-neutral-950 w-10 text-lg">{metric.value}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                    <span className="font-medium text-neutral-500">{metric.text}</span>
                  </div>
                ))}
              </div>

              {/* Handcrafted Border Button */}
              <button 
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 border border-neutral-300 hover:border-neutral-900 bg-transparent hover:bg-neutral-50 cursor-pointer w-max font-sf-pro text-xs font-semibold text-neutral-800"
              >
                <span>Browse Shipped Work</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 transition-colors duration-300" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE (60%): Curated Showcase Grid */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. LARGE CARD: Experience & Expertise Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-neutral-50 rounded-[20px] border border-neutral-200/80 p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]"
            >
              <div className="flex justify-between items-start mb-8 border-b border-neutral-200/50 pb-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 font-sf-pro">Experience & Focus</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-sf-pro">Selected roles & core technical competencies</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#0066ff] bg-[#0066ff]/10 px-2.5 py-1 rounded font-sf-pro">
                  Active
                </span>
              </div>

              {/* Timeline Rows with Vertical Line & Anchors */}
              <div className="relative pl-6 border-l border-neutral-200/80 ml-2 space-y-8">
                {/* Job 1 */}
                <div className="relative">
                  <span className="absolute -left-[29.5px] top-1.5 w-2 h-2 rounded-full bg-[#0066ff] border-2 border-white shadow-[0_0_0_4px_rgba(0,102,255,0.15)]" />
                  <div className="flex justify-between items-start md:items-baseline gap-4">
                    <h4 className="text-sm font-semibold text-neutral-950 font-sf-pro">Founder & Lead Developer</h4>
                    <span className="text-[10px] font-semibold text-neutral-400 font-sf-pro flex-shrink-0">2023 — Present</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-sf-pro mt-1 leading-relaxed">
                    Huga Studio • Architecting modern web ecosystems, database schema designs, and high-fidelity user experiences.
                  </p>
                </div>

                {/* Job 2 */}
                <div className="relative">
                  <span className="absolute -left-[29.5px] top-1.5 w-2 h-2 rounded-full bg-neutral-300 border-2 border-white" />
                  <div className="flex justify-between items-start md:items-baseline gap-4">
                    <h4 className="text-sm font-semibold text-neutral-950 font-sf-pro">Contract Full-Stack Developer</h4>
                    <span className="text-[10px] font-semibold text-neutral-400 font-sf-pro flex-shrink-0">2021 — 2023</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-sf-pro mt-1 leading-relaxed">
                    Freelance & Contract • Delivered robust custom SaaS integrations, e-commerce applications, and secure dashboard solutions.
                  </p>
                </div>
              </div>

              {/* Concrete Competencies */}
              <div className="mt-8 pt-8 border-t border-neutral-200/50">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 font-sf-pro">Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React & Next.js Systems",
                    "Database Optimization",
                    "Meticulous Interface Implementation",
                    "API Integration Architecture",
                    "State Machine Design",
                  ].map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs text-neutral-600 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg font-medium font-sf-pro shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* TWO SMALL CARDS (Side by side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 2. SMALL CARD LEFT: Technical Stack Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-neutral-50 rounded-[20px] border border-neutral-200/80 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-neutral-950 font-sf-pro mb-1">Architecture & Tech Stack</h3>
                  <p className="text-xs text-neutral-400 mb-6 font-sf-pro">Structured core capabilities</p>
                  
                  {/* Clean Structured Competency View */}
                  <div className="space-y-4 font-sf-pro">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Frontend</span>
                      <p className="text-xs font-semibold text-neutral-800">Next.js • React • TypeScript • Tailwind CSS</p>
                    </div>
                    <div className="h-[1px] bg-neutral-200/50" />
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Backend & Data</span>
                      <p className="text-xs font-semibold text-neutral-800">Node.js • Express • PostgreSQL • Supabase</p>
                    </div>
                    <div className="h-[1px] bg-neutral-200/50" />
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Infrastructure</span>
                      <p className="text-xs font-semibold text-neutral-800">Vercel • Docker • AWS • GitHub Actions</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. SMALL CARD RIGHT: Design Ethos Wireframe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-neutral-50 rounded-[20px] border border-neutral-200/80 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-neutral-950 font-sf-pro mb-1">Grid & Alignment Ethos</h3>
                  <p className="text-xs text-neutral-400 mb-6 font-sf-pro">Architectural typography structure</p>
                  
                  {/* Minimalistic visual geometry showing grid layout details */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-4 h-[142px] flex flex-col justify-between shadow-sm">
                    <div className="flex gap-2">
                      <span className="h-2 w-8 bg-neutral-100 rounded-sm" />
                      <span className="h-2 w-16 bg-neutral-200/70 rounded-sm" />
                    </div>
                    <div className="h-[1px] bg-neutral-100 w-full" />
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full border border-neutral-200 flex items-center justify-center text-[8px] font-bold text-[#0066ff]">H</span>
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 bg-neutral-100 w-2/3 rounded-sm" />
                        <div className="h-1 bg-neutral-100/50 w-full rounded-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* 4. BOTTOM CARD: Premium Testimonial Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-neutral-50 rounded-[20px] border border-neutral-200/80 p-10 md:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] text-center space-y-6"
            >
              <blockquote className="text-lg md:text-xl font-medium tracking-tight text-neutral-800 leading-relaxed max-w-2xl mx-auto font-sf-pro">
                “Working with Andika was one of the best technical decisions we made.”
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-neutral-900 font-sf-pro">Product Director</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold font-sf-pro">SaaS App Platform</span>
                <span className="text-[10px] font-bold text-[#0066ff] font-sf-pro tracking-wide mt-2">
                  Verified Client
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}