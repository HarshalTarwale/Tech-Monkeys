import type { Division, Project } from "../types";

/**
 * The three divisions. Copy is original to Tech Monkeys.
 */
export const divisions: Division[] = [
  {
    id: "01",
    segment: "startups",
    name: "Startups",
    focus: "Velocity",
    body: "First build, first customers, first raise. We take a founder's idea to a product that ships, stands up to real users and reads as credible in the room.",
  },
  {
    id: "02",
    segment: "corporates",
    name: "Corporates",
    focus: "Scale",
    body: "For businesses whose spreadsheets have stopped coping. We replace manual process with systems that hold inventory, customers and orders in one place.",
  },
  {
    id: "03",
    segment: "enterprises",
    name: "Enterprises",
    focus: "Continuity",
    body: "Long-horizon work for organisations that cannot afford downtime. Connected platforms, monitoring and automation built to be maintained for years.",
  },
];

/**
 * Explicit showcase lists for the homepage Divisions section.
 *
 * These slugs determine which projects appear in each division's carousel,
 * independent of the project's own `segment`. This lets us place a project
 * in the right filter on /projects while curating what the homepage shows.
 *
 * Max 4 per division (matches MAX_PREVIEWS in project-showcase.tsx).
 * Order here is the display order in the carousel.
 */
export const divisionShowcase: Record<string, string[]> = {
  startups: ["cloak"],
  corporates: [
    "dmd-properties",
    "skyran",
    "hometrack",
    "continental-premium-properties",
  ],
  enterprises: ["onlineblinds", "fixnex", "neuroholistic", "lumina"],
};

/**
 * Projects — every entry re-verified live on 2026-08-20 (previous audit
 * 2026-08-15). See docs/project-inventory-verified.md.
 *
 * This is the complete set of deployed client work across the studio's
 * GitHub. Re-checked against `github.com/it-techmonkey` on 2026-08-20: 34
 * repos there, of which 24 have a live deployment with real content — all
 * 24 are below. The remainder are deliberately absent and stay that way:
 *   - `nexus`, `partyfud-frontend`, `enabled` (enabled-phi),
 *     `enabled-ngo` (enabled-ngo-xi) — all still HTTP 404.
 *   - `continental-backend`, `partyfud-backend`, `pacific_pearl`,
 *     `continental` — backends with no deployed front end to show.
 *   - `Zaak` — Flutter scaffold, never deployed.
 *   - `TechMonkey-Website` — the studio's own site, not client work.
 * Re-run the check before claiming this list is exhaustive again.
 *
 * `nameApproved` gates public use of a client's name. lib/content.ts
 * filters on it, so an unapproved project stays out of the rendered site
 * even though it sits in this file. All 24 were cleared for publication by
 * the client on 2026-08-20 ("add all the projects present on their
 * github"). The flag stays in the model rather than being deleted: new
 * work still defaults to unapproved, and any single client can be pulled
 * back off the site by flipping one boolean.
 *
 * TODO(client): outcome sentence and year for each project. Cover images
 * are done — all 24 captured by scripts/capture-project-screenshots.mjs.
 *
 * TODO(client): the Enterprises segment has exactly one real project
 * (FixNex). The client asked, pending real enterprise-tier work, to
 * temporarily re-tag three corporate-segment projects (Ark Vision, Sartawi
 * Properties, Pacific Pearl Hotels — search "borrowed into Enterprises"
 * below) so the showcase carousel has 4 to cycle through instead of 1.
 * Revert their `segment` back to "corporates" once real enterprise
 * projects exist, or if the client decides otherwise.
 *
 * `featured` controls which projects appear in the homepage "Work,
 * documented" section. Exactly three are featured:
 *   - DMD Properties  (corporates)
 *   - FixNex          (enterprises)
 *   - NeuroHolistic   (startups)
 */
