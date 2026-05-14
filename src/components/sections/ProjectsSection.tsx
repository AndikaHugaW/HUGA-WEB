"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";
import ProjectModal from "@/components/ui/ProjectModal";
import { type Project } from "@/constants/projects";

const projects = [
  {
    id: 1,
    title: "Vivet",
    description: "Vivet is an unapologetic, high-octane streetwear brand born in Indonesia. Fusing urban grit with premium aesthetics, Vivet redefines modern street culture.",
    tags: ["Branding", "Streetwear", "Logo Design"],
    image: "/images/projects/vivet-v2.webp",
    link: "#",
    featured: true,
    previewImages: [
      {
        src: "/images/projects/vivet-preview-1.webp",
        title: "Digital Ecosystem",
        description: "A seamless and premium shopping experience built across both web and mobile platforms. We engineered the digital ecosystem with frictionless navigation, ultra-fast load times, and a buttery-smooth checkout process. The platform also integrates an exclusive 'drop' notification system and an interactive lookbook, ensuring that users deeply engage with the Vivet lifestyle from anywhere in the world."
      },
      {
        src: "/images/projects/apparel.webp",
        title: "Signature Apparel",
        description: "Every piece is engineered for the streets, combining raw utilitarian aesthetics with premium heavyweight fabrics. We focused on delivering uncompromising quality through custom garment washes, distressed detailing, and striking typography that speaks without saying a word. The collection serves as an unapologetic uniform for modern youth culture, blurring the line between high fashion and everyday streetwear."
      },
      {
        src: "/images/projects/label.webp",
        title: "The Flagship Experience",
        description: "A brutalist yet refined space designed to disrupt the traditional retail experience. The Vivet flagship store is more than just a place to shop—it's an immersive architectural manifestation of our brand ethos. Featuring cold concrete textures, dramatic ambient lighting, and minimalist metallic fixtures, the interior creates a gallery-like atmosphere where every garment is presented as a work of modern art."
      }
    ],
  },
  {
    id: 2,
    title: "Revive AI",
    description: "Smart health insights powered by AI. Get personalized recommendations and early detection alerts that help you stay ahead of your health.",
    tags: ["API Integration", "Next.js", "Scikit-learn"],
    image: "/images/projects/revive-dasboard-min-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Oxen Ai Platform",
    description: "Oxen Ai is a next-generation SaaS platform engineered to democratize artificial intelligence. Built for scale and speed, it transforms complex data pipelines into intuitive, visual workflows.",
    tags: ["AI SaaS", "Machine Learning", "UX/UI Design"],
    image: "/images/projects/oxen-ai.webp",
    link: "#",
    featured: false,
    previewImages: [
      {
        src: "/images/projects/oxen-preview-1.webp",
        title: "Visual Identity & Branding",
        description: "Forging trust through design. The Oxen Ai visual identity strips away the complexity of artificial intelligence, opting instead for striking geometric precision and a minimalist color palette. It's a brand mark engineered to communicate unyielding reliability, forward momentum, and the absolute clarity of modern enterprise software."
      },
      {
        src: "/images/projects/oxen-preview-2.webp",
        title: "Intelligent Interface",
        description: "A command center built for clarity. We designed the Oxen Ai platform interface to empower teams by turning overwhelming datasets into actionable intelligence. With ultra-fast navigation, dynamic dark-mode aesthetics, and zero-clutter architecture, managing complex ML models has never felt this effortless—or looked this premium."
      }
    ],
  },
  {
    id: 4,
    title: "HYPEBEAST Design App",
    description: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops with a buttery-smooth mobile experience.",
    tags: ["UX/UI Design", "Mobile Optimization", "Usability Testing"],
    image: "/images/projects/hypebeast-app-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    description: "Premium e-commerce for hypebeasts. Lightning-fast checkout, secure payments, and a browsing experience that feels like the future.",
    tags: ["Full Stack", "Payment Gateway", "Database Design"],
    image: "/images/projects/hypebeast-web-v2.webp",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Luxe Cafe App",
    description: "Your coffee, your way. Order ahead, skip the line, and earn rewards — all from a beautifully crafted mobile app.",
    tags: ["Mobile App" , "Payment Gateway", "Flutter", "Supabase" , "Figma" ],
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
    <section id="projects" ref={ref} className="relative py-40 px-0 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-[0.10]" 
        dotColor="rgba(255, 255, 255, 0.4)"
        size={24}
      />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section - Premium Editorial Layout */}
        <div className="mb-40 lg:mb-48">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center">
            {/* Left Side: Eyebrow + Main Headline */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 0.7, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-emerald-400 text-xs font-bold tracking-[0.4em] uppercase flex items-center gap-4"
              >
                <span className="w-12 h-[1px] bg-emerald-400/50"></span>
                ✦ Featured Projects
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight"
              >
                Building Digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-400/80 whitespace-nowrap">
                  Products That Matter.
                </span>
              </motion.h2>
            </div>

            {/* Right Side: Description + CTA */}
            <div className="space-y-8 lg:space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.7, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-gray-300 text-lg md:text-xl leading-[1.8] max-w-[40ch]"
              >
                We create scalable digital products through modern development, branding, and AI-driven innovation.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/projects">
                  <MagneticButton
                    className="group relative flex items-center gap-4 pl-6 pr-1.5 py-1.5 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.08)] rounded-full transition-all duration-500 backdrop-blur-[12px] overflow-hidden"
                    magneticStrength={0.2}
                  >
                    <span className="text-xs font-semibold tracking-wider uppercase ml-2">Explore Projects</span>
                    <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-[-45deg] transition-all duration-500 shadow-[0_0_30px_rgba(52,211,153,0.6)]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Projects Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedProject(project as Project)}
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={85}
                />
                {/* Navigation Button - Top Right */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-white group-hover:bg-[#00ff88]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="black"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Content - No Background */}
              <div className="mt-4">
                {/* Tags - Above Title */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 bg-[#00ff88]/20 backdrop-blur-sm text-[#00ff88] text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white transition-colors duration-300 group-hover:text-[#00ff88]"
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {project.description}
                </p>
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
