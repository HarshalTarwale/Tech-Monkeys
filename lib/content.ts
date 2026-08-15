import { divisions, projects } from "@/content/projects";
import { services } from "@/content/services";
import { footerNav, nav, site } from "@/content/site";
import type {
  Division,
  Project,
  Segment,
  Service,
  ServiceCategory,
  Testimonial,
} from "@/content/types";

/**
 * The only path components use to read content.
 *
 * Components must never import from `content/` directly — everything goes
 * through here so the publication gate below cannot be bypassed.
 */

/**
 * Publication gate.
 *
 * A project is publishable only when it is verified live AND the client has
 * approved public use of their name. Both must be true; unapproved work stays
 * off the site even though it sits in the content file.
 */
function isPublishable(project: Project): boolean {
  return project.status === "live" && project.nameApproved;
}

/** All publishable projects. */
export function getProjects(): Project[] {
  return projects.filter(isPublishable);
}

/** Homepage selection. Falls back to the first few if none are flagged. */
export function getFeaturedProjects(limit = 4): Project[] {
  const publishable = getProjects();
  const featured = publishable.filter((p) => p.featured);
  return (featured.length > 0 ? featured : publishable).slice(0, limit);
}

export function getProjectsBySegment(segment: Segment): Project[] {
  return getProjects().filter((p) => p.segment === segment);
}

export function getProjectsByCategory(category: ServiceCategory): Project[] {
  return getProjects().filter((p) => p.category === category);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/**
 * Counts every project held in content, published or not.
 * For internal/editorial use — never render this as a public credential.
 */
export function getInventoryCount(): { total: number; publishable: number } {
  return { total: projects.length, publishable: getProjects().length };
}

/**
 * Labels for the hero marquee.
 *
 * Uses approved client names when there are any. Until names are cleared for
 * publication it falls back to the sectors we work in, so the band is never
 * empty and never shows a name without permission.
 */
export function getMarqueeItems(): string[] {
  const named = getProjects().map((p) => p.name);
  if (named.length >= 6) return named;

  const sectors = Array.from(new Set(projects.map((p) => p.sector)));
  return [...named, ...sectors];
}

export function getServices(): Service[] {
  return services;
}

export function getService(slug: ServiceCategory): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getDivisions(): Division[] {
  return divisions;
}

export function getDivision(segment: Segment): Division | undefined {
  return divisions.find((d) => d.segment === segment);
}

/**
 * Testimonials. None collected yet — the client has not supplied approved
 * quotes. Returns empty so sections render nothing rather than placeholders.
 */
export function getTestimonials(): Testimonial[] {
  return [];
}

export { footerNav, nav, site };
export type {
  Division,
  Project,
  Segment,
  Service,
  ServiceCategory,
  Testimonial,
};
