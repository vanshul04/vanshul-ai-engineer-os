"use client";

import { FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Award, BookOpen, Bot, BriefcaseBusiness, CalendarCheck, CheckCircle2, Code2, Flame,
  Github, GraduationCap, LayoutDashboard, LogOut, Plus, Rocket, Sparkles, Target, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DifficultyChart, SkillRadar, WeeklyConsistencyChart } from "@/components/charts/performance-charts";
import { dailyCategories, dsaTopics, roadmapModules } from "@/data/saas-data";

type DashboardData = {
  user: {
    name: string | null;
    email: string;
    xp: number;
    streak: number;
    readinessScore: number;
    targetRole: string;
    targetPackage: string | null;
    college: string | null;
  };
  tasks: Array<{ id: string; title: string; category: string; done: boolean; xp: number }>;
  dsa: Array<{ id: string; title: string; topic: string; difficulty: string; platform: string }>;
  roadmap: Array<{ module: string; topic: string; completed: boolean; completion: number }>;
  projects: Array<{ id: string; title: string; description: string; techStack: string[]; completion: number; status: string; githubUrl: string | null; deploymentUrl: string | null }>;
  applications: Array<{ id: string; companyName: string; role: string; status: string; interviewRounds: number }>;
  notes: Array<{ id: string; title: string; folder: string; content: string }>;
  leaderboard: Array<{ id: string; name: string | null; xp: number; streak: number; readinessScore: number; _count: { dsaProgress: number } }>;
};

