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
