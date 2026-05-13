export type ExecutionTask = {
  key: string;
  day: number;
  title: string;
  category: "Learning" | "DSA" | "Aptitude" | "Project" | "Interview" | "Revision" | "Notes";
  skill: string;
  xp: number;
  minutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  resource?: string;
};

export type ExecutionDay = {
  day: number;
  monthIndex: number;
  month: string;
  theme: string;
  dateLabel: string;
  title: string;
  weeklyTarget: string[];
  monthlyTarget: string[];
  tasks: ExecutionTask[];
};

const months = [
  {
    label: "Month 1",
    theme: "Python + Logic Building",
    target: ["Install tooling", "Master Python basics", "Build daily coding habit", "Finish 80 beginner problems"],
    skills: ["Python", "GitHub", "Aptitude"],
    lessons: ["Python variables", "data types", "conditions", "loops", "functions", "lists", "strings", "dictionaries", "files", "exceptions", "OOP basics", "modules", "debugging", "GitHub commits"],
    dsa: ["logic building", "patterns", "arrays intro", "strings intro"],
    project: "Python CLI habit tracker",
    aptitude: ["percentages", "ratios", "averages", "number systems"],
  },
  {
    label: "Month 2",
    theme: "DSA Basics",
    target: ["Complete arrays and strings", "Solve 150 cumulative DSA", "Understand time complexity", "Weekly contests"],
    skills: ["DSA", "Python", "Aptitude"],
    lessons: ["time complexity", "arrays", "strings", "hashing", "two pointers", "sliding window", "binary search", "recursion", "sorting", "linked lists"],
    dsa: ["Arrays", "Strings", "Hashing", "Binary Search", "Sliding Window"],
    project: "DSA progress visualizer",
    aptitude: ["time and work", "profit and loss", "speed distance time", "probability"],
  },
  {
    label: "Month 3",
    theme: "SQL + Web Development",
    target: ["SQL basics complete", "React dashboard shipped", "FastAPI basics", "220 cumulative DSA"],
    skills: ["SQL", "React", "FastAPI"],
    lessons: ["SQL selects", "joins", "group by", "window functions", "React components", "state", "forms", "Next.js routing", "API routes", "FastAPI CRUD"],
    dsa: ["Stack", "Queue", "Linked List", "Trees"],
    project: "Placement tracker MVP",
    aptitude: ["logical reasoning", "puzzles", "clocks", "calendars"],
  },
  {
    label: "Month 4",
    theme: "Machine Learning",
    target: ["ML fundamentals", "EDA project", "model evaluation", "300 cumulative DSA"],
    skills: ["Machine Learning", "Python", "System Design"],
    lessons: ["NumPy", "Pandas", "EDA", "linear regression", "classification", "clustering", "metrics", "feature engineering", "model validation"],
    dsa: ["Trees", "Heaps", "Graphs"],
    project: "ML prediction dashboard",
    aptitude: ["data interpretation", "permutations", "combinations", "probability"],
  },
  {
    label: "Month 5",
    theme: "Deep Learning + GenAI",
    target: ["Neural network basics", "LLM fundamentals", "first GenAI app", "380 cumulative DSA"],
    skills: ["Deep Learning", "Generative AI", "LangChain"],
    lessons: ["neural networks", "backpropagation", "PyTorch basics", "transformers", "LLM prompting", "structured outputs", "tool calling", "LangChain basics"],
    dsa: ["Graphs", "Backtracking", "DP"],
    project: "AI chatbot SaaS",
    aptitude: ["mixed aptitude set", "reasoning speed", "verbal basics", "quant revision"],
  },
  {
    label: "Month 6",
    theme: "RAG + AI Agents",
    target: ["RAG PDF assistant", "agent workflows", "Docker deploy", "450 cumulative DSA"],
    skills: ["RAG", "AI Agents", "Docker"],
    lessons: ["embeddings", "vector databases", "chunking", "retrieval", "reranking", "RAG evaluation", "agent planning", "memory", "Docker images", "deployment"],
    dsa: ["DP", "Graphs", "Backtracking"],
    project: "RAG PDF assistant",
    aptitude: ["OA mixed mocks", "puzzles", "probability", "time pressure sets"],
  },
  {
    label: "Month 7",
    theme: "System Design + Placement Sprint",
    target: ["AI system design", "resume final", "mock interviews", "applications pipeline"],
    skills: ["System Design", "AWS", "Interview"],
    lessons: ["caching", "queues", "databases", "scaling", "AI system design", "AWS basics", "resume bullets", "behavioral stories", "mock interview practice"],
    dsa: ["DP revision", "Graphs revision", "Trees revision", "Contest problems"],
    project: "AI agent system",
    aptitude: ["full-length aptitude tests", "HR prep", "communication practice", "company OA sets"],
  },
  {
    label: "Month 8",
    theme: "Interview Conversion",
    target: ["Final revision", "portfolio polish", "mock interviews", "offer readiness"],
    skills: ["Interview", "System Design", "GitHub"],
    lessons: ["DSA revision", "project storytelling", "system design drills", "HR questions", "company research", "offer negotiation", "portfolio polish"],
    dsa: ["Top interview questions", "Company tagged", "Revision sets", "Timed mocks"],
    project: "Portfolio case studies",
    aptitude: ["final OA mocks", "logical reasoning", "verbal practice", "speed revision"],
  },
];

