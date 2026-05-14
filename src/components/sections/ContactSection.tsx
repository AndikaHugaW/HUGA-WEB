"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/andikahuga",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    color: "#ffffff",
    bg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    hoverBg: "rgba(255, 255, 255, 0.1)"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andika-huga-widyatama-737413246",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    color: "#0077b5",
    bg: "rgba(0, 119, 181, 0.1)",
    border: "rgba(0, 119, 181, 0.2)",
    hoverBg: "rgba(0, 119, 181, 0.2)"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/huga_studio/",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    color: "#e4405f",
    bg: "rgba(228, 64, 95, 0.1)",
    border: "rgba(228, 64, 95, 0.2)",
    hoverBg: "rgba(228, 64, 95, 0.2)"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/6287821930072?text=Hi%20Huga!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    color: "#25D366",
    bg: "rgba(37, 211, 102, 0.1)",
    border: "rgba(37, 211, 102, 0.2)",
    hoverBg: "rgba(37, 211, 102, 0.2)"
  },
];

// Function untuk handle klik social media
const handleSocialClick = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        body: JSON.stringify(formData),
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

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <TextReveal
            text="Contact Me"
            variant="glitch"
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            delay={0.2}
          />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-32 bg-[#00ff88] rounded-full mx-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto font-normal font-sf-pro"
          >
            Interested in collaborating? Let&apos;s discuss your project!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Collaborate</h3>
              <p className="text-gray-400 leading-relaxed mb-8 font-normal font-sf-pro">
                I&apos;m always open to discussing new projects, collaborations, or just
                chatting about tech and design. Don&apos;t hesitate to contact me!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shadow-sm relative overflow-hidden">
                  <Image 
                    src="/images/logo/Gmail_Logo.svg" 
                    alt="Gmail Logo" 
                    width={24} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-normal font-sf-pro">Email</p>
                  <a href="mailto:andikahuga34@gmail.com" className="text-white hover:text-[#00ff88] transition-colors font-normal font-sf-pro">
                    andikahuga34@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSocialClick(social.url)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
                    style={{ 
                      backgroundColor: social.bg,
                      borderColor: social.border,
                      borderWidth: '1px',
                      perspective: "1000px"
                    }}
                    whileHover={{ 
                      backgroundColor: social.hoverBg,
                      borderColor: social.color,
                      scale: 1.2,
                      rotateY: index % 2 === 0 ? 15 : -15,
                      rotateX: 10,
                      z: 50,
                      boxShadow: `0 20px 25px -5px ${social.border}, 0 10px 10px -5px ${social.border}`
                    }}
                    whileTap={{ scale: 0.9, rotateX: 0, rotateY: 0 }}
                    aria-label={`Follow on ${social.name}`}
                  >
                    <motion.svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      style={{ color: social.color }}
                      whileHover={{ translateZ: 20 }}
                    >
                      <path d={social.icon} />
                    </motion.svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-normal font-sf-pro">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ff88] focus:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-normal font-sf-pro">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ff88] focus:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-normal font-sf-pro">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ff88] focus:bg-[rgba(255,255,255,0.05)] transition-all duration-300 resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#00ff88] text-black font-normal font-sf-pro rounded-lg shadow-lg shadow-[#00ff88]/50 hover:shadow-[#00ff88]/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                magneticStrength={0.3}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

