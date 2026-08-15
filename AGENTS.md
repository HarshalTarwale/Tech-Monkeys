<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Tech Monkeys

Dubai digital studio. Site being built from scratch to replace techmonkey.space.

**Primary goal: lead generation.** The mechanism is proof — showing real
projects, organised by client segment, so a prospect can see the work and
trust us with theirs. Every section serves that.

## Stack

- Next.js 16.3.1 (App Router, Turbopack default) · React 19.2 · TypeScript
- Tailwind v4 — CSS-first config via `@theme` in `app/globals.css`, no
  `tailwind.config.js`
- `next/font` (Inter, self-hosted) · Lenis smooth scroll
- React Compiler enabled (`reactCompiler: true`)

This Next.js version differs from training data. Read
`node_modules/next/dist/docs/` before writing framework code. Note the
generated route types (`LayoutProps<"/">`, `PageProps<"/route">`) — use them
rather than hand-written prop types.

## Structure

```
app/                  routes only, thin composition
components/ui/        primitives (button, tag, marquee)
components/sections/  page sections (hero, divisions, capabilities, work)
components/motion/    animation wrappers, cursor, transitions
content/              typed content: projects/, services/, site.ts, types.ts
lib/content.ts        the ONLY path components use to read content
docs/                 design tokens, homepage spec, verified inventory
```

Components import from `@/lib/content`, never from `content/` directly — the
publication gate lives in `lib/content.ts` and must not be bypassed.

## Content rules

1. **All copy is original.** Never lift a sentence from tentwenty.com, the
   base44 design reference, or any other site. Structure is borrowed; words
   are not.
2. **Never invent facts.** No fabricated clients, testimonials, headcount,
   awards, founding dates or metrics.
3. **A project publishes only when `status: "live"` AND `nameApproved: true`.**
   Both gates are enforced in `lib/content.ts`. Unapproved work stays in the
   content file but off the site.
4. Live URLs are verified before being added — see
   `docs/project-inventory-verified.md`.
5. Services listed are limited to those with real work behind them. An empty
   category costs more trust than a missing one.

## Design tokens

Measured from the approved design reference; see `docs/design/tokens.md`.
Light-first (confirmed with client): `--tm-bone` background, `--tm-ink` text,
`--tm-accent` (#3D5AFE) as the single electric accent.

Use the Tailwind aliases (`bg-bone`, `text-ink`, `text-accent`), not raw hex.

## Motion constraints — non-negotiable

- `prefers-reduced-motion: reduce` respected on every animation. Global CSS
  reset in `globals.css`; JS-driven motion must check the media query too.
- Mobile gets a reduced set: no custom cursor, no scroll-scrubbing, no 3D.
  Lenis is disabled on coarse pointers.
- **Animation never gates the LCP element.** Hero text renders server-side and
  animates after paint.
- Zero layout shift from reveals or marquees — animate `transform` and
  `opacity` only, never layout properties.
- Targets: Lighthouse mobile 90+ performance, 95+ accessibility, 95+ SEO.

## Conventions

- Server Components by default; `"use client"` only where interaction needs it
  (motion wrappers, filters).
- Section anchors match `nav` in `content/site.ts`.
- `TODO(client):` marks anything awaiting client input. Never fill one with a
  plausible guess.
