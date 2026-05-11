import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const note = await prisma.note.create({
    data: {
      userId: session.user.id,
      title: String(body.title ?? "Untitled note"),
      folder: String(body.folder ?? "General"),
      content: String(body.content ?? ""),
    },
  });

  return NextResponse.json(note, { status: 201 });
}
