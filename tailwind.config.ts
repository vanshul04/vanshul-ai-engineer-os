import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0b0d12",
        panel: "rgba(12, 16, 28, 0.68)",
        cyanx: "#67e8f9",
        bluex: "#38bdf8",
        violetx: "#a78bfa"
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.24)",
        violet: "0 0 44px rgba(167, 139, 250, 0.22)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at top, rgba(103,232,249,.18), transparent 32%), radial-gradient(circle at 80% 20%, rgba(167,139,250,.16), transparent 26%)"
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(-6%, -3%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(5%, 4%, 0) rotate(8deg)" }
        },
        grid: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "64px 64px" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: ".5", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(1px)" }
        }
      },
      animation: {
        aurora: "aurora 16s ease-in-out infinite",
        grid: "grid 18s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
