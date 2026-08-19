"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { useMounted } from "@/components/motion/use-mounted";
import { Shell } from "@/components/ui/shell";
import type { AboutStat } from "@/content/about";

/**
 * Ink stat band with counters that count up the first time they scroll into
 * view — the reference page's signature moment, and the one place a number
 * animation earns its keep.
 *
 * Values arrive as display strings ("45+", "10") rather than numbers, so
 * the suffix survives: the digits are parsed out, animated, and the
 * non-numeric remainder is re-appended. That keeps the content file
 * human-readable instead of forcing it into {value, suffix} pairs.
 *
 * `tabular-nums` is essential — without it the digits are proportionally
 * spaced and the row jitters horizontally while counting, which reads as
 * broken rather than animated.
 */
export function AboutStats({ stats }: { stats: AboutStat[] }) {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-20 md:px-10 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-[110px]"
      />
      <Shell className="relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter value={stat.value} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const mounted = useMounted();

  const target = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
  const suffix = value.replace(/[\d.]/g, "");

  // null = the count-up has not started, so render the true figure.
  // Storing a separate `animating` boolean meant calling setState
  // synchronously in the effect body, which react-hooks/set-state-in-effect
  // flags as an avoidable cascading render; deriving it from the value
  // itself avoids that. onUpdate runs from the animation loop, not the
  // effect body, so it is not the same pattern.
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!mounted || !inView || reduced) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [mounted, inView, reduced, target]);

  // Shows the real figure on the server, through hydration, and whenever
  // motion is reduced — swapping to the live value only once the count-up
  // has actually started.
  //
  // The earlier version seeded state with (reduced ? target : 0), which is a
  // genuine hydration mismatch: the server has no window to resolve
  // useReducedMotion() against, so it emitted "0" while a reduced-motion
  // client's first paint emitted "45" (confirmed — React error #418 on a
  // text node). Gating on useMounted() and defaulting to the true figure
  // fixes that, and keeps the real numbers in the server-rendered HTML
  // rather than shipping "0+" to anything that does not run JS.
  const shown = display === null ? target : Math.round(display);

  return (
    <div
      ref={ref}
      className="text-[clamp(3rem,1.5rem+4vw,5rem)] font-black leading-none tracking-[-.04em] text-white tabular-nums"
    >
      {shown}
      <span className="text-accent">{suffix}</span>
    </div>
  );
}
