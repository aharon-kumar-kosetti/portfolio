export const profile = {
  name: "Aharon Kumar Kosetti",
  role: "Full-Stack Developer",
  tagline: "I build scalable, real-world applications — from hackathon-winning products to AI-driven systems.",
  location: "Amalapuram, Andhra Pradesh, India",
  email: "kaharonkumar@gmail.com",
  phone: "+91 7702897528",
  github: "https://github.com/aharon-kumar-kosetti",
  linkedin: "https://www.linkedin.com/in/aharon-kumar-kosetti/",
  instagram: "https://www.instagram.com/theaharonkosetti/",
  youtube: "https://www.youtube.com/@AharonKosetti",
  leetcode: "https://leetcode.com/u/aharonkosetti/",
  avatar: "https://avatars.githubusercontent.com/u/221158300?v=4",
  resume: "/Aharon-Kosetti-Resume.pdf",
}

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export const projects = [
  {
    id: "medivault",
    name: "MediVault",
    badge: "2nd Place · Udhbhav 2k26",
    description:
      "Patient-owned digital health records platform with encrypted vaults, consent governance, emergency access, and GPT-4o AI summaries — removing single-provider lock-in.",
    points: [
      "Patient-owned data model giving users control over 100% of their medical records",
      "GPT-4o integration auto-summarizes medical history for clinicians",
      "3-tier architecture with role-based access control",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Appwrite", "GPT-4o"],
    repo: "https://github.com/aharon-kumar-kosetti/medivault",
    demo: "https://medivault-zeta-seven.vercel.app",
    stars: 5,
    forks: 3,
    featured: true,
    span: "lg:col-span-2",
  },
  {
    id: "blood-link",
    name: "Blood Link",
    badge: "Hackoverflow 2k25",
    description:
      "Real-time blood donation and management system connecting donors, recipients, and blood banks — built in 24 hours with team Code Avengers.",
    points: [
      "Real-time matching on blood group and location",
      "Centralized dashboard tracking inventory across donation centers",
    ],
    stack: ["React", "TypeScript", "Node.js", "Tailwind"],
    repo: "https://github.com/aharon-kumar-kosetti/Blood-Link",
    demo: "https://blood-link-alpha.vercel.app",
    stars: 2,
    forks: 2,
    featured: true,
    span: "",
  },
  {
    id: "project-nexus",
    name: "Project Nexus",
    badge: null,
    description:
      "Full-stack project command center for planning, tracking, and deploying software — kanban workflow, secure auth, document uploads, and role-based access.",
    points: [],
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    repo: "https://github.com/aharon-kumar-kosetti/Project-Nexus",
    demo: null,
    stars: 2,
    forks: 0,
    featured: true,
    span: "",
  },
  {
    id: "dsa-365",
    name: "DSA-365-Days",
    badge: "365 days",
    description:
      "A year of data structures and algorithms in Java — clean code, optimal approaches, and interview preparation.",
    points: [],
    stack: ["Java", "DSA"],
    repo: "https://github.com/aharon-kumar-kosetti/DSA-365-Days",
    demo: null,
    stars: 2,
    forks: 0,
    featured: false,
    span: "",
  },
]

export const experience = [
  {
    company: "Pynyx Private Limited",
    role: "Software Development Engineer Intern",
    period: "Jul 2026 — Present",
    current: true,
    points: [
      "Developing full-stack applications across frontend and backend, integrating REST APIs, databases, and third-party services",
      "Building AI-powered features with LLMs, contributing to Agentic AI and intelligent automation initiatives",
      "Testing, debugging, and optimizing for performance, scalability, and reliability",
      "Collaborating with engineering teams; documented 5+ technical workflows",
    ],
  },
  {
    company: "SRKR Engineering College, Bhimavaram",
    role: "B.Tech — Computer Science & Design",
    period: "2025 — 2029 (expected)",
    current: false,
    points: ["CGPA: 8.5"],
  },
]

export const skills = {
  Languages: ["TypeScript", "JavaScript", "Java", "Python", "C", "SQL"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Vite", "HTML/CSS"],
  "Backend": ["Node.js", "NestJS", "Express", "REST APIs", "Drizzle ORM"],
  "Data & Infra": ["PostgreSQL", "MySQL", "Supabase", "Neon", "Appwrite", "Vercel"],
  "Practices": ["Git & GitHub", "JWT Auth", "CI/CD", "Vitest", "Agentic AI / LLM APIs"],
}

export const marqueeItems = [
  "React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Tailwind CSS",
  "NestJS", "Drizzle ORM", "Supabase", "GPT-4o", "Vite", "Java", "Vitest", "CI/CD",
]
