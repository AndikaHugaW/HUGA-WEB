export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Revive Website",
    category: "Web Development",
    image: "/images/projects/revive-web-min.webp",
    description: "A professional business landing page with modern aesthetics and smooth animations.",
    tags: ["NEXT.JS", "SUPABASE", "SCIKIT-LEARN"],
    featured: true
  },
  {
    id: 2,
    title: "Revive AI",
    category: "Mobile App Design",
    image: "/images/projects/revive-dasboard-min-v2.webp",
    description: "AI-powered dashboard design for modern SaaS platforms.",
    tags: ["API INTEGRATION", "NEXT.JS", "SCIKIT-LEARN"],
    featured: false
  },
  {
    id: 3,
    title: "Honda Pekalongan",
    category: "Web Development",
    image: "/images/projects/honda-pekalongan.webp",
    description: "Official dealer website for Honda Pekalongan with catalog and service booking features.",
    tags: ["NEXT.JS", "SUPABASE", "FIGMA"],
    featured: false
  },
  {
    id: 4,
    title: "HYPEBEAST Design App",
    category: "Mobile Design",
    image: "/images/projects/hypebeast-app-v2.webp",
    description: "Fashion e-commerce app concept for high-end streetwear enthusiasts.",
    tags: ["UX/UI DESIGN", "MOBILE OPTIMIZATION", "USABILITY TESTING"],
    featured: false
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    category: "Web Design",
    image: "/images/projects/hypebeast-web-v2.webp",
    description: "Modern landing page concept for streetwear and culture news.",
    tags: ["WEB DESIGN", "RESPONSIVE", "UI/UX"],
    featured: false
  },
  {
    id: 6,
    title: "Luxe Cafe",
    category: "App Development",
    image: "/images/projects/luxe-cafe-app.webp",
    description: "Premium coffee shop application with ordering and loyalty system.",
    tags: ["FLUTTER", "FIREBASE", "DART"],
    featured: false
  }
];
