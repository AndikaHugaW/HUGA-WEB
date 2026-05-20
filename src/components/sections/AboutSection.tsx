"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, PenTool, Sparkle, ArrowRight } from "lucide-react";

const expertise = [
  {
    number: "01",
    category: "Website",
    icon: Globe,
    largeIcon: (
      <svg className="w-[300px] h-[300px]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        {/* Browser Window Outline */}
        <rect x="20" y="30" width="160" height="140" rx="10" strokeWidth="0.75" />
        {/* Browser Header Line */}
        <line x1="20" y1="55" x2="180" y2="55" strokeWidth="0.5" />
        {/* Window Controls (Three Dots) */}
        <circle cx="35" cy="42" r="3" strokeWidth="0.5" />
        <circle cx="45" cy="42" r="3" strokeWidth="0.5" />
        <circle cx="55" cy="42" r="3" strokeWidth="0.5" />
        {/* Website Grid Layout inside window */}
        <rect x="32" y="68" width="136" height="32" rx="4" strokeWidth="0.5" strokeDasharray="3 3" />
        <rect x="32" y="110" width="62" height="48" rx="4" strokeWidth="0.5" />
        <rect x="106" y="110" width="62" height="48" rx="4" strokeWidth="0.5" />
      </svg>
    ),
    skills: ["React", "Next.js", "TypeScript", "Node.js"],
    colSpan: "md:col-span-2",
    color: "#A8B3CF",
    bgGlow: "rgba(168, 179, 207, 0.05)",
  },
  {
    number: "02",
    category: "Mobile",
    icon: Smartphone,
    largeIcon: (
      <svg className="w-[240px] h-[240px]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <rect x="50" y="20" width="100" height="160" rx="16" strokeWidth="0.75" />
        <rect x="60" y="35" width="80" height="60" rx="8" strokeWidth="0.5" strokeDasharray="3 3" />
        <circle cx="70" cy="115" r="6" strokeWidth="0.5" />
        <line x1="84" y1="112" x2="135" y2="112" strokeWidth="0.5" />
        <line x1="84" y1="118" x2="120" y2="118" strokeWidth="0.5" />
        <circle cx="70" cy="135" r="6" strokeWidth="0.5" />
        <line x1="84" y1="132" x2="135" y2="132" strokeWidth="0.5" />
        <line x1="84" y1="138" x2="120" y2="138" strokeWidth="0.5" />
        <line x1="90" y1="28" x2="110" y2="28" strokeWidth="0.5" />
      </svg>
    ),
    skills: ["Flutter", "React Native", "Supabase", "Firebase"],
    colSpan: "md:col-span-1",
    color: "#7B61FF",
    bgGlow: "rgba(123, 97, 255, 0.05)",
  },
  {
    number: "03",
    category: "Product",
    icon: PenTool,
    largeIcon: (
      <svg className="w-[260px] h-[260px]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        {/* Coordinate Grid lines */}
        <line x1="20" y1="100" x2="180" y2="100" strokeWidth="0.25" strokeDasharray="4 4" />
        <line x1="100" y1="20" x2="100" y2="180" strokeWidth="0.25" strokeDasharray="4 4" />
        {/* Golden Ratio Proportions */}
        <circle cx="100" cy="100" r="70" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="43" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="26" strokeWidth="0.5" />
        {/* Bezier Vector Curve */}
        <path d="M40 130 C 60 70, 140 70, 160 130" strokeWidth="0.75" />
        {/* Anchor point 1 */}
        <rect x="37" y="127" width="6" height="6" fill="currentColor" strokeWidth="0.5" />
        {/* Anchor point 2 (Apex) */}
        <rect x="97" y="77" width="6" height="6" fill="currentColor" strokeWidth="0.5" />
        {/* Handle lines */}
        <line x1="100" y1="80" x2="60" y2="80" strokeWidth="0.5" />
        <line x1="100" y1="80" x2="140" y2="80" strokeWidth="0.5" />
        {/* Handle Dots */}
        <circle cx="60" cy="80" r="3" fill="currentColor" />
        <circle cx="140" cy="80" r="3" fill="currentColor" />
      </svg>
    ),
    skills: ["UI/UX", "Design Systems", "Logo Design", "Brand Identity"],
    colSpan: "md:col-span-1",
    color: "#00C2FF",
    bgGlow: "rgba(0, 194, 255, 0.05)",
  },
  {
    number: "04",
    category: "AI Integrations",
    icon: Sparkle,
    largeIcon: (
      <svg className="w-[300px] h-[300px]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="50" cy="150" r="3" fill="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="4" fill="currentColor" strokeWidth="0.5" />
        <circle cx="150" cy="50" r="3" fill="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="70" r="3" fill="currentColor" strokeWidth="0.5" />
        <circle cx="140" cy="130" r="3" fill="currentColor" strokeWidth="0.5" />
        <line x1="50" y1="150" x2="100" y2="100" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="150" y2="50" strokeWidth="0.5" />
        <line x1="60" y1="70" x2="100" y2="100" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="140" y2="130" strokeWidth="0.5" />
        <line x1="60" y1="70" x2="150" y2="50" strokeWidth="0.25" strokeDasharray="2 2" />
        <line x1="50" y1="150" x2="140" y2="130" strokeWidth="0.25" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="20" strokeWidth="0.5" strokeDasharray="4 2" />
        <circle cx="100" cy="100" r="40" strokeWidth="0.25" strokeDasharray="2 4" />
      </svg>
    ),
    skills: ["LLMs", "RAG", "Agentic Systems"],
    colSpan: "md:col-span-2",
    color: "#00FF88",
    bgGlow: "rgba(0, 255, 136, 0.05)",
  },
];

