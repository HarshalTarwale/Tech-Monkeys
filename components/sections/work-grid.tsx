"use client";

import { Reveal } from "@/components/motion/reveal";
import { ProjectTile } from "@/components/ui/project-tile";
import { useViewCursor } from "@/components/ui/view-cursor";
import type { Project } from "@/lib/content";

/**
 * The homepage work section's tile grid, in the client-specified shape:
 *
 *   | tile 1 | tile 2 |
 *   |     tile 3      |
 *
 * Two half-width tiles, then one full-width — so it takes exactly three
 * projects (`WORK_SECTION_LIMIT` in app/page.tsx). With fewer than three
 * the layout still holds: the wide tile is keyed off the last index rather
 * than a hardcoded position, so two projects render as a single pair and
 * one renders as a single wide tile, instead of leaving a hole in the grid.
 *
 * Split out of work.tsx as its own client island so the section's heading
 * and CTA stay server-rendered — the tiles need client code for the live
 * embeds and the cursor bubble, but the surrounding copy doesn't.
 *
 * Same `useViewCursor` bubble as /projects, so hovering a project behaves
 * identically in both places.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const { enabled, handleMove, setHovering, cursor } = useViewCursor();
  const lastIndex = projects.length - 1;

  return (
    <div onMouseMove={handleMove}>
      <div
        className={`grid gap-x-5 gap-y-12 sm:grid-cols-2 ${enabled ? "cursor-none" : ""}`}
      >
        {projects.map((project, i) => {
          // Final tile spans the full row — the "| v1 | v2 | / | v3 |"
          // shape — which also keeps a 1- or 2-project fallback tidy.
          const wide = i === lastIndex && lastIndex % 2 === 0;
          return (
            // Left cell leads its neighbour so the row cascades in; the
            // wide tile sits alone on its row and needs no offset.
            <Reveal
              key={project.slug}
              y={28}
              delay={wide ? 0 : (i % 2) * 0.09}
              className={wide ? "sm:col-span-2" : ""}
            >
              <ProjectTile
                project={project}
                wide={wide}
                index={i}
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
              />
            </Reveal>
          );
        })}
      </div>

      {cursor}
    </div>
  );
}
