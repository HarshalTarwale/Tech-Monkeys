"use client";

import { motion, useReducedMotion } from "motion/react";

import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/** Numeral, title and body shared by both the animated and plain step render. */
function StepBody({
  step,
  index,
}: {
  step: ServiceDetail["process"][number];
  index: number;
}) {
  return (
    <>
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-bone font-mono text-xs text-accent-deep">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="mt-5 text-lg font-medium tracking-[-.01em] text-ink">
        {step.title}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
        {step.body}
      </p>
    </>
  );
}

/**
 * "How we work" process steps.
 *
 * A horizontal timeline on desktop (numbered circles on a connecting line,
 * stacking to a plain vertical list below `lg`) that reveals on scroll —
 * the one section on this page built as a client component, since
 * `whileInView` needs it. Transform/opacity only, so nothing shifts layout.
 *
 * Reduced motion branches to a plain, un-animated `<div>` render rather than
 * conditionally blanking the `initial`/`whileInView` props on the same
 * `motion.div`. `useReducedMotion()` returns `null` for one render before
 * hydration resolves it, so a conditional-prop approach briefly renders the
 * animated (opacity: 0) variant regardless of the user's setting; once
 * `reduced` flips to `true`, `whileInView` is removed and nothing ever
 * animates the element back to visible — it gets stuck transparent
 * (confirmed: under `reducedMotion: "reduce"`, the whole section rendered
 * as blank space at the same layout height). Branching the render entirely,
 * the same pattern `hero.tsx` and `scroll-fill-text.tsx` already use, means
 * the reduced-motion path never touches opacity at all.
 */
export function ServiceProcess({ steps }: { steps: ServiceDetail["process"] }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-bone px-5 py-24 md:px-10 md:py-32">
      <Shell>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>02 / How we work</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              A visible process,
              <br />
              <ScrollFillText>not a black box.</ScrollFillText>
            </h2>
          </div>
        </div>

        <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line sits behind the numbered circles, desktop only —
              on a single mobile column a "timeline" reads as noise, not a
              connection between anything. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-5 hidden h-px bg-line-strong lg:block"
          />

          {steps.map((step, i) =>
            reduced ? (
              <div key={step.title} className="relative">
                <StepBody step={step} index={i} />
              </div>
            ) : (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="relative"
              >
                <StepBody step={step} index={i} />
              </motion.div>
            ),
          )}
        </div>
      </Shell>
    </section>
  );
}
