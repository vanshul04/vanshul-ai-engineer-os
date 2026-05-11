import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: body.name ?? undefined,
      college: body.college ?? undefined,
      branch: body.branch ?? undefined,
      graduationYear: body.graduationYear ? Number(body.graduationYear) : undefined,
      targetRole: body.targetRole ?? undefined,
      targetPackage: body.targetPackage ?? undefined,
      bio: body.bio ?? undefined,
      githubUrl: body.githubUrl ?? undefined,
      linkedinUrl: body.linkedinUrl ?? undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      college: true,
      branch: true,
      graduationYear: true,
      targetRole: true,
      targetPackage: true,
      bio: true,
      githubUrl: true,
      linkedinUrl: true,
    },
  });

  return NextResponse.json(user);
}
