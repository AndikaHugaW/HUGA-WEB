"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";

const projects = [
  {
    id: 1,
    title: "Revive Website",
    description: "Healthcare made simple. Book appointments, consult doctors online, and access trusted medical info — all in one seamless platform.",
    tags: ["Next.js", "Supabase", "Scikit-learn", "TensorFlow", "Figma"],
    image: "/images/projects/revive-web-min.webp",
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Revive AI",
    description: "Smart health insights powered by AI. Get personalized recommendations and early detection alerts that help you stay ahead of your health.",
    tags: ["API Integration", "Next.js", "Scikit-learn"],
    image: "/images/projects/revive-dasboard-min.webp",
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Honda Pekalongan Website",
    description: "Sleek automotive showcase. Modern design meets fast performance — helping customers explore vehicles and book test drives effortlessly.",
    tags: ["Next.js", "Supabase", "Figma"],
    image: "/images/projects/honda-pekalongan.webp",
    link: "#",
    featured: false,
  },
  {
    id: 4,
    title: "HYPEBEAST Design App",
    description: "Streetwear discovery, reimagined. Swipe, save, and shop the latest drops with a buttery-smooth mobile experience.",
    tags: ["UX/UI Design", "Mobile Optimization", "Usability Testing"],
    image: "/images/projects/hypebeast-app.webp",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    description: "Premium e-commerce for hypebeasts. Lightning-fast checkout, secure payments, and a browsing experience that feels like the future.",
    tags: ["Full Stack", "Payment Gateway", "Database Design"],
    image: "/images/projects/hypebeast-web.webp",
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

  return (
    <section id="projects" ref={ref} className="relative pt-0 pb-32 px-0 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />
      <div className="max-w-7xl mx-auto pt-16 pb-32 px-6 md:px-12 lg:px-24">
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
                  text="Transforming ideas"
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold text-white leading-tight block"
                  delay={0.4}
                />
                <TextReveal
                  text="into memorable brand"
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight block"
                  delay={0.5}
                />
                <TextReveal
                  text="journeys."
                  variant="word"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold text-white leading-tight block"
                  delay={0.6}
                />
              </div>
            </div>

            {/* Right: Description and Button */}
            <div className="flex flex-col justify-start h-full">
              <TextReveal
                text="We turn ideas into memorable brand journeys, crafting unique brand identities that reflect values, connect with audiences, and stand out."
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

        {/* Projects Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative"
            >
              {/* Image Area */}
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
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
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 transition-all ${
                    project.featured
                      ? "bg-[#00ff88] hover:bg-[#00cc6a]"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke={project.featured ? "black" : "black"}
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
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${
                    project.featured ? "text-[#00ff88]" : "text-white"
                  }`}
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
    </section>
  );
}
