"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/TestimonialsColumn";
import TextReveal from "@/components/ui/TextReveal";
import { GridBackground } from "@/components/ui/GridBackground";

const testimonials = [
  {
    text: "Andika delivered an exceptional website that exceeded our expectations. His attention to detail and understanding of modern design trends is remarkable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    name: "Sarah Johnson",
    role: "CEO, TechStart",
  },
  {
    text: "Working with Huga was a game-changer for our business. The SaaS platform he built is intuitive, fast, and our customers love it.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    name: "Michael Chen",
    role: "Founder, CloudSync",
  },
  {
    text: "The mobile app design was exactly what we envisioned. Clean, modern, and user-friendly. Highly recommend his services!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    name: "Emily Davis",
    role: "Product Manager",
  },
  {
    text: "Andika's expertise in full-stack development helped us launch our platform 2 months ahead of schedule. Outstanding work!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    name: "David Wilson",
    role: "CTO, FinanceApp",
  },
  {
    text: "The UI/UX redesign increased our conversion rate by 40%. His understanding of user behavior is exceptional.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
    name: "Lisa Thompson",
    role: "Marketing Director",
  },
  {
    text: "From concept to deployment, Andika handled everything professionally. Our e-commerce site is now performing better than ever.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    name: "Robert Martinez",
    role: "Business Owner",
  },
  {
    text: "The landing page he created for our startup helped us secure our seed funding. Incredible design work!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    name: "Amanda Lee",
    role: "Startup Founder",
  },
  {
    text: "Responsive, creative, and technically brilliant. Andika is the go-to developer for any serious project.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80",
    name: "James Brown",
    role: "Agency Director",
  },
  {
    text: "The website performance optimization he did cut our load time by 60%. Our SEO rankings improved significantly.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&q=80",
    name: "Sophie Williams",
    role: "SEO Specialist",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      {/* Grid Background */}
      <GridBackground 
        className="opacity-40" 
        dotColor="rgba(0, 255, 136, 0.2)"
        size={20}
      />

      {/* Background Decorative */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl -translate-x-1/2 z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl translate-x-1/2 z-0"></div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="text-[#00ff88] text-2xl font-bold"
            >
              *
            </motion.div>
            <TextReveal
              text="TESTIMONIALS"
              variant="word"
              className="text-sm md:text-base font-normal text-white uppercase tracking-wider font-sf-pro"
              delay={0.3}
            />
          </div>

          <TextReveal
            text="Trusted by Clients"
            variant="word"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            delay={0.4}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 mt-6 text-base md:text-lg leading-relaxed font-normal font-sf-pro"
          >
            Trusted by businesses worldwide to deliver exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Testimonials Columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
