/**
 * Site-wide constants.
 *
 * TODO(client): confirm contact email, phone and office address before launch.
 * The values below are the only ones evidenced by existing material.
 */
export const site = {
  name: "Tech Monkeys",
  /** Wordmark: "TECHMONKEY" + accent full stop, per the design. */
  wordmark: "TECHMONKEYS",
  tagline: "Digital product partner",
  description:
    "Tech Monkeys is a Dubai digital studio building web platforms, commerce and software for startups, corporates and enterprises.",
  url: "https://techmonkey.space",
  location: "United Arab Emirates",
  email: "hello@techmonkey.space", // TODO(client): confirm
  github: "https://github.com/it-techmonkey",
} as const;

/**
 * Primary navigation. "Services" opens a dropdown listing all ten
 * services; the rest are section anchors.
 *
 * Hrefs are home-relative (`/#section`), not bare hashes — the site now has
 * subpages (`/services/[slug]`), and a bare `#section` href only resolves
 * against whatever route it's rendered on. `/#section` works identically on
 * `/` itself (same-document anchor scroll, no reload) and correctly
 * navigates back to the homepage section from anywhere else.
 */
export const nav = [
  { label: "Services", href: "/#capabilities", hasDropdown: true },
  { label: "Projects", href: "/#work" },
  { label: "About", href: "/#divisions" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Footer link list. Plain anchors, no dropdown. */
export const footerNav = [
  { label: "Services", href: "/#capabilities" },
  { label: "Projects", href: "/#work" },
  { label: "About", href: "/#divisions" },
  { label: "Contact", href: "/#contact" },
] as const;
