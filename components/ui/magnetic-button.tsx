"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

import { Arrow } from "@/components/ui/shell";

/**
 * Primary CTA with two effects layered:
 *
 *  1. Magnetic pull — the button drifts toward the cursor within its bounds.
 *  2. Fill sweep — an accent disc scales up from the bottom on hover while
 *     the label slides up and is replaced by a copy of itself.
 *
 * Both are pointer-driven and purely transform/opacity based, so there is no
 * layout shift. Magnetism is skipped entirely on coarse pointers and under
 * prefers-reduced-motion; the sweep degrades to a plain colour change via
 * the global reduced-motion rule.
 */
const SIZES = {
  // Header CTA scale.
  md: "h-10 gap-1.5 px-4 text-xs sm:h-11 sm:gap-2 sm:px-6 sm:text-sm",
  // Closing-CTA scale (contact section).
  lg: "h-12 gap-2 px-6 text-sm sm:h-14 sm:gap-2.5 sm:px-7 sm:text-base",
} as const;

/**
 * Ground the button sits on. `dark` is the ink pill used on the site's
 * light sections; `light` is its inverse, for the ink-background sections
 * on the service pages where an ink pill is very nearly invisible
 * (#141416 on #141416). The accent sweep is identical in both — only the
 * resting fill and label colour flip.
 */
const TONES = {
  dark: "bg-ink text-white",
  light: "bg-white text-ink group-hover:text-white",
} as const;

export function MagneticButton({
  href,
  children,
  className = "",
  size = "md",
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /**
   * Fixed size variants rather than free-form height/padding classes in
   * `className`. Tailwind resolves conflicting utilities (e.g. h-10 vs
   * h-14) by source order in the generated stylesheet, not by position in
   * the className string — passing a height override via className was
   * silently losing to the component's own h-10/h-11 (verified: rendered
   * at 44px regardless of an h-14 override). A variant prop sidesteps the
   * conflict entirely since only one size's classes are ever present.
   */
  size?: keyof typeof SIZES;
  /** Use "light" on ink/dark backgrounds. */
  tone?: keyof typeof TONES;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canPull = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!canPull() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    // Damped so the button never detaches from its slot.
    setOffset({ x: x * 0.25, y: y * 0.3 });
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className={`group relative inline-flex items-center overflow-hidden rounded-full font-medium transition-[transform,color] duration-300 ease-out ${TONES[tone]} ${SIZES[size]} ${className}`}
    >
      {/* Accent disc that sweeps up to fill the pill. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-full h-[220%] w-[140%] -translate-x-1/2 rounded-[50%] bg-accent transition-transform duration-500 ease-out group-hover:-translate-y-[62%]"
      />

      {/* Masked label: the original slides out, the clone slides in. */}
      <span className="relative z-10 grid overflow-hidden">
        <span className="col-start-1 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      <Arrow spin className="relative z-10" />
    </a>
  );
}
