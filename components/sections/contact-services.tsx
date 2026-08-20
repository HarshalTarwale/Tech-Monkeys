import { Reveal } from "@/components/motion/reveal";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { SmartLink } from "@/components/ui/smart-link";
import type { Service, ServiceCategory } from "@/lib/content";

/**
 * "Not sure where to start?" — every service, linking straight into its own
 * detail page. Gives a visitor who arrived on /contact without a clear ask
 * yet somewhere useful to go before they write the first message, instead
 * of a blank form asking them to already know what they want.
 *
 * `serviceDetailSlugs` marks which services have a written detail page —
 * same distinction the header's dropdown makes — so a service without one
 * falls back to the homepage capabilities anchor rather than a 404.
 */
export function ContactServices({
  services,
  serviceDetailSlugs,
}: {
  services: Service[];
  serviceDetailSlugs: ServiceCategory[];
}) {
  return (
    <section className="bg-bone px-5 py-24 md:px-10 md:py-32">
      <Shell>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Eyebrow>Not sure where to start?</Eyebrow>
          <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
            Pick what you
            <br />
            need built.
          </h2>
        </div>

        <div className="grid border-l border-t border-line-strong sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 0.08} y={16}>
              <SmartLink
                href={
                  serviceDetailSlugs.includes(service.slug)
                    ? `/services/${service.slug}`
                    : "/#capabilities"
                }
                className="group flex h-full items-start gap-5 border-b border-r border-line-strong bg-bone p-8 transition-colors duration-300 hover:bg-ink"
              >
                <span className="mt-1 font-mono text-[11px] text-accent-deep transition-colors duration-300 group-hover:text-accent">
                  {service.index}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/60">
                    {service.summary}
                  </p>
                </div>
                <Arrow
                  spin
                  className="mt-1 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
                />
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
