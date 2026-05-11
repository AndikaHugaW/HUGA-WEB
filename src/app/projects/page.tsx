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
  "Artificial Intelligence"
];

// Generate 20 projects by repeating original projects
const allProjectsData: Project[] = Array.from({ length: 20 }, (_, i) => {
  const original = originalProjects[i % originalProjects.length];
  const isOriginal = i < originalProjects.length;
  let title = isOriginal ? original.title : (i + 1).toString().padStart(2, '0');
  
  // Custom names for specific projects
  if (i === 6) title = "Oxen Ai"; // Project 7
  if (i === 7) title = "Vivet";   // Project 8
  
  return {
    ...original,
    id: i + 1,
    title,
    image: i >= 8 ? "https://placehold.co/800x500/1a1a1a/1a1a1a/png" : original.image,
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
                         project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Projects" || 
                           project.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                           // Handle mapping between project categories and filter categories
                           (selectedCategory === "Mobile App" && (project.category.includes("Mobile") || project.category.includes("App"))) ||
                           (selectedCategory === "Website" && (project.category.includes("Web") || project.category.includes("Website"))) ||
                           (selectedCategory === "Logo Design" && project.category.toLowerCase().includes("logo")) ||
                           (selectedCategory === "UI / UX Design" && project.category.includes("Design"));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden flex-grow">
        {/* Grid Background */}
        <GridBackground 
          className="opacity-40" 
          dotColor="rgba(0, 255, 136, 0.2)"
          size={20}
        />

        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Header */}
          <div className="mb-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#00ff88] mb-8 hover:underline group"
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
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              All <span className="text-[#00ff88]">Projects</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xl max-w-3xl mb-12"
            >
              A comprehensive showcase of my work in web development, UI/UX design, and digital experiences.
            </motion.p>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 group-focus-within:text-[#00ff88] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search projects by name or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00ff88]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative w-full md:w-64">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  <span className={selectedCategory === "All Projects" ? "text-gray-400" : "text-[#00ff88] font-bold"}>
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
                    className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 hover:bg-white/5 transition-colors ${
                          selectedCategory === cat ? "text-[#00ff88] bg-white/5" : "text-gray-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image Area */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      quality={80}
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Info Area */}
                  <div>
                    <div className="text-[#00ff88] text-sm font-bold uppercase tracking-wider mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-xl">No projects found matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setSelectedCategory("All Projects");}}
                  className="mt-4 text-[#00ff88] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
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
