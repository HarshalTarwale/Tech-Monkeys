import type { ServiceCategory, ServiceDetail } from "../types";

/**
 * Detail-page content for services worth a dedicated page today.
 *
 * Copy is original to Tech Monkeys. The structure and depth follow the
 * competitor page the client asked us to match (tentwenty's web design and
 * development service page) — same section order, comparable step count —
 * but every sentence is written from scratch against what we actually do.
 * Nothing is lifted.
 *
 * Two honesty boundaries held while writing this:
 *
 * 1. TODO(client): the `process` steps below describe a conventional studio
 *    delivery sequence. They are plausible and non-specific on purpose —
 *    no named project-management tool, no promised SLA, no headcount. The
 *    client should confirm these match how the team really runs a project
 *    and correct any that don't, since this is the one block on the page
 *    that makes a claim only they can verify.
 * 2. No testimonials. The reference page carries five client quotes; we
 *    have zero approved ones (getTestimonials() returns empty by design),
 *    and inventing them would breach the content rules in AGENTS.md. The
 *    FAQ section takes that slot instead — it serves the same
 *    "reassure a hesitant buyer" job without fabricating a single source.
 *
 * Only "web" is written. Per the client's direction, the rest are added one
 * at a time once this one is approved — an unwritten slug simply has no
 * detail page (getServiceDetail returns undefined, the route 404s).
 */
export const serviceDetails: Partial<Record<ServiceCategory, ServiceDetail>> = {
  web: {
    slug: "web",
    tagline: "Designed to be remembered. Built to be found.",
    intro:
      "Your website is usually the first real interaction someone has with your business — before a call, before a meeting, before a quote. We design and build sites that hold up to that moment: quick to load, obvious to navigate, and built so a visit turns into an enquiry instead of a bounce.",
    marquee: [
      "Web Design",
      "Development",
      "UI/UX",
      "SEO Ready",
      "CMS",
      "Performance",
    ],
    statement: {
      lead: "Most sites lose people",
      emphasis: "in the first five seconds.",
      support:
        "Not because the design is bad — because nothing tells the visitor where they are, what you do, or what to do next. We build the other kind: clear on arrival, quick on every device, and pointed at one outcome — the visitor getting in touch.",
    },
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
        title: "Kick-off",
        body: "We start with the business, not the browser. What the site has to achieve, who it's for, and what a successful visit actually looks like.",
      },
      {
        title: "The project team",
        body: "We assemble the people the project needs — design, frontend, backend — rather than handing every brief to the same fixed pair.",
      },
      {
        title: "Planning & timelines",
        body: "You get the schedule up front: what lands when, what we need from you, and when. No black-box stretches where nothing is visible.",
      },
      {
        title: "Audience & user flows",
        body: "We map who's arriving and what each of them came to do, so the structure serves real visitors instead of an internal org chart.",
      },
      {
        title: "Sitemap & wireframes",
        body: "The blueprint stage. Every page, in order, with content placed and nothing styled yet — cheap to change now, expensive to change later.",
      },
      {
        title: "UI/UX design",
        body: "Your brand becomes an interface. We present the direction on a key page first, agree it, then take the rest of the site to match.",
      },
      {
        title: "Prototype",
        body: "A clickable version before a line of production code. You navigate the real flows and catch what doesn't feel right while it's still cheap.",
      },
      {
        title: "Development",
        body: "The design gets built one-to-one, with motion and interaction added where they help someone use the page rather than just decorate it.",
      },
      {
        title: "Quality control",
        body: "Real devices, real browsers, real content. We check performance, accessibility and every form before anything is shown as finished.",
      },
      {
        title: "Launch & support",
        body: "We deploy, verify it live, and stay reachable. Sites need care after launch, and a handover shouldn't mean you're on your own.",
      },
    ],
    // What we actually build with — this site itself is the evidence for the
    // core stack; Stripe and the AI work are verified against real client
    // projects (NeuroHolistic and FixNex in content/projects/index.ts), and
    // every deployed project URL in that file is Vercel-hosted. Nothing here
    // that isn't demonstrably true.
    technologies: [
      {
        name: "Next.js",
        category: "Framework",
        body: "Our default for production sites. Server rendering means pages arrive fast and arrive complete — which is what both a visitor and a search crawler need.",
      },
      {
        name: "React",
        category: "Interface",
        body: "Component-driven interfaces that stay maintainable as a site grows past its first version, instead of turning into a page nobody wants to touch.",
      },
      {
        name: "TypeScript",
        category: "Language",
        body: "Typed code catches whole classes of mistakes before they ever reach a live site. Fewer surprises after launch, cheaper changes a year in.",
      },
      {
        name: "Tailwind CSS",
        category: "Styling",
        body: "A design system enforced in the markup itself, so what was designed and what got built don't quietly drift apart over a long project.",
      },
      {
        name: "Headless CMS",
        category: "Content",
        body: "Your content lives independently of your layout. Edit a page without a developer, and keep the same content if the design is ever rebuilt.",
      },
      {
        name: "Stripe",
        category: "Payments",
        body: "Real payment flows when a project needs them — subscriptions, one-off checkout, and the post-purchase handling around both. Live on client sites today.",
      },
      {
        name: "Vercel",
        category: "Hosting",
        body: "Global edge deployment with preview links on every change, so you review work on a real URL instead of a screenshot in an email.",
      },
      {
        name: "AI integration",
        category: "Automation",
        body: "Assistants and automated flows wired into a site where they remove real work — the same approach behind our AI-assisted platform builds.",
      },
    ],
    faqs: [
      {
        question: "How long does a website take?",
        answer:
          "A focused marketing site is usually a few weeks. A portal with search, listings and an admin area behind it runs longer. We give you the real timeline at the planning stage, before anything is committed.",
      },
      {
        question: "What does it cost?",
        answer:
          "It depends entirely on scope — a five-page brand site and a property portal with an operations backend are different projects. Tell us what you need and you'll get a written scope with a number attached, not a vague range.",
      },
      {
        question: "Can I update the site myself afterwards?",
        answer:
          "Yes. We hand over a CMS or admin area along with a walkthrough, so routine content changes don't need to come back through us. Bigger structural changes still can, if you'd rather.",
      },
      {
        question: "Do you redesign existing websites?",
        answer:
          "Often. Sometimes that's a full rebuild, sometimes it's fixing what's slow or unclear on a site that's otherwise fine. We'll tell you honestly which one you actually need.",
      },
      {
        question: "Will it work properly on phones?",
        answer:
          "Every build is designed for small screens as a first-class case, not squeezed down from a desktop layout afterwards. Most of your visitors will arrive on a phone.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We stay reachable. Hosting, monitoring and ongoing changes can all be arranged — a handover shouldn't mean you're suddenly on your own with it.",
      },
    ],
  },
};
