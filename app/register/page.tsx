import { AmbientBackground } from "@/components/animations/ambient-background";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { AuthCard } from "@/components/auth/auth-card";

export default function RegisterPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <AmbientBackground />
      <CursorGlow />
      <div className="relative z-10 w-full">
        <AuthCard mode="register" />
      </div>
    </main>
  );
}
