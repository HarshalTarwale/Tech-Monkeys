"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Scroll-scrubbed colour fill for the muted half of a two-tone heading.
 *
 * A hard-stop gradient (ink -> faint) is clipped to the glyphs and its
 * background-position is driven by scroll progress, so the ink sweeps
 * left-to-right across the phrase — and across line wraps — at whatever
 * speed the user scrolls. Scrubbing, not a timed animation: scroll back and
 * it un-fills.
 *
 * Why background-clip rather than an overlay: it needs no duplicate text
 * node, so it cannot desync from the real text, screen readers see one
 * string, and nothing is animated that affects layout.
 *
 * Two details make it feel deliberate rather than incidental:
 *
 *  - A spring smooths the scrubbed value, so flick-scrolling glides to rest
 *    instead of snapping. Low stiffness + high damping keeps it unhurried
 *    and never springy/bouncy, matching the restrained feel of the page.
 *  - A narrow band (6%) between the colour stops gives a crisp leading edge,
 *    so the sweep reads as a solid wipe rather than a soft gradient smear.
 *
 * `anchor` handles headings that cannot reach the top of the viewport. The
 * last section on the page stops scrolling while it is still mid-screen, so
 * a fixed end offset would leave it permanently part-grey. Passing
 * `anchor="end"` measures the real remaining scroll distance and finishes
 * the sweep within it.
 *
 * Reduced motion: `.scroll-fill` in globals.css drops the clip entirely, so
 * the text is never transparent — not even for the frame before hydration.
 */
export function ScrollFillText({
  children,
  className = "",
  anchor = "default",
}: {
  children: React.ReactNode;
  className?: string;
  /** "end" for headings in the final section, which cannot scroll to the top. */
  anchor?: "default" | "end";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // For "end" anchors, resolve where the element actually lands once the page
  // has run out of scroll, and finish a little before that point.
  const [endOffset, setEndOffset] = useState<`start ${number}` | null>(null);

  useEffect(() => {
    if (anchor !== "end") return;

    function measure() {
      const el = ref.current;
      if (!el) return;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const absTop = window.scrollY + el.getBoundingClientRect().top;
      // Where the element sits, as a fraction of viewport height, when the
      // user has scrolled as far as the page allows.
      const restingFraction = (absTop - maxScroll) / window.innerHeight;
      // Finish slightly before that so the sweep completes with room to
      // spare rather than exactly on the last pixel of scroll.
      const finish = Math.max(0.05, Math.min(0.9, restingFraction + 0.08));
      setEndOffset(`start ${Number(finish.toFixed(3))}`);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [anchor]);

  const { scrollYProgress } = useScroll({
    // Under reduced motion this component renders a plain <span> with no
    // ref attached, so passing `ref` here left Motion watching a target
    // that never hydrates ("Target ref is defined but not hydrated").
    // Dropping the target in that branch keeps the hook call unconditional
    // (rules of hooks) without pointing it at an element that never exists.
    target: reduced ? undefined : ref,
    // Start as the line clears the fold; finish once it crosses the
    // vertical centre of the screen, so by the time a reader's eye meets
    // the line it is already fully black. For a final-section heading,
    // finish at the furthest point it can reach instead.
    offset: ["start 0.95", endOffset ?? "start 0.5"],
  });

  // Smooths flick-scrolls into a glide without lagging behind the scrub —
  // stiff enough to feel tied to scroll speed, damped enough not to
  // overshoot into a bounce.
  const eased = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const backgroundPosition = useTransform(eased, [0, 1], ["100% 0%", "0% 0%"]);

  if (reduced) {
    return <span className={`text-faint ${className}`}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--tm-ink) 0%, var(--tm-ink) 47%, var(--tm-faint) 53%, var(--tm-faint) 100%)",
        backgroundSize: "210% 100%",
        backgroundPosition,
        // Descenders can clip against the text box on some engines.
        paddingBottom: "0.06em",
      }}
      /* The clip + transparent colour live in CSS, not inline style, so a
         reduced-motion user never gets transparent text even for the frame
         before hydration resolves. See .scroll-fill in globals.css. */
      className={`scroll-fill ${className}`}
    >
      {children}
    </motion.span>
  );
}
