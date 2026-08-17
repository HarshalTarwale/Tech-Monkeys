import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/**
 * "What's included" grid on a service detail page.
 *
 * A bordered grid (spreadsheet-style hairlines, not cards with shadows)
 * matching the site's existing hairline-border language rather than
 * introducing a new visual pattern for one page. Hover only darkens the
 * background and scales the index numeral — the same restrained treatment
 * as the homepage capabilities list, so hovering here doesn't feel like a
 * different component from the rest of the site.
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
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          <Eyebrow>01 / What&apos;s included</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              One service.
              <br />
              <ScrollFillText>Every way it shows up.</ScrollFillText>
            </h2>
          </div>
        </div>

        <div className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, i) => (
            <div
              key={highlight.title}
              className="group border-b border-r border-line-strong bg-surface p-7 transition-colors duration-300 hover:bg-bone"
            >
              <span className="inline-block origin-left font-mono text-[13px] text-accent-deep transition-[color,scale] duration-300 ease-out group-hover:scale-[1.3] group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-[-.01em] text-ink">
                {highlight.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {highlight.body}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
