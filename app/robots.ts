import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

/**
 * robots.txt. `/api/` is disallowed — the contact handler is a POST
 * endpoint with nothing to index, and keeping it out of crawl budget also
 * keeps it out of the logs of anything scraping for form endpoints.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
