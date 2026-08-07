'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scrolls to the element named by the URL's hash after a page loads.
 *
 * Belt-and-braces for the browser's own "scroll to fragment on load"
 * behaviour, which this measured as unreliable here: navigating straight to
 * a URL like /experts#career-experts left scrollY at 0 for several seconds
 * with no correction ever arriving. The site has depended on that native
 * behaviour in several places already (the sample-report and brochure links
 * on the homepage, the schools inquiry link, the contact form's institutional
 * link) — this fixes all of them from one place rather than each anchor
 * needing its own handler.
 *
 * Retries on a short timer rather than running once, because the header
 * floats over the page and reserves its height via a CSS custom property
 * that only settles after the first layout pass — a target measured too
 * early would land a few pixels short of where `scroll-margin-top` (see
 * `main [id]` in globals.css) means it to be. A timer rather than
 * requestAnimationFrame deliberately: rAF callbacks can go unserviced on a
 * backgrounded or otherwise inactive tab, which is exactly the state a
 * fresh navigation can briefly be in, and a scroll correction that silently
 * never runs is worse than one that runs a frame late.
 *
 * Instant, not smooth: this is correcting the page's starting position
 * before the user has seen it, not responding to something they clicked.
 * An animated scroll as the first thing on screen would read as the page
 * lurching, not as a click being honoured — plain in-page anchor clicks
 * still get the smooth CSS behaviour, since the browser handles those
 * itself without this effect ever running.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let attempts = 0;
    let timer: number;

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
      attempts += 1;
      if (attempts < 20) timer = window.setTimeout(tryScroll, 50);
    };

    tryScroll();
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
