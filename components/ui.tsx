import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CountUp } from './count-up';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  StarIcon,
  StarRatingIcon,
} from './icons';

type SectionTone =
  | 'plain'
  | 'subtle'
  | 'tint'
  | 'soft'
  | 'brand'
  | 'hero';

export function Section({
  tone = 'plain',
  tight = false,
  id,
  children,
  className = '',
}: {
  tone?: SectionTone;
  tight?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section section--${tone}${tight ? ' section--tight' : ''} ${className}`.trim()}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function Overline({ children }: { children: ReactNode }) {
  return <p className="overline">{children}</p>;
}

/** Centred eyebrow + heading + optional lead, used above most card grids. */
export function SectionHeading({
  overline,
  title,
  lead,
  align = 'center',
  as: Tag = 'h2',
}: {
  overline?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'start';
  as?: 'h1' | 'h2';
}) {
  const centred = align === 'center';
  return (
    <div className={centred ? 'text-center' : undefined}>
      {overline && <Overline>{overline}</Overline>}
      <Tag className={`h2${overline ? ' mt-4' : ''}`}>{title}</Tag>
      {lead && (
        <p
          className={`lead mt-5 measure${centred ? ' mx-auto' : ''}`}
          style={centred ? { textAlign: 'center' } : undefined}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Stat({
  value,
  label,
  animate = false,
}: {
  value: string;
  label: string;
  /** Tick the numeral up from 0 on scroll-in, instead of rendering it flat. */
  animate?: boolean;
}) {
  return (
    <div>
      <p className="stat__value">{animate ? <CountUp value={value} /> : value}</p>
      <p className="stat__label">{label}</p>
    </div>
  );
}

/**
 * Stand-in for an image the Figma file marks as `IMG · …` — the gradient
 * block with its caption, for slots that have no photo yet. Pass `src` to
 * drop a real one in: the caption keeps rendering as a chip over it (a
 * scrim guarantees it stays legible on any photo), so a slot never has to
 * choose between the label and the image.
 */
export function Media({
  caption,
  variant = 'wide',
  className = '',
  src,
  alt = '',
}: {
  caption: string;
  variant?: 'tall' | 'wide' | 'strip' | 'banner';
  className?: string;
  src?: string;
  alt?: string;
}) {
  return (
    <div
      className={`media media--${variant}${src ? ' media--photo' : ''} ${className}`.trim()}
      role="img"
      aria-label={caption}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 720px) 100vw, 50vw"
          className="media__img"
        />
      )}
      <span className="media__caption" aria-hidden="true">
        {caption}
      </span>
    </div>
  );
}

/**
 * A label that rolls on hover: the resting copy leaves through the top and a
 * second copy follows it in from below, in the colour its button sets as
 * --roll-fg. The copy is a duplicate of the same children, hidden from
 * assistive tech so the label is announced once.
 *
 * Use this for the text of any `.btn`. It is exported because several buttons
 * are written as plain `.btn` links rather than going through <Button>.
 */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span className="roll__in">{children}</span>
      <span className="roll__out" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  size,
  arrow = false,
  external = false,
  block = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'navy' | 'outline' | 'ghost';
  size?: 'sm';
  arrow?: boolean;
  external?: boolean;
  block?: boolean;
}) {
  const className = [
    'btn',
    `btn--${variant}`,
    size === 'sm' ? 'btn--sm' : '',
    block ? 'btn--block' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <Roll>{children}</Roll>
      {arrow && <ArrowRightIcon />}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {inner}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      {children}
      <ArrowUpRightIcon />
    </>
  );
  if (external) {
    return (
      <a className="link-arrow" href={href} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className="link-arrow" href={href}>
      {inner}
    </Link>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DotList({ items }: { items: string[] }) {
  return (
    <ul className="dot-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function FeatureList({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li className="feature" key={item.title}>
          <span className="feature__icon" aria-hidden="true">
            <StarIcon />
          </span>
          <div>
            <h3 className="h4">{item.title}</h3>
            <p className="body mt-2">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div
      className="stars"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => (
        <StarRatingIcon key={i} />
      ))}
    </div>
  );
}

export function QuoteCard({
  quote,
  name,
  role,
  showStars = true,
  variant = 'plain',
}: {
  quote: string;
  name: string;
  role: string;
  showStars?: boolean;
  variant?: 'plain' | 'raised';
}) {
  return (
    <figure className={`card card--${variant}`}>
      {/* The visual anchor every other card gets from an icon or a photo.
          It also does the job the opening quotation mark of the sentence
          used to do, which is why the copy itself carries none. */}
      <span className="card__quote-mark" aria-hidden="true">
        &rdquo;
      </span>
      {/* The quote is the card's headline, so it is set at title weight and
          size rather than as body copy. Attribution drops below it, smaller
          and lighter — it is who said it, not what was said. */}
      <blockquote className="card__quote">{quote}</blockquote>
      <figcaption className="card__meta card__byline">
        <span className="avatar" aria-hidden="true" />
        <span className="card__byline-copy">
          <strong>{name}</strong>
          <span>{role}</span>
        </span>
        {/* The rating is this card's deciding value, so it sits where a price
            or a status would: the right edge of the footer, lining up down
            the column so a grid of reviews can be scanned in one pass. */}
        {showStars && (
          <span className="card__value">
            <Stars />
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/* The accordion animates its own height, so it is a client component; it is
   re-exported here because every page reaches for its parts through ui. */
export { Accordion } from './accordion';

/* ==========================================================================
   Card system
   Every card on the site is built from these parts, in this order:

     media / icon   the visual anchor — what you see before you read
     eyebrow        the category or ordinal, small and quiet
     title          the one thing the card is about: largest, boldest, top
     body           supporting copy, smaller and lighter
     meta           a footer rule, then secondary metadata left and the key
                    value (price, status, CTA) right-aligned in the accent

   A card may skip any part, but never reorders them. That fixed order is
   what makes a grid of them scannable — the eye learns one path and reuses
   it on every card on every page.
   ========================================================================== */

type CardTone = 'subtle' | 'plain' | 'raised' | 'navy' | 'soft' | 'on-brand' | 'clay';

export function Card({
  tone = 'subtle',
  link = false,
  children,
  className = '',
  as: Tag = 'article',
  id,
}: {
  tone?: CardTone;
  /**
   * The whole card leads somewhere. Its <CardTitle href> stretches to cover
   * the card, so the press lands anywhere on it rather than only on the
   * title's own line — and the card, not the link, carries the hover, focus
   * and pressed states.
   */
  link?: boolean;
  children: ReactNode;
  className?: string;
  as?: 'article' | 'figure' | 'div';
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`card card--${tone}${link ? ' card--link' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * The visual anchor. An icon in a tinted tile, or an ordinal when the
 * sequence itself is the information (step 01, phase 02).
 */
export function CardIcon({
  children,
  index,
}: {
  children?: ReactNode;
  index?: string;
}) {
  return (
    <span className="card__icon" aria-hidden="true">
      {index ? <span className="card__index">{index}</span> : children}
    </span>
  );
}

/**
 * Icon and headline on one line: the tile on the left, the eyebrow and title
 * stacked beside it.
 *
 * Stacking them vertically cost the card a whole band of height to say one
 * short word ("Inspire", "Discover"), and put a gap between the picture and
 * the words it belongs to. Side by side they read as one object — the eye
 * takes the glyph and the title in a single fixation, which is the point of
 * having the glyph at all.
 *
 * The text column is `minmax(0, 1fr)`, so a long title wraps inside its own
 * column instead of pushing the tile off the card.
 */
export function CardHeader({
  icon,
  index,
  children,
}: {
  icon?: ReactNode;
  /** An ordinal instead of a glyph, when the sequence is the information. */
  index?: string;
  /** The eyebrow and title. */
  children: ReactNode;
}) {
  return (
    <div className="card__header">
      <CardIcon index={index}>{icon}</CardIcon>
      <div className="card__header-copy">{children}</div>
    </div>
  );
}

/**
 * A media header — the slot a real photograph drops into. The tag rides on
 * top of it as a chip so the image never costs the card a line of text.
 */
export function CardMedia({
  caption,
  icon,
  tall = false,
}: {
  caption: string;
  icon?: ReactNode;
  tall?: boolean;
}) {
  return (
    <div
      className={`card__media${tall ? ' card__media--tall' : ''}`}
      role="img"
      aria-label={caption}
    >
      <span className="card__tag" aria-hidden="true">
        {icon}
        {caption}
      </span>
    </div>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return <p className="card__eyebrow">{children}</p>;
}

export function CardTitle({
  children,
  href,
  as: Tag = 'h3',
  size = 'md',
}: {
  children: ReactNode;
  href?: string;
  as?: 'h2' | 'h3' | 'h4';
  size?: 'md' | 'lg';
}) {
  return (
    <Tag className={`card__title card__title--${size}`}>
      {href ? <Link href={href}>{children}</Link> : children}
    </Tag>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <p className="card__body">{children}</p>;
}

/**
 * The footer rule. Pushed to the bottom of the card, so a row of cards of
 * unequal copy length still lines its metadata up on one line.
 */
export function CardMeta({ children }: { children: ReactNode }) {
  return <div className="card__meta">{children}</div>;
}

/** Secondary metadata: an icon and a short value, quiet by design. */
export function MetaItem({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="card__meta-item">
      {icon}
      {children}
    </span>
  );
}

/**
 * The number that decides things — a price, a score, a status. Accent
 * coloured and pushed to the right edge, where a scanning eye can compare it
 * down a column of cards without reading anything else.
 */
export function CardValue({
  children,
  unit,
  size = 'md',
}: {
  children: ReactNode;
  unit?: ReactNode;
  size?: 'md' | 'lg';
}) {
  return (
    <span className={`card__value card__value--${size}`}>
      {children}
      {unit && <span className="card__value-unit">{unit}</span>}
    </span>
  );
}
