"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { getServiceIcon } from "@/components/ui/service-icons";
import type { ServiceDetail } from "@/lib/content";

/**
 * "How we work" — the page's longest section, so it's built to be scanned
 * rather than read end to end.
 *
 * Layout mirrors the homepage capabilities section (sticky left panel, long
 * list on the right) so the two read as the same site, but the panel here
 * carries a scroll-linked progress rail rather than a rotating mark: with
 * ten stages, the reader's real question is "how much of this is left",
 * and the rail answers it without a counter that has to be chased.
 *
 * Chosen over the horizontal filmstrip this replaced: ten steps in a
 * side-scroller hides eight of them behind an interaction, which is exactly
 * wrong for the one section a prospect actually needs to read before
 * enquiring.
 *
 * The rail is `scaleY` on a spring — transform only, so it costs no layout —
 * and collapses to a static full-height bar under reduced motion rather
 * than disappearing, since it doubles as a visual spine for the column.
 */
export function ServiceProcess({ steps }: { steps: ServiceDetail["process"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: reduced ? undefined : ref,
    offset: ["start 0.8", "end 0.9"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <section
      ref={ref}
      id="service-process"
      className="bg-bone px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Sticky panel. */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow>02 / How we work</Eyebrow>
            <h2 className="mt-7 text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              A visible process,
              <br />
              <ScrollFillText>not a black box.</ScrollFillText>
            </h2>
            <p className="mt-7 max-w-sm leading-relaxed text-muted">
              Ten stages from first conversation to a site that&apos;s live and
              looked after. You&apos;ll know which one we&apos;re in at any
              point.
            </p>

            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <div className="relative h-32 w-px bg-line-strong">
                <motion.div
                  style={{ scaleY: reduced ? 1 : scaleY }}
                  className="absolute inset-0 origin-top bg-accent"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[.2em] text-faint">
                {steps.length} stages
              </span>
            </div>
          </div>

          {/* Steps. */}
          <ol className="relative">
            {/* Spine behind the icon column. */}
            <span
              aria-hidden="true"
              className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-line-strong sm:block"
            />

            {steps.map((step, i) => {
              const Icon = getServiceIcon(step.title);
              return (
                <Reveal key={step.title} y={20}>
                  <li className="group relative flex gap-5 pb-12 sm:gap-7 sm:pb-14">
                    {/* Icon node, sitting on the spine. */}
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bone text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 pt-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[.2em] text-accent-deep">
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-xl font-medium tracking-[-.02em] text-ink md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
