'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ticks a stat's numeral up from 0 the first time it scrolls into view.
 * Only the leading digits animate — any prefix/suffix ("+", "%", commas) is
 * split off and reapplied verbatim, so "40,000+" or "93%" tween correctly
 * without the component having to understand every format on the page.
 *
 * Renders the static string until mount, then only touches the DOM inside
 * the observer callback — no re-render on every animation frame.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!match) return; // no digits to animate — the static value stands.

    const target = parseInt(match[2].replace(/,/g, ''), 10);
    if (!Number.isFinite(target)) return;
    const [, prefix, , suffix] = match;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setDisplay(`${prefix}0${suffix}`);

    const duration = 1100;
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out — no overshoot
          const current = Math.round(target * eased);
          setDisplay(`${prefix}${current.toLocaleString('en-US')}${suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
