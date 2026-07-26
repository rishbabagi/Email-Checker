import Link from "next/link";
import ScanReveal from "./components/ScanReveal";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg-base">
      {/* ambient glow — keeps large viewports from reading as an empty void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[70vmin] w-[70vmin] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <ScanReveal className="flex w-full max-w-3xl flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center border border-circuit bg-bg-panel lg:h-24 lg:w-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-10 w-10 text-signal lg:h-12 lg:w-12"
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

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-mist-dim lg:text-sm">
            Scan_status · idle
          </p>

          <h1
            className="font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight text-mist [text-shadow:0_0_32px_rgba(52,245,164,0.28)] sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{ textWrap: "balance" }}
          >
            Phish<span className="text-signal">Guard</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-mist-dim sm:text-lg lg:max-w-xl lg:text-xl">
            Spot phishing emails before they catch you. Paste a suspicious
            message and get an instant security assessment.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-12">
            <Link
              href="/chatbot"
              className="scan-btn bg-signal px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-bg-base transition-colors hover:bg-signal/90 lg:px-8 lg:py-3.5 lg:text-base"
            >
              Check an email
            </Link>
            <Link
              href="/login"
              className="border border-circuit bg-bg-panel/60 px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-mist-dim backdrop-blur-sm transition-colors hover:border-signal hover:text-signal lg:px-8 lg:py-3.5 lg:text-base"
            >
              Sign in
            </Link>
          </div>
        </ScanReveal>
      </main>
    </div>
  );
}
