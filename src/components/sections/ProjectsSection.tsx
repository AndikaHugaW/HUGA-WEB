"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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

const featuredLayout = [
  {
    projectIndex: 0, // Vivet
    category: "Logo Design",
    date: "● SEPTEMBER 18, 2025",
    aspectRatio: "aspect-[1.5]",
    title: "Vivet Streetwear",
    subtitle: "Unapologetic streetwear brand fusing urban grit with premium aesthetics.",
  },
  {
    projectIndex: 5, // Luxe Cafe App
    category: "Ui UX Design",
    date: "● SEPTEMBER 18, 2025",
    aspectRatio: "aspect-square",
    title: "Luxe Cafe App",
    subtitle: "Clean ordering and rewards application for a premium cafe experience.",
  },
  {
    projectIndex: 3, // HYPEBEAST App
    category: "Mobile Developer",
    date: "● AUGUST 6, 2025",
    aspectRatio: "aspect-[3/4]",
    title: "HYPEBEAST App",
    subtitle: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops.",
  },
  {
    projectIndex: 2, // Oxen AI Platform
    category: "Website Developer",
    date: "● SEPTEMBER 3, 2025",
    aspectRatio: "aspect-[16/9]",
    title: "Oxen AI Platform",
    subtitle: "Next-gen SaaS platform engineered to democratize machine learning.",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen bg-white text-black border-t border-b border-neutral-200 font-sf-pro select-none flex flex-col justify-between">
      
      {/* 1. Main Grid: Horizontal and vertical lines are created by 1px gaps. Spans full width of the screen. */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-neutral-200 gap-[1px] flex-grow min-h-screen">
        
        {/* ==========================================
            DESKTOP HEADER ROW (lg:grid)
           ========================================== */}
        {/* Col 1 Header: Brand logo aligned left */}
        <div className="hidden lg:flex bg-white items-start justify-start pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px]">
          <div className="flex items-center gap-1.5">
            <Image
              src="/images/logo/Logo2.png"
              alt="Huga Logo"
              width={72}
              height={24}
              className="h-6 w-auto object-contain"
              priority
            />
            <span className="text-sm font-bold tracking-tight text-black font-nippo">
              Huga Studio
            </span>
          </div>
        </div>
        
        {/* Col 2 Header: Top label and PROJECTS title */}
        <div className="hidden lg:flex flex-col bg-white items-start justify-between pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px]">
          <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
            ● 04 SELECTED PROJECTS
          </div>
          <h2 className="text-[3.8vw] font-bold tracking-tighter text-black select-none uppercase leading-none font-nippo mt-auto">
            PROJECTS
          </h2>
        </div>
        
        {/* Col 3 Header: Top menu/label */}
        <div className="hidden lg:flex bg-white items-start justify-start pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px]">
          <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
            + DESIGN & CODE
          </div>
        </div>
        
        {/* Col 4 Header: Top right See all link */}
        <div className="hidden lg:flex bg-white items-start justify-end pt-8 pb-6 px-6 md:px-8 xl:px-10 min-h-[160px]">
          <Link 
            href="/projects"
            className="text-[9px] font-bold uppercase tracking-widest text-neutral-800 hover:text-black transition-colors flex items-center gap-1 font-mono"
          >
            All projects <span className="text-[9px]">↗</span>
          </Link>
        </div>

        {/* ==========================================
            MOBILE / TABLET HEADER (lg:hidden)
           ========================================== */}
        <div className="lg:hidden col-span-full bg-white p-6 flex justify-between items-end border-b border-neutral-200">
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest font-mono">
              ● 04 SELECTED PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-black font-nippo uppercase">
              PROJECTS
            </h2>
          </div>
          <Link 
            href="/projects"
            className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 hover:text-black flex items-center gap-1 font-mono"
          >
            See all ↗
          </Link>
        </div>

        {/* ==========================================
            BODY ROW (Col 1, 2, 3, 4) 
            Images stretch edge-to-edge horizontally (px-0 on wrapper container)
            Text elements have px-6 md:px-8 xl:px-10 for breathing room from grid lines
           ========================================== */}
        {featuredLayout.map((layout, idx) => {
          const projectData = projects[layout.projectIndex];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(projectData as Project)}
              className="bg-white px-0 pt-6 sm:pt-8 pb-12 sm:pb-16 flex flex-col justify-start gap-6 sm:gap-8 min-h-[550px] lg:min-h-[75vh] xl:min-h-[80vh] group cursor-pointer"
            >
              {/* 1. Date at the top */}
              <div className="px-6 md:px-8 xl:px-10 text-[9px] sm:text-[10px] font-semibold text-neutral-450 uppercase tracking-wider font-mono">
                {layout.date}
              </div>

              {/* 2. Image (w-[calc(100%+2px)], -ml-[1px], stretches edge-to-edge covering subpixel gaps) */}
              <div className={`relative w-[calc(100%+2px)] -ml-[1px] ${layout.aspectRatio} overflow-hidden bg-transparent`}>
                <Image
                  src={projectData.image}
                  alt={layout.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  quality={90}
                />
              </div>

              {/* 3. Text content underneath */}
              <div className="px-6 md:px-8 xl:px-10 flex flex-col gap-2.5 mt-1">
                <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest font-nippo group-hover:text-blue-600 transition-colors duration-300">
                  {layout.category}
                </span>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-[1.4] tracking-tight text-neutral-900 font-sf-pro">
                  {layout.title} — {layout.subtitle}
                </h3>
              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Detail Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}