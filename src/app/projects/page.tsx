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
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-[-0.04em] leading-[0.92]"
            >
              Selected <span className="text-[#00ff88]">Work</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[18px] opacity-[0.72] max-w-[620px] mb-8 leading-[1.8] font-normal font-sf-pro"
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
              className="flex flex-col md:flex-row gap-4 items-center p-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl backdrop-blur-[12px]"
            >
              {/* Search Bar */}
              <div className="relative w-full group flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 group-focus-within:text-[#00ff88] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white focus:outline-none transition-all placeholder:text-gray-600 rounded-xl font-normal font-sf-pro"
                />
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px h-8 bg-white/10"></div>

              {/* Category Filter Dropdown */}
              <div className="relative w-full md:w-72">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-6 py-3.5 bg-transparent rounded-xl text-white hover:bg-white/5 transition-all font-normal font-sf-pro"
                >
                  <span className={selectedCategory === "All Projects" ? "text-gray-400" : "text-[#00ff88] font-normal"}>
                    {selectedCategory}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 right-0 w-full md:w-[300px] mt-4 bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                  >
                    <div className="p-[14px_16px]">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 hover:bg-white/5 transition-colors text-sm tracking-wide font-sf-pro ${
                            selectedCategory === cat ? "text-[#00ff88] bg-[rgba(0,255,136,0.05)] font-normal" : "text-gray-400 font-normal"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
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
                      <p className="text-white opacity-[0.72] text-[18px] leading-[1.8] mb-8 font-normal font-sf-pro">
                        {featuredProject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredProject.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/5 rounded-md text-[10px] font-normal tracking-wider text-white/70 uppercase font-sf-pro">
                            {tag}
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

                      <div className="mt-auto flex flex-col sm:flex-row gap-4">
                        <button className="px-6 py-3 bg-[#00ff88] text-black font-normal font-sf-pro rounded-full shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all duration-300 text-sm w-full sm:w-auto text-center">
                          Live Preview
                        </button>
                        <button className="px-6 py-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.1)] rounded-full transition-all duration-300 text-sm font-normal font-sf-pro w-full sm:w-auto text-center inline-flex justify-center items-center gap-2">
                          Case Study
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
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
                        <div className="text-[10px] font-normal text-white/40 uppercase tracking-widest mt-auto font-sf-pro">
                          {project.tags.slice(0, 3).join(' • ')}
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
