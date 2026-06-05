import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/HeroSection";
import CompaniesSection from "@/components/sections/CompaniesSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// OPTIMASI: Dynamic imports untuk section yang tidak terlihat saat pertama kali load
// Ini mengurangi initial JS bundle secara signifikan
const WelcomeSection = dynamic(() => import("@/components/sections/WelcomeSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const CertificatesSection = dynamic(() => import("@/components/sections/CertificatesSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="min-h-[600px]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <CompaniesSection />
      <WelcomeSection />
      <PricingSection />
      <AboutSection />
      <CertificatesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ExperienceSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
