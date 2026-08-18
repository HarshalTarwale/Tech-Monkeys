"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { useMounted } from "@/components/motion/use-mounted";
import type { ServiceCategory } from "@/lib/content";

/**
 * Decorative, service-specific illustration for the hero's right column.
 *
 * Replaces a single generic browser-window mockup that was identical on
 * every service page — the client's complaint was that the hero didn't
 * feel tied to the specific service. The fix isn't real photography or
 * stock imagery: we can't pull images off the internet into a client's
 * commercial site without a license (a real legal exposure, not a style
 * preference), and generic "tech" stock photography would have
 * undercut the honesty this whole build is based on anyway. Instead each
 * service gets its own abstract skeleton-UI content inside the same
 * browser-chrome frame already established for "web" — recognisable at a
 * glance (a chat thread for AI, a kanban board for consulting, a play
 * button for video) without claiming to be a screenshot of anything real.
 *
 * `useMounted()` + `reduced` gate every animated prop, not just `reduced`
 * alone — see the doc comment on `useMounted` for the full mechanism this
 * avoids (a real hydration mismatch, confirmed via a non-minified diff,
 * from an earlier version of this component that mounted an animated
 * element based on `reduced` directly).
 */
export function ServiceMockup({ slug }: { slug: ServiceCategory }) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animated = mounted && !reduced;
  const variant = VARIANTS[slug] ?? VARIANTS.web;

  const float = (distance: number, duration: number) =>
    !animated
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-115 w-full select-none"
    >
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      {variant.tags.map((tag, i) => (
        <motion.span
          key={tag}
          {...float(8 + i, 5.5 + i)}
          className={`absolute z-20 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-md ${TAG_POSITIONS[i]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {tag}
        </motion.span>
      ))}

      <motion.div
        {...float(10, 7)}
        className="absolute right-0 top-8 w-56 rotate-6 border border-line-strong bg-surface/80 shadow-lg backdrop-blur-sm"
      >
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
      </motion.div>

      {/* Main window — chrome shared across every service, content swaps. */}
      <motion.div
        {...float(16, 6)}
        className="absolute left-0 top-16 w-88 -rotate-3 overflow-hidden border border-line-strong bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 bg-[#2a2a2e] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white/10 px-3 py-1.5 text-center font-mono text-[10px] text-white/50">
            {variant.address}
          </div>
        </div>
        <div className="relative p-6">{variant.content}</div>
      </motion.div>

      {/* Bottom-left card — code, phone, or a second content block,
          depending on the service. */}
      <motion.div {...float(12, 8)} className="absolute bottom-2 left-6">
        {variant.footer}
      </motion.div>
    </div>
  );
}

const TAG_POSITIONS = ["left-0 top-0", "right-24 top-24"];

/* --- Shared inner building blocks, styled to match the rest of the site. */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`h-2 rounded-full bg-line-strong ${className}`} />;
}

function Dot({ className = "" }: { className?: string }) {
  return <span className={`h-2 w-2 rounded-full ${className}`} />;
}

function CodeCard() {
  return (
    <div className="w-52 -rotate-2 overflow-hidden rounded-lg border border-black/20 bg-[#1c1c1f] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="space-y-1.5 p-3.5 font-mono text-[10px] leading-relaxed">
        <div>
          <span className="text-accent">function</span>{" "}
          <span className="text-white/80">build</span>
          <span className="text-white/40">() {"{"}</span>
        </div>
        <div className="pl-3 text-white/60">
          return <span className="text-white/80">&lt;Site</span>{" "}
          <span className="text-accent">fast</span> /&gt;
        </div>
        <div className="text-white/40">{"}"}</div>
      </div>
    </div>
  );
}

function PhoneCard() {
  return (
    <div className="w-28 rotate-3 overflow-hidden rounded-xl border-4 border-ink bg-surface shadow-2xl">
      <div className="flex justify-center bg-ink pb-1.5">
        <span className="h-1 w-8 rounded-full bg-white/30" />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-10 rounded bg-accent/15" />
        <Bar className="w-full" />
        <Bar className="w-2/3" />
        <div className="h-4 w-14 rounded-full bg-accent" />
      </div>
    </div>
  );
}

interface Variant {
  address: string;
  tags: [string, string];
  content: ReactNode;
  footer: ReactNode;
}

const VARIANTS: Record<ServiceCategory, Variant> = {
  web: {
    address: "yoursite.com",
    tags: ["SEO ready", "Fast by default"],
    content: (
      <>
        <div className="mb-6 flex items-center justify-between">
          <Bar className="w-16 bg-ink/70" />
          <div className="flex gap-2">
            <Bar className="w-8" />
            <Bar className="w-8" />
            <Bar className="w-8" />
          </div>
        </div>
        <div className="mb-5 h-28 rounded-md bg-accent/10" />
        <Bar className="mb-2.5 w-full" />
        <Bar className="mb-5 w-2/3" />
        <CtaWithCursor />
      </>
    ),
    footer: <CodeCard />,
  },

  mobile: {
    address: "App Store",
    tags: ["iOS & Android", "Offline-ready"],
    content: (
      <>
        <div className="mb-5 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-accent/15" />
          <div className="flex-1">
            <Bar className="mb-1.5 w-3/4" />
            <Bar className="w-1/2 bg-line" />
          </div>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-3 flex items-center gap-3">
            <Dot className="bg-accent/40" />
            <Bar className={i === 1 ? "w-2/3" : "w-4/5"} />
          </div>
        ))}
        <div className="mt-6 flex justify-between border-t border-line pt-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${i === 0 ? "bg-accent" : "bg-line-strong"}`}
            />
          ))}
        </div>
      </>
    ),
    footer: <PhoneCard />,
  },

  ecommerce: {
    address: "shop.yoursite.com",
    tags: ["Secure checkout", "Live inventory"],
    content: (
      <>
        <div className="mb-5 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="mb-2 aspect-square rounded-md bg-accent/10" />
              <Bar className="mb-1.5 w-3/4" />
              <Bar className="w-1/3 bg-line" />
            </div>
          ))}
        </div>
        <div className="h-7 w-24 rounded-full bg-accent" />
      </>
    ),
    footer: (
      <div className="w-40 -rotate-2 border border-line-strong bg-surface p-3.5 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">Cart</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
            3
          </span>
        </div>
        <Bar className="mb-1.5 w-full" />
        <Bar className="w-2/3" />
      </div>
    ),
  },

  platforms: {
    address: "app.yoursite.com",
    tags: ["Role-based access", "Real-time data"],
    content: (
      <div className="flex gap-4">
        <div className="flex shrink-0 flex-col gap-2.5 border-r border-line pr-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-6 w-6 rounded-md ${i === 0 ? "bg-accent/20" : "bg-line-strong/60"}`}
            />
          ))}
        </div>
        <div className="flex-1">
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border border-line-strong p-2">
                <Bar className="mb-1.5 w-1/2 bg-ink/70" />
                <Bar className="w-3/4" />
              </div>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {[40, 65, 45, 80, 55, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-accent/25"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    footer: <CodeCard />,
  },

  ai: {
    address: "assistant.yoursite.com",
    tags: ["Always learning", "Human in the loop"],
    content: (
      <>
        <div className="mb-4 flex justify-start">
          <div className="max-w-[70%] rounded-2xl rounded-bl-sm bg-bone px-3.5 py-2.5">
            <Bar className="mb-1.5 w-24" />
            <Bar className="w-16" />
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-accent/15 px-3.5 py-2.5">
            <Bar className="w-20 bg-accent/40" />
          </div>
        </div>
        <div className="mb-6 flex justify-start">
          <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-bone px-3.5 py-2.5">
            <Bar className="mb-1.5 w-28" />
            <Bar className="mb-1.5 w-24" />
            <Bar className="w-14" />
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line-strong px-3 py-2">
          <Bar className="flex-1 bg-line" />
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M2 21 23 12 2 3v7l15 2-15 2Z" />
            </svg>
          </div>
        </div>
      </>
    ),
    footer: <CodeCard />,
  },

  brand: {
    address: "brand.yoursite.com",
    tags: ["One system", "Every touchpoint"],
    content: (
      <>
        <div className="mb-6 flex gap-2">
          <div className="h-14 flex-1 rounded-md bg-ink" />
          <div className="h-14 flex-1 rounded-md bg-accent" />
          <div className="h-14 flex-1 rounded-md bg-accent/40" />
          <div className="h-14 flex-1 rounded-md border border-line-strong bg-bone" />
        </div>
        <div className="mb-5 text-5xl font-black leading-none tracking-[-.03em] text-ink">
          Aa
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full border-2 border-ink" />
          <div className="-ml-4 h-9 w-9 rounded-md bg-accent" />
        </div>
      </>
    ),
    footer: (
      <div className="w-48 -rotate-2 border border-line-strong bg-surface p-4 shadow-2xl">
        <span className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">Guidelines</span>
        <Bar className="mb-1.5 mt-2 w-full" />
        <Bar className="w-3/4" />
      </div>
    ),
  },

  seo: {
    address: "yoursite.com",
    tags: ["Search visibility", "Core Web Vitals"],
    content: (
      <>
        <div className="mb-5 flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-faint" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M20 20 15 15" />
          </svg>
          <Bar className="flex-1 bg-line" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-3.5 border-b border-line pb-3.5 last:border-0">
            <Bar className={`mb-1.5 bg-accent-deep/50 ${i === 0 ? "w-2/3" : "w-1/2"}`} />
            <Bar className="mb-1.5 w-1/3 bg-line" />
            <Bar className="w-full" />
          </div>
        ))}
      </>
    ),
    footer: (
      <div className="w-40 -rotate-2 border border-line-strong bg-surface p-3.5 shadow-2xl">
        <span className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">Ranking</span>
        <div className="mt-2 flex h-10 items-end gap-1">
          {[30, 45, 40, 60, 75, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-accent/30" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },

  cloud: {
    address: "status.yoursite.com",
    tags: ["99.9% uptime", "Edge delivery"],
    content: (
      <>
        <div className="mb-5 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 border border-line-strong px-3 py-2.5">
              <Dot className="bg-[#28c840]" />
              <Bar className="flex-1" />
              <span className="font-mono text-[9px] text-faint">OK</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i % 3 === 0 ? "bg-accent/50" : "bg-line-strong"}`} />
          ))}
        </div>
      </>
    ),
    footer: (
      <div className="w-40 -rotate-2 border border-line-strong bg-surface p-3.5 shadow-2xl">
        <span className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">Uptime</span>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line-strong">
          <div className="h-full w-[99%] rounded-full bg-accent" />
        </div>
      </div>
    ),
  },

  consulting: {
    address: "roadmap.yoursite.com",
    tags: ["Clear roadmap", "No guesswork"],
    content: (
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Now", n: 1 },
          { label: "Next", n: 2 },
          { label: "Later", n: 1 },
        ].map((col) => (
          <div key={col.label}>
            <span className="font-mono text-[9px] uppercase tracking-[.14em] text-faint">
              {col.label}
            </span>
            <div className="mt-2 space-y-2">
              {Array.from({ length: col.n }).map((_, i) => (
                <div key={i} className="border border-line-strong bg-bone p-2.5">
                  <Bar className="mb-1.5 w-full" />
                  <Bar className="w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="w-48 -rotate-2 border border-line-strong bg-surface p-4 shadow-2xl">
        <div className="relative h-1 w-full rounded-full bg-line-strong">
          <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-accent" />
          {[0, 33, 66, 100].map((pos) => (
            <span
              key={pos}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-surface bg-accent"
              style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>
      </div>
    ),
  },

  video: {
    address: "yoursite.com/film",
    tags: ["Shot & edited", "Story-first"],
    content: (
      <>
        <div className="relative mb-4 flex h-32 items-center justify-center rounded-md bg-ink">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#141416" aria-hidden="true">
              <path d="M6 4v16l14-8Z" />
            </svg>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-strong">
            <div className="h-full w-2/5 rounded-full bg-accent" />
          </div>
          <span className="font-mono text-[9px] text-faint">01:12</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-6 flex-1 rounded-sm bg-accent/10" />
          ))}
        </div>
      </>
    ),
    footer: <CodeCard />,
  },
};

function CtaWithCursor() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animated = mounted && !reduced;

  return (
    <div className="relative inline-block">
      <div className="h-7 w-24 rounded-full bg-accent" />
      <span className="absolute -bottom-2 -right-3 text-ink">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M1 1l5.2 13.2 2-5 5-2z" />
        </svg>
      </span>
      {animated && (
        <motion.span
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute -bottom-1 -right-2 h-3 w-3 rounded-full bg-accent"
        />
      )}
    </div>
  );
}
