"use client";

import { useEffect, useRef, useState } from "react";

import { Arrow } from "@/components/ui/shell";
import type { Project, ServiceCategory } from "@/lib/content";

/**
 * Logical viewport width each live embed is rendered at before being scaled
 * down to fit its tile. 1280 is a standard desktop breakpoint, so sites
 * render their desktop layout rather than a tablet/mobile one.
 */
const EMBED_WIDTH = 1280;

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
 * One project in the /projects grid.
 *
 * Card anatomy follows the reference the client pointed at (tentwenty's
 * cases page): a large media block, the project name beneath it, a hairline
 * rule, then a metadata row. Theirs pairs category with a year; none of our
 * projects carry a `year` (verified across all 12 publishable entries), so
 * the right-hand slot shows the project's real `sector` instead of an
 * invented date.
 *
 * Media falls back in three steps, best real content first:
 *
 *   1. `project.video` — a silent screen-recording, plays muted+looped on
 *      hover. Nothing has one yet; the field exists so dropping a file in
 *      /public and setting the path is the only change needed later.
 *   2. `project.url` — a live, scaled embed of the actual site. Every
 *      publishable project has a working URL, so this is what renders
 *      today: real, current, and impossible to let go stale the way a
 *      screenshot would.
 *   3. A typographic panel, if a project somehow has neither.
 *
 * Deliberately no stock video or stock photography in that chain. Using
 * media we don't hold a licence for on a client's commercial site is a real
 * legal exposure, and a generic stock clip would misrepresent the work
 * anyway — the same reason the service-page mockups are drawn rather than
 * sourced.
 *
 * The embed is `pointer-events-none` and only mounts once the tile nears
 * the viewport (IntersectionObserver, 300px margin). Both matter at this
 * scale: 12 live cross-origin frames mounted at once would be genuinely
 * heavy, and an interactive frame under the cursor would swallow the
 * page's scroll. A load timeout flips to the typographic panel, since a
 * frame blocked by X-Frame-Options fires no error event — it just renders
 * blank.
 */
export function ProjectTile({
  project,
  wide,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project;
  /** Full-bleed row rather than a half-width cell. */
  wide?: boolean;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  // Measure the media box so the embed can be rendered at a fixed desktop
  // viewport width and scaled down to fit.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mount media only once the tile is close to the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // A blocked iframe never fires onError, so a timeout is the only signal.
  useEffect(() => {
    if (!near || loaded || project.video || !project.url) return;
    const timer = setTimeout(() => setFailed(true), 8000);
    return () => clearTimeout(timer);
  }, [near, loaded, project.video, project.url]);

  function handleEnter() {
    onPointerEnter?.();
    videoRef.current?.play().catch(() => {});
  }
  function handleLeave() {
    onPointerLeave?.();
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  const showEmbed = !project.video && project.url && !failed;

  return (
    <a
      ref={ref}
      href={project.url ?? "/#contact"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noreferrer" : undefined}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className={`group block ${wide ? "sm:col-span-2" : ""}`}
    >
      <div
        ref={frameRef}
        className={`relative overflow-hidden bg-bone ${wide ? "aspect-video" : "aspect-4/3"}`}
      >
        {/* Media scales up fractionally on hover — transform only, so the
            grid never reflows. */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : showEmbed && near && box ? (
            <>
              {/* Rendered at a fixed EMBED_WIDTH desktop viewport and scaled
                  to fit, rather than a percentage of the tile.
                  Percentage-scaling made the effective viewport depend on
                  tile size, so full-width tiles rendered the site into a
                  ~2700px-wide window and it came back with large dead
                  margins either side (visible on the wide tiles). A fixed
                  logical width means every project renders the same way a
                  normal desktop browser would, whatever size cell it lands
                  in. */}
              <iframe
                src={project.url}
                title={`${project.name} — live site`}
                loading="lazy"
                tabIndex={-1}
                onLoad={() => setLoaded(true)}
                aria-hidden="true"
                style={{
                  width: EMBED_WIDTH,
                  height: box.h / (box.w / EMBED_WIDTH),
                  transform: `scale(${box.w / EMBED_WIDTH})`,
                }}
                className={`pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
              {!loaded && <TypePanel project={project} muted />}
            </>
          ) : (
            <TypePanel project={project} />
          )}
        </div>

        {/* Accent wash on hover, tying the tile to the site's one accent. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-black tracking-[-.03em] text-ink transition-colors duration-300 group-hover:text-accent md:text-3xl">
          {project.name}
        </h3>
        <Arrow
          spin
          className="mt-2 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-line-strong pt-4 font-mono text-[10px] uppercase tracking-[.18em] text-muted">
        <span>{CATEGORY_LABEL[project.category]}</span>
        <span className="text-faint">{project.sector}</span>
      </div>
    </a>
  );
}

/** Typographic stand-in — also the shot shown while an embed is loading. */
function TypePanel({ project, muted }: { project: Project; muted?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-bone px-6 text-center ${
        muted ? "absolute inset-0" : ""
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[.2em] text-accent-deep">
        {project.sector}
      </span>
      <span className="text-2xl font-black tracking-[-.03em] text-ink/25">
        {project.name}
      </span>
    </div>
  );
}
