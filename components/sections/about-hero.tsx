import { MagneticButton } from "@/components/ui/magnetic-button";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { getAbout, site } from "@/lib/content";

/**
 * About-page opener. Quiet by design — the stat band immediately below is
 * the loud moment, and two shouting sections back to back cancel out.
 *
 * Plain server-rendered text with no animation on the heading, so the LCP
 * element paints on first byte (motion constraints, AGENTS.md).
 */
export function AboutHero() {
  const about = getAbout();

  return (
    <section className="grain relative overflow-hidden bg-bone pb-20 pt-32 md:pb-24 md:pt-40">
      <Shell className="relative px-5 md:px-10">
        <Eyebrow>{about.eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,1.4rem+4.6vw,6rem)] font-black leading-[.92] tracking-[-.045em] text-ink">
          {about.heading.lead}
          <br />
          {about.heading.emphasis}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {about.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <MagneticButton href={`mailto:${site.email}`} size="lg">
            Talk to us
          </MagneticButton>
          <span className="font-mono text-[11px] uppercase tracking-[.2em] text-faint">
            {about.location}
          </span>
        </div>
      </Shell>
    </section>
  );
}
