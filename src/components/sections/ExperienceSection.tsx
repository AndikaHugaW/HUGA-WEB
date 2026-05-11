"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: [
      "Building full-stack web applications using Next.js and TypeScript",
      "Developing RESTful APIs with Node.js and Express",
      "Designing and implementing database schemas with PostgreSQL",
      "Collaborating with clients to understand requirements and deliver solutions",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Freelance",
    period: "2023 - Present",
    description: [
      "Designing user interfaces and user experiences for web and mobile applications",
      "Creating comprehensive design systems using Figma",
      "Developing interactive prototypes for user testing",
      "Collaborating with developers to ensure accurate design implementation",
    ],
    tech: ["Figma", "Prototyping", "Design System", "User Research"],
  },
];

const achievements = [
  {
    title: "Projects Completed",
    value: "15+",
    description: "Various projects from small business to enterprise",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Happy Clients",
    value: "12+",
    description: "Clients satisfied with the results",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Years Experience",
    value: "1+",
    description: "Experience in development and design fields",
    icon: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const AchievementCard = ({
  achievement,
  index,
  isInView,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  isInView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className="group/canvas-card relative h-full"
      onMouseEnter={() => { setHovered(true); setHasBeenHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Content */}
      <div className="relative text-center p-10 md:p-12 bg-white border border-[#00ff88] transition-all duration-300 h-full min-h-[200px] flex flex-col justify-center">
        {/* Corner Plus Icons */}
        <div className="absolute top-0 left-0 w-4 h-4 flex items-center justify-center">
          <span className="text-black text-xs font-light">+</span>
        </div>
        <div className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center">
          <span className="text-black text-xs font-light">+</span>
        </div>
        <div className="absolute bottom-0 left-0 w-4 h-4 flex items-center justify-center">
          <span className="text-black text-xs font-light">+</span>
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4 flex items-center justify-center">
          <span className="text-black text-xs font-light">+</span>
        </div>

        {/* Canvas Reveal Effect - Only mount after first hover, then keep alive */}
        {hasBeenHovered && (
          <div 
            className={`h-full w-full absolute inset-0 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-white"
              colors={[
                [0, 255, 136], // Neon green
                [0, 204, 106], // Darker green
              ]}
              dotSize={2}
              showGradient={false}
            />
          </div>
        )}

        {/* Center Icon - Visible before hover */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center group-hover/canvas-card:opacity-0 group-hover/canvas-card:scale-0 transition-all duration-200"
          >
            <div className="text-[#00ff88] flex items-center justify-center">
              {achievement.icon}
            </div>
          </motion.div>

          {/* Card Content - Visible after hover */}
          <div className="opacity-0 group-hover/canvas-card:opacity-100 transition-all duration-200 text-center w-full">
            <div className="text-4xl font-bold text-[#00ff88] mb-3">
              {achievement.value}
            </div>
            <h3 className="text-lg font-semibold text-black mb-2 group-hover/canvas-card:text-[#00ff88] transition-colors duration-200">
              {achievement.title}
            </h3>
            <p className="text-gray-700 text-xs">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-\[1440px\] mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <TextReveal
            text="Experience"
            variant="glitch"
            className="text-5xl md:text-7xl font-bold text-black mb-4"
            delay={0.2}
          />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-32 bg-[#00ff88] rounded-full"
          />
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-[#00ff88]" />
                
                {/* Content */}
                <div className="flex-1 ml-0 md:ml-16">
                  <div className="group relative bg-white border border-[#00ff88]/30 rounded-2xl p-8 hover:border-[#00ff88]/60 transition-all duration-300 shadow-lg hover:shadow-[#00ff88]/20 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-[#00ff88] transition-colors duration-300">{exp.title}</h3>
                        <p className="text-[#00ff88] font-medium">{exp.company}</p>
                      </div>
                      <span className="text-gray-700 text-sm mt-2 md:mt-0">{exp.period}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-[#00ff88] mt-1 group-hover:scale-110 transition-transform duration-300">▹</span>
                          <span className="text-black">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-[#00ff88]/20 text-black rounded-full hover:bg-[#00ff88]/30 hover:shadow-[#00ff88]/50 hover:shadow-lg transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
