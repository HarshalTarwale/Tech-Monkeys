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
 * progress, and a list of services that fill with the accent on hover.
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

          <div className="border-t border-line-strong">
            {services.map((service) => (
              <article
                key={service.slug}
                className="group grid gap-5 border-b border-line-strong py-10 transition-colors hover:bg-accent md:grid-cols-[80px_1fr_1fr] md:py-14"
              >
                <span className="font-mono text-xs text-accent-deep group-hover:text-white">
                  {service.index}
                </span>
                <h3 className="text-2xl font-medium tracking-[-.03em] text-ink group-hover:text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-muted group-hover:text-white/85">
                  {service.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
