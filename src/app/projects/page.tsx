"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects as originalProjects, Project } from "@/constants/projects";
import { GridBackground } from "@/components/ui/GridBackground";
import ProjectModal from "@/components/ui/ProjectModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchComponent from "@/components/ui/animated-glowing-search-bar";

const categories = [
  "All Projects",
  "UI / UX Design",
  "Mobile App",
  "Website",
  "Logo Design",
  "Machine Learning",
  "AI"
];

// Generate 20 projects by repeating original projects
const allProjectsData: Project[] = Array.from({ length: 20 }, (_, i) => {
  const original = originalProjects[i % originalProjects.length];
  const isOriginal = i < originalProjects.length;
  let title = isOriginal ? original.title : (i + 1).toString().padStart(2, '0');
  
  // Custom names for specific projects
  let category = original.category;
  let description = original.description;
  let tags = original.tags;
  let previewImages = original.previewImages;

  if (i === 6) {
    title = "Oxen Ai";
    category = "AI";
    description = "Oxen Ai is a next-generation SaaS platform engineered to democratize artificial intelligence. Built for scale and speed, it transforms complex data pipelines into intuitive, visual workflows. Stop wrestling with infrastructure and start deploying enterprise-grade AI solutions in minutes, all within a beautifully crafted, friction-free ecosystem.";
    tags = ["AI SAAS", "MACHINE LEARNING", "UX/UI DESIGN"];
    previewImages = [
      {
        src: "/images/projects/oxen-preview-1.webp",
        title: "Visual Identity & Branding",
        description: "Forging trust through design. The Oxen Ai visual identity strips away the complexity of artificial intelligence, opting instead for striking geometric precision and a minimalist color palette. It's a brand mark engineered to communicate unyielding reliability, forward momentum, and the absolute clarity of modern enterprise software."
      },
      {
        src: "/images/projects/oxen-preview-2.webp",
        title: "Intelligent Interface",
        description: "A command center built for clarity. We designed the Oxen Ai platform interface to empower teams by turning overwhelming datasets into actionable intelligence. With ultra-fast navigation, dynamic dark-mode aesthetics, and zero-clutter architecture, managing complex ML models has never felt this effortless—or looked this premium."
      }
    ];
  }
  if (i === 7) {
    title = "Vivet";   // Project 8
    category = "Logo Design";
    description = "Vivet is an unapologetic, high-octane streetwear brand born in Indonesia, crafted with vision by Huga Studio. Fusing urban grit with premium aesthetics, Vivet redefines modern street culture through bold graphics, authentic identity, and a relentless attitude. It's more than fashion; it's a movement.";
    tags = ["BRANDING", "STREETWEAR", "LOGO DESIGN"];
    previewImages = [
      {
        src: "/images/projects/vivet-preview-1.webp",
        title: "Digital Ecosystem",
        description: "A seamless and premium shopping experience built across both web and mobile platforms. We engineered the digital ecosystem with frictionless navigation, ultra-fast load times, and a buttery-smooth checkout process. The platform also integrates an exclusive 'drop' notification system and an interactive lookbook, ensuring that users deeply engage with the Vivet lifestyle from anywhere in the world."
      },
      {
        src: "/images/projects/apparel.webp",
        title: "Signature Apparel",
        description: "Every piece is engineered for the streets, combining raw utilitarian aesthetics with premium heavyweight fabrics. We focused on delivering uncompromising quality through custom garment washes, distressed detailing, and striking typography that speaks without saying a word. The collection serves as an unapologetic uniform for modern youth culture, blurring the line between high fashion and everyday streetwear."
      },
      {
        src: "/images/projects/label.webp",
        title: "The Flagship Experience",
        description: "A brutalist yet refined space designed to disrupt the traditional retail experience. The Vivet flagship store is more than just a place to shop—it's an immersive architectural manifestation of our brand ethos. Featuring cold concrete textures, dramatic ambient lighting, and minimalist metallic fixtures, the interior creates a gallery-like atmosphere where every garment is presented as a work of modern art."
      }
    ];
  }
  
  if (i === 8) {
    title = "Islamy Academy AI";
    category = "AI";
    description = "Islamy Academy AI is an intelligent e-learning ecosystem designed to modernize Islamic education. Engineered with personalized AI pathing and smart interactive tools, it transforms traditional curricula into dynamic, highly immersive digital courses. Delve into Quranic insights, Islamic history, and jurisprudence through a premium, distraction-free environment that adapts to your learning pace.";
    tags = ["EdTech", "AI", "Website"];
  }
  if (i === 9) {
    title = "Veraflora";
    category = "Logo Design";
    tags = ["Branding", "Logo Design", "UI/UX"];
  }
  if (i === 10) {
    title = "Nexa";
    category = "Logo Design";
    tags = ["Branding", "Logo Design", "UI/UX"];
  }
  
  let image = original.image;
  if (i === 6) {
    image = "/images/projects/oxen-ai.webp";
  } else if (i === 7) {
    image = "/images/projects/vivet-v2.webp";
  } else if (i >= 8) {
    image = "https://placehold.co/800x500/1a1a1a/1a1a1a/png";
  }

  return {
    ...original,
    id: i + 1,
    title,
    category,
    description,
    tags,
    image,
    previewImages,
  };
});

