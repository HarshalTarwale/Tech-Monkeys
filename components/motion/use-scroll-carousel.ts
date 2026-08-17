"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared mechanics behind a horizontally-scrollable, snap-aligned row of
 * fixed-width items: which item is currently nearest the scroll position,
 * whether the row overflows at all (so a caller can hide its own arrows/
 * counter when everything already fits), and a `goTo` that scrolls to a
 * specific item.
 *
 * Extracted once a second carousel (service-technologies.tsx, alongside
 * service-process.tsx) needed the exact same tracking logic — each keeps
 * its own card markup/styling, only the scroll bookkeeping is shared.
 *
 * `itemCount` should be the number of real items in the track, not
 * counting any trailing spacer element — the nearest-item scan stops at
 * `itemCount` so a spacer never gets reported as the active index.
 *
 * Reduced motion is checked inline via `matchMedia` (the same pattern
 * `MagneticButton` uses) only at the point `goTo` actually calls
 * `scrollTo`, rather than pulling in the motion library for one boolean.
 *
 * Contract: the element `trackRef` is attached to must itself establish a
 * CSS positioning context (e.g. carry `relative`). `goTo` scrolls to a
 * child's `offsetLeft`, which is measured against the nearest *positioned*
 * ancestor — if the track itself isn't one, `offsetLeft` resolves against
 * whatever positioned element is further up the page instead, so it no
 * longer lines up with `scrollLeft`'s coordinate space and `goTo` lands on
 * the wrong pixel.
 */
export function useScrollCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  function measure() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;

    const items = Array.from(el.children).slice(0, itemCount) as HTMLElement[];

    // canScroll must mean "advancing would actually reach the next item",
    // not just "there are a few stray pixels of overflow" — a fixed small
    // threshold (this used to be `max > 4`) let a near-zero sliver of
    // overflow (e.g. 24px, from padding/rounding, with ~330px between
    // items) still show working-looking arrows that could only ever
    // scrollTo a browser-clamped position short of the next item, so
    // "next" visibly did nothing. Scaling the threshold to the real
    // distance between the first two items makes it correct at any card
    // size instead of a guessed constant.
    const pitch = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 0;
    setCanScroll(pitch > 0 && max > pitch * 0.5);

    let nearest = 0;
    let nearestDist = Infinity;
    items.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.scrollLeft);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setIndex(nearest);
  }

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

  function goTo(i: number) {
    const el = trackRef.current;
    const clamped = Math.max(0, Math.min(itemCount - 1, i));
    const child = el?.children[clamped] as HTMLElement | undefined;
    if (!el || !child) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: child.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }

  return { trackRef, index, canScroll, measure, goTo };
}
