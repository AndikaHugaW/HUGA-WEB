"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import { GridBackground } from "@/components/ui/GridBackground";

const expertise = [
  {
    category: "Web Development",
    icon: "🌐",
    skills: ["Next.js", "Laravel", "React", "Tailwind", "API Integration"],
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400"
  },
  {
    category: "Mobile Development",
    icon: "📱",
    skills: ["Flutter", "React Native", "Android", "iOS", "Firebase"],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400"
  },
  {
    category: "UI/UX & Branding",
    icon: "🎨",
    skills: ["Figma", "Design System", "Logo Identity", "Prototyping", "User Research"],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-400"
  },
  {
    category: "AI & Machine Learning",
    icon: "🤖",
    skills: ["Computer Vision", "TensorFlow", "OpenAI API", "NLP", "Recommendation System"],
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-400"
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
      
      <div className="relative z-10 max-w-[1800px] mx-auto pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-emerald-400 text-sm font-mono mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-[1px] bg-emerald-400"></span>
          EXPERTISE
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
            Featured Skills <span className="text-gray-500">&</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Expertise.</span>
          </h2>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm transition-all duration-500 overflow-hidden`}
            >
              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-500 grayscale group-hover:grayscale-0 scale-150 rotate-12">
                {item.icon}
              </div>

              {/* Card Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-xl bg-black/40 border ${item.borderColor} flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {item.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3">
                {item.skills.map((skill, sIndex) => (
                  <motion.span
                    key={sIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) + (sIndex * 0.05) }}
                    className="px-4 py-2 rounded-full bg-black/50 border border-gray-800 text-gray-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              {/* Subtle line at bottom */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-0 group-hover:w-full transition-all duration-700 opacity-50"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

