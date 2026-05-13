import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AmbientBackground } from "@/components/animations/ambient-background";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { SaaSDashboard } from "@/components/dashboard/saas-dashboard";
import { executionPlan, getNextExecutionDay } from "@/data/execution-plan";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, leaderboard] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        tasks: { orderBy: { createdAt: "desc" }, take: 20 },
        dailyTaskCompletions: { take: 500 },
        dsaProgress: { orderBy: { solvedAt: "desc" }, take: 100 },
        roadmap: true,
        projects: { orderBy: { updatedAt: "desc" }, take: 20 },
        applications: { orderBy: { updatedAt: "desc" }, take: 20 },
        notes: { orderBy: { updatedAt: "desc" }, take: 20 },
      },
    }),
    prisma.user.findMany({
      orderBy: [{ xp: "desc" }, { streak: "desc" }],
      take: 10,
      select: {
        id: true,
        name: true,
        xp: true,
        streak: true,
        readinessScore: true,
        _count: { select: { dsaProgress: true } },
      },
    }),
  ]);

  if (!user) redirect("/login");

  const completionKeys = user.dailyTaskCompletions.map(({ taskKey }) => taskKey);

  const data = {
    user: {
      name: user.name,
      email: user.email,
      xp: user.xp,
      streak: user.streak,
      readinessScore: user.readinessScore,
      targetRole: user.targetRole,
      targetPackage: user.targetPackage,
      college: user.college,
    },
    tasks: user.tasks.map(({ id, title, category, done, xp }) => ({ id, title, category, done, xp })),
    execution: {
      currentDay: getNextExecutionDay(completionKeys),
      plan: executionPlan,
      completions: user.dailyTaskCompletions.map(({ taskKey, day, skill, category, xp }) => ({ taskKey, day, skill, category, xp })),
    },
    dsa: user.dsaProgress.map(({ id, title, topic, difficulty, platform }) => ({ id, title, topic, difficulty, platform })),
    roadmap: user.roadmap.map(({ module, topic, completed, completion }) => ({ module, topic, completed, completion })),
    projects: user.projects.map(({ id, title, description, techStack, completion, status, githubUrl, deploymentUrl }) => ({
      id,
      title,
      description,
      techStack,
      completion,
      status,
      githubUrl,
      deploymentUrl,
    })),
    applications: user.applications.map(({ id, companyName, role, status, interviewRounds }) => ({ id, companyName, role, status, interviewRounds })),
    notes: user.notes.map(({ id, title, folder, content }) => ({ id, title, folder, content })),
    leaderboard,
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <CursorGlow />
      <SaaSDashboard data={data} />
    </main>
  );
}
