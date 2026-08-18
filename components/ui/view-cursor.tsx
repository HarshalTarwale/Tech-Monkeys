"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { useMounted } from "@/components/motion/use-mounted";

/**
 * The cursor-following "View site" bubble used over live project tiles.
 *
 * Extracted from projects-index.tsx once the homepage work section needed
 * the same interaction — one implementation rather than two that can drift.
 *
 * Returns everything a caller needs to wire it up:
 *   `enabled`     — whether the bubble is active at all; also the flag for
 *                   applying `cursor-none`, so the real cursor is never
 *                   hidden without a replacement on screen.
 *   `handleMove`  — attach to the container's onMouseMove.
 *   `setHovering` — call from each tile's pointer enter/leave.
 *   `cursor`      — the bubble element itself; render it inside the section.
 *
 * Gated three ways, all of which matter:
 *   - `useMounted()` — the bubble's presence depends on a
 *     `window.matchMedia` check the server can't run, so mounting it before
 *     hydration completes is a real mismatch (same class of bug, same fix,
 *     as service-mockup.tsx).
 *   - `hover: hover and pointer: fine` — touch has no cursor to replace.
 *   - `useReducedMotion()` — a spring chasing the pointer is exactly the
 *     motion that setting asks us to drop.
 *
 * Styling note: the fill is a neutral ink scrim, not an accent tint. A
 * low-opacity accent resolves to near-white over a light project page
 * (Hyde Park Wood, Taldo) and leaves the white label almost unreadable,
 * while staying dark over a near-black one (FixNex). A neutral scrim plus
 * backdrop blur behaves predictably over both; the accent lives in the ring
 * instead, where it can't affect text contrast.
 */
export function useViewCursor(label = "View site") {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 400, damping: 34, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 400, damping: 34, mass: 0.5 });

  const enabled = mounted && canHover && !reduced;

  function handleMove(event: React.MouseEvent) {
    if (!enabled) return;
    rawX.set(event.clientX);
    rawY.set(event.clientY);
  }

  const cursor = enabled ? (
    <motion.div
      aria-hidden="true"
      style={{ left: x, top: y }}
      animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed z-50 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/40 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-md"
    >
      {label}
    </motion.div>
  ) : null;

  return { enabled, handleMove, setHovering, cursor };
}
