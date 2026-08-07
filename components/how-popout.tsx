import Link from 'next/link';
import { ArrowRightIcon, ChevronDownIcon } from './icons';
import { cardIcon } from './card-icon-map';
import { howItWorks } from '@/lib/content/programs';

/**
 * One "How it works" control for the whole programs section.
 *
 * It used to be four — one per card — saying near-identical things, because
 * the four steps are the same whichever program you buy. One control above
 * the grid says it once, and the cards get their space back.
 *
 * Pointing at it opens the steps beneath it; following it jumps to the full
 * method further down this same page (there used to be a separate
 * /how-it-works page it linked to; that content now lives inline below,
 * under #method). That still matters for a tap or a keyboard, neither of
 * which has hover: the popout is the shortcut, the link is the guarantee.
 */
export function HowPopout() {
  return (
    <div className="howpop">
      <Link className="howpop__btn" href="#method">
        <span className="howpop__icon">{cardIcon('route')}</span>
        How it works
        <ChevronDownIcon className="howpop__chevron" />
      </Link>

      <div className="howpop__panel">
        <p className="howpop__title">Four steps, start to finish</p>
        <ol className="howpop__steps">
          {howItWorks.map((step, i) => (
            <li key={step.title} style={{ '--i': i } as React.CSSProperties}>
              <span className="howpop__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="howpop__copy">
                <span className="howpop__step-title">{step.title}</span>
                <span className="howpop__step-body">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="howpop__foot">
          Read the full method
          <ArrowRightIcon />
        </p>
      </div>
    </div>
  );
}
