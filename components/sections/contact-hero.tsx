import { MagneticButton } from "@/components/ui/magnetic-button";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { getAbout, getContactPage, site } from "@/lib/content";

/**
 * Contact-page opener.
 *
 * Plain server-rendered heading, no animation gating it — same LCP
 * discipline as every other hero on the site (AGENTS.md motion
 * constraints). The CTA row carries the two real, verifiable ways to reach
 * the studio right now: a mailto to `site.email` (no working form exists
 * yet — see the site-wide mailto pattern in header/about/footer) and the
 * studio's real location from `content/about.ts`, rather than a fabricated
 * office address or phone number.
 */
export function ContactHero() {
  const contact = getContactPage();
  const about = getAbout();

  return (
    <section className="grain relative overflow-hidden bg-bone pb-16 pt-32 md:pb-20 md:pt-40">
      <Shell className="relative px-5 md:px-10">
        <Eyebrow>{contact.eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,1.4rem+4.6vw,6rem)] font-black leading-[.92] tracking-[-.045em] text-ink">
          {contact.heading.lead}
          <br />
          {contact.heading.emphasis}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {contact.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <MagneticButton href={`mailto:${site.email}`} size="lg">
            Start a conversation
          </MagneticButton>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {site.email} <Arrow spin />
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[.2em] text-faint">
            {about.location}
          </span>
        </div>
      </Shell>
    </section>
  );
}
