"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";
import ProjectModal from "@/components/ui/ProjectModal";

import { projects, type Project } from "@/constants/projects";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative pt-0 pb-32 px-0 bg-black">
      {/* Grid Background */}
      <GridBackground
        className="opacity-40"
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />

      <div className="relative z-10 w-full max-w-\[1440px\] mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-32">
        {/* Header Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Title */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  className="text-[#00ff88] text-4xl font-bold"
                >
                  *
                </motion.div>
                <TextReveal
                  text="MY PROJECTS"
                  variant="word"
                  className="text-sm md:text-base font-bold text-white uppercase tracking-wider"
                  delay={0.3}
                />
              </div>
              <div className="space-y-1">
                <TextReveal
                  text="Built to perform."
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold text-white leading-tight block"
                  delay={0.4}
                />
                <TextReveal
                  text="Designed to impress."
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight block"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Right: Description and Button */}
            <div className="flex flex-col justify-start h-full">
              <TextReveal
                text="Real projects, real results. Each crafted with clean code and pixel-perfect design."
                variant="word"
                className="text-base md:text-lg text-white/80 leading-relaxed mb-8"
                delay={0.5}
              />
              <MagneticButton
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-medium rounded-lg hover:bg-[#00cc6a] transition-colors w-fit"
                magneticStrength={0.3}
              >
                <span>All Projects</span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with Fixed Aspect Ratio */}
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#111] mb-6 border border-white/5 ring-1 ring-white/10 group-hover:ring-[#00ff88]/30 transition-all duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Arrow Button Overlay */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project Info */}
              <div className="space-y-3 px-1">
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]/80">
                      {tag}
                    </span>
                  ))}
                  {project.featured && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-tighter text-white/40">
                      <span className="w-1 h-1 rounded-full bg-[#00ff88]" />
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00ff88] transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
