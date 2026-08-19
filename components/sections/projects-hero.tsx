import { Eyebrow, Shell } from "@/components/ui/shell";

/**
 * Opening block for /projects.
 *
 * The reference page opens on a very quiet "our work" + project count.
 * This keeps that restraint but scales the type to our own display setting,
 * since this page is a first impression in its own right — it's linked from
 * the homepage ledger and from every service page.
 *
 * `total` is the real count of publishable projects, passed in from the
 * page rather than hardcoded, so it can never drift from what the grid
 * below actually renders.
 *
 * Both heading lines are solid ink. The site's usual two-tone treatment
 * (second line in `--tm-faint`, as on the homepage and service pages) was
 * dropped here at the client's request — on this page the heading is the
 * only thing above the fold, so the greyed half read as washed out rather
 * than as a deliberate device.
 */
export function ProjectsHero({ total }: { total: number }) {
  return (
    <section className="grain relative overflow-hidden bg-bone pb-16 pt-32 md:pb-20 md:pt-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 hidden select-none text-[26rem] font-black leading-none text-ink/3 xl:block"
      >
        {String(total).padStart(2, "0")}
      </span>

      <Shell className="relative px-5 md:px-10">
        <Eyebrow>Our work</Eyebrow>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,1.4rem+4.6vw,6rem)] font-black leading-[.92] tracking-[-.045em] text-ink">
          Every project,
          <br />
          live and public.
        </h1>

        {/* Wording carries no "hover to preview" instruction: touch devices
            never get the hover embed, so the sentence would be wrong for
            every visitor on a phone. "Open any one" is true everywhere. */}
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          Not mockups or concept work. Every project below is a real site,
          running live right now — open any one and see for yourself.
        </p>
      </Shell>
    </section>
  );
}
