"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Cpu } from "lucide-react";
import { navItems } from "@/data/platform-data";
import { cn } from "@/lib/utils";
import { useOSStore } from "@/store/use-os-store";

export function AppSidebar() {
  const { activeView, setActiveView, sidebarOpen, toggleSidebar } = useOSStore();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 274 : 86 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="sticky top-4 z-20 hidden h-[calc(100vh-2rem)] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-3 shadow-2xl backdrop-blur-2xl lg:block"
    >
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-cyan-300/15 bg-white/[.04] p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-glow">
            <Cpu size={22} />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-black tracking-wide">Vanshul OS</p>
              <p className="text-xs text-cyan-100/60">AI Mission Core</p>
            </div>
          )}
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="rounded-lg border border-white/10 p-1.5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
        >
          <ChevronLeft className={cn("transition", !sidebarOpen && "rotate-180")} size={16} />
        </button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeView;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-slate-400 transition",
                "hover:bg-white/[.06] hover:text-white",
                active && "bg-cyan-300/10 text-cyan-100 shadow-[inset_0_0_24px_rgba(103,232,249,.08)]"
              )}
            >
              {active && <span className="absolute left-0 h-7 w-1 rounded-r-full bg-cyan-300 shadow-glow" />}
              <Icon size={20} className={cn("shrink-0", active && "text-cyan-300")} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