async function postJSON(url: string, data: Record<string, unknown>) {
  await fetch(url, {
    method: url === "/api/tasks/toggle" ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

function Field({ name, placeholder, type = "text" }: { name: string; placeholder: string; type?: string }) {
  return <input name={name} type={type} placeholder={placeholder} className="min-w-0 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-cyan-300/60" />;
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof LayoutDashboard; children: React.ReactNode }) {
  return (
    <Card className="rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/12 text-cyan-200">
          <Icon size={19} />
        </div>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

export function SaaSDashboard({ data }: { data: DashboardData }) {
  const router = useRouter();
  const completedTasks = data.tasks.filter((task) => task.done).length;
  const roadmapDone = data.roadmap.filter((item) => item.completed).length;
  const roadmapPercent = Math.round((roadmapDone / roadmapModules.length) * 100) || 0;
  const easy = data.dsa.filter((item) => item.difficulty === "EASY").length;
  const medium = data.dsa.filter((item) => item.difficulty === "MEDIUM").length;
  const hard = data.dsa.filter((item) => item.difficulty === "HARD").length;
  const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => ({
    day,
    hours: Math.max(1, Math.round((data.tasks.length + index + completedTasks) * 0.8)),
    dsa: Math.max(0, data.dsa.length - index),
  }));
  const radar = useMemo(() => [
    { skill: "DSA", value: Math.min(100, data.dsa.length * 4) },
    { skill: "AI", value: roadmapPercent },
    { skill: "Projects", value: Math.min(100, data.projects.reduce((sum, project) => sum + project.completion, 0) / Math.max(1, data.projects.length)) },
    { skill: "Aptitude", value: completedTasks * 12 },
    { skill: "Interview", value: data.applications.length * 10 },
    { skill: "Consistency", value: Math.min(100, data.user.streak * 4) },
  ], [completedTasks, data, roadmapPercent]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>, url: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await postJSON(url, Object.fromEntries(form.entries()));
    event.currentTarget.reset();
    router.refresh();
  }

  async function toggleTask(id: string) {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  async function toggleRoadmap(module: string, topic: string, completed: boolean) {
    await fetch("/api/roadmap", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module, topic, completed }),
    });
    router.refresh();
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[.28em] text-cyan-200/70">The Ultimate AI Engineer Journey Tracker</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">AI Placement Tracker</h1>
          <p className="mt-1 text-slate-400">{data.user.name ?? "Student"} · {data.user.targetRole} · {data.user.targetPackage ?? "Target package not set"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost"><Sparkles size={16} /> AI Coach</Button>
          <a href="/logout"><Button><LogOut size={16} /> Logout</Button></a>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Daily streak", value: data.user.streak, suffix: " days", icon: Flame, progress: Math.min(100, data.user.streak * 4) },
          { label: "Total XP", value: data.user.xp, suffix: " XP", icon: Trophy, progress: Math.min(100, data.user.xp / 80) },
          { label: "Readiness", value: data.user.readinessScore, suffix: "%", icon: Target, progress: data.user.readinessScore },
          { label: "DSA solved", value: data.dsa.length, suffix: "", icon: Code2, progress: Math.min(100, data.dsa.length * 4) },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} whileHover={{ y: -5, rotateX: 3 }} className="glass glow-border rounded-3xl p-5">
              <Icon className="mb-5 text-cyan-200" />
              <p className="text-3xl font-black">{metric.value}{metric.suffix}</p>
              <p className="mb-4 mt-1 text-sm text-slate-400">{metric.label}</p>
              <Progress value={metric.progress} />
            </motion.div>
          );
        })}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Panel title="Daily Tracker" icon={CalendarCheck}>
          <form onSubmit={(event) => handleSubmit(event, "/api/tasks")} className="mb-4 grid gap-2 sm:grid-cols-[1fr_180px_90px_auto]">
            <Field name="title" placeholder="Daily mission" />
            <select name="category" className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm">{dailyCategories.map((item) => <option key={item}>{item}</option>)}</select>
            <Field name="xp" placeholder="XP" type="number" />
            <Button><Plus size={16} /> Add</Button>
          </form>
          <div className="space-y-2">
            {data.tasks.slice(0, 8).map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left hover:border-cyan-300/35">
                <CheckCircle2 className={task.done ? "text-cyan-300" : "text-slate-600"} />
                <div className="flex-1">
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.category} · {task.xp} XP</p>
                </div>
              </button>
            ))}
            {!data.tasks.length && <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">Add your first daily mission to start earning XP.</p>}
          </div>
        </Panel>

        <Panel title="AI Assistant" icon={Bot}>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-cyan-300/8 p-5">
            <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />
            <p className="text-sm text-cyan-100/70">Recommendation</p>
            <h3 className="mt-2 text-2xl font-black">Ship proof, not promises.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Add one DSA problem, one roadmap unlock, and one project milestone today. Your profile becomes stronger when execution is visible.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[.04] p-4"><p className="text-2xl font-black">{completedTasks}/{data.tasks.length}</p><p className="text-xs text-slate-400">daily goals</p></div>
            <div className="rounded-2xl bg-white/[.04] p-4"><p className="text-2xl font-black">{roadmapPercent}%</p><p className="text-xs text-slate-400">roadmap</p></div>
          </div>
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="DSA Tracker" icon={Code2}>
          <form onSubmit={(event) => handleSubmit(event, "/api/dsa")} className="mb-4 grid gap-2">
            <Field name="title" placeholder="Problem title" />
            <div className="grid gap-2 sm:grid-cols-3">
              <select name="topic" className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm">{dsaTopics.map((topic) => <option key={topic}>{topic}</option>)}</select>
              <select name="difficulty" className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option>EASY</option><option>MEDIUM</option><option>HARD</option></select>
              <Field name="platform" placeholder="LeetCode" />
            </div>
            <Button><Plus size={16} /> Add solved question</Button>
          </form>
          <DifficultyChart easy={easy} medium={medium} hard={hard} />
        </Panel>

        <Panel title="Analytics Center" icon={LayoutDashboard}>
          <WeeklyConsistencyChart data={weekly} />
        </Panel>

        <Panel title="Skill Mastery" icon={GraduationCap}>
          <SkillRadar data={radar} />
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <Panel title="AI Engineer Roadmap" icon={Rocket}>
          <div className="grid max-h-[520px] gap-3 overflow-auto pr-1 scrollbar-hide">
            {roadmapModules.map((item) => {
              const saved = data.roadmap.find((entry) => entry.module === item.module && entry.topic === item.topic);
              const done = Boolean(saved?.completed);
              return (
                <button key={item.module} onClick={() => toggleRoadmap(item.module, item.topic, !done)} className="rounded-2xl border border-white/10 bg-white/[.03] p-4 text-left hover:border-cyan-300/40">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black">{item.module}</h3>
                    <span className={done ? "text-cyan-200" : "text-slate-500"}>{done ? "Unlocked" : item.difficulty}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{item.topic}</p>
                  <Progress value={done ? 100 : 0} className="mt-3" />
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Projects, Placements, Notes" icon={BriefcaseBusiness}>
          <div className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={(event) => handleSubmit(event, "/api/projects")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">Project</h3>
              <Field name="title" placeholder="AI SaaS project" />
              <Field name="description" placeholder="Description" />
              <Field name="techStack" placeholder="Next.js, FastAPI, RAG" />
              <Field name="completion" placeholder="Completion %" type="number" />
              <Button className="w-full"><Github size={16} /> Save</Button>
            </form>
            <form onSubmit={(event) => handleSubmit(event, "/api/applications")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">Company</h3>
              <Field name="companyName" placeholder="Company" />
              <Field name="role" placeholder="Role" />
              <select name="status" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option>SAVED</option><option>APPLIED</option><option>OA</option><option>INTERVIEWING</option><option>OFFER</option><option>REJECTED</option></select>
              <Button className="w-full"><BriefcaseBusiness size={16} /> Track</Button>
            </form>
            <form onSubmit={(event) => handleSubmit(event, "/api/notes")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">Note</h3>
              <Field name="title" placeholder="Interview note" />
              <Field name="folder" placeholder="Folder" />
              <textarea name="content" placeholder="Write notes..." className="min-h-20 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-cyan-300/60" />
              <Button className="w-full"><BookOpen size={16} /> Save</Button>
            </form>
          </div>
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="Project Portfolio" icon={Github}>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <h3 className="font-black">{project.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{project.description}</p>
                <div className="my-3 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">{tech}</span>)}</div>
                <Progress value={project.completion} />
              </div>
            ))}
            {!data.projects.length && <p className="text-sm text-slate-400">No projects yet. Add one above.</p>}
          </div>
        </Panel>
        <Panel title="Global Leaderboard" icon={Trophy}>
          <div className="space-y-2">
            {data.leaderboard.map((user, index) => (
              <div key={user.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300/10 text-cyan-100">#{index + 1}</span>
                <div className="flex-1"><p className="font-semibold">{user.name ?? "AI Student"}</p><p className="text-xs text-slate-500">{user._count.dsaProgress} DSA · {user.streak} streak</p></div>
                <p className="font-black">{user.xp} XP</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Achievements" icon={Award}>
          {["7-day streak", "100 DSA solved", "First AI project", "SQL mastered", "30-day consistency"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/10 text-violet-200"><Award size={18} /></div>
              <div><p className="font-semibold">{item}</p><p className="text-xs text-slate-500">{index < 2 ? "Unlocked animation ready" : "Keep executing to unlock"}</p></div>
            </div>
          ))}
        </Panel>
      </section>
    </div>
  );
}
