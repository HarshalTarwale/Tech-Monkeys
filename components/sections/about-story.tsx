import { Reveal } from "@/components/motion/reveal";
import { ScrollFillText } from "@/components/motion/scroll-fill-text";
import { Eyebrow, Shell } from "@/components/ui/shell";
import { getAbout } from "@/lib/content";

/**
 * "Who we are" narrative.
 *
 * Sticky left panel, scrolling copy on the right — the same shape as the
 * homepage capabilities section and the service pages' process list, so the
 * page reads as part of this site rather than a one-off layout.
 *
 * The reference opens its equivalent section with a founding date and
 * founder names. We have neither on record for Tech Monkeys, so this leads
 * on the studio's actual operating model instead — a claim the client can
 * stand behind without a fabricated origin story.
 */
export function AboutStory() {
  const about = getAbout();

  return (
    <section className="border-y border-line bg-surface px-5 py-24 md:px-10 md:py-32">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow>01 / Who we are</Eyebrow>
            <h2 className="mt-7 text-4xl font-black tracking-[-.04em] text-ink md:text-6xl">
              {about.story.lead}
              <br />
              <ScrollFillText>{about.story.emphasis}</ScrollFillText>
            </h2>
          </div>

          <div className="space-y-8">
            {about.story.paragraphs.map((para, i) => (
              <Reveal key={para.slice(0, 32)} delay={i * 0.08} y={18}>
                <p
                  className={
                    i === 0
                      ? "text-xl leading-relaxed text-ink md:text-2xl"
                      : "text-lg leading-relaxed text-muted"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
