import { BrowserMockup } from "@/components/ui/browser-mockup";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { site } from "@/lib/content";
import type { Service, ServiceDetail } from "@/lib/content";

/**
 * Opening section of a service detail page (`/services/[slug]`).
 *
 * Two-column above `lg`: type on the left, the drifting browser-window
 * stack on the right filling what was previously dead space. Below `lg`
 * the mockup drops out entirely rather than stacking — at that width it
 * would push the CTAs below the fold for no informational gain.
 *
 * No breadcrumb above the heading — dropped per client feedback, the
 * header's own "Services" dropdown already covers getting back. The
 * heading itself is two lines rather than three, with the second line set
 * larger than the first (client-specified): "Website Design" reads as the
 * setup, "& Development" as the payoff, so it earns the bigger size rather
 * than following a strict top-to-bottom size decrescendo the way the old
 * three-line version did.
 *
 * The heading and intro are plain server-rendered text with no animation
 * on them at all, so the LCP element is painted on first byte; every
 * moving part (the mockup's float, the marquee) is decorative and sits
 * outside that path, per the motion constraints in AGENTS.md.
 */
export function ServiceHero({
  service,
  detail,
}: {
  service: Service;
  detail: ServiceDetail;
}) {
  return (
    <section className="grain relative overflow-hidden bg-bone pt-28 md:pt-36">
      {/* Ghost numeral watermark, clipped by the section's own
          overflow-hidden so it can never widen the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 hidden select-none text-[26rem] font-black leading-none text-ink/3 xl:block"
      >
        {service.index}
      </span>

      <Shell className="relative px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Eyebrow>{service.index} / Services</Eyebrow>

            <h1 className="mt-6 font-black text-ink">
              <span className="block text-[clamp(2rem,0.9rem+3.6vw,3.75rem)] leading-none tracking-[-.04em]">
                Website Design
              </span>
              <span className="mt-1 block text-[clamp(2.5rem,1rem+3.4vw,4.5rem)] leading-[.9] tracking-[-.045em]">
                &amp; Development
              </span>
            </h1>

            {/* Accent-block treatment reused from the homepage hero's
                segment word, so the two pages share one highlight idiom. */}
            <p className="mt-8">
              <span className="inline-block bg-accent px-3 py-1.5 text-base font-semibold tracking-[-.01em] text-white md:text-lg">
                {detail.tagline}
              </span>
            </p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {detail.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <MagneticButton href={`mailto:${site.email}`} size="lg">
                Start a project
              </MagneticButton>
              <a
                href="#service-work"
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                See the work <Arrow spin />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <BrowserMockup />
          </div>
        </div>
      </Shell>

      <Marquee items={detail.marquee} />
    </section>
  );
}
