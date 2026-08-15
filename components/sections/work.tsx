import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import type { Project, Segment } from "@/lib/content";

const SCALE_LABEL: Record<Segment, string> = {
  startups: "Startup",
  corporates: "Corporate",
  enterprises: "Enterprise",
};

/**
 * The work ledger: a dense, scannable table of delivered engagements.
 *
 * Server Component — no interactivity beyond links and CSS hover.
 * The table scrolls inside its own container below 760px so the page body
 * never scrolls horizontally.
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
          <div className="overflow-x-auto border-t border-line-strong">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[1.2fr_.7fr_1.4fr_.5fr_30px] gap-4 border-b border-line-strong py-4 font-mono text-[10px] uppercase tracking-[.16em] text-faint">
                <span>Partner</span>
                <span>Scale</span>
                <span>Mission</span>
                <span>Status</span>
                <span />
              </div>

              {projects.map((project) => (
                <a
                  key={project.slug}
                  href={project.url ?? "#contact"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noreferrer" : undefined}
                  className="group grid grid-cols-[1.2fr_.7fr_1.4fr_.5fr_30px] gap-4 border-b border-line-strong py-7 transition-colors hover:bg-accent hover:text-white"
                >
                  <strong className="font-medium text-ink group-hover:text-white">
                    {project.name}
                  </strong>
                  <span className="text-muted group-hover:text-white/85">
                    {SCALE_LABEL[project.segment]}
                  </span>
                  <span className="text-muted group-hover:text-white/85">
                    {project.sector}
                  </span>
                  <span className="font-mono text-xs uppercase text-accent-deep group-hover:text-white">
                    {project.status === "live" ? "Live" : project.status}
                  </span>
                  <Arrow spin className="text-faint group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          /* Publication gate: nothing is approved for public use yet. */
          <div className="border border-dashed border-line-strong p-10 text-center text-sm leading-relaxed text-faint">
            Case studies are being prepared for publication.
          </div>
        )}
      </Shell>
    </section>
  );
}
