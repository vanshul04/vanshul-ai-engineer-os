import { ProjectStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      title: String(body.title ?? "AI Project"),
      description: String(body.description ?? "Production AI project"),
      techStack: String(body.techStack ?? "Next.js,Python,AI").split(",").map((item) => item.trim()).filter(Boolean),
      githubUrl: body.githubUrl ? String(body.githubUrl) : null,
      deploymentUrl: body.deploymentUrl ? String(body.deploymentUrl) : null,
      completion: Number(body.completion ?? 0),
      status: (body.status ?? "BUILDING") as ProjectStatus,
    },
  });

  await prisma.user.update({ where: { id: session.user.id }, data: { xp: { increment: 120 } } });
  return NextResponse.json(project, { status: 201 });
}
