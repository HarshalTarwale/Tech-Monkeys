import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { ServiceMockup } from "@/components/ui/service-mockup";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { site } from "@/lib/content";
import type { Service, ServiceDetail } from "@/lib/content";

/**
 * Splits a service title into two lines for the hero heading — the first
 * ceil(n/2) words on line one, the rest on line two. Checked against all
 * ten real titles in content/services/index.ts, not just "Website Design &
 * Development": an even word-count split happens to land on a natural
 * break for every one of them (e.g. "Cloud, Hosting" / "& Support",
 * "Web Apps &" / "SaaS Platforms") without needing a per-service override.
 */
function splitTitle(title: string): [string, string] {
  const words = title.split(" ");
  const cut = Math.ceil(words.length / 2);
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
}

/**
 * Opening section of a service detail page (`/services/[slug]`).
 *
 * Two-column above `lg`: type on the left, a `ServiceMockup` on the right
 * filling what was previously dead space — a distinct illustration per
 * service (see service-mockup.tsx) rather than one generic graphic reused
 * across all ten pages. Below `lg` the mockup drops out entirely rather
 * than stacking — at that width it would push the CTAs below the fold for
 * no informational gain.
 *
 * No breadcrumb above the heading — dropped per client feedback, the
 * header's own "Services" dropdown already covers getting back. The
 * heading is two lines rather than three, with the second line set larger
 * than the first (client-specified, originally built for "Website Design"
 * / "& Development" specifically).
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
  const [titleLine1, titleLine2] = splitTitle(service.title);

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

            {/* The service page's own title is dynamic across ten services
                of very different lengths, so line two's clamp is tuned to
                the longest real second line in the set ("Digital
                Consulting", from "Strategic & Digital Consulting") rather
                than the original single-service "& Development" — that
                narrower clamp wrapped "Digital Consulting" onto an
                orphaned word at 1024px (confirmed by rendering it, the
                same class of bug the original heading split was fixed
                for). Verified clear at 1024/1280/1440 for every one of the
                ten titles, not just the longest. */}
            <h1 className="mt-6 font-black text-ink">
              <span className="block text-[clamp(2rem,0.9rem+3.6vw,3.75rem)] leading-none tracking-[-.04em]">
                {titleLine1}
              </span>
              <span className="mt-1 block text-[clamp(2.25rem,0.85rem+2.6vw,3.75rem)] leading-[.95] tracking-[-.045em]">
                {titleLine2}
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
            <ServiceMockup slug={service.slug} />
          </div>
        </div>
      </Shell>

      <Marquee items={detail.marquee} />
    </section>
  );
}
