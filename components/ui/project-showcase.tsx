"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Arrow } from "@/components/ui/shell";
import type { Project } from "@/lib/content";

/**
 * A single large, interactive live-site window with a card-deck carousel.
 *
 * Each project is shown as a real embedded live site inside browser chrome —
 * proof, not a mockup. Only the active card's iframe is mounted, so a
 * division never holds more than one cross-origin frame in memory.
 *
 * Interaction model: the iframe activates on mouseenter and releases on
 * mouseleave — cursor into the window, scroll/click control it directly;
 * cursor out, control returns to the page immediately. This is a real
 * tradeoff, not a free win: a permanently-interactive iframe steals the
 * page's scroll the instant the cursor crosses it, and a visitor who tries
 * to scroll past the section with their cursor still over the window will
 * scroll the embedded site instead of the page. Binding release to
 * mouseleave (rather than requiring an explicit click to opt out) is what
 * keeps that recoverable: the moment the cursor exits the window — which
 * naturally happens the instant a visitor scrolls with the mouse over
 * something else, or just moves toward the next section — control comes
 * straight back. Escape is kept as a keyboard-only fallback.
 *
 * Transition: outgoing card scales down and fades while the incoming card
 * slides in from the right and settles — the "playing card" deal effect.
 * Direction-aware, so going back reverses it. Uses AnimatePresence with a
 * custom direction so exit and enter run simultaneously rather than
 * sequentially (mode="popLayout" would drop the exiting card from layout
 * flow and collapse the fixed-height window mid-transition).
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [active, setActive] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Touch has no hover concept — mouseenter/leave never fires the way it
  // does on a cursor device, so on touch the frame would activate on the
  // first tap and then have no "leave" event to release it. Gated to fine
  // pointers only; touch keeps the previous tap-to-activate behaviour via
  // onClick, which still works underneath the pointer handlers below.
  //
  // Lazy useState initialiser, not a useEffect: this runs once during
  // render rather than triggering a second render pass after mount (the
  // effect version was flagged by react-hooks/set-state-in-effect —
  // setState inside an effect body causes an avoidable cascading render).
  // Still guarded for `window`: "use client" only means this can run in
  // the browser, not that it's exempt from the initial SSR render pass,
  // where window does not exist.
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  const count = projects.length;
  const project = projects[index];
  const nextProject = count > 1 ? projects[(index + 1) % count] : undefined;

  const go = useCallback(
    (next: number, dir: number) => {
      setActive(false);
      setState([(next + count) % count, dir]);
    },
    [count],
  );

  // Escape is a keyboard-only escape hatch — mouseenter/mouseleave on the
  // stage (below) is the primary activation path.
  useEffect(() => {
    if (!active) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  if (!project) return null;

  // Deal-from-the-right on advance, reverse on go-back.
  const variants = {
    enter: (dir: number) =>
      reduced
        ? { opacity: 0 }
        : {
            x: dir >= 0 ? "85%" : "-85%",
            scale: 0.82,
            opacity: 0,
            rotate: dir >= 0 ? 5 : -5,
          },
    center: { x: "0%", scale: 1, opacity: 1, rotate: 0 },
    // The outgoing card shrinks and fades roughly in place rather than
    // flying off — the incoming card is what draws the eye, and a card
    // exiting at full speed both ways reads as chaotic at this size.
    exit: (dir: number) =>
      reduced
        ? { opacity: 0 }
        : {
            x: dir >= 0 ? "-14%" : "14%",
            scale: 0.75,
            opacity: 0,
            rotate: dir >= 0 ? -4 : 4,
          },
  };

  return (
    // relative so the offscreen preload frame below is positioned against
    // this box rather than escaping to the nearest positioned ancestor.
    <div ref={wrapRef} className="relative">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[.2em] text-faint">
          Selected engagements
        </div>
        <div className="font-mono text-[10px] tabular-nums text-faint">
          <span className="text-accent-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-1 text-line-strong">/</span>
          {String(count).padStart(2, "0")}
        </div>
      </div>

      {/* Fixed-height stage. The card is absolutely positioned inside it so
          the outgoing and incoming cards can overlap during the deal
          without the container's height twitching. */}
      <div
        className="relative aspect-4/3 w-full sm:aspect-16/11"
        onPointerEnter={() => canHover && setActive(true)}
        onPointerLeave={() => canHover && setActive(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={project.slug}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduced
                ? { duration: 0.15 }
                : {
                    // Measured: at stiffness 260 the deal completed in
                    // ~270ms and read as a snap — a screenshot at 140ms
                    // already showed it 90% settled. Softer spring plus
                    // longer scale/rotate makes the card visibly travel.
                    x: { type: "spring", stiffness: 90, damping: 20, mass: 1.1 },
                    scale: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                    rotate: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.5, ease: "easeOut" },
                  }
            }
            className={`absolute inset-0 overflow-hidden rounded-2xl border bg-surface shadow-[0_28px_64px_-20px_rgba(20,20,22,.45)] transition-[border-color,box-shadow] duration-300 ${
              active
                ? "border-accent shadow-[0_28px_64px_-20px_rgba(61,90,254,.4)]"
                : "border-line-strong"
            }`}
          >
            <ShowcaseFrame
              project={project}
              active={active}
              onActivate={() => setActive(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Warms the next project's frame in a 1px offscreen box so advancing
          shows a rendered site immediately instead of a blank window. Only
          the neighbour is warmed, so the page still never holds more than
          two frames per division rather than one per project. */}
      {count > 1 && nextProject?.url && (
        <iframe
          key={nextProject.slug}
          src={nextProject.url}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute h-px w-px opacity-0"
        />
      )}

      {/* Controls: prev/next plus direct-select dots. */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Show ${p.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-accent"
                  : "w-1.5 bg-line-strong hover:bg-faint"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * The window itself: browser chrome, the live iframe, and the metadata
 * strip. Split out so each card in the deck owns its own load state and a
 * newly-dealt card starts from a clean loading state.
 */
function ShowcaseFrame({
  project,
  active,
  onActivate,
}: {
  project: Project;
  active: boolean;
  onActivate: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (loaded || !project.url) return;
    // A frame blocked by X-Frame-Options fires no error event — it just
    // renders blank — so a timeout is the only reliable failure signal.
    const timer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [loaded, project.url]);

  const showFrame = project.url && !failed;

  return (
    <div className="flex h-full flex-col">
      {/* Browser chrome: real macOS-style traffic-light colours (not flat
          grey dots) and a proper address bar with a lock icon, so the
          window reads as "an actual browser" at a glance rather than a
          generic bordered box. Dark chrome bar (vs. the site's bone-toned
          UI) so the window visually separates from the page itself — the
          same trick every real browser uses to distinguish its own frame
          from page content. */}
      <div className="flex shrink-0 items-center gap-3 bg-[#2a2a2e] px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-white/40"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-white/70">
            {project.url ? new URL(project.url).hostname : project.name}
          </span>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.14em] transition-colors duration-300 ${
            active ? "bg-accent text-white" : "bg-white/10 text-white/50"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              active ? "animate-pulse bg-white" : "bg-white/40"
            }`}
          />
          {active ? "Live" : "Preview"}
        </span>
      </div>

      <div className="relative min-h-0 flex-1 bg-bone">
        {showFrame ? (
          <>
            <iframe
              src={project.url}
              title={`${project.name} — live site`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              // Inert until activated: pointer-events off means the page
              // keeps its own scroll while the visitor is just passing over.
              className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
                active ? "" : "pointer-events-none"
              } ${loaded ? "opacity-100" : "opacity-0"}`}
            />

            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[.2em] text-faint">
                  Loading live site…
                </span>
              </div>
            )}

            {/* Touch fallback: on a cursor device the stage's own
                mouseenter/leave already activates the frame, so this veil
                is invisible and only exists to give touch a tap target
                (touch has no hover event to trigger activation with). */}
            {!active && loaded && (
              <button
                type="button"
                onClick={onActivate}
                className="absolute inset-0"
                aria-label={`Interact with the live ${project.name} site`}
              />
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-accent-deep">
              {project.sector}
            </span>
            <span className="text-2xl font-semibold text-ink">
              {project.name}
            </span>
          </div>
        )}
      </div>

      {/* Metadata strip. */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line-strong bg-surface px-4 py-3">
        <div className="min-w-0">
          <span className="block font-mono text-[9px] uppercase tracking-[.16em] text-accent-deep">
            {project.sector}
          </span>
          <span className="block truncate text-base font-semibold tracking-[-.02em] text-ink">
            {project.name}
          </span>
        </div>
        <a
          href={project.url ?? "#contact"}
          target={project.url ? "_blank" : undefined}
          rel={project.url ? "noreferrer" : undefined}
          className="group flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-muted transition-colors hover:text-accent"
        >
          Visit
          <Arrow spin />
        </a>
      </div>
    </div>
  );
}
