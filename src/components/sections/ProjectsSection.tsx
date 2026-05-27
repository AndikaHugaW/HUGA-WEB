"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import ProjectModal from "@/components/ui/ProjectModal";
import { type Project } from "@/constants/projects";

const projects = [
  {
    id: 1,
    title: "Vivet",
    description: "Unapologetic streetwear brand that fuses urban grit with premium aesthetics.",
    tags: ["Branding", "Streetwear", "Logo Design"],
    image: "/images/projects/vivet-v2.webp",
    link: "#",
    featured: true,
    previewImages: [
      {
        src: "/images/projects/vivet-preview-1.webp",
        title: "Digital Ecosystem",
        description: "A seamless and premium shopping experience built across both web and mobile platforms.",
      },
      {
        src: "/images/projects/apparel.webp",
        title: "Signature Apparel",
        description: "Every piece is engineered for the streets, combining raw utilitarian aesthetics.",
      },
      {
        src: "/images/projects/label.webp",
        title: "The Flagship Experience",
        description: "A brutalist yet refined space designed to disrupt the traditional retail experience.",
      },
    ],
  },
  {
    id: 2,
    title: "Revive AI",
    description: "Smart health insights powered by AI. Personalized recommendations and early detection.",
    tags: ["API Integration", "Next.js", "Scikit-learn"],
    image: "/images/projects/revive-dasboard-min-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Oxen AI Platform",
    description: "Next-gen SaaS platform engineered to democratize artificial intelligence.",
    tags: ["AI SaaS", "Machine Learning", "UX/UI Design"],
    image: "/images/projects/oxen-ai.webp",
    link: "#",
    featured: false,
    previewImages: [
      {
        src: "/images/projects/oxen-preview-1.webp",
        title: "Visual Identity & Branding",
        description: "Forging trust through design with striking geometric precision.",
      },
      {
        src: "/images/projects/oxen-preview-2.webp",
        title: "Intelligent Interface",
        description: "A command center built for clarity. Managing complex ML models effortlessly.",
      },
    ],
  },
  {
    id: 4,
    title: "HYPEBEAST App",
    description: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops.",
    tags: ["UX/UI Design", "Mobile Optimization", "Usability Testing"],
    image: "/images/projects/hypebeast-app-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    description: "Premium e-commerce for hypebeasts with lightning-fast checkout experience.",
    tags: ["Full Stack", "Payment Gateway", "Database Design"],
    image: "/images/projects/hypebeast-web-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Luxe Cafe App",
    description: "Your coffee, your way. Order ahead, skip the line, and earn rewards.",
    tags: ["Mobile App", "Payment Gateway", "Flutter", "Supabase", "Figma"],
    image: "/images/projects/luxe-cafe-app.webp",
    link: "#",
    featured: false,
  },
];

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  isInView: boolean;
  onSelect: () => void;
}

function ProjectCard({ project, index, isInView, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className="group relative cursor-pointer flex flex-col w-full"
    >
      {/* Main Card Container (Old Size/Box style) */}
      <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex flex-col w-full">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f4f4f5]">
          <motion.div
            className="absolute inset-0 origin-center"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index < 2}
              quality={95}
            />
          </motion.div>
          
          {/* Soft elegant overlay */}
          <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors duration-500" />

          {/* View Project Badge */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white/90 backdrop-blur-xl text-black font-nippo px-7 py-3.5 rounded-full uppercase tracking-[0.15em] text-[11px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] font-medium border border-white/50">
              View Project
            </div>
          </motion.div>
        </div>

        {/* Meta Content */}
        <div className="flex flex-col p-6 lg:p-8">
          {/* Top Row: Index + Tags */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-600 font-mono text-[10px] tracking-widest font-medium">
              (0{index + 1})
            </span>
            <div className="h-px bg-black/10 flex-grow" />
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-black/40 uppercase tracking-widest">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="flex items-center gap-2 group-hover:text-black/60 transition-colors duration-300">
                  {tag}
                  {i < Math.min(project.tags.length, 3) - 1 && <span className="w-1 h-1 rounded-full bg-black/20" />}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row: Title & Arrow */}
          <div className="flex justify-between items-end gap-4 relative">
            <div className="flex flex-col gap-2">
              <h3 className="font-nippo text-2xl lg:text-3xl text-black tracking-tight leading-none group-hover:text-blue-600 transition-colors duration-500">
                {project.title}
              </h3>
              <p className="text-black/40 text-sm font-sf-pro font-light mt-2 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                {project.description}
              </p>
            </div>
            
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0, x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-12 shrink-0 rounded-full bg-[#f4f4f5] flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-black group-hover:text-white transition-colors duration-500"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
          
          {/* Hover Animated Bottom Line */}
          <div className="w-full h-px bg-transparent mt-6 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-blue-600 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-blue-600" />
              <span className="text-[11px] font-medium text-blue-600 tracking-[0.3em] uppercase">
                Portfolio
              </span>
            </motion.div>

            <TextReveal
              text="Selected Projects"
              variant="word"
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-tight"
              delay={0.1}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <p className="text-sm text-black/30 max-w-[240px] leading-relaxed">
              End-to-end product development from concept to launch.
            </p>

            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm text-black/70 hover:text-black font-medium transition-colors duration-300"
            >
              See all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onSelect={() => setSelectedProject(project as Project)}
            />
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