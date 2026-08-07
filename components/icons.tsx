import type { SVGProps } from 'react';

/** The four-point star from the Lodestar wordmark. */
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="16"
      height="16"
      {...props}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="14"
      height="14"
      {...props}
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m3 8.5 3.5 3.5L13 5" />
    </svg>
  );
}

export function StarRatingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 .8 10 5.6l5.2.4-4 3.4 1.3 5.1L8 11.7l-4.5 2.8 1.3-5.1-4-3.4 5.2-.4L8 .8Z" />
    </svg>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      width="12"
      height="12"
      {...props}
    >
      <rect x="3.25" y="7" width="9.5" height="6.5" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 3v10l8-5-8-5Z" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      width="22"
      height="22"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      width="22"
      height="22"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ==========================================================================
   Card icons
   One 24-unit grid, 1.75 stroke, round caps and joins — so a row of them
   reads as one set rather than as clip-art collected from four places.
   Every one of these replaces a text label that was repeating on a card.
   ========================================================================== */

/** Shared geometry. Anything below only supplies paths. */
function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Discover — looking outward for a direction. */
export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </Glyph>
  );
}

/** Determine — mapping the route between two points. */
export function RouteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18h5a4 4 0 0 0 0-8h-3a4 4 0 0 1 0-8" />
    </Glyph>
  );
}

/** Decide — the committed choice. */
export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** A written report or downloadable document. */
export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Glyph>
  );
}

/** Video content. */
export function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect x="3" y="5" width="13" height="14" rx="2.5" />
      <path d="m16 10.5 5-2.8v8.6l-5-2.8" />
    </Glyph>
  );
}

/** Long-form writing — the journal. */
export function JournalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v20H7.5A2.5 2.5 0 0 1 5 19.5v-15Z" />
      <path d="M5 17.5h14M9.5 7h6" />
    </Glyph>
  );
}

/** A question — FAQ material. */
export function HelpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7" />
      <path d="M12 17.2h.01" />
    </Glyph>
  );
}

/** A school or institution. */
export function SchoolIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
      <path d="M6.5 10.5V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.5" />
      <path d="M21.5 8v5.5" />
    </Glyph>
  );
}

/** People — the counsellor bench, a cohort. */
export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M17 5.4a3.2 3.2 0 0 1 0 6.2M18 14.6a6 6 0 0 1 3.5 5.4" />
    </Glyph>
  );
}

/** A single person — a byline. */
export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </Glyph>
  );
}

/** Duration — reading time, programme length, office hours. */
export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.3 2" />
    </Glyph>
  );
}

/** A place. */
export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M12 21.5S5 15.6 5 10.3a7 7 0 1 1 14 0c0 5.3-7 11.2-7 11.2Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Glyph>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M8.4 3.5H5.6A2.1 2.1 0 0 0 3.5 5.8c0 8.2 6.5 14.7 14.7 14.7a2.1 2.1 0 0 0 2.3-2.1v-2.8l-4.4-1.5-1.9 2.3a15.6 15.6 0 0 1-6.3-6.3l2.3-1.9L8.4 3.5Z" />
    </Glyph>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Glyph>
  );
}

/** Measurement — the psychometric result, a score. */
export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V6M17 20v-9" />
    </Glyph>
  );
}

/** A shortlist that has been checked off. */
export function ChecklistIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="m3.5 7 2 2 3-3.5M3.5 16l2 2 3-3.5" />
      <path d="M12.5 7.5h8M12.5 16.5h8" />
    </Glyph>
  );
}

/** Growth over time — the three-year school journey. */
export function GrowthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M3.5 17.5 9 12l3.5 3.5L20.5 7" />
      <path d="M15.5 7h5v5" />
    </Glyph>
  );
}

/** A conversation — the one-to-one session. */
export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M20.5 12.5c0 4-3.8 7.2-8.5 7.2a9.9 9.9 0 0 1-2.7-.4L4 21.5l1.5-3.9a6.9 6.9 0 0 1-2-4.6C3.5 8.7 7.3 5.5 12 5.5s8.5 3.2 8.5 7Z" />
    </Glyph>
  );
}

/** A URL. Replaces the bare address that used to sit naked on resource cards. */
export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7" />
    </Glyph>
  );
}

/* ==========================================================================
   Feedback glyphs
   The icons that only ever appear as the result of something the user did:
   a copy, a submission, a failure. Same 24-grid and stroke as the set above,
   so a check that replaces a copy glyph is the same drawing weight and the
   swap reads as one icon changing rather than two icons trading places.
   ========================================================================== */

/** Copy to clipboard — the resting state of a copy control. */
export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect x="9" y="9" width="11.5" height="11.5" rx="2.5" />
      <path d="M6 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v1" />
    </Glyph>
  );
}

/** Confirmation — what a copy control becomes once it has copied. */
export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.8 2.8L16.2 9.6" />
    </Glyph>
  );
}

/** Something did not work. */
export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2" />
      <path d="M12 16.4h.01" />
    </Glyph>
  );
}

/**
 * The in-flight indicator. Drawn as a ring with a single lit arc; the
 * rotation is CSS (`.spinner`), not SMIL, so reduced-motion can stop it.
 */
export function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="spinner"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" opacity="0.28" />
      <path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </Glyph>
  );
}

/** The disclosure arrow on a select. */
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Glyph>
  );
}

/**
 * The accordion's marker. One drawing for both states: the vertical bar is a
 * separate path so it can be rotated and faded out, turning a plus into a
 * minus rather than swapping one glyph for another.
 */
export function PlusMinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.5 12h15" />
      <path className="plusminus__bar" d="M12 4.5v15" />
    </svg>
  );
}
