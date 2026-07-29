"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="mx-auto flex h-screen max-w-2xl flex-col p-4 lg:max-w-3xl lg:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3 pt-4 lg:mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
            className="h-8 w-8 shrink-0 text-mist"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.5 4.5 5.75v5.5c0 5.2 3.2 8.9 7.5 10.25 4.3-1.35 7.5-5.05 7.5-10.25v-5.5L12 2.5Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.25 2.1 2.1L15.5 10"
            />
          </svg>
          <div>
            <h1 className="font-display text-xl font-semibold text-mist lg:text-2xl">
              PhishGuard Assistant
            </h1>
            <p className="text-xs text-mist-dim lg:text-sm">
              Ask about a suspicious email and get a security assessment
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="card mb-4 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
          {messages.length === 0 && !error && (
            <div className="flex h-full items-center justify-center text-sm text-mist-dim">
              <p>Paste an email or describe what looks suspicious to begin.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-xs rounded-2xl bg-accent px-4 py-3 text-bg-base lg:max-w-md"
                    : "max-w-xs rounded-2xl border border-border bg-bg-base px-4 py-3 text-mist lg:max-w-md"
                }
              >
                <p className="whitespace-pre-wrap text-sm">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-border bg-bg-base px-4 py-3 text-mist">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-accent"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-accent delay-100"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-accent delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="rounded-lg border border-alert/30 bg-alert/10 px-4 py-3 text-alert">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-accent disabled:opacity-60 lg:py-2.5 lg:text-base"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-accent px-6 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 lg:px-8 lg:py-2.5"
          >
            Send
          </button>
          <button
            type="button"
            onClick={clearChat}
            className="rounded-lg border border-border px-4 py-2 font-mono text-xs uppercase tracking-wide text-mist-dim transition-colors hover:bg-card hover:text-mist lg:px-5 lg:py-2.5"
          >
            Clear
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-4 text-center text-xs text-mist-dim">
          <p>Make sure GROQ_API_KEY is set in your .env.local file</p>
        </div>
      </div>
    </div>
  );
}
