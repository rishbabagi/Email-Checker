"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  {
    label: "Suspicious PayPal email",
    message:
      "Subject: Your PayPal account has been limited\n\nDear Customer,\n\nWe've noticed unusual activity on your account. Your access has been limited until we hear from you. Please confirm your identity within 24 hours by clicking the link below, or your account will be permanently suspended.\n\nConfirm Now: http://paypal-account-verify-secure.com\n\nThank you,\nPayPal Support Team",
  },
  {
    label: "Fake delivery notice",
    message:
      "Subject: Delivery Failed - Action Required\n\nHi,\n\nWe attempted to deliver your package today but were unable to complete delivery. To reschedule, please confirm your address and pay a small redelivery fee of $1.99 here: http://usps-redelivery-track.net\n\nIf you do not respond within 48 hours, your package will be returned to sender.\n\nUSPS Delivery Team",
  },
  {
    label: "Account suspension warning",
    message:
      "Subject: Immediate Action Required: Your Account Will Be Closed\n\nDear User,\n\nOur security team detected a login attempt from an unrecognized device. To prevent your account from being permanently closed, please verify your password and security questions immediately at the link below.\n\nVerify Account: http://secure-login-verification.info\n\nFailure to verify within 12 hours will result in permanent suspension.\n\nSecurity Department",
  },
  {
    label: "Prize / lottery scam",
    message:
      "Subject: Congratulations! You've Won $1,000,000\n\nDear Winner,\n\nYou have been selected as the winner of our International Email Lottery. To claim your prize, please reply with your full name, address, phone number, and a copy of your ID.\n\nClaim your winnings by contacting our claims agent at claims@intl-lottery-winnings.com\n\nBest regards,\nInternational Lottery Commission",
  },
];

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

  const submitMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
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

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage(input);
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

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => submitMessage(s.message)}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-mist-dim transition-colors hover:border-accent hover:text-mist"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

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
