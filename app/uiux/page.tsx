"use client";

import { useState } from "react";
import ScanReveal from "../components/ScanReveal";

const swatches = [
  {
    name: "Base",
    hex: "#05080F",
    className: "bg-bg-base",
    use: "Page ground — deep navy, not neutral black.",
  },
  {
    name: "Card",
    hex: "#0C1220",
    className: "bg-card",
    use: "Card and panel fill, one step up from the ground.",
  },
  {
    name: "Border",
    hex: "#1C2740",
    className: "bg-border",
    use: "Hairline borders on cards, inputs, and dividers.",
  },
  {
    name: "Accent",
    hex: "#22D3EE",
    className: "bg-accent",
    use: "The only bright color on the page — primary buttons, active tab, links.",
  },
  {
    name: "Mist",
    hex: "#E6F1F7",
    className: "bg-mist",
    use: "Primary text.",
  },
  {
    name: "Alert",
    hex: "#FB7185",
    className: "bg-alert",
    use: "Form errors only. Never decorative.",
  },
];

const pageNotes = [
  {
    name: "Home",
    note: "Hero with two CTAs above the fold (Try it out / Sign in), then a How-it-works section and an About panel below.",
  },
  {
    name: "Login / Signup",
    note: "One shared card component with a tab toggle — switching tabs navigates between /login and /signup without changing the layout.",
  },
  {
    name: "About",
    note: "Founder only — no product copy. A single card: photo, name, role, bio, links.",
  },
  {
    name: "Chatbot",
    note: "User messages are accent-filled bubbles; assistant replies are plain outlined bubbles on the base color.",
  },
];

