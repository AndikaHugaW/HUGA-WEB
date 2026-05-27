"use client";

import { cn } from "@/lib/utils";

export function GridBackground({
  className,
  dotColor = "rgba(0, 102, 255, 0.15)",
  size = 20,
}: {
  className?: string;
  dotColor?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none",
        className
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle, ${dotColor} 1px, transparent 1px),
          linear-gradient(to right, ${dotColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${dotColor} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: "0 0, 0 0, 0 0",
      }}
    />
  );
}

