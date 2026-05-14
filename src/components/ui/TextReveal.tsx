"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: "fade" | "glitch" | "letter" | "word";
  duration?: number;
  style?: React.CSSProperties;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  variant = "fade",
  duration = 0.5,
  style,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  // Letter by letter animation
  if (variant === "letter") {
    const letters = text.split("");
    return (
      <motion.div
        ref={ref}
        className={`flex flex-wrap ${className}`}
        initial="hidden"
        animate={controls}
      >
        {letters.map((letter, index) => (
          <span
            key={index}
            style={{ overflow: "hidden", paddingBottom: "0.15em", lineHeight: "1.2" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: delay + index * 0.03,
                    duration: duration,
                  },
                },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </motion.div>
    );
  }

  // Word by word animation
  if (variant === "word") {
    const words = text.split(" ");
    return (
      <motion.div
        ref={ref}
        className={`flex flex-wrap ${className}`}
        initial="hidden"
        animate={controls}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="mr-2"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay: delay + index * 0.1,
                  duration: duration,
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Glitch effect
  if (variant === "glitch") {
    return (
      <motion.div
        ref={ref}
        className={`glitch ${className}`}
        data-text={text}
        style={{
          ...style,
          display: "block",
          paddingBottom: "0.2em",
        }}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: delay,
              duration: duration,
            },
          },
        }}
      >
        {text}
      </motion.div>
    );
  }

  // Default fade animation
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: delay,
            duration: duration,
            ease: [0.6, -0.05, 0.01, 0.99],
          },
        },
      }}
    >
      {text}
    </motion.div>
  );
}

