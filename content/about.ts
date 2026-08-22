/**
 * About-page content.
 *
 * Structure follows the reference the client pointed at (tentwenty's
 * about-us page), studied by rendering it: hero -> stat counters -> "who we
 * are" narrative -> team -> awards -> big statement -> CTA. Every sentence
 * here is written from scratch.
 *
 * Sourcing, and what was deliberately left out:
 *
 * - `stats` are the client's OWN published figures, carried over verbatim
 *   from their live site techmonkey.space ("45+ Total Clients", "78+ Total
 *   Projects", "4+ Countries"). Not invented here.
 *   TODO(client): these outrank what this repo can verify — the audit in
 *   docs/project-inventory-verified.md covers 24 projects, because it only
 *   tracks work with a public repo or live URL we could check. Design-only,
 *   client-hosted and pre-GitHub work wouldn't appear there, so the two
 *   numbers can both be true. Confirm 45/78/4 are still current before
 *   launch, since they are the one claim on this page we cannot check.
 *
 * - `location`, and the fact the studio is UAE-based, come from the same
 *   live site.
 *
 * - NO team section. The reference runs eight named leaders with photos and
 *   titles; we have no names, roles or headcount for Tech Monkeys, and
 *   AGENTS.md forbids inventing them. The "how we work" principles take
 *   that slot instead — same job (show who you'd be dealing with) without
 *   a fabricated org chart.
 *
 * - NO awards section. The reference lists Awwwards and CSS Design Awards
 *   accolades; we have none on record. An empty or invented awards wall
 *   costs more trust than a missing one.
 *
 * - NO testimonials. techmonkey.space does publish three, with named
 *   clients and a "+40% bookings" figure. They are the client's own claims
 *   rather than something invented — but lib/content.ts gates testimonials
 *   behind `approved: true` and getTestimonials() returns empty by design,
 *   so they stay off until the client explicitly clears them. Flagged to
 *   the client as an easy win; see the summary.
 */

export interface AboutStat {
  value: string;
  label: string;
  /** Optional quiet detail line shown under the label, e.g. naming which countries. */
  sublabel?: string;
}

export interface AboutPrinciple {
  title: string;
  body: string;
}

export const about = {
  eyebrow: "About Tech Monkeys",
  // `site.tagline` verbatim, split across the two lines the page's heading
  // component expects. Two earlier drafts were rejected: "Small studio.
  // Serious output." (repeated the "Who we are" section directly below it)
  // and "A digital product partner, not just another vendor." (right idea,
  // but ran to three lines on desktop and buried the tagline in a
  // comparison). The company's own positioning is already the shortest,
  // clearest statement of what it does — so it is used as-is rather than
  // dressed up.
  heading: { lead: "Your digital", emphasis: "product partner." },
  intro:
    "Tech Monkeys is a digital studio working out of the UAE. We design and build the websites, platforms and storefronts that businesses actually run on — and then stay on to keep them running.",

  /** Client's own published figures — see the sourcing note above. */
  stats: [
    { value: "45+", label: "Clients served" },
    { value: "78+", label: "Projects delivered" },
    { value: "4+", label: "Countries", sublabel: "UAE · UK · USA · Europe" },
    { value: "10", label: "Services under one roof" },
  ] as AboutStat[],

  story: {
    lead: "We are not a big agency,",
    emphasis: "and that is the point.",
    paragraphs: [
      "Most studios our clients had worked with before came with a layer of account management between the brief and the people building it. Something always got lost in that gap — a decision made without context, a detail nobody flagged until it was expensive.",
      "We work the other way round. The people who scope your project are the people who design and build it, so nothing has to survive a handover to stay intact. It keeps us small on purpose, and it is why the work comes back sharper.",
      "That has taken us across property, hospitality, retail, recruitment, events and maintenance — from a founder's first launch to the operational systems a working business depends on every day.",
    ],
  },

  principles: [
    {
      title: "One team, start to finish",
      body: "The people who scope the work are the people who build it. No account layer, no telephone game between you and the person writing the code.",
    },
    {
      title: "Live, or it did not happen",
      body: "Every project we show you is a real, running site you can open right now. We would rather show you the work than describe it.",
    },
    {
      title: "Built to be handed over",
      body: "You get a CMS or admin area and a walkthrough. Routine changes should never need to come back through us — that is a dependency, not a service.",
    },
    {
      title: "Straight answers",
      body: "On scope, timeline and cost, including when the honest answer is that you do not need what you asked for.",
    },
    {
      title: "It has to be fast",
      body: "Performance is not a final polish step. A slow site loses the visitor before the message ever lands, so speed is a build decision from day one.",
    },
    {
      title: "We stay reachable",
      body: "Launch is the start of a site's life. Hosting, monitoring and changes carry on afterwards, because that is when it actually matters.",
    },
  ] as AboutPrinciple[],

  statement: {
    lead: "Ambitious work",
    emphasis: "does not need a big agency behind it.",
    support:
      "It needs people who care about the detail and stay close enough to the build to protect it.",
  },

  location: "Ras Al Khaimah, United Arab Emirates",
} as const;
