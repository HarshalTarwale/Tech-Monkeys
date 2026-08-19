import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Arrow, Shell } from "@/components/ui/shell";
import { site } from "@/lib/content";

/**
 * Closing conversion block for a service page, sitting between the work
 * and the site footer.
 *
 * Full-bleed ink with an accent bloom and a grain overlay — the loudest
 * moment on the page, deliberately, because it's the last thing before the
 * footer's quieter sign-off.
 *
 * Copy claims nothing we don't do. The reference page offers a "30 minute
 * slot with one of our experts" backed by a booking system; we have no such
 * system, so this promises the thing we can actually honour — send a
 * message, get a written scope back.
 */
export function ServiceCta() {
  return (
    <section className="grain relative overflow-hidden bg-ink px-5 py-28 md:px-10 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
      />

      <Shell className="relative">
        <div className="max-w-4xl">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[.2em] text-accent">
              Next step
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-8 text-[clamp(2.25rem,1.1rem+4vw,4.5rem)] font-black leading-[.95] tracking-[-.045em] text-white">
              Got a site that
              <br />
              needs to{" "}
              <span className="inline-block bg-accent px-3 text-white">
                work harder
              </span>
              ?
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-9 max-w-lg text-lg leading-relaxed text-white/55">
              Tell us what you&apos;re building and what it has to achieve.
              You&apos;ll get a straight answer on scope, timeline and cost —
              not a sales pitch.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              {/* tone="light" — an ink pill on an ink background is very
                  nearly invisible (measured #141416 on #141416). Routes to
                  the real form at /contact rather than straight to mailto:
                  the small text link beside it is the direct-email
                  fallback, same split as contact-hero.tsx. */}
              <MagneticButton href="/contact" size="lg" tone="light">
                Start a project
              </MagneticButton>

              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-white/70 transition-colors hover:border-accent hover:text-accent"
              >
                {site.email} <Arrow spin />
              </a>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
