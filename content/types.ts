/**
 * Content model.
 *
 * Shapes follow the approved design reference (division -> stakeholder cards,
 * ledger table) and the verified project inventory in
 * docs/project-inventory-verified.md.
 *
 * Rule: nothing is published unless `status` is "live" AND `nameApproved`
 * is true. See lib/content.ts, which filters on both.
 */

/** The three client segments. Drives the divisions section and work filters. */
export type Segment = "startups" | "corporates" | "enterprises";

/** Service categories with real work behind them. Kept deliberately short —
 *  empty categories cost trust. See the inventory doc. */
export type ServiceCategory =
  | "web"
  | "mobile"
  | "ecommerce"
  | "platforms"
  | "ai"
  | "brand"
  | "seo"
  | "cloud"
  | "consulting"
  | "video";

/** Publication gate, not a client-facing label. */
export type ProjectStatus = "live" | "delivered" | "in-progress" | "unverified";

export interface Project {
  /** URL-safe id, unique. */
  slug: string;
  /** Client or product name as it should appear publicly. */
  name: string;
  /** Industry, e.g. "Real Estate". Shown as the card eyebrow. */
  sector: string;
  /** One line on what was built. */
  scope: string;
  /** What changed for the client. Supplied by client; omit until then. */
  outcome?: string;
  segment: Segment;
  category: ServiceCategory;
  /** Short capability tags, e.g. ["Web", "CRM"]. */
  tags: string[];
  /** Verified deployment. Omit if it does not resolve. */
  url?: string;
  /** Year delivered. */
  year?: number;
  /** Cover image in /public. Omit until supplied. */
  image?: string;
  /**
   * Silent screen-recording of the project, in /public (e.g. "/video/cloak.mp4").
   * Plays muted+looped on hover in the /projects grid.
   *
   * Omit until a real recording exists. The grid falls back to a live
   * embed of the project's own `url`, so a missing video degrades to real
   * content rather than a placeholder — see components/ui/project-tile.tsx.
   */
  video?: string;
  status: ProjectStatus;
  /** Client has approved public use of their name. Gates publication. */
  nameApproved: boolean;
  /** Surface on the homepage. */
  featured?: boolean;
}

export interface Service {
  slug: ServiceCategory;
  /** Display name, e.g. "Web Apps & SaaS Platforms". */
  title: string;
  /** One-line summary for the capabilities list. */
  summary: string;
  /** Two-digit index shown in the mono column: "01". */
  index: string;
  /** Longer description for a future service page. */
  body?: string;
  /**
   * True when verified portfolio work backs this service. Used to avoid
   * linking a prospect to an empty case-study grid; not a capability claim.
   */
  hasWork: boolean;
}

/**
 * Full content for a service's own detail page (`/services/[slug]`).
 * Only written for services with real work to point to — see
 * `content/services/details.ts`. A service without an entry here has no
 * detail page; `getServiceDetail` returns undefined and the route 404s.
 */
export interface ServiceDetail {
  slug: ServiceCategory;
  /** Paragraph under the page's headline, expanding on the Service summary. */
  intro: string;
  /** Short line set under the hero — the service's promise in one breath. */
  tagline: string;
  /** Short capability words for the hero marquee band. */
  marquee: string[];
  /**
   * The page's first tonal break (ServiceStatement) — shaped like every
   * other section heading on the page (plain line + short scroll-filled
   * line) rather than one long paragraph, so it doesn't stand out as the
   * one section that breaks the established heading pattern.
   */
  statement: {
    /** Plain first line. */
    lead: string;
    /** Short second line, scroll-filled — keep this brief, it's a punch not a paragraph. */
    emphasis: string;
    /** Supporting paragraph underneath, in a dimmed tone. */
    support: string;
  };
  /** "What's included" grid: 5-6 concrete facets of the service. */
  highlights: { title: string; body: string }[];
  /** "How we work" steps, in order. */
  process: { title: string; body: string }[];
  /**
   * Real tools this service is actually built with — not a generic
   * "capabilities" list. Optional: a service without evidenced tooling
   * simply omits the section rather than listing something unverified.
   */
  technologies?: { name: string; category: string; body: string }[];
  /** Questions a first-time buyer actually asks before enquiring. */
  faqs?: { question: string; answer: string }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  /** Role and company, e.g. "Director, Hyde Park Wood". */
  role: string;
  /** Links the quote to a project. */
  projectSlug?: string;
  /** Client has approved the quote for public use. Gates publication. */
  approved: boolean;
}

/** A division = one client segment, as presented in the design. */
export interface Division {
  id: string;
  segment: Segment;
  /** Display name: "Startups". */
  name: string;
  /** One-word promise: "Velocity". */
  focus: string;
  body: string;
}
