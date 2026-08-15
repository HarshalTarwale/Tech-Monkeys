"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { Service } from "@/lib/content";

/**
 * Capabilities: sticky left panel with a mark that rotates on scroll
 * progress, and a list of services.
 *
 * Hover state is restrained rather than a colour fill: the row's own top
 * and bottom rules darken to solid ink and the title scales up fractionally
 * (1.015x — enough to register, not enough to reflow neighbouring text).
 * Both are transitions on transform/border-color, so nothing shifts layout.
 * Each row owns its top rule (rather than sharing the previous row's bottom
 * rule) so darkening on hover never bleeds into the row above it.
 */
export function Capabilities({ services }: { services: Service[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 320],
  );

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative overflow-hidden bg-bone px-5 py-24 md:px-10 md:py-36"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow>02 / Services</Eyebrow>
            <h2 className="mt-7 text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              One team.
              <br />
              <ScrollFillText>Every layer of the build.</ScrollFillText>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Eight services, delivered by the same people from first sketch
              to production support.
            </p>
            <motion.div
              style={{ rotate }}
              className="loop-mark mt-12 h-52 w-52"
              aria-hidden="true"
            />
          </div>

          <div>
            {services.map((service) => (
              // Each row carries its own top rule and a negative top-margin
              // equal to its width, stacking flush against the row above
              // rather than sharing one border — so hover darkens only this
              // row's own edges, never bleeding into its neighbour's.
              //
              // The rule itself is a 1px border (keeps the idle state a true
              // hairline) plus a box-shadow that grows to a second, thicker
              // line on hover. box-shadow doesn't participate in layout, so
              // "bolding" the rule this way never shifts the row above or
              // below — a border-width transition would.
              //
              // TUNING: two things control this effect, both below.
              //   - hover:border-ink  -> the 1px border's hover colour.
              //     Solid ink (full black). Swap to hover:border-ink/NN for
              //     a translucent version instead.
              //   - hover:shadow-[0_-1px_...] / [0_1px_...] -> the "bold"
              //     companion line, offset 1px outward from the border on
              //     each side. That 1px is the width control: raise it
              //     (e.g. 0_-2px) for a thicker band, drop to 0px to turn
              //     the bolding off and keep only the colour change.
              <article
                key={service.slug}
                className="group relative -mt-px grid gap-5 border-y border-line-strong py-10 shadow-[0_0_0_0_transparent,0_0_0_0_transparent] transition-[border-color,box-shadow] duration-300 ease-out hover:z-10 hover:border-ink hover:shadow-[0_-1px_0_0_var(--tm-ink),0_1px_0_0_var(--tm-ink)] md:grid-cols-[80px_1fr_1fr] md:py-14"
              >
                <span className="font-mono text-xs text-accent-deep">
                  {service.index}
                </span>
                <h3 className="origin-left text-2xl font-medium tracking-[-.03em] text-ink transition-transform duration-300 ease-out group-hover:scale-[1.08] md:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-muted">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
