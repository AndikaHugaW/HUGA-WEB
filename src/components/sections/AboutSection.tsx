"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import { GridBackground } from "@/components/ui/GridBackground";

const skills = [
  {
    title: "WEBSITE DESIGN",
    number: "/01",
    description: "Scalable UI Components",
    percentage: 90,
    color: "neon",
  },
  {
    title: "APP UI DESIGN",
    number: "/02",
    description: "Device-Friendly Layouts",
    percentage: 75,
    color: "grey",
  },
  {
    title: "PROTOTYPING",
    number: "/03",
    description: "Add Motion And Transitions",
    percentage: 90,
    color: "grey",
  },
  {
    title: "WEB FLOW/ FRAMER DEV",
    number: "/04",
    description: "Build Dynamic Sites",
    percentage: 85,
    color: "grey",
  },
  {
    title: "FRONTEND DEVELOPMENT",
    number: "/05",
    description: "React & Next.js Expertise",
    percentage: 88,
    color: "grey",
  },
  {
    title: "BACKEND DEVELOPMENT",
    number: "/06",
    description: "API & Database Design",
    percentage: 80,
    color: "grey",
  },
  {
    title: "UI/UX DESIGN",
    number: "/07",
    description: "User-Centered Design",
    percentage: 92,
    color: "grey",
  },
  {
    title: "MOBILE DEVELOPMENT",
    number: "/08",
    description: "Cross-Platform Apps",
    percentage: 78,
    color: "grey",
  },
  {
    title: "DATABASE MANAGEMENT",
    number: "/09",
    description: "SQL & NoSQL Solutions",
    percentage: 82,
    color: "grey",
  },
  {
    title: "API INTEGRATION",
    number: "/10",
    description: "REST & GraphQL APIs",
    percentage: 85,
    color: "grey",
  },
  {
    title: "VERSION CONTROL",
    number: "/11",
    description: "Git & GitHub Workflow",
    percentage: 90,
    color: "grey",
  },
  {
    title: "TESTING & DEPLOYMENT",
    number: "/12",
    description: "Quality Assurance",
    percentage: 75,
    color: "grey",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative pt-0 pb-0 px-0 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      
      <div className="relative z-10 max-w-\[1440px\] mx-auto pt-32 pb-16 px-6 md:px-12 lg:px-24">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm mb-4"
        >
          {'//ABOUT ME'}
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            My Experience And Expertise With Design Tools Used{" "}
            <span className="text-gray-500">Through Out My</span> Career.
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800"
            >
              {/* Title and Number */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm uppercase">{skill.title}</h3>
                <span className="text-gray-500 text-sm">{skill.number}</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs mb-6">{skill.description}</p>

              {/* Percentage */}
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                {skill.percentage}%
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.percentage}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  className={`h-full ${
                    skill.color === "neon"
                      ? "bg-[#00ff88] diagonal-stripes"
                      : "bg-gray-700 diagonal-stripes-dark"
                  } relative`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

