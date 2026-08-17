import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { ServiceProcess } from "@/components/sections/service-process";
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
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug as ServiceCategory);
  const detail = service ? getServiceDetail(service.slug) : undefined;

  if (!service || !detail) notFound();

  return (
    <>
      <SiteHeader services={getServices()} serviceDetailSlugs={getServiceDetailSlugs()} />
      <ServiceHero service={service} intro={detail.intro} />
      <ServiceHighlights highlights={detail.highlights} />
      <ServiceProcess steps={detail.process} />
      {detail.technologies && detail.technologies.length > 0 && (
        <ServiceTechnologies technologies={detail.technologies} />
      )}
      <ServiceCta />
      <ServiceWork projects={getProjectsByCategory(service.slug)} />
      <Contact />
    </>
  );
}
