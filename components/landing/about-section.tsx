import { BrainCircuit, Code2, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/animations/reveal";

const focusAreas = [
  "Data Structures & Algorithms",
  "Generative AI",
  "Machine Learning",
  "Full Stack Development",
  "FastAPI & Backend Systems",
  "AI Agents & RAG Systems",
  "System Design",
  "Competitive Coding",
];

export function AboutSection() {
  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Card className="overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100">
                  <Sparkles size={16} /> Project created by Vanshul Lalwani
                </div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">About Me</h2>
                <p className="mt-4 text-slate-300">
                  Hi, I’m Vanshul Lalwani, a 3rd-year B.Tech Computer Science student in CSE - Education Technology at VIT Bhopal University.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: GraduationCap, label: "BTech", value: "CSE - ED TECH" },
                    { icon: BrainCircuit, label: "Goal", value: "AI Engineer" },
                    { icon: Rocket, label: "Mode", value: "Execution" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-3">
                        <Icon className="mb-3 text-cyan-200" size={20} />
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="text-sm font-bold text-slate-100">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5 text-sm leading-7 text-slate-300 sm:text-base">
                <p>
                  I am passionate about building futuristic AI-powered applications and continuously improving my skills in software development, AI engineering, and problem-solving. My primary goal is to become a high-level AI Engineer and crack top-tier placements.
                </p>
                <div>
                  <p className="mb-3 font-semibold text-white">Currently, I am focused on mastering:</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {focusAreas.map((area) => (
                      <div key={area} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.035] px-3 py-2">
                        <Code2 size={15} className="shrink-0 text-cyan-200" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p>
                  I enjoy creating real-world AI projects, exploring cutting-edge technologies, and building systems that combine intelligence with modern user experiences.
                </p>
                <p>
                  This platform is a part of my journey to track daily progress, stay disciplined, and transform myself into an elite AI Engineer through consistent execution and continuous learning.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
