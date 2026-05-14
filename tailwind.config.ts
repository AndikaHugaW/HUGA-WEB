import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nippo: ["var(--font-nippo)"],
        "sf-pro": ["var(--font-sf-pro)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        pink: {
          500: "#ec4899",
          600: "#db2777",
        },
        cyan: {
          400: "#22d3ee",
        },
      },
      animation: {
        "glitch": "glitch-anim 5s infinite linear alternate-reverse",
        "glitch-2": "glitch-anim-2 1s infinite linear alternate-reverse",
      },
    },
  },
  plugins: [],
};
export default config;

