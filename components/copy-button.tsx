'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';
import { toast } from './toast';

/**
 * Copy a value to the clipboard, with the confirmation on the control itself
 * rather than only in a toast: the copy glyph swaps for a check and the
 * button holds that state for a beat.
 *
 * Both halves matter. The icon morph answers "did that press register?"
 * exactly where the eye already is, and the toast answers "what did it
 * copy?" for anyone who looked away — or who cannot see the button at all,
 * since the toast is the announced one.
 */
export function CopyButton({
  value,
  label,
  what = 'Value',
}: {
  /** The text placed on the clipboard. */
  value: string;
  /** Accessible name, e.g. "Copy phone number". */
  label: string;
  /** What was copied, for the confirmation message. */
  what?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast(`${what} copied — ${value}`);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be refused (insecure origin, denied permission).
      // Say so rather than flashing a check for something that never happened.
      toast('Could not copy that. You can select it and copy manually.', {
        tone: 'error',
      });
    }
  }

  return (
    <button
      type="button"
      className="copy-btn"
      data-copied={copied || undefined}
      onClick={onClick}
      aria-label={copied ? `${what} copied` : label}
    >
      {/* Both glyphs are always rendered and stacked in one grid cell, so the
          control never changes size as they cross-fade. */}
      <span className="copy-btn__icons" aria-hidden="true">
        <CopyIcon className="copy-btn__rest" />
        <CheckIcon className="copy-btn__done" />
      </span>
    </button>
  );
}
