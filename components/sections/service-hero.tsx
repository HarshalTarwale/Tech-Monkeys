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
      {/* Techy visual for the hero's right-side dead space: an abstract
          browser-window mockup — skeleton UI blocks, not a real screenshot
          of anything, so there's no claim being made about a specific
          site — built from the exact same dark chrome-bar language
          (traffic lights, mono address pill) as `ShowcaseFrame` in
          project-showcase.tsx, so it reads as this site's own browser
          motif rather than a generic stock graphic. Replaces the earlier
          `loop-mark` ring here, which this would have visually collided
          with at this size; loop-mark is still used as-is in
          capabilities.tsx.

          Shown from `xl` (1280px), not `lg` (1024px) like the ghost numeral
          above — that numeral is faint enough (3.5% opacity) to sit behind
          the paragraph text without being read as an overlap, but this is
          solid-coloured UI; at 1024px the paragraph's own max-w-2xl box
          genuinely runs underneath it (confirmed: the CTA button block sat
          directly on top of the word "visit" in the body copy). 1280px
          leaves roughly 160px of clear gap between the text column and the
          mockup's left edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden w-95 -translate-y-1/2 xl:right-16 xl:block"
      >
        {/* Secondary card, offset behind, for depth. */}
        <div className="absolute -right-8 -top-10 w-64 rotate-6 border border-line-strong bg-surface/90 shadow-lg">
          <div className="flex items-center gap-1.5 border-b border-line-strong px-3 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          </div>
          <div className="space-y-2 p-4">
            <div className="h-1.5 w-3/4 rounded-full bg-line-strong" />
            <div className="h-1.5 w-1/2 rounded-full bg-line-strong" />
            <div className="h-1.5 w-2/3 rounded-full bg-line-strong" />
          </div>
        </div>

        {/* Main window. */}
        <div className="relative -rotate-3 overflow-hidden border border-line-strong bg-surface shadow-2xl">
          <div className="flex items-center gap-3 bg-[#2a2a2e] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 truncate rounded-md bg-white/10 px-3 py-1.5 text-center font-mono text-[10px] text-white/50">
              yoursite.com
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-ink/70" />
              <div className="flex gap-2">
                <div className="h-2 w-8 rounded-full bg-line-strong" />
                <div className="h-2 w-8 rounded-full bg-line-strong" />
                <div className="h-2 w-8 rounded-full bg-line-strong" />
              </div>
            </div>
            <div className="mb-5 h-28 rounded-md bg-accent/10" />
            <div className="mb-2.5 h-2 w-full rounded-full bg-line-strong" />
            <div className="mb-5 h-2 w-2/3 rounded-full bg-line-strong" />
            <div className="h-7 w-24 rounded-full bg-accent" />
          </div>
        </div>
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
