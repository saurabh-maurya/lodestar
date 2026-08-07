import type { ReactNode } from 'react';
import { Stat } from './ui';

/* ==========================================================================
   Page hero
   The band every page opens with.

   Before this, eight pages opened eight different ways — white, grey, soft
   blue, navy, some tight, some not — so the site changed character every
   time you navigated. This gives every other page the same first impression
   the home hero sets: the light, mesh-gradient band (`.section--hero-light`,
   shared with `home-hero.tsx`), an eyebrow, the page's one sentence, and
   whatever that page needs beside it (a picture, a form, a row of numbers).

   Home keeps the one thing that stays its own — the animated illustration
   and the display-size headline, since it is still the loudest page on the
   site. The band underneath is now the same material everywhere.
   ========================================================================== */

export function PageHero({
  overline,
  title,
  mark,
  lead,
  actions,
  aside,
  layout = 'media',
  stats,
  children,
  id,
  tight = false,
}: {
  overline?: ReactNode;
  title: string;
  /**
   * A phrase inside `title` to lift into the accent. Must appear verbatim;
   * the title splits on it. Same treatment as the home hero, so the
   * emphasis reads as one device used site-wide rather than a home-page
   * flourish.
   */
  mark?: string;
  lead?: ReactNode;
  /** Buttons or links under the copy. */
  actions?: ReactNode;
  /** The right-hand column: a media block, a form, anything. */
  aside?: ReactNode;
  /** Forms want a slightly wider column than a picture does. */
  layout?: 'media' | 'form';
  /** The stat row that runs under the hero on home and For Schools. */
  stats?: { value: string; label: string }[];
  /** Extra copy under the lead — a list of promises, a notice. */
  children?: ReactNode;
  id?: string;
  /** Shallower band, for pages whose real content should start high. */
  tight?: boolean;
}) {
  const [before, after] = mark ? title.split(mark) : [title, ''];

  const copy = (
    /* With an aside the grid sets the column width. Without one the copy
       would otherwise run the full 1368px of the wide container — a heading
       eleven words long on a single line, which is not a heading anyone
       reads. Capped at roughly the width of the home hero's text column, so
       every page's opening sentence breaks on the same measure. */
    <div className={aside ? undefined : 'page-hero__copy'}>
      {overline && <p className="overline">{overline}</p>}
      <h1 className={`h1${overline ? ' mt-4' : ''}`}>
        {mark ? (
          <>
            {before}
            <em className="heading__mark">{mark}</em>
            {after}
          </>
        ) : (
          title
        )}
      </h1>
      {lead && <p className="lead mt-5 measure">{lead}</p>}
      {children}
      {actions && (
        <div className="flex flex-wrap items-center gap-4 mt-8">{actions}</div>
      )}
    </div>
  );

  return (
    <section
      className={`section section--hero-light${tight ? ' section--tight' : ''}`}
      id={id}
    >
      <div className="container container--wide">
        {aside ? (
          <div
            className={`split ${layout === 'form' ? 'split--form' : 'split--copy-wide'}`}
          >
            {copy}
            {aside}
          </div>
        ) : (
          copy
        )}

        {stats && (
          <div className="hero__stats">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
