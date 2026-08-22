import Image from "next/image";

import { Arrow } from "@/components/ui/shell";
import type { Project, ServiceCategory } from "@/lib/content";

/** Display labels for the category shown in each tile's footer row. */
export const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  web: "Website",
  mobile: "Mobile App",
  ecommerce: "E-commerce",
  platforms: "Platform",
  ai: "AI & Automation",
  brand: "Branding",
  seo: "SEO",
  cloud: "Cloud & Hosting",
  consulting: "Consulting",
  video: "Video & Film",
};

/**
 * One project in the /projects and homepage-work grids.
 *
 * Card anatomy follows the reference the client pointed at (tentwenty's
 * cases page): a large media block, the project name beneath it, a hairline
 * rule, then a metadata row. Theirs pairs category with a year; none of our
 * projects carry a `year`, so the right-hand slot shows the project's real
 * `sector` instead of an invented date.
 *
 * The cover is `project.image` — a static screenshot in /public, generated
 * by `scripts/capture-project-screenshots.mjs` at 1440x900 (a real laptop
 * resolution) so each hero reads the way an actual visitor sees it. Tiles
 * that have no image fall back to a typographic panel.
 *
 * **Hover shows the same image, only very slightly larger. Nothing swaps.**
 *
 * That is a deliberate reversal. This component used to mount a live
 * `<iframe>` of the real site on hover, fading it in over the screenshot.
 * It was removed because it made hover look broken, for a reason that took
 * a client screenshot to see clearly: the two images genuinely differ.
 * Several of these sites run rotating hero carousels, so the live frame
 * would arrive on a *different slide* than the one captured (OnlineBlinds
 * went from "Day and Night Blinds" to "Premium Vertical Blinds"
 * mid-hover), at a slightly different layout and scroll position, with a
 * "LIVE" badge appearing on top. Read as a glitch because it effectively
 * was one — the picture changed out from under the cursor.
 *
 * Removing it also deletes the last iframe on the site. Earlier in this
 * project, cross-origin iframes in these grids were measured blocking the
 * main thread for 1.1-1.4s and were the confirmed cause of a scroll-stall
 * bug; the hover-only version was the compromise that kept the feature
 * alive. With it gone, the grid is a plain image grid: nothing to load on
 * hover, nothing to abort, nothing to thrash, no debounce needed.
 *
 * `project.video` is intentionally still supported — a silent
 * screen-recording is the one kind of hover media that would show the same
 * content rather than different content. Nothing sets it yet.
 */
