import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { AboutPrinciple } from "@/content/about";

/**
 * "How we work" principles grid.
 *
 * This occupies the slot the reference gives to a leadership team — eight
 * named people with photos and job titles. We have no names, roles or
 * headcount for Tech Monkeys, and inventing an org chart is exactly what
 * AGENTS.md rules out, so this answers the same underlying question ("who
 * would I actually be dealing with?") through how the studio operates
 * rather than through invented faces.
 *
 * Same hairline grid and numeral-scales-on-hover treatment as the service
 * pages' "What's included", so it reads as an established site pattern.
 */
export function AboutPrinciples({ principles }: { principles: AboutPrinciple[] }) {
  return (
    <section className="bg-bone px-5 py-24 md:px-10 md:py-32">
      <Shell>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>02 / How we work</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              Six things we
              <br />
              <ScrollFillText>do not compromise on.</ScrollFillText>
            </h2>
          </div>
        </div>

        <div className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 3) * 0.08} y={16}>
              <div className="group h-full border-b border-r border-line-strong bg-bone p-8 transition-colors duration-300 hover:bg-surface">
                <span className="relative z-10 inline-block origin-center font-mono text-[13px] text-accent-deep transition-[color,scale] duration-500 ease-out group-hover:scale-[2] group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-lg font-medium tracking-[-.01em] text-ink">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
