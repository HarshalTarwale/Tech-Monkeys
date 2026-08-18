import { WorkGrid } from "@/components/sections/work-grid";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Eyebrow, Shell } from "@/components/ui/shell";
import type { Project } from "@/lib/content";

/**
 * Homepage work section: three live project tiles laid out two-up then
 * one-wide, closing on a CTA into the full project index.
 *
 * Replaced a dense five-row ledger table. The table was scannable but flat
 * — it described the work in text without ever showing it. The tiles carry
 * a live embed of each real site (see components/ui/project-tile.tsx), so
 * the section now demonstrates the work instead of listing it, and matches
 * how /projects presents the same projects.
 *
 * Still a highlight reel, not a catalogue: `getFeaturedProjects(3)` in
 * app/page.tsx curates which three, and "View all projects" carries the
 * visitor to the full, filterable index.
 *
 * Server Component. The two client islands are `WorkGrid` (live embeds and
 * the cursor bubble) and `MagneticButton`; the heading and copy render on
 * the server.
 */
export function Work({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      className="border-y border-line bg-surface px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          <Eyebrow>03 / Selected work</Eyebrow>
          <div>
            <h2 className="text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              Work, documented.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              Engagements across property, retail, hospitality and operations —
              each one live, and each one built by the same team.
            </p>
          </div>
        </div>

        {projects.length > 0 ? (
          <>
            <WorkGrid projects={projects} />

            <div className="mt-16 flex justify-center">
              <MagneticButton href="/projects" size="lg">
                View all projects
              </MagneticButton>
            </div>
          </>
        ) : (
          /* Publication gate: nothing is approved for public use yet. Still
             offer the full list — it may already have more than this
             homepage highlight reel does. */
          <div className="border-t border-line-strong pt-14 text-center">
            <p className="text-sm leading-relaxed text-faint">
              Case studies are being prepared for publication.
            </p>
            <MagneticButton href="/projects" size="lg" className="mt-8">
              View all projects
            </MagneticButton>
          </div>
        )}
      </Shell>
    </section>
  );
}
