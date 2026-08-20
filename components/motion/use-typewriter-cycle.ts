"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export type TypewriterPhase = "typing" | "holding" | "erasing" | "waiting";

/**
 * Character intervals, deliberately set just under a whole number of
 * 60Hz frames (16.67ms) rather than to round-looking numbers.
 *
 * A character can only ever land on a frame boundary, so an interval that
 * doesn't divide evenly into frames gets quantised unevenly and the
 * rhythm wobbles. Measured at the previous values: 70ms produced a mix of
 * 67ms and 84ms steps (4 frames vs 5), and 45ms — sitting almost exactly
 * between 2 and 3 frames — alternated 33ms and 50ms on every single
 * keystroke. Both average out correctly and both feel uneven.
 *
 * 66ms is a hair under 4 frames and 49ms a hair under 3, so each one
 * reliably trips on the same frame every time. Slightly under, not over:
 * at exactly 4 frames the elapsed time can land a floating-point whisker
 * short of the threshold and slip to the next frame. These also divide
 * cleanly at 120Hz (8 and 6 frames).
 */
const DEFAULTS = {
  /** Time each character is on screen before the next one lands, ms. */
  typeMs: 66,
  /** Same, while erasing. Faster than typing — erasing at the same rate
   *  reads as sluggish once you've already seen the word once. */
  eraseMs: 49,
  /** How long the fully-typed word sits before erasing starts. */
  holdMs: 2000,
  /** Beat between one word finishing erasing and the next starting to type. */
  waitMs: 320,
};

/**
 * Types a word out character by character, holds it, erases it character by
 * character, then moves to the next word in the list — looping forever.
 *
 * Drives the accent-highlighted word in the homepage hero.
 *
 * **Driven by `requestAnimationFrame` against real elapsed time, not by a
 * chain of `setTimeout`s.** The `setTimeout` version was the actual source
 * of the "not smooth" feel, and it was not obvious: measured, its
 * character intervals came out at 33, 50, 34, 50, 49, 50, 34ms against a
 * nominal 45ms. `setTimeout` only guarantees a *minimum* delay, so each
 * hop landed on whichever frame boundary came next and the error
 * compounded across the chain — the letters were arriving in an audibly
 * uneven rhythm, which reads as jitter even though nothing on screen was
 * badly drawn. Deriving the character count from `now - phaseStart` each
 * frame means timing is frame-accurate and cannot drift, however long the
 * loop runs.
 *
 * State is only pushed to React when it actually changes, so this re-renders
 * once per character (~14/sec) rather than once per frame.
 *
 * Under `prefers-reduced-motion`, the cycle is skipped entirely: the first
 * word renders once, fully typed, and nothing changes after that. This is
 * stricter than most of this codebase's reduced-motion handling (which
 * usually keeps a plain crossfade) because auto-advancing text the visitor
 * did not ask for and cannot pause is exactly the pattern WCAG's
 * "pause, stop, hide" guidance targets — the honest fix is to not run it,
 * not to run a gentler version of it.
 */
export function useTypewriterCycle(
  words: string[],
  options: Partial<typeof DEFAULTS> = {},
) {
  const { typeMs, eraseMs, holdMs, waitMs } = { ...DEFAULTS, ...options };
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(() =>
    reduced ? (words[0]?.length ?? 0) : 0,
  );

  // Words can theoretically change identity between renders (they don't in
  // practice — divisions are static per page load — but reading through a
  // ref means the loop below never needs them in its dependency array).
  // Assigning `.current` happens in its own effect, not during render:
  // refs are only safe to write outside the render phase.
  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  });

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let cancelled = false;

    let phase: TypewriterPhase = "typing";
    let phaseStart = performance.now();
    let wordIndex = 0;
    // Mirrors of the React state, so the loop can compare before setting
    // and avoid a render on every frame.
    let shownCount = 0;
    let shownIndex = 0;

    function tick(now: number) {
      const word = wordsRef.current[wordIndex] ?? "";
      const elapsed = now - phaseStart;
      let count = shownCount;

      if (phase === "typing") {
        // +1 so the first character is on screen immediately rather than
        // after one full interval of an empty box.
        count = Math.min(word.length, Math.floor(elapsed / typeMs) + 1);
        if (count >= word.length) {
          phase = "holding";
          phaseStart = now;
        }
      } else if (phase === "holding") {
        count = word.length;
        if (elapsed >= holdMs) {
          phase = "erasing";
          phaseStart = now;
        }
      } else if (phase === "erasing") {
        count = Math.max(0, word.length - (Math.floor(elapsed / eraseMs) + 1));
        if (count <= 0) {
          phase = "waiting";
          phaseStart = now;
        }
      } else {
        count = 0;
        if (elapsed >= waitMs) {
          wordIndex = (wordIndex + 1) % wordsRef.current.length;
          phase = "typing";
          phaseStart = now;
        }
      }

      if (count !== shownCount) {
        shownCount = count;
        setCharCount(count);
      }
      if (wordIndex !== shownIndex) {
        shownIndex = wordIndex;
        setIndex(wordIndex);
      }

      if (!cancelled) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [reduced, typeMs, eraseMs, holdMs, waitMs]);

  const word = words[index] ?? "";

  return {
    word,
    /** How many characters of `word` are currently revealed. */
    charCount: reduced ? word.length : charCount,
    /** The revealed substring — whole characters only, never a part-glyph. */
    display: reduced ? word : word.slice(0, charCount),
    index,
  };
}
