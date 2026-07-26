import Link from "next/link";
import ScanReveal from "./components/ScanReveal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <ScanReveal className="flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center border border-circuit bg-bg-panel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-10 w-10 text-signal"
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

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-mist-dim">
            Scan_status · idle
          </p>

          <h1
            className="font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight text-mist [text-shadow:0_0_32px_rgba(52,245,164,0.28)] sm:text-7xl"
            style={{ textWrap: "balance" }}
          >
            Phish<span className="text-signal">Guard</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-mist-dim sm:text-lg">
            Spot phishing emails before they catch you. Paste a suspicious
            message and get an instant security assessment.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/chatbot"
              className="scan-btn bg-signal px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-bg-base transition-colors hover:bg-signal/90"
            >
              Check an email
            </Link>
            <Link
              href="/login"
              className="border border-circuit bg-bg-panel/60 px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-mist-dim backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
            >
              Sign in
            </Link>
          </div>
        </ScanReveal>
      </main>
    </div>
  );
}
