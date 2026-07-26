import ScanReveal from "../components/ScanReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        {/* Brand */}
        <div className="mb-4 flex flex-col items-center gap-3">
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
            About Us
          </h1>
        </div>

        {/* About the project */}
        <ScanReveal>
          <section className="scan-panel p-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
              About PhishGuard
            </p>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-mist-dim">
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
          </section>
        </ScanReveal>

        {/* About the founder */}
        <ScanReveal>
          <section className="scan-panel p-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
              About the Founder
            </p>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-circuit bg-bg-base text-xl font-semibold text-mist-dim">
                ?
              </div>
              <div className="flex flex-col gap-2 text-sm leading-relaxed text-mist-dim">
                <p className="font-display text-base font-semibold text-mist">
                  {/* TODO: replace with your name */}
                  Your Name
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-mist-dim">
                  {/* TODO: replace with your role/title */}
                  Founder &amp; Developer
                </p>
                <p>
                  {/* TODO: replace with your bio */}
                  Add a short bio here — what got you interested in
                  phishing detection, your background, and why you started
                  building PhishGuard.
                </p>
                <div className="mt-1 flex gap-4 text-xs">
                  <a href="#" className="text-signal hover:text-mist">
                    {/* TODO: link your email/contact */}
                    Contact
                  </a>
                  <a href="#" className="text-signal hover:text-mist">
                    {/* TODO: link your GitHub */}
                    GitHub
                  </a>
                  <a href="#" className="text-signal hover:text-mist">
                    {/* TODO: link your LinkedIn */}
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScanReveal>
      </div>
    </div>
  );
}
