"use client";

import { useEffect, useRef, useState } from "react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { footerNav, nav, site } from "@/lib/content";
import type { Service } from "@/lib/content";

/**
 * Fixed translucent header.
 *
 * "Services" opens a panel listing all eight services. It opens on hover for
 * pointer users and on click/Enter for keyboard and touch, closes on Escape
 * or outside click, and the trigger carries aria-expanded so the state is
 * announced. Items stagger in with a transition-delay — transform and opacity
 * only, so the panel costs no layout.
 */
export function SiteHeader({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Escape closes; outside click closes.
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Small close delay so the pointer can travel from trigger to panel.
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bone/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-3 px-4 sm:px-5 md:px-10">
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap text-xs font-semibold tracking-[.06em] text-ink sm:text-base sm:tracking-[.16em]"
          aria-label={`${site.name} — back to top`}
        >
          {site.wordmark}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            "hasDropdown" in item && item.hasDropdown ? (
              <div
                key={item.href}
                ref={wrapRef}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpen(true);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-[.18em] text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M2 3.5 5 6.5 8 3.5" />
                  </svg>
                </button>

                {/* Panel. Kept mounted so the close transition can play. */}
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                  className={`absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-5 transition-all duration-300 ease-out ${
                    open
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_24px_60px_-20px_rgba(20,20,22,.28)]">
                    <div className="border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[.2em] text-faint">
                      What we do
                    </div>

                    <ul className="grid grid-cols-2 gap-px bg-line">
                      {services.map((service, i) => (
                        <li key={service.slug}>
                          <a
                            href="#capabilities"
                            onClick={() => setOpen(false)}
                            style={{
                              transitionDelay: open ? `${i * 28}ms` : "0ms",
                            }}
                            className={`group flex h-full items-start gap-3 bg-surface p-4 transition-all duration-300 hover:bg-accent ${
                              open
                                ? "translate-y-0 opacity-100"
                                : "translate-y-1 opacity-0"
                            }`}
                          >
                            <span className="mt-0.5 font-mono text-[10px] text-accent-deep group-hover:text-white/80">
                              {service.index}
                            </span>
                            <span className="text-sm font-medium leading-snug text-ink group-hover:text-white">
                              {service.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[.18em] text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* min-w-0 lets this flex item actually shrink below its content
            size instead of forcing the row to overflow — needed at the
            320px floor where wordmark + CTA + hamburger exceed the
            available width unless something is allowed to compress. */}
        <div className="flex min-w-0 shrink items-center gap-2 sm:shrink-0 sm:gap-5">
          <MagneticButton href="#contact" className="shrink-0">
            Get in touch
          </MagneticButton>

          {/* Mobile menu trigger — the desktop nav is hidden below md. */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.25 md:hidden"
          >
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-0.75 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-0.75 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile panel. Animates on max-height so it never shifts the page. */}
      <div
        className={`overflow-hidden border-t border-line bg-bone/95 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          {footerNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-3 text-xs uppercase tracking-[.18em] text-muted transition-colors last:border-0 hover:text-accent"
            >
              {item.label}
            </a>
          ))}

          <div className="mt-4 grid grid-cols-1 gap-px bg-line">
            {services.map((service) => (
              <a
                key={service.slug}
                href="#capabilities"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 bg-bone px-1 py-2.5 text-sm text-ink"
              >
                <span className="font-mono text-[10px] text-accent-deep">
                  {service.index}
                </span>
                {service.title}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
