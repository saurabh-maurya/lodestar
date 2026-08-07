import Link from 'next/link';
import type { ReactNode } from 'react';
import { Card, CardEyebrow, CardTitle, CardValue, MetaItem, Roll } from './ui';
import { ChevronDownIcon, ClockIcon } from './icons';
import { cardIcon } from './card-icon-map';
import { Curriculum } from './curriculum';
import type { Program } from '@/lib/content/programs';

/**
 * A program card, and the three panels that fan out of it on hover.
 *
 * The card holds only what is comparable down a row of four: grade, title,
 * duration, price, and the one action. Everything that differs between the
 * programs — the outcome, what is delivered, how it runs — used to be four
 * unequal checklists side by side, which is exactly the thing that stops a
 * grid being scannable. It is now a hover away, in three panels that come
 * out of the card in sequence.
 *
 * Still no JavaScript: :hover and :focus-within on the wrapper drive all of
 * it, which means the panels also open when a keyboard reaches the Register
 * button. Only one card can be hovered or hold focus at a time, so only one
 * fan is ever open.
 */
const PANELS = [
  { key: 'outcome', icon: 'target', label: 'Outcome' },
  { key: 'modules', icon: 'checklist', label: 'Program details' },
  { key: 'how', icon: 'route', label: 'How this works' },
] as const;

/** One sticky note. `index` drives its shade, tilt and place in the stagger. */
function Note({
  panel,
  index,
  children,
  className = '',
}: {
  panel: (typeof PANELS)[number];
  index: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`fan__card ${className}`.trim()} data-panel={index}>
      <p className="fan__head">
        <span className="fan__icon">{cardIcon(panel.icon)}</span>
        {panel.label}
      </p>
      {children}
    </div>
  );
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="program">
      {/* Every card the same colour now. The featured one still leads — its
          Register button is the filled one — but a different background made
          it read as a different kind of thing rather than as the better of
          four comparable options. */}
      <Card tone="plain">
        <CardEyebrow>{program.grade}</CardEyebrow>
        <CardTitle as="h2" size="lg">
          {program.titleLines.map((line) => (
            <span className="program__title-line" key={line}>
              {program.titleAccent && line.includes(program.titleAccent) ? (
                <>
                  {line.replace(program.titleAccent, '')}
                  <span className="program__accent">
                    {program.titleAccent}
                  </span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </CardTitle>

        {/* The price is what a parent compares across these four cards, so
            it sits high and right, where the eye can run straight down the
            column. */}
        <div className="card__meta card__meta--inline">
          <MetaItem icon={<ClockIcon />}>{program.duration}</MetaItem>
          <CardValue size="lg">{program.price}</CardValue>
        </div>

        <Link
          className={`btn ${program.featured ? 'btn--primary' : 'btn--ghost'} btn--block program__cta`}
          /* The one filled button in the row is what marks the recommended
             program now that the cards share a colour. */
          href={`/programs/register?program=${program.slug}`}
        >
          <Roll>Register Now</Roll>
        </Link>
      </Card>

      {/* --- The fan ------------------------------------------------------
          Three panels, each carrying one of the program's three blocks.
          They are in the DOM at rest — tucked behind the card, scaled down
          and transparent — so opening is a transition rather than a mount,
          and closing can run the same transition backwards. */}
      <div className="fan">
        {/* The curriculum goes beside the card, where it can be wide. It is
            the longest of the three by far, and a wide note is a short one —
            the same eleven rows in a narrow column ran twice the height and
            wrapped every description onto a second line.

            The other two go underneath, side by side. */}
        <div className="fan__side">
          <Note panel={PANELS[1]} index={2}>
            <Curriculum
              modules={program.detail.modules}
              idPrefix={`${program.slug}-fan`}
              startCollapsed
            />
          </Note>

        </div>

        {/* Outcome, underneath. How this works is not here any more — the
            four steps are identical across the four programs, so they belong
            to the one control above the grid, not to each card. */}
        <div className="fan__below">
          <Note panel={PANELS[0]} index={1}>
            <ul className="fan__list">
              {program.detail.outcome.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Note>
        </div>
      </div>
    </div>
  );
}
