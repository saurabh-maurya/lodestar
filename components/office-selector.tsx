'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { offices } from '@/lib/site';
import { Media, Roll } from './ui';
import { CopyButton } from './copy-button';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './icons';

/**
 * Replaces the old contact page that listed every branch address at once.
 * Choosing a city reveals only that office's details.
 */
type OfficeId = (typeof offices)[number]['id'];

export function OfficeSelector() {
  const [active, setActive] = useState<OfficeId>(offices[0].id);
  const office = offices.find((o) => o.id === active) ?? offices[0];

  /**
   * One marker travels to the selected city rather than each tab filling in
   * on its own — the same treatment the navbar gives the current page, for
   * the same reason: a switch reads as one object moving, which is easier to
   * follow than two boxes trading colour.
   *
   * `ready` gates the transition so the first placement snaps into position
   * instead of sliding in from the left edge on load.
   */
  const listRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (!el) return;
    // Vertical offset as well as horizontal: the chips wrap to a second row
    // on narrow screens, and a marker that only tracked x would sit on the
    // wrong line.
    setMarker({
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    });
  }, []);

  /**
   * Arrow-key movement between tabs, which a tablist is expected to provide:
   * Tab enters and leaves the set, arrows move within it. Selection follows
   * focus, so the panel updates as the user arrows across — with only four
   * cities and no network fetch behind the switch, there is nothing to be
   * gained by making them press Enter as well.
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const i = offices.findIndex((o) => o.id === active);
    const next =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? offices.length - 1
          : e.key === 'ArrowRight'
            ? (i + 1) % offices.length
            : (i - 1 + offices.length) % offices.length;

    setActive(offices[next].id);
    listRef.current
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus();
  };

  useEffect(() => {
    measure();
    // A timeout rather than requestAnimationFrame: rAF does not fire while
    // the tab is in the background, and the marker would then still be
    // waiting to be enabled when the visitor came back to it. Zero delay is
    // enough — it only has to land after the first paint.
    const timer = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(timer);
  }, [active, measure]);

  // The chips wrap to a second line at narrow widths, which moves every one
  // of them; the marker has to be re-measured when that happens.
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <div>
      <div
        className="chip-group tabs"
        role="tablist"
        aria-label="Choose a city"
        data-ready={ready}
        ref={listRef}
        onKeyDown={onKeyDown}
        style={
          {
            '--tab-x': `${marker.x}px`,
            '--tab-y': `${marker.y}px`,
            '--tab-w': `${marker.w}px`,
            '--tab-h': `${marker.h}px`,
          } as React.CSSProperties
        }
      >
        <span className="tabs__marker" aria-hidden="true" />
        {offices.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            id={`tab-${o.id}`}
            aria-selected={active === o.id}
            aria-controls={`panel-${o.id}`}
            // Roving tabindex: the set is one stop in the tab order, and the
            // arrow keys move inside it.
            tabIndex={active === o.id ? 0 : -1}
            className={`btn btn--auto ${
              active === o.id ? 'btn--navy' : 'btn--ghost'
            }`}
            onClick={() => setActive(o.id)}
          >
            <Roll>{o.city}</Roll>
          </button>
        ))}
      </div>

      <div
        /* Keyed on the office so React replaces the panel rather than
           mutating it — which is what lets the entry animation run on every
           switch instead of only on first paint. */
        key={office.id}
        className="office-card mt-6"
        role="tabpanel"
        id={`panel-${office.id}`}
        aria-labelledby={`tab-${office.id}`}
      >
        <p className="card__eyebrow">{office.eyebrow}</p>
        <h3 className="card__title card__title--lg office-card__address">
          <MapPinIcon aria-hidden="true" />
          {office.address}
        </h3>

        {/* The label column was four words repeating down every office: an
            icon carries the same meaning in a fraction of the width, and the
            value — which is what anyone came here for — gets the emphasis.
            Each row keeps a visually hidden label so it still reads as a
            labelled pair to a screen reader.

            Every row a visitor might need somewhere else — a number to dial
            from a desk phone, an address to paste into a mail client —
            carries a copy control that appears on hover and confirms itself
            in place. */}
        <dl className="office-rows">
          <div className="office-row">
            <dt>
              <PhoneIcon aria-hidden="true" />
              <span className="sr-only">Phone</span>
            </dt>
            <dd>
              <a href={`tel:${office.phone.replace(/\s/g, '')}`}>
                {office.phone}
              </a>
              <CopyButton
                value={office.phone}
                label={`Copy phone number for ${office.city}`}
                what="Phone number"
              />
            </dd>
          </div>
          <div className="office-row">
            <dt>
              <PhoneIcon aria-hidden="true" />
              <span className="sr-only">Alternate phone</span>
            </dt>
            <dd>
              <a href={`tel:${office.alternate.replace(/\s/g, '')}`}>
                {office.alternate}
              </a>
              <span className="office-row__note">Alternate</span>
              <CopyButton
                value={office.alternate}
                label={`Copy alternate phone number for ${office.city}`}
                what="Phone number"
              />
            </dd>
          </div>
          <div className="office-row">
            <dt>
              <MailIcon aria-hidden="true" />
              <span className="sr-only">Email</span>
            </dt>
            <dd>
              <a href={`mailto:${office.email}`}>{office.email}</a>
              <CopyButton
                value={office.email}
                label={`Copy email address for ${office.city}`}
                what="Email address"
              />
            </dd>
          </div>
          <div className="office-row">
            <dt>
              <ClockIcon aria-hidden="true" />
              <span className="sr-only">Hours</span>
            </dt>
            <dd>{office.hours}</dd>
          </div>
        </dl>

        <div className="mt-5">
          <Media caption={office.mapCaption} variant="strip" />
        </div>
      </div>
    </div>
  );
}
