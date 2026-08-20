import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageMain } from "@/components/ui/page-main";
import { Contact } from "@/components/sections/contact";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceStatement } from "@/components/sections/service-statement";
import { ServiceTechnologies } from "@/components/sections/service-technologies";
import { ServiceWork } from "@/components/sections/service-work";
import { SiteHeader } from "@/components/sections/site-header";
import {
  getProjectsByCategory,
  getService,
  getServiceDetail,
  getServiceDetailSlugs,
  getServices,
} from "@/lib/content";
import type { ServiceCategory } from "@/lib/content";

/**
 * Only slugs with written detail content get a page — everything else 404s.
 * See content/services/details.ts: services are added here one at a time,
 * per the client's own direction ("if it is good we will make similar for
 * others").
 */
export function generateStaticParams() {
  return getServiceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug as ServiceCategory);
  const detail = service ? getServiceDetail(service.slug) : undefined;
  if (!service) return {};
  return {
    title: service.title,
    description: detail?.intro ?? service.summary,
  };
}

/**
 * Section rhythm alternates ground deliberately: light hero, ink statement,
 * white grid, bone process, ink technologies, bone work, white FAQ, ink CTA.
 * The two ink blocks in the middle are far enough apart that neither reads
 * as the page changing identity — the site stays light-first, per the design
 * tokens, with dark used as punctuation.
 */
export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug as ServiceCategory);
  const detail = service ? getServiceDetail(service.slug) : undefined;

  if (!service || !detail) notFound();

  return (
    <>
      <SiteHeader
        services={getServices()}
        serviceDetailSlugs={getServiceDetailSlugs()}
      />

      <PageMain>
        <ServiceHero service={service} detail={detail} />
        <ServiceStatement statement={detail.statement} />
        <ServiceHighlights highlights={detail.highlights} />
        <ServiceProcess steps={detail.process} />

        {detail.technologies && detail.technologies.length > 0 && (
          <ServiceTechnologies technologies={detail.technologies} />
        )}

        <ServiceWork projects={getProjectsByCategory(service.slug)} />

        {detail.faqs && detail.faqs.length > 0 && (
          <ServiceFaq faqs={detail.faqs} />
        )}

        <ServiceCta />
        {/* Footer only — ServiceCta directly above already carries the
            closing call to action. */}
        <Contact showCta={false} />
      </PageMain>
    </>
  );
}
