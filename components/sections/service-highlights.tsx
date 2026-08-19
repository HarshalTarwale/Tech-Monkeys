import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { getServiceIcon } from "@/components/ui/service-icons";
import type { ServiceDetail } from "@/lib/content";

/**
 * "What's included" — a bordered grid of the concrete things this service
 * covers, each led by a line icon from the shared set.
 *
 * Hairline borders rather than shadowed cards, matching the site's existing
 * grid language (the work ledger, the capabilities list) instead of adding
 * a third card style. Hover lifts the background to bone, scales the index
 * numeral and swings the icon to accent — the same restrained
 * numeral-goes-accent idiom used on the homepage capabilities rows, so a
 * hover here feels like the same site.
 */
export function ServiceHighlights({
  highlights,
}: {
  highlights: ServiceDetail["highlights"];
}) {
  return (
    <section
      id="service-highlights"
      className="border-y border-line bg-surface px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>01 / What&apos;s included</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              One service.
              <br />
              <ScrollFillText>Every way it shows up.</ScrollFillText>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Whatever shape your project takes, it comes out of the same team
              and the same standard of build.
            </p>
          </div>
        </div>

        <div className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, i) => {
            const Icon = getServiceIcon(highlight.title);
            return (
              <Reveal key={highlight.title} delay={(i % 3) * 0.08} y={16}>
                <div className="group h-full border-b border-r border-line-strong bg-surface p-8 transition-colors duration-300 hover:bg-bone">
                  <div className="flex items-start justify-between">
                    <Icon className="h-8 w-8 text-ink transition-colors duration-300 group-hover:text-accent" />
                    {/* z-10 so the scaled-up digit paints over the icon and
                        body copy rather than being clipped behind them. */}
                    <span className="relative z-10 inline-block origin-center font-mono text-[13px] text-accent-deep transition-[color,scale] duration-500 ease-out group-hover:scale-[2] group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-medium tracking-[-.01em] text-ink">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {highlight.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
