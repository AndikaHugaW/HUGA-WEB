"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Selection state for client onboarding project types
  const [selectedProjectType, setSelectedProjectType] = useState("Web App");
  const projectTypes = ["Web Design", "Web App", "Mobile App", "AI System"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectType: selectedProjectType, // include onboarding details
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully! Thank you.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Github", url: "https://github.com/andikahuga" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/andika-huga-widyatama-737413246" },
    { name: "Instagram", url: "https://www.instagram.com/huga_studio/" },
    { name: "WhatsApp", url: "https://wa.me/6287821930072?text=Hi%20Huga!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." }
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-white overflow-hidden text-neutral-900">
      {/* Top Divider Line */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-[1px] bg-neutral-200 mb-20" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT SIDE (40%): Editorial Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Category Label */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">Contact Me</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
              </div>

              {/* Sophisticated Editorial Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-neutral-900 tracking-tight leading-[1.1] font-sf-pro">
                Turning ambitious ideas into polished products.
              </h2>

              {/* Short Narrative */}
              <p className="text-neutral-500 font-sf-pro text-base leading-relaxed max-w-[480px]">
                Have an idea, project blueprint, or partnership inquiry? Feel free to reach out. I’m currently accepting select freelance assignments and remote product design engineering roles.
              </p>

              {/* Designer Avatar & Details (Premium Signature Style) */}
              <div className="flex items-center gap-4 py-4 border-t border-neutral-100 max-w-[480px]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale border border-neutral-200 bg-neutral-100 flex-shrink-0">
                  <Image 
                    src="/images/hero/Huga.webp" 
                    alt="Andika Huga" 
                    fill 
                    className="object-cover" 
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 font-sf-pro">Andika Huga</p>
                  <p className="text-xs text-neutral-400 font-medium font-sf-pro">Full-stack Designer & Developer</p>
                </div>
              </div>

              {/* Structured Metadata Row with Micro-details */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 py-6 border-y border-neutral-100 max-w-[480px] font-sf-pro text-sm">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">Direct Email</span>
                  <a href="mailto:andikahuga34@gmail.com" className="font-semibold text-neutral-800 hover:text-[#0066ff] transition-colors">
                    andikahuga34@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">Response Time</span>
                  <span className="font-semibold text-neutral-800">Within 24 hours</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">Location</span>
                  <span className="font-semibold text-neutral-800">Solo, Indonesia</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">Availability</span>
                  <span className="font-semibold text-neutral-800">Booking Q3 2026</span>
                </div>
              </div>

              {/* Clean Text-based Social Links with Underline Animations */}
              <div className="space-y-3 max-w-[480px] font-sf-pro">
                <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block font-sf-pro">Follow Me</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-neutral-800">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative hover:text-[#0066ff] transition-colors duration-300 pb-1"
                    >
                      <span>{social.name} ↗</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0066ff] transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* RIGHT SIDE (60%): Onboarding Contact Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-neutral-50 rounded-[20px] border border-neutral-200/80 p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]"
            >
              {/* Card Header */}
              <div className="mb-8 border-b border-neutral-200/50 pb-6">
                <h3 className="text-xl font-bold text-neutral-950 font-sf-pro">Start a Project</h3>
                <p className="text-xs text-neutral-400 mt-1 font-sf-pro">Tell me about your idea. I&apos;ll get back within 24 hours.</p>
              </div>

              {/* Minimalist Form */}
              <form onSubmit={handleSubmit} className="space-y-8 font-sf-pro">
                
                {/* Onboarding Chips: Project Type */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block font-sf-pro">Project Type</span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = selectedProjectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedProjectType(type)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? "bg-[#0066ff] border-[#0066ff] text-white shadow-[0_8px_16px_rgba(0,102,255,0.2)]" 
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-neutral-200 focus:border-[#0066ff] text-neutral-900 pb-3 pt-2 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-400"
                    placeholder="Your Name"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-neutral-200 focus:border-[#0066ff] text-neutral-900 pb-3 pt-2 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-400"
                    placeholder="Email Address"
                  />
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-neutral-200 focus:border-[#0066ff] text-neutral-900 pb-3 pt-2 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-400 resize-none"
                    placeholder="Tell me about your project objectives..."
                  />
                </div>

                {/* Unified Premium Brand Blue CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full transition-all duration-300 bg-[#0066ff] hover:bg-[#0055dd] text-white cursor-pointer w-full md:w-auto font-sf-pro text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(0,102,255,0.2)]"
                >
                  <span>{isSubmitting ? "Sending Project Details..." : "Send Inquiry"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
