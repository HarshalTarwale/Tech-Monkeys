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
export function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
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
      className={`group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-ink px-5 text-sm sm:px-6 font-medium text-white transition-transform duration-300 ease-out ${className}`}
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

      <Arrow className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