const formatTag = (tag: string) => {
  const tagMap: Record<string, string> = {
    "NEXT.JS": "Next.js",
    "SUPABASE": "Supabase",
    "SCIKIT-LEARN": "Scikit-learn",
    "API INTEGRATION": "API Integration",
    "FIGMA": "Figma",
    "UX/UI DESIGN": "UI/UX Design",
    "UI/UX DESIGN": "UI/UX Design",
    "MOBILE OPTIMIZATION": "Mobile Optimization",
    "USABILITY TESTING": "Usability Testing",
    "WEB DESIGN": "Web Design",
    "RESPONSIVE": "Responsive",
    "UI/UX": "UI/UX",
    "FLUTTER": "Flutter",
    "FIREBASE": "Firebase",
    "DART": "Dart",
    "AI SAAS": "AI SaaS",
    "MACHINE LEARNING": "Machine Learning",
    "BRANDING": "Branding",
    "STREETWEAR": "Streetwear",
    "LOGO DESIGN": "Logo Design"
  };
  
  const upperTag = tag.toUpperCase();
  if (tagMap[upperTag]) return tagMap[upperTag];
  
  return tag
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter logic
  const filteredProjects = allProjectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Projects" || 
                           (selectedCategory === "Website" && project.category.toLowerCase().includes("web")) ||
                           (selectedCategory === "Mobile App" && (project.category.toLowerCase().includes("mobile") || project.category.toLowerCase().includes("app"))) ||
                           (selectedCategory === "Machine Learning" && project.tags.some(t => t.toLowerCase().includes("scikit-learn"))) ||
                           (selectedCategory === "AI" && (project.title.includes("AI") || project.description.includes("AI"))) ||
                           (selectedCategory === "Logo Design" && project.category.toLowerCase().includes("logo")) ||
                           (selectedCategory === "UI / UX Design" && (project.category.includes("Design") || project.tags.some(t => t.toLowerCase().includes("ui"))));
    
    return matchesSearch && matchesCategory;
  });

  const featuredProject = filteredProjects.length > 0 ? filteredProjects[0] : null;
  const gridProjects = filteredProjects.length > 1 ? filteredProjects.slice(1) : [];

  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-[40px] overflow-hidden flex-grow">
        {/* Grid Background */}
        <GridBackground 
          className="opacity-[0.08]" 
          dotColor="rgba(0, 255, 136, 0.2)"
          size={16}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12 relative z-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,rgba(74,222,128,0.12),transparent_70%)] blur-[80px] -z-10 rounded-full pointer-events-none" />

            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#00ff88] mb-8 hover:underline group font-normal font-sf-pro"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-[-0.04em] leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-400/80"
            >
              Selected Work
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-base max-w-[540px] mb-8 leading-[1.7] font-normal font-sf-pro"
            >
              A curated showcase of my digital experiences, blending modern development with AI-driven innovation.
            </motion.p>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-normal text-white/50 mb-12 uppercase tracking-[0.2em] font-sf-pro"
            >
              <span className="text-white/80">12+ Projects</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
              <span className="text-white/80">5 Core Techs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
              <span className="text-white/80">3 Yrs Exp</span>
            </motion.div>

            {/* Integrated Search and Filter Toolbar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center w-full mb-16 relative z-50"
            >
              <div className="relative w-full">
                <SearchComponent 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search projects..."
                  onFilterClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  selectedCategory={selectedCategory}
                />

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-50 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 w-[320px] mt-4 bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                  >
                    {/* Dropdown Header */}
                    <div className="px-4 pt-4 pb-2 border-b border-white/5">
                      <p className="text-white/30 text-[11px] uppercase tracking-widest font-sf-pro">Filter by Category</p>
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-sf-pro flex items-center justify-between ${
                            selectedCategory === cat
                              ? "text-[#00ff88] bg-[rgba(0,255,136,0.07)] border border-[rgba(0,255,136,0.12)]"
                              : "text-white/50 border border-transparent hover:text-white hover:bg-white/[0.04] hover:border-white/[0.06]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              selectedCategory === cat ? "bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.8)]" : "bg-white/20 group-hover:bg-white/40"
                            }`} />
                            <span className="text-sm">{cat}</span>
                          </span>
                          {selectedCategory === cat && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff88]">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Active Category Indicator */}
              {selectedCategory !== "All Projects" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#00ff88] text-xs rounded-full font-sf-pro shadow-[0_0_15px_rgba(0,255,136,0.05)]"
                >
                  <span>Category: {selectedCategory}</span>
                  <button 
                    onClick={() => setSelectedCategory("All Projects")}
                    className="hover:text-white transition-colors ml-1 p-0.5 rounded-full hover:bg-white/10"
                    title="Clear filter"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {filteredProjects.length > 0 ? (
            <>
              {/* Featured Project */}
              {featuredProject && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group relative cursor-pointer mb-16 md:mb-24 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-[2rem] overflow-hidden hover:border-[rgba(74,222,128,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] hover:scale-[1.03] flex flex-col lg:flex-row"
                  onClick={() => setSelectedProject(featuredProject)}
                >
                  <div className="lg:w-3/5 relative aspect-[16/10] lg:aspect-auto lg:h-[540px] overflow-hidden">
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      quality={90}
                      priority
                    />
                    <div className="absolute top-6 left-6 px-5 py-2.5 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-normal tracking-[0.2em] uppercase border border-white/10 font-sf-pro">
                      EDITOR&apos;S PICK
                    </div>
                  </div>
                  
                  <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-r from-black/0 to-black/40">
                    <div className="max-w-[420px] w-full">
                      <div className="text-[#00ff88] text-xs font-normal uppercase tracking-[0.2em] mb-4 font-sf-pro">
                        {featuredProject.category}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-[#00ff88] transition-colors duration-500">
                        {featuredProject.title}
                      </h2>
                      <p className="text-white/60 text-base leading-relaxed mb-8 font-normal font-sf-pro">
                        {featuredProject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredProject.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-md text-xs font-normal text-white/70 font-sf-pro transition-colors duration-300 hover:bg-white/[0.06]">
                            {formatTag(tag)}
                          </span>
                        ))}
                      </div>

                      {/* Mini Metrics / Results */}
                      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                        <div>
                          <div className="text-2xl font-bold text-white mb-1">98%</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-normal font-sf-pro">Faster Booking</div>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div>
                          <div className="text-2xl font-bold text-white mb-1">+12K</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-normal font-sf-pro">Monthly Users</div>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-6">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (featuredProject.link) window.open(featuredProject.link, "_blank");
                          }}
                          className="px-6 py-2.5 bg-[#00ff88] text-black font-medium font-sf-pro rounded-full shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Live Preview
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(featuredProject);
                          }}
                          className="px-2 py-2.5 text-white/50 hover:text-white transition-all duration-300 text-sm font-normal font-sf-pro inline-flex items-center gap-1.5 group/btn"
                        >
                          Case Study
                          <svg 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid Projects */}
              {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {gridProjects.map((project, index) => (
                      <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                      className="group relative cursor-pointer bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.04)] rounded-3xl p-4 hover:border-[rgba(74,222,128,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] flex flex-col h-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image Area */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-[#0a0a0a]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-90 group-hover:opacity-100"
                          quality={80}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="px-6 py-3 bg-white text-black font-normal font-sf-pro text-sm tracking-wide rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                            View Case Study
                          </span>
                        </div>
                      </div>
                      
                      {/* Info Area */}
                      <div className="px-2 pb-2 flex-grow flex flex-col">
                        <div className="text-[#00ff88] text-[11px] font-normal uppercase tracking-[0.2em] mb-3 font-sf-pro">
                          {project.category}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow font-normal font-sf-pro">
                          {project.description}
                        </p>
                        <div className="text-xs font-normal text-white/40 mt-auto font-sf-pro">
                          {project.tags.slice(0, 3).map(formatTag).join(' • ')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-32 text-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-3xl">
              <p className="text-gray-400 text-xl mb-4 font-normal font-sf-pro">No projects found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(""); setSelectedCategory("All Projects");}}
                className="text-[#00ff88] font-normal font-sf-pro hover:underline tracking-wide"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
