"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, PolarAngleAxis, PolarGrid, Radar,
  RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const cyan = "#67e8f9";
const violet = "#a78bfa";

export function WeeklyConsistencyChart({ data }: { data: Array<{ day: string; hours: number; dsa: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="hours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={cyan} stopOpacity={0.45} />
            <stop offset="95%" stopColor={cyan} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="day" stroke="rgba(226,232,240,.55)" tickLine={false} axisLine={false} />
        <YAxis stroke="rgba(226,232,240,.55)" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: "#070a12", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
        <Area type="monotone" dataKey="hours" stroke={cyan} fill="url(#hours)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DifficultyChart({ easy, medium, hard }: { easy: number; medium: number; hard: number }) {
  const data = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="name" stroke="rgba(226,232,240,.55)" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: "#070a12", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((_, index) => <Cell key={index} fill={[cyan, "#60a5fa", violet][index]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SkillRadar({ data }: { data: Array<{ skill: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,.1)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(226,232,240,.72)", fontSize: 12 }} />
        <Radar dataKey="value" stroke={violet} fill={violet} fillOpacity={0.3} strokeWidth={2} />
        <Tooltip contentStyle={{ background: "#070a12", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
