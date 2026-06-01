"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function WelcomeSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollTrackRef, { once: true, margin: "-100px" });

  // Track scroll position of the WelcomeSection container
  // Increased to h-[300vh] to accommodate 3 full states smoothly
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"]
  });

  // ========================================================
  // CARD SET A (State 1: People) - Rotates out to the left
  // ========================================================
  const opacityA = useTransform(scrollYProgress, [0, 0.24, 0.36, 1], [1, 1, 0, 0]);
  const scaleA = useTransform(scrollYProgress, [0, 0.24, 0.36, 1], [1, 1, 0.88, 0.88]);
  const rotateA = useTransform(scrollYProgress, [0, 0.24, 0.36, 1], [0, 0, -8, -8]);
  const pointerEventsA = useTransform(scrollYProgress, (v) => v < 0.30 ? "auto" : "none");

  // ========================================================
  // CARD SET B (State 2: Tasks) - Rotates in from right, then out to left
  // ========================================================
  const opacityB = useTransform(scrollYProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [0, 0, 1, 1, 0, 0]);
  const scaleB = useTransform(scrollYProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [0.88, 0.88, 1, 1, 0.88, 0.88]);
  const rotateB = useTransform(scrollYProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [8, 8, 0, 0, -8, -8]);
  const pointerEventsB = useTransform(scrollYProgress, (v) => (v >= 0.30 && v < 0.64) ? "auto" : "none");

  // ========================================================
  // CARD SET C (State 3: Workflows) - Rotates in from the right
  // ========================================================
  const opacityC = useTransform(scrollYProgress, [0, 0.58, 0.70, 1], [0, 0, 1, 1]);
  const scaleC = useTransform(scrollYProgress, [0, 0.58, 0.70, 1], [0.88, 0.88, 1, 1]);
  const rotateC = useTransform(scrollYProgress, [0, 0.58, 0.70, 1], [8, 8, 0, 0]);
  const pointerEventsC = useTransform(scrollYProgress, (v) => v >= 0.64 ? "auto" : "none");

  // ========================================================
  // TEXT HIGHLIGHT MORPHING (People -> Tasks -> Workflows)
  // ========================================================
  // Word 'people' color & bottom border
  const peopleColor = useTransform(scrollYProgress, [0, 0.24, 0.36, 1], ["#8da2bb", "#8da2bb", "#171717", "#171717"]);
  const peopleBorderColor = useTransform(scrollYProgress, [0, 0.24, 0.36, 1], ["#c2d0e2", "#c2d0e2", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);

  // Word 'tasks' color & bottom border
  const tasksColor = useTransform(scrollYProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], ["#171717", "#171717", "#6b9e78", "#6b9e78", "#171717", "#171717"]);
  const tasksBorderColor = useTransform(scrollYProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#b8dfc4", "#b8dfc4", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);

  // Word 'workflows' color & bottom border
  const workflowsColor = useTransform(scrollYProgress, [0, 0.58, 0.70, 1], ["#171717", "#171717", "#c08e8e", "#c08e8e"]);
  const workflowsBorderColor = useTransform(scrollYProgress, [0, 0.58, 0.70, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#e8c4c4", "#e8c4c4"]);

  return (
    <div ref={scrollTrackRef} className="relative h-[300vh] bg-white">
      {/* Sticky container that locks the view while morphing on scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />

        {/* Main Layout Container */}
        <div className="relative w-full max-w-[1280px] h-screen max-h-[700px] md:h-[580px] mx-auto px-4 flex items-center justify-center">
          
          {/* CENTER TEXT: The persistent headline */}
          <div className="max-w-[290px] sm:max-w-[480px] md:max-w-[760px] text-center z-10 font-sf-pro select-none px-2">
            <h2 className="text-[23px] sm:text-3xl md:text-[40px] leading-[1.35] md:leading-[1.38] font-normal tracking-tight text-neutral-900">
              Huga Studio brings everything together - connecting{" "}
              <motion.span 
                style={{ color: peopleColor, borderColor: peopleBorderColor }} 
                className="border-b pb-0.5 transition-colors duration-300"
              >
                people
              </motion.span>
              ,{" "}
              <motion.span 
                style={{ color: tasksColor, borderColor: tasksBorderColor }} 
                className="border-b pb-0.5 transition-colors duration-300"
              >
                tasks
              </motion.span>{" "}
              and{" "}
              <motion.span 
                style={{ color: workflowsColor, borderColor: workflowsBorderColor }} 
                className="border-b pb-0.5 transition-colors duration-300"
              >
                workflows
              </motion.span>{" "}
              into one clear, flexible workspace.
            </h2>
          </div>

          {/* ========================================================
              STATE 1: PEOPLE CARD SET (Scroll Progress: 0% -> ~30%)
             ======================================================== */}
          <motion.div 
            style={{ 
              opacity: opacityA, 
              scale: scaleA, 
              rotate: rotateA, 
              pointerEvents: pointerEventsA 
            }}
            className="absolute inset-0 z-20 pointer-events-none origin-center"
          >
            {/* Top-Left: Coworker Workspace Image */}
            <div className="absolute top-[18%] -left-[40px] sm:left-[4%] lg:top-[6%] lg:left-[8%] w-[120px] h-[85px] sm:w-[170px] sm:h-[120px] lg:w-[230px] lg:h-[160px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-100">
              <Image
                src="/images/hero/foto-huga.jpg"
                alt="Workspace preview 1"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 120px, 230px"
              />
            </div>

            {/* Top-Right: Member Directory Card */}
            <div className="absolute top-[10%] -right-[60px] sm:right-[2%] lg:top-[4%] lg:right-[6%] w-[200px] sm:w-[240px] lg:w-[280px] bg-white border border-neutral-200/60 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col gap-2 sm:gap-3 lg:gap-4 font-sf-pro">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 h-8 rounded-full bg-neutral-200 relative overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80"
                      alt="Sarah Miller"
                      fill
                      className="object-cover grayscale"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-neutral-800 leading-tight">Sarah Miller</span>
                    <span className="text-[7.5px] sm:text-[8.5px] lg:text-[9px] text-neutral-450 font-light">sarahm@ordina.com</span>
                  </div>
                </div>
                <span className="text-[7.5px] sm:text-[8.5px] lg:text-[9px] font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                  Member
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 h-8 rounded-full bg-neutral-350 relative overflow-hidden shrink-0">
                    <Image
                      src="/images/hero/Huga 3.webp"
                      alt="Jane Hudson"
                      fill
                      className="object-cover object-top grayscale"
                      sizes="32px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-neutral-800 leading-tight">Jane Hudson</span>
                    <span className="text-[7.5px] sm:text-[8.5px] lg:text-[9px] text-neutral-450 font-light">janeh@ordina.com</span>
                  </div>
                </div>
                <span className="text-[7.5px] sm:text-[8.5px] lg:text-[9px] font-bold bg-[#fbf0e3] text-[#cf8736] px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>

              <div className="bg-neutral-50 border border-neutral-100 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full flex items-center justify-between text-[9px] sm:text-[10px] lg:text-[11px] text-neutral-450 mt-0.5">
                <span className="font-light">@sarahmiller</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1b3a57] flex items-center justify-center text-white shrink-0">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current rotate-90" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-Left: 72% Collaboration Card */}
            <div
              className="absolute bottom-[18%] -left-[30px] sm:left-[4%] lg:bottom-[4%] lg:left-[6%] w-[140px] sm:w-[190px] lg:w-[255px] rounded-xl sm:rounded-2xl lg:rounded-[22px] p-3 sm:p-4 lg:p-[22px] shadow-xl border border-white/[0.06] flex flex-col justify-between h-[115px] sm:h-[140px] lg:h-[175px] font-sf-pro text-white"
              style={{ background: "linear-gradient(135deg, #1f2125 0%, #141618 50%, #101214 100%)" }}
            >
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-none tracking-tight text-white">72%</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#6ee67e] mt-1 lg:mt-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              <p className="text-[8px] sm:text-[10px] lg:text-[11.5px] leading-[1.4] sm:leading-[1.5] mt-1.5 sm:mt-3 text-neutral-300">
                Predicted increase in team{" "}
                <span className="text-white font-semibold">collaboration</span>
                <span className="font-normal text-neutral-400"> by end of this quarter</span>
              </p>

              <div className="flex justify-between items-center mt-1.5 sm:mt-3">
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-normal border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-white/80 tracking-[0.01em]">
                  Q4 2025
                </span>
                <div className="w-6 h-6 sm:w-[30px] sm:h-[30px] rounded-full border border-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-[14px] sm:h-[14px] text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-Right: Image with Channels/Announcements overlay */}
            <div className="absolute bottom-[20%] -right-[40px] sm:right-[4%] lg:bottom-[4%] lg:right-[6%] w-[130px] sm:w-[170px] lg:w-[220px] h-[110px] sm:h-[145px] lg:h-[190px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-50">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086f058?w=400&h=400&fit=crop&q=80"
                alt="Workspace preview A2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 130px, 220px"
              />
              <div className="absolute top-[40%] sm:top-[48%] left-[6px] sm:left-[10px] bg-[#1d3b58] text-white pl-2 sm:pl-3.5 pr-2.5 sm:pr-4 py-1 sm:py-2 rounded-[8px] sm:rounded-[12px] text-[7px] sm:text-[9px] lg:text-[10px] font-sf-pro font-medium flex items-center gap-1 sm:gap-2 shadow-md">
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Group Channels</span>
              </div>

              <div className="absolute top-[65%] sm:top-[68%] left-[30px] sm:left-[55px] bg-[#d3fc8e] text-neutral-900 pl-2 sm:pl-3.5 pr-2.5 sm:pr-4 py-1 sm:py-2.5 rounded-[8px] sm:rounded-[12px] text-[7px] sm:text-[9px] lg:text-[10px] font-sf-pro font-bold flex items-center gap-1 sm:gap-2 shadow-md">
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <span>Announcements</span>
              </div>
            </div>

            {/* Bottom-Center: Create with Ordina Pill */}
            <div className="absolute bottom-[6%] sm:bottom-[8%] lg:bottom-[4%] left-1/2 -translate-x-1/2 w-[180px] sm:w-[220px] lg:w-[240px] bg-white border border-neutral-200/80 rounded-full py-2 sm:py-3 pl-4 sm:pl-6 pr-2 sm:pr-3 flex items-center justify-between shadow-sm cursor-pointer z-30">
              <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-medium font-sf-pro text-neutral-450">
                Create with Ordina
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1b3a57] flex items-center justify-center text-white shrink-0">
                <svg className="w-2 sm:w-2.5 sm:h-2.5 fill-current rotate-90" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>


          {/* ========================================================
              STATE 2: TASKS CARD SET (Scroll Progress: ~35% -> ~60%)
             ======================================================== */}
          <motion.div 
            style={{ 
              opacity: opacityB, 
              scale: scaleB, 
              rotate: rotateB, 
              pointerEvents: pointerEventsB 
            }}
            className="absolute inset-0 z-20 pointer-events-none origin-center"
          >
            {/* Top-Left: Two men looking at laptop */}
            <div className="absolute top-[18%] -left-[40px] sm:left-[8%] lg:top-[6%] lg:left-[8%] w-[120px] h-[85px] sm:w-[150px] sm:h-[110px] lg:w-[200px] lg:h-[145px] rounded-2xl lg:rounded-[20px] overflow-hidden shadow-md border border-neutral-100/50 bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop&q=80"
                alt="Two developers working together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 200px"
              />
            </div>

            {/* Top-Right: 847 Tasks Completed Card */}
            <div
              className="absolute top-[10%] -right-[40px] sm:right-[6%] lg:top-[4%] lg:right-[6%] w-[140px] sm:w-[190px] lg:w-[255px] rounded-xl sm:rounded-2xl lg:rounded-[22px] p-3 sm:p-4 lg:p-[22px] shadow-xl border border-white/[0.06] flex flex-col justify-between h-[115px] sm:h-[140px] lg:h-[175px] font-sf-pro text-white"
              style={{ background: "linear-gradient(135deg, #1f2125 0%, #141618 50%, #101214 100%)" }}
            >
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-none tracking-tight text-white">847</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#6ee67e] mt-1 lg:mt-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              
              <p className="text-[8px] sm:text-[10px] lg:text-[11.5px] leading-[1.4] sm:leading-[1.5] mt-1.5 sm:mt-3 text-neutral-300">
                <span className="text-white font-semibold">Tasks completed</span>
                <span className="font-normal text-neutral-400"> across all active workspaces this week</span>
              </p>

              <div className="flex justify-between items-center mt-1.5 sm:mt-3">
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-normal border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-white/80 tracking-[0.01em]">
                  Week #37
                </span>
                <div className="w-6 h-6 sm:w-[30px] sm:h-[30px] rounded-full border border-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-[14px] sm:h-[14px] text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-Left: Ordina AI App Review Card */}
            <div className="absolute bottom-[18%] -left-[20px] sm:left-[6%] lg:bottom-[4%] lg:left-[6%] bg-white border border-neutral-200/70 rounded-xl sm:rounded-2xl px-2.5 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-[0_3px_15px_rgba(0,0,0,0.05)] font-sf-pro w-[130px] sm:w-[175px]">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#1c3251] flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] sm:text-[13px] font-semibold text-neutral-900 leading-none">Ordina AI</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-[1px]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-2 h-2 sm:w-[11px] sm:h-[11px]" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          stroke="#d1d5db"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[8px] sm:text-[11px] font-semibold text-neutral-500 leading-none">4.8</span>
                </div>
              </div>
            </div>

            {/* Bottom-Right: Action Card */}
            <div className="absolute bottom-[20%] -right-[30px] sm:right-[6%] lg:bottom-[4%] lg:right-[6%] w-[150px] sm:w-[220px] lg:w-[270px] bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col gap-1 sm:gap-2 font-sf-pro shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ border: "1.5px dashed #93c5fd" }}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[9px] sm:text-[11px] font-semibold text-neutral-700">Action</span>
              </div>
              <p className="text-[8px] sm:text-[11px] text-neutral-500 font-normal pl-4.5 sm:pl-6 leading-snug">
                1. Send notification to Slack channel
              </p>
            </div>

            {/* Bottom-Center: Ordina AI Workflow Runs Card */}
            <div className="absolute bottom-[4%] sm:bottom-[6%] lg:bottom-[4%] left-1/2 -translate-x-1/2 w-[180px] sm:w-[240px] lg:w-[290px] bg-white rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(27,58,87,0.12)] font-sf-pro z-30" style={{ border: "1.5px solid #1b3a57" }}>
              <div className="bg-[#1b3a57] px-3 py-2 sm:px-5 sm:py-[11px] flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <span className="text-[10px] sm:text-[13px] font-semibold text-white tracking-[0.01em]">Ordina AI</span>
              </div>

              <div className="px-3 py-2.5 sm:px-5 sm:py-4 flex flex-col gap-2 sm:gap-3.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-[9px] sm:text-[11px] font-medium text-neutral-500">Workflow runs</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-xl lg:text-[26px] font-light text-neutral-900 leading-none tracking-tight">1262/2000</span>
                  <span className="text-[8px] sm:text-[10px] font-medium bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded border border-neutral-200">
                    Active
                  </span>
                </div>

                <div className="w-full h-1.5 sm:h-[10px] bg-neutral-100 rounded-full relative flex items-center">
                  <div className="absolute left-0 top-0 h-full w-[62%] bg-[#1b3a57] rounded-l-full" />
                  <div
                    className="absolute h-3 w-3 sm:h-[16px] sm:w-[16px] bg-white rounded-full shadow border border-neutral-300 z-10"
                    style={{ left: "calc(62% - 8px)", top: "50%", transform: "translateY(-50%)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>


          {/* ========================================================
              STATE 3: WORKFLOWS CARD SET (Scroll Progress: ~65% -> 100%)
             ======================================================== */}
          <motion.div 
            style={{ 
              opacity: opacityC, 
              scale: scaleC, 
              rotate: rotateC, 
              pointerEvents: pointerEventsC 
            }}
            className="absolute inset-0 z-20 pointer-events-none origin-center"
          >
            {/* Top-Left: Coworker photo */}
            <div className="absolute top-[18%] -left-[40px] sm:left-[8%] lg:top-[6%] lg:left-[8%] w-[120px] h-[85px] sm:w-[150px] sm:h-[110px] lg:w-[200px] lg:h-[145px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop&q=80"
                alt="Workspace preview C1"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 120px, 200px"
              />
            </div>

            {/* Top-Right: Ordina AI Workflows toggle pill */}
            <div className="absolute top-[10%] -right-[40px] sm:right-[6%] lg:top-[8%] lg:right-[6%] py-2 sm:py-3.5 px-3 sm:px-5 bg-white border border-neutral-200/70 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 sm:gap-3 font-sf-pro">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
              </svg>
              <span className="text-[9px] sm:text-[11px] font-medium text-neutral-700 leading-none whitespace-nowrap">Ordina AI Workflows</span>
              <div className="w-7 h-4 sm:w-9 sm:h-5 bg-emerald-500 rounded-full p-0.5 flex items-center justify-end shadow-inner shrink-0">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>

            {/* Bottom-Left: Dark bar chart card */}
            <div
              className="absolute bottom-[18%] -left-[30px] sm:left-[8%] lg:bottom-[4%] lg:left-[8%] w-[140px] sm:w-[190px] lg:w-[230px] h-[115px] sm:h-[140px] lg:h-[165px] rounded-xl sm:rounded-2xl lg:rounded-[22px] overflow-hidden shadow-xl font-sf-pro text-white"
              style={{ background: "radial-gradient(ellipse at 30% 100%, #2a4a6e 0%, #141e30 55%, #0d1520 100%)" }}
            >
              <div className="absolute top-[15%] left-[45%] bg-[#1a2840] border border-white/10 rounded-lg px-2 py-1 flex flex-col items-start shadow z-10 min-w-[70px] sm:min-w-[90px]">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[13px] font-bold leading-none text-white">40%</span>
                  <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-3 pb-2 sm:px-5 sm:pb-3 h-[70px] sm:h-[95px]">
                <div className="w-5 sm:w-8 h-[20px] sm:h-[30px] rounded-t" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="w-5 sm:w-8 h-[35px] sm:h-[50px] rounded-t" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="w-5 sm:w-8 h-[55px] sm:h-[75px] rounded-t relative" style={{ background: "rgba(255,255,255,0.14)" }}>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow" />
                </div>
                <div className="w-5 sm:w-8 h-[25px] sm:h-[35px] rounded-t" style={{ background: "rgba(255,255,255,0.07)" }} />
              </div>
            </div>

            {/* Bottom-Right: Ordina AI — Setting up automation */}
            <div className="absolute bottom-[20%] -right-[30px] sm:right-[6%] lg:bottom-[4%] lg:right-[6%] w-[150px] sm:w-[220px] lg:w-[270px] bg-white border border-[#1b3a57]/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg flex flex-col font-sf-pro">
              <div className="bg-[#1b3a57] px-3 py-2 flex items-center justify-center gap-1.5 text-white text-[9px] sm:text-[12px] font-bold">
                <span>Ordina AI</span>
              </div>
              
              <div className="px-4 py-4 flex flex-col gap-3.5">
                {/* Row: Icon + Label + Percent */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Lightning bolt / automation icon */}
                    <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-[12px] font-medium text-neutral-700">Setting up automation</span>
                  </div>
                  <span className="text-[12px] font-semibold text-neutral-800">60%</span>
                </div>

                {/* Progress bar — filled navy + white circular handle dot + diagonal stripes */}
                <div className="w-full h-3.5 bg-neutral-100 rounded-full relative overflow-visible flex items-center">
                  {/* Filled portion (navy) */}
                  <div className="absolute left-0 top-0 h-full w-[57%] bg-[#1b3a57] rounded-l-full" />
                  {/* White circular handle dot at 60% */}
                  <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-md border-2 border-[#1b3a57] z-10"
                    style={{ left: "calc(57% - 6px)", top: "50%", transform: "translateY(-50%)" }}
                  />
                  {/* Diagonal stripes after the handle (60% → ~80%) */}
                  <div
                    className="absolute top-0 h-full"
                    style={{
                      left: "60%",
                      width: "20%",
                      background: "repeating-linear-gradient(-45deg, rgba(27,58,87,0.18), rgba(27,58,87,0.18) 2px, rgba(255,255,255,0.0) 2px, rgba(255,255,255,0.0) 5px)",
                      borderRadius: "0 6px 6px 0"
                    }}
                  />
                  {/* Empty portion */}
                  <div className="absolute right-0 top-0 h-full w-[18%] bg-neutral-100 rounded-r-full" />
                </div>
              </div>
            </div>

            {/* Bottom-Center: "Send Message to Channel" pill */}
            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 bg-white border border-neutral-200/80 rounded-full py-3 pl-4 pr-3 flex items-center gap-2.5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] cursor-pointer z-30 whitespace-nowrap">
              {/* Colorful Slack-like dots icon */}
              <div className="w-6 h-6 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-center shrink-0">
                <div className="grid grid-cols-2 gap-[2px]">
                  <div className="w-1.5 h-1.5 rounded-sm bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-sm bg-red-400" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-neutral-600 font-sf-pro">Send Message to Channel</span>
              <div className="w-6 h-6 rounded-full bg-[#1b3a57] flex items-center justify-center text-white shrink-0 ml-1">
                <span className="text-[12px] font-bold leading-none">+</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
