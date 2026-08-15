/**
 * Infinite logo band.
 *
 * The track is rendered twice and translated -50%, so the loop is seamless
 * with no JS. Width comes from `w-max`, so it reserves its own height and
 * causes zero layout shift. Stops entirely under prefers-reduced-motion
 * (see globals.css).
 */
export function Marquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const track = [...items, ...items];

  return (
    <div className="relative z-10 mt-14 overflow-hidden border-y border-line py-4">
      <div className="animate-marquee flex w-max gap-0 whitespace-nowrap text-lg font-semibold uppercase tracking-[.08em] text-ink/55 [animation:marquee_30s_linear_infinite]">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center"
            // The second half is a visual duplicate; hide it from AT.
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <span className="px-8">{item}</span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
