"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ScanReveal from "../components/ScanReveal";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/chatbot");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center border border-circuit bg-bg-panel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-7 w-7 text-signal"
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
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-mist">
            PhishGuard
          </h1>
          <p className="max-w-xs text-center text-sm text-mist-dim">
            Sign in to scan and verify suspicious emails before they reach
            your inbox.
          </p>
        </div>

        {/* Card */}
        <ScanReveal>
          <div className="scan-panel p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-wider text-mist-dim"
                >
                  Work email
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-dim"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0-.828.672-1.5 1.5-1.5h16.5c.828 0 1.5.672 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3 7 9 6 9-6"
                    />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-circuit bg-bg-base py-2.5 pl-9 pr-3 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="font-mono text-xs uppercase tracking-wider text-mist-dim"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-signal hover:text-mist"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-dim"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V7.5a4.5 4.5 0 1 0-9 0v3M5.25 10.5h13.5a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-8.25a.75.75 0 0 1 .75-.75Z"
                    />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-circuit bg-bg-base py-2.5 pl-9 pr-3 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-mist-dim">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 border-circuit bg-bg-base text-signal focus:ring-signal"
                />
                Keep me signed in on this device
              </label>

              {error && (
                <p className="border border-alert/30 bg-alert/10 px-3 py-2 text-xs text-alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="scan-btn mt-1 flex items-center justify-center gap-2 bg-signal py-2.5 font-mono text-sm font-medium uppercase tracking-wide text-bg-base transition-colors hover:bg-signal/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-bg-base/30 border-t-bg-base" />
                    Verifying identity…
                  </>
                ) : (
                  "Sign in securely"
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[11px] text-mist-dim">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-3.5 w-3.5 shrink-0 text-signal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7.5a4.5 4.5 0 1 0-9 0v3M5.25 10.5h13.5a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-8.25a.75.75 0 0 1 .75-.75Z"
                />
              </svg>
              <span>
                Your credentials are encrypted in transit. We will never ask
                for your password by email.
              </span>
            </div>
          </div>
        </ScanReveal>

        <p className="mt-6 text-center text-xs text-mist-dim">
          No account yet?{" "}
          <a href="/signup" className="text-signal hover:text-mist">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
