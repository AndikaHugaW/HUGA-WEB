"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    logo: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,white_2%,white_98%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex w-max animate-scroll flex-nowrap gap-8 md:gap-12 lg:gap-16",
            pauseOnHover && "hover:[animation-play-state:paused]",
            start && "animate-scroll"
          )}
        >
          {items.map((item, idx) => (
            <li
              className="relative flex-shrink-0"
              key={`${item.name}-${idx}`}
            >
              {item.logo && (
                <div className="group bg-white hover:bg-[#00ff88] rounded-lg px-10 md:px-12 lg:px-16 py-10 md:py-12 lg:py-16 shadow-sm hover:shadow-md hover:shadow-[#00ff88]/20 transition-all duration-300 flex items-center justify-center w-[240px] md:w-[280px] lg:w-[320px] h-[140px] md:h-[160px] lg:h-[180px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/companies/${item.logo}.svg`}
                    alt={item.name}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              )}
            </li>
          ))}
          {/* Duplicate items for seamless loop */}
          {items.map((item, idx) => (
            <li
              className="relative flex-shrink-0"
              key={`${item.name}-duplicate-${idx}`}
            >
              {item.logo && (
                <div className="group bg-white hover:bg-[#00ff88] rounded-lg px-10 md:px-12 lg:px-16 py-10 md:py-12 lg:py-16 shadow-sm hover:shadow-md hover:shadow-[#00ff88]/20 transition-all duration-300 flex items-center justify-center w-[240px] md:w-[280px] lg:w-[320px] h-[140px] md:h-[160px] lg:h-[180px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/companies/${item.logo}.svg`}
                    alt={item.name}
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

