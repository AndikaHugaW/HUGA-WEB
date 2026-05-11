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
    title: "Revive Health Platform",
    category: "Web Development",
    image: "/images/projects/revive-web-min.webp",
    description: "A modern healthcare platform focused on real-time patient monitoring and seamless appointment booking.",
    tags: ["NEXT.JS", "SUPABASE", "SCIKIT-LEARN"],
    featured: true
  },
  {
    id: 2,
    title: "Revive AI Healthcare",
    category: "Mobile App Design",
    image: "/images/projects/revive-dasboard-min-v2.webp",
    description: "AI-powered dashboard design for predictive analytics and modern health insights.",
    tags: ["API INTEGRATION", "NEXT.JS", "SCIKIT-LEARN"],
    featured: false
  },
  {
    id: 3,
    title: "Honda Pekalongan",
    category: "Web Development",
    image: "/images/projects/honda-pekalongan.webp",
    description: "Official dealer platform with an integrated digital showroom and test-drive booking system.",
    tags: ["NEXT.JS", "SUPABASE", "FIGMA"],
    featured: false
  },
  {
    id: 4,
    title: "HYPEBEAST Design App",
    category: "Mobile Design",
    image: "/images/projects/hypebeast-app-v2.webp",
    description: "High-end streetwear discovery app designed for seamless drops and mobile-first shopping.",
    tags: ["UX/UI DESIGN", "MOBILE OPTIMIZATION", "USABILITY TESTING"],
    featured: false
  },
  {
    id: 5,
    title: "HYPEBEAST Website",
    category: "Web Design",
    image: "/images/projects/hypebeast-web-v2.webp",
    description: "Premium e-commerce architecture and branding for hype culture enthusiasts.",
    tags: ["WEB DESIGN", "RESPONSIVE", "UI/UX"],
    featured: false
  },
  {
    id: 6,
    title: "Luxe Cafe",
    category: "App Development",
    image: "/images/projects/luxe-cafe-app.webp",
    description: "Elevated cafe experience application featuring mobile ordering and a modern loyalty system.",
    tags: ["FLUTTER", "FIREBASE", "DART"],
    featured: false
  }
];