export const projects: Project[] = [
  {
    slug: "hyde-park-wood",
    name: "Hyde Park Wood",
    sector: "Trade Supply",
    scope: "Wholesale trade portal handling multi-customer catalogues, order tracking and automated invoicing.",
    segment: "corporates",
    category: "platforms",
    tags: ["Platform", "Orders", "Invoicing"],
    url: "https://www.hydeparkwood.co.uk/",
    image: "/projects/hyde-park-wood.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "fixnex",
    name: "FixNex",
    sector: "PropTech",
    scope: "AI-assisted property maintenance platform with conversational booking, predictive scheduling and connected-sensor monitoring.",
    segment: "enterprises",
    category: "ai",
    tags: ["AI", "Platform", "IoT"],
    url: "https://fixnex.ae",
    image: "/projects/fixnex.jpg",
    status: "live",
    nameApproved: true,
    featured: true,
  },
  {
    slug: "taldo",
    name: "Taldo",
    sector: "Recruitment",
    scope: "Cross-border hiring platform pairing healthcare candidates with placements, with editorial and admin tooling behind it.",
    segment: "corporates",
    category: "platforms",
    tags: ["Platform", "CMS", "Admin"],
    url: "https://taldo.co/",
    image: "/projects/taldo.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "saabri",
    name: "Saabri",
    sector: "Sales",
    scope: "CRM for lead capture, enquiry tracking and team handover across a distributed sales floor.",
    segment: "corporates",
    category: "platforms",
    tags: ["CRM", "Web"],
    url: "https://www.saabriazizproperties.com/",
    image: "/projects/saabri.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "cloak",
    name: "Cloak",
    sector: "Events",
    scope: "Digital cloakroom running QR-issued tickets and live venue operations for high-volume nights.",
    segment: "startups",
    category: "platforms",
    tags: ["Platform", "QR", "Ops"],
    url: "https://www.cloakqr.com/",
    image: "/projects/cloak.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "continental-premium-properties",
    name: "Continental Premium Properties",
    sector: "Real Estate",
    scope: "Property platform spanning listings, enquiry capture and an operations backend for the sales team.",
    segment: "corporates",
    category: "web",
    tags: ["Web", "Listings", "Backend"],
    url: "https://continental-properties.vercel.app",
    image: "/projects/continental-premium-properties.jpg",
    status: "live",
    nameApproved: true,
  },
  // borrowed into Enterprises pending real enterprise-tier work — see TODO above
  {
    slug: "sartawi-properties",
    name: "Sartawi Properties",
    sector: "Real Estate",
    scope: "Property discovery site with search, saved listings and agent routing.",
    segment: "enterprises",
    category: "web",
    tags: ["Web", "Brand"],
    url: "https://www.sartawiproperties.com/",
    image: "/projects/sartawi-properties.jpg",
    status: "live",
    nameApproved: true,
  },
  // borrowed into Enterprises pending real enterprise-tier work — see TODO above
  {
    slug: "ark-vision",
    name: "ARK Vision",
    sector: "Real Estate",
    scope: "Luxury property presence for the Dubai market, built around high-value listings.",
    segment: "enterprises",
    category: "web",
    tags: ["Web", "Luxury"],
    url: "https://arkvision.ae",
    image: "/projects/ark-vision.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "skyran",
    name: "SKYRAN",
    sector: "Real Estate",
    scope: "Property portal with filtered search and detail pages for a Dubai agency.",
    segment: "corporates",
    category: "web",
    tags: ["Web", "Search"],
    url: "https://skyranrealestate.com/",
    image: "/projects/skyran.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "da-realty",
    name: "Da Realty",
    sector: "Real Estate",
    scope: "Luxury listings site for the Dubai market.",
    segment: "corporates",
    category: "web",
    tags: ["Web"],
    url: "https://www.distinctaddress.com/",
    image: "/projects/da-realty.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "credence-realtor",
    name: "Credence Realtor",
    sector: "Real Estate",
    scope: "Agency site with property enquiry funnels.",
    segment: "corporates",
    category: "web",
    tags: ["Web"],
    url: "https://www.credencerealtor.com/",
    image: "/projects/credence-realtor.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "dmd-properties",
    name: "DMD Properties",
    sector: "Real Estate",
    scope: "Property marketing site with listing management.",
    segment: "corporates",
    category: "web",
    tags: ["Web"],
    url: "https://www.dmdrealestate.ae/",
    image: "/projects/dmd-properties.jpg",
    status: "live",
    nameApproved: true,
    featured: true,
  },
  {
    slug: "hometrack",
    name: "Hometrack",
    sector: "Wealth Management",
    scope: "Advisory presence on a live production domain, built for enquiry generation.",
    segment: "corporates",
    category: "web",
    tags: ["Web"],
    url: "https://www.hometrack.ae",
    image: "/projects/hometrack.jpg",
    status: "live",
    nameApproved: true,
  },
  // borrowed into Enterprises pending real enterprise-tier work — see TODO above
  {
    slug: "pacific-pearl-hotels",
    name: "Pacific Pearl Hotels",
    sector: "Hospitality",
    scope: "Multi-page hotel presence covering rooms, booking intent and guest experience.",
    segment: "enterprises",
    category: "web",
    tags: ["Web", "Booking"],
    url: "https://www.pacificpearlhotels.com/",
    image: "/projects/pacific-pearl-hotels.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "autobreeze",
    name: "AutoBreeze",
    sector: "Car Rental",
    scope: "Premium rental site with fleet browsing and reservation enquiry.",
    segment: "startups",
    category: "web",
    tags: ["Web", "Fleet"],
    url: "https://autobreezecarrental.com",
    image: "/projects/autobreeze.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "vedic-group",
    name: "Vedic Group of Institutions",
    sector: "Education",
    scope: "Institutional site covering programmes, admissions and campus information.",
    segment: "corporates",
    category: "web",
    tags: ["Web"],
    url: "https://harshaltarwale.github.io/Vedic-Group-of-Institutions/",
    image: "/projects/vedic-group.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "enabled",
    name: "Enabled",
    sector: "Nonprofit",
    scope: "Community support platform connecting members with services and resources.",
    segment: "startups",
    category: "web",
    tags: ["Web", "Community"],
    url: "https://www.enabled.ngo/",
    image: "/projects/enabled.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "mindforge",
    name: "MindForge",
    sector: "Marketing",
    scope: "Conversion-led agency site with a motion-heavy narrative structure.",
    segment: "startups",
    category: "web",
    tags: ["Web", "Motion"],
    url: "https://mindforge-marketing.vercel.app",
    image: "/projects/mindforge.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "copilot-labs",
    name: "Copilot Labs",
    sector: "Technology",
    scope: "Product marketing site for a technology studio.",
    segment: "startups",
    category: "web",
    tags: ["Web"],
    url: "https://copilot-labs.vercel.app",
    image: "/projects/copilot-labs.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "neuroholistic",
    name: "NeuroHolistic",
    sector: "Wellness",
    scope: "Commerce experience with live Stripe payments and programme enrolment.",
    segment: "startups",
    category: "ecommerce",
    tags: ["E-commerce", "Stripe"],
    url: "https://www.neuroholisticinstitute.com/",
    image: "/projects/neuroholistic.jpg",
    status: "live",
    nameApproved: true,
    featured: true,
  },
  {
    slug: "lumina",
    name: "Lumina",
    sector: "Direct-to-Consumer",
    scope: "Single-product blackout blind brand for the US market, with sizing configurator and guarantee flows.",
    segment: "startups",
    category: "ecommerce",
    tags: ["E-commerce", "DTC"],
    url: "https://www.luminablackoutblinds.com/",
    image: "/projects/lumina.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "onlineblinds",
    name: "OnlineBlinds",
    sector: "Retail",
    scope: "Made-to-measure storefront with dimension-driven pricing.",
    segment: "corporates",
    category: "ecommerce",
    tags: ["E-commerce", "Configurator"],
    url: "https://www.onlineblindsexpress.co.uk/",
    image: "/projects/onlineblinds.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "priceless-blinds",
    name: "Priceless Blinds",
    sector: "Retail",
    scope: "Window furnishing storefront serving the Dublin market.",
    segment: "corporates",
    category: "ecommerce",
    tags: ["E-commerce"],
    url: "https://pricelessblinds.ie",
    image: "/projects/priceless-blinds.jpg",
    status: "live",
    nameApproved: true,
  },
  {
    slug: "yournextblinds",
    name: "YourNextBlinds",
    sector: "Retail",
    scope: "Made-to-measure blinds and shutters storefront.",
    segment: "corporates",
    category: "ecommerce",
    tags: ["E-commerce"],
    url: "https://www.yournextblinds.com/",
    image: "/projects/yournextblinds.jpg",
    status: "live",
    nameApproved: true,
  },
];
