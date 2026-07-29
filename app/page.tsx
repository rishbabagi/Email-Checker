import Link from "next/link";
import ScanReveal from "./components/ScanReveal";

const steps = [
  {
    title: "Paste the email",
    description:
      "Drop in the message you're unsure about, or just describe what looked off.",
  },
  {
    title: "AI reads it closely",
    description:
      "We check for spoofed senders, urgency tactics, and other common phishing signals.",
  },
  {
    title: "Get a clear verdict",
    description:
      "A plain-language assessment of the risk, in seconds — no security background needed.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg-base">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[65vmin] w-[65vmin] rounded-full bg-accent/10 blur-[130px]" />
      </div>

      {/* Hero */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-28 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.1}
          className="mb-6 h-10 w-10 text-mist"
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

        <h1 className="font-mono text-4xl font-bold uppercase tracking-wide text-mist sm:text-5xl lg:text-6xl">
          PhishGuard
        </h1>
        <p
          className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight text-mist sm:text-3xl lg:text-4xl"
          style={{ textWrap: "balance" }}
        >
          Spot phishing before it catches you
        </p>
        <p className="mt-5 max-w-md text-base text-mist-dim sm:text-lg">
          Paste a suspicious email and get an instant, plain-language
          security assessment.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/chatbot"
            className="rounded-lg bg-accent px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90"
          >
            Try it out
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-mist transition-colors hover:bg-card"
          >
            Sign in
          </Link>
        </div>
      </main>

      {/* How it works */}
      <section className="border-t border-border px-4 py-20 sm:py-28">
        <ScanReveal className="mx-auto max-w-5xl">
          <p className="text-center font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-semibold text-mist sm:text-4xl">
            Three steps to peace of mind
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-3">
                <span className="font-mono text-2xl text-accent">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-mist">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-mist-dim">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </ScanReveal>
      </section>

      {/* About */}
      <section className="border-t border-border px-4 py-20 sm:py-28">
        <ScanReveal className="mx-auto max-w-2xl">
          <div className="card p-8 lg:p-10">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              About PhishGuard
            </p>
            <div className="flex flex-col gap-4 text-left text-sm leading-relaxed text-mist-dim lg:text-base">
              <p>
                Phishing emails are getting harder to spot. Attackers spoof
                trusted domains, mimic real companies, and use urgency to
                pressure people into clicking links or handing over
                credentials — and traditional spam filters don&apos;t
                always catch them.
              </p>
              <p>
                PhishGuard gives anyone a quick way to check a suspicious
                email before acting on it. Paste in the message or describe
                what looks off, and get an instant assessment of the
                warning signs — no security background required.
              </p>
              <p>
                {/* TODO: update once real detection logic is added */}
                This project is under active development. The goal is a
                lightweight, conversational tool that closes the gap
                between &quot;something feels off about this email&quot;
                and actually knowing whether it&apos;s safe.
              </p>
            </div>
          </div>
        </ScanReveal>
      </section>
    </div>
  );
}
