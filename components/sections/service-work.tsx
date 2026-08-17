import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import type { Project } from "@/lib/content";

/**
 * Proof for this specific service — real, approved projects in its
 * category, shown in the same interactive live-site carousel already built
 * for the homepage divisions (`ProjectShowcase`: real embedded iframes in
 * browser chrome, hover-to-activate, direction-aware deal transition).
 *
 * Replaces an earlier plain ledger-table version. The client asked for
 * image-rich case studies, matching a reference agency site's visual card
 * carousel; reusing `ProjectShowcase` gets a genuinely richer, more
 * "premium" presentation for free, and reuses already-verified
 * infrastructure rather than adding new imagery — the previews are the
 * actual live sites, not screenshots, so there's nothing to fabricate or
 * keep in sync.
 *
 * `projects` is already gated through `getProjectsByCategory` in
 * lib/content.ts — nothing unapproved can reach this component.
 */
export function ServiceWork({ projects }: { projects: Project[] }) {
  return (
    <section
      id="service-work"
      className="border-b border-line bg-bone px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          <Eyebrow>04 / Selected work</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              Not a concept.
              <br />
              <ScrollFillText>Live, in this category.</ScrollFillText>
            </h2>
          </div>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="mx-auto max-w-3xl">
              <ProjectShowcase projects={projects} />
            </div>

            <div className="mt-14 text-center">
              <a
                href="/projects"
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                View all projects <Arrow spin />
              </a>
            </div>
          </>
        ) : (
          <div className="border-t border-line-strong pt-14 text-center">
            <p className="text-sm leading-relaxed text-faint">
              Case studies for this service are being prepared for publication.
            </p>
          </div>
        )}
      </Shell>
    </section>
  );
}
