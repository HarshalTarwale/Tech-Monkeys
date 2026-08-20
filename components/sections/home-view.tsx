"use client";

import { useState } from "react";

import { Capabilities } from "@/components/sections/capabilities";
import { Divisions } from "@/components/sections/divisions";
import { Hero } from "@/components/sections/hero";
import type { Division, Project, Segment, Service } from "@/lib/content";

/**
 * Holds the one piece of state shared across sections: the active
 * division, which drives the hero headline.
 *
 * Content is passed down from the Server Component page, so nothing in
 * `content/` is bundled to the client beyond what is rendered.
 *
 * `SiteHeader` used to render here but was hoisted to app/page.tsx: the
 * page transition wraps everything below the header, so the header has to
 * sit outside that wrapper to stay anchored during a navigation. It never
 * consumed `mode` anyway, so nothing was shared by keeping it here.
 */
export function HomeView({
  divisions,
  services,
  projectsBySegment,
}: {
  divisions: Division[];
  services: Service[];
  projectsBySegment: Record<string, Project[]>;
}) {
  const [mode, setMode] = useState<Segment>(divisions[0]?.segment ?? "startups");

  return (
    <>
      <Hero divisions={divisions} mode={mode} setMode={setMode} />
      <Divisions divisions={divisions} projectsBySegment={projectsBySegment} />
      <Capabilities services={services} />
    </>
  );
}
