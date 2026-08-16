
## Work section: top 5 + View all projects

The homepage ledger now shows a curated top 5 instead of the full project
catalogue, closing on a link into a dedicated project list.

- `app/page.tsx` calls `getFeaturedProjects(5)` instead of `getProjects()`.
  `getFeaturedProjects` already existed in `lib/content.ts`: it filters on
  the `featured` flag and falls back to the first N publishable projects if
  nothing is flagged, so this never silently shows zero rows just because
  no one has curated a featured set yet.
- "View all projects" uses `MagneticButton` — the same magnetic-pull and
  fill-sweep component as the header's "Get in touch" — centred below the
  table rather than styled as a table row. It sits outside the table's own
  `overflow-x-auto` wrapper so it stays centred on the viewport instead of
  scrolling off with the (wider) table underneath on narrow screens.
  Verified centred to within a rounding error at 1440/768/390/320px. Links
  to `/projects`.
- `/projects` does not exist yet. Per client direction, the link points
  there now and the page itself is a separate, later task — the button is
  real (not a dead `#work` anchor), it just 404s until that route is built.
- The empty state (all projects unapproved, no rows to show at all) still
  closes on the same CTA, rendered as a standalone `MagneticButton` at the
  `lg` size instead of a table row, since there is no table to be a row of.

Verified: 5 project rows + the closing row (6 links total) in the populated
state; the CTA present and correctly styled in the empty state; hover fills
the closing row edge-to-edge with the same accent treatment as every other
row; no horizontal overflow on desktop or mobile; build, typecheck and lint
clean.
# Design tokens

Extracted from the approved design reference (tech-monkey-logic.base44.app),
by decompiling its production JS/CSS bundle. These are measured values, not
guesses. Anything marked TBD needs a decision before use.

## Palette

| Token | Value | Role |
|---|---|---|
| `--tm-ink` | `#141416` | Primary text, dark surfaces, solid buttons |
| `--tm-accent` | `#3D5AFE` | Electric indigo. Hover fills, highlight mark, CTA hover |
| `--tm-accent-deep` | `#2A3FCC` | Eyebrows, status text, small accent type (AA on light) |
| `--tm-bone` | `#F3F2EE` | Page background (warm off-white) |
| `--tm-surface` | `#FFFFFF` | Cards, ledger section |
| `--tm-muted` | `#5A5A60` | Body copy |
| `--tm-faint` | `#9A9AA0` | De-emphasised headline half, table meta |

Borders are `--tm-ink` at 10% / 15% opacity.

NOTE: the reference is LIGHT-first (bone background, ink text). The brief
asked for dark-first. Flagged for the client — see docs/homepage-spec.md.

## Typography