export default function UiUxPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-bg-base px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-[180px_minmax(0,1fr)] lg:max-w-6xl">
        {/* Rail */}
        <nav className="hidden h-fit flex-col gap-1 md:sticky md:top-16 md:flex">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-mist-dim">
            Contents
          </p>
          {[
            ["#direction", "Direction"],
            ["#color", "Color"],
            ["#type", "Type"],
            ["#components", "Components"],
            ["#pages", "Pages"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="border-l-2 border-border py-1.5 pl-3 text-sm text-mist-dim transition-colors hover:border-accent hover:text-mist"
            >
              {label}
            </a>
          ))}
        </nav>

        <main>
          <header className="mb-14 max-w-xl">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              Visual Identity — v3
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-mist sm:text-5xl">
              PhishGuard
            </h1>
            <p className="mt-4 max-w-md text-base text-mist-dim">
              A clean, professional identity with a cybersecurity edge —
              kept here in the project so any page can be checked against
              it.
            </p>
          </header>

          <ScanReveal>
            <section id="direction" className="card mb-7 p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                01 — Direction
              </p>
              <h2 className="mb-4 font-display text-xl font-semibold text-mist">
                Terminal calm
              </h2>
              <p className="mb-3 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                A deep navy ground instead of neutral black, lit by one
                cyan accent — closer to a security console than a generic
                dark theme. Generous whitespace and restrained motion keep
                it feeling calm and trustworthy rather than alarmist.
              </p>
              <p className="max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                Rounded cards and soft borders carry the layout; monospace
                accents on wordmarks, labels, and buttons are the one
                deliberate nod to &quot;security tool&quot; without tipping
                into the bracket-and-scanline HUD look this project used
                earlier.
              </p>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="color" className="card mb-7 p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                02 — Color
              </p>
              <h2 className="mb-4 font-display text-xl font-semibold text-mist">
                One accent, used sparingly
              </h2>
              <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                Everything is navy and cool gray except a single cyan
                accent reserved for the things people should act on:
                primary buttons, the active tab, links.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {swatches.map((s) => (
                  <div key={s.name} className="rounded-lg border border-border">
                    <div className={`h-16 rounded-t-lg ${s.className}`} />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-mist">
                        {s.name}
                      </p>
                      <p className="mb-1.5 font-mono text-[11px] text-mist-dim">
                        {s.hex}
                      </p>
                      <p className="text-xs leading-snug text-mist-dim">
                        {s.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="type" className="card mb-7 p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                03 — Type
              </p>
              <h2 className="mb-6 font-display text-xl font-semibold text-mist">
                Three faces, three jobs
              </h2>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Space Grotesk — headline
              </p>
              <p className="mb-6 font-display text-3xl font-semibold leading-tight text-mist sm:text-4xl">
                Spot phishing before it catches you
              </p>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Inter — body
              </p>
              <p className="mb-6 max-w-[60ch] text-base leading-relaxed text-mist">
                Paste a suspicious email and get an instant, plain-language
                security assessment.
              </p>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                JetBrains Mono — wordmarks, labels, buttons
              </p>
              <p className="font-mono text-sm uppercase tracking-wide text-accent">
                Sign in · Try it out · Continue with Google
              </p>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="components" className="card mb-7 p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                04 — Components
              </p>
              <h2 className="mb-6 font-display text-xl font-semibold text-mist">
                Nav, tabs, fields
              </h2>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Nav — click the icon
              </p>
              <div className="mb-8 max-w-sm">
                <div className="flex items-center justify-between rounded-lg border border-border bg-bg-base px-4 py-3">
                  <span className="font-mono text-sm font-semibold uppercase tracking-wide text-mist">
                    PhishGuard
                  </span>
                  <button
                    onClick={() => setDemoOpen((o) => !o)}
                    aria-expanded={demoOpen}
                    aria-label="Toggle demo menu"
                    className="flex h-6 w-7 flex-col justify-between"
                  >
                    <span className="h-0.5 w-full bg-mist" />
                    <span className="h-0.5 w-full bg-mist" />
                    <span className="h-0.5 w-full bg-mist" />
                  </button>
                </div>
                <div
                  className={`overflow-hidden rounded-b-lg border border-t-0 border-border bg-card transition-[max-height] duration-200 ease-out ${
                    demoOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {["Home", "Check an email", "About", "Login"].map(
                    (label, i) => (
                      <div
                        key={label}
                        className={`px-4 py-2.5 text-sm text-mist-dim ${
                          i > 0 ? "border-t border-border" : ""
                        }`}
                      >
                        {label}
                      </div>
                    )
                  )}
                </div>
              </div>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Tab toggle
              </p>
              <div className="mb-8 grid max-w-xs grid-cols-2 gap-1 rounded-lg bg-bg-base p-1">
                <button
                  onClick={() => setTab("signin")}
                  className={`rounded-md py-2 text-center font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tab === "signin"
                      ? "bg-accent text-bg-base"
                      : "text-mist-dim hover:text-mist"
                  }`}
                >
                  Sign in
                </button>
                <button
                  onClick={() => setTab("signup")}
                  className={`rounded-md py-2 text-center font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tab === "signup"
                      ? "bg-accent text-bg-base"
                      : "text-mist-dim hover:text-mist"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Input field
              </p>
              <div className="mb-8 flex max-w-xs flex-col gap-1.5">
                <label className="text-sm font-medium text-mist">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-lg border border-border bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-accent"
                />
              </div>

              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-mist-dim">
                Buttons
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-opacity hover:opacity-90">
                  Primary
                </button>
                <button className="rounded-lg border border-border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-mist transition-colors hover:bg-bg-base">
                  Secondary
                </button>
              </div>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="pages" className="card p-8">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                05 — Page Consistency
              </p>
              <h2 className="mb-6 font-display text-xl font-semibold text-mist">
                Same grammar, different job per page
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {pageNotes.map((p) => (
                  <div key={p.name} className="border-l-2 border-border pl-4">
                    <h3 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                      {p.name}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-mist-dim">
                      {p.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScanReveal>
        </main>
      </div>
    </div>
  );
}
