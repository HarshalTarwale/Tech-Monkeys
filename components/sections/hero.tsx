"use client";

import type { Division, Segment } from "@/lib/content";
import { Marquee } from "@/components/ui/marquee";

/**
 * Full-height hero.
 *
 * The headline ends on a segment word set on an accent block; the switcher
 * below swaps it. The `key` on that span re-triggers the `pop` keyframe on
 * every change.
 *
 * LCP note: this is a Server-rendered subtree hydrated in place — the text is
 * in the HTML on first paint. The only motion is the `pop` on the highlight
 * word, which never moves surrounding layout (fixed line box, transform only).
 */
export function Hero({
  divisions,
  mode,
  setMode,
  marqueeItems,
}: {
  divisions: Division[];
  mode: Segment;
  setMode: (mode: Segment) => void;
  marqueeItems: string[];
}) {
  const active = divisions.find((d) => d.segment === mode) ?? divisions[0];

  return (
    <section
      id="top"
      className="grain relative flex min-h-screen flex-col justify-between px-5 pb-10 pt-28 md:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-shell">
        <div className="mb-8 font-mono text-xs uppercase tracking-[.22em] text-accent-deep">
          Digital product partner · UAE
        </div>

        {/* Sized so the longest segment word ("enterprises") still sits on
            line two. Measured at 1440px: 8vw wraps to a third line, 7vw
            fits — 6.8vw leaves headroom while fonts settle. The size is
            fixed rather than per-word so switching never reflows the page. */}
        <h1 className="text-[10.5vw] font-black leading-[.9] tracking-[-.045em] text-ink md:text-[6.8vw]">
          Building digital
          <br />
          momentum for{" "}
          <span
            key={active.segment}
            className="-my-1 inline-block animate-[pop_.4s_ease-out] bg-accent px-3 text-white"
          >
            {active.name.toLowerCase()}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {active.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {/* All three controls in this row are locked to h-14 (56px) so the
              filled pill, the bordered pill and the switcher line up exactly.
              Without it the border and differing text metrics give 52/54/56. */}
          <a
            href="#divisions"
            className="inline-flex h-14 items-center rounded-full bg-ink px-7 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Explore divisions
          </a>
          <a
            href="#contact"
            className="inline-flex h-14 items-center rounded-full border border-ink/20 px-7 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Start a project
          </a>

          {/* Height is locked to the CTA pills beside it: those are
              py-4 + text-sm + border = 56px. Matching h-14 here and
              centring the inner buttons keeps the row visually level.
              Wraps rather than overflowing on narrow viewports. */}
          <div
            className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-3xl border border-ink/15 p-1 sm:ml-1 sm:h-14 sm:flex-nowrap sm:rounded-full"
            role="group"
            aria-label="Choose a division"
          >
            {divisions.map((d) => (
              <button
                key={d.segment}
                type="button"
                onClick={() => setMode(d.segment)}
                aria-pressed={mode === d.segment}
                className={`flex items-center rounded-full px-4 py-2.5 text-xs uppercase tracking-[.12em] transition-colors sm:h-full sm:py-0 ${
                  mode === d.segment
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Marquee items={marqueeItems} />
    </section>
  );
}
