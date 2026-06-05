"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import Image from "next/image";

export default function PricingSection() {
  const cards = [
    {
      plan: "BRAND IDENTITY",
      description: "Perfect for businesses looking to establish a strong and memorable brand presence.",
      price: "$100",
      numericPrice: 100,
      icon: (
        <Image
          src="/images/logo/Logo2.png"
          alt="Huga Logo"
          width={72}
          height={24}
          className="h-6 w-auto object-contain"
          priority
        />
      ),
      highlighted: false,
      features: [
        "Logo Design & Visual Identity",
        "Brand Color & Typography System",
        "Social Media Brand Assets",
        "Brand Guidelines Document",
      ],
    },
    {
      plan: "PRODUCT DESIGN",
      description: "Designed for companies that need intuitive, conversion-focused digital experiences.",
      price: "$1,000",
      numericPrice: 1000,
      icon: (
        <Image
          src="/images/logo/Logo.png"
          alt="Huga Logo"
          width={72}
          height={24}
          className="h-6 w-auto object-contain"
          priority
        />
      ),
      highlighted: true,
      features: [
        "User Research & Strategy",
        "Wireframing & User Flow",
        "High-Fidelity UI Design",
        "Interactive Prototypes",
      ],
    },
    {
      plan: "DEVELOPMENT",
      description: "End-to-end development solutions built for performance, scalability, and growth.",
      price: "$5,000",
      numericPrice: 5000,
      icon: (
        <Image
          src="/images/logo/Logo2.png"
          alt="Huga Logo"
          width={72}
          height={24}
          className="h-6 w-auto object-contain"
          priority
        />
      ),
      highlighted: false,
      features: [
        "Responsive Website Development",
        "Mobile App Development",
        "API & Backend Integration",
        "Performance Optimization",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative w-full py-20 lg:py-28 bg-[#ffffff] overflow-hidden border-t border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mb-14 lg:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 mb-5"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-neutral-900" />
            <span className="text-[11px] font-semibold font-body tracking-[0.18em] text-neutral-400 uppercase">
              Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-neutral-950 tracking-[-0.02em] leading-[1.15] mb-5 font-sf-pro"
          >
            Flexible Solutions for Every
            <br />
            Digital Product Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-neutral-500 text-[14px] sm:text-[15px] lg:text-[16px] max-w-[620px] leading-[1.7] mb-8 font-body"
          >
            From brand identity to scalable digital products, we help startups and businesses build memorable experiences that drive growth, engagement, and long-term success.
          </motion.p>

          {/* Main CTA Link */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center h-[48px] pl-5 pr-[6px] rounded-full border-2 border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff]/5 transition-all group shadow-sm hover:shadow-lg cursor-pointer gap-3"
            >
              <span className="text-[12px] font-bold tracking-[0.14em] font-body uppercase">
                Get Started
              </span>
              <div className="w-[36px] h-[36px] rounded-full bg-[#0066ff] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-[28px] p-8 lg:p-10 flex flex-col justify-between border transition-all duration-300 shadow-sm
                ${card.highlighted 
                  ? "bg-[#0066ff] border-transparent text-white shadow-[0_20px_50px_rgba(0,102,255,0.2)]" 
                  : "bg-[#f8f9fa] border-neutral-200/60 hover:bg-[#ffffff] hover:border-neutral-300 hover:shadow-md text-neutral-900"
                }`}
            >
              <div>
                {/* Card Top / Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  {card.icon}
                  <span className={`text-[12px] font-bold tracking-[0.12em] font-body uppercase
                    ${card.highlighted ? "text-white" : "text-neutral-800"}`}
                  >
                    {card.plan}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-8 font-body
                  ${card.highlighted ? "text-white/80" : "text-neutral-500"}`}
                >
                  {card.description}
                </p>

                {/* Price with "Starting from" */}
                <div className="mb-8 flex flex-col">
                  <span className={`text-[10px] font-bold tracking-[0.12em] font-body uppercase mb-2
                    ${card.highlighted ? "text-white/60" : "text-neutral-400"}`}
                  >
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[42px] font-bold tracking-tight font-satoshi leading-none flex items-baseline
                      ${card.highlighted ? "text-white" : "text-[#0066ff]"}`}
                    >
                      <span>$</span>
                      <CountUp>{card.numericPrice}</CountUp>
                    </span>
                    <span className={`text-sm font-semibold font-body
                      ${card.highlighted ? "text-white/70" : "text-neutral-400"}`}
                    >
                      /project
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-10">
                  {card.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white ${card.highlighted ? "bg-white/20" : "bg-[#0066ff]"}`}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className={`text-[13.5px] font-medium font-body leading-tight
                        ${card.highlighted ? "text-white/90" : "text-neutral-600"}`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#contact"
                className={`w-full h-[52px] rounded-full flex items-center justify-center font-bold text-sm tracking-wide transition-all duration-300 font-body shadow-sm active:scale-[0.98] ${card.highlighted ? "bg-white text-[#0066ff] hover:bg-white/90" : "bg-[#0066ff] text-white hover:bg-[#0055dd]"}`}
              >
                GET STARTED
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
