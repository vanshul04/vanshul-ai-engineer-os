"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Code2, Loader2, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What should I learn today?",
  "Create my DSA roadmap",
  "Explain dynamic programming",
  "Suggest AI projects",
  "Help me crack HIGH LPA placements",
];

function MarkdownLite({ content }: { content: string }) {
  const blocks = content.split(/```/g);
  return (
    <div className="space-y-3 text-sm leading-6">
      {blocks.map((block, index) => {
        if (index % 2 === 1) {
          const code = block.replace(/^[a-zA-Z]+\n/, "");
          return (
            <pre key={index} className="overflow-x-auto rounded-2xl border border-white/10 bg-black/45 p-4 text-xs text-cyan-50">
              <code>{code}</code>
            </pre>
          );
        }

        return (
          <div key={index} className="space-y-2">
            {block.split("\n").filter(Boolean).map((line, lineIndex) => {
              const cleaned = line.replace(/\*\*(.*?)\*\*/g, "$1");
              if (cleaned.startsWith("- ") || cleaned.startsWith("* ")) {
                return <p key={lineIndex} className="pl-3 text-slate-300">• {cleaned.slice(2)}</p>;
              }
              if (/^\d+\.\s/.test(cleaned)) {
                return <p key={lineIndex} className="text-slate-300">{cleaned}</p>;
              }
              if (cleaned.startsWith("#")) {
                return <p key={lineIndex} className="font-black text-white">{cleaned.replace(/^#+\s?/, "")}</p>;
              }
              return <p key={lineIndex} className="text-slate-300">{cleaned}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export function PlacePilotAIChat({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I’m PlacePilot AI. Ask me about DSA, AI/ML, projects, placements, or what to execute today.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const visibleMessages = useMemo(() => messages, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(value?: string) {
    const content = (value ?? input).trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "AI request failed.");

      const text = String(body.message ?? "");
      let streamed = "";
      setMessages((current) => [...current, { role: "assistant", content: "" }]);

      for (const token of text.split(" ")) {
        streamed += `${token} `;
        await new Promise((resolve) => setTimeout(resolve, 12));
        setMessages((current) => {
          const copy = [...current];
          copy[copy.length - 1] = { role: "assistant", content: streamed.trim() };
          return copy;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <>
      <Button variant={compact ? "ghost" : "primary"} onClick={() => setOpen(true)} className={compact ? "px-3 py-2" : ""}>
        <Bot size={16} /> Talk With AI
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="ml-auto flex h-full w-full max-w-2xl flex-col border-l border-white/10 bg-[#070911]/95 shadow-2xl"
            >
              <header className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-100">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black">PlacePilot AI</h2>
                    <p className="text-xs text-slate-500">Elite AI Engineer mentor</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </header>

              <div className="border-b border-white/10 p-4">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {suggestions.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {visibleMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[86%] rounded-3xl border p-4 ${message.role === "user" ? "border-cyan-300/20 bg-cyan-300/12 text-white" : "border-white/10 bg-white/[.045]"}`}>
                      {message.content ? <MarkdownLite content={message.content} /> : (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Loader2 className="animate-spin" size={15} /> Thinking...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="animate-spin" size={15} /> PlacePilot AI is typing...
                  </div>
                )}
                {error && <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p>}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={onSubmit} className="border-t border-white/10 p-4">
                <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[.04] p-2">
                  <Code2 className="mb-2 ml-2 text-cyan-200" size={18} />
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Ask PlacePilot AI anything..."
                    className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                  <Button disabled={loading || !input.trim()} className="px-3 py-2">
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  </Button>
                </div>
              </form>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
