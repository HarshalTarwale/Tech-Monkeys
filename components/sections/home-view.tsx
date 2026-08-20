import { Capabilities } from "@/components/sections/capabilities";
import { Divisions } from "@/components/sections/divisions";
import { Hero } from "@/components/sections/hero";
import type { Division, Project, Service } from "@/lib/content";

/**
 * Composes the homepage's client-rendered sections.
 *
 * Content is passed down from the Server Component page, so nothing in
 * `content/` is bundled to the client beyond what is rendered.
 *
 * No longer holds any state of its own: `Hero` used to be driven by a
 * `mode`/`setMode` pair lifted up here, back when a manual switcher let a
 * visitor pick which division's headline word showed. That switcher was
 * removed in favour of an automatic type/erase cycle through all three
 * divisions, and the cycle is entirely self-contained inside `Hero` — so
 * this component now only threads props through.
 *
 * `SiteHeader` used to render here too but was hoisted to app/page.tsx:
 * the page transition wraps everything below the header, so the header
 * has to sit outside that wrapper to stay anchored during a navigation.
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
  return (
    <>
      <Hero divisions={divisions} />
      <Divisions divisions={divisions} projectsBySegment={projectsBySegment} />
      <Capabilities services={services} />
    </>
  );
}
