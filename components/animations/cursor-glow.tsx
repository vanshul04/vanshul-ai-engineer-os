"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl lg:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
