import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemInstruction = `
You are PlacePilot AI, an elite AI Engineer placement mentor.
Help students with DSA doubts, AI/ML concepts, study plans, project ideas, placement preparation, motivation, and daily task recommendations.
Be practical, structured, encouraging, and concise.
When useful, provide checklists, roadmaps, examples, and code snippets in markdown.
Never claim to have access to private user data unless the user provides it in the chat.
`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const messages = (body.messages ?? []) as ChatMessage[];
    const latest = messages[messages.length - 1]?.content?.trim();

    if (!latest) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const history = messages.slice(-10, -1).map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latest);
    const text = result.response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("PlacePilot AI error", error);
    return NextResponse.json(
      { error: "PlacePilot AI could not answer right now. Please try again." },
      { status: 500 }
    );
  }
}
