import { AmbientBackground } from "@/components/animations/ambient-background";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}
