"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  children: string | number;
  startOnMount?: boolean;
  className?: string;
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds (delay before counting starts)
  trigger?: boolean; // manual trigger override (takes priority over viewport check)
}

// Premium Ease Out Expo (starts fast, slows down smoothly)
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function CountUp({
  children,
  startOnMount = false,
  className = "",
  duration = 2000,
  delay = 0,
  trigger,
}: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  // once: false allows the viewport animation to re-trigger when scrolled back in
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });

  const originalStr = String(children);
  const match = originalStr.match(/^(\d+(?:\.\d+)?)(.*)$/);

  const hasNumber = !!match;
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : originalStr;

  // Determine decimal places (e.g. 4.8 has 1 decimal place)
  const decimalMatches = match ? match[1].match(/\.(\d+)/) : null;
  const decimalPlaces = decimalMatches ? decimalMatches[1].length : 0;

  const [displayValue, setDisplayValue] = useState(
    hasNumber ? (0).toFixed(decimalPlaces) : originalStr
  );

  const isTriggered = trigger !== undefined ? trigger : (startOnMount || isInView);

  useEffect(() => {
    if (!hasNumber) return;

    if (!isTriggered) {
      // Reset back to 0 when out of view/inactive
      setDisplayValue((0).toFixed(decimalPlaces));
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const startAnimation = () => {
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = easeOutExpo(progress);
        const currentValue = easeProgress * targetNumber;

        setDisplayValue(currentValue.toFixed(decimalPlaces));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
    };

    const delayTimeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTriggered, targetNumber, duration, delay, hasNumber, decimalPlaces]);

  const formatNumber = (val: string) => {
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <span ref={containerRef} className={`inline-flex items-baseline ${className}`}>
      {hasNumber ? (
        <>
          <span>{formatNumber(displayValue)}</span>
          {suffix && <span className="select-none leading-none">{suffix}</span>}
        </>
      ) : (
        <span>{originalStr}</span>
      )}
    </span>
  );
}
