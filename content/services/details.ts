import type { ServiceCategory, ServiceDetail } from "../types";

/**
 * Detail-page content for services worth a dedicated page today.
 *
 * Copy is original to Tech Monkeys. The highlights below describe what our
 * actual "web" portfolio contains (real estate portals, booking sites,
 * marketing sites — see content/projects/index.ts) rather than a generic
 * agency-services list, so nothing here is a claim we can't back up.
 *
 * Only "web" is written. Per the client's direction, the rest are added one
 * at a time once this one is approved — an unwritten slug simply has no
 * detail page (getServiceDetail returns undefined, the route 404s).
 */
export const serviceDetails: Partial<Record<ServiceCategory, ServiceDetail>> = {
  web: {
    slug: "web",
    intro:
      "A website is usually the first real interaction someone has with a business — before a call, before a meeting, before a quote. We design and build sites that hold up to that moment: fast to load, clear to navigate, and built to turn a visit into an enquiry rather than a bounce.",
    highlights: [
      {
        title: "Marketing & brand sites",
        body: "A focused site that tells one story well — who you are, what you do, and why someone should get in touch.",
      },
      {
        title: "Property & real-estate portals",
        body: "Search, filtering and listing-detail pages built to handle real inventory at volume — the build we've shipped most often.",
      },
      {
        title: "Booking & enquiry-led sites",
        body: "Hospitality, rentals and services where the goal is a reservation or a message, not a dead end.",
      },
      {
        title: "Performance-first builds",
        body: "Every page ships fast. A slow site loses the visitor before the message ever lands.",
      },
      {
        title: "SEO-ready structure",
        body: "Clean markup, real headings, a proper sitemap — built to be found, not just built to look good.",
      },
      {
        title: "Handover you can actually use",
        body: "A CMS or admin area with a walkthrough, so day-to-day content changes don't need to come back through us.",
      },
    ],
    process: [
      {
        title: "Discover",
        body: "We start with the brief: who the site is for, what it needs to say, and what a successful visit looks like.",
      },
      {
        title: "Design",
        body: "Structure and layout get worked out before any code is written — the shape of the site, not just its skin.",
      },
      {
        title: "Build",
        body: "Development happens in the open. You see pages take shape as they're built, not just a single reveal at the end.",
      },
      {
        title: "Launch",
        body: "The site goes live, gets checked against real devices, and stays supported once it's out in the world.",
      },
    ],
    // What we actually build with — this site itself is the evidence for
    // the first four; Stripe is verified against real client work (the
    // NeuroHolistic project in content/projects/index.ts). Nothing here
    // that isn't demonstrably true.
    technologies: [
      {
        name: "Next.js",
        category: "Framework",
        body: "Our default framework for fast, SEO-ready builds — this site runs on it too.",
      },
      {
        name: "React",
        category: "Interface",
        body: "Component-driven interfaces that stay maintainable as a site grows past its first version.",
      },
      {
        name: "TypeScript",
        category: "Language",
        body: "Typed code catches mistakes before they reach a live site, not after.",
      },
      {
        name: "Tailwind CSS",
        category: "Styling",
        body: "A design system styled directly in markup, so design and build never drift apart.",
      },
      {
        name: "Stripe",
        category: "Payments",
        body: "Real payment flows when a project needs them — live on client sites today.",
      },
    ],
  },
};
