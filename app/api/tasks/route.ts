import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const task = await prisma.task.create({
    data: {
      userId: session.user.id,
      title: String(body.title ?? "Untitled mission"),
      category: String(body.category ?? "Daily"),
      notes: body.notes ? String(body.notes) : null,
      xp: Number(body.xp ?? 25),
    },
  });

  return NextResponse.json(task, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const existing = await prisma.task.findFirst({ where: { id: String(body.id), userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  const task = await prisma.task.update({
    where: { id: existing.id },
    data: { done: !existing.done },
  });

  if (task.done && !existing.done) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: task.xp }, readinessScore: { increment: 1 } },
    });
  }

  return NextResponse.json(task);
}
