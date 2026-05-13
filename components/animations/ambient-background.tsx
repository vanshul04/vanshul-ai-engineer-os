"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(103,232,249,.14),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(167,139,250,.16),transparent_25%),#05060a]" />
      <div className="grid-field absolute inset-0 animate-grid opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,.08)_0_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(167,139,250,.08)_0_1px,transparent_1px)] bg-[length:54px_54px,72px_72px] opacity-60" />
      <motion.div
        className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl will-change-transform"
        animate={{ x: [0, 80, 20], y: [0, 40, -14], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl will-change-transform"
        animate={{ x: [0, -60, 0], y: [0, -40, 16], scale: [1, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <defs>
          <linearGradient id="neural-line" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#67e8f9" stopOpacity=".5" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <path d="M80 180 C280 40 420 320 650 150 S980 120 1180 300" fill="none" stroke="url(#neural-line)" strokeWidth="1" />
        <path d="M160 560 C360 360 520 620 780 430 S1040 390 1280 520" fill="none" stroke="url(#neural-line)" strokeWidth="1" />
      </svg>
      <div className="noise" />
    </div>
  );
}
