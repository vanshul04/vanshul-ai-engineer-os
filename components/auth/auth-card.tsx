"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Loader2 } from "lucide-react";
import { PlacePilotAIChat } from "@/components/ai/placepilot-ai-chat";
import { Button } from "@/components/ui/button";

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (mode === "register") {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email,
          password,
          college: form.get("college"),
          branch: form.get("branch"),
          graduationYear: form.get("graduationYear"),
          targetRole: form.get("targetRole"),
          targetPackage: form.get("targetPackage"),
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body.error ?? "Registration failed.");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass glow-border mx-auto w-full max-w-xl rounded-3xl p-6 sm:p-8">
      <div className="mb-7 flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-glow">
          <BrainCircuit />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[.28em] text-cyan-200/70">PlacePilot</p>
          <h1 className="text-3xl font-black">{mode === "login" ? "Welcome back" : "Create your command center"}</h1>
          <p className="mt-1 text-sm text-slate-500">Your AI Engineer Journey, Guided Daily.</p>
        </div>
      </div>

      <div className="grid gap-3">
        {mode === "register" && (
          <>
            <input name="name" required placeholder="Full name" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="college" placeholder="College" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
              <input name="branch" placeholder="Branch" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input name="graduationYear" type="number" placeholder="Grad year" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
              <input name="targetRole" placeholder="Target role" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
              <input name="targetPackage" placeholder="Target package" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
            </div>
          </>
        )}
        <input name="email" type="email" required placeholder="Email" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
        <input name="password" type="password" minLength={8} required placeholder="Password" className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 outline-none focus:border-cyan-300/60" />
      </div>

      {error && <p className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}

      <Button className="mt-6 w-full py-3" disabled={loading}>
        {loading && <Loader2 className="animate-spin" size={17} />}
        {mode === "login" ? "Login to dashboard" : "Register and launch"}
      </Button>

      <p className="mt-5 text-center text-sm text-slate-400">
        {mode === "login" ? "New here? " : "Already registered? "}
        <a className="font-semibold text-cyan-200 hover:text-white" href={mode === "login" ? "/register" : "/login"}>
          {mode === "login" ? "Create an account" : "Login"}
        </a>
      </p>
      <div className="mt-4 flex justify-center">
        <PlacePilotAIChat compact />
      </div>
    </form>
  );
}
