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

/** The homepage ledger is a highlight reel, not the full catalogue. */
const WORK_SECTION_LIMIT = 5;

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
