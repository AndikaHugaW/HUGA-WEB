"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";

const faqs = [
  {
    id: 1,
    question: "What services do you specialize in?",
    answer: "I specialize in Full Stack Development, UI/UX Design, and Mobile App Development. Whether you need a high-converting Landing Page, a complex SaaS Platform, or a functional Mobile Application, I deliver solutions tailored to your goals.",
  },
  {
    id: 2,
    question: "Can you build SaaS platforms?",
    answer: "Yes, I have extensive experience building scalable SaaS applications. From database architecture (Supabase/PostgreSQL) and authentication to secure payment integration (Stripe) and interactive dashboards, I handle the full development lifecycle.",
  },
  {
    id: 3,
    question: "Do you offer UI/UX Design services only?",
    answer: "Absolutely. If you already have a development team but need a world-class design, I can provide high-fidelity Figma designs, wireframes, interactive prototypes, and a complete design system.",
  },
  {
    id: 4,
    question: "How long does a project typically take?",
    answer: "Timelines depend on the scope. A standard portfolio or landing page typically takes 1-3 weeks, while more complex projects like SaaS platforms or Mobile Apps may take 4-10 weeks. I prioritize quality while ensuring timely delivery.",
  },
  {
    id: 5,
    question: "Do you provide post-launch support?",
    answer: "Yes, I believe in long-term partnerships. I provide post-launch support to ensure everything runs smoothly, as well as optional maintenance packages for updates, security patches, and feature enhancements.",
  },
  {
    id: 6,
    question: "How do I start a project with you?",
    answer: "It's simple. Fill out the contact form below or send me an email. We'll discuss your specific needs, technical requirements, and business goals to determine the best approach for your project.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="relative py-40 md:py-48 lg:py-56 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 z-0"></div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="text-[#00ff88] text-2xl font-bold"
            >
              *
            </motion.div>
            <TextReveal
              text="FAQS"
              variant="word"
              className="text-sm md:text-base font-normal text-white uppercase tracking-wider font-sf-pro"
              delay={0.3}
            />
          </div>
          <div className="flex justify-center w-full">
            <TextReveal
              text="Frequently asked questions"
              variant="word"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex justify-center flex-wrap"
              delay={0.4}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
          {/* Left: FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-black backdrop-blur-sm border-l-4 border-[#00ff88] rounded-none overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-7 md:py-8 flex items-center justify-between text-left hover:bg-[#00ff88]/30 transition-colors duration-300"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-gray-200 leading-relaxed font-normal font-sf-pro">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right: Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-black rounded-2xl p-6 md:p-8 border border-gray-800 flex flex-col items-center justify-center text-center"
          >
            {/* Profile Pictures with Aceternity UI Effect */}
            <div className="flex -space-x-4 mb-8 justify-center">
              {[
                { 
                  id: 1, 
                  name: "Sarah Johnson", 
                  role: "Design Lead",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80"
                },
                { 
                  id: 2, 
                  name: "Michael Chen", 
                  role: "Developer",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
                },
                { 
                  id: 3, 
                  name: "Emily Davis", 
                  role: "Project Manager",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80"
                },
              ].map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1, type: "spring" }}
                  className="group relative"
                >
                  {/* Glowing Border Effect - Aceternity UI Style */}
                  <motion.div 
                    className="absolute -inset-0.5 rounded-full opacity-20 group-hover:opacity-60 blur-sm transition duration-500 group-hover:duration-200"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: "conic-gradient(from 0deg, #00ff88, #00cc6a, #00ff88, #00cc6a, #00ff88)",
                    }}
                  ></motion.div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff88] via-[#00cc6a] to-[#00ff88] rounded-full opacity-0 group-hover:opacity-40 transition duration-500 group-hover:duration-200"></div>
                  
                  <div className="relative w-12 h-12 rounded-full border-2 border-gray-900 overflow-hidden bg-gray-700 group-hover:border-[#00ff88]/60 transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00ff88&color=000`;
                      }}
                    />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap border border-[#00ff88]/30 shadow-lg">
                      <div className="font-normal text-[#00ff88] font-sf-pro">{member.name}</div>
                      <div className="text-gray-400 text-[10px] font-normal font-sf-pro">{member.role}</div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              Do You have More Questions?
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-8 leading-relaxed text-center text-sm font-normal font-sf-pro">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team. We specialize in creating digital experiences that drive results.
            </p>

            {/* CTA Button */}
            <MagneticButton
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full px-6 py-4 bg-[#00ff88] hover:bg-[#00cc6a] text-black font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              magneticStrength={0.3}
            >
              <span className="font-normal font-sf-pro">Get in Touch</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

