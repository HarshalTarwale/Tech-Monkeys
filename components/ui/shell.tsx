import type { ReactNode } from "react";

/** Max-width container used by every section. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell ${className}`}>{children}</div>
  );
}

/** Mono label that sits above every section heading. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

/** Small bordered capability tag on project cards. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-line-strong px-2 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-muted transition-colors group-hover:border-white/40 group-hover:text-white">
      {children}
    </span>
  );
}

/** Arrow glyph used on links and cards. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
