"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { ProjectTile } from "@/components/ui/project-tile";
import { Shell } from "@/components/ui/shell";
import { useViewCursor } from "@/components/ui/view-cursor";
import type { Project } from "@/lib/content";
import {
  arrangeProjectsForProjectIndex,
  getProjectIndexFilters,
  type ProjectIndexFilter,
} from "@/lib/project-priority";

/**
 * The /projects index: filter bar plus an asymmetric project grid, with a
 * cursor-following "View" bubble on pointer devices.
 *
 * Structure follows the reference the client pointed at (tentwenty's cases
 * page), studied by rendering it rather than guessing: a breadcrumb-ish
 * meta row with a live project count, an asymmetric grid mixing full-width
 * and half-width tiles, and — its signature interaction — `cursor: none`
 * over each tile with a large circular "View" label tracking the pointer
 * in its place.
 *
 * Filters follow the client-approved priority groups for this page. Each tab
 * still resolves through the publishable project list, so the publication
 * gate in lib/content.ts remains intact.
 *
 * The "View site" cursor bubble comes from `useViewCursor`, shared with the
 * homepage work section — see that hook for why it's gated the way it is.
 */
export function ProjectsIndex({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<ProjectIndexFilter>("all");
  const {
    enabled: cursorEnabled,
    handleMove,
    setHovering,
    cursor,
  } = useViewCursor();

  const filters = useMemo(() => getProjectIndexFilters(projects), [projects]);
  const total = filters.find((item) => item.key === "all")?.count ?? 0;

  const visible = useMemo(
    () => arrangeProjectsForProjectIndex(projects, filter),
    [projects, filter],
  );

  return (
    <section
      onMouseMove={handleMove}
      className="bg-bone px-5 pb-24 md:px-10 md:pb-32"
    >
      <Shell>
        {/* Meta row: live count on the right, mirroring the reference's
            "550 + projects" readout. */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-strong pb-5 font-mono text-[10px] uppercase tracking-[.2em] text-faint">
          <span>Selected engagements</span>
          <span>
            <span className="text-accent-deep">
              {String(visible.length).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-line-strong">/</span>
            {String(total).padStart(2, "0")} projects
          </span>
        </div>

        <div className="flex flex-wrap gap-2 py-8">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[.12em] transition-colors duration-300 ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line-strong text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
                <span
                  className={`font-mono text-[10px] ${active ? "text-white/50" : "text-faint"}`}
                >
                  {String(f.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric grid, so the page reads as a curated selection rather
            than a uniform catalogue:
              - tile 0 is the lead, full width and taller
              - after it, every third tile spans both columns
            The rhythm is measured from index 1 (`j` below) so the lead
            tile doesn't throw the pattern out by one. Both rules key off
            position, never a hardcoded slug, so filtering can't leave the
            grid without a lead or with two wide tiles side by side.

            Tiles reveal on scroll rather than on mount, so the page builds
            as you move down it instead of having already finished before
            you arrive. Keying on `filter` as well as slug remounts the grid
            when a category is picked, so the same cascade replays and the
            filter feels like it did something. */}
        <div
          className={`grid gap-x-5 gap-y-14 sm:grid-cols-2 ${cursorEnabled ? "cursor-none" : ""}`}
        >
          {visible.map((project, i) => {
            const featured = i === 0;
            const j = i - 1;
            const wide = !featured && j % 3 === 2;
            const tile = (
              <ProjectTile
                project={project}
                wide={wide}
                featured={featured}
                index={i}
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
              />
            );
            const span = featured || wide ? "sm:col-span-2" : "";

            // Reduced motion branches the whole element rather than blanking
            // the animation props: `useReducedMotion()` returns null for one
            // render, so a props-only guard mounts at opacity 0 and then
            // loses the `whileInView` that would have revealed it — the
            // content never comes back. Same fix as reveal.tsx.
            if (reduced) {
              return (
                <div key={project.slug} className={span}>
                  {tile}
                </div>
              );
            }

            return (
              <motion.div
                key={`${filter}-${project.slug}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  // Left cell leads its neighbour, so a row cascades in
                  // rather than snapping as one block. Full-width tiles sit
                  // alone on their row and never need the offset.
                  delay: featured || wide ? 0 : (i % 2) * 0.09,
                }}
                className={span}
              >
                {tile}
              </motion.div>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="py-20 text-center text-sm text-faint">
            Nothing published in this category yet.
          </p>
        )}
      </Shell>

      {cursor}
    </section>
  );
}
