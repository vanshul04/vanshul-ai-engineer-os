"use client";

import { motion } from "framer-motion";
import { Bell, Command, Search, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopCommand() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-30 mb-5 flex items-center gap-3 rounded-3xl border border-white/10 bg-black/35 p-3 backdrop-blur-2xl"
    >
      <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300 md:flex md:flex-1">
        <Search size={17} className="text-cyan-200" />
        <span>Command mission data, notes, projects...</span>
        <span className="ml-auto flex items-center gap-1 rounded-lg bg-white/8 px-2 py-1 text-xs text-slate-400">
          <Command size={12} /> K
        </span>
      </div>
      <div className="flex flex-1 items-center gap-2 md:flex-none">
        <Button variant="ghost" className="flex-1 md:flex-none">
          <Sparkles size={16} /> PlacePilot AI
        </Button>
        <Button className="flex-1 md:flex-none">
          <Zap size={16} /> Execute
        </Button>
      </div>
      <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-slate-300 hover:text-white">
        <Bell size={17} />
      </button>
    </motion.header>
  );
}