- Heading + body: **Inter** (`--font-heading`, `--font-body`)
- Mono: system stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas...`)
- Display headings: `font-black` (900), tracking `-.04em` to `-.06em`, leading `.82`–`.95`
- Hero: `text-[12vw]` mobile / `md:text-[8vw]`
- Division name: `text-[13vw]` / `lg:text-[8vw]`
- Section h2: `text-4xl` / `md:text-6xl`–`text-7xl`
- `.eyebrow`: mono, 11px, uppercase, letter-spacing `.2em`, colour `--tm-accent-deep`

## Layout

- Container `max-w-[1600px]`
- Gutters `px-5` / `md:px-10`
- Section rhythm `py-24` / `md:py-32`–`py-36`
- `--radius: .25rem`; pills use `rounded-full`

## Motion (as built in the reference)

- Hero highlight word: `pop` keyframe, `scale(.85)`→1 + fade, `.4s ease-out`
- Division rows: parallax — background image `y: 40→-40`, headline `x: 30→-30`
- Capabilities: `loop-mark` rotates `0→320deg` on scroll progress; panel is `lg:sticky`
- Hover: rows/cards fill `--tm-accent`, all child text inverts to white
- `.loop-mark`: 1px accent border, `border-radius: 50% 48% 50% 46%`, dual inset/outer glow

## Division project previews: live-site iframes

Each division shows 1-3 real projects as full-width cards containing a live
iframe preview of the actual deployed site, wrapped in a fake browser-chrome
frame (traffic-light dots + a URL bar reading the project's real domain).
Chosen over static screenshots because every project already carries a
working `url` (see docs/project-inventory-verified.md), so this needs no
image uploads, can never go stale the way a screenshot would, and reads as
proof rather than a mockup.

Component: `components/ui/live-preview-card.tsx`. Layout: vertical stack,
full width (`components/sections/divisions.tsx`, `MAX_PREVIEWS = 3`) — a
2-column grid was considered and rejected, since an iframe needs real width
to read as an actual website rather than a postage stamp.

Three real risks, each mitigated deliberately:

1. **Performance.** Up to 9 cross-origin iframes could exist on the page (3
   divisions x 3 projects). Each only mounts once its card crosses an
   `IntersectionObserver` threshold (`rootMargin: 200px`) — confirmed zero
   iframes exist in the DOM immediately after page load, before scrolling
   near them.
2. **Scroll/click hijacking.** An iframe without `pointer-events: none` lets
   the embedded site capture the page's own scroll wheel the moment the
   cursor is over a card. Fixed with `pointer-events-none` on the iframe
   itself plus a transparent overlay div; the whole card is one `<a>` to the
   project's real URL, so a click still navigates correctly.
3. **Silent embed failure.** A project's site could add `X-Frame-Options`
   at any time, or go offline — and a blocked iframe fires no `onError`, it
   just renders blank. A 6-second load timeout without an `onLoad` fires
   flips to the plain-text fallback card (sector + name), so the section
   can never show an empty box. Verified live: all six checked project
   domains (Vercel defaults) send no frame-blocking headers today, but the
   fallback exists because that can change without our involvement.

Verified end-to-end with three projects temporarily flagged
`nameApproved: true` for visual QA (Cloak, AutoBreeze, NeuroHolistic — all
in the Startups division), then reverted. With those flags on: iframes
rendered the real live sites correctly on both desktop and 390px mobile, no
horizontal overflow, hover darkens the border with a shadow lift consistent
with the site's existing hover language, and previews still load under
`prefers-reduced-motion` (they are content, not decorative motion). With the
flags off (the real, current state): the section correctly falls back to
the existing "being prepared for publication" placeholder — confirmed by
reading the rendered HTML.

**Nothing is visible today.** All 25 projects in `content/projects/index.ts`
are still `nameApproved: false`; every division renders the placeholder
until the client clears specific projects for public use. See
docs/project-inventory-verified.md for the list to review.

## Carousel motion replaced: direction-aware deal -> deck-pull

The `flipped`-aware fix (previous entry, now superseded) still wasn't right
per client feedback: pressing the arrow that dealt cards in "from the left"
looked wrong regardless of which page-layout side it corresponded to. The
client wanted something simpler and more consistent: no matter which arrow
is pressed, the current card always exits to the right, and the new card
was already waiting behind it and rises into place — a physical
top-of-the-deck motion, not a directional slide-in.

Rebuilt `ProjectShowcase` with no direction/flip state at all:

- Dropped the `[index, direction]` tuple state -> plain `index`.
- Dropped the `flipped` prop and its `sign` multiplier entirely; the
  `divisions.tsx` call site no longer passes anything but `projects`.
- Variants no longer take a `dir` argument. `enter` is a fixed small
  offset (`x: 6%, y: 6%, scale: .9, rotate: 2deg`) as if the card were
  already stacked behind the visible one; `exit` is a fixed rightward slide
  (`x: 40%, scale: .85, rotate: 6deg`) regardless of which arrow triggered
  it.
- Switched `AnimatePresence` from a `custom={direction}` variant lookup to
  `mode="popLayout"`, since there's no longer a direction to look up.

Verified by reading the live transform matrix during a "Previous" click
(the arrow the client specifically flagged): the outgoing and incoming
card's x-translate both increase monotonically rightward across the whole
transition (17px -> 62px -> ... -> 247px) — confirming both cards move
right, never left, regardless of which arrow was pressed. Re-ran the full
regression: both arrows on all three divisions, mobile, reduced motion, no
overflow or console errors anywhere.

## Deal-direction fix for left-side showcases

Bug: on Corporates (the one division where `lg:order` flips the showcase to
the LEFT column, `divisions.tsx`), clicking "next" dealt the incoming card
in from further right — correct for a right-side showcase, but on the left
side that direction travels straight across the "Corporates" headline and
body copy sitting to its right. Startups and Enterprises (both right-side,
unflipped) had the mirror problem on the opposite arrow ("previous").

Root cause: `ProjectShowcase`'s enter/exit offsets were percentages of the
card's own width, always signed the same way regardless of which side of
the page the card actually sat on — the animation had no idea about the
page-level layout flip happening one level up in `divisions.tsx`.

Fix: `ProjectShowcase` now accepts a `flipped` prop, passed straight through
from the same `flipped` value `DivisionBlock` already uses for its own
`lg:order` classes. A `sign` (`flipped ? -1 : 1`) multiplies every x/rotate
offset in the variants, so "next" always deals from whichever side is
actually open page space, never toward the text column, regardless of which
side of the page the showcase's own column lands on.

Verified by reading the live `transform` matrix during a Corporates "next"
click, not just by eye: the incoming card starts at `x: -454px` (left of
centre, sliding right to settle at 0) — confirming it deals in from the open
left margin rather than from the right, where the text sits. Re-ran the full
regression afterward: both arrows on all three divisions, no overflow at any
point, mobile and reduced-motion unaffected, no console errors.

## Corporates and Enterprises showcases

Extended the showcase carousel from Startups-only to all three divisions,
4 projects each, per client request.

**Corporates (4, all real, no re-tagging needed):** Hyde Park Wood, Taldo,
Saabri, Continental Premium Properties. Picked for variety over similarity —
a trade portal, a recruitment platform, a CRM and a property platform, not
four near-identical marketing sites, even though corporates has 13 real
projects to choose from.

**Enterprises (4, one real, three borrowed):** the verified inventory has
exactly one enterprise-segment project (FixNex). Flagged this to the client
directly rather than inventing three more to hit the "minimum 4" ask, which
would have broken the entire point of the `nameApproved` gating system.
Client decision: temporarily re-tag three corporate-segment projects (Ark
Vision, Sartawi Properties, Pacific Pearl Hotels) into Enterprises so the
carousel has 4 to cycle, to be corrected once real enterprise-tier work
exists. This is recorded three ways so it cannot get lost: a TODO(client) at
the top of `content/projects/index.ts`, an inline `// borrowed into
Enterprises` comment on each of the three entries, and here.

Verified after the data change: all three divisions independently show
`01/04`, hover-to-activate and the next/prev controls work identically in
each, and the "one active iframe + one preloaded neighbour" memory guarantee
holds per-division at 3x scale — 6 iframes total across the full page (2 per
division x 3), not 6 growing unboundedly, confirmed by count.

## Project showcase: hover-to-activate + browser-chrome redesign

Two follow-up changes to the card-deck showcase, both from direct client
feedback on the click-to-activate version.

**Hover instead of click.** Click-to-activate was deliberate (a permanently
interactive iframe steals the page's scroll the instant the cursor crosses
it), but the client wanted automatic control on cursor-enter. Implemented as
`onPointerEnter`/`onPointerLeave` on the stage rather than a sticky
click-to-open: control engages the moment the cursor enters the window and
releases the moment it leaves, so a visitor scrolling past the section with
the cursor still over it recovers control as soon as the cursor tracks off
the window - the same safety property click-to-activate had, without
requiring a click. Escape stays as a keyboard-only fallback.

Gated to `(hover: hover) and (pointer: fine)` - touch has no hover event to
activate or release with, so touch keeps a tap-to-activate fallback button
underneath the pointer handlers. Checked with a lazy `useState` initialiser,
not a `useEffect` (the effect version was flagged by
`react-hooks/set-state-in-effect` - setState in an effect body causes an
avoidable second render), guarded for `typeof window !== "undefined"` since
"use client" does not exempt a component from the initial SSR render pass.

Verified: `pointer-events` on the iframe flips `none -> auto` on enter and
back to `none` on leave, confirmed by reading the computed style directly
after each transition (not just visually) - and confirmed the same cycle
still works via `.hover()`/mouse-move-to-coordinates in Playwright, after an
initial false negative traced to imprecise synthetic coordinates rather than
a real bug.

**Browser-chrome redesign.** The first chrome bar (flat grey dots, a plain
pill for the URL) didn't read as "a real browser" at a glance. Rebuilt with:
real macOS-style traffic-light colours (`#ff5f57` / `#febc2e` / `#28c840`,
not grey), a proper address-bar shape with a lock icon, and a dark
(`#2a2a2e`) chrome bar rather than the site's own bone tone - the same
visual separation a real OS browser uses to distinguish its own frame from
page content. The state badge gained a pulsing dot and switched from plain
text colour to a filled pill matching the accent when live. The whole window
gained a deeper shadow and, when active, an accent-coloured border and glow
so "you are now in control" is unambiguous at a glance.

