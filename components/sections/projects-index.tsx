"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { CATEGORY_LABEL, ProjectTile } from "@/components/ui/project-tile";
import { Shell } from "@/components/ui/shell";
import { useViewCursor } from "@/components/ui/view-cursor";
import type { Project, ServiceCategory } from "@/lib/content";

type Filter = ServiceCategory | "all";

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
 * Filters are derived from the projects actually present, never from the
 * full `ServiceCategory` union, so a category with nothing published can't
 * render a tab that leads to an empty grid.
 *
 * The "View site" cursor bubble comes from `useViewCursor`, shared with the
 * homepage work section — see that hook for why it's gated the way it is.
 */
export function ProjectsIndex({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const {
    enabled: cursorEnabled,
    handleMove,
    setHovering,
    cursor,
  } = useViewCursor();

  // Only categories that actually have published work get a tab.
  const filters = useMemo(() => {
    const present = [...new Set(projects.map((p) => p.category))];
    return [
      { key: "all" as Filter, label: "All work", count: projects.length },
      ...present.map((c) => ({
        key: c as Filter,
        label: CATEGORY_LABEL[c],
        count: projects.filter((p) => p.category === c).length,
      })),
    ];
  }, [projects]);

  const visible = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.category === filter),
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
            {String(projects.length).padStart(2, "0")} projects
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

        {/* Asymmetric grid: every third tile spans both columns, so the
            rhythm breaks rather than reading as a uniform catalogue. */}
        <div
          className={`grid gap-x-5 gap-y-14 sm:grid-cols-2 ${cursorEnabled ? "cursor-none" : ""}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout={!reduced}
                initial={reduced ? undefined : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : (i % 3) * 0.05,
                }}
                className={i % 3 === 2 ? "sm:col-span-2" : ""}
              >
                <ProjectTile
                  project={project}
                  wide={i % 3 === 2}
                  onPointerEnter={() => setHovering(true)}
                  onPointerLeave={() => setHovering(false)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
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
