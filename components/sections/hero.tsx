"use client";

import { useTypewriterCycle } from "@/components/motion/use-typewriter-cycle";
import { SmartLink } from "@/components/ui/smart-link";
import { site } from "@/lib/content";
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
 * division's `body` copy showed underneath — briefly moved to the same
 * cycle instead of a click, crossfading a new paragraph in with each new
 * word. That is gone too: client feedback was that a paragraph changing
 * underneath a headline that was already animating "was not looking
 * good", and it also had a real layout bug — the invisible copies kept to
 * reserve height for the tallest paragraph were stacked in normal flow
 * rather than layered on top of each other, so the block reserved height
 * for all three paragraphs combined and pushed the CTA row down with it.
 * `site.heroIntro` is one segment-agnostic line instead: no crossfade, no
 * reserved-height trick needed, and nothing to disagree with the headline
 * about.
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
  const words = divisions.map((d) => d.name.toLowerCase());
  const { display } = useTypewriterCycle(words);

  return (
    <section
      id="top"
      // Height is handled differently per breakpoint, on purpose.
      //
      // Below `xl` the headline runs to three lines (the animated word
      // sits on its own line there — see the note on it below), so the
      // section uses `min-h-screen`: it fills the viewport when there is
      // room and grows when there isn't, instead of a hard `h-screen`
      // clipping the CTA row off the bottom on shorter devices.
      //
      // From `xl` up the headline is two lines again, so it is `h-screen`
      // with a cap — plus `min-h-0` to clear the smaller-screen
      // min-height, because min always beats a smaller max-height per the
      // CSS spec and the cap would otherwise be silently ignored on
      // ultrawide/4K screens (measured: still rendered at a full 1440px).
      //
      // justify-center, not justify-between: the marquee that used to
      // anchor the bottom of this section is gone, and centring keeps the
      // content from sitting pinned to the top with a large dead gap
      // below it.
      className="grain relative flex min-h-screen flex-col justify-center px-5 pb-16 pt-28 md:px-10 xl:min-h-0 xl:h-screen xl:max-h-225 xl:pb-10"
    >
      {/* -translate-y shifts the whole block up off dead-centre, toward
          the top third of the section — centring it exactly read as
          sitting a little low under the fixed header. transform, not a
          margin/padding change, so it costs no layout and the h-screen
          height math above is unaffected. */}
      <div className="relative z-10 mx-auto w-full max-w-shell translate-y-[-2.5vh]">
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
          {/* Below `xl` this is a block on its own line, not inline after
              "for".

              Inline, the box starts at whatever x the preceding text
              happens to end at — and since the box is an unbreakable
              inline unit that grows as it types, a longer word reflows
              onto a new line mid-cycle. Measured across the real
              animation: at 1024px "startups" and "corporates" sat at
              x=574 while "enterprises" dropped to x=52, so the word
              visibly jumped position and line partway through the loop.
              At 768px it happened a word earlier.

              The breakpoint is measured, not guessed: the longest word
              only stops reflowing from ~1100px up, so `xl` (1280px) is
              the first standard breakpoint with real margin. Below it,
              all three words share one left edge on every phone and
              tablet. `w-fit` keeps the accent block hugging the word
              rather than stretching the whole row. */}
          <span className="-my-1 relative mt-2 flex h-[1em] w-fit items-center overflow-hidden bg-accent px-3 align-baseline xl:mt-0 xl:inline-flex">
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

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {site.heroIntro}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("divisions");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex h-14 items-center rounded-full bg-ink px-7 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Explore divisions
          </button>
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
