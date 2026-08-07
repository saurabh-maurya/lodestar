import Link from 'next/link';
import { CheckIcon, StarRatingIcon } from './icons';
import { expertBadges, expertSession, expertStats } from '@/lib/content/programs';

/**
 * The offer and its proof, in one card — the price, what it buys, and the
 * badges/numbers that back it up, all inside `.expert-price`. Shared between
 * the programs page (where it closes the "Talk to an expert" section) and
 * /experts (where it closes the full directory) so the two never quote a
 * different price or a different session count.
 */
export function ExpertPriceCard({
  showViewAll = true,
}: {
  /** Off on /experts itself — "view all experts" while already viewing them
      is not a link anywhere new. */
  showViewAll?: boolean;
}) {
  return (
    <>
      <div className="expert-price__top">
        <div className="expert-price__info">
          <p className="expert-price__label">{expertSession.label}</p>
          <p className="expert-price__amount">{expertSession.price}</p>
          <p className="expert-price__note">{expertSession.note}</p>
        </div>
        <div className="expert-price__actions">
          <Link className="btn btn--primary" href="/contact">
            Book a Session
          </Link>
          {showViewAll && (
            <Link className="btn btn--outline" href="/experts">
              View All Experts
            </Link>
          )}
        </div>
      </div>

      <div className="expert-price__trust">
        <ul className="expert-price__badges">
          {expertBadges.map((badge) => (
            <li key={badge}>
              <CheckIcon />
              {badge}
            </li>
          ))}
        </ul>
        <ul className="expert-price__stats">
          {expertStats.map((stat) => (
            <li key={stat.label}>
              <strong>
                {stat.star && <StarRatingIcon />}
                {stat.value}
              </strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
