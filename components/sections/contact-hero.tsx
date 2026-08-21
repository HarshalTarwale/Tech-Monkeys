import { ContactForm } from "@/components/sections/contact-form";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { getAbout, getContactPage, site } from "@/lib/content";

/**
 * Contact-page opener: heading on the left, the real enquiry form on the
 * right — the form is the primary action on this page, so it sits where a
 * visitor sees it without scrolling rather than further down the page.
 *
 * The heading itself stays plain server-rendered markup with no animation
 * gating it, same LCP discipline as every other hero on the site (AGENTS.md
 * motion constraints); `ContactForm` is the one client island here.
 *
 * The mailto link stays as a visible fallback, not a hidden option — the
 * form depends on `RESEND_API_KEY` being configured (see the TODO(client)
 * in app/api/contact/route.ts) and on JavaScript running at all, neither
 * guaranteed on day one.
 */
export function ContactHero() {
  const contact = getContactPage();
  const about = getAbout();

  return (
    <section className="grain relative overflow-hidden bg-bone pb-20 pt-32 md:pb-28 md:pt-40">
      <Shell className="relative px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>{contact.eyebrow}</Eyebrow>

            <h1 className="mt-6 text-[clamp(2.5rem,1.3rem+4.2vw,5.25rem)] font-black leading-[.94] tracking-[-.045em] text-ink">
              {contact.heading.lead}
              <br />
              {contact.heading.emphasis}
            </h1>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              {contact.intro}
            </p>

            <div className="mt-10 flex flex-col gap-3 border-t border-line-strong pt-7 lg:mt-24">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:text-accent"
              >
                {site.email} <Arrow spin />
              </a>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:text-accent"
              >
                {site.phone} <Arrow spin />
              </a>
              <span className="font-mono text-[11px] uppercase tracking-[.2em] text-faint">
                Or write directly, if you&apos;d rather · {about.location}
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </Shell>
    </section>
  );
}
