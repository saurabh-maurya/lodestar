import Link from 'next/link';
import { heroNote } from '@/lib/content/home';
import { ArrowRightIcon } from './icons';

/**
 * A small paper note pinned at an angle across the seam between the hero and
 * the first content band — the handful of facts a parent wants before they
 * commit to reading the page.
 *
 * It takes no height in the flow (see .slant in sections.css): it hangs off
 * the boundary, half in the hero and half in the band below, which is what
 * makes it read as pinned to the page rather than as another section.
 *
 * Copy lives in lib/content/home.ts.
 */
export function HeroNote() {
  return (
    <div className="slant">
      <div className="container container--wide slant__rail">
        <aside className="slant__note" aria-label={heroNote.label}>
          <span className="slant__tape" aria-hidden="true" />

          <p className="slant__label">{heroNote.label}</p>

          <ul className="slant__lines">
            {heroNote.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <Link className="slant__action" href={heroNote.action.href}>
            {heroNote.action.label}
            <ArrowRightIcon />
          </Link>
        </aside>
      </div>
    </div>
  );
}