## Live-preview card redesign: full card -> compact row

The first version of `LivePreviewCard` was a full-width card with a 16:10
iframe window (~500px tall). Stacked 3 deep in a division's right column,
that overshot the left column's natural text height (~425px, measured) by
roughly 4x — the division block visibly bled past its own bottom divider,
spilling into the next division's border. Caught from client feedback with
a screenshot showing the overflow directly against the block's black
divider lines.

Root cause: the two columns sit in a CSS grid, and a grid row's height is
set by its tallest child. Three full-size cards structurally could not fit
beside four lines of body copy no matter how the spacing was tuned — this
needed a different card shape, not smaller margins.

Redesigned as a horizontal row: a fixed `aspect-square` thumbnail
(~96-112px) plus sector/name/scope stacked beside it, three rows separated
by hairline dividers. Three rows now total roughly the same height as the
text column next to them. The iframe crop math changed to match — scaled
~5x and cropped to just its top-left fragment (logo/nav/hero corner) rather
than shrunk to fit the whole page, since a whole live page rendered at
100px would be an unreadable smear; a cropped fragment at a size closer to
native reads as "yes, this is a real site" even this small.

The three risk mitigations from the original design carry over unchanged:
IntersectionObserver-gated mounting, a load timeout falling back to a
sector-only placeholder, and (implicitly, since the iframe is
`pointer-events-none` and the row-not-card structure means no scroll-shield
div is needed at this size) no scroll hijacking.

