import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { footerNav, site } from "@/lib/content";

/**
 * Closing CTA and footer. One action: start a conversation.
 */
export function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bone px-5 pb-10 pt-24 md:px-10 md:pt-32"
    >
      <Shell>
        <div className="border-l-2 border-accent pl-6 md:pl-12">
          <Eyebrow>04 / Start here</Eyebrow>
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

        <div className="mt-28 grid gap-8 border-t border-line-strong pt-7 text-sm text-muted md:grid-cols-3">
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
