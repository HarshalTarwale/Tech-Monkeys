import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Shell } from "@/components/ui/shell";
import type { ServiceDetail } from "@/lib/content";

/**
 * "Technologies" — the page's second ink section, set against the light
 * sections either side so the stack reads as its own chapter.
 *
 * Each tool is a hairline cell showing its name as bold type rather than
 * its brand logomark. That's deliberate: reproducing a third party's
 * trademarked logo art isn't ours to use the way a client's own logo is in
 * a case study, and a wordmark cell gets the same "premium tool strip"
 * read with none of that exposure.
 *
 * A grid, not the horizontal carousel this replaced — eight items in a
 * side-scroller hides most of the stack behind an interaction, and the
 * point of the section is breadth at a glance.
 */
export function ServiceTechnologies({
  technologies,
}: {
  technologies: NonNullable<ServiceDetail["technologies"]>;
}) {
  return (
    <section
      id="service-technologies"
      className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-32"
    >
      {/* Accent bloom so the black reads as lit rather than flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-[110px]"
      />

      <Shell className="relative">
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <span className="font-mono text-[11px] uppercase tracking-[.2em] text-accent">
            03 / Technologies
          </span>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-white md:text-6xl">
              Built with tools,
              <br />
              <ScrollFillText tone="light">not lock-in.</ScrollFillText>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/55">
              We pick the stack around what your project actually has to do —
              and everything we build stays yours, on standards you could hand
              to any other team tomorrow.
            </p>
          </div>
        </div>

        <div className="grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, i) => (
            <Reveal key={tech.name} delay={(i % 4) * 0.06} y={16}>
              <div className="group h-full border-b border-r border-white/12 p-7 transition-colors duration-300 hover:bg-white/4">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/35">
                    {tech.category}
                  </span>
                  {/* Same hover-scale idiom as the "What's included" grid,
                      re-tuned for a dark background: z-10 so the enlarged
                      digit paints over neighbouring content instead of
                      being clipped by it. */}
                  <span className="relative z-10 inline-block origin-center font-mono text-[10px] tabular-nums text-accent transition-transform duration-500 ease-out group-hover:scale-[2]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-[-.02em] text-white transition-colors duration-300 group-hover:text-accent">
                  {tech.name}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  {tech.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
