# Homepage spec

**Status: built.** All five sections implemented in `components/sections/`.
Verified in Chromium at 1440px and 390px — no console errors, no horizontal
overflow, reduced-motion path confirmed.

Section order, the job each does, and where its content comes from.

**Structure** follows the approved design reference
(tech-monkey-logic.base44.app). **Content** is adapted from the sections
tentwenty.com uses — rewritten for Tech Monkeys, never lifted.

## Architecture decision

The design reference and tentwenty organise a page differently:

| | tentwenty | Design reference | We build |
|---|---|---|---|
| Nav | Services, Work, About, News, Enquiry | Divisions, Capabilities, Ledger, Contact | **Services, Projects, About, Contact** + Get in touch |
| Organising idea | Services, then case studies | Three divisions by client scale | **Divisions** |
| Work | Case-study cards | Cards per division + a ledger table | **Both** |

The design's three divisions map exactly onto the three client segments in
the brief (startups / corporates / enterprises), so we keep the design's
architecture and use tentwenty only as a reference for *what a section says*.

"Ledger" is renamed **Work** in the nav — clearer to a prospect, same section.

## Sections

### 1. Hero (`#top`)
Says who Tech Monkeys are and who they serve, in one screen.

- Mono eyebrow: positioning + region
- Display headline, `font-black`, tracking `-.045em`, `12vw` / `md:8vw`
- The final word is a segment name on an accent block, cycling
  startups → corporates → enterprises (`tm-pop`, `.4s`)
- Two CTAs: primary (ink pill → accent on hover), secondary (outline)
- **LCP element. Text renders server-side; motion attaches after.**

### 2. Divisions (`#divisions`)
The core of the page. One block per segment, alternating sides.

- Section head: eyebrow `01 / …`, two-line h2, intro paragraph
- Per division: number + rule + "Division", huge name (`13vw` / `lg:8vw`),
  focus word on an accent block, body, "Engage this division" link
- Right: that segment's projects as cards — sector, name, scope, tags
- Card hover fills accent, all child text inverts to white
- Parallax: background image `y: 40 → -40`, headline `x: 30 → -30`

Content: `getDivisions()`, `getProjectsBySegment()`

### 3. Capabilities (`#capabilities`)
What we actually do. Answers tentwenty's "our services" job.

- Sticky left panel: eyebrow `02 / …`, h2, rotating `loop-mark` (0→320deg)
- Right: five rows — mono index, title, summary; accent fill on hover
- All eight services are listed and sellable. `hasWork` on each records
  whether verified portfolio work backs it (web, e-commerce, platforms, AI
  do; mobile, brand, SEO, cloud do not yet) — used to avoid linking a
  prospect to an empty case-study grid. It is not a capability claim.
- The header "Services" dropdown lists the same eight, sourced from the same
  content file, so the two can never drift.

Content: `getServices()`

### 4. Work (`#work`)
Proof at a glance — the scannable table view of everything delivered.

- Eyebrow `03 / …`, h2, intro
- Columns: Partner · Scale · Mission · Status · ↗
- Row hover fills accent; rows link out to the live site
- Horizontally scrollable under 760px, never scrolls the page body

Content: `getProjects()`

### 5. Contact (`#contact`)
Closes the funnel. One action.

- Accent left rule, eyebrow `04 / …`, two-line display h2
- Primary CTA → email
- Footer: wordmark + location, section links, social

Content: `site`

## Copy rules

1. Every sentence is original. Never paste from tentwenty or any other site.
2. The design reference's copy is also off-limits — it echoes tentwenty's
   "creating digital growth" line. Rewrite it.
3. No invented clients, testimonials, headcount, awards or founding dates.
4. A project appears only when verified live and the client has approved
   their name. `lib/content.ts` enforces this.

## Open items

- Client-name approval per project (all currently gated off)
- Outcome sentence, year and cover image per project
- Confirm contact email, phone, office address
- Logo asset
- Mobile: one Flutter repo with a scaffold README is thin evidence for the
  service claim — confirm before publishing
