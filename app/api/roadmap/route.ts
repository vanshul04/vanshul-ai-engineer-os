import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const module = String(body.module);
  const topic = String(body.topic);
  const completed = Boolean(body.completed);

  const progress = await prisma.roadmapProgress.upsert({
    where: { userId_module_topic: { userId: session.user.id, module, topic } },
    update: { completed, completion: completed ? 100 : 0 },
    create: {
      userId: session.user.id,
      module,
      topic,
      completed,
      completion: completed ? 100 : 0,
      difficulty: String(body.difficulty ?? "Intermediate"),
      estimatedHours: Number(body.estimatedHours ?? 4),
    },
  });

  if (completed) {
    await prisma.user.update({ where: { id: session.user.id }, data: { xp: { increment: 80 } } });
  }

  return NextResponse.json(progress);
}
