import type { Service } from "../types";

/**
 * The ten services Tech Monkeys offers.
 *
 * Copy is original to Tech Monkeys.
 *
 * `hasWork` records whether verified portfolio work backs the service (see
 * docs/project-inventory-verified.md). Everything is listed and sellable;
 * the flag exists so surfaces that promise case studies — filters, category
 * grids — can avoid sending a prospect to an empty page. It is not a
 * statement about capability.
 *
 * Strategic & Digital Consulting and Video & Film Services (09, 10) were
 * added to match the competitor's full service count at the client's
 * explicit request, with no portfolio evidence behind either yet — the
 * client's own words: "if client want to remove we will remove it later."
 * Both carry `hasWork: false` for that reason. Revisit once real
 * engagements exist, or if the client decides to drop them.
 */
export const services: Service[] = [
  {
    slug: "web",
    index: "01",
    title: "Website Design & Development",
    summary:
      "Marketing sites and property portals built to load fast, rank well and turn visitors into enquiries.",
    hasWork: true,
  },
  {
    slug: "mobile",
    index: "02",
    title: "Mobile App Development",
    summary:
      "Cross-platform apps that extend a product into the pocket of the people who use it daily.",
    hasWork: false,
  },
  {
    slug: "ecommerce",
    index: "03",
    title: "E-commerce Development",
    summary:
      "Made-to-measure storefronts with real payments, configurable products and post-purchase flows.",
    hasWork: true,
  },
  {
    slug: "platforms",
    index: "04",
    title: "Web Apps & SaaS Platforms",
    summary:
      "Order management, CRM and admin systems that carry the daily operations of a working business.",
    hasWork: true,
  },
  {
    slug: "ai",
    index: "05",
    title: "AI & Automation",
    summary:
      "Assistants, predictive monitoring and connected sensors embedded where they remove real work.",
    hasWork: true,
  },
  {
    slug: "brand",
    index: "06",
    title: "UI/UX & Branding",
    summary:
      "Interface systems and identities designed to make a product legible, usable and worth trusting.",
    hasWork: false,
  },
  {
    slug: "seo",
    index: "07",
    title: "SEO & Digital Marketing",
    summary:
      "Technical SEO, content structure and campaigns that compound organic demand over time.",
    hasWork: false,
  },
  {
    slug: "cloud",
    index: "08",
    title: "Cloud, Hosting & Support",
    summary:
      "Deployment, monitoring and maintenance that keep what we build fast and online.",
    hasWork: false,
  },
  {
    slug: "consulting",
    index: "09",
    title: "Strategic & Digital Consulting",
    summary:
      "Roadmapping and technical direction for teams deciding what to build before they build it.",
    hasWork: false,
  },
  {
    slug: "video",
    index: "10",
    title: "Video & Film Services",
    summary:
      "Product, brand and campaign film built to sit inside the same launch as the site.",
    hasWork: false,
  },
];
