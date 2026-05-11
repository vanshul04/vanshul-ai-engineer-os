import { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Mission = {
  id: string;
  title: string;
  category: string;
  xp: number;
  done: boolean;
};

export type SkillNode = {
  id: string;
  name: string;
  level: number;
  x: number;
  y: number;
  description: string;
  dependsOn?: string[];
};

export type RoadmapMonth = {
  month: string;
  progress: number;
  goals: string[];
  project: string;
  dsaTarget: string;
  aiTopics: string[];
};
