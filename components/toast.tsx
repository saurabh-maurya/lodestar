'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertIcon, CheckCircleIcon, CloseIcon } from './icons';

/* ==========================================================================
   Toasts
   The site's one channel for "that worked" / "that didn't". A copy, a save, a
   submitted form — anything the user did whose result is not already visible
   where they are looking.

   The store is a module-level subscription rather than React context, so
   `toast()` can be called from anywhere (an event handler, a fetch callback,
   a non-React helper) without a provider in the tree above it. One <Toaster/>
   in the root layout renders whatever is in the store.
   ========================================================================== */

export type ToastTone = 'success' | 'error' | 'info';

export type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
  /** How long it stays up. Errors linger — they are worth re-reading. */
  duration: number;
};

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<Listener>();

function emit() {
  // A fresh array each time: the subscriber compares by reference.
  const snapshot = [...toasts];
  listeners.forEach((listener) => listener(snapshot));
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/**
 * Show a toast. Returns its id so a caller can dismiss it early.
 *
 * Identical consecutive messages replace each other instead of stacking —
 * hitting "copy" four times should re-arm one chip, not build a tower.
 */
export function toast(
  message: string,
  { tone = 'success', duration }: { tone?: ToastTone; duration?: number } = {},
): number {
  const id = nextId++;
  const next: Toast = {
    id,
    tone,
    message,
    duration: duration ?? (tone === 'error' ? 6000 : 3600),
  };

  toasts = [
    ...toasts.filter((t) => !(t.message === message && t.tone === tone)),
    next,
  ]
    // Three is the ceiling: past that they stop being feedback and start
    // being a wall over the content the user is trying to look at.
    .slice(-3);

  emit();
  return id;
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}

/** One toast, responsible for its own timer and its own exit. */
function ToastItem({ item }: { item: Toast }) {
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Two timers: one to start the exit, one to actually remove it once the
    // exit transition has run. Removing on transitionend instead would drop
    // the toast forever under prefers-reduced-motion, where it never fires.
    timers.current.push(
      window.setTimeout(() => setLeaving(true), item.duration),
      window.setTimeout(() => dismissToast(item.id), item.duration + 240),
    );
    const timeouts = timers.current;
    return () => timeouts.forEach(window.clearTimeout);
  }, [item.duration, item.id]);

  const Icon = item.tone === 'error' ? AlertIcon : CheckCircleIcon;

  return (
    <div
      className="toast"
      data-tone={item.tone}
      data-leaving={leaving || undefined}
      role={item.tone === 'error' ? 'alert' : 'status'}
    >
      <span className="toast__icon" aria-hidden="true">
        <Icon />
      </span>
      <p className="toast__message">{item.message}</p>
      <button
        type="button"
        className="toast__close"
        onClick={() => dismissToast(item.id)}
        aria-label="Dismiss notification"
      >
        <CloseIcon width={14} height={14} />
      </button>
    </div>
  );
}

/**
 * Mounted once, in the root layout. The region is always in the tree so
 * assistive tech is already watching it when the first toast lands — a live
 * region added at the same moment as its content is not announced.
 */
export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => subscribe(setItems), []);

  return (
    <div className="toaster" aria-live="polite" aria-atomic="false">
      {items.map((item) => (
        <ToastItem key={item.id} item={item} />
      ))}
    </div>
  );
}
