"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "panel";
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-cyan-300/60",
        variant === "primary" && "bg-cyan-300 text-slate-950 shadow-glow hover:bg-white",
        variant === "ghost" && "border border-white/10 bg-white/[.03] text-slate-200 hover:border-cyan-300/50 hover:text-white",
        variant === "panel" && "glass text-slate-100 hover:border-cyan-300/40",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
