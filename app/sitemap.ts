import type { MetadataRoute } from "next";

import { getServiceDetailSlugs, site } from "@/lib/content";

/**
 * Sitemap, generated from the same source the routes are.
 *
 * Service pages come from `getServiceDetailSlugs()` — the identical list
 * that drives `generateStaticParams` — so a service gaining or losing a
 * detail page can never leave a stale or missing sitemap entry behind.
 * `/api/contact` is deliberately absent: it's a POST handler, not a page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...getServiceDetailSlugs().map((slug) => ({
      url: `${site.url}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
