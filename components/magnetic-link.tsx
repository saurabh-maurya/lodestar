'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';

/**
 * A link that drifts toward the pointer while it's inside the button, and
 * springs back to centre the instant it leaves — the "magnetic CTA" effect.
 *
 * Implemented as two CSS custom properties (--mx, --my) written directly to
 * the element on pointermove, read by a `transform: translate(var(--mx),
 * var(--my))` declared in CSS. Writing them straight to style bypasses React
 * re-renders entirely, which is what keeps this smooth on a fast mouse
 * instead of fighting the render loop for every pixel of movement.
 *
 * The pull is capped at 8px — enough to feel alive, not enough for the label
 * to ever leave the button's own hit area, which would make the target
 * chase the cursor instead of just leaning toward it.
 */
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pull = 8;
    const mx = ((e.clientX - r.left) / r.width - 0.5) * pull;
    const my = ((e.clientY - r.top) / r.height - 0.5) * pull;
    el.style.setProperty('--mx', `${mx}px`);
    el.style.setProperty('--my', `${my}px`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </Link>
  );
}
