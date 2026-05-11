import {
  Activity, BarChart3, Binary, Bot, BrainCircuit, CalendarCheck, Code2, Flame, Gauge,
  Home, Medal, Network, NotebookPen, Rocket, Settings, Sparkles, Trophy
} from "lucide-react";
import { Mission, NavItem, RoadmapMonth, SkillNode } from "@/types";

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "daily", label: "Daily Tracker", icon: CalendarCheck },
  { id: "dsa", label: "DSA Tracker", icon: Code2 },
  { id: "roadmap", label: "AI Roadmap", icon: Rocket },
  { id: "skills", label: "Skill Tree", icon: Network },
  { id: "projects", label: "Projects", icon: Binary },
  { id: "prep", label: "Placement Prep", icon: Gauge },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notes", label: "Notes", icon: NotebookPen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export const stats = [
  { label: "DSA Solved", value: 268, suffix: "", icon: Code2, tone: "cyan" },
  { label: "AI Projects", value: 3, suffix: "/6", icon: Bot, tone: "violet" },
  { label: "Study Hours", value: 412, suffix: "h", icon: Activity, tone: "blue" },
  { label: "Skill Mastery", value: 64, suffix: "%", icon: BrainCircuit, tone: "cyan" },
];

export const dashboardMetrics = [
  { label: "Daily Streak", value: "27", detail: "days locked", icon: Flame, progress: 82 },
  { label: "XP Level", value: "L18", detail: "38,420 XP", icon: Sparkles, progress: 72 },
  { label: "Evolution Score", value: "742", detail: "AI engineer index", icon: BrainCircuit, progress: 74 },
  { label: "Readiness", value: "68%", detail: "20+ LPA trajectory", icon: Medal, progress: 68 },
];

export const missions: Mission[] = [
  { id: "m1", title: "Solve 4 graph/DP problems", category: "DSA", xp: 180, done: true },
  { id: "m2", title: "Ship RAG chunking evaluator", category: "AI Project", xp: 260, done: true },
  { id: "m3", title: "Revise SQL window functions", category: "Revision", xp: 90, done: false },
  { id: "m4", title: "Mock interview: behavioral loop", category: "Placement", xp: 140, done: false },
  { id: "m5", title: "Read agentic workflow paper notes", category: "GenAI", xp: 120, done: true },
];

export const dsaTopics = [
  { name: "Arrays", done: 42, total: 50 },
  { name: "Strings", done: 34, total: 40 },
  { name: "Trees", done: 29, total: 45 },
  { name: "Graphs", done: 26, total: 48 },
  { name: "DP", done: 31, total: 70 },
  { name: "Backtracking", done: 18, total: 28 },
  { name: "Sliding Window", done: 22, total: 25 },
  { name: "Binary Search", done: 24, total: 32 },
];

export const skillNodes: SkillNode[] = [
  { id: "python", name: "Python", level: 86, x: 9, y: 42, description: "Production scripting, APIs, ML workflows." },
  { id: "dsa", name: "DSA", level: 72, x: 22, y: 20, description: "Interview-grade patterns and contest consistency." },
  { id: "sql", name: "SQL", level: 68, x: 23, y: 68, description: "Analytics, joins, window functions, query design." },
  { id: "react", name: "React", level: 75, x: 40, y: 42, description: "Frontend systems and dashboard UX." },
  { id: "fastapi", name: "FastAPI", level: 61, x: 55, y: 22, description: "AI service backends and typed APIs.", dependsOn: ["python"] },
  { id: "ml", name: "ML", level: 64, x: 57, y: 62, description: "Classical ML, evaluation, feature engineering.", dependsOn: ["python", "sql"] },
  { id: "dl", name: "Deep Learning", level: 52, x: 72, y: 52, description: "Neural nets, transformers, training basics.", dependsOn: ["ml"] },
  { id: "genai", name: "GenAI", level: 58, x: 83, y: 28, description: "LLMs, prompting, evals, tool calling.", dependsOn: ["dl"] },
  { id: "rag", name: "RAG", level: 49, x: 88, y: 72, description: "Retrieval, chunking, embeddings, citations.", dependsOn: ["genai"] },
  { id: "agents", name: "AI Agents", level: 37, x: 96, y: 48, description: "Autonomous workflows and planner-executor systems.", dependsOn: ["genai", "rag"] },
  { id: "docker", name: "Docker", level: 43, x: 67, y: 82, description: "Containerized deployments.", dependsOn: ["fastapi"] },
  { id: "aws", name: "AWS", level: 34, x: 80, y: 90, description: "Cloud deployment and observability.", dependsOn: ["docker"] },
  { id: "system", name: "System Design", level: 45, x: 50, y: 88, description: "Scalable architecture and tradeoff thinking." },
];

