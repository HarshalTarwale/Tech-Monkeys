"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Division, Segment } from "@/lib/content";
import { SmartLink } from "@/components/ui/smart-link";

/**
 * Full-height hero.
 *
 * The headline ends on a segment word set on an accent block; the switcher
 * below swaps it.
 *
 * The swap is a masked vertical crossfade, not a hard cut: the outgoing word
 * slides up and fades while the incoming one slides in from below, both
 * clipped inside the accent block via `overflow-hidden` on its wrapper so
 * neither is ever visible outside it. AnimatePresence's `popLayout` mode
 * measures both words and animates the block's width between them, so the
 * highlight resizes to fit "startups" vs "enterprises" smoothly instead of
 * snapping. Reused from the same masked-label technique already used on
 * MagneticButton, for one consistent motion language across the site.
 *
 * LCP note: this is a Server-rendered subtree hydrated in place — the text is
 * in the HTML on first paint. The word-swap only ever fires after a user
 * clicks the switcher, so it can't gate the first paint.
 */
export function Hero({
  divisions,
  mode,
  setMode,
}: {
  divisions: Division[];
  mode: Segment;
  setMode: (mode: Segment) => void;
}) {
  const active = divisions.find((d) => d.segment === mode) ?? divisions[0];
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      // h-screen (not min-h-screen) so max-h actually takes effect: with
      // min-height, min always wins over a smaller max-height per the CSS
      // spec, so min-h-screen + max-h silently ignored the cap on
      // ultrawide/4K screens (measured: still rendered at a full 1440px).
      // height + max-height caps it correctly there while still filling
      // the viewport on any screen shorter than the cap.
      //
      // justify-center, not justify-between: the marquee that used to
      // anchor the bottom of this section is gone, and centring keeps the
      // content from sitting pinned to the top with a large dead gap
      // below it.
      className="grain relative flex h-screen max-h-225 flex-col justify-center px-5 pb-10 pt-28 md:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-shell">
        <div className="mb-8 font-mono text-xs uppercase tracking-[.22em] text-accent-deep">
          Digital product partner · UAE
        </div>

        {/* clamp(floor, fluid, ceiling), not plain vw — vw alone has no
            upper or lower bound, so it read as oversized on 2560px+/
            ultrawide monitors and cramped below ~360px. Anchors are
            measured, not guessed: 34px at a 320px viewport is the smallest
            size that keeps "enterprises" (the longest segment word) clear
            of the edge; 110px is the largest that still keeps it on line
            two at the shell's full 1600px width (8vw wraps to a 3rd line
            there; 110px is the ceiling before that happens). The fluid
            middle term passes through the previously-tuned 98px at 1440px,
            so desktop is visually unchanged. Fixed per render, not
            per-word, so switching segments never reflows the page. */}
        <h1 className="text-[clamp(2.125rem,0.982rem+5.714vw,6.875rem)] font-black leading-[.9] tracking-[-.045em] text-ink">
          Building digital
          <br />
          momentum for{" "}
          <motion.span
            layout={!reduced}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="-my-1 relative inline-flex h-[1em] items-center overflow-hidden bg-accent px-3 align-baseline"
          >
            <AnimatePresence mode={reduced ? "wait" : "popLayout"} initial={false}>
              <motion.span
                key={active.segment}
                initial={reduced ? false : { y: "60%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduced ? undefined : { y: "-60%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block whitespace-nowrap text-white"
              >
                {active.name.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </motion.span>
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
          <SmartLink
            href="/contact"
            className="inline-flex h-14 items-center rounded-full border border-ink/20 px-7 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Start a project
          </SmartLink>

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
    </section>
  );
}
