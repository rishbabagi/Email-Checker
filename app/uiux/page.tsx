"use client";

import { useState } from "react";
import ScanReveal from "../components/ScanReveal";

const swatches = [
  {
    name: "Terminal Black",
    hex: "#090D0C",
    className: "bg-bg-base",
    use: "Page ground — the \"at rest\" state of a scanner.",
  },
  {
    name: "Panel",
    hex: "#10201B",
    className: "bg-bg-panel",
    use: "Card and panel fill, one step up from the ground.",
  },
  {
    name: "Signal",
    hex: "#34F5A4",
    className: "bg-signal",
    use: "Primary accent — CTAs, links, focus rings, \"clear\" states.",
  },
  {
    name: "Circuit",
    hex: "#124A37",
    className: "bg-circuit",
    use: "Dimmed signal — borders, dividers, hover fills.",
  },
  {
    name: "Alert Amber",
    hex: "#FFB020",
    className: "bg-alert",
    use: "Reserved solely for flagged/suspicious states. Never decorative.",
  },
  {
    name: "Mist",
    hex: "#E7EDE9",
    className: "bg-mist",
    use: "Primary text — a faint green-white, never pure white.",
  },
];

const pageNotes = [
  {
    name: "Home",
    note: "One full glow-and-sweep entrance on the hero headline. Nowhere else on the site gets that much motion at once.",
  },
  {
    name: "Login / Signup",
    note: "The scan framing becomes the form itself: bracket corners around the card, a signal-green focus ring standing in for \"verifying.\"",
  },
  {
    name: "About",
    note: "Project and founder are two specimen-style panels, stacked in that order, same bracket-and-hairline language as this page.",
  },
  {
    name: "Chatbot",
    note: "Assistant replies get a \"Scan result\" label and bracket corners, like every response is a readout rather than a plain chat bubble.",
  },
];

