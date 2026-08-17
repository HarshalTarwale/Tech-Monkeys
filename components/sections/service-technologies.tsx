"use client";

import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { useScrollCarousel } from "@/components/motion/use-scroll-carousel";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/**
 * "Technologies" — a horizontal row of dark cards, one per real tool this
 * service is built with, each showing the tool's name as bold type rather
 * than its brand logomark. Reproducing a third party's actual trademarked
 * logo art (React's atom, Stripe's wordmark glyph) isn't ours to use without
 * permission the way a client's own logo is in a case study; a plain
 * wordmark card gets the same "premium tool strip" read without that risk.
 *
 * Same scroll-carousel mechanics as service-process.tsx, via
 * useScrollCarousel — card shape and colour are the only things that
 * differ between the two.
 */
export function ServiceTechnologies({
  technologies,
}: {
  technologies: NonNullable<ServiceDetail["technologies"]>;
}) {
  const { trackRef, index, canScroll, measure, goTo } = useScrollCarousel(
    technologies.length,
  );

  return (
    <section
      id="service-technologies"
      className="border-y border-line bg-surface py-24 md:py-32"
    >
      <Shell className="px-5 md:px-10">
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          <Eyebrow>03 / Technologies</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              Built with tools,
              <br />
              <ScrollFillText>not lock-in.</ScrollFillText>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              The stack we actually ship on — no proprietary platform holding
              your site hostage if you ever want to leave.
            </p>
          </div>
        </div>
      </Shell>

      {/* `relative` — see the matching note in service-process.tsx: without
          it, useScrollCarousel's offsetLeft-based `goTo` measures against
          the wrong ancestor and scrolls to the wrong pixel. */}
      <div
        ref={trackRef}
        onScroll={measure}
        style={{ scrollbarWidth: "none" }}
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {technologies.map((tech, i) => (
          <div key={tech.name} className="w-64 shrink-0 snap-start sm:w-72">
            <div className="flex aspect-4/3 flex-col items-center justify-center bg-ink px-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/40">
                {tech.category}
              </span>
              <span className="mt-3 text-3xl font-semibold tracking-[-.02em] text-white sm:text-4xl">
                {tech.name}
              </span>
            </div>
            <span className="mt-5 block font-mono text-[10px] uppercase tracking-[.18em] text-accent-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tech.body}</p>
          </div>
        ))}
        <div className="w-5 shrink-0 md:w-10" aria-hidden="true" />
      </div>

      {canScroll && (
        <Shell className="mt-8 px-5 md:px-10">
          <div className="flex justify-end">
            <div className="flex items-center gap-1 rounded-full border border-line-strong p-1">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous technology"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next technology"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </Shell>
      )}
    </section>
  );
}
