import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").toLowerCase().trim();
  const newPassword = String(body.newPassword ?? "");
  const resetCode = String(body.resetCode ?? "");

  if (resetCode !== "DEMO-RESET") {
    return NextResponse.json(
      { error: "Production email reset provider is not configured. Use DEMO-RESET locally or connect Resend/Supabase Auth emails." },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { email }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
