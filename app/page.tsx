import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-950 via-slate-900 to-emerald-950">
      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/30 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-10 w-10 text-emerald-400"
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

        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-white">
          Phish<span className="text-emerald-400">Guard</span>
        </h1>
        <p className="mt-5 max-w-md text-base sm:text-lg text-slate-400">
          Spot phishing emails before they catch you. Paste a suspicious
          message and get an instant security assessment.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/chatbot"
            className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Check an email
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-emerald-500 hover:text-emerald-400"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
