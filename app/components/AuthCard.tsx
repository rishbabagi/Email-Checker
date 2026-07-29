"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ScanReveal from "./ScanReveal";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11C3.24 21.3 7.28 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function AuthCard({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setSubmitted(true);
      return;
    }

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

  const handleGoogle = async () => {
    setError(null);
    setIsGoogleLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/chatbot` },
    });
    if (error) {
      setError(error.message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-base px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[50vmin] w-[50vmin] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            className="h-6 w-6 text-mist"
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
          <span className="font-mono text-lg font-semibold uppercase tracking-wide text-mist">
            PhishGuard
          </span>
        </div>

        <ScanReveal>
          <div className="card p-6">
            {/* Tabs */}
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-bg-base p-1">
              <Link
                href="/login"
                className={`rounded-md py-2 text-center font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${
                  mode === "signin"
                    ? "bg-accent text-bg-base"
                    : "text-mist-dim hover:text-mist"
                }`}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className={`rounded-md py-2 text-center font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${
                  mode === "signup"
                    ? "bg-accent text-bg-base"
                    : "text-mist-dim hover:text-mist"
                }`}
              >
                Sign up
              </Link>
            </div>

            {mode === "signup" && submitted ? (
              <p className="py-2 text-center text-sm text-mist-dim">
                Check <span className="text-mist">{email}</span> to confirm
                your account, then{" "}
                <Link href="/login" className="text-accent hover:underline">
                  sign in
                </Link>
                .
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={isGoogleLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-bg-base py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-mist transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon />
                  {isGoogleLoading ? "Redirecting…" : "Continue with Google"}
                </button>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-mist-dim">or</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-mist"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-mist"
                      >
                        Password
                      </label>
                      {mode === "signin" && (
                        <a
                          href="#"
                          className="text-xs text-accent hover:underline"
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={mode === "signup" ? 6 : undefined}
                      autoComplete={
                        mode === "signup" ? "new-password" : "current-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-border bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-accent"
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg border border-alert/30 bg-alert/10 px-3 py-2 text-xs text-alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-1 flex items-center justify-center rounded-lg bg-accent py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading
                      ? mode === "signup"
                        ? "Creating account…"
                        : "Signing in…"
                      : mode === "signup"
                        ? "Create account"
                        : "Sign in"}
                  </button>
                </form>
              </>
            )}
          </div>
        </ScanReveal>

        <p className="mt-6 text-center text-xs text-mist-dim">
          By continuing you agree to our terms of service.
        </p>
      </div>
    </div>
  );
}
