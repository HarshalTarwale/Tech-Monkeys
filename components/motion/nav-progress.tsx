"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Fired by SmartLink the moment an internal navigation is committed to. */
export const NAV_START_EVENT = "tm:navstart";

/**
 * Sweep in (200ms), then hold at full width before leaving. Tuned so the
 * bar's whole life is ~460ms, against the reference's measured ~420ms
 * (appeared at 100ms, gone by 520ms).
 */
const MIN_VISIBLE_MS = 300;
/** Safety valve: never leave the bar on screen if a navigation never lands. */
const MAX_VISIBLE_MS = 6000;

/**
 * Navigation progress bar — a thin accent line that sweeps across the top
 * of the viewport on every internal navigation.
 *
 * This is a direct match for the reference the client asked for.
 * tentwenty's transition was measured rather than guessed at, by
 * screencasting a real navigation and sampling the DOM every frame:
 *
 *   - a single `position: fixed` element, full viewport width, **3px tall**,
 *     pinned to the very top, above everything (z-index 1600 there)
 *   - it slides in from `translateX(-100%)` to `0` over roughly **200ms**
 *     with a hard ease-out (at the halfway point it has already travelled
 *     ~80% of the way)
 *   - it holds at full width for ~200ms, then is removed
 *   - **the page content itself does not animate at all** — no fade, no
 *     blur, no slide. The outgoing page simply holds until the new one is
 *     ready, then swaps.
 *
 * That last point is the whole character of it, and is why an earlier
 * blur-and-lift page transition was removed in favour of this: the
 * restraint is the effect. The bar carries the sense of movement so the
 * content doesn't have to, which is what keeps it calm at speed.
 *
 * Driven by a click event rather than `useLinkStatus`, deliberately. Every
 * route on this site is static and prefetched, so a genuine pending state
 * is skipped almost every time and the bar would rarely appear — but this
 * is a signature, not a spinner. `MIN_VISIBLE_MS` guarantees the sweep is
 * seen even when the navigation resolves instantly.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const shownAt = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => {
    function onStart() {
      clearTimers();
      shownAt.current = Date.now();
      setLeaving(false);
      setVisible(true);
      timers.current.push(
        setTimeout(() => {
          setLeaving(true);
          timers.current.push(setTimeout(() => setVisible(false), 160));
        }, MAX_VISIBLE_MS),
      );
    }
    window.addEventListener(NAV_START_EVENT, onStart);
    return () => {
      window.removeEventListener(NAV_START_EVENT, onStart);
      clearTimers();
    };
  }, []);

  // The new route has rendered — let the sweep finish, then take it away.
  useEffect(() => {
    if (!visible) return;
    clearTimers();
    const held = Date.now() - shownAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - held);
    timers.current.push(
      setTimeout(() => {
        setLeaving(true);
        timers.current.push(setTimeout(() => setVisible(false), 160));
      }, wait),
    );
    // `visible` intentionally omitted: this must run on route change, not
    // when the bar is first shown, or it would schedule its own removal
    // before the navigation has even started.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[999] h-[3px] bg-accent ${
        leaving ? "tm-navbar-out" : "tm-navbar-in"
      }`}
    />
  );
}
