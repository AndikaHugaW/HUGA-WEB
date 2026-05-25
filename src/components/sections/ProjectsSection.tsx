"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <TextReveal
              text="Selected Projects"
              variant="word"
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight"
              delay={0.1}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6">
            <p className="text-sm text-white/40 max-w-[240px] leading-relaxed">
              End-to-end product development from concept to launch.
            </p>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm text-white/70 hover:text-white font-medium transition-colors duration-300">
              See all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project as Project)}>

              {/* Card */}
              <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-white/[0.1] group-hover:bg-white/[0.04]">

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={85}
                  />
                  {/* Subtle Bottom Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-8">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl lg:text-2xl font-medium text-white group-hover:text-[#00ff88]/90 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {/* Arrow Icon */}
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/40 leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] font-medium text-white/50 tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/0 to-transparent group-hover:via-[#00ff88]/40 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} isOpen={selectedProject !== null} onClose={() => setSelectedProject(null)} />
    </section>
  );
}