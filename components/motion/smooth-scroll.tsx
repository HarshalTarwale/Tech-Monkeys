"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll.
 *
 * Mounts nothing. Deliberately opt-out in two cases, per the motion
 * constraints in CLAUDE.md:
 *   - prefers-reduced-motion: reduce  -> native scroll, never initialised
 *   - coarse pointer (touch)          -> native scroll, avoids fighting
 *                                        momentum scrolling on mobile
 *
 * Loaded dynamically so Lenis stays out of the critical path and cannot
 * gate the LCP element.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
