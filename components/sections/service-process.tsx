"use client";

import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { useScrollCarousel } from "@/components/motion/use-scroll-carousel";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/** Shared stroke style so every step icon reads as one family, not four. */
function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const DiscoverIcon = () => (
  <IconFrame>
    <circle cx="10" cy="10" r="6" />
    <path d="M20 20l-5.5-5.5" />
  </IconFrame>
);
const DesignIcon = () => (
  <IconFrame>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </IconFrame>
);
const BuildIcon = () => (
  <IconFrame>
    <path d="M8 6 3 12l5 6" />
    <path d="M16 6l5 6-5 6" />
  </IconFrame>
);
const LaunchIcon = () => (
  <IconFrame>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4Z" />
  </IconFrame>
);
const DefaultIcon = () => (
  <IconFrame>
    <circle cx="12" cy="12" r="8" />
  </IconFrame>
);

/** Keyed by step title, lowercased — an unmatched title gets a plain dot
 *  rather than crashing, so a future service without a mapped icon still
 *  renders something. */
const STEP_ICONS: Record<string, () => React.ReactElement> = {
  discover: DiscoverIcon,
  design: DesignIcon,
  build: BuildIcon,
  launch: LaunchIcon,
};

/**
 * Icon presented as a faint accent duplicate offset behind the real one —
 * a cheap, generic way to give any single-stroke glyph a sense of depth
 * (the layered/stacked-shape look reference agency sites use for process
 * icons) without hand-drawing a separate multi-shape illustration per step.
 */
function StackedIcon({ icon: Icon }: { icon: () => React.ReactElement }) {
  return (
    <span className="relative inline-flex h-14 w-14 items-center justify-center text-ink">
      <span
        aria-hidden="true"
        className="absolute translate-x-1.5 translate-y-1.5 text-accent/30"
      >
        <Icon />
      </span>
      <span className="relative">
        <Icon />
      </span>
    </span>
  );
}

/**
 * "How we work" — an editorial, icon-led filmstrip rather than boxed cards
 * on a timeline. Items float directly on the section background (no
 * borders, generous gaps) with an oversized layered icon leading each one,
 * and a plain "01 of 04" counter + a paired prev/next pill below — the
 * scroll mechanics come from `useScrollCarousel`, shared with
 * service-technologies.tsx.
 *
 * Rebuilt after the first version (bordered cards on a connecting line) was
 * rejected as "raw." The client's own reference pointed at tentwenty's
 * process section specifically for its restraint — no card chrome, just
 * icon + type + air — adapted to our light palette rather than their dark
 * one (their own explicit instruction: "according to our website theme and
 * vibe").
 */
export function ServiceProcess({ steps }: { steps: ServiceDetail["process"] }) {
  const { trackRef, index, canScroll, measure, goTo } = useScrollCarousel(steps.length);

  return (
    <section className="relative overflow-hidden bg-bone py-24 md:py-32">
      <Shell className="px-5 md:px-10">
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>02 / How we work</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              A visible process,
              <br />
              <ScrollFillText>not a black box.</ScrollFillText>
            </h2>
          </div>
        </div>
      </Shell>

      {/* `relative` here isn't decorative — useScrollCarousel's `goTo` reads
          each child's `offsetLeft` to scroll to it. Without a position on
          this element, `offsetLeft` resolves against whatever positioned
          ancestor is further up the tree instead of this track, so it no
          longer lines up with `scrollLeft`'s own coordinate space and
          `goTo` scrolls to the wrong pixel (confirmed: clicking "next"
          moved scrollLeft by ~24px instead of a full card width). */}
      <div
        ref={trackRef}
        onScroll={measure}
        style={{ scrollbarWidth: "none" }}
        className="relative flex snap-x snap-mandatory gap-14 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-10 md:px-10 md:gap-20 [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[step.title.toLowerCase()] ?? DefaultIcon;
          return (
            <div
              key={step.title}
              className="w-56 shrink-0 snap-start sm:w-64"
            >
              <StackedIcon icon={Icon} />
              <span className="mt-8 block font-mono text-[10px] uppercase tracking-[.18em] text-faint">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-2xl font-medium tracking-[-.01em] text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          );
        })}
        <div className="w-5 shrink-0 md:w-10" aria-hidden="true" />
      </div>

      <Shell className="mt-14 px-5 md:px-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tabular-nums text-faint">
            <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> of{" "}
            {String(steps.length).padStart(2, "0")}
          </span>

          {canScroll && (
            <div className="flex items-center gap-1 rounded-full border border-line-strong p-1">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous step"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next step"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Shell>
    </section>
  );
}
