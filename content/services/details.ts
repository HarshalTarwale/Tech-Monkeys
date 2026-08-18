import type { ServiceCategory, ServiceDetail } from "../types";

/**
 * Detail-page content for every service.
 *
 * Copy is original to Tech Monkeys throughout. Structure and section depth
 * for each service follow that service's real equivalent page on the
 * competitor site the client asked us to match (tentwenty) — full mapping
 * below — but every sentence is written from scratch against what we
 * actually do. Nothing is lifted; per AGENTS.md, structure is reference
 * material, words are not.
 *
 *   web         -> tentwenty "website-ui-ux-design-and-development"
 *   mobile      -> tentwenty "app-ui-ux-design-and-development"
 *   ecommerce   -> tentwenty "e-commerce-website-development"
 *   platforms   -> tentwenty "saas-and-ai-driven-applications"
 *   ai          -> tentwenty "ai-consultancy-and-implementation"
 *   seo         -> tentwenty "search-engine-optimization"
 *   cloud       -> tentwenty "aws-and-azure-hosting"
 *   consulting  -> tentwenty "creative-and-digital-consulting"
 *   video       -> tentwenty "video-and-film"
 *   brand       -> no equivalent on tentwenty (they fold UI/UX into their
 *                  site/app pages rather than a standalone branding page);
 *                  built from this project's own established page pattern
 *                  instead of an external reference.
 *
 * Honesty boundaries held across all ten:
 *
 * 1. TODO(client): every `process` list describes a conventional delivery
 *    sequence for that service. Deliberately non-specific — no named
 *    project-management tool, no promised SLA, no headcount, no delivery
 *    timeframe. Confirm each one matches how the team actually runs that
 *    kind of engagement; these are the one block per page making a claim
 *    only the client can verify.
 * 2. No testimonials anywhere. We have zero approved quotes
 *    (getTestimonials() returns empty by design); every page's FAQ section
 *    takes that slot instead, answering the same "what am I signing up
 *    for" hesitation honestly rather than inventing a source.
 * 3. `technologies` is written per-service against real evidence, not
 *    symmetry: only "web", "ecommerce", "platforms", "ai" and "cloud" carry
 *    one, because those are the categories with a real project (see
 *    content/projects/index.ts) or, for "cloud", genuinely verifiable
 *    infrastructure (every real project URL is Vercel-hosted) behind the
 *    claim. The five services still flagged `hasWork: false` in
 *    content/services/index.ts (mobile, brand, seo, consulting, video)
 *    omit the section entirely rather than list an unverified tool —
 *    same rule "web" already set the precedent for. Their "Selected work"
 *    section will correctly show the "being prepared for publication"
 *    empty state until real projects exist in those categories.
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

  mobile: {
    slug: "mobile",
    tagline: "One build. Every phone in your customer's pocket.",
    intro:
      "A mobile app puts you where people already spend their time — not a tab they have to remember to open, an icon on their home screen. We design and build apps that feel native on both iOS and Android from a single codebase, so you're not paying to build the same product twice.",
    marquee: [
      "iOS",
      "Android",
      "Cross-Platform",
      "Push Notifications",
      "Offline-Ready",
      "App Store",
    ],
    statement: {
      lead: "A website gets visited.",
      emphasis: "An app gets opened.",
      support:
        "That's the real difference — an app sits on the home screen, sends a notification, works without a connection. For a product people come back to daily, that's not a nice-to-have, it's the whole point.",
    },
    highlights: [
      {
        title: "Cross-platform builds",
        body: "One codebase, native performance on both iOS and Android — built once, not twice, and kept in sync as it grows.",
      },
      {
        title: "Native-feel interfaces",
        body: "Interactions that match what a phone's own apps already taught the user to expect, not a website squeezed into a frame.",
      },
      {
        title: "Offline & sync",
        body: "Core features keep working without a connection, and quietly catch up the moment one returns.",
      },
      {
        title: "Push & re-engagement",
        body: "Notifications that bring someone back for a real reason, not a habit-loop notification for its own sake.",
      },
      {
        title: "App store readiness",
        body: "Listings, screenshots and the submission process handled, so the app actually reaches the store instead of stalling in review.",
      },
      {
        title: "Post-launch support",
        body: "OS updates happen whether you're ready or not. We keep the app working through them.",
      },
    ],
    process: [
      {
        title: "Kick-off",
        body: "We start with the business, not the build: what the app needs to do, who it's for, and what a successful session looks like.",
      },
      {
        title: "Choosing the framework",
        body: "Cross-platform gets you to both app stores from one codebase; native gets you the deepest access to device hardware. We recommend based on what the app actually needs, not habit.",
      },
      {
        title: "The project team",
        body: "We assemble the people this specific app needs — design, mobile engineering, backend — rather than handing every brief to the same fixed pair.",
      },
      {
        title: "Audience & user flows",
        body: "We map who's opening the app and what they came to do, so navigation serves real sessions instead of a feature list.",
      },
      {
        title: "UI/UX design",
        body: "Interfaces designed against each platform's own conventions, not one generic layout stretched across both.",
      },
      {
        title: "Prototype",
        body: "A clickable version before production code, so the flows get tested while they're still cheap to change.",
      },
      {
        title: "Development",
        body: "Built to run smoothly on real devices, not just a simulator — attention paid to load time, battery and offline behaviour from the start.",
      },
      {
        title: "Quality control",
        body: "Tested across real handsets and OS versions before anything reaches a store listing.",
      },
      {
        title: "Launch & store submission",
        body: "We handle the App Store and Google Play submission process and stay on for the updates that follow.",
      },
    ],
    faqs: [
      {
        question: "Native or cross-platform — which do I need?",
        answer:
          "Most products don't need fully native development, and cross-platform gets you to both stores faster and cheaper without a real difference in feel. We'll tell you honestly if your app is one of the exceptions that does need native.",
      },
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes, from one codebase in almost every case, so you're not paying for two separate builds that drift apart over time.",
      },
      {
        question: "How long does an app take to build?",
        answer:
          "Depends heavily on scope — a focused utility app and a full platform with accounts, payments and offline sync are different timelines. You'll get a real one at the planning stage.",
      },
      {
        question: "Can the app work offline?",
        answer:
          "Where it matters, yes — core features can keep working without a connection and sync once one returns.",
      },
      {
        question: "Do you handle the App Store and Play Store submission?",
        answer:
          "Yes, listings, screenshots and the review process are part of the build, not a separate task left to you.",
      },
      {
        question: "What happens when iOS or Android update?",
        answer:
          "We stay on for support afterward — OS updates happen on their own schedule, and an app needs maintaining through them.",
      },
    ],
  },

  ecommerce: {
    slug: "ecommerce",
    tagline: "A storefront that closes the sale, not just displays it.",
    intro:
      "An online store has one job past looking good: turning a browse into a checkout. We build storefronts with real payments, configurable products and the operational backend behind them — the parts a template can't give you.",
    marquee: [
      "Storefronts",
      "Stripe Payments",
      "Product Configurators",
      "Checkout",
      "Inventory",
      "Subscriptions",
    ],
    statement: {
      lead: "Most carts get abandoned",
      emphasis: "before checkout even starts.",
      support:
        "A slow product page, a confusing size chart, a checkout that asks one question too many — each one is a sale walking away. We build the parts around the product as carefully as the product page itself.",
    },
    highlights: [
      {
        title: "Custom storefronts",
        body: "Built to your catalogue and brand, not a theme with your logo dropped on top.",
      },
      {
        title: "Real payment flows",
        body: "Stripe checkout, subscriptions and the post-purchase handling around both — live, not a demo integration.",
      },
      {
        title: "Product configurators",
        body: "Size, colour, made-to-measure — pricing and previews that update as a customer chooses, not a static dropdown.",
      },
      {
        title: "Inventory that stays honest",
        body: "Stock levels that reflect reality, so a sold-out product doesn't get sold anyway.",
      },
      {
        title: "Fast, mobile checkout",
        body: "The step most stores get wrong. We build it to be finished in under a minute on a phone.",
      },
      {
        title: "Handover you can run",
        body: "An admin area for orders, products and content, so day-to-day running doesn't need to come back through us.",
      },
    ],
    process: [
      {
        title: "Kick-off",
        body: "What you sell, who buys it, and what's actually slowing the current checkout down, if there is one.",
      },
      {
        title: "Choosing the platform",
        body: "Custom-built or an established commerce platform underneath — we recommend based on your catalogue's complexity, not a default answer.",
      },
      {
        title: "The project team",
        body: "Assembled around this store's specific needs — payments, configurators, inventory — rather than a generic template team.",
      },
      {
        title: "Audience & user flows",
        body: "Mapping the real path from product page to confirmed order, and removing every step that isn't earning its place.",
      },
      {
        title: "UI/UX design",
        body: "Product pages and checkout designed to sell, with your brand fully applied — not a skin over someone else's layout.",
      },
      {
        title: "Development",
        body: "Catalogue, checkout and payments built and connected — this is where a store goes from mockup to something you can actually sell through.",
      },
      {
        title: "Quality control",
        body: "Every checkout path tested with real payment flows before launch, not just the happy path.",
      },
      {
        title: "Launch & support",
        body: "The store goes live, gets verified end-to-end on real devices, and stays supported once orders start coming in.",
      },
    ],
    // Stripe is verified against a real client project (NeuroHolistic, in
    // content/projects/index.ts); the rest of the stack is this site's own.
    technologies: [
      {
        name: "Next.js",
        category: "Framework",
        body: "Our default for storefronts. Product pages render fast, which matters directly to conversion, not just to feel.",
      },
      {
        name: "Stripe",
        category: "Payments",
        body: "Real payment flows — subscriptions, one-off checkout, and the post-purchase handling around both. Live on client sites today.",
      },
      {
        name: "React",
        category: "Interface",
        body: "Configurators and cart interactions that update instantly as a customer chooses, not on a page reload.",
      },
      {
        name: "TypeScript",
        category: "Language",
        body: "Typed code around pricing and checkout logic, where a silent bug costs a sale, not just a bug report.",
      },
      {
        name: "Headless CMS",
        category: "Content",
        body: "Products and content managed independently of the storefront's design, so a catalogue update doesn't need a developer.",
      },
    ],
    faqs: [
      {
        question: "Do you build on Shopify or from scratch?",
        answer:
          "Both, depending on the catalogue — a straightforward store often doesn't need a fully custom build, a complex configurator usually does. We'll recommend honestly, not default to whichever we'd rather build.",
      },
      {
        question: "Can you handle subscriptions, not just one-off purchases?",
        answer:
          "Yes — Stripe handles both, and we've built real subscription and one-off checkout flows on client sites.",
      },
      {
        question: "What about product configurators — size, colour, made-to-measure?",
        answer:
          "That's some of our most-repeated ecommerce work — pricing and previews that update live as a customer builds their order.",
      },
      {
        question: "How do you handle inventory?",
        answer:
          "Stock levels stay in sync with what's actually available, so a sold-out item can't be sold again by mistake.",
      },
      {
        question: "Can I manage products myself after launch?",
        answer:
          "Yes — you get an admin area for products, orders and content, with a walkthrough so it doesn't need to come back through us.",
      },
      {
        question: "Is the checkout mobile-friendly?",
        answer:
          "It's designed mobile-first, not adapted afterward — most of your buyers will be checking out on a phone.",
      },
    ],
  },

  platforms: {
    slug: "platforms",
    tagline: "The system your spreadsheets stopped being able to run.",
    intro:
      "Order management, CRM, admin tools — the software that carries a business's daily operations, built around how you actually work rather than bent to fit an off-the-shelf tool. If a process still lives in a spreadsheet passed around by email, this is what replaces it.",
    marquee: [
      "Web Apps",
      "SaaS",
      "CRM",
      "Admin Tools",
      "Automation",
      "Dashboards",
    ],
    statement: {
      lead: "A spreadsheet is a system",
      emphasis: "until three people are editing it.",
      support:
        "That's the moment it starts costing more time than it saves — version conflicts, no audit trail, no permissions. A real platform gives everyone one source of truth instead.",
    },
    highlights: [
      {
        title: "Order & inventory systems",
        body: "Multi-customer catalogues, order tracking and invoicing that hold real business volume, not a demo's worth of test data.",
      },
      {
        title: "CRM & sales tools",
        body: "Lead capture, enquiry tracking and handover across a distributed sales team, in one place instead of scattered across inboxes.",
      },
      {
        title: "Admin & CMS backends",
        body: "Content and operational tools built for the people who'll use them daily, not just the developer who built them.",
      },
      {
        title: "Role-based access",
        body: "Everyone sees what they need to and nothing they don't, from day one.",
      },
      {
        title: "AI-assisted workflows",
        body: "Automation and predictive features wired in where they remove real work, not bolted on for the sake of it.",
      },
      {
        title: "Built to keep growing",
        body: "Architecture that takes a second feature and a third without a rewrite each time.",
      },
    ],
    process: [
      {
        title: "Kick-off",
        body: "The actual process this platform replaces, and where it currently breaks down — that's the real brief, more than a feature list.",
      },
      {
        title: "Defining the architecture",
        body: "How data, users and permissions are structured underneath, decided before any interface work starts.",
      },
      {
        title: "The project team",
        body: "Assembled around this system's real complexity — backend, frontend, sometimes integrations — not a fixed generic pair.",
      },
      {
        title: "Planning & timelines",
        body: "A schedule that reflects a working system's real complexity, with the biggest technical risks addressed first.",
      },
      {
        title: "Audience & user flows",
        body: "Different users need different things from the same system. We map each role's actual daily task, not just an admin's-eye view.",
      },
      {
        title: "UI/UX design",
        body: "Interfaces built for repeated daily use, where clarity and speed matter more than a first impression.",
      },
      {
        title: "Development",
        body: "Built with the data model and permissions as load-bearing decisions, not an afterthought once the interface looks right.",
      },
      {
        title: "Quality control",
        body: "Tested against real operational scenarios — concurrent users, edge-case data — not just a clean demo path.",
      },
      {
        title: "Launch & support",
        body: "Live, with the team using it from day one, and support in place for the inevitable process that changes six months in.",
      },
    ],
    // Verified against real projects: Hyde Park Wood, Taldo, Saabri and
    // Cloak (all "platforms" category in content/projects/index.ts).
    technologies: [
      {
        name: "Next.js",
        category: "Framework",
        body: "Our default framework for platform frontends — fast, and straightforward to extend as the system grows past its first version.",
      },
      {
        name: "React",
        category: "Interface",
        body: "Interfaces built from reusable components, so a new feature doesn't mean rebuilding the ones next to it.",
      },
      {
        name: "TypeScript",
        category: "Language",
        body: "Typed code around the data a business actually runs on — orders, records, permissions — where a silent bug is expensive.",
      },
      {
        name: "Tailwind CSS",
        category: "Styling",
        body: "A consistent interface system across every screen, so the tenth admin page looks like it belongs with the first.",
      },
      {
        name: "AI integration",
        category: "Automation",
        body: "Assistants and predictive features wired into a platform where they remove real work — the same approach behind our AI-assisted builds.",
      },
    ],
    faqs: [
      {
        question: "We're running the business on spreadsheets right now — is that normal to start from?",
        answer:
          "It's the single most common starting point we see. It's usually the clearest sign a real system will pay for itself quickly.",
      },
      {
        question: "Can this replace our CRM, not just add to it?",
        answer:
          "Yes, if that's what makes sense — we build to replace a broken tool, not just sit alongside it.",
      },
      {
        question: "How do you handle different user roles and permissions?",
        answer:
          "Mapped out during planning, before any interface work starts, so access control is a structural decision, not a setting added later.",
      },
      {
        question: "Can the system grow as our process changes?",
        answer:
          "That's a core design goal, not an afterthought — the architecture is built to take a second and third feature without a rewrite.",
      },
      {
        question: "Do you build integrations with tools we already use?",
        answer:
          "Where it makes sense, yes — the platform doesn't have to replace everything at once to be worth building.",
      },
      {
        question: "What does support look like after launch?",
        answer:
          "Ongoing — operational software keeps changing as the business does, and we stay on for that.",
      },
    ],
  },

  ai: {
    slug: "ai",
    tagline: "AI that removes real work, not a chatbot for its own sake.",
    intro:
      "Most businesses are experimenting with AI tools without a clear plan for where they actually help. We start with the audit, not the technology — finding the specific, repeatable work worth automating, then building the system that does it.",
    marquee: [
      "AI Audit",
      "Automation",
      "Predictive Systems",
      "Connected Sensors",
      "Assistants",
      "Workflow Automation",
    ],
    statement: {
      lead: "AI curiosity is everywhere.",
      emphasis: "Working AI systems are rare.",
      support:
        "The gap isn't the technology — it's execution. We bridge it: an honest audit of where AI actually helps your business, then a system built and shipped, not a slide deck.",
    },
    highlights: [
      {
        title: "AI audits",
        body: "An honest look at your actual workflows and data to find where AI creates real impact — not a sales pitch for a specific tool.",
      },
      {
        title: "Conversational interfaces",
        body: "Booking, support and enquiry handling that talks back intelligently, verified live on a real client platform.",
      },
      {
        title: "Predictive scheduling",
        body: "Systems that anticipate what needs attention next, rather than waiting for someone to notice a problem.",
      },
      {
        title: "Connected-sensor monitoring",
        body: "IoT data feeding directly into a platform's decisions, not sitting in a dashboard nobody checks.",
      },
      {
        title: "Workflow automation",
        body: "The repetitive parts of a process handled automatically, freeing people for the parts that actually need judgement.",
      },
      {
        title: "Ongoing optimisation",
        body: "Models and automations get monitored and refined after launch, not shipped once and left.",
      },
    ],
    process: [
      {
        title: "AI audit & roadmap",
        body: "We look at your real workflows, data and priorities to find where AI actually creates value, and give you a practical roadmap, not a hype deck.",
      },
      {
        title: "The project team",
        body: "Engineers who've shipped a real AI-assisted platform, not a generic team assigned the label.",
      },
      {
        title: "AI implementation",
        body: "Design and build of the actual system — from architecture through launch — against the roadmap agreed upfront.",
      },
      {
        title: "Quality control",
        body: "Tested against real scenarios and edge cases before it's making decisions that affect a live business.",
      },
      {
        title: "AI retainer & optimisation",
        body: "Ongoing monitoring and refinement, since a model's usefulness doesn't stay fixed the moment it ships.",
      },
    ],
    // Verified against FixNex, our one real AI-category project (see
    // content/projects/index.ts) — kept general rather than naming
    // unverified model providers.
    technologies: [
      {
        name: "AI integration",
        category: "Automation",
        body: "Assistants and automated flows wired into a platform where they remove real work — the approach behind our AI-assisted property maintenance build.",
      },
      {
        name: "Conversational interfaces",
        category: "Interaction",
        body: "Booking and support flows that handle real enquiries, not a scripted demo bot.",
      },
      {
        name: "Predictive systems",
        category: "Automation",
        body: "Scheduling and monitoring that anticipate what needs attention, verified live on a real client platform.",
      },
      {
        name: "IoT & connected sensors",
        category: "Integration",
        body: "Sensor data feeding directly into a platform's own decisions, not a separate dashboard nobody checks.",
      },
    ],
    faqs: [
      {
        question: "We don't know where AI would even help us — is that normal?",
        answer:
          "It's the most common starting point. The audit exists specifically for that — we look at your actual workflows and tell you honestly where it does and doesn't help.",
      },
      {
        question: "Is this a chatbot, or something more substantial?",
        answer:
          "Depends what your business actually needs — sometimes it's a conversational interface, sometimes it's predictive scheduling or sensor-driven automation with no chat involved at all.",
      },
      {
        question: "Do you build custom AI systems or just plug in existing tools?",
        answer:
          "Both, depending on the case — sometimes an existing model integrated well is the right answer, sometimes it isn't. We recommend based on the actual problem.",
      },
      {
        question: "How do you handle data privacy?",
        answer:
          "Built into the architecture from the start, not addressed after the fact — this matters especially for anything handling real customer or operational data.",
      },
      {
        question: "What happens after the system launches?",
        answer:
          "Ongoing monitoring and refinement — a model's usefulness drifts over time, and the retainer exists to keep it tuned.",
      },
      {
        question: "Do you have real AI work you can point to?",
        answer:
          "Yes — a live AI-assisted property maintenance platform with conversational booking, predictive scheduling and connected-sensor monitoring, not a demo.",
      },
    ],
  },

  brand: {
    slug: "brand",
    tagline: "An identity people recognise before they read a word.",
    intro:
      "Interface systems and brand identities designed to make a product legible, usable and worth trusting — the visual language everything else on this list gets built inside of.",
    marquee: [
      "Identity",
      "Design Systems",
      "UI Kits",
      "Brand Strategy",
      "Typography",
      "Visual Language",
    ],
    statement: {
      lead: "A logo isn't a brand.",
      emphasis: "A system that holds together is.",
      support:
        "Colour, type, spacing, tone — applied consistently across every screen and touchpoint, so a product reads as one coherent thing instead of a collection of one-off decisions.",
    },
    highlights: [
      {
        title: "Brand strategy",
        body: "Clarifying what a business actually stands for before a single pixel gets designed, so the identity has something real to express.",
      },
      {
        title: "Visual identity",
        body: "Logo, colour, typography — a system, not a one-off mark that falls apart the moment it's applied somewhere new.",
      },
      {
        title: "Design systems",
        body: "Reusable components and rules that keep a product consistent as new screens and features get added.",
      },
      {
        title: "Interface design",
        body: "Legible, usable interfaces built on the identity, not a decorative layer applied after the structure's already decided.",
      },
      {
        title: "Brand guidelines",
        body: "Documented rules a team can actually follow, so the identity survives being handed off.",
      },
      {
        title: "Applied across touchpoints",
        body: "The same system carried consistently from the website through to product interfaces and beyond.",
      },
    ],
    process: [
      {
        title: "Kick-off",
        body: "What the business actually stands for, who it's for, and where the current identity — if there is one — isn't working.",
      },
      {
        title: "Brand strategy",
        body: "Positioning and tone defined before any visual work starts, so design decisions have something real to point back to.",
      },
      {
        title: "Visual identity",
        body: "Logo, colour and typography developed and tested against real applications, not judged in isolation.",
      },
      {
        title: "Design system",
        body: "Components and rules that keep every future screen consistent with the first one.",
      },
      {
        title: "UI/UX design",
        body: "The identity carried into real interfaces — legible, usable, and recognisably yours.",
      },
      {
        title: "Application & handover",
        body: "Guidelines and assets handed over in a form a team can actually use, not a PDF nobody opens again.",
      },
      {
        title: "Quality control",
        body: "Checked for consistency across every touchpoint before anything ships as finished.",
      },
    ],
    faqs: [
      {
        question: "Do we need a full rebrand, or just a refresh?",
        answer:
          "Often just a refresh — we'll tell you honestly which one your identity actually needs rather than defaulting to the bigger, more expensive option.",
      },
      {
        question: "Do you design logos on their own?",
        answer:
          "We can, but a logo in isolation is rarely the real problem — it's usually part of a wider system that isn't holding together, and that's what we'd rather fix properly.",
      },
      {
        question: "What do we actually receive at the end?",
        answer:
          "A full identity system with usable guidelines and assets — not just a logo file and a colour code.",
      },
      {
        question: "Can you apply an existing brand to a new product instead of starting from scratch?",
        answer:
          "Yes — a lot of this work is extending an identity you already trust into a new interface, not replacing it.",
      },
      {
        question: "How long does a brand identity project take?",
        answer:
          "Depends on scope — a focused visual refresh and a full strategy-through-system rebuild are different timelines, confirmed at the planning stage.",
      },
      {
        question: "Does this include the website or app design too?",
        answer:
          "It can — brand and interface work overlap heavily, and we're set up to carry one straight into the other.",
      },
    ],
  },

  seo: {
    slug: "seo",
    tagline: "Found by the people already searching for you.",
    intro:
      "Technical SEO, content structure and campaigns that compound organic demand over time. Ranking isn't a checkbox at the end of a project — it's a foundation decision made from the first line of markup.",
    marquee: [
      "Technical SEO",
      "Content Structure",
      "Core Web Vitals",
      "Search Visibility",
      "Site Structure",
      "Organic Growth",
    ],
    statement: {
      lead: "People are already searching",
      emphasis: "for what you do.",
      support:
        "The question is whether they find you or a competitor. SEO isn't a separate campaign bolted on afterward — it's markup, structure and content decisions made correctly the first time.",
    },
    highlights: [
      {
        title: "Technical audits",
        body: "A full review of what's actually stopping a site from ranking — not a generic checklist run without context.",
      },
      {
        title: "Site structure",
        body: "Clean markup, real headings and a sitemap search engines can actually read, not just a page that looks right to a visitor.",
      },
      {
        title: "Core Web Vitals",
        body: "Page speed and stability tuned to what search engines measure directly, not guessed at.",
      },
      {
        title: "Content strategy",
        body: "Structured around genuine search intent, not keyword-stuffed for its own sake.",
      },
      {
        title: "Local & regional visibility",
        body: "Set up to rank for the markets a business actually serves, not just a generic global reach.",
      },
      {
        title: "Ongoing reporting",
        body: "Clear, regular reporting on what's actually moving, not a vanity dashboard nobody reads.",
      },
    ],
    process: [
      {
        title: "Kick-off",
        body: "Business goals, target audience and the markets that actually matter, so every recommendation ties back to a real priority.",
      },
      {
        title: "Audit & strategy",
        body: "A full technical and content review, benchmarked against real competitors, prioritised for impact rather than treated as a flat checklist.",
      },
      {
        title: "Implementation",
        body: "Technical fixes, on-page optimisation and structural changes made directly, not just recommended in a report.",
      },
      {
        title: "Quality control",
        body: "Changes verified against real search console and analytics data before being called done.",
      },
      {
        title: "SEO reporting",
        body: "Regular, plain-language reporting on what's actually moving and why, not a dashboard full of numbers with no story.",
      },
    ],
    faqs: [
      {
        question: "How long until we see SEO results?",
        answer:
          "Technical fixes can show up within weeks; competitive rankings take longer. We'll give you a realistic timeline rather than a number that sounds good in a pitch.",
      },
      {
        question: "Is this a one-off project or ongoing?",
        answer:
          "SEO compounds over time, so it works best as ongoing work — but the technical foundation itself is a real, finite piece of work with a clear endpoint.",
      },
      {
        question: "Do you write the content too, or just the technical side?",
        answer:
          "Both, depending on what's needed — technical SEO without content structure only solves half the problem.",
      },
      {
        question: "Can you fix an existing site, or does it need rebuilding?",
        answer:
          "Usually fixed, not rebuilt — most SEO problems are structural and technical, addressable without starting over.",
      },
      {
        question: "How do you report progress?",
        answer:
          "Regular, plain-language updates on what's actually changing, not a dashboard full of numbers with no explanation behind them.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No — nobody honestly can, since search engines don't publish their algorithms. What we can guarantee is a technically sound foundation and a clear strategy behind it.",
      },
    ],
  },

  cloud: {
    slug: "cloud",
    tagline: "Live, fast, and someone's actually watching it.",
    intro:
      "Deployment, monitoring and maintenance that keep what we build fast and online. A site that's slow to deploy or silent when it breaks costs trust the moment it happens — this is the part that stops that.",
    marquee: [
      "Deployment",
      "Monitoring",
      "SSL & Domains",
      "Uptime",
      "Edge Hosting",
      "Support",
    ],
    statement: {
      lead: "A site that's slow to fix",
      emphasis: "is a site that's already losing.",
      support:
        "Downtime and slow deploys cost trust the moment they happen, not eventually. Hosting and monitoring done properly is what makes that a rare event instead of a routine one.",
    },
    highlights: [
      {
        title: "Fast, reliable deployment",
        body: "Every change ships through a real deployment pipeline with a preview link, not a manual upload and a hope.",
      },
      {
        title: "SSL & domain setup",
        body: "Certificates and DNS configured correctly from the start, not left as a loose end after launch.",
      },
      {
        title: "Uptime monitoring",
        body: "Real alerts when something breaks, not silence until a visitor tells you first.",
      },
      {
        title: "Global edge delivery",
        body: "Pages served from close to the visitor, wherever they are, not one server on the other side of the world.",
      },
      {
        title: "Regular backups",
        body: "A real point to roll back to if something goes wrong, checked, not assumed.",
      },
      {
        title: "Ongoing maintenance",
        body: "Dependencies and platforms updated as they age, rather than left until something quietly breaks.",
      },
    ],
    process: [
      {
        title: "Server requirements",
        body: "Understanding what the site actually needs — traffic patterns, uptime expectations, regions that matter — before choosing infrastructure.",
      },
      {
        title: "Environment testing",
        body: "Pre-launch checks for load, security and real-world conditions, not just a clean local demo.",
      },
      {
        title: "Website deployment",
        body: "DNS, SSL and the deployment pipeline set up and verified end-to-end before anything goes live.",
      },
      {
        title: "Hosting reporting",
        body: "Ongoing visibility into traffic, performance and any incidents, so nothing goes unnoticed.",
      },
    ],
    // Every real project URL in content/projects/index.ts is Vercel-hosted —
    // this is genuinely verifiable infrastructure, unlike a specific
    // AWS/Azure/Cloudflare claim we have no project evidence for.
    technologies: [
      {
        name: "Vercel",
        category: "Hosting",
        body: "Global edge deployment with a preview link on every change — live on our own client projects today, not just a claim.",
      },
      {
        name: "SSL & DNS",
        category: "Infrastructure",
        body: "Certificates and domain configuration handled correctly from day one, not left as an afterthought.",
      },
    ],
    faqs: [
      {
        question: "Do you host the sites you build, or hand that off?",
        answer:
          "We can do either — host and monitor it ourselves, or hand over a properly configured setup if you'd rather manage it in-house.",
      },
      {
        question: "What happens if the site goes down?",
        answer:
          "Monitoring alerts us directly rather than waiting for a visitor to notice first, and we act on it.",
      },
      {
        question: "Can you take over hosting for a site someone else built?",
        answer:
          "Often, yes — depends on how it's currently built, but migrating hosting doesn't usually require touching the site itself.",
      },
      {
        question: "Do you handle SSL certificates and domains?",
        answer:
          "Yes, as part of setup — not left for you to configure separately after launch.",
      },
      {
        question: "How fast will the site load?",
        answer:
          "Served from the edge close to your visitor rather than one distant server, which is most of what determines real-world load time.",
      },
      {
        question: "What does ongoing maintenance actually involve?",
        answer:
          "Keeping dependencies and the platform itself up to date, so nothing quietly breaks from neglect months after launch.",
      },
    ],
  },

  consulting: {
    slug: "consulting",
    tagline: "Direction before commitment, from people who'll build it.",
    intro:
      "Roadmapping and technical direction for teams deciding what to build before they build it. Not generic strategy slides — a scoped plan from the people who'd actually be doing the work if you go ahead.",
    marquee: [
      "Strategy",
      "Roadmapping",
      "Technical Direction",
      "Audits",
      "Scoping",
      "Process Digitisation",
    ],
    statement: {
      lead: "The most expensive mistake",
      emphasis: "is building the wrong thing well.",
      support:
        "A polished product built against the wrong plan still fails. Getting the direction right first is cheaper than any amount of fixing it costs afterward.",
    },
    highlights: [
      {
        title: "Discovery workshops",
        body: "Structured sessions to surface the real goals and constraints behind a project, not just the brief as first written.",
      },
      {
        title: "Stakeholder alignment",
        body: "Getting decision-makers and end-users to a shared understanding before anything gets built against assumptions.",
      },
      {
        title: "Digital audits",
        body: "An honest review of an existing site or app's design, speed, security and SEO, with specific fixes, not vague praise.",
      },
      {
        title: "Process digitisation",
        body: "Finding the manual tasks worth automating, and the ones that genuinely aren't.",
      },
      {
        title: "Technical roadmaps",
        body: "A practical sequence of what to build first and why, not a wish list with no order to it.",
      },
      {
        title: "Scoped specifications",
        body: "A brief detailed enough to price and build against confidently, whoever ends up building it.",
      },
    ],
    process: [
      {
        title: "Understanding business needs",
        body: "Deep, direct analysis of the real goals and constraints behind the request — the actual starting point, not the brief as first written.",
      },
      {
        title: "Aligning stakeholders",
        body: "Bringing decision-makers and end-users to one shared understanding, so the plan doesn't unravel the first time it's questioned internally.",
      },
      {
        title: "Digitising processes",
        body: "Identifying which manual tasks are genuinely worth automating, and which aren't — not automation as a default answer.",
      },
      {
        title: "Finding digital opportunities",
        body: "Spotting where technology can meaningfully improve a process, not chasing a trend for its own sake.",
      },
      {
        title: "Defining the roadmap",
        body: "A scoped, sequenced plan detailed enough to price and build against, whether that build happens with us or elsewhere.",
      },
    ],
    faqs: [
      {
        question: "Do we have to build with you afterward?",
        answer:
          "No — the output is a plan detailed enough to hand to any team, ours or otherwise. We'd like to build it, but the advice isn't conditional on that.",
      },
      {
        question: "We already have a website or app — can you audit it instead of starting from zero?",
        answer:
          "Yes — an honest review of what's actually holding it back, with specific fixes rather than vague praise.",
      },
      {
        question: "How long does a consulting engagement take?",
        answer:
          "Usually shorter than a build — often a focused set of workshops and a written roadmap, timeline confirmed at the outset.",
      },
      {
        question: "What do we actually receive at the end?",
        answer:
          "A scoped, sequenced roadmap or specification — something concrete enough to price and build against, not a slide deck of generic advice.",
      },
      {
        question: "Is this useful if we're not sure what we need yet?",
        answer:
          "That's exactly the situation it's built for — the discovery workshop exists specifically to turn an unclear starting point into a real plan.",
      },
      {
        question: "Do you help us choose between building in-house or hiring an agency?",
        answer:
          "Yes, honestly — including telling you if the answer is neither yet, and what needs deciding first.",
      },
    ],
  },

  video: {
    slug: "video",
    tagline: "A story people actually feel, not just watch.",
    intro:
      "Product, brand and campaign film built to sit inside the same launch as a site — planned, shot and edited with the same attention to the audience that the rest of the work gets.",
    marquee: [
      "Brand Film",
      "Product Video",
      "Campaign Content",
      "Editing",
      "Storytelling",
      "Post-Production",
    ],
    statement: {
      lead: "Nobody remembers a feature list.",
      emphasis: "They remember how something felt.",
      support:
        "A well-told story does more to build trust in a few minutes than a page of specifications does in ten. That's the case for film sitting inside the same launch as everything else.",
    },
    highlights: [
      {
        title: "Brand & product film",
        body: "Films built around a genuine story, not a feature list read out over stock footage.",
      },
      {
        title: "Campaign content",
        body: "Shot and cut to work across the specific platforms a campaign actually runs on.",
      },
      {
        title: "Interview & narrative direction",
        body: "Getting a real, honest moment on camera instead of a rehearsed pitch.",
      },
      {
        title: "Location & production planning",
        body: "Scheduling and logistics handled properly, so the shoot day is spent creating, not solving problems.",
      },
      {
        title: "Colour & post-production",
        body: "Grading and edit decisions that match the tone of the brand it's for, not a generic preset.",
      },
      {
        title: "Built into the launch",
        body: "Timed to sit inside a site or campaign launch, not delivered as an afterthought once everything else is already live.",
      },
    ],
    process: [
      {
        title: "Kick-off & narrative",
        body: "Finding the real story and the person carrying it — genres, references, and what this film actually needs to achieve.",
      },
      {
        title: "Planning & scheduling",
        body: "Locations, interviews, shoot days and a loose script, planned tightly enough to run smoothly and loosely enough to catch what wasn't planned.",
      },
      {
        title: "Creative approach",
        body: "Built on honesty in front of the camera — a genuine, slightly vulnerable moment reads as trust to whoever's watching, not a polished pitch.",
      },
      {
        title: "Filming",
        body: "Shot with intent despite what a real shoot day throws at you — conditions change, the story doesn't.",
      },
      {
        title: "Editing & quality control",
        body: "Raw footage shaped into a finished story — colour, pacing and sound tightened until it matches the brand it's for.",
      },
    ],
    faqs: [
      {
        question: "What kind of video do you produce?",
        answer:
          "Brand and product film, and campaign content — built around a real story, not a generic corporate reel.",
      },
      {
        question: "Can this be planned to launch alongside a new website?",
        answer:
          "Yes — that's often exactly the point, a film built into the same launch rather than delivered separately afterward.",
      },
      {
        question: "Do we need a script beforehand?",
        answer:
          "Not a rigid one — we work from a loose narrative plan, since the strongest moments are usually the ones that weren't scripted.",
      },
      {
        question: "How long does production take?",
        answer:
          "Depends on scope — a single product film and a multi-location campaign are different timelines, confirmed during planning.",
      },
      {
        question: "Do you handle editing and colour grading too?",
        answer:
          "Yes — post-production is part of the process, not handed off separately.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes — the film is built to match an existing identity's tone, not to introduce a new one.",
      },
    ],
  },
};
