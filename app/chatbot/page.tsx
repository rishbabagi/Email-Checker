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
    <div className="relative min-h-screen overflow-hidden bg-bg-base">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[60vmin] w-[60vmin] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex h-screen max-w-2xl flex-col p-4 lg:max-w-3xl lg:p-6 xl:max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3 pt-4 lg:mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-circuit bg-bg-panel lg:h-12 lg:w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5 text-signal lg:h-6 lg:w-6"
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
          </div>
          <div>
            <h1 className="font-display text-xl font-bold uppercase tracking-tight text-mist lg:text-2xl">
              PhishGuard Assistant
            </h1>
            <p className="font-mono text-xs text-mist-dim lg:text-sm">
              Ask about a suspicious email and get a security assessment
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="scan-panel mb-4 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
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
                    ? "max-w-xs bg-signal px-4 py-3 text-bg-base lg:max-w-md xl:max-w-lg"
                    : "scan-panel max-w-xs px-4 py-3 text-mist lg:max-w-md xl:max-w-lg"
                }
              >
                {message.role === "assistant" && (
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-signal">
                    Scan result
                  </p>
                )}
                <p className="whitespace-pre-wrap text-sm">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="scan-panel px-4 py-3 text-mist">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-signal"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-signal delay-100"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-signal delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="border border-alert/30 bg-alert/10 px-4 py-3 text-alert">
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
            className="flex-1 border border-circuit bg-bg-panel px-4 py-2 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal disabled:opacity-60 lg:py-2.5 lg:text-base"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="scan-btn bg-signal px-6 py-2 font-mono text-sm font-medium uppercase tracking-wide text-bg-base transition-colors hover:bg-signal/90 disabled:cursor-not-allowed disabled:bg-circuit disabled:text-mist-dim lg:px-8 lg:py-2.5"
          >
            Send
          </button>
          <button
            type="button"
            onClick={clearChat}
            className="border border-circuit bg-bg-panel px-4 py-2 font-mono text-sm uppercase tracking-wide text-mist-dim transition-colors hover:border-signal hover:text-signal lg:px-5 lg:py-2.5"
          >
            Clear
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-4 text-center font-mono text-xs text-mist-dim">
          <p>Make sure GROQ_API_KEY is set in your .env.local file</p>
        </div>
      </div>
    </div>
  );
}
