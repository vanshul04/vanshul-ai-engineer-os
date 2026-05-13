"use client";

import { BarChart3, CheckCircle2, LayoutDashboard, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#06070b]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-sm font-black leading-none text-white">AI Placement Tracker</p>
            <p className="hidden text-xs text-slate-500 sm:block">Daily execution system</p>
          </div>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-400 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/login" className="hidden sm:block">
            <Button variant="ghost" className="px-3 py-2">
              <LogIn size={15} /> Login
            </Button>
          </a>
          <a href="/register">
            <Button className="px-3 py-2">
              <UserPlus size={15} /> Start
            </Button>
          </a>
          <a href="/dashboard" className="hidden lg:block">
            <Button variant="ghost" className="px-3 py-2">
              <LayoutDashboard size={15} /> Dashboard
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

export function FeatureSections() {
  const features = [
    { icon: CheckCircle2, title: "Day-by-day missions", copy: "Users always know what to learn, solve, build, revise, and track next." },
    { icon: BarChart3, title: "Progress intelligence", copy: "Skill percentages, XP, streaks, DSA distribution, and monthly completion update from checkboxes." },
    { icon: LayoutDashboard, title: "Placement workspace", copy: "Projects, notes, applications, interview prep, aptitude, and roadmap live in one organized dashboard." },
  ];

  return (
    <section id="features" className="relative px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[.24em] text-cyan-200/70">Built for execution</p>
            <h2 className="mt-2 text-3xl font-black text-white">Useful first. Beautiful second.</h2>
          </div>
          <a href="/register">
            <Button variant="ghost">Create tracker</Button>
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-5 transition hover:border-cyan-300/25 hover:bg-white/[.055]">
                <Icon className="mb-5 text-cyan-200" size={22} />
                <h3 className="text-lg font-black text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
