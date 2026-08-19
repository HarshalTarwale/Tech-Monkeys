"use client";

import Image from "next/image";
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
 * section: two big panels, a caption line below, arrows in the middle).
 *
 * Media, in the same priority order as the /projects grid
 * (components/ui/project-tile.tsx):
 *
 *   1. `project.video` — not set on anything yet; the field exists so
 *      dropping a file in /public and setting the path is the only change
 *      needed once footage exists. Muted+looped on hover, same as the grid.
 *   2. `project.image` — the real cover screenshot in /public, generated
 *      by `scripts/capture-project-screenshots.mjs`. What every
 *      publishable project actually has today.
 *   3. `TypePanel` — the project name set very large, for the rare project
 *      with neither. Was the *only* treatment here originally, when no
 *      image assets existed yet; kept as the honest fallback now that most
 *      panels don't need it, rather than assuming every future project
 *      will always have a screenshot.
 *
 * A scrim sits under the caption on photo panels specifically because the
 * real screenshots run from near-white (Taldo, Hyde Park Wood) to
 * near-black (FixNex) — without it, white caption text disappears on the
 * light ones. The type-only fallback doesn't need one; it sets its own
 * ink/white contrast directly.
 *
 * "Visit site" is a second, explicit link inside the panel rather than
 * relying on the whole card being clickable — the card *is* still a link
 * (whole-panel click still opens the project), but a visitor scanning for
 * "how do I actually see this" gets a labelled answer instead of having to
 * discover it by hovering.
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
            return (
              <ProjectPanel key={project.slug} project={project} index={globalIndex} reduced={reduced} />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Captions below each panel, matching the reference's name-under-image
          pattern — segment on one side, an explicit visit cue on the other. */}
      <div className="mt-4 grid gap-5 font-mono text-[10px] uppercase tracking-[.14em] text-faint sm:grid-cols-2">
        {visible.map((project) => (
          <div key={project.slug} className="flex items-center justify-between">
            <span>{SCALE_LABEL[project.segment]}</span>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
              >
                Visit {project.name} <Arrow spin />
              </a>
            ) : (
              <span>{project.name}</span>
            )}
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

function ProjectPanel({
  project,
  index,
  reduced,
}: {
  project: Project;
  index: number;
  reduced: boolean | null;
}) {
  const dark = index % 2 === 0;

  return (
    <motion.a
      href={project.url ?? "/#contact"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noreferrer" : undefined}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -16 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex aspect-4/3 flex-col overflow-hidden"
    >
      {project.image ? (
        <>
          {/* Fixed source ratio matching the capture script's own 4:3
              output and `object-top`, same as the /projects grid — the
              only crop that can ever happen is off the bottom, never the
              sides. */}
          <Image
            src={project.image}
            alt={`${project.name} — homepage`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Two independent scrims rather than one three-stop gradient — a
              single from/via/to gradient necessarily dips lightest in the
              middle, which is exactly where the top row (sector + index)
              sits, and against a bright capture like Hyde Park Wood's or
              Taldo's that dip left it nearly unreadable. Two scrims, each
              anchored to the content it protects, keep both rows legible
              regardless of how light or dark the source screenshot is. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 to-transparent transition-colors duration-300 group-hover:from-black/95"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
          />

          <PanelContent project={project} index={index} tone="photo" />
        </>
      ) : (
        <div
          className={`flex h-full flex-col p-8 transition-colors duration-300 ${
            dark
              ? "bg-ink text-white hover:bg-[#1c1c1f]"
              : "border-2 border-ink bg-surface text-ink hover:bg-bone"
          }`}
        >
          {/* Oversized ghost initial — the same watermark language the
              hero and process sections already use — for the rare project
              without a screenshot yet. */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[13rem] font-black leading-none ${
              dark ? "text-white/5" : "text-ink/4"
            }`}
          >
            {project.name.charAt(0)}
          </span>

          <PanelContent project={project} index={index} tone={dark ? "dark" : "light"} />
        </div>
      )}
    </motion.a>
  );
}

/**
 * Shared caption chrome across all three panel treatments (photo, dark
 * type, light type) — sector + index up top, name + a "Visit site" cue
 * pinned to the bottom, so a photo panel and a type-only panel read as the
 * same component wearing different skins, not two different layouts.
 */
function PanelContent({
  project,
  index,
  tone,
}: {
  project: Project;
  index: number;
  tone: "photo" | "dark" | "light";
}) {
  const textDim = tone === "light" ? "text-muted" : "text-white/60";
  const textFaint = tone === "light" ? "text-faint" : "text-white/40";
  const accent = tone === "light" ? "text-accent-deep" : "text-accent";

  return (
    <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
      <div className="flex items-start justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[.2em] ${accent}`}>
          {project.sector}
        </span>
        <span className={`font-mono text-[10px] ${textFaint}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3
          className={`text-2xl font-black leading-[1.05] tracking-[-.03em] sm:text-3xl ${
            tone === "light" ? "text-ink" : "text-white"
          }`}
        >
          {project.name}
        </h3>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[.1em] ${
                  tone === "light"
                    ? "border-line-strong text-muted"
                    : "border-white/25 text-white/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {project.url && (
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.14em] transition-colors ${textDim} group-hover:${tone === "light" ? "text-accent-deep" : "text-accent"}`}
            >
              Visit site
              <Arrow spin className={tone === "light" ? "text-muted" : "text-white/60"} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
