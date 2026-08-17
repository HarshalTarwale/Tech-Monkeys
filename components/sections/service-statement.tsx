import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Reveal } from "@/components/motion/reveal";
import { Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/**
 * Full-bleed ink section holding one pointed statement — the page's first
 * tonal break, dropped in right after the hero so the reader hits a change
 * of ground before the first content grid.
 *
 * The heading follows the exact same recipe every other section on this
 * page uses (plain line, then a short `ScrollFillText` line, then a
 * supporting paragraph) rather than wrapping a long paragraph in
 * `ScrollFillText`, which is what this section did originally. That first
 * version was the one thing on the page that didn't match its own site's
 * heading identity — sweeping a fill across three sentences of wrapped
 * body copy reads as a different component from "One service. / Every way
 * it shows up.", not a variant of it. Splitting the content into
 * lead/emphasis/support (content/types.ts) fixes that at the data level
 * instead of string-splitting a paragraph at render time.
 *
 * The site is light-first throughout; this and the technologies section are
 * the two deliberate dark moments, placed far enough apart that neither
 * reads as the page changing identity. The client asked for exactly this
 * ("you can use black bg in between or in any section if it looks good").
 */
export function ServiceStatement({
  statement,
}: {
  statement: ServiceDetail["statement"];
}) {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-32">
      {/* Accent bloom, keeping the black from reading as a flat void. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]"
      />

      <Shell className="relative">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[.2em] text-accent">
            The problem
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Same text-4xl/text-6xl scale every other section heading on
              this page uses — the earlier text-3xl/text-5xl was the one
              heading on the page at a different size for no reason. */}
          <h2 className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-.04em] text-white md:text-6xl">
            {statement.lead}
            <br />
            <ScrollFillText tone="light">{statement.emphasis}</ScrollFillText>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/55">
            {statement.support}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
