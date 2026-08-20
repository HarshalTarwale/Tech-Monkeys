import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { AboutPrinciples } from "@/components/sections/about-principles";
import { AboutStats } from "@/components/sections/about-stats";
import { AboutStory } from "@/components/sections/about-story";
import { PageMain } from "@/components/ui/page-main";
import { Contact } from "@/components/sections/contact";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceStatement } from "@/components/sections/service-statement";
import { SiteHeader } from "@/components/sections/site-header";
import { getAbout, getServiceDetailSlugs, getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tech Monkeys is a UAE digital studio. The people who scope your project are the people who build it — websites, platforms and storefronts, live and looked after.",
};

/**
 * About route, modelled on the structure the client pointed at: hero ->
 * stat band -> narrative -> (team) -> statement -> CTA.
 *
 * Two of the reference's sections are deliberately absent — a named
 * leadership team and an awards wall — because we have neither on record
 * and AGENTS.md rules out inventing them. The principles grid takes the
 * team slot; nothing takes the awards slot. See content/about.ts for the
 * full sourcing notes, including where the stat figures come from.
 *
 * Section rhythm alternates ground the same way the service pages do:
 * bone hero -> ink stats -> white story -> bone principles -> ink
 * statement -> ink CTA.
 */
export default function AboutPage() {
  const about = getAbout();

  return (
    <>
      <SiteHeader
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />

      <PageMain>
        <AboutHero />
        <AboutStats stats={about.stats} />
        <AboutStory />
        <AboutPrinciples principles={about.principles} />

        {/* Reuses the service pages' ink statement block rather than a
            near-identical copy — same {lead, emphasis, support} shape. */}
        <ServiceStatement statement={about.statement} eyebrow="Why it works" />

        <ServiceCta />
        {/* Footer only — ServiceCta above already carries the closing CTA. */}
        <Contact showCta={false} />
      </PageMain>
    </>
  );
}
