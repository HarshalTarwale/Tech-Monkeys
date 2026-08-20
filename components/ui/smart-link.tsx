"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { NAV_START_EVENT } from "@/components/motion/nav-progress";

/**
 * One link component that picks the right element for the href, so the
 * choice can't drift per call site.
 *
 *   /route, /route#hash  -> next/link  (client navigation + progress bar)
 *   #hash                -> plain <a>  (same-page anchor, no navigation)
 *   mailto:, tel:, http  -> plain <a>  (external targets get rel/target)
 *
 * This exists because an audit found the opposite: every internal link on
 * the site except the header wordmark and the capabilities list was a
 * plain `<a href="/...">`. Those do a full cold page reload — the router
 * never runs, nothing is prefetched, and Lenis re-initialises every time.
 *
 * Internal links also announce themselves so `NavProgress` can run the
 * accent sweep across the top of the page. Announced on click rather than
 * via `useLinkStatus` because every route here is static and prefetched,
 * so a real pending state is almost always skipped — see nav-progress.tsx.
 */
export function SmartLink({
  href,
  children,
  transitionTypes,
  onClick,
  ...props
}: {
  href: string;
  children: ReactNode;
  transitionTypes?: string[];
} & Omit<ComponentProps<"a">, "href">) {
  const isInternal = href.startsWith("/");
  const isExternal = /^(https?:)?\/\//.test(href);

  if (isInternal) {
    return (
      <Link
        href={href}
        transitionTypes={transitionTypes}
        onClick={(event) => {
          onClick?.(event);
          // Skip the sweep for anything that isn't a plain left-click
          // navigating this tab — ctrl/cmd/shift-click and middle-click
          // open a new tab, so the current page never actually leaves.
          if (
            event.defaultPrevented ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          ) {
            return;
          }
          window.dispatchEvent(new CustomEvent(NAV_START_EVENT));
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
