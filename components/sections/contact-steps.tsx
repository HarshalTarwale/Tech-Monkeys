import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { ContactStep } from "@/content/contact";

/**
 * "What happens next" — three real steps, deliberately without a specific
 * turnaround promise (no "within 24 hours"). AGENTS.md rules out claiming
 * anything this repo can't verify, and a response-time SLA is exactly that
 * kind of claim.
 *
 * Same hairline-grid, numeral treatment as `about-principles.tsx`, so this
 * reads as the established site pattern for a numbered list rather than a
 * one-off layout.
 */
export function ContactSteps({ steps }: { steps: ContactStep[] }) {
  return (
    <section className="border-y border-line bg-surface px-5 py-24 md:px-10 md:py-32">
      <Shell>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>What happens next</Eyebrow>
          <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
            Three steps.
            <br />
            No account layer.
          </h2>
        </div>

        <div className="grid border-l border-t border-line-strong sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} y={16}>
              <div className="group h-full border-b border-r border-line-strong bg-surface p-8 transition-colors duration-300 hover:bg-bone">
                <span className="relative z-10 inline-block origin-center font-mono text-[13px] text-accent-deep transition-[color,scale] duration-500 ease-out group-hover:scale-[2] group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-lg font-medium tracking-[-.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
