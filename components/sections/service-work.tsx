import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Arrow, Eyebrow, Shell } from "@/components/ui/shell";
import type { Project, Segment } from "@/lib/content";

const SCALE_LABEL: Record<Segment, string> = {
  startups: "Startup",
  corporates: "Corporate",
  enterprises: "Enterprise",
};

/**
 * Proof for this specific service: real, approved projects in its category,
 * in the same dense ledger-row style as the homepage Work section — one
 * consistent "this is real, here's the link" pattern across the site rather
 * than a second bespoke case-study layout for service pages.
 *
 * `projects` is already gated through `getProjectsByCategory` in
 * lib/content.ts — nothing unapproved can reach this component.
 */
export function ServiceWork({ projects }: { projects: Project[] }) {
  return (
    <section
      id="service-work"
      className="border-b border-line bg-surface px-5 py-24 md:px-10 md:py-32"
    >
      <Shell>
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          <Eyebrow>03 / Selected work</Eyebrow>
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
            <div className="overflow-x-auto border-t border-line-strong">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[1.2fr_.7fr_1.4fr_30px] gap-4 border-b border-line-strong py-4 font-mono text-[10px] uppercase tracking-[.16em] text-faint">
                  <span>Partner</span>
                  <span>Scale</span>
                  <span>Sector</span>
                  <span />
                </div>

                {projects.map((project) => (
                  <a
                    key={project.slug}
                    href={project.url ?? "/#contact"}
                    target={project.url ? "_blank" : undefined}
                    rel={project.url ? "noreferrer" : undefined}
                    className="group grid grid-cols-[1.2fr_.7fr_1.4fr_30px] gap-4 border-b border-line-strong py-7 transition-colors hover:bg-accent hover:text-white"
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
                    <Arrow spin className="text-faint group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10">
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
