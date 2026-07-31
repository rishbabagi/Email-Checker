"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface ApiMessage {
  role: "user" | "assistant";
  content: string | ContentPart[];
}

function toApiMessage(m: Message): ApiMessage {
  if (m.imageUrl) {
    const parts: ContentPart[] = [];
    if (m.content.trim()) {
      parts.push({ type: "text", text: m.content });
    }
    parts.push({ type: "image_url", image_url: { url: m.imageUrl } });
    return { role: m.role, content: parts };
  }
  return { role: m.role, content: m.content };
}

const TEST_EMAIL =
  "Subject: Your PayPal account has been limited\n\nDear Customer,\n\nWe've noticed unusual activity on your account. Your access has been limited until we hear from you. Please confirm your identity within 24 hours by clicking the link below, or your account will be permanently suspended.\n\nConfirm Now: http://paypal-account-verify-secure.com\n\nThank you,\nPayPal Support Team";

const STARTERS = [
  {
    label: "I think I got a scam email",
    message:
      "Hey, I got an email and I think it might be a scam. Can you help me check it?",
  },
  {
    label: "What should I send you?",
    message: "What information should I give you to check an email?",
  },
  {
    label: "How do I spot phishing?",
    message: "What are the warning signs of a phishing email?",
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsAuthed(!!data.user);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthed(!!session);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitMessage = async (text: string, imageUrl?: string) => {
    if ((!text.trim() && !imageUrl) || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      ...(imageUrl ? { imageUrl } : {}),
    };

    const history = [...messages, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPendingImage(null);
    setIsLoading(true);
    setError("");
    setNeedsAuth(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: history.map(toApiMessage),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || `Failed to get response from chatbot (${response.status})`
        );
      }

      if (!response.body) {
        throw new Error("No response stream received");
      }

      // Groq responds fast enough that raw chunks can arrive almost all at
      // once. Buffer the incoming text and reveal it at a steady, readable
      // pace so it visibly flows in rather than popping in as one block.
      await new Promise<void>((resolve, reject) => {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        let fullText = "";
        let revealedLength = 0;
        let networkDone = false;
        let started = false;
        let timer: ReturnType<typeof setTimeout> | null = null;

        const reveal = () => {
          if (revealedLength < fullText.length) {
            revealedLength = Math.min(fullText.length, revealedLength + 3);
            const visible = fullText.slice(0, revealedLength);

            if (!started) {
              started = true;
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: visible },
              ]);
            } else {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: visible,
                };
                return updated;
              });
            }
          }

          if (revealedLength >= fullText.length && networkDone) {
            resolve();
          } else {
            timer = setTimeout(reveal, 20);
          }
        };

        (async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                networkDone = true;
                break;
              }
              fullText += decoder.decode(value, { stream: true });
            }
          } catch (err) {
            if (timer) clearTimeout(timer);
            reject(err);
          }
        })();

        reveal();
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const runGated = (action: () => void) => {
    if (!isAuthed) {
      setError("");
      setNeedsAuth(true);
      return;
    }
    setNeedsAuth(false);
    action();
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runGated(() => submitMessage(input, pendingImage || undefined));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    setNeedsAuth(false);
    setPendingImage(null);
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
              {isAuthed
                ? "Ask about a suspicious email and get a security assessment"
                : "Try the sample email below, or sign in for full access"}
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => submitMessage(TEST_EMAIL)}
            disabled={isLoading}
            className="rounded-full bg-accent px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Test with a sample email
          </button>
          <span className="mx-1 h-4 w-px bg-border" />
          {STARTERS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => runGated(() => submitMessage(s.message))}
              disabled={isLoading}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-mist-dim transition-colors hover:border-accent hover:text-mist disabled:cursor-not-allowed disabled:opacity-40"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="card mb-4 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
          {messages.length === 0 && !error && !needsAuth && (
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
                {message.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={message.imageUrl}
                    alt="Attached email screenshot"
                    className="mb-2 max-h-48 w-full rounded-lg object-cover"
                  />
                )}
                {message.content && (
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
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

          {needsAuth && (
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-5 py-4 text-center">
                <p className="text-sm text-mist">
                  Please sign in to use this feature.
                </p>
                <Link
                  href="/login"
                  className="rounded-lg bg-accent px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90"
                >
                  Sign In
                </Link>
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

        {/* Pending image preview */}
        {pendingImage && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pendingImage}
              alt="Selected screenshot preview"
              className="h-10 w-10 rounded object-cover"
            />
            <span className="flex-1 text-xs text-mist-dim">
              Screenshot attached
            </span>
            <button
              type="button"
              onClick={() => setPendingImage(null)}
              className="text-xs text-mist-dim transition-colors hover:text-mist"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => runGated(() => fileInputRef.current?.click())}
            disabled={isLoading}
            aria-label="Attach a screenshot"
            title="Attach a screenshot"
            className="flex items-center justify-center rounded-lg border border-border bg-card px-3 text-mist-dim transition-colors hover:border-accent hover:text-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 16.5 4.72-4.72a1.5 1.5 0 0 1 2.12 0l2.91 2.91a1.5 1.5 0 0 0 2.12 0l1.66-1.66a1.5 1.5 0 0 1 2.12 0l2.6 2.6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 8.25h.008v.008h-.008V8.25Z"
              />
            </svg>
          </button>
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
            disabled={isLoading || (!input.trim() && !pendingImage)}
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