const monthLengths = [31, 30, 31, 31, 30, 31, 30, 31];

function pick(items: string[], index: number) {
  return items[index % items.length];
}

function task(day: number, title: string, category: ExecutionTask["category"], skill: string, xp: number, minutes: number, difficulty: ExecutionTask["difficulty"], index: number): ExecutionTask {
  return {
    key: `day-${day}-${category.toLowerCase()}-${index}`,
    day,
    title,
    category,
    skill,
    xp,
    minutes,
    difficulty,
  };
}

export function buildExecutionPlan(): ExecutionDay[] {
  const plan: ExecutionDay[] = [];
  let day = 1;

  months.forEach((month, monthIndex) => {
    for (let dayInMonth = 1; dayInMonth <= monthLengths[monthIndex]; dayInMonth += 1) {
      const week = Math.floor((dayInMonth - 1) / 7) + 1;
      const lesson = pick(month.lessons, dayInMonth - 1);
      const nextLesson = pick(month.lessons, dayInMonth);
      const dsa = pick(month.dsa, dayInMonth - 1);
      const aptitude = pick(month.aptitude, dayInMonth - 1);
      const isReview = dayInMonth % 7 === 0;
      const difficulty: ExecutionTask["difficulty"] = monthIndex < 2 ? "Beginner" : monthIndex < 5 ? "Intermediate" : "Advanced";

      plan.push({
        day,
        monthIndex,
        month: month.label,
        theme: month.theme,
        dateLabel: `Day ${dayInMonth} of ${month.label}`,
        title: `Day ${day} - ${month.theme}`,
        weeklyTarget: [
          `Week ${week}: complete ${pick(month.lessons, week)} and ${pick(month.dsa, week)} practice`,
          `Solve ${monthIndex < 2 ? 25 : monthIndex < 5 ? 35 : 45} focused DSA questions`,
          `Complete ${week >= 3 ? "one mock/revision cycle" : "daily notes and review"}`,
        ],
        monthlyTarget: month.target,
        tasks: [
          task(day, isReview ? `Revise ${lesson} and make flash notes` : `Learn ${lesson}`, "Learning", pick(month.skills, 0), 45, 45, difficulty, 1),
          task(day, `Practice ${nextLesson} with 3 mini examples`, "Learning", pick(month.skills, 0), 30, 25, difficulty, 2),
          task(day, `Solve ${monthIndex < 2 ? 5 : 4} ${dsa} questions`, "DSA", "DSA", 70, 70, difficulty, 3),
          task(day, `Practice ${aptitude} aptitude set`, "Aptitude", "Aptitude", 35, 30, "Beginner", 4),
          task(day, `Build ${month.project}: ${isReview ? "weekly milestone review" : `step ${((dayInMonth - 1) % 6) + 1}`}`, "Project", pick(month.skills, 1), 55, 45, difficulty, 5),
          task(day, isReview ? "Weekly review: update notes, blockers, and next actions" : "Update notes with today's learning", "Notes", "GitHub", 20, 15, "Beginner", 6),
          task(day, monthIndex >= 5 ? "Mock interview or HR/story practice" : "Revise yesterday's mistakes", monthIndex >= 5 ? "Interview" : "Revision", monthIndex >= 5 ? "Interview" : pick(month.skills, 0), 35, 30, difficulty, 7),
        ],
      });
      day += 1;
    }
  });

  return plan;
}

export const executionPlan = buildExecutionPlan();

export const dsaExecutionTopics = [
  "Arrays", "Strings", "Hashing", "Linked List", "Stack", "Queue", "Trees", "Heaps", "Graphs", "DP", "Backtracking", "Sliding Window", "Binary Search",
].map((topic, index) => ({
  topic,
  questions: 30 + index * 5,
  revision: index % 3 === 0 ? "Every Sunday" : "Every 10 days",
}));

export const projectExecutionTracks = [
  { name: "AI Chatbot", steps: ["Setup frontend", "Setup backend", "Add Gemini/OpenAI API", "Add authentication", "Add chat history", "Deploy app"] },
  { name: "RAG PDF Assistant", steps: ["Upload PDFs", "Chunk documents", "Create embeddings", "Add vector search", "Generate cited answers", "Deploy demo"] },
  { name: "AI Agent System", steps: ["Define tools", "Build planner", "Add memory", "Create executor", "Add logs", "Deploy worker"] },
];

export function getNextExecutionDay(completedTaskKeys: string[]) {
  const completed = new Set(completedTaskKeys);
  const nextDay = executionPlan.find((day) => day.tasks.some((task) => !completed.has(task.key)));
  return nextDay?.day ?? executionPlan.length;
}
