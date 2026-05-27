"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`${props.className} flex justify-center`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col items-center gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-2xl border border-black/[0.06] bg-[#fafafa] shadow-lg shadow-black/5 max-w-xs w-full hover:border-blue-600/30 transition-colors duration-300 text-center" 
                  key={i}
                >
                  <div className="text-black/50 leading-relaxed font-normal font-sf-pro">{text}</div>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={name}
                      className="h-11 w-11 rounded-full border-2 border-blue-500/30 object-cover"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-semibold text-black tracking-tight leading-5 font-sf-pro">{name}</div>
                      <div className="text-sm leading-5 text-blue-600 tracking-tight font-normal font-sf-pro">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
