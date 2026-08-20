import type { Metadata } from "next";

import { PageMain } from "@/components/ui/page-main";
import { Contact } from "@/components/sections/contact";
import { ProjectsHero } from "@/components/sections/projects-hero";
import { ProjectsIndex } from "@/components/sections/projects-index";
import { ServiceCta } from "@/components/sections/service-cta";
import { SiteHeader } from "@/components/sections/site-header";
import {
  getProjects,
  getServiceDetailSlugs,
  getServices,
} from "@/lib/content";
import { arrangeProjectsForProjectIndex } from "@/lib/project-priority";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Live, public projects built by Tech Monkeys — websites, platforms, storefronts and AI systems running in production today.",
};

/**
 * The full project index, linked from the homepage ledger's "View all
 * projects" and from every service page. Until now those links 404'd.
 *
 * Everything renders through `getProjects()`, so the publication gate in
 * lib/content.ts still applies — a project appears here only when it is
 * `status: "live"` AND `nameApproved: true`. That currently means 12 of the
 * 24 projects in content/projects/index.ts are visible; the rest stay in
 * the content file, off the site, until the client clears those names for
 * public use. This page deliberately does not read from `content/`
 * directly, which would bypass that gate.
 */
export default function ProjectsPage() {
  const projects = getProjects();
  const projectIndexTotal = arrangeProjectsForProjectIndex(projects, "all").length;

  return (
    <>
      <SiteHeader
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />
      <PageMain>
        <ProjectsHero total={projectIndexTotal} />
        <ProjectsIndex projects={projects} />
        <ServiceCta />
        {/* Footer only — ServiceCta above already carries the closing CTA. */}
        <Contact showCta={false} />
      </PageMain>
    </>
  );
}
