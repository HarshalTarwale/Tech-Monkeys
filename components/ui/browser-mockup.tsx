"use client";

import { motion, useReducedMotion } from "motion/react";

import { useMounted } from "@/components/motion/use-mounted";

/**
 * Decorative browser-window stack for the service hero's right column.
 *
 * Abstract skeleton UI, deliberately not a screenshot of any real site —
 * so it makes no claim about a specific project — but built from the same
 * dark chrome-bar language (traffic lights, mono address pill) as
 * `ShowcaseFrame` in project-showcase.tsx, so it reads as this site's own
 * browser motif rather than a generic stock graphic.
 *
 * Five layers drifting on slightly different loops gives depth without
 * needing an illustration asset: a browser window (design), a phone frame
 * (responsive), a code card (development — the other half of the service
 * name), and two capability tags. Motion is transform-only and the whole
 * thing is `aria-hidden` + `pointer-events-none`, so it costs no layout, no
 * accessibility surface, and can never gate the hero text's paint.
 *
 * The code fragment in the code card is a trivial, generic four-line stub
 * written for this component — not sourced from anywhere — there purely as
 * a visual "this is real code" cue, the same way the browser window is a
 * visual "this is a real site" cue rather than an actual page.
 *
 * `useMounted()` gates every animated prop rather than `reduced` alone.
 * Confirmed (via a full, non-minified hydration diff, not just the React
 * error code): the cursor-pulse span's `{!reduced && <motion.span/>}` mount
 * gate, paired with an infinite keyframe-array `animate`, produced a
 * genuine server/client mismatch — the server has no `window` to resolve
 * `useReducedMotion()` against, so it renders one branch, while the
 * client's first paint can already resolve the real preference and render
 * the other. `useMounted()` returns `false` identically on the server and
 * on the client's hydration pass, so that first paint is always identical
 * by construction; only the render after hydration completes — which is
 * not a mismatch — can differ. Everything animated (`float`, plus the
 * cursor pulse below) is gated on `mounted && !reduced` for the same
 * reason.
 */
export function BrowserMockup() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animated = mounted && !reduced;

  const float = (distance: number, duration: number) =>
    !animated
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-115 w-full select-none"
    >
      {/* Accent glow behind the stack. */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      {/* Capability tags — float independently, highest layer. */}
      <motion.span
        {...float(8, 5.5)}
        className="absolute left-0 top-0 z-20 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        SEO ready
      </motion.span>
      <motion.span
        {...float(9, 6.5)}
        className="absolute right-24 top-24 z-20 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Fast by default
      </motion.span>

      {/* Back card. */}
      <motion.div
        {...float(10, 7)}
        className="absolute right-0 top-8 w-56 rotate-6 border border-line-strong bg-surface/80 shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center gap-1.5 border-b border-line-strong px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-1.5 w-3/4 rounded-full bg-line-strong" />
          <div className="h-1.5 w-1/2 rounded-full bg-line-strong" />
          <div className="h-1.5 w-2/3 rounded-full bg-line-strong" />
        </div>
      </motion.div>

      {/* Main window. */}
      <motion.div
        {...float(16, 6)}
        className="absolute left-0 top-16 w-88 -rotate-3 overflow-hidden border border-line-strong bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 bg-[#2a2a2e] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white/10 px-3 py-1.5 text-center font-mono text-[10px] text-white/50">
            yoursite.com
          </div>
        </div>
        <div className="relative p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-2 w-16 rounded-full bg-ink/70" />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-line-strong" />
              <div className="h-2 w-8 rounded-full bg-line-strong" />
              <div className="h-2 w-8 rounded-full bg-line-strong" />
            </div>
          </div>
          <div className="mb-5 h-28 rounded-md bg-accent/10" />
          <div className="mb-2.5 h-2 w-full rounded-full bg-line-strong" />
          <div className="mb-5 h-2 w-2/3 rounded-full bg-line-strong" />

          <div className="relative inline-block">
            <div className="h-7 w-24 rounded-full bg-accent" />
            {/* Cursor + click pulse on the CTA — "someone is using this". */}
            <span className="absolute -bottom-2 -right-3 text-ink">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M1 1l5.2 13.2 2-5 5-2z" />
              </svg>
            </span>
            {animated && (
              <motion.span
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className="absolute -bottom-1 -right-2 h-3 w-3 rounded-full bg-accent"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Code card — the "development" half of the composition. */}
      <motion.div
        {...float(12, 8)}
        className="absolute bottom-2 left-6 w-52 -rotate-2 overflow-hidden rounded-lg border border-black/20 bg-[#1c1c1f] shadow-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-1.5 p-3.5 font-mono text-[10px] leading-relaxed">
          <div>
            <span className="text-accent">function</span>{" "}
            <span className="text-white/80">build</span>
            <span className="text-white/40">() {"{"}</span>
          </div>
          <div className="pl-3 text-white/60">
            return <span className="text-white/80">&lt;Site</span>{" "}
            <span className="text-accent">fast</span> /&gt;
          </div>
          <div className="text-white/40">{"}"}</div>
        </div>
      </motion.div>

      {/* Front phone frame — signals "responsive" without a caption. */}
      <motion.div
        {...float(22, 5)}
        className="absolute bottom-0 right-8 w-28 rotate-3 overflow-hidden rounded-xl border-4 border-ink bg-surface shadow-2xl"
      >
        <div className="flex justify-center bg-ink pb-1.5">
          <span className="h-1 w-8 rounded-full bg-white/30" />
        </div>
        <div className="space-y-2 p-3">
          <div className="h-10 rounded bg-accent/15" />
          <div className="h-1.5 w-full rounded-full bg-line-strong" />
          <div className="h-1.5 w-2/3 rounded-full bg-line-strong" />
          <div className="h-4 w-14 rounded-full bg-accent" />
        </div>
      </motion.div>
    </div>
  );
}
