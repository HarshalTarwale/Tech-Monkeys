import { PageMain } from "@/components/ui/page-main";
import { Contact } from "@/components/sections/contact";
import { HomeView } from "@/components/sections/home-view";
import { SiteHeader } from "@/components/sections/site-header";
import { Work } from "@/components/sections/work";
import {
  getDivisions,
  getFeaturedProjects,
  getFeaturedProjectsBySegment,
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
      acc[division.segment] = getFeaturedProjectsBySegment(division.segment);
      return acc;
    },
    {},
  );

  return (
    <>
      <SiteHeader
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />
      <PageMain>
        <HomeView
          divisions={divisions}
          services={getServices()}
          projectsBySegment={projectsBySegment}
        />
        <Work projects={getFeaturedProjects(WORK_SECTION_LIMIT)} />
        <Contact />
      </PageMain>
    </>
  );
}
