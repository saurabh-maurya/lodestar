'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, CloseIcon } from './icons';
import { Roll } from './ui';

/**
 * Persistent bottom CTA — the redesign plan's floating glass pill.
 *
 * It surfaces the hero's "Take the Free Assessment" action once the hero has
 * scrolled away, so the primary action is never more than one click off,
 * without a full sticky bar eating the viewport.
 *
 * Not rendered on /free-assessment (the form is already on screen there) and
 * dismissible, so it can never trap a keyboard user or permanently cover
 * content on a short viewport.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const suppressed = pathname === '/free-assessment';

  useEffect(() => {
    if (suppressed) return;

    // Appears once the reader is past roughly the first viewport — the same
    // "after hero" trigger the redesign specifies.
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [suppressed]);

  // Reset on navigation so it re-earns its place on each page.
  useEffect(() => {
    setDismissed(false);
  }, [pathname]);

  if (suppressed) return null;

  const visible = shown && !dismissed;

  return (
    <div
      className="floatcta"
      data-visible={visible}
      // Keep it out of the accessibility tree and tab order while hidden.
      inert={!visible}
      aria-hidden={!visible}
    >
      <span className="floatcta__copy">
        <strong>Start with the free test</strong>
        <span>Fifteen minutes. No payment.</span>
      </span>

      <Link className="btn btn--primary btn--sm btn--auto" href="/free-assessment">
        <Roll>Free Assessment</Roll>
        <ArrowRightIcon />
      </Link>

      <button
        type="button"
        className="floatcta__close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss this prompt"
      >
        <CloseIcon width={16} height={16} />
      </button>
    </div>
  );
}
