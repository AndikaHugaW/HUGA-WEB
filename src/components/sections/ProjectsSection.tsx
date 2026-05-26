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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set((x - centerX) / 10);
    mouseY.set((y - centerY) / -10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="group relative cursor-pointer"
    >
      {/* Main Card */}
      <div className="relative bg-[#fafafa] border border-black/[0.06] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-black/[0.12] group-hover:bg-[#f4f4f5]">

        {/* Image Container with 3D transform */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ transform: "translateZ(30px)" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
              quality={90}
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Featured Badge */}
          <AnimatePresence>
            {project.featured && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute top-4 left-4"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-medium text-white/80 tracking-wider uppercase">Featured</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content with 3D transform */}
        <div className="relative p-6 lg:p-8" style={{ transform: "translateZ(20px)" }}>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-light text-black/30 font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl lg:text-2xl font-medium text-black tracking-tight transition-colors duration-300 group-hover:text-emerald-700">
                {project.title}
              </h3>
            </div>

            {/* Arrow Icon */}
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0, x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-9 h-9 rounded-full bg-black/[0.03] border border-black/[0.08] flex items-center justify-center group-hover:bg-black/[0.06] group-hover:border-black/[0.12] transition-all duration-300"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/50 group-hover:text-emerald-700 transition-colors duration-300"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-sm text-black/30 leading-relaxed mb-5 line-clamp-2 group-hover:text-black/40 transition-colors duration-300">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={i}
                className="px-3 py-1.5 text-[11px] font-medium text-black/40 tracking-wide border border-black/[0.06] rounded-full bg-black/[0.02] group-hover:border-black/[0.1] group-hover:bg-black/[0.03] group-hover:text-black/50 transition-all duration-300"
                animate={isHovered ? { y: -2 } : { y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          animate={{ backgroundPosition: ["200% center", "-200% center"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, #047857 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* 3D Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.05) 0%, transparent 70%)",
          transform: "translateZ(-50px)",
          opacity: isHovered ? 1 : 0,
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-emerald-700" />
              <span className="text-[11px] font-medium text-emerald-700 tracking-[0.3em] uppercase">
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