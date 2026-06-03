"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { GridBackground } from "@/components/ui/GridBackground";
import { CountUp } from "@/components/ui/CountUp";

export default function WelcomeSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollTrackRef, { once: true, margin: "-100px" });

  // Track scroll position of the WelcomeSection container
  // Increased to h-[300vh] to accommodate 3 full states smoothly
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress using a spring physics damping animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 90,
    mass: 0.15,
    restDelta: 0.001
  });

  const [activeState, setActiveState] = useState<"A" | "B" | "C">("A");

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (v < 0.30) {
        setActiveState("A");
      } else if (v >= 0.30 && v < 0.64) {
        setActiveState("B");
      } else {
        setActiveState("C");
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // ========================================================
  // CARD SET A (State 1: People) - Rotates out to the left
  // ========================================================
  const opacityA = useTransform(smoothProgress, [0, 0.24, 0.36, 1], [1, 1, 0, 0]);
  const scaleA = useTransform(smoothProgress, [0, 0.24, 0.36, 1], [1, 1, 0.88, 0.88]);
  const rotateA = useTransform(smoothProgress, [0, 0.24, 0.36, 1], [0, 0, -8, -8]);
  const pointerEventsA = useTransform(smoothProgress, (v) => v < 0.30 ? "auto" : "none");

  // ========================================================
  // CARD SET B (State 2: Tasks) - Rotates in from right, then out to left
  // ========================================================
  const opacityB = useTransform(smoothProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [0, 0, 1, 1, 0, 0]);
  const scaleB = useTransform(smoothProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [0.88, 0.88, 1, 1, 0.88, 0.88]);
  const rotateB = useTransform(smoothProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], [8, 8, 0, 0, -8, -8]);
  const pointerEventsB = useTransform(smoothProgress, (v) => (v >= 0.30 && v < 0.64) ? "auto" : "none");

  // ========================================================
  // CARD SET C (State 3: Workflows) - Rotates in from the right
  // ========================================================
  const opacityC = useTransform(smoothProgress, [0, 0.58, 0.70, 1], [0, 0, 1, 1]);
  const scaleC = useTransform(smoothProgress, [0, 0.58, 0.70, 1], [0.88, 0.88, 1, 1]);
  const rotateC = useTransform(smoothProgress, [0, 0.58, 0.70, 1], [8, 8, 0, 0]);
  const pointerEventsC = useTransform(smoothProgress, (v) => v >= 0.64 ? "auto" : "none");

  // ========================================================
  // TEXT HIGHLIGHT MORPHING (People -> Tasks -> Workflows)
  // ========================================================
  // Word 'people' color & bottom border
  const peopleColor = useTransform(smoothProgress, [0, 0.24, 0.36, 1], ["#8da2bb", "#8da2bb", "#171717", "#171717"]);
  const peopleBorderColor = useTransform(smoothProgress, [0, 0.24, 0.36, 1], ["#c2d0e2", "#c2d0e2", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);

  // Word 'tasks' color & bottom border
  const tasksColor = useTransform(smoothProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], ["#171717", "#171717", "#6b9e78", "#6b9e78", "#171717", "#171717"]);
  const tasksBorderColor = useTransform(smoothProgress, [0, 0.24, 0.36, 0.58, 0.70, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#b8dfc4", "#b8dfc4", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);

  // Word 'workflows' color & bottom border
  const workflowsColor = useTransform(smoothProgress, [0, 0.58, 0.70, 1], ["#171717", "#171717", "#c08e8e", "#c08e8e"]);
  const workflowsBorderColor = useTransform(smoothProgress, [0, 0.58, 0.70, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#e8c4c4", "#e8c4c4"]);

  return (
    <div ref={scrollTrackRef} className="relative h-[300vh] bg-white">
      {/* Sticky container that locks the view while morphing on scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Grid — matches TestimonialsSection */}
        <GridBackground
          className="opacity-40"
          dotColor="rgba(0, 0, 0, 0.05)"
          size={20}
        />

        {/* Main Layout Container */}
        <div className="relative w-full max-w-[1280px] h-screen max-h-[700px] md:h-[660px] mx-auto px-4 flex items-center justify-center">
          
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
            <div className="absolute top-[18%] left-[8%] sm:top-[18%] sm:left-[4%] lg:top-[6%] lg:left-[8%] w-[135px] h-[95px] sm:w-[170px] sm:h-[120px] lg:w-[230px] lg:h-[160px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-100">
              <Image
                src="/images/hero/foto-huga.jpg"
                alt="Workspace preview 1"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 135px, 230px"
              />
            </div>

            {/* Top-Right: Member Directory Card */}
            <div className="absolute top-[12%] right-[8%] sm:right-[2%] lg:top-[4%] lg:right-[5%] w-[185px] sm:w-[268px] lg:w-[310px] bg-white border border-neutral-200/70 rounded-[18px] lg:rounded-[22px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.07)] font-sf-pro">

              {/* Row 1: Sarah Miller */}
              <div className="flex items-center justify-between px-2.5 sm:px-5 py-2 sm:py-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Avatar */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-200 relative overflow-hidden shrink-0 ring-[1.5px] ring-neutral-100">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80"
                      alt="Sarah Miller"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] sm:text-[13px] font-semibold text-neutral-900 leading-none">Sarah Miller</span>
                    <span className="text-[9px] sm:text-[11px] text-neutral-400 font-normal leading-none">sarahm@ordina.com</span>
                  </div>
                </div>
                {/* Member badge */}
                <span className="text-[9px] sm:text-[10.5px] font-medium bg-[#e8f5ec] text-[#3d9e5a] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
                  Member
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-100 mx-3.5 sm:mx-5" />

              {/* Row 2: Jane Hudson */}
              <div className="flex items-center justify-between px-2.5 sm:px-5 py-2 sm:py-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Avatar */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-200 relative overflow-hidden shrink-0 ring-[1.5px] ring-neutral-100">
                    <Image
                      src="/images/hero/Huga 3.webp"
                      alt="Jane Hudson"
                      fill
                      className="object-cover object-top"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] sm:text-[13px] font-semibold text-neutral-900 leading-none">Jane Hudson</span>
                    <span className="text-[9px] sm:text-[11px] text-neutral-400 font-normal leading-none">janeh@ordina.com</span>
                  </div>
                </div>
                {/* Admin badge */}
                <span className="text-[9px] sm:text-[10.5px] font-medium bg-[#fef3e2] text-[#c47d1a] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
                  Admin
                </span>
              </div>

              {/* Input field: @sar|ahmiller */}
              <div className="px-2.5 sm:px-5 pb-2.5 sm:pb-4 pt-0.5">
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center text-[10px] sm:text-[12px] leading-none">
                    <span className="text-neutral-800 font-normal">@sar</span>
                    {/* Blinking cursor */}
                    <span className="inline-block w-[1.5px] h-[12px] sm:h-[14px] bg-neutral-800 mx-[1px] animate-pulse" />
                    <span className="text-neutral-300 font-normal">ahmiller</span>
                  </div>
                  {/* Send button */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b3a57] flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-Left: 72% Collaboration Card */}
            <div
              className="absolute bottom-[21%] left-[8%] sm:left-[4%] lg:bottom-[4%] lg:left-[6%] w-[130px] sm:w-[190px] lg:w-[255px] rounded-xl sm:rounded-2xl lg:rounded-[22px] p-2.5 sm:p-4 lg:p-[22px] shadow-xl border border-white/[0.06] flex flex-col justify-between h-[105px] sm:h-[140px] lg:h-[175px] font-sf-pro text-white"
              style={{ background: "linear-gradient(135deg, #1f2125 0%, #141618 50%, #101214 100%)" }}
            >
              <div className="flex items-start gap-1">
                <span className="text-[24px] sm:text-[36px] lg:text-[44px] font-light leading-none tracking-tight text-white"><CountUp trigger={activeState === "A"}>72%</CountUp></span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#6ee67e] mt-0.5 lg:mt-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              <p className="text-[7.5px] sm:text-[10px] lg:text-[11.5px] leading-[1.3] sm:leading-[1.5] mt-1 sm:mt-3 text-neutral-300">
                Predicted increase in team{" "}
                <span className="text-white font-semibold">collaboration</span>
                <span className="font-normal text-neutral-400"> by end of this quarter</span>
              </p>

              <div className="flex justify-between items-center mt-1 sm:mt-3">
                <span className="text-[7.5px] sm:text-[9px] lg:text-[10px] font-normal border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-white/80 tracking-[0.01em]">
                  Q4 2025
                </span>
                <div className="w-5 h-5 sm:w-[30px] sm:h-[30px] rounded-full border border-white/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-[14px] sm:h-[14px] text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-Right: Image with Channels/Announcements overlay */}
            <div className="absolute bottom-[21%] right-[8%] sm:right-[4%] lg:bottom-[4%] lg:right-[6%] w-[120px] sm:w-[170px] lg:w-[220px] h-[120px] sm:h-[170px] lg:h-[220px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-50">
              <Image
                src="/images/hero/coworkers_talking.png"
                alt="Workspace preview A2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 220px"
              />
              <div className="absolute top-[40%] left-[6px] sm:left-[12px] bg-[#1b3a57] text-white pl-1.5 pr-2 py-1 sm:pl-3.5 sm:pr-4 sm:py-2.5 rounded-[8px] sm:rounded-[14px] text-[6.5px] sm:text-[9.5px] lg:text-[11px] font-sf-pro font-medium flex items-center gap-1 sm:gap-2 shadow-md">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v7a3 3 0 0 0 3 3h1l1 3 3-3h5a4 4 0 0 0 4-4Z" />
                  <path d="M23 11v6a3 3 0 0 1-3 3h-1l-3 3-1-3h-2" />
                </svg>
                <span>Group Channels</span>
              </div>

              <div className="absolute top-[70%] left-[20px] sm:left-[45px] bg-[#d3fc8e] text-neutral-900 pl-1.5 pr-2 py-1 sm:pl-3.5 sm:pr-4 sm:py-2.5 rounded-[8px] sm:rounded-[14px] text-[6.5px] sm:text-[9.5px] lg:text-[11px] font-sf-pro font-bold flex items-center gap-1 sm:gap-2 shadow-md">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 13v-2z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
                <span>Announcements</span>
              </div>
            </div>

            {/* Bottom-Center: Create with Ordina Pill */}
            <div className="absolute bottom-[4%] sm:bottom-[2%] lg:bottom-[1.5%] left-1/2 -translate-x-1/2 w-[160px] sm:w-[220px] lg:w-[250px] bg-white border border-neutral-200/80 rounded-[20px] sm:rounded-[24px] py-2 sm:py-2.5 pl-4 sm:pl-6 pr-2 sm:pr-2.5 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer z-30">
              <span className="text-[10px] sm:text-[11.5px] lg:text-[13px] font-normal font-sf-pro text-neutral-800 tracking-tight">
                Create with Ordina
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1b3a57] flex items-center justify-center text-white shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
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
            <div className="absolute top-[18%] left-[8%] sm:top-[18%] sm:left-[8%] lg:top-[6%] lg:left-[8%] w-[135px] h-[95px] sm:w-[150px] sm:h-[110px] lg:w-[200px] lg:h-[145px] rounded-2xl lg:rounded-[20px] overflow-hidden shadow-md border border-neutral-100/50 bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop&q=80"
                alt="Two developers working together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 135px, 200px"
              />
            </div>

            {/* Top-Right: 847 Tasks Completed Card */}
            <div
              className="absolute top-[12%] right-[8%] sm:right-[6%] lg:top-[4%] lg:right-[6%] w-[130px] sm:w-[190px] lg:w-[255px] rounded-xl sm:rounded-2xl lg:rounded-[22px] p-2.5 sm:p-4 lg:p-[22px] shadow-xl border border-white/[0.06] flex flex-col justify-between h-[105px] sm:h-[140px] lg:h-[175px] font-sf-pro text-white"
              style={{ background: "linear-gradient(135deg, #1f2125 0%, #141618 50%, #101214 100%)" }}
            >
              <div className="flex items-start gap-1">
                <span className="text-[24px] sm:text-[36px] lg:text-[44px] font-light leading-none tracking-tight text-white"><CountUp trigger={activeState === "B"}>847</CountUp></span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#6ee67e] mt-0.5 lg:mt-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              
              <p className="text-[7.5px] sm:text-[10px] lg:text-[11.5px] leading-[1.3] sm:leading-[1.5] mt-1 sm:mt-3 text-neutral-300">
                <span className="text-white font-semibold">Tasks completed</span>
                <span className="font-normal text-neutral-400"> across all active workspaces this week</span>
              </p>

              <div className="flex justify-between items-center mt-1 sm:mt-3">
                <span className="text-[7.5px] sm:text-[9px] lg:text-[10px] font-normal border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-white/80 tracking-[0.01em]">
                  Week #37
                </span>
                <div className="w-5 h-5 sm:w-[30px] sm:h-[30px] rounded-full border border-white/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-[14px] sm:h-[14px] text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-Left: Ordina AI App Review Card */}
            <div className="absolute bottom-[21%] left-[8%] sm:left-[5%] lg:bottom-[4%] lg:left-[5%] bg-white border border-neutral-200/60 rounded-[16px] sm:rounded-[18px] p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] font-sf-pro w-[135px] sm:w-[205px] lg:w-[230px]">
              {/* Icon box — navy, arrow icon */}
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[12px] bg-[#1b3a57] flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-[10px] sm:text-[14px] font-semibold text-neutral-900 leading-none">Ordina AI</span>
                <div className="flex items-center gap-1">
                  {/* 5 empty stars */}
                  <div className="flex gap-[1px] sm:gap-[3px]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px]" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          stroke="#d1d5db"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[8px] sm:text-[12px] font-medium text-neutral-400 leading-none"><CountUp trigger={activeState === "B"}>4.8</CountUp></span>
                </div>
              </div>
            </div>

            {/* Bottom-Right: Action Card */}
            <div className="absolute bottom-[21%] right-[8%] sm:right-[6%] lg:bottom-[4%] lg:right-[6%] w-[130px] sm:w-[220px] lg:w-[270px] bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 flex flex-col gap-1 sm:gap-2 font-sf-pro shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ border: "1.5px dashed #93c5fd" }}>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[11px] font-semibold text-neutral-700">Action</span>
              </div>
              <p className="text-[7.5px] sm:text-[11px] text-neutral-500 font-normal pl-4 sm:pl-6 leading-snug">
                1. Send notification to Slack channel
              </p>
            </div>

            {/* Bottom-Center: Ordina AI Workflow Runs Card */}
            <div className="absolute bottom-[3%] sm:bottom-[1.5%] lg:bottom-[1%] left-1/2 -translate-x-1/2 w-[190px] sm:w-[290px] lg:w-[340px] bg-[#1b3a57] rounded-[18px] sm:rounded-[20px] p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(27,58,87,0.18)] font-sf-pro z-30">

              {/* Header: icon + Ordina AI label */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-1.5 sm:pt-2 pb-2 sm:pb-2.5">
                {/* Arrow icon — bold, white */}
                <div className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-[6px] bg-white/[0.15] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-white tracking-[0.01em]">Ordina AI</span>
              </div>

              {/* White inset card */}
              <div className="bg-white rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col gap-2 sm:gap-2.5">

                {/* Row 1: Lightning chip + label */}
                <div className="flex items-center gap-2.5">
                  {/* Lightning icon chip */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] bg-[#f0f2f5] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1b3a57]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-medium text-neutral-600 leading-tight">Workflow runs this month</span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-neutral-100" />

                {/* Row 2: Number + Active badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[22px] sm:text-[26px] lg:text-[30px] font-light text-neutral-800 leading-none tracking-tight"><CountUp trigger={activeState === "B"}>1262</CountUp>/<CountUp trigger={activeState === "B"}>2000</CountUp></span>
                  <span className="text-[9px] sm:text-[10px] font-medium bg-neutral-100 text-neutral-500 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] shrink-0">
                    Active
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full relative" style={{ height: "12px" }}>
                  {/* Track background */}
                  <div className="absolute inset-0 bg-[#f0f2f5] rounded-full" />

                  {/* Filled navy portion */}
                  <div className="absolute left-0 top-0 h-full rounded-full bg-[#1b3a57]" style={{ width: "60%" }} />

                  {/* Dot trail in empty section (right side of knob) */}
                  <div
                    className="absolute top-0 h-full flex items-center"
                    style={{ left: "calc(60% + 10px)", right: "6px" }}
                  >
                    <div className="w-full flex justify-between items-center">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[3.5px] h-[3.5px] rounded-full bg-[#c8d0d8]" />
                      ))}
                    </div>
                  </div>

                  {/* Knob — white circle, navy border, at 60% */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full border-[2.5px] border-[#1b3a57] shadow-[0_1px_4px_rgba(0,0,0,0.15)] z-10"
                    style={{
                      width: "20px",
                      height: "20px",
                      left: "calc(60% - 10px)"
                    }}
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
            <div className="absolute top-[18%] left-[8%] sm:top-[18%] sm:left-[8%] lg:top-[6%] lg:left-[8%] w-[135px] h-[95px] sm:w-[150px] sm:h-[110px] lg:w-[200px] lg:h-[145px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-200/50 bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop&q=80"
                alt="Workspace preview C1"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 135px, 200px"
              />
            </div>

            {/* Top-Right: Ordina AI Workflows toggle pill */}
            <div className="absolute top-[20%] right-[8%] sm:right-[4%] lg:top-[8%] lg:right-[5%] bg-white border border-neutral-200/60 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex items-center gap-2 sm:gap-4 font-sf-pro px-3 sm:px-6 py-2 sm:py-3.5">
              {/* Sparkle / asterisk icon */}
              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#1b3a57] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
              </svg>
              <span className="text-[10px] sm:text-[13px] font-medium text-neutral-800 leading-none whitespace-nowrap">Ordina AI Workflows</span>
              {/* Toggle switch — ON state (green, knob on right) */}
              <div className="relative shrink-0 w-[32px] h-[18px] sm:w-[52px] sm:h-[29px] bg-emerald-500 rounded-full shadow-inner cursor-pointer">
                {/* White knob — right side (ON) */}
                <div className="absolute right-[2px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] sm:w-[23px] sm:h-[23px] bg-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.2)]" />
              </div>
            </div>

            {/* Bottom-Left: Dark bar chart card */}
            <div
              className="absolute bottom-[21%] left-[8%] sm:left-[4%] lg:bottom-[4%] lg:left-[6%] font-sf-pro text-white"
              style={{
                width: "clamp(135px, 34vw, 310px)",
                height: "clamp(95px, 22vw, 200px)",
                borderRadius: "24px",
                background: "radial-gradient(ellipse at 50% 0%, #23262e 0%, #12141a 60%, #0d0f14 100%)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                overflow: "hidden",
                position: "absolute"
              }}
            >
              {/* Tooltip Box — top-right area, above tallest bar */}
              <div
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 bg-[#16181e]/92 backdrop-blur-sm flex flex-col gap-0.5 sm:gap-1"
                style={{
                  position: "absolute",
                  top: "12%",
                  right: "10%",
                  minWidth: "60px"
                }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[15px] font-bold text-white leading-none"><CountUp trigger={activeState === "C"}>40%</CountUp></span>
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#a8e063] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
                <span className="text-[6.5px] sm:text-[10px] text-neutral-400 font-normal whitespace-nowrap">12 Feb, 2026</span>
              </div>

              {/* Subtle horizontal reference line */}
              <div style={{ position: "absolute", width: "100%", top: "50%", left: 0, borderTop: "1px dashed rgba(255,255,255,0.04)" }} />

              {/* Chart Bars — 6 bars, wider, more visible */}
              <div
                className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-3 pb-3 pt-0 sm:px-[22px] sm:pb-[18px] h-[75%]"
              >
                {/* Bar 1 */}
                <div style={{ width: "10%", height: "38%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.08)" }} />
                {/* Bar 2 */}
                <div style={{ width: "10%", height: "55%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.08)" }} />
                {/* Bar 3 — Highlighted (tallest) */}
                <div style={{ width: "10%", height: "82%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.14)", position: "relative" }}>
                  {/* Glowing dot on top */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.55)] border-[1.5px] border-neutral-900 top-[-5px] sm:top-[-7px]" />
                </div>
                {/* Bar 4 */}
                <div style={{ width: "10%", height: "28%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.08)" }} />
                {/* Bar 5 */}
                <div style={{ width: "10%", height: "48%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.08)" }} />
                {/* Bar 6 */}
                <div style={{ width: "10%", height: "62%", borderRadius: "6px 6px 0 0", background: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            {/* Bottom-Right: Ordina AI — Setting up automation */}
            <div className="absolute bottom-[21%] right-[8%] sm:right-[6%] lg:bottom-[4%] lg:right-[6%] w-[165px] sm:w-[245px] lg:w-[295px] bg-[#1b3a57] rounded-[16px] p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(27,58,87,0.12)] font-sf-pro z-30">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 pb-2 sm:pb-2.5 text-white">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  {/* Left vertical with top hook */}
                  <path d="M5 21V3h7v4H9v14H5z" />
                  {/* Right diagonal block */}
                  <path d="M12 9l5-5h5v5l-5 5h-5z" />
                </svg>
                <span className="text-[10px] sm:text-[13px] font-semibold text-white tracking-[0.01em]">Ordina AI</span>
              </div>

              <div className="bg-white rounded-[10px] sm:rounded-[12px] p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-3.5">
                {/* Row: Icon + Label + Percent */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Magic wand icon */}
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                      <path d="m14 7 3 3M5 6v1M19 17v1M20 12h1M3 12h1M19 8l.5.5M5 15l.5.5" />
                    </svg>
                    <span className="text-[7.5px] sm:text-[12px] font-medium text-neutral-700">Setting up automation</span>
                  </div>
                  <span className="text-[7.5px] sm:text-[12px] font-medium text-neutral-500"><CountUp trigger={activeState === "C"}>60%</CountUp></span>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-2 sm:h-4 relative flex items-center mt-1">
                  <div className="absolute inset-0 bg-[#f1f5f9] rounded-full overflow-hidden">
                    {/* Filled portion */}
                    <div className="absolute left-0 top-0 h-full w-[60%] bg-[#1b3a57]" />

                    {/* Diagonal stripes portion (60% to 80%) */}
                    <div 
                      className="absolute top-0 h-full" 
                      style={{
                        left: "60%",
                        width: "20%",
                        background: "repeating-linear-gradient(-45deg, rgba(27,58,87,0.15), rgba(27,58,87,0.15) 2px, transparent 2px, transparent 6px)"
                      }}
                    />
                  </div>

                  {/* Slider Handle (White circle with dark blue outline) */}
                  <div 
                    className="absolute h-2.5 w-2.5 sm:h-[15px] sm:w-[15px] bg-white rounded-full border-[2px] sm:border-[3px] border-[#1b3a57] shadow-sm z-10"
                    style={{ left: "calc(60% - 5px)" }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom-Center: "Send Message to Channel" pill */}
            <div className="absolute bottom-[3%] sm:bottom-[2%] lg:bottom-[1.5%] left-1/2 -translate-x-1/2 bg-white border border-neutral-200/80 rounded-full py-2 px-3 sm:py-3 sm:pl-4 sm:pr-3 flex items-center gap-2 shadow-[0_6px_25px_rgba(0,0,0,0.04)] cursor-pointer z-30 whitespace-nowrap">
              {/* Colorful Slack-like dots icon */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-center shrink-0">
                <div className="grid grid-cols-2 gap-[2px]">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-sm bg-amber-400" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-sm bg-emerald-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-sm bg-blue-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-sm bg-red-400" />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-600 font-sf-pro">Send Message to Channel</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1b3a57] flex items-center justify-center text-white shrink-0 ml-1">
                <span className="text-[10px] sm:text-[12px] font-bold leading-none">+</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
