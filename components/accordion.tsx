'use client';

import { useState } from 'react';
import { PlusMinusIcon } from './icons';

/**
 * FAQ accordion.
 *
 * Still a real <details>/<summary> — it keeps the semantics, the keyboard
 * behaviour and find-in-page expansion for free. What React adds is a mirror
 * of the open state on the element (`data-open`), because CSS cannot
 * transition anything off the `[open]` attribute: the browser sets it at the
 * instant of the toggle, when the height change has already happened.
 *
 * So the panel is always rendered, its height is interpolated with a 0fr→1fr
 * grid row, and `open` is held on permanently for anything that needs the
 * content to exist (find-in-page, print, no-JS). `data-open` is what drives
 * every visual state; see .accordion-item in motion.css.
 */
export function Accordion({
  items,
}: {
  /** An answer may be several paragraphs; a bare string is one. */
  items: { q: string; a: string | readonly string[] }[];
}) {
  // First panel open, matching the previous behaviour.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <details
            className="accordion-item"
            key={item.q}
            data-open={isOpen}
            open
            onToggle={(e) => {
              // Native toggling is suppressed below, so this only fires for
              // the cases we do not control: find-in-page and print, both of
              // which force the element open and should stay open.
              if (e.currentTarget.open && !isOpen) setOpen(i);
            }}
          >
            <summary
              onClick={(e) => {
                // The click would toggle `open`, collapsing the panel before
                // it can animate. We keep `open` on and drive the visuals
                // from state instead.
                e.preventDefault();
                setOpen(isOpen ? null : i);
              }}
              aria-expanded={isOpen}
            >
              {item.q}
              <PlusMinusIcon className="accordion-item__marker" />
            </summary>

            <div className="accordion-item__panel">
              <div>
                {(Array.isArray(item.a) ? item.a : [item.a]).map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