Verified with the same 3 projects (Cloak, AutoBreeze, NeuroHolistic)
temporarily approved for visual QA, then reverted — confirmed no overflow
past the block's divider on desktop, tablet, and phone (320-3440px), hover
darkens the arrow to accent and tints the row background, and reduced
motion still loads the previews (they are content, not decorative motion).
Real content state (all 25 projects `nameApproved: false`) verified to
still render the "being prepared for publication" placeholder correctly.

## Hero segment-word crossfade

The highlighted word in the hero ("...for startups/corporates/enterprises")
originally hard-swapped via a React `key` + a one-shot CSS `pop` keyframe —
functional but felt raw, no sense of one word replacing another.

Rebuilt as a masked vertical crossfade using Motion's `AnimatePresence`
(`mode="popLayout"`): the outgoing word slides up and fades while the
incoming one slides in from below, both clipped inside the accent block via
`overflow-hidden`. Reuses the same masked-label technique already used on
`MagneticButton`, so the site has one consistent "words replace each other"
motion language rather than a second bespoke effect.

The accent block itself carries Motion's `layout` prop, so its width
animates between word lengths ("startups" -> "enterprises") instead of
snapping. Confirmed by sampling the block's rendered width every ~35ms
during a transition: 490 -> 529 -> 543 -> 547 -> 548px, a genuine eased
expansion, not a jump — a still screenshot mid-transition can look like a
snap even when the underlying animation is smooth, so this was checked by
measurement, not just by eye.

Reduced motion: `useReducedMotion()` drops `layout` on the block and the
enter/exit offsets on the word, so `AnimatePresence` falls back to
`mode="wait"` and the switch is instant with no residual "ghost" word.
Verified via the actual rendered `h1` text immediately after a click under
`reducedMotion: "reduce"`.

