import { ApplicationStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const application = await prisma.application.create({
    data: {
      userId: session.user.id,
      companyName: String(body.companyName ?? "Company"),
      role: String(body.role ?? "AI Engineer"),
      status: (body.status ?? "SAVED") as ApplicationStatus,
      interviewRounds: Number(body.interviewRounds ?? 0),
      notes: body.notes ? String(body.notes) : null,
      appliedDate: body.appliedDate ? new Date(String(body.appliedDate)) : null,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
