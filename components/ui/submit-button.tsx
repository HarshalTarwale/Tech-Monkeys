"use client";

import { useRef, useState } from "react";

import { Arrow } from "@/components/ui/shell";

/**
 * `MagneticButton`'s magnetic-pull + fill-sweep, adapted to a real
 * `<button type="submit">` rather than an anchor — the form needs to
 * participate in native submit/disabled semantics, which an `<a>` can't.
 * Kept as its own small component instead of reworking `MagneticButton`
 * into a polymorphic anchor-or-button: the two have different event
 * signatures (`onClick` vs form submission, `disabled` vs none) and every
 * existing `MagneticButton` call site is a real link that should keep
 * working exactly as it does today.
 */
export function SubmitButton({
  pending,
  children,
  pendingLabel = "Sending…",
}: {
  pending: boolean;
  children: string;
  pendingLabel?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canPull = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMove(event: React.MouseEvent<HTMLButtonElement>) {
    if (pending || !canPull() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.25, y: y * 0.3 });
  }

  const label = pending ? pendingLabel : children;

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-full bg-ink px-7 text-base font-medium text-white transition-[transform,opacity] duration-300 ease-out disabled:opacity-70"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-full h-[220%] w-[140%] -translate-x-1/2 rounded-[50%] bg-accent transition-transform duration-500 ease-out group-hover:-translate-y-[62%]"
      />

      <span className="relative z-10 grid overflow-hidden">
        <span
          key={label}
          className="col-start-1 row-start-1 flex items-center gap-2"
        >
          {pending && (
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}
          {label}
        </span>
      </span>

      {!pending && <Arrow spin className="relative z-10" />}
    </button>
  );
}
