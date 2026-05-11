"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, Bell, BookOpen, Bot, BriefcaseBusiness, CalendarCheck, CheckCircle2, ChevronRight,
  Clock, Code2, Flame, Github, GraduationCap, LayoutDashboard, LogOut, Plus, Rocket,
  Sparkles, Target, Trophy, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DifficultyChart, SkillRadar, WeeklyConsistencyChart } from "@/components/charts/performance-charts";
import { dailyCategories, dsaTopics, roadmapModules } from "@/data/saas-data";
import { dsaExecutionTopics, ExecutionDay, projectExecutionTracks } from "@/data/execution-plan";

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
  execution: {
    currentDay: number;
    plan: ExecutionDay[];
    completions: Array<{ taskKey: string; day: number; skill: string; category: string; xp: number }>;
  };
  tasks: Array<{ id: string; title: string; category: string; done: boolean; xp: number }>;
  dsa: Array<{ id: string; title: string; topic: string; difficulty: string; platform: string }>;
  roadmap: Array<{ module: string; topic: string; completed: boolean; completion: number }>;
  projects: Array<{ id: string; title: string; description: string; techStack: string[]; completion: number; status: string; githubUrl: string | null; deploymentUrl: string | null }>;
  applications: Array<{ id: string; companyName: string; role: string; status: string; interviewRounds: number }>;
  notes: Array<{ id: string; title: string; folder: string; content: string }>;
  leaderboard: Array<{ id: string; name: string | null; xp: number; streak: number; readinessScore: number; _count: { dsaProgress: number } }>;
};

function Field({ name, placeholder, type = "text" }: { name: string; placeholder: string; type?: string }) {
  return <input name={name} type={type} placeholder={placeholder} className="min-w-0 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-cyan-300/60" />;
}

