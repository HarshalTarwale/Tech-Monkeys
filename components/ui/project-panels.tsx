"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Arrow } from "@/components/ui/shell";
import type { Project, Segment } from "@/lib/content";

const SCALE_LABEL: Record<Segment, string> = {
  startups: "Startup",
  corporates: "Corporate",
  enterprises: "Enterprise",
};

const PER_PAGE = 2;

/**
 * Large image-style panel pair with a centred prev/next pill — the
 * structure the client pointed at directly (tentwenty's case-studies
 * section: two big panels, a logo/name centred in each, a caption line
 * below, arrows in the middle). Third rebuild of this section: a reused
 * `ProjectShowcase` (the homepage's live-iframe carousel) read as a smaller
 * repeat of a section already seen once, and a plain name list read as too
 * quiet either way.
 *
 * No client logos or photography in the panels — we don't have real image
 * assets for these projects, and the alternative (stock imagery, an
 * invented logo) breaks the "never fabricate" rule the whole site runs on.
 * The panel's *type* is the visual instead: the project name set very
 * large, the way the panel content in a proper editorial layout would be —
 * honest about being type, not pretending to be a photo. Alternating
 * ink/bordered treatment gives the same light/dark rhythm the reference's
 * alternating cream/photo cards have, without inventing a colour per
 * project (this site keeps a single accent colour by design).
 *
 * Paginates two at a time rather than scrolling — matches the reference's
 * fixed two-up layout, and two large panels read better than a scroll rail
 * of small ones for content this size.
 */
export function ProjectPanels({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(projects.length / PER_PAGE);

  function go(next: number) {
    setPage(((next % pageCount) + pageCount) % pageCount);
  }

  const visible = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between border-t border-line-strong pt-5 font-mono text-[10px] uppercase tracking-[.2em] text-faint">
        <span>Selected engagements</span>
        <span>
          <span className="text-accent-deep">{String(page + 1).padStart(2, "0")}</span>
          <span className="mx-1 text-line-strong">/</span>
          {String(pageCount).padStart(2, "0")}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const globalIndex = page * PER_PAGE + i;
            const dark = globalIndex % 2 === 0;
            return (
              <motion.a
                key={project.slug}
                href={project.url ?? "/#contact"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noreferrer" : undefined}
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex aspect-4/3 flex-col overflow-hidden p-8 transition-colors duration-300 ${
                  dark
                    ? "bg-ink text-white hover:bg-[#1c1c1f]"
                    : "border-2 border-ink bg-surface text-ink hover:bg-bone"
                }`}
              >
                {/* Oversized ghost initial — the same watermark language the
                    hero and process sections already use, so the panel
                    doesn't feel like a foreign component. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[13rem] font-black leading-none ${
                    dark ? "text-white/5" : "text-ink/[.04]"
                  }`}
                >
                  {project.name.charAt(0)}
                </span>

                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[.2em] ${dark ? "text-accent" : "text-accent-deep"}`}
                  >
                    {project.sector}
                  </span>
                  <span
                    className={`font-mono text-[10px] ${dark ? "text-white/40" : "text-faint"}`}
                  >
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Centred in the remaining space — the panel's equivalent
                    of the reference's centred logo, rather than pinned to
                    an edge with empty space above it. */}
                <div className="relative flex flex-1 items-center">
                  <h3 className="text-3xl font-black leading-[1.05] tracking-[-.03em] sm:text-4xl">
                    {project.name}
                  </h3>
                </div>

                <div className="relative flex items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[.1em] ${
                          dark ? "border-white/20 text-white/60" : "border-line-strong text-muted"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Arrow
                    spin
                    className={dark ? "text-white/60 group-hover:text-accent" : "text-muted group-hover:text-accent"}
                  />
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Captions below each panel, matching the reference's name-under-image
          pattern — segment + a direct "visit" cue, since the panel itself
          only carries the name and sector. */}
      <div className="mt-4 grid gap-5 font-mono text-[10px] uppercase tracking-[.14em] text-faint sm:grid-cols-2">
        {visible.map((project) => (
          <div key={project.slug} className="flex items-center justify-between">
            <span>{SCALE_LABEL[project.segment]}</span>
            <span>{project.name}</span>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-line-strong p-1">
            <button
              type="button"
              onClick={() => go(page - 1)}
              aria-label="Previous projects"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(page + 1)}
              aria-label="Next projects"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
