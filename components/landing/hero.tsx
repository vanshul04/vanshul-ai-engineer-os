"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, Code2, GraduationCap, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlacePilotAIChat } from "@/components/ai/placepilot-ai-chat";
import { Reveal } from "@/components/animations/reveal";

const landingStats = [
  { label: "DSA problems tracked", value: 500, suffix: "+" },
  { label: "Roadmap modules", value: 14, suffix: "" },
  { label: "XP achievements", value: 30, suffix: "+" },
  { label: "Placement workflows", value: 12, suffix: "" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_.96fr]">
        <div className="pt-16">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100 shadow-glow">
              <ShieldCheck size={16} /> Multi-user AI placement command center
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-4xl text-balance text-5xl font-black tracking-normal text-white sm:text-6xl lg:text-7xl">
              Track your journey to becoming an elite AI engineer
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              PlacePilot guides your AI engineer journey daily with DSA, AI roadmaps, projects, placements, streaks, XP, achievements, notes, and PlacePilot AI.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/register">
                <Button className="w-full px-6 py-3 sm:w-auto">
                  Start free <UserPlus size={18} />
                </Button>
              </a>
              <a href="/login">
                <Button variant="ghost" className="w-full px-6 py-3 sm:w-auto">
                  Login <ArrowRight size={18} />
                </Button>
              </a>
              <PlacePilotAIChat />
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["DSA", "AI Roadmap", "Projects", "Placements"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[.04] px-3 py-3 text-center text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div id="workflow" className="perspective relative min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-8 rounded-3xl border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.3em] text-cyan-200/70">Dashboard preview</p>
                <h2 className="mt-2 text-2xl font-black">Today’s execution plan</h2>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-100">
                <CalendarCheck />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-4">
              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  ["Day 1", "Python + Logic"],
                  ["45 min", "Learning"],
                  ["325 XP", "Available"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-3">
                    <p className="text-lg font-black text-white">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { label: "Learn Python variables", icon: GraduationCap },
                  { label: "Solve 5 beginner problems", icon: Code2 },
                  { label: "Practice percentage aptitude", icon: CheckCircle2 },
                  { label: "Update notes with mistakes", icon: CheckCircle2 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
                      <Icon size={16} />
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                  </div>
                )})}
              </div>
            </div>
          </motion.div>
          <div className="absolute bottom-8 left-0 w-64 rounded-2xl border border-white/10 bg-white/[.05] p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">8-month journey</p>
            <p className="mt-1 text-3xl font-black text-cyan-100">Day 1 → 245</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-2 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {landingStats.map((stat, index) => (
          <Reveal key={stat.label} delay={0.1 + index * 0.05}>
            <div className="glass rounded-2xl p-5">
              <p className="text-4xl font-black">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
