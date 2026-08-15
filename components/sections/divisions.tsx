"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Arrow, Eyebrow, Shell, Tag } from "@/components/ui/shell";
import type { Division, Project } from "@/lib/content";

/**
 * One division block: oversized name on one side, that segment's projects on
 * the other, sides alternating. Scroll-linked parallax on the headline.
 *
 * Parallax is disabled outright when the user prefers reduced motion — the
 * transform resolves to 0 rather than being animated to it.
 */
function DivisionBlock({
  division,
  projects,
  index,
}: {
  division: Division;
  projects: Project[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);

  const flipped = index % 2 === 1;

  return (
    <div ref={ref} className="relative overflow-hidden border-b border-line">
      <div className="relative mx-auto grid max-w-shell gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className={flipped ? "lg:order-2" : ""}>
          <div className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[.2em] text-accent-deep">
            <span>{division.id}</span>
            <span className="h-px w-10 bg-accent/60" />
            <span>Division</span>
          </div>

          {/* clamp, not plain vw: unclamped 8vw hit 150px+ on a 2560px
              desktop, out of proportion to the rest of the page. Ceiling
              raised to 150px here (vs. the hero's 110px) since this line is
              a single short word with room either side, not a two-line
              phrase that risks wrapping. Floor matches the hero's mobile
              anchor. */}
          <motion.h2
            style={{ x }}
            className="text-[clamp(2.625rem,0.696rem+9.643vw,9.375rem)] font-black leading-[.82] tracking-[-.06em] text-ink"
          >
            {division.name}
          </motion.h2>

          <div className="mt-7 inline-flex">
            <span className="bg-accent px-4 py-2 text-lg font-semibold uppercase tracking-[.04em] text-white">
              {division.focus}
            </span>
          </div>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            {division.body}
          </p>

          {/* No underline at rest; border-b-2 border-transparent reserves
              the same 2px of space so the line appearing on hover doesn't
              nudge anything below it. */}
          <a
            href="#contact"
            className="group mt-9 inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Engage this division <Arrow spin />
          </a>
        </div>

        <div className={flipped ? "lg:order-1" : ""}>
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-faint">
            Selected engagements
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {projects.map((project) => (
                <a
                  key={project.slug}
                  href={project.url ?? "#contact"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noreferrer" : undefined}
                  className="group flex min-h-[210px] flex-col justify-between bg-surface p-6 transition-colors hover:bg-accent"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[.16em] text-accent-deep group-hover:text-white/80">
                      {project.sector}
                    </span>
                    <Arrow spin className="text-faint group-hover:text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-.03em] text-ink group-hover:text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-white/85">
                      {project.scope}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Nothing approved for public use in this division yet. */
            <div className="border border-dashed border-line-strong bg-surface/50 p-6 text-sm leading-relaxed text-faint">
              Engagements for this division are being prepared for publication.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Divisions({
  divisions,
  projectsBySegment,
}: {
  divisions: Division[];
  projectsBySegment: Record<string, Project[]>;
}) {
  return (
    <section id="divisions" className="bg-bone">
      <div className="border-b border-line px-5 py-24 md:px-10 md:py-32">
        <Shell>
          <Eyebrow className="mb-7">01 / Strategic divisions</Eyebrow>
          <h2 className="max-w-5xl text-4xl font-black tracking-[-.04em] text-ink md:text-7xl">
            One partner.
            <br />
            <ScrollFillText>Three scales of ambition.</ScrollFillText>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            We run three connected divisions — each shaped for a different
            stage of growth, all drawing on the same team of strategists,
            designers and engineers.
          </p>
        </Shell>
      </div>

      {divisions.map((division, index) => (
        <DivisionBlock
          key={division.segment}
          division={division}
          projects={projectsBySegment[division.segment] ?? []}
          index={index}
        />
      ))}
    </section>
  );
}
