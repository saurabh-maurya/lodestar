import { heroStats, heroCopy } from '@/lib/content/home';
import { GradePath } from './grade-path';
import { ArrowRightIcon } from './icons';
import { MagneticLink } from './magnetic-link';
import { Roll, Stat } from './ui';

/**
 * Home hero. `GradePath` — an abstract Class-8-to-12 illustration, not a
 * stock photo of a student — sits in the right-hand column, in the slot the
 * Figma frame reserves for `IMG · Student & counsellor session`.
 *
 * `section--hero-light` only — the shared navy `section--hero` (still used by
 * every other page's generic hero) is untouched.
 */
export function HomeHero() {
  return (
    <section className="section section--hero-light">
      <div className="container container--wide hero">
        <div className="stack gap-6">
          <p className="hero__eyebrow">
            India&apos;s first scientific career guidance program
          </p>

          {/* Each sentence starts on its own line, then wraps naturally
              inside the 760px column — exactly how the frame breaks. The
              phrase named in `mark` is lifted into the accent; the rest of
              the line renders either side of it untouched. */}
          <h1 className="display">
            {heroCopy.headline.map(({ line, mark }) => {
              const [before, after] = line.split(mark);
              return (
                <span key={line} style={{ display: 'block' }}>
                  {before}
                  <em className="heading__mark">{mark}</em>
                  {after}
                </span>
              );
            })}
          </h1>

          <p className="lead measure">{heroCopy.body}</p>

          <div className="flex flex-wrap gap-4">
            <MagneticLink href="/free-assessment" className="btn btn--primary magnetic">
              <Roll>Take the Free Assessment</Roll>
              <ArrowRightIcon />
            </MagneticLink>
          </div>
        </div>

        <div className="hero__art">
          <GradePath />
          <span className="hero__tag hero__tag--a" aria-hidden="true">
            Grades 8–12
          </span>
          <span className="hero__tag hero__tag--b" aria-hidden="true">
            Since 2011
          </span>
        </div>
      </div>

      <div className="container container--wide">
        <div className="hero__stats">
          {heroStats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} animate />
          ))}
        </div>
      </div>
    </section>
  );
}
