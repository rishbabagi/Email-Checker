export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-emerald-950 px-4 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-4">
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
            About Us
          </h1>
        </div>

        {/* About the project */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 p-8">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">
            About PhishGuard
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-300">
            <p>
              Phishing emails are getting harder to spot. Attackers spoof
              trusted domains, mimic real companies, and use urgency to
              pressure people into clicking links or handing over
              credentials — and traditional spam filters don&apos;t always
              catch them.
            </p>
            <p>
              PhishGuard gives anyone a quick way to check a suspicious
              email before acting on it. Paste in the message or describe
              what looks off, and get an instant assessment of the warning
              signs — no security background required.
            </p>
            <p>
              {/* TODO: update once real detection logic is added */}
              This project is under active development. The goal is a
              lightweight, conversational tool that closes the gap between
              &quot;something feels off about this email&quot; and actually
              knowing whether it&apos;s safe.
            </p>
          </div>
        </section>

        {/* About the founder */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 p-8">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">
            About the Founder
          </h2>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xl font-semibold">
              ?
            </div>
            <div className="flex flex-col gap-2 text-sm leading-relaxed text-slate-300">
              <p className="text-white font-medium text-base">
                {/* TODO: replace with your name */}
                Your Name
              </p>
              <p className="text-slate-400 text-xs uppercase tracking-wide">
                {/* TODO: replace with your role/title */}
                Founder &amp; Developer
              </p>
              <p>
                {/* TODO: replace with your bio */}
                Add a short bio here — what got you interested in phishing
                detection, your background, and why you started building
                PhishGuard.
              </p>
              <div className="flex gap-4 mt-1 text-xs">
                <a
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  {/* TODO: link your email/contact */}
                  Contact
                </a>
                <a
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  {/* TODO: link your GitHub */}
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  {/* TODO: link your LinkedIn */}
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
