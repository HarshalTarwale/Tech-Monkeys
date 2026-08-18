import { Contact } from "@/components/sections/contact";
import { HomeView } from "@/components/sections/home-view";
import { Work } from "@/components/sections/work";
import {
  getDivisions,
  getFeaturedProjects,
  getMarqueeItems,
  getProjectsBySegment,
  getServiceDetailSlugs,
  getServices,
} from "@/lib/content";
import type { Project } from "@/lib/content";

/**
 * The homepage work section is a highlight reel, not the full catalogue —
 * `/projects` is the full, filterable index.
 *
 * Three, because the section's layout is two half-width tiles above one
 * full-width tile (see components/sections/work-grid.tsx). Changing this
 * number without revisiting that layout would leave a half-empty row.
 */
const WORK_SECTION_LIMIT = 3;

/**
 * Home route. Composition only — all content is read through lib/content,
 * all presentation lives in components/sections.
 */
export default function Home() {
  const divisions = getDivisions();

  const projectsBySegment = divisions.reduce<Record<string, Project[]>>(
    (acc, division) => {
      acc[division.segment] = getProjectsBySegment(division.segment);
      return acc;
    },
    {},
  );

  return (
    <>
      <HomeView
        divisions={divisions}
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
        projectsBySegment={projectsBySegment}
        marqueeItems={getMarqueeItems()}
      />
      <Work projects={getFeaturedProjects(WORK_SECTION_LIMIT)} />
      <Contact />
    </>
  );
}
