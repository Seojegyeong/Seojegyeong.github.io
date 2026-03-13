import type { StaticImageData } from "next/image";

export type Profile = {
  name: string;
  role: string;
  slogan: string;
  email: string;
  github: string;
  linkedIn: string;
  blog: string;
  location: string;
};

export type Education = {
  school: string;
  period: string;
  degree: { name: string; info?: string }[];
  graduate: boolean;
  graduateDate: string;
  gpa?: number;
};

export type ExperienceType = "Certification" | "Activity" | "Exchange";

export type ExperienceItem = {
  type: ExperienceType;
  title: string;
  org: string;
  period: string;
  desc?: string;
  href?: string | null;
  fileUrl?: string | null;
};

export type ProjectCategory = "B2B SaaS" | "Public Service";

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  isLead?: boolean;
  isCore?: boolean;
  category: ProjectCategory;
  description: string;
  tech: string[];
  image?: string | StaticImageData;
  videoUrl?: string;
  slides?: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  collaboration?: string[];
  keyLearning?: string;
};

export type Competency = {
  title: string;
  description: string;
};
