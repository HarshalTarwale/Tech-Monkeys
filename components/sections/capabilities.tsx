"use client";

import Link from "next/link";
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
 * Hover state: the mono index number ("01") turns accent blue and scales up,
 * and the title scales up fractionally alongside it. No border or fill
 * change — the accent-on-mono-numeral pattern already appears elsewhere on
 * the site (division IDs, ledger status column), so this reuses an existing
 * visual language instead of inventing a new hover treatment. Borders stay
 * plain hairlines throughout; nothing about the row's edges changes.
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
              Ten services, delivered by the same people from first sketch
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
              // TUNING:
              //   - items-center on the row -> vertically aligns the index
              //     number with the title's baseline. A plain grid
              //     top-aligns by default, which is what made "04" sit
              //     above "Web Apps & SaaS Platforms" instead of level
              //     with it.
              //   - text-[14px] md:text-[20px] on the index -> its idle
              //     size, set 10px below the title's own text-2xl (24px) /
              //     md:text-3xl (30px) so the gap is a fixed, checkable
              //     relationship rather than an arbitrary utility class.
              //   - Both index and title scale by the SAME factor (1.08) on
              //     hover, not independent ones. Scaling the index harder
              //     than the title (it was 1.4x vs 1.08x) shrank the 10px
              //     gap down to ~4px on hover — matching factors keeps the
              //     10px-smaller relationship intact at (30-20)*1.08=10.8px,
              //     essentially unchanged, while both still visibly grow.
              //   Both share origin-left so they grow away from the number
              //   column rather than into the summary text on the right.
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid items-center gap-5 border-b border-line-strong py-10 md:grid-cols-[80px_1fr_1fr] md:py-14"
              >
                <span className="origin-left font-mono text-[14px] text-accent-deep transition-[color,scale] duration-300 ease-out group-hover:scale-[1.08] group-hover:text-accent md:text-[20px]">
                  {service.index}
                </span>
                <h3 className="origin-left text-2xl font-medium tracking-[-.03em] text-ink transition-transform duration-300 ease-out group-hover:scale-[1.08] md:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-muted">{service.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
