import type { ReactNode } from "react";

/**
 * The `<main>` landmark every route renders its content into, below the
 * fixed header.
 *
 * This briefly wrapped a React `<ViewTransition>` that blurred and lifted
 * the page on navigation. That was removed once the reference the client
 * asked for was measured properly: it holds the outgoing page completely
 * still and lets a thin accent bar carry the movement instead (see
 * components/motion/nav-progress.tsx). The wrapper is kept because the
 * pages needed a main landmark regardless — they had none before.
 */
export function PageMain({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
