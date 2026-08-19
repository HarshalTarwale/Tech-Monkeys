import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { footerNav, site } from "@/lib/content";

/**
 * Closing CTA and footer. One action: start a conversation.
 *
 * `showCta` exists because the service detail pages close on their own
 * dedicated CTA section immediately above this one. Rendering both would
 * put two large "get in touch" blocks back to back — and two competing
 * eyebrows ("Next step" then "04 / Start here", the latter also colliding
 * with the service page's own 01-05 section numbering). Service pages pass
 * `showCta={false}` and get the footer only; the homepage keeps the full
 * block and is unchanged.
 */
export function Contact({
  showCta = true,
  ctaEyebrow = "04 / Start here",
}: {
  showCta?: boolean;
  /**
   * The homepage numbers this as its fourth section; pages with a
   * different section count reusing the CTA (e.g. /contact) pass their
   * own label rather than showing a number that doesn't apply.
   */
  ctaEyebrow?: string;
}) {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bone px-5 pb-10 pt-24 md:px-10 md:pt-32"
    >
      <Shell>
        {showCta && (
          <div className="border-l-2 border-accent pl-6 md:pl-12">
            <Eyebrow>{ctaEyebrow}</Eyebrow>
            <h2 className="mt-7 max-w-5xl text-5xl font-black leading-[.95] tracking-[-.055em] text-ink md:text-8xl">
              Move quickly.
              <br />
              {/* Final section: the page stops scrolling while this is still
                  mid-screen, so the sweep is anchored to the real remaining
                  scroll distance instead of a fixed viewport offset. */}
              <ScrollFillText anchor="end">
                Build something that lasts.
              </ScrollFillText>
            </h2>
            {/* Same magnetic-pull + fill-sweep treatment as the header's
                "Get in touch", at the "lg" size variant for this section's
                larger scale. */}
            <MagneticButton
              href={`mailto:${site.email}`}
              size="lg"
              className="mt-10"
            >
              Start a conversation
            </MagneticButton>
          </div>
        )}

        <div
          className={`grid gap-8 border-t border-line-strong pt-7 text-sm text-muted md:grid-cols-3 ${
            showCta ? "mt-28" : ""
          }`}
        >
          <div>
            <span className="font-medium text-ink">{site.wordmark}.</span>
            <br />
            {site.tagline}
            <br />
            {site.location}
          </div>

          <div className="md:text-center">
            {footerNav.map((item, i) => (
              <span key={item.href}>
                {i > 0 && " · "}
                <a href={item.href} className="hover:text-accent">
                  {item.label}
                </a>
              </span>
            ))}
          </div>

          <div className="md:text-right">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
            <br />
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
