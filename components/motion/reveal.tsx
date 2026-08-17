"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal: fades and lifts a block into place once, the
 * first time it enters the viewport.
 *
 * Reduced motion branches to a plain `<div>` rather than blanking the
 * `initial`/`whileInView` props on a `motion.div`. `useReducedMotion()`
 * returns `null` for one render before hydration resolves it, so the
 * conditional-prop version briefly mounts in the animated (opacity: 0)
 * state regardless of the setting — and once `reduced` flips true,
 * `whileInView` is gone and nothing ever animates it back to visible, so
 * the content stays permanently invisible. Branching the whole render is
 * the same fix `hero.tsx` and `scroll-fill-text.tsx` already use.
 *
 * Transform + opacity only, so a reveal can never shift layout.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  /** Stagger offset in seconds, for revealing a list in sequence. */
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
