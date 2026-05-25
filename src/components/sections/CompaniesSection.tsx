"use client";

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const companies = [
  { name: "Islamy", logo: "islamy" },
  { name: "Luxe Cafe", logo: "Luxe Cafe" },
  { name: "Hypebeast", logo: "hypebeast logo" },
  { name: "Vivet", logo: "logo vivet" },
  { name: "Nusava", logo: "nusava" },
  { name: "OXEN", logo: "OXEN" },
];

export default function CompaniesSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-black overflow-hidden">
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

