"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ScanReveal from "../components/ScanReveal";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-base px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[60vmin] w-[60vmin] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center border border-circuit bg-bg-panel lg:h-16 lg:w-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-7 w-7 text-signal lg:h-8 lg:w-8"
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
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-mist lg:text-3xl">
            PhishGuard
          </h1>
          <p className="max-w-xs text-center text-sm text-mist-dim">
            Create an account to start scanning suspicious emails.
          </p>
        </div>

        <ScanReveal>
          <div className="scan-panel p-8">
            {submitted ? (
              <p className="text-center text-sm text-mist-dim">
                Check <span className="text-signal">{email}</span> to
                confirm your account, then{" "}
                <a href="/login" className="text-signal hover:text-mist">
                  sign in
                </a>
                .
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-mono text-xs uppercase tracking-wider text-mist-dim"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-circuit bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-mono text-xs uppercase tracking-wider text-mist-dim"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full border border-circuit bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal"
                  />
                </div>

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
                      Creating account…
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            )}
          </div>
        </ScanReveal>

        <p className="mt-6 text-center text-xs text-mist-dim">
          Already have an account?{" "}
          <a href="/login" className="text-signal hover:text-mist">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
