"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Arrow } from "@/components/ui/shell";
import type { Project } from "@/lib/content";

/**
 * A large project window with a card-deck carousel, shown inside browser
 * chrome so it reads as a real site rather than a generic bordered box.
 *
 * Shows the real captured screenshot (`project.image`, from
 * `scripts/capture-project-screenshots.mjs`) with the site's actual
 * hostname in the address bar, and links out to the running site. It does
 * NOT embed a live cross-origin iframe, and deliberately so — an earlier
 * version did, and it caused two separate, confirmed scrolling bugs:
 *
 *  1. **Scroll capture.** The iframe was inert (`pointer-events: none`)
 *     until the cursor entered the window, at which point it became
 *     interactive so a visitor could click around the embedded site. But
 *     an interactive iframe owns the wheel: a visitor scrolling down the
 *     page whose cursor happened to be over the window scrolled the
 *     *embedded site* instead of the page. Because it depended entirely on
 *     cursor position, it presented as "sometimes scrolling doesn't work"
 *     — the hardest kind of bug to pin down, and the reason this is now a
 *     flat image with nothing to capture.
 *
 *  2. **Main-thread blocking.** Three divisions each mounted an active
 *     frame plus an offscreen "preload the next one" frame — measured at 4
 *     live cross-origin frames and 1,097ms of total main-thread blocking
 *     on the homepage. Lenis drives scroll from a `requestAnimationFrame`
 *     loop, so blocking of that size *is* visible scroll stutter. Same
 *     root cause, same fix, as components/ui/project-tile.tsx.
 *
 * A screenshot is still real proof: it's a capture of the real deployed
 * site, the address bar shows the real hostname, and "Visit site" opens
 * the running thing. Nothing here is a mockup.
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

  const count = projects.length;
  const project = projects[index];

  const go = useCallback(
    (next: number, dir: number) => setState([(next + count) % count, dir]),
    [count],
  );

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
    <div className="relative">
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
      <div className="relative aspect-4/3 w-full sm:aspect-16/11">
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
            className="absolute inset-0 overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_28px_64px_-20px_rgba(20,20,22,.45)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_28px_64px_-20px_rgba(61,90,254,.4)]"
          >
            <ShowcaseFrame project={project} />
          </motion.div>
        </AnimatePresence>
      </div>

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
 * The window itself: browser chrome, the project's real cover screenshot,
 * and the metadata strip.
 */
function ShowcaseFrame({ project }: { project: Project }) {
  return (
    <div className="group/frame flex h-full flex-col">
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
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-bone">
        {project.image ? (
          // 4:3 source pinned to `object-top`, same contract as the
          // /projects grid: this box is wider than 4:3, so the only crop
          // that can happen is off the bottom — never the sides.
          <Image
            src={project.image}
            alt={`${project.name} — homepage`}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
          />
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
          href={project.url ?? "/contact"}
          target={project.url ? "_blank" : undefined}
          rel={project.url ? "noreferrer" : undefined}
          className="group flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-muted transition-colors hover:text-accent"
        >
          Visit site
          <Arrow spin />
        </a>
      </div>
    </div>
  );
}
