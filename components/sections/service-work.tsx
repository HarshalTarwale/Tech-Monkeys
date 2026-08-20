import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { ProjectPanels } from "@/components/ui/project-panels";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import { SmartLink } from "@/components/ui/smart-link";
import type { Project } from "@/lib/content";

/**
 * Proof for this specific service — real, approved projects in its
 * category, as a two-up panel pair with a centred prev/next pill. Matches
 * the structure the client pointed at directly (a competitor's case-studies
 * section: two large image cards, name captioned below, arrows between
 * them) — see project-panels.tsx for what stands in for the photography we
 * don't have.
 *
 * Third version of this section. Reused `ProjectShowcase` (the homepage's
 * live-iframe carousel) verbatim first, which read as a smaller repeat of a
 * section already on the homepage; a plain large-type name list came next,
 * which read as too quiet. This is the one built directly off client
 * reference rather than another internal guess.
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
            <ProjectPanels projects={projects} />

            <div className="mt-14 text-center">
              <SmartLink
                href="/projects"
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase tracking-[.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                View all projects <Arrow spin />
              </SmartLink>
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
