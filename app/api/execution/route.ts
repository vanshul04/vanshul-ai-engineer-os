import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { executionPlan } from "@/data/execution-plan";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const taskKey = String(body.taskKey);
  const day = Number(body.day);
  const task = executionPlan.find((item) => item.day === day)?.tasks.find((item) => item.key === taskKey);

  if (!task) return NextResponse.json({ error: "Mission task not found" }, { status: 404 });

  const existing = await prisma.dailyTaskCompletion.findUnique({
    where: { userId_taskKey: { userId: session.user.id, taskKey } },
  });

  if (existing) {
    await prisma.dailyTaskCompletion.delete({ where: { id: existing.id } });
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        xp: { decrement: task.xp },
        readinessScore: { decrement: task.category === "Interview" || task.category === "Project" ? 1 : 0 },
      },
    });
    return NextResponse.json({ completed: false });
  }

  await prisma.dailyTaskCompletion.create({
    data: {
      userId: session.user.id,
      taskKey,
      day,
      title: task.title,
      category: task.category,
      skill: task.skill,
      xp: task.xp,
    },
  });

  const todayCompleted = await prisma.dailyTaskCompletion.count({
    where: { userId: session.user.id, day },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      xp: { increment: task.xp },
      streak: todayCompleted === executionPlan.find((item) => item.day === day)?.tasks.length ? { increment: 1 } : undefined,
      readinessScore: { increment: task.category === "Interview" || task.category === "Project" ? 1 : 0 },
    },
  });

  return NextResponse.json({ completed: true });
}