const metrics = [
  { value: "4+", label: "Years Experience" },
  { value: "50+", label: "Deployed Projects" },
  { value: "12+", label: "Clients" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 bg-[#05050A] overflow-hidden">
      
      {/* Section Transition & Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      
      {/* Subtle Masked Noise Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)" }}>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay"></div>
      </div>
        
      {/* Massive Ambient Gradient Fog */}
      <div className="absolute top-[10%] left-[-10%] w-[60%] h-[800px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.06),transparent_60%)] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[800px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.05),transparent_60%)] blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* ONE Signature Visual (Holographic Orb behind text) */}
        <div className="absolute top-[15%] left-[-5%] w-[600px] h-[600px] opacity-[0.2] blur-[80px] pointer-events-none mix-blend-screen animate-[spin_30s_linear_infinite]" 
             style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(123,97,255,0) 0%, rgba(123,97,255,0.3) 20%, rgba(0,255,136,0.4) 40%, rgba(0,255,136,0.3) 60%, rgba(123,97,255,0) 80%)' }}>
        </div>
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] opacity-[0.15] blur-[60px] pointer-events-none mix-blend-screen animate-[spin_40s_linear_infinite_reverse]" 
             style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,255,136,0.4), transparent 60%)' }}>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24 relative">
          
          {/* LEFT COLUMN: About Presentation */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Label & Status Badge */}
              <div className="flex items-center gap-6 mb-10 font-sf-pro">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-[1px] bg-white/20"></span>
                  <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Identity</span>
                </div>
                
                {/* Available for Work Status Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 text-[9px] font-medium tracking-wider uppercase">Available for work</span>
                </div>
              </div>
              
              {/* Cinematic Headline */}
              <h2 className={`text-5xl md:text-6xl lg:text-[4rem] font-medium text-white tracking-tight leading-[1.05] mb-10 font-nippo`}>
                Building Intelligent <br />
                <span className="text-transparent italic font-light" style={{ WebkitTextStroke: "1px rgba(0, 255, 136, 0.3)" }}>Digital Systems.</span>
              </h2>

              {/* Modern Intro Paragraph (Luxury Typography) */}
              <p className={`text-white/50 text-lg font-light leading-[1.8] tracking-[0.02em] mb-14 max-w-lg font-sf-pro`}>
                I craft <span className="text-white font-medium">high-end digital experiences</span> by merging advanced engineering with premium design, building scalable systems that elevate brands.
              </p>

              {/* Metrics / Achievements */}
              <div className="flex items-center gap-12 mb-16">
                {metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className={`text-3xl font-medium text-white/90 font-nippo`}>{metric.value}</span>
                    <span className={`text-[10px] text-white/40 uppercase tracking-[0.2em] font-sf-pro`}>{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Minimal Glass CTA */}
              <button className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-max">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-full border border-transparent [background:linear-gradient(rgba(5,5,10,1),rgba(5,5,10,1))_padding-box,linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.3),rgba(255,255,255,0.1))_border-box] opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Hover Glow / Glass Reflection */}
                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.04] transition-colors duration-700"></div>
                
                <span className={`relative z-10 text-white/70 font-light tracking-wide text-sm transition-colors duration-500 group-hover:text-white font-sf-pro`}>View Selected Projects</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white/40 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Expertise Bento Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expertise.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#11111d] to-[#07070d] border border-white/[0.04] hover:border-[var(--border-glow)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_30px_var(--glow-color),0_20px_40px_-15px_rgba(0,0,0,0.8)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col justify-between ${item.colSpan}`}
                    style={{
                      boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 40px -15px rgba(0,0,0,0.8)",
                      "--glow-color": "rgba(0, 255, 136, 0.15)",
                      "--border-glow": "rgba(0, 255, 136, 0.25)",
                    } as React.CSSProperties}
                  >
                    {/* Ambient Radial Gradient Background inside Card */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none mix-blend-screen"
                      style={{ background: `radial-gradient(circle at top left, ${item.bgGlow}, transparent 70%)` }}
                    ></div>

                    {/* Technical Blueprints / Signature Visuals with Soft Gradient Mask */}
                    <div 
                      className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-1000 group-hover:scale-105 pointer-events-none mix-blend-plus-lighter text-white group-hover:text-[#00FF88]"
                      style={{
                        maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 75%)",
                      }}
                    >
                      {item.largeIcon}
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 p-8 flex-1 flex flex-col justify-between min-h-[280px] gap-8">
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        <span className={`text-white/20 text-sm font-light font-sf-pro`}>
                          {item.number}
                        </span>
                        <div className="text-white/30 group-hover:text-[#00FF88] transition-colors duration-500">
                          <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Bottom Section - Text & Pills */}
                      <div className="flex flex-col gap-5">
                        <h3 className={`text-xl font-medium text-white/80 group-hover:text-[#00FF88] transition-colors duration-500 font-nippo`}>
                          {item.category}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 rounded-full text-[10px] text-white/45 bg-white/[0.02] border border-white/[0.04] group-hover:text-[#00FF88]/80 group-hover:border-[#00FF88]/20 hover:!text-[#00FF88] hover:!border-[#00FF88]/50 transition-all duration-500 backdrop-blur-md cursor-default font-sf-pro`}
                              style={{ boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.02)" }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}