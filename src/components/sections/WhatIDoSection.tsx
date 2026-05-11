"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";

const services = [
  {
    id: 1,
    title: "UI / UX Design",
    active: true,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    about: "Transform your ideas into beautiful, intuitive interfaces. We craft pixel-perfect designs that users love, boost engagement, and drive conversions for your digital products.",
    tags: ["FIGMA", "USER RESEARCH", "PROTOTYPING"],
  },
  {
    id: 2,
    title: "Fullstack Development",
    active: false,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    about: "Build powerful, scalable web applications from frontend to backend. Modern tech stack, clean architecture, and production-ready code that grows with your business.",
    tags: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT"],
  },
  {
    id: 3,
    title: "Machine Learning",
    active: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    about: "Turn your data into actionable insights. We build custom ML models that predict, classify, and automate — helping you make smarter decisions faster.",
    tags: ["PYTHON", "TENSORFLOW", "DATA SCIENCE"],
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    active: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    about: "Supercharge your products with AI capabilities. From chatbots to recommendation engines, we integrate intelligent features that delight users and reduce manual work.",
    tags: ["LLM", "NLP", "COMPUTER VISION"],
  },
];

export default function WhatIDoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(services.find(s => s.active) || services[0]);

  const handleServiceClick = (service: typeof services[0]) => {
    setActiveService(service);
  };

  return (
    <section ref={ref} className="relative pt-0 pb-0 px-0 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto py-32 px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Services List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-gray-400 text-sm mb-8">{'//WHAT I DO?'}</div>
            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`w-full text-left py-4 px-0 transition-all duration-300 ${
                    activeService.id === service.id
                      ? "text-white text-2xl md:text-3xl font-bold"
                      : "text-gray-500 text-xl md:text-2xl font-medium hover:text-gray-400"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Content Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Image */}
            {activeService.image && (
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-lg overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80";
                  }}
                />
              </motion.div>
            )}

            {/* About Section */}
            {activeService.about && (
              <motion.div
                key={`about-${activeService.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-gray-400 text-sm mb-4">ABOUT</div>
                <p className="text-gray-300 leading-relaxed">{activeService.about}</p>
              </motion.div>
            )}

            {/* Tags Section */}
            {activeService.tags && (
              <motion.div
                key={`tags-${activeService.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-gray-400 text-sm mb-4">TAGS</div>
                <div className="flex flex-wrap gap-3">
                  {activeService.tags.map((tag, index) => {
                    // Highlight the tag that matches the active service title
                    const isHighlighted = tag.toUpperCase() === activeService.title.toUpperCase() || 
                                         tag.toUpperCase().includes(activeService.title.toUpperCase().replace(/\s+/g, "")) ||
                                         (activeService.title === "UI / UX" && (tag === "UI/UX" || tag === "UI" || tag === "UX DESIGN"));
                    return (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                          isHighlighted
                            ? "border-[#00ff88] text-[#00ff88]"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

