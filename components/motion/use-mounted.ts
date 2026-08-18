"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True once past hydration, false during SSR and the client's first paint.
 *
 * Shared across every client component that conditionally mounts a subtree
 * based on a browser-only check — currently `service-mockup.tsx` (the
 * hero's per-service illustration). Anything that conditionally
 * mounts a subtree based on a browser-only check (`window.matchMedia`,
 * `useReducedMotion()`, `hover`/`pointer` capability) will hydration-mismatch
 * for real users if that check can resolve differently between the server's
 * render (no `window`, so it necessarily takes a fallback branch) and the
 * client's very first paint (which can already know the true value). Gating
 * on `useMounted()` first means that first paint is identical to the
 * server's by construction — the mismatch can only happen on the render
 * *after* hydration completes, which isn't a mismatch at all.
 *
 * `useSyncExternalStore`'s `getServerSnapshot` is what React calls for the
 * hydration pass specifically so it can match server output; `getSnapshot`
 * takes over for every render after — no manual `useEffect` + `setState`
 * needed (which is both an unnecessary render and something the
 * `react-hooks/set-state-in-effect` lint rule flags). This is the
 * React-documented way to expose a value that's legitimately different
 * between server and client without producing a hydration mismatch.
 */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