export const roadmap: RoadmapMonth[] = [
  { month: "May 2026", progress: 28, project: "Foundation OS setup", dsaTarget: "80 core problems", goals: ["Daily routine locked", "Python + SQL revision", "Portfolio direction"], aiTopics: ["ML fundamentals", "Model evaluation"] },
  { month: "June 2026", progress: 12, project: "AI Chatbot SaaS", dsaTarget: "120 cumulative", goals: ["React + FastAPI product", "Resume v1", "Contest habit"], aiTopics: ["LLM APIs", "Streaming UX"] },
  { month: "July 2026", progress: 0, project: "RAG PDF Assistant", dsaTarget: "180 cumulative", goals: ["Vector DB pipeline", "Mock interview loop", "LinkedIn proof"], aiTopics: ["Embeddings", "Retrieval evals"] },
  { month: "August 2026", progress: 0, project: "AI Agent System", dsaTarget: "240 cumulative", goals: ["Agent orchestration", "System design basics", "Open-source polish"], aiTopics: ["Tool calling", "Memory"] },
  { month: "September 2026", progress: 0, project: "Deployment hardening", dsaTarget: "320 cumulative", goals: ["AWS/Docker", "Behavioral stories", "Company list"], aiTopics: ["MLOps", "Observability"] },
  { month: "October 2026", progress: 0, project: "Interview sprint", dsaTarget: "420 cumulative", goals: ["Mock interviews", "Low-level design", "Aptitude speed"], aiTopics: ["AI system design", "Evals"] },
  { month: "November 2026", progress: 0, project: "Placement launch", dsaTarget: "500 cumulative", goals: ["Applications", "Referral engine", "Final portfolio"], aiTopics: ["Case studies", "Model tradeoffs"] },
  { month: "December 2026", progress: 0, project: "Offer conversion", dsaTarget: "Maintenance", goals: ["Negotiation prep", "Final interviews", "Offer close"], aiTopics: ["Interview depth", "Production AI"] },
];

export const analyticsSeries = [
  { day: "Mon", dsa: 5, ai: 3, hours: 6 },
  { day: "Tue", dsa: 4, ai: 4, hours: 7 },
  { day: "Wed", dsa: 6, ai: 2, hours: 6.5 },
  { day: "Thu", dsa: 3, ai: 5, hours: 8 },
  { day: "Fri", dsa: 7, ai: 4, hours: 8.5 },
  { day: "Sat", dsa: 8, ai: 6, hours: 10 },
  { day: "Sun", dsa: 4, ai: 5, hours: 7.5 },
];

export const radarData = [
  { skill: "DSA", value: 72 },
  { skill: "ML", value: 64 },
  { skill: "GenAI", value: 58 },
  { skill: "System Design", value: 45 },
  { skill: "Projects", value: 61 },
  { skill: "Interview", value: 52 },
];

export const projects = [
  { name: "AI Chatbot SaaS", progress: 46, stack: ["Next.js", "OpenAI", "FastAPI", "Stripe"], status: "Building MVP" },
  { name: "RAG PDF Assistant", progress: 34, stack: ["LangChain", "Vector DB", "Python", "Vercel"], status: "Retrieval Lab" },
  { name: "AI Agent System", progress: 18, stack: ["Agents", "Tools", "Docker", "AWS"], status: "Architecture" },
];

export const achievements = [
  "7-day streak",
  "100 DSA solved",
  "First AI project",
  "SQL mastery",
  "GenAI completion",
  "Mock interview completed",
];