function Panel({ title, icon: Icon, children, action }: { title: string; icon: typeof LayoutDashboard; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <Card className="rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/12 text-cyan-200">
            <Icon size={19} />
          </div>
          <h2 className="text-lg font-black">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

function completionPercent(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0;
}

export function SaaSDashboard({ data }: { data: DashboardData }) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(data.execution.currentDay);
  const [celebration, setCelebration] = useState<string | null>(null);

  const completionKeys = useMemo(() => new Set(data.execution.completions.map((item) => item.taskKey)), [data.execution.completions]);
  const today = data.execution.plan.find((day) => day.day === selectedDay) ?? data.execution.plan[0];
  const currentMonth = data.execution.plan.filter((day) => day.month === today.month);
  const completedToday = today.tasks.filter((task) => completionKeys.has(task.key)).length;
  const todayPercent = completionPercent(completedToday, today.tasks.length);
  const completedAll = data.execution.completions.length;
  const totalPlanTasks = data.execution.plan.reduce((sum, day) => sum + day.tasks.length, 0);
  const executionPercent = completionPercent(completedAll, totalPlanTasks);
  const monthCompleted = currentMonth.flatMap((day) => day.tasks).filter((task) => completionKeys.has(task.key)).length;
  const monthTotal = currentMonth.reduce((sum, day) => sum + day.tasks.length, 0);
  const monthPercent = completionPercent(monthCompleted, monthTotal);
  const completedTasks = data.tasks.filter((task) => task.done).length;
  const roadmapDone = data.roadmap.filter((item) => item.completed).length;
  const roadmapPercent = Math.round((roadmapDone / roadmapModules.length) * 100) || 0;
  const easy = data.dsa.filter((item) => item.difficulty === "EASY").length;
  const medium = data.dsa.filter((item) => item.difficulty === "MEDIUM").length;
  const hard = data.dsa.filter((item) => item.difficulty === "HARD").length;

  const skillRows = useMemo(() => {
    const skills = ["Python", "DSA", "SQL", "Aptitude", "React", "FastAPI", "Machine Learning", "Deep Learning", "Generative AI", "LangChain", "RAG", "AI Agents", "Docker", "AWS", "GitHub", "System Design", "Interview"];
    return skills.map((skill) => {
      const skillTasks = data.execution.plan.flatMap((day) => day.tasks).filter((task) => task.skill === skill || task.title.includes(skill));
      const done = skillTasks.filter((task) => completionKeys.has(task.key)).length;
      const minutes = skillTasks.filter((task) => !completionKeys.has(task.key)).reduce((sum, task) => sum + task.minutes, 0);
      return {
        skill,
        percent: completionPercent(done, skillTasks.length),
        done,
        total: skillTasks.length,
        level: done > 50 ? "Advanced" : done > 20 ? "Intermediate" : "Beginner",
        remaining: Math.ceil(minutes / 60),
      };
    });
  }, [completionKeys, data.execution.plan]);

  const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => ({
    day,
    hours: Math.max(1, Math.round((completedAll / 24 + index + completedTasks) * 0.8)),
    dsa: Math.max(0, data.dsa.length - index),
  }));

  const radar = [
    { skill: "DSA", value: skillRows.find((item) => item.skill === "DSA")?.percent ?? 0 },
    { skill: "AI", value: Math.max(skillRows.find((item) => item.skill === "Generative AI")?.percent ?? 0, roadmapPercent) },
    { skill: "Projects", value: Math.min(100, data.projects.reduce((sum, project) => sum + project.completion, 0) / Math.max(1, data.projects.length)) },
    { skill: "Aptitude", value: skillRows.find((item) => item.skill === "Aptitude")?.percent ?? 0 },
    { skill: "Interview", value: skillRows.find((item) => item.skill === "Interview")?.percent ?? data.applications.length * 10 },
    { skill: "Consistency", value: todayPercent },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>, url: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    event.currentTarget.reset();
    router.refresh();
  }

  async function toggleExecutionTask(taskKey: string, day: number, title: string) {
    await fetch("/api/execution", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskKey, day }),
    });
    setCelebration(title);
    setTimeout(() => setCelebration(null), 1300);
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

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <AnimatePresence>
        {celebration && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl border border-cyan-300/30 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-100 shadow-glow backdrop-blur-xl"
          >
            +XP unlocked: {celebration}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[.28em] text-cyan-200/70">Duolingo for AI Engineer placements</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">AI Placement Tracker</h1>
          <p className="mt-1 text-slate-400">{data.user.name ?? "Student"} - {data.user.targetRole} - {data.user.targetPackage ?? "Target package not set"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost"><Bell size={16} /> Daily reminder</Button>
          <Button variant="ghost"><Sparkles size={16} /> AI Mentor</Button>
          <a href="/logout"><Button><LogOut size={16} /> Logout</Button></a>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Today's mission", value: todayPercent, suffix: "%", icon: Zap, progress: todayPercent },
          { label: "Daily streak", value: data.user.streak, suffix: " days", icon: Flame, progress: Math.min(100, data.user.streak * 4) },
          { label: "Total XP", value: data.user.xp, suffix: " XP", icon: Trophy, progress: Math.min(100, data.user.xp / 80) },
          { label: "8-month plan", value: executionPercent, suffix: "%", icon: Target, progress: executionPercent },
          { label: "DSA solved", value: data.dsa.length, suffix: "", icon: Code2, progress: Math.min(100, data.dsa.length * 3) },
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

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Panel
          title={`Today's Mission - ${today.title}`}
          icon={CalendarCheck}
          action={<span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{completedToday}/{today.tasks.length} complete</span>}
        >
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 md:col-span-2">
              <p className="text-sm text-cyan-100/70">{today.dateLabel} - {today.month}</p>
              <h3 className="mt-1 text-2xl font-black">{today.theme}</h3>
              <Progress value={todayPercent} className="mt-4" />
            </div>
            <div className="rounded-2xl border border-violet-300/20 bg-violet-400/10 p-4">
              <p className="text-sm text-violet-100/70">Estimated today</p>
              <p className="mt-1 text-2xl font-black">{Math.round(today.tasks.reduce((sum, task) => sum + task.minutes, 0) / 60)}h focus</p>
              <p className="mt-1 text-xs text-slate-400">{today.tasks.reduce((sum, task) => sum + task.xp, 0)} XP available</p>
            </div>
          </div>

          <div className="space-y-2">
            {today.tasks.map((task) => {
              const done = completionKeys.has(task.key);
              return (
                <motion.button
                  key={task.key}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleExecutionTask(task.key, task.day, task.title)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 text-left transition hover:border-cyan-300/35 hover:bg-cyan-300/[.06]"
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition ${done ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-glow" : "border-white/15 bg-black/20 text-transparent group-hover:text-cyan-200"}`}>
                    <CheckCircle2 size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold ${done ? "text-cyan-100 line-through decoration-cyan-300/60" : "text-white"}`}>{task.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{task.category} - {task.skill} - {task.difficulty} - {task.minutes} min - {task.xp} XP</p>
                  </div>
                  <ChevronRight className="text-slate-600 group-hover:text-cyan-200" size={18} />
                </motion.button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Weekly + Monthly Targets" icon={Target}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="mb-3 font-black">This week</h3>
              {today.weeklyTarget.map((target) => <p key={target} className="mb-2 text-sm text-slate-300">- {target}</p>)}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-black">{today.month}</h3>
                <span className="text-sm text-cyan-100">{monthPercent}%</span>
              </div>
              <Progress value={monthPercent} />
              <div className="mt-3 space-y-2">
                {today.monthlyTarget.map((target) => <p key={target} className="text-sm text-slate-300">- {target}</p>)}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[data.execution.currentDay - 1, data.execution.currentDay, data.execution.currentDay + 1].filter((day) => day > 0 && day <= data.execution.plan.length).map((day) => (
                <button key={day} onClick={() => setSelectedDay(day)} className={`rounded-xl border px-3 py-2 text-sm ${selectedDay === day ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[.03] text-slate-400"}`}>
                  Day {day}
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="Skill Mastery Engine" icon={GraduationCap}>
          <div className="max-h-[420px] space-y-3 overflow-auto pr-1 scrollbar-hide">
            {skillRows.map((skill) => (
              <div key={skill.skill} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-black">{skill.skill}</p>
                    <p className="text-xs text-slate-500">{skill.level} - {skill.done}/{skill.total} lessons - {skill.remaining}h left</p>
                  </div>
                  <span className="text-sm font-bold text-cyan-100">{skill.percent}%</span>
                </div>
                <Progress value={skill.percent} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="DSA Topic System" icon={Code2}>
          <div className="max-h-[420px] space-y-3 overflow-auto pr-1 scrollbar-hide">
            {dsaExecutionTopics.map((topic) => {
              const solved = data.dsa.filter((item) => item.topic === topic.topic).length;
              const percent = completionPercent(solved, topic.questions);
              return (
                <div key={topic.topic} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-black">{topic.topic}</p>
                      <p className="text-xs text-slate-500">{solved}/{topic.questions} questions - revision: {topic.revision}</p>
                    </div>
                    <span className="text-sm font-bold text-cyan-100">{percent}%</span>
                  </div>
                  <Progress value={percent} />
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Analytics Center" icon={LayoutDashboard}>
          <WeeklyConsistencyChart data={weekly} />
          <SkillRadar data={radar} />
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Panel title="Project Execution Tracks" icon={Rocket}>
          <div className="grid gap-4 md:grid-cols-3">
            {projectExecutionTracks.map((project) => (
              <div key={project.name} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <h3 className="font-black">{project.name}</h3>
                <div className="mt-3 space-y-2">
                  {project.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className={`grid h-5 w-5 place-items-center rounded-md border ${index < data.projects.length ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/15"}`}>
                        {index < data.projects.length && <CheckCircle2 size={13} />}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Quick Add: Custom Tracking" icon={Plus}>
          <div className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={(event) => handleSubmit(event, "/api/tasks")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">Extra task</h3>
              <Field name="title" placeholder="Custom mission" />
              <select name="category" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm">{dailyCategories.map((item) => <option key={item}>{item}</option>)}</select>
              <Field name="xp" placeholder="XP" type="number" />
              <Button className="w-full"><Plus size={16} /> Add</Button>
            </form>
            <form onSubmit={(event) => handleSubmit(event, "/api/dsa")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">DSA solved</h3>
              <Field name="title" placeholder="Problem title" />
              <select name="topic" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm">{dsaTopics.map((topic) => <option key={topic}>{topic}</option>)}</select>
              <select name="difficulty" className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm"><option>EASY</option><option>MEDIUM</option><option>HARD</option></select>
              <Button className="w-full"><Code2 size={16} /> Save</Button>
            </form>
            <form onSubmit={(event) => handleSubmit(event, "/api/notes")} className="space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <h3 className="font-black">Notes</h3>
              <Field name="title" placeholder="Interview note" />
              <Field name="folder" placeholder="Folder" />
              <textarea name="content" placeholder="Write notes..." className="min-h-20 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-cyan-300/60" />
              <Button className="w-full"><BookOpen size={16} /> Save</Button>
            </form>
          </div>
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel title="Aptitude + Interview Prep" icon={BriefcaseBusiness}>
          {["Percentages", "Probability", "Time/work", "Puzzles", "Logical reasoning", "DBMS", "OS", "CN", "OOP", "HR questions", "Mock interviews"].map((item, index) => (
            <div key={item} className="mb-3 rounded-2xl border border-white/10 bg-white/[.03] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold">{item}</p>
                <span className="text-xs text-slate-500">{index < completedAll / 12 ? "Active" : "Upcoming"}</span>
              </div>
              <Progress value={Math.min(100, Math.max(8, completedAll - index * 4))} />
            </div>
          ))}
        </Panel>

        <Panel title="Custom Daily Tasks" icon={Clock}>
          <div className="space-y-2">
            {data.tasks.slice(0, 8).map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left hover:border-cyan-300/35">
                <CheckCircle2 className={task.done ? "text-cyan-300" : "text-slate-600"} />
                <div className="flex-1">
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.category} - {task.xp} XP</p>
                </div>
              </button>
            ))}
            {!data.tasks.length && <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">Optional custom missions appear here.</p>}
          </div>
        </Panel>

        <Panel title="Leaderboard + Achievements" icon={Award}>
          <div className="space-y-2">
            {data.leaderboard.slice(0, 4).map((user, index) => (
              <div key={user.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300/10 text-cyan-100">#{index + 1}</span>
                <div className="flex-1"><p className="font-semibold">{user.name ?? "AI Student"}</p><p className="text-xs text-slate-500">{user._count.dsaProgress} DSA - {user.streak} streak</p></div>
                <p className="font-black">{user.xp} XP</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["7-day streak", "100 DSA", "First project", "30-day consistency"].map((item) => (
              <div key={item} className="rounded-2xl border border-violet-300/15 bg-violet-400/10 p-3 text-sm font-semibold text-violet-100">
                <Award className="mb-2" size={16} /> {item}
              </div>
            ))}
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
            {!data.projects.length && <p className="text-sm text-slate-400">No projects yet. Add one from the project tracker API or quick form later.</p>}
          </div>
        </Panel>
        <Panel title="DSA Difficulty Mix" icon={Code2}>
          <DifficultyChart easy={easy} medium={medium} hard={hard} />
        </Panel>
        <Panel title="AI Assistant" icon={Bot}>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-cyan-300/8 p-5">
            <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />
            <p className="text-sm text-cyan-100/70">Mentor guidance</p>
            <h3 className="mt-2 text-2xl font-black">Just follow the checkboxes.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Complete today first. The system handles XP, streaks, skill percentages, DSA progress, revision reminders, and weekly/monthly targets automatically.
            </p>
          </div>
        </Panel>
      </section>
    </div>
  );
}
