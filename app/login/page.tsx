"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-950 via-slate-900 to-emerald-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-7 w-7 text-emerald-400"
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
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            PhishGuard
          </h1>
          <p className="text-sm text-slate-400 text-center max-w-xs">
            Sign in to scan and verify suspicious emails before they reach
            your inbox.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-300"
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
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
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
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-emerald-400 hover:text-emerald-300"
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
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
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
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
              />
              Keep me signed in on this device
            </label>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                  Verifying identity…
                </>
              ) : (
                "Sign in securely"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-[11px] text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-3.5 w-3.5 shrink-0 text-emerald-500"
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

        <p className="mt-6 text-center text-xs text-slate-500">
          No account yet?{" "}
          <a
            href="/signup"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
