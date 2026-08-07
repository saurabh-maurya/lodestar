'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades and lifts its children in the first time they cross into view.
 *
 * Defaults to shown. The element only gets a hidden starting state if, at
 * mount, it is actually below the fold — so there is nothing to pre-hide
 * above the fold, and nothing that can be left invisible if this component
 * never runs at all (no JS, a slow connection, an old browser). That default
 * matters: an experimental CSS approach for this exact effect
 * (animation-timeline: view()) was tried first and could leave real content
 * stuck at opacity 0 depending on how the page was scrolled into position —
 * unacceptable for the actual copy and buttons of a section, so this uses
 * IntersectionObserver instead, which has been reliable browser behaviour
 * for years.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms — pass i * 90 from a list to fan siblings in in order. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={shown ? 'shown' : 'hidden'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
