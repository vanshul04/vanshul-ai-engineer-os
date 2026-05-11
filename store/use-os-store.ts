"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { missions as initialMissions } from "@/data/platform-data";
import { Mission } from "@/types";

type OSState = {
  activeView: string;
  sidebarOpen: boolean;
  missions: Mission[];
  setActiveView: (view: string) => void;
  toggleSidebar: () => void;
  toggleMission: (id: string) => void;
};

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      activeView: "dashboard",
      sidebarOpen: true,
      missions: initialMissions,
      setActiveView: (view) => set({ activeView: view }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleMission: (id) =>
        set((state) => ({
          missions: state.missions.map((mission) =>
            mission.id === id ? { ...mission, done: !mission.done } : mission
          ),
        })),
    }),
    { name: "vanshul-ai-engineer-os" }
  )
);
