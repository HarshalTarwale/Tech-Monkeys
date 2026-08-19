/**
 * Contact-page content.
 *
 * `steps` describes the real process — send a brief, get a scoped reply,
 * work starts — without a specific turnaround promise. AGENTS.md rules out
 * inventing facts, and a number like "within 24 hours" isn't something this
 * repo can verify or commit the studio to, so it's deliberately absent.
 *
 * `faqs` are the questions a prospect actually has before sending a first
 * message. Answers state real policy (no account-manager layer, real NDAs
 * on request) rather than anything that needs a specific client to back it.
 */

export interface ContactStep {
  title: string;
  body: string;
}

export interface ContactFaq {
  question: string;
  answer: string;
}

export const contact = {
  eyebrow: "Get in touch",
  heading: { lead: "Tell us what", emphasis: "you're building." },
  intro:
    "One message is enough to start. Describe the project, and you'll hear back from the person who would actually build it — not a sales layer passing it along.",

  steps: [
    {
      title: "Send the brief",
      body: "Whatever you have — a page, a deck, a link to what exists today. Rough is fine; the questions come next.",
    },
    {
      title: "Get a scoped reply",
      body: "A straight answer on what it would take: approach, rough timeline, and cost. No call required to get that far.",
    },
    {
      title: "Work starts",
      body: "The people who scoped it are the people who build it, so nothing has to survive a handover to stay intact.",
    },
  ] as ContactStep[],

  faqs: [
    {
      question: "What should I include in the first message?",
      answer:
        "Whatever you have. A one-line description of what you're building, a link to an existing site if there is one, and a rough sense of timeline is enough to start a real conversation.",
    },
    {
      question: "Do you work with early-stage startups, or only established businesses?",
      answer:
        "Both. The studio has built for first-time founders launching their first product and for businesses running the systems they operate on day to day.",
    },
    {
      question: "Can you take over a project someone else started?",
      answer:
        "Yes — send what exists (repo, credentials, current host) and we'll give you a straight read on its condition before quoting anything.",
    },
    {
      question: "Will I be dealing with an account manager?",
      answer:
        "No. The person who scopes your project is the person who builds it, throughout — that's a deliberate way of working, not a temporary team size.",
    },
    {
      question: "Do you sign NDAs?",
      answer:
        "Yes, on request, before any specifics are discussed.",
    },
  ] as ContactFaq[],
} as const;
