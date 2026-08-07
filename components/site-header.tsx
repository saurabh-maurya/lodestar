'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { primaryNav, site } from '@/lib/site';
import { CloseIcon, MenuIcon } from './icons';
import { Roll } from './ui';

/** Distance scrolled before the pill moves to its denser glass tier. */
const SCROLL_THRESHOLD = 12;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  /**
   * The active-page indicator is one pill that travels the nav rather than a
   * background on each link. Position is measured from the DOM and handed to
   * CSS as two custom properties, so the animation itself stays in CSS.
   * `ready` gates the transition: the very first placement has to snap, or
   * the pill would fly in from the left edge on load.
   */
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });
  const [indReady, setIndReady] = useState(false);

  const moveTo = useCallback((el: HTMLElement | null) => {
    if (!el) {
      setInd((prev) => ({ ...prev, on: false }));
      return;
    }
    setInd({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  }, []);

  /** Return the pill to whichever link owns the current page. */
  const settle = useCallback(() => {
    moveTo(
      navRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ??
        null,
    );
  }, [moveTo]);

  // Close the disclosure whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    settle();
    // A frame later the pill may animate; by then it is already in place.
    const frame = requestAnimationFrame(() => setIndReady(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname, settle]);

  // Link widths change at the breakpoints that retune the pill's padding.
  useEffect(() => {
    window.addEventListener('resize', settle);
    return () => window.removeEventListener('resize', settle);
  }, [settle]);

  // Scroll tier, plus how far down the page the reader is. Both read in the
  // same rAF so a fast scroll costs one style recalc per frame at most.
  // Progress is written straight to the element's style, like the nav
  // marker's --ind-x above and the pull in magnetic-link.tsx — it changes on
  // every scroll frame, and routing that through React state would re-render
  // the whole header on each one.
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressRef.current?.style.setProperty('--progress', `${fraction}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // A floating disclosure is dismissed by Escape or by a press outside it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* A sibling of `.header`, not a child: `.header` sits under a
          `translateX` to stay centred, which would drag a fixed-position
          descendant along with it and off its intended top-of-viewport
          position. Rendered flat here, it stays pinned to the real
          viewport edge regardless of what the pill above it is doing. */}
      <span className="header__progress" ref={progressRef} aria-hidden="true" />
      <header
        className="header"
        ref={headerRef}
        data-scrolled={scrolled}
        /* Drives the disclosure glyph's rotation; the menu itself reads its
           own data-open below. */
        data-open={open}
      >
        <div className="header__inner">
          <Link href="/" className="brand" aria-label={`${site.name} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- the
                source file is 163x70; next/image upscaling warnings on an
                asset this small aren't useful, and it never changes route. */}
            <img
              src="/images/lodestar-logo.jpg"
              alt=""
              width={163}
              height={70}
              className="brand__logo"
            />
          </Link>

          <nav
            className="header__nav"
            aria-label="Primary"
            ref={navRef}
            data-ind={ind.on ? 'on' : 'off'}
            data-ind-ready={indReady}
            style={
              {
                '--ind-x': `${ind.x}px`,
                '--ind-w': `${ind.w}px`,
              } as React.CSSProperties
            }
            onMouseLeave={settle}
            onBlur={settle}
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header__link"
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                /* The label again, for CSS to lay out invisibly at bold weight
                   so the link is always as wide as its heaviest state. Without
                   it, bolding on hover would widen the link, shove its
                   neighbours along, and leave the marker — measured on
                   mouseenter, before the weight lands — the wrong size. */
                data-label={item.label}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                onFocus={(e) => moveTo(e.currentTarget)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <span className="header__divider" aria-hidden="true" />

          <div className="header__actions">
            <a
              className="header__login"
              href={site.productAppUrl}
              rel="noopener noreferrer"
            >
              Login
            </a>
            <Link className="btn btn--primary btn--sm btn--auto" href="/free-assessment">
              <Roll>Free Assessment</Roll>
            </Link>
            <button
              type="button"
              className="header__menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <div className="mobile-nav" id="mobile-nav" data-open={open}>
          <ul className="mobile-nav__list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-nav__actions">
            <Link className="btn btn--primary" href="/free-assessment">
              <Roll>Free Assessment</Roll>
            </Link>
            <a
              className="btn btn--ghost"
              href={site.productAppUrl}
              rel="noopener noreferrer"
            >
              <Roll>Login</Roll>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
