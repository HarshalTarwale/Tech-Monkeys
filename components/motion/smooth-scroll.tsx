"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** The subset of the Lenis instance this component actually uses. */
type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (
    target: number,
    options?: { immediate?: boolean; force?: boolean },
  ) => void;
};

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
 *
 * Also resets scroll on route change. This became necessary when internal
 * links moved from plain `<a>` to `next/link`: a full page load reset
 * scroll for free, but a client navigation does not, and Lenis holds its
 * own scroll value independently of `window.scrollY`, so Next's built-in
 * scroll restoration alone leaves Lenis convinced it is still halfway down
 * the previous page. `immediate` jumps rather than animating — the page
 * transition is already animating, and a smooth-scroll-to-top racing it
 * looks like a bug.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenisRef.current = lenis as unknown as LenisInstance;

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Skip when the URL carries a hash — that navigation is a request to
    // land on a specific section, not at the top of the page.
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
