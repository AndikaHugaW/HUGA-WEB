"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: "Inquiry from contact form.",
          projectType: "General Inquiry",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Sent! Thank you.");
        setFormData({ name: "", email: "" });
      } else {
        alert(data.error || "Failed to send. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen bg-white text-black border-t border-b border-neutral-200 font-mono select-none flex flex-col"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-[1800px] mx-auto w-full border-x border-neutral-200 flex-grow flex flex-col"
      >
        {/* ═══════════════════════════════════════════════
            MAIN CONTENT GRID — 4 cols × 4 rows (fills viewport)
            Row proportions: header 2.5fr | name 1.2fr | email 1.2fr | cta 0.8fr
        ════════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-neutral-200 gap-[1px] flex-grow"
          style={{
            gridTemplateRows: "2.5fr 1.2fr 1.2fr 0.8fr",
          }}
        >
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 1  —  Badge  ·  GET IN TOUCH (×2)  ·  Nav
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R1·C1] Badge */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-6 flex flex-col justify-start relative">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-900" />
              13&nbsp;&nbsp;Ready to start?
            </span>
            {/* "+" at top-left corner of grid */}
            <span className="absolute top-[-1px] left-[-1px] text-neutral-400 text-[11px] leading-none select-none z-10">+</span>
          </div>

          {/* [R1·C2+C3] Headline + description (col-span-2) */}
          <div className="bg-white lg:col-span-2 px-6 xl:px-10 pt-10 pb-6 flex flex-col justify-start gap-6 relative">
            <h2 className="font-nippo text-[clamp(2.8rem,6.5vw,5.5rem)] font-extrabold leading-[0.88] tracking-tighter text-black uppercase mt-8">
              Contact Me
            </h2>
            <p className="font-satoshi text-[13px] text-neutral-500 leading-relaxed max-w-[320px]">
              Whether you have questions or just want
              to explore options, we&apos;re here.
            </p>
          </div>

          {/* [R1·C4] Stacked navigation */}
          <div className="bg-white px-6 xl:px-10 pt-10 pb-6 flex flex-col items-end gap-[6px]">
            {[
              { label: "HOME", href: "#home" },
              { label: "ABOUT", href: "#about" },
              { label: "PROJECTS", href: "#projects" },
              { label: "EXPERIENCE", href: "#experience" },
              { label: "CAREERS", href: "#" },
              { label: "CONTACT", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                  item.label === "CONTACT"
                    ? "text-black font-black"
                    : "text-neutral-500 hover:text-black font-bold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 2  —  ∅  ·  NAME field  ·  ∅  ·  ∅
              (input is in col 2 only — diagonal stagger step 1)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R2·C1] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* [R2·C2] NAME input */}
          <div className="bg-white px-6 xl:px-10 pt-6 pb-8 flex flex-col justify-end relative">
            <div className="flex flex-col gap-1.5">
              <label className="text-[8px] font-black tracking-[0.18em] uppercase text-neutral-500">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="YOUR NAME"
                className="bg-transparent outline-none border-none text-neutral-900 font-satoshi text-[15px] font-medium placeholder:text-neutral-350 uppercase tracking-wide w-full"
              />
            </div>
            {/* intersection markers */}
            <span className="absolute bottom-[-1px] left-[-1px] text-neutral-400 text-[11px] leading-none select-none z-10">
              +
            </span>
            <span className="absolute bottom-5 right-5 text-neutral-350 text-[10px] select-none">
              ::
            </span>
          </div>

          {/* [R2·C3] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* [R2·C4] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 3  —  ∅  ·  ∅  ·  EMAIL field  ·  ∅
              (input is in col 3 only — diagonal stagger step 2)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R3·C1] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* [R3·C2] Negative space */}
          <div className="bg-white relative hidden lg:block">
            <span className="absolute bottom-[-1px] left-[-1px] text-neutral-400 text-[11px] leading-none select-none z-10">
              +
            </span>
          </div>

          {/* [R3·C3] EMAIL input */}
          <div className="bg-white px-6 xl:px-10 pt-6 pb-8 flex flex-col justify-start relative">
            <div className="flex flex-col gap-1.5">
              <label className="text-[8px] font-black tracking-[0.18em] uppercase text-neutral-500">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="EMAIL@ADDRESS.COM"
                className="bg-transparent outline-none border-none text-neutral-900 font-satoshi text-[15px] font-medium placeholder:text-neutral-350 uppercase tracking-wide w-full"
              />
            </div>
            <span className="absolute bottom-[-1px] left-[-1px] text-neutral-400 text-[11px] leading-none select-none z-10">
              +
            </span>
            <span className="absolute bottom-5 right-5 text-neutral-350 text-[10px] select-none">
              ::
            </span>
          </div>

          {/* [R3·C4] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ROW 4  —  ∅  ·  ∅  ·  Terms+Location  ·  LET'S TALK
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* [R4·C1] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* [R4·C2] Negative space */}
          <div className="bg-white relative hidden lg:block" />

          {/* [R4·C3] Terms left + Location right */}
          <div className="bg-white px-6 xl:px-10 py-5 flex items-start justify-between gap-4 relative">
            <p className="text-[8px] leading-[1.6] text-neutral-500 uppercase tracking-wider max-w-[160px]">
              By submitting, you agree to our{" "}
              <span className="text-neutral-800 font-black">Terms</span> and{" "}
              <span className="text-neutral-800 font-black">
                Privacy Policy
              </span>
              .
            </p>
            <p className="text-[8px] text-neutral-500 uppercase tracking-wider text-right whitespace-nowrap">
              We are based
              <br />
              in{" "}
              <span className="text-neutral-800 font-black">
                Solo, Indonesia
              </span>
            </p>
          </div>

          {/* [R4·C4] LET'S TALK CTA button — full height of cell */}
          <div className="bg-white p-0 flex relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full h-full flex items-center justify-between px-6 xl:px-10 border-none bg-transparent hover:bg-neutral-50 transition-colors duration-300 cursor-pointer"
            >
              <span className="text-[11px] font-black tracking-[0.18em] uppercase text-black">
                {isSubmitting ? "Sending…" : "Let's Talk"}
              </span>
              <span className="text-lg font-light text-neutral-400 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        </div>
        {/* end main grid */}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FOOTER BAR  —  Logo · Phone+Email · Socials · ©
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-neutral-200 gap-[1px] border-t border-neutral-200">
          {/* Logo */}
          <div className="bg-white px-6 xl:px-10 py-5 flex items-center">
            <Image
              src="/images/logo/Logo2.png"
              alt="Huga Studio"
              width={72}
              height={24}
              className="h-5 w-auto object-contain"
            />
          </div>

          {/* Phone + Email (2 lines) */}
          <div className="bg-white px-6 xl:px-10 py-5 flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] font-bold tracking-widest text-neutral-700">
              (62) 878-2193-0072
            </span>
            <a
              href="mailto:andikahuga34@gmail.com"
              className="text-[10px] font-bold tracking-widest text-neutral-900 uppercase hover:text-blue-600 transition-colors"
            >
              andikahuga34@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="bg-white px-6 xl:px-10 py-5 flex items-center justify-center gap-5">
            {[
              { label: "GH", url: "https://github.com/andikahuga" },
              { label: "LI", url: "https://www.linkedin.com/in/andika-huga-widyatama-737413246" },
              { label: "IG", url: "https://www.instagram.com/huga_studio/" },
              { label: "WA", url: "https://wa.me/6287821930072" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold tracking-widest text-neutral-700 hover:text-black transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="bg-white px-6 xl:px-10 py-5 flex items-center justify-end">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400">
              &copy; 2026 HUGA STUDIO
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}
