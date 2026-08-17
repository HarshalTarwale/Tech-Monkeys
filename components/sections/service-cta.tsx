import { MagneticButton } from "@/components/ui/magnetic-button";
import { Shell } from "@/components/ui/shell";
import { site } from "@/lib/content";

/**
 * Mid-page conversion break, between "Technologies" and "Selected work" —
 * a bordered, oversized-type block rather than a full colour-inverted
 * section. An accent-on-white highlighted word gives it the same
 * "premium moment" the reference page gets from a full dark CTA section,
 * without introducing a black/near-black background as a new page-level
 * treatment — this site stays light-first throughout, per the client's own
 * "according to our website theme and vibe" direction on the how-we-work
 * section, applied here too.
 *
 * No invented process claims ("book a 30-minute slot") — we don't run a
 * booking system, so the copy stays to what's actually true: send an email,
 * hear back with a scope.
 */
export function ServiceCta() {
  return (
    <section className="bg-bone px-5 py-20 md:px-10 md:py-28">
      <Shell>
        <div className="border-2 border-ink bg-surface px-8 py-16 text-center md:px-16 md:py-20">
          <p className="mx-auto max-w-2xl text-3xl font-black leading-[1.05] tracking-[-.03em] text-ink md:text-5xl">
            Know what you want to build?{" "}
            <span className="bg-accent px-3 text-white">Let&apos;s start.</span>
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
            Tell us about the site you need. We&apos;ll come back with a clear
            scope, not a sales pitch.
          </p>
          <div className="mt-9 flex justify-center">
            <MagneticButton href={`mailto:${site.email}`} size="lg">
              Start a project
            </MagneticButton>
          </div>
        </div>
      </Shell>
    </section>
  );
}
