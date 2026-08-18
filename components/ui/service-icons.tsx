/**
 * Line-icon set for the service detail pages.
 *
 * Drawn in one shared 24px grid at a single stroke weight so the process
 * steps, the "what's included" grid and anything added later read as one
 * family rather than a pile of icons from different packs. Matches the
 * existing `Arrow` glyph in shell.tsx (same viewBox, round caps/joins), so
 * nothing here introduces a second illustration style to the site.
 *
 * Keyed lookup rather than named exports at the call site: content lives in
 * content/services/details.ts and shouldn't have to import components to
 * pick an icon, so sections resolve by the step/highlight title instead.
 * `getServiceIcon` falls back to a neutral glyph, so adding a content entry
 * without a matching icon degrades quietly instead of crashing.
 */

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export type IconProps = { className?: string };

/* --- Shared glyphs --------------------------------------------------- */

const Search = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M19.5 19.5 15 15" />
  </Frame>
);

const Building = (p: IconProps) => (
  <Frame {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V6l7-3v18" />
    <path d="M12 21V10l7 2v9" />
    <path d="M8 9h1M8 13h1M8 17h1M15.5 15h1M15.5 18h1" />
  </Frame>
);

const Calendar = (p: IconProps) => (
  <Frame {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <path d="M8 15h3" />
  </Frame>
);

const Bolt = (p: IconProps) => (
  <Frame {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </Frame>
);

const Graph = (p: IconProps) => (
  <Frame {...p}>
    <path d="M3 21h18" />
    <path d="M6 21v-6M11 21V9M16 21v-9M21 21V5" />
  </Frame>
);

const Key = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="7.5" cy="16.5" r="3.5" />
    <path d="M10 14 21 3M18 6l2.5 2.5M15 9l2.5 2.5" />
  </Frame>
);

const Flag = (p: IconProps) => (
  <Frame {...p}>
    <path d="M5 22V3" />
    <path d="M5 4h11l-2 4 2 4H5" />
  </Frame>
);

const Team = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 6.4" />
    <path d="M17.5 14.5A6 6 0 0 1 21 20" />
  </Frame>
);

const Flow = (p: IconProps) => (
  <Frame {...p}>
    <rect x="2.5" y="3" width="7" height="5" rx="1" />
    <rect x="14.5" y="16" width="7" height="5" rx="1" />
    <path d="M6 8v6a2 2 0 0 0 2 2h6.5" />
    <path d="M12 10.5h6a2 2 0 0 1 2 2V16" />
  </Frame>
);

const Layout = (p: IconProps) => (
  <Frame {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 9v12" />
  </Frame>
);

const Pen = (p: IconProps) => (
  <Frame {...p}>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    <path d="M14.5 5.5l3 3" />
  </Frame>
);

const Cursor = (p: IconProps) => (
  <Frame {...p}>
    <path d="M5 3l6.5 17 2.5-7 7-2.5Z" />
  </Frame>
);

const Code = (p: IconProps) => (
  <Frame {...p}>
    <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" />
  </Frame>
);

const Shield = (p: IconProps) => (
  <Frame {...p}>
    <path d="M12 2.5 4.5 6v6c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6Z" />
    <path d="m9 12 2 2 4-4" />
  </Frame>
);

const Send = (p: IconProps) => (
  <Frame {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4Z" />
  </Frame>
);

const Dot = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="12" cy="12" r="8" />
  </Frame>
);

const Stack = (p: IconProps) => (
  <Frame {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Frame>
);

const Server = (p: IconProps) => (
  <Frame {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <path d="M7 7h.01M7 17h.01" />
  </Frame>
);

const Compass = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-2 6-6 2 2-6 6-2Z" />
  </Frame>
);

const Gauge = (p: IconProps) => (
  <Frame {...p}>
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15 15.5 9.5" />
    <path d="M4 19h16" />
  </Frame>
);

const Gear = (p: IconProps) => (
  <Frame {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
  </Frame>
);

const Camera = (p: IconProps) => (
  <Frame {...p}>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </Frame>
);

const Clapperboard = (p: IconProps) => (
  <Frame {...p}>
    <path d="M4 9.5 5.5 4h13l1.5 5.5" />
    <path d="M4 9.5h16V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5Z" />
    <path d="m8 4 1.5 5.5M13 4l1.5 5.5" />
  </Frame>
);

/**
 * Title (lowercased) -> glyph. Keys match the `title` values in
 * content/services/details.ts.
 */
const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  // "What's included"
  "marketing & brand sites": Flag,
  "property & real-estate portals": Building,
  "booking & enquiry-led sites": Calendar,
  "performance-first builds": Bolt,
  "seo-ready structure": Graph,
  "handover you can actually use": Key,

  // "How we work" — shared across every service page, reused wherever the
  // underlying step genuinely is the same one, so the icon set doesn't grow
  // one-for-one with the number of services.
  "kick-off": Flag,
  "the project team": Team,
  "planning & timelines": Calendar,
  "audience & user flows": Flow,
  "sitemap & wireframes": Layout,
  "ui/ux design": Pen,
  prototype: Cursor,
  development: Code,
  "quality control": Shield,
  "launch & support": Send,

  // Retained from the earlier four-step process content, so an older
  // content shape still resolves to something sensible.
  discover: Search,
  design: Pen,
  build: Code,
  launch: Send,

  // Mobile / e-commerce / platforms
  "choosing the framework": Stack,
  "choosing the platform": Stack,
  "defining the architecture": Stack,
  "launch & store submission": Send,

  // AI
  "ai audit & roadmap": Compass,
  "ai implementation": Code,
  "ai retainer & optimisation": Gauge,

  // SEO
  "audit & strategy": Search,
  implementation: Code,
  "seo reporting": Graph,

  // Cloud / hosting
  "server requirements": Server,
  "environment testing": Shield,
  "website deployment": Send,
  "hosting reporting": Graph,

  // Consulting
  "understanding business needs": Search,
  "aligning stakeholders": Team,
  "digitising processes": Gear,
  "finding digital opportunities": Compass,
  "defining the roadmap": Flag,

  // Video & film
  "kick-off & narrative": Flag,
  "planning & scheduling": Calendar,
  "creative approach": Clapperboard,
  filming: Camera,
  "editing & quality control": Shield,

  // Branding
  "brand strategy": Compass,
  "visual identity": Pen,
  "design system": Layout,
  "application & handover": Key,
};

export function getServiceIcon(title: string) {
  return ICONS[title.trim().toLowerCase()] ?? Dot;
}
