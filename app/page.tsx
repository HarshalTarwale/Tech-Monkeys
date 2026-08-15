import { Contact } from "@/components/sections/contact";
import { HomeView } from "@/components/sections/home-view";
import { Work } from "@/components/sections/work";
import {
  getDivisions,
  getMarqueeItems,
  getProjects,
  getProjectsBySegment,
  getServices,
} from "@/lib/content";
import type { Project } from "@/lib/content";

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
        projectsBySegment={projectsBySegment}
        marqueeItems={getMarqueeItems()}
      />
      <Work projects={getProjects()} />
      <Contact />
    </>
  );
}
