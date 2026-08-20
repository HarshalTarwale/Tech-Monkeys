"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useTypewriterCycle } from "@/components/motion/use-typewriter-cycle";
import { SmartLink } from "@/components/ui/smart-link";
import type { Division } from "@/lib/content";

/**
 * Full-height hero.
 *
 * The headline ends on a segment word set on an accent block, typed and
 * erased on a loop by `useTypewriterCycle`: types the word in, holds it
 * ~2s, erases it, then moves to the next division and repeats — startups,
 * corporates, enterprises, back to startups.
 *
 * This replaced a manual switcher (three buttons, click to change the
 * word) at the client's request. The switcher's other job — driving which
 * division's `body` copy shows underneath — is now driven by the same
 * cycle instead of a click, crossfading in sync with each new word.
 *
 * The highlight block has no width animation: it is a plain inline-flex
 * box sized to whatever is currently typed, so it grows and shrinks a
 * whole character at a time. That snap is the effect — see the note at
 * the block itself for the version that animated it and why it was
 * wrong. Smoothness comes from even character timing instead, which is
 * the hook's job.
 *
 * LCP note: the headline itself (and the sr-only division list, for
 * screen readers — see below) is in the server-rendered HTML on first
 * paint; only the animated substring depends on client JS, and the
 * animation only starts after mount, so it cannot gate LCP.
 */
export function Hero({ divisions }: { divisions: Division[] }) {
  const reduced = useReducedMotion();
  const words = divisions.map((d) => d.name.toLowerCase());
  const { display, index } = useTypewriterCycle(words);
  const active = divisions[index] ?? divisions[0];

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
            so desktop is visually unchanged. Sized for the longest word
            fully typed out, so mid-cycle growth never wraps the line. */}
        <h1 className="text-[clamp(2.125rem,0.982rem+5.714vw,6.875rem)] font-black leading-[.9] tracking-[-.045em] text-ink">
          Building digital
          <br />
          momentum for{" "}
          {/* The block sizes itself to whatever is currently typed, with no
              width transition at all — deliberately.

              An earlier version animated the width so the edge glided
              between characters. It measured beautifully (worst per-frame
              movement dropped from ~50px to 22px) but it was the wrong
              thing to build: a gliding edge clips mid-glyph, so letters
              slid into view a sliver at a time instead of appearing. That
              is a wipe, not a typewriter, and it read as one.

              Whole characters snapping into place *is* the effect. What
              actually made earlier versions feel rough was uneven timing
              between them, and that is fixed in the hook — see the
              requestAnimationFrame note there. */}
          <span className="-my-1 relative inline-flex h-[1em] items-center overflow-hidden bg-accent px-3 align-baseline">
            <span
              aria-hidden="true"
              className="inline-flex items-center whitespace-nowrap text-white"
            >
              {display}
              {/* Blinking caret — a real typewriter/terminal cursor, laid
                  out inline so it sits immediately after the last typed
                  character and advances with it. The blink is a plain CSS
                  animation (.tm-caret in globals.css), so the global
                  reduced-motion rule stops it with no branching here; the
                  typing itself is disabled separately, in the hook. */}
              <span className="tm-caret ml-0.5 inline-block h-[0.8em] w-0.75 shrink-0 bg-white" />
            </span>
          </span>
        </h1>

        {/* The real content for screen readers: the three division names,
            stated once and in full, rather than an element whose text
            mutates every few dozen milliseconds. `aria-hidden` on the
            animated span above and this sr-only span together mean
            assistive tech gets one stable sentence instead of a
            typewriter's worth of DOM churn. */}
        <span className="sr-only">
          {divisions.map((d) => d.name.toLowerCase()).join(", ")}
        </span>

        <div className="relative mt-8 max-w-xl">
          {/* Reserves the taller division's height so the CTA row below
              never shifts as the copy changes length — the paragraphs are
              absolutely stacked and only the active one is laid out for
              real. */}
          {divisions.map((d) => (
            <p
              key={d.segment}
              aria-hidden={d.segment !== active.segment}
              className="invisible text-lg leading-relaxed text-transparent"
            >
              {d.body}
            </p>
          ))}
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.segment}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 text-lg leading-relaxed text-muted"
            >
              {active.body}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
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
        </div>
      </div>
    </section>
  );
}