export function ProjectTile({
  project,
  wide,
  featured,
  index,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project;
  /** Full-bleed row rather than a half-width cell. */
  wide?: boolean;
  /**
   * Lead treatment: a taller frame and an editorial two-column caption
   * carrying the project's real `scope` sentence. Used for the first tile
   * so the page opens on one project rather than a uniform catalogue —
   * a grid where every cell is identical gives a visitor no route in.
   */
  featured?: boolean;
  /**
   * Position in the rendered list, for the `01 / 02 / 03` marker. Counts
   * the visible grid, so it stays sequential under a category filter
   * instead of exposing gaps from the full set.
   */
  index?: number;
  /**
   * Forwarded straight to the anchor, unused by the tile itself. These
   * drive the "View site" cursor bubble in `useViewCursor`, which the
   * grid owns — the tile has no hover state of its own since the live
   * embed was removed, but it is still what the pointer actually enters.
   */
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  return (
    <a
      href={project.url ?? "/contact"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noreferrer" : undefined}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`group block ${wide ? "sm:col-span-2" : ""}`}
    >
      <div
        // Regular tiles are `aspect-8/5` — exactly 1440/900, the capture
        // script's own viewport — so a cover shows whole, at zero crop, in
        // its most common slot. Wide/featured tiles are `aspect-video`
        // (16:9), a hair wider than the 8:5 source, so the only crop that
        // can happen anywhere is a small trim off the bottom of those two
        // — never the sides.
        className={`relative overflow-hidden bg-bone ${
          featured || wide ? "aspect-video" : "aspect-8/5"
        }`}
      >
        {/* 1% scale on hover, over a long 700ms ease-out.

            Deliberately at the threshold of perceptible: the client asked
            for "very very little zoom", and on a tile this size anything
            more reads as the image lurching rather than settling. The
            duration matters as much as the amount — the same 1% arriving
            in 150ms would still feel like a snap. Transform only, so the
            grid never reflows. */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.01]">
          {project.video ? (
            <video
              src={project.video}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : project.image ? (
            // Captured at 2x (see the capture script), so next/image has
            // real pixels to work with and the cover stays sharp even in
            // the featured tile, which renders ~1360px wide on desktop.
            // `object-top` keeps each project's hero in frame on the two
            // ratios that can crop at all (see the frame's comment above)
            // — on the exact-match 8:5 tiles it has nothing to do.
            <Image
              src={project.image}
              alt={`${project.name} — homepage`}
              fill
              // Tiles live inside `Shell` (max-width 1600px) with 20/40px
              // padding, so they are never actually 100vw. Saying "100vw"
              // made the browser fetch the 1920px variant to fill a box
              // that measures 1360px — a whole size step of wasted bytes
              // on every full-width tile. These describe the real box.
              sizes={
                featured || wide
                  ? "(min-width: 1680px) 1600px, calc(100vw - 80px)"
                  : "(min-width: 1680px) 790px, (min-width: 640px) calc(50vw - 50px), calc(100vw - 40px)"
              }
              className="object-cover object-top"
            />
          ) : (
            <TypePanel project={project} />
          )}
        </div>
      </div>

      {featured ? (
        // Editorial two-column caption. The right-hand column carries the
        // project's real `scope` sentence — the one place on this page a
        // visitor learns what the work actually was before clicking.
        <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-12">
          <div className="md:col-span-7">
            <IndexMark index={index} featured />
            <h3 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.04em] text-ink transition-colors duration-300 group-hover:text-accent md:text-5xl lg:text-6xl">
              {project.name}
            </h3>
          </div>
          <div className="flex items-start justify-between gap-6 md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted">
              {project.scope}
            </p>
            <Arrow
              spin
              className="mt-1 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <IndexMark index={index} />
            <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-ink transition-colors duration-300 group-hover:text-accent md:text-3xl">
              {project.name}
            </h3>
          </div>
          <Arrow
            spin
            className="mt-2 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
          />
        </div>
      )}

      <div
        className={`flex items-center justify-between gap-4 border-t border-line-strong font-mono text-[10px] uppercase tracking-[.18em] text-muted ${
          featured ? "mt-8 pt-5" : "mt-4 pt-4"
        }`}
      >
        <span>{CATEGORY_LABEL[project.category]}</span>
        <span className="text-faint">{project.sector}</span>
      </div>
    </a>
  );
}

/**
 * The `01 / 02 / 03` marker above each project name.
 *
 * Sits above the name rather than over the screenshot deliberately: our
 * covers run from near-white (Taldo, Hyde Park Wood) to near-black
 * (FixNex), so any number overlaid on the image would need a scrim to stay
 * legible on both — and that scrim would dull the very thing the tile
 * exists to show. Above the name it is always ink-on-bone.
 */
function IndexMark({ index, featured }: { index?: number; featured?: boolean }) {
  if (!featured) return null;
  return (
    <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em]">
      <span className="text-accent-deep">Featured project</span>
    </span>
  );
}

/** Typographic stand-in for a project with neither an image nor a video. */
function TypePanel({ project }: { project: Project }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-bone px-6 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[.2em] text-accent-deep">
        {project.sector}
      </span>
      <span className="text-2xl font-black tracking-[-.03em] text-ink/25">
        {project.name}
      </span>
    </div>
  );
}
