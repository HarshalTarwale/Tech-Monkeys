"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/**
 * FAQ accordion.
 *
 * This sits where the reference page runs client testimonials. We have no
 * approved quotes — `getTestimonials()` returns empty by design, and
 * inventing them would breach the content rules in AGENTS.md — so this
 * answers the same buyer hesitation ("what am I signing up for?") using
 * only things we can actually stand behind.
 *
 * Every answer stays in the DOM whether or not its row is open, and the
 * open/close is a CSS grid-template-rows transition on a wrapper rather
 * than mount/unmount. Two reasons: search engines index all six answers
 * instead of just the expanded one, and `0fr -> 1fr` animates smoothly
 * without measuring anything or hardcoding a max-height that would clip a
 * long answer. The global reduced-motion rule zeroes the transition, so no
 * separate branch is needed here.
 */
export function ServiceFaq({
  faqs,
  eyebrow = "05 / Questions",
}: {
  faqs: NonNullable<ServiceDetail["faqs"]>;
  /**
   * Service pages number this as their fifth section; reused as-is on
   * pages with a different section count (e.g. /contact) would show a
   * stale ordinal, so callers outside that flow pass their own label.
   */
  eyebrow?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="service-faq"
      className="border-y border-line bg-surface px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-7 text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              Before you ask,
              <br />
              <ScrollFillText>we probably have.</ScrollFillText>
            </h2>
            <p className="mt-7 max-w-sm leading-relaxed text-muted">
              The things people want to know before they send the first
              message. Anything not here, just ask us directly.
            </p>
          </div>

          <div className="border-t border-line-strong">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.question} y={14}>
                  <div className="border-b border-line-strong">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-5 py-7 text-left"
                    >
                      <span className="mt-1 font-mono text-[10px] tabular-nums text-accent-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-lg font-medium tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-xl">
                        {faq.question}
                      </span>
                      {/* Plus that becomes a minus — the horizontal bar
                          stays, the vertical one rotates away. */}
                      <span
                        aria-hidden="true"
                        className="relative mt-2 h-4 w-4 shrink-0 text-ink transition-colors duration-300 group-hover:text-accent"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-8 pl-11 leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}
