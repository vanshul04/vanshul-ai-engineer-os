import { Difficulty } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const item = await prisma.dsaProgress.create({
    data: {
      userId: session.user.id,
      title: String(body.title ?? "Untitled problem"),
      topic: String(body.topic ?? "Arrays"),
      difficulty: (body.difficulty ?? "EASY") as Difficulty,
      platform: String(body.platform ?? "LeetCode"),
      url: body.url ? String(body.url) : null,
      notes: body.notes ? String(body.notes) : null,
    },
  });

  await prisma.user.update({ where: { id: session.user.id }, data: { xp: { increment: 40 } } });
  return NextResponse.json(item, { status: 201 });
}
