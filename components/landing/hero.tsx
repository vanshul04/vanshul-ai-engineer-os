"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BrainCircuit, Orbit, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    <section className="relative min-h-[92vh] overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_.96fr]">
        <div className="pt-16">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100 shadow-glow">
              <ShieldCheck size={16} /> Multi-user AI placement command center
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-4xl text-balance text-5xl font-black uppercase tracking-normal text-white sm:text-6xl lg:text-7xl">
              Track Your Journey To Becoming An Elite AI Engineer
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              The Ultimate AI Engineer Journey Tracker for DSA, AI roadmaps, projects, placements, streaks, XP, achievements, notes, and leaderboard competition.
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

        <div className="perspective relative min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, rotateX: 18, rotateY: -18, y: 40 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-8 rounded-[2rem] border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.3em] text-cyan-200/70">SaaS Intelligence Core</p>
                <h2 className="mt-2 text-2xl font-black">Placement Readiness Engine</h2>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-glow">
                <BrainCircuit />
              </div>
            </div>
            <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-3xl border border-cyan-300/10 bg-slate-950/55">
              <div className="absolute inset-0 grid-field animate-grid opacity-35" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute h-72 w-72 rounded-full border border-cyan-300/30" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute h-52 w-52 rounded-full border border-violet-300/30" />
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [.72, 1, .72] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative grid h-36 w-36 place-items-center rounded-full bg-cyan-300/15 shadow-[0_0_80px_rgba(103,232,249,.35)]"
              >
                <Orbit className="h-16 w-16 text-cyan-200" />
              </motion.div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 left-0 w-64 rounded-2xl border border-white/10 bg-white/[.05] p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">Average readiness lift</p>
            <p className="mt-1 text-3xl font-black text-cyan-100">68%</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
            </div>
          </motion.div>
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
