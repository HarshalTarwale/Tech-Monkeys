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

## Scroll-fill headings

Two-tone section headings (`One partner. / Three scales of ambition.`) fill
the muted second line with ink, left-to-right, scrubbed to scroll position.

- Component: `components/motion/scroll-fill-text.tsx`
- Technique: hard-stop `linear-gradient` clipped to the glyphs with
  `background-clip: text`; `background-position` is driven by `useScroll`
  progress, so it tracks scroll speed and reverses on scroll-up.
- Band between stops is 6% (47% -> 53%): a crisp leading edge that reads as a
  solid wipe. Widening it makes the sweep look like a gradient smear.
- A `useSpring` (stiffness 90, damping 30) smooths the scrub so flick-scrolls
  glide to rest. High damping keeps it calm — never bouncy.
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
