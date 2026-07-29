import ScanReveal from "../components/ScanReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base px-4 py-16 lg:py-24">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        {/* Brand */}
        <div className="mb-4 flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
            className="h-9 w-9 text-mist"
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
          <h1 className="font-display text-2xl font-semibold text-mist lg:text-3xl">
            About the Founder
          </h1>
        </div>

        <ScanReveal>
          <section className="card p-8 lg:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-bg-base text-xl font-semibold text-mist-dim lg:h-20 lg:w-20 lg:text-2xl">
                ?
              </div>
              <div className="flex flex-col gap-2 text-sm leading-relaxed text-mist-dim lg:text-base">
                <p className="font-display text-lg font-semibold text-mist">
                  {/* TODO: replace with your name */}
                  Your Name
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-accent">
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
                  <a href="#" className="text-accent hover:underline">
                    {/* TODO: link your email/contact */}
                    Contact
                  </a>
                  <a href="#" className="text-accent hover:underline">
                    {/* TODO: link your GitHub */}
                    GitHub
                  </a>
                  <a href="#" className="text-accent hover:underline">
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