## Arrow + link hover pattern

Standardised across every "→" glyph on the site (`components/ui/shell.tsx`,
the `Arrow` component's `spin` prop):

- Idle: arrow points up-right (its native ↗ path).
- Hover: rotates 45° to point straight right (→) and nudges outward
  (`translate-x-0.5`). Verified the rotation direction visually before
  shipping — the glyph's diagonal and CSS rotation direction are easy to
  get backwards from arithmetic alone.

Applied to: header "Get in touch", "Engage this division", "Start a
conversation", and both project-card arrows (division cards, ledger rows).

**Text links with an arrow** ("Engage this division") also gained an
underline-on-hover: idle state is `border-b-2 border-transparent` (reserves
the same 2px so the line appearing on hover causes no shift), hover is
`border-accent`.

**"Start a conversation"** was a plain filled pill; converted to
`MagneticButton` (the same component as the header's "Get in touch") so it
gets the same magnetic pull and fill-sweep. Needed a `size` variant prop
(`md` | `lg`) rather than a height override via `className` — Tailwind
resolves conflicting utilities (`h-10` vs `h-14`) by source order in the
compiled stylesheet, not by position in the className string, so an
`h-14` passed through `className` was silently losing to the component's
own `h-10`/`sm:h-11` (verified: rendered at 44px regardless of the
override). The size variant sidesteps the conflict — only one size's
classes exist in the markup at a time.

`TM // {mode}` removed from the header per client request; the `mode` prop
was dropped from `SiteHeader`'s interface rather than left dead.

## Capabilities row hover

Replaced the accent colour-fill hover (design reference default) with a
restrained pair of effects, per client direction — no blue fill on this
list:

- The row's own top and bottom rules darken from `--tm-line-strong` (15%
  ink) to solid `--tm-ink` AND thicken from a 1px hairline to a slightly
  bolder rule (a 1px box-shadow offset outward from the border — total
  visible band is about 2px, not a wide bar). Went through three passes:
  solid ink + 2px offset read as too heavy; a 45%-opacity version read as
  the wrong fix (client wanted solid black, just narrower); settled on
  solid ink + 1px offset. The thickening is a `box-shadow` (`0 -2px` / `0 2px`,
  offset outward from the existing border), not a `border-width`
  transition — box-shadow doesn't participate in layout, so the row above
  and below never move. Confirmed: row `top` positions read byte-identical
  before and after hover.
- The title scales to `1.08` (`scale-[1.08]`, `origin-left`) on the same
  timing. First tuned at `1.015`, raised after client feedback that it
  wasn't noticeable enough. Verified clear of the summary column even at
  the narrowest supported desktop width (1280px, longest single-line title
  "AI & Automation") — screenshot-checked, since the row is a fixed-width
  grid cell and a bounding-box read on the container doesn't reflect where
  the scaled glyphs actually land.

Each row carries its own `border-y` with `-mt-px` to stack flush against the
one above, rather than sharing a single border between the list and each
row's bottom edge. That was a structural change, not just a colour swap:
sharing meant darkening one row's border would have visually darkened its
neighbour's top edge too. `hover:z-10` keeps the darkened border above the
next row's border-top in paint order.

Background stays transparent in both states — confirmed via
`getComputedStyle().backgroundColor`, `rgba(0,0,0,0)` before and after hover.

## Full-range responsiveness

The hero and division headlines originally used unclamped `vw` sizing
(`text-[10.5vw] md:text-[6.8vw]`), tuned only at 1440px. Audited against nine
real viewports — 320px phone up to a 3440px ultrawide monitor — and found two
real bugs, not just untested edge cases:

- **Unbounded scaling on large monitors.** At 2560px and 3440px the
  headline rendered at 174px-234px: technically "responsive" but visually
  broken, wildly out of proportion to the nav and body copy. Fixed with
  `clamp()`, not a bigger breakpoint list — a fixed floor and ceiling with a
  fluid middle term, solved from two measured anchor points (not guessed):
  - Hero: `clamp(2.125rem, 0.982rem + 5.714vw, 6.875rem)` -> 34px floor
    (smallest size that keeps "enterprises", the longest segment word, clear
    of a 320px edge), 110px ceiling (largest that keeps it on line two at the
    shell's full 1600px width), passing through the previously-tuned 98px at
    1440px so desktop is visually unchanged.
  - Division names: `clamp(2.625rem, 0.696rem + 9.643vw, 9.375rem)` -> same
    34px-equivalent floor, 150px ceiling (a single short word tolerates a
    larger cap than a two-line phrase).
- **Header overflow at 320px, invisibly clipped.** Wordmark + "Get in touch"
  + hamburger needed 192px more than the 320px viewport had once gutters
  were subtracted — the CTA group has `shrink-0` so it doesn't compress, it
  just overflows past the edge. `overflow-x: clip` on `body` (added earlier
  for the vw-headline overflow) suppressed the scrollbar without fixing the
  layout, so `scrollWidth > clientWidth` checks passed while the button sat
  off-screen. Confirmed by measuring `getBoundingClientRect()` directly, not
  by trusting the overflow check. Fixed by tightening the button's padding
  and gap below `sm`, letting the button group actually shrink
  (`min-w-0 shrink` on its wrapper), and trimming wordmark tracking.
- **Hero height stretching into dead space on tall/wide screens.**
  `min-h-screen` + `justify-between` pushed the marquee to the literal
  bottom of the viewport; on a 1440px-tall ultrawide that left a 768px gap
  between the CTA row and the marquee. Switching `min-h-screen` to
  `h-screen` (with `max-h-225`, 900px) fixes it — `min-height` always wins
  over a smaller `max-height` per the CSS spec, so the cap was silently
  ignored under `min-h-screen` (verified: heroH stayed 1440px with the cap
  in place). `height` respects `max-height` correctly; shorter viewports
  still fill their own height since 900px is only ever a ceiling.

Verified across ultrawide (3440), 4K (2560), desktop (1440), laptop (1280),
tablet (768), and four phone sizes down to 320px: no overflow before or
after scrolling, headline stays on two lines everywhere, contact heading
reaches full fill at every size, mobile menu and reduced motion unaffected.

## Scroll-fill headings

Two-tone section headings (`One partner. / Three scales of ambition.`) fill
the muted second line with ink, left-to-right, scrubbed to scroll position.

- Component: `components/motion/scroll-fill-text.tsx`
- Technique: hard-stop `linear-gradient` clipped to the glyphs with
  `background-clip: text`; `background-position` is driven by `useScroll`
  progress, so it tracks scroll speed and reverses on scroll-up.
- Band between stops is 6% (47% -> 53%): a crisp leading edge that reads as a
  solid wipe. Widening it makes the sweep look like a gradient smear.
- A `useSpring` (stiffness 260, damping 32) smooths the scrub so it tracks
  scroll speed closely without lagging into a lazy crawl.
- Default finish point is viewport centre (`start 0.5`), not the reading
  zone: the fill completes by the time the line crosses the middle of the
  screen, matching how a reader's eye meets it. Confirmed at centre-cross:
  background-position reaches 0% (fully filled) within the same scroll step
  the element's vertical centre lands on the viewport's.
- Applied to: divisions, capabilities, contact.

### The `anchor` prop

The final section stops scrolling while its heading is still mid-screen — at
1440x900 it rests at 41% of the viewport, so a fixed `start 0.25` end offset
was unreachable and the heading stayed permanently part-grey (measured: stuck
at 23%).

`anchor="end"` measures the real remaining scroll distance on mount and on
resize, and finishes the sweep within it. Verified reaching ~1% (complete) at
1440x900, 1440x700, 768x1024, 390x844 and 360x780.

Use `anchor="end"` for any heading in the last section of a page.

### Reduced motion

The clip and transparent colour live in `.scroll-fill` in `globals.css`, not
inline. A JS-only guard painted transparent text for one frame before
hydration resolved; the CSS override wins immediately. Renders solid
`--tm-faint`.

## Still needed from the client

- Confirm light-first vs the dark-first brief
- Real project data (reference ships placeholder client names)
- Logo asset, and real contact details
