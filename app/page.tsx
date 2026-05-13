import { AmbientBackground } from "@/components/animations/ambient-background";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { AboutSection } from "@/components/landing/about-section";
import { Hero } from "@/components/landing/hero";
import { FeatureSections, SiteNav } from "@/components/landing/site-nav";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <CursorGlow />
      <SiteNav />
      <div className="relative z-10">
        <Hero />
        <FeatureSections />
        <AboutSection />
      </div>
    </main>
  );
}
