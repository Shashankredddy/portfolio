// Portfolio project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

// Achievement interface
export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  imageUrl?: string;
}

// Training/Education interface
export interface Training {
  id: string;
  title: string;
  institution: string;
  duration: string;
  description?: string;
  skills?: string[];
}

// Contact information interface
export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

// Navigation item interface
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Skill interface
export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
}
