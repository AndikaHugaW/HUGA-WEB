"use client";

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const companies = [
  { name: "Islamy", logo: "islamy" },
  { name: "Luxe Cafe", logo: "Luxe Cafe" },
  { name: "Hypebeast", logo: "hypebeast", ext: "svg", sizeClass: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" },
  { name: "Vivet", logo: "logo vivet" },
  { name: "Nusava", logo: "nusava", ext: "svg", sizeClass: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" },
  { name: "OXEN", logo: "OXEN" },
];

export default function CompaniesSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-white overflow-hidden">
      <div className="relative z-10 w-full px-0">
        <InfiniteMovingCards
          items={companies}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="[--animation-duration:40s]"
        />
      </div>
    </section>
  );
}

