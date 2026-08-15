"use client";

import { useState } from "react";

import { Capabilities } from "@/components/sections/capabilities";
import { Divisions } from "@/components/sections/divisions";
import { Hero } from "@/components/sections/hero";
import { SiteHeader } from "@/components/sections/site-header";
import type { Division, Project, Segment, Service } from "@/lib/content";

/**
 * Holds the one piece of state shared across sections: the active division,
 * which drives both the hero headline and the readout in the header.
 *
 * Content is passed down from the Server Component page, so nothing in
 * `content/` is bundled to the client beyond what is rendered.
 */
export function HomeView({
  divisions,
  services,
  projectsBySegment,
  marqueeItems,
}: {
  divisions: Division[];
  services: Service[];
  projectsBySegment: Record<string, Project[]>;
  marqueeItems: string[];
}) {
  const [mode, setMode] = useState<Segment>(divisions[0]?.segment ?? "startups");

  return (
    <>
      <SiteHeader mode={mode} services={services} />
      <Hero
        divisions={divisions}
        mode={mode}
        setMode={setMode}
        marqueeItems={marqueeItems}
      />
      <Divisions divisions={divisions} projectsBySegment={projectsBySegment} />
      <Capabilities services={services} />
    </>
  );
}