export default function UiUxPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-base px-4 py-16 sm:px-8 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="mt-[-10vmin] h-[60vmin] w-[60vmin] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-[180px_minmax(0,1fr)] lg:max-w-6xl">
        {/* Rail */}
        <nav className="hidden h-fit flex-col gap-1 md:sticky md:top-16 md:flex">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mist-dim">
            Contents
          </p>
          {[
            ["#direction", "Direction"],
            ["#color", "Color"],
            ["#type", "Type"],
            ["#motion", "Motion"],
            ["#components", "Components"],
            ["#pages", "Pages"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="border-l-2 border-circuit py-1.5 pl-3 font-mono text-xs tracking-wide text-mist-dim transition-colors hover:border-signal hover:text-signal"
            >
              {label}
            </a>
          ))}
        </nav>

        <main>
          <header className="mb-14 max-w-xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-signal">
              Visual Identity — v1
            </p>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-mist sm:text-6xl">
              PhishGuard
            </h1>
            <p className="mt-4 max-w-md text-base text-mist-dim">
              The reference doc for how this product looks and moves — kept
              here in the project so any page can be checked against it.
            </p>
          </header>

          <ScanReveal>
            <section id="direction" className="scan-panel mb-7 p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                01 — Direction
              </p>
              <h2 className="mb-4 font-display text-xl font-bold text-mist">
                The references shared a vocabulary
              </h2>
              <p className="mb-3 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                Near-black grounds lit by one glowing hue. Bold condensed
                display type set in caps. Thin hairline rules. Small
                crosshair and asterisk marks that read like radar blips.
              </p>
              <p className="max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                That maps directly onto what PhishGuard does: it&apos;s a
                scanner. The corner brackets, the sweep animation on every
                panel here, and the mono readout labels aren&apos;t
                decoration — they&apos;re the grammar of something actively
                checking a message for threats.
              </p>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="color" className="scan-panel mb-7 p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                02 — Color
              </p>
              <h2 className="mb-4 font-display text-xl font-bold text-mist">
                Six tokens, two jobs
              </h2>
              <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                One glow color carries the brand. A second, unrelated hue
                is held back exclusively for &quot;something&apos;s
                wrong&quot; — so amber only ever means one thing.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {swatches.map((s) => (
                  <div key={s.name} className="border border-circuit">
                    <div className={`h-16 ${s.className}`} />
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
            <section id="type" className="scan-panel mb-7 p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                03 — Type
              </p>
              <h2 className="mb-6 font-display text-xl font-bold text-mist">
                Three faces, three jobs
              </h2>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Display — headlines only · Chakra Petch
              </p>
              <p className="mb-6 font-display text-3xl font-bold uppercase leading-tight text-mist [text-shadow:0_0_24px_rgba(52,245,164,0.22)] sm:text-4xl">
                Spot phishing
                <br />
                before it catches you
              </p>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Body — everything you read · IBM Plex Sans
              </p>
              <p className="mb-6 max-w-[60ch] text-base leading-relaxed text-mist">
                Paste a suspicious message and get an instant security
                assessment — no security background required.
              </p>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Mono — labels, readouts, timestamps · IBM Plex Mono
              </p>
              <p className="font-mono text-sm uppercase tracking-wide text-signal [font-variant-numeric:tabular-nums]">
                Scan_status · 3 flagged · 00:00:42
              </p>

              <div className="mt-6 border-l-2 border-alert bg-alert/5 px-4 py-3 text-xs leading-relaxed text-mist-dim">
                <strong className="text-mist">Live, not a preview:</strong>{" "}
                this page runs in the real app, so the specimens above are
                the actual fonts loaded via{" "}
                <code className="font-mono">next/font/google</code> — not
                a fallback approximation.
              </div>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="motion" className="scan-panel mb-7 p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                04 — Motion
              </p>
              <h2 className="mb-4 font-display text-xl font-bold text-mist">
                Sweep, not fade
              </h2>
              <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-mist-dim">
                Scroll back up and watch a panel enter view again — that
                sweep is the whole motion language in one move. Hover the
                buttons below for the other half.
              </p>
              <div className="mb-6 flex flex-wrap gap-4">
                <button className="scan-btn bg-signal px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-bg-base transition-colors hover:bg-signal/90">
                  Hover to scan
                </button>
                <button className="border border-circuit bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-mist-dim transition-colors hover:border-signal hover:text-signal">
                  Secondary hover
                </button>
              </div>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed text-mist-dim">
                <li className="relative pl-5">
                  <span className="absolute left-0 font-mono text-signal">
                    +
                  </span>
                  <strong className="text-mist">Sweep, not fade.</strong>{" "}
                  Panels and hovers reveal via a bright line that scans
                  across, echoing the product&apos;s actual job.
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 font-mono text-signal">
                    +
                  </span>
                  <strong className="text-mist">Corners snap.</strong>{" "}
                  Bracket accents animate in under 300ms — a scan
                  finishing, not a curtain lifting.
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 font-mono text-signal">
                    +
                  </span>
                  <strong className="text-mist">Stillness is respected.</strong>{" "}
                  <code className="font-mono">prefers-reduced-motion</code>{" "}
                  disables every sweep and snap.
                </li>
              </ul>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="components" className="scan-panel mb-7 p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                05 — Components
              </p>
              <h2 className="mb-6 font-display text-xl font-bold text-mist">
                Nav, fields, cards
              </h2>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Nav — click the icon
              </p>
              <div className="mb-8 max-w-sm">
                <div className="flex items-center justify-between border border-circuit bg-bg-base px-4 py-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-signal">
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
                  className={`overflow-hidden border border-t-0 border-circuit bg-bg-panel transition-[clip-path] duration-300 ease-out ${
                    demoOpen
                      ? "[clip-path:inset(0_0_0_0)]"
                      : "[clip-path:inset(0_0_100%_0)]"
                  }`}
                >
                  {["Home", "Check an email", "About", "Login"].map(
                    (label, i) => (
                      <div
                        key={label}
                        className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-mist-dim ${
                          i > 0 ? "border-t border-circuit" : ""
                        }`}
                      >
                        {label}
                      </div>
                    )
                  )}
                </div>
              </div>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Input field
              </p>
              <div className="mb-8 flex max-w-xs flex-col gap-1.5">
                <label className="font-mono text-xs uppercase tracking-wider text-mist-dim">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="border border-circuit bg-bg-base px-3 py-2.5 text-sm text-mist outline-none transition-colors placeholder:text-mist-dim/60 focus:border-signal focus:ring-1 focus:ring-signal"
                />
              </div>

              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-dim">
                Card
              </p>
              <div className="scan-panel max-w-sm p-5">
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">
                  About PhishGuard
                </p>
                <p className="text-sm leading-relaxed text-mist-dim">
                  This bracket-and-hairline style is the same one every
                  card in the product shares.
                </p>
              </div>
            </section>
          </ScanReveal>

          <ScanReveal>
            <section id="pages" className="scan-panel p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-signal">
                06 — Page Consistency
              </p>
              <h2 className="mb-6 font-display text-xl font-bold text-mist">
                Same grammar, different job per page
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {pageNotes.map((p) => (
                  <div key={p.name} className="border-l-2 border-circuit pl-4">
                    <h3 className="mb-1.5 font-mono text-xs uppercase tracking-wider text-signal">
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
