import Link from "next/link";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { site } from "@/lib/content";
import type { Service } from "@/lib/content";

/**
 * Opening section of a service detail page (`/services/[slug]`).
 *
 * Deliberately smaller-scale than the homepage Hero — this is an inner page,
 * not the front door — but reuses the same visual vocabulary so it reads as
 * the same site: `grain` texture, `loop-mark`, and an oversized ghost index
 * numeral watermarking the section the way the division blocks watermark
 * their own oversized names. All decorative elements are `aria-hidden` and
 * static (no motion), so none of them can gate LCP — the heading and intro
 * are plain server-rendered text, visible on first paint.
 */
export function ServiceHero({ service, intro }: { service: Service; intro: string }) {
  return (
    <section className="grain relative overflow-hidden bg-bone px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
      {/* Ghost numeral watermark. Purely decorative, clipped by the section's
          own overflow-hidden so it can never push the page wider. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 hidden select-none text-[30rem] font-black leading-none text-ink/[.035] lg:block"
      >
        {service.index}
      </span>
      {/* .loop-mark sets its own `position: relative` as unlayered CSS in
          globals.css, which beats any Tailwind `absolute` utility applied to
          the same element regardless of class order — unlayered rules always
          win over `@layer` rules in the cascade. Positioning a wrapper
          around it, rather than positioning the marked element itself,
          sidesteps the conflict entirely. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-14 hidden h-28 w-28 lg:block"
      >
        <div className="loop-mark h-full w-full" />
      </div>

      <Shell className="relative">
        <Link
          href="/#capabilities"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-muted transition-colors hover:text-accent"
        >
          ← Services
        </Link>

        <Eyebrow className="mt-9">{service.index} / Services</Eyebrow>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.04em] text-ink md:text-6xl">
          {service.title}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>

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
      </Shell>
    </section>
  );
}
