'use client';

import { useState } from 'react';
import type { Module } from '@/lib/content/programs';
import {
  ChartIcon,
  ChatIcon,
  ChevronDownIcon,
  ClockIcon,
  VideoIcon,
} from './icons';

/**
 * The curriculum: what the program actually delivers, in the order it
 * happens.
 *
 * Four kinds of row — assessment, webinar, one-to-one session, footnote —
 * told apart by icon, accent and weight rather than by boxing each one. A
 * row with children is a parent category: it collapses, and its children sit
 * indented under a connector line that runs from the parent's icon down
 * through them, so the nesting is legible without a single border.
 *
 * Parents start open. This list is read inside a popover that opens on
 * hover, and content that needs a click to appear would be content most
 * people never see. Collapsing is for shortening a long program, not a gate
 * on reading it.
 */
const ICONS = {
  assessment: ChartIcon,
  webinar: VideoIcon,
  session: ChatIcon,
  note: ClockIcon,
} as const;

export function Curriculum({
  modules,
  idPrefix,
  startCollapsed = false,
}: {
  modules: Module[];
  /** Namespaces the aria-controls ids — several of these can share a page. */
  idPrefix: string;
  /**
   * Start with the groups shut. Used inside the hover fan, where the full
   * eleven rows make a note taller than the screen it opens on: collapsed,
   * the reader sees the shape of the program at a glance and opens whichever
   * part they want. The page version stays open, because there it has room.
   */
  startCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState<string[]>(() =>
    startCollapsed
      ? modules.filter((m) => m.children).map((m) => m.title)
      : [],
  );

  const toggle = (title: string) =>
    setCollapsed((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title],
    );

  return (
    <ol className="curric">
      {modules.map((module) => {
        const Icon = ICONS[module.kind];
        const isOpen = !collapsed.includes(module.title);
        const panelId = `${idPrefix}-${module.title.replace(/\W+/g, '-')}`;

        return (
          <li
            className="curric__item"
            data-kind={module.kind}
            data-open={module.children ? isOpen : undefined}
            key={module.title}
          >
            {module.children ? (
              <button
                type="button"
                className="curric__row curric__row--parent"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(module.title)}
              >
                <RowBody module={module} Icon={Icon} />
                <ChevronDownIcon className="curric__chevron" />
              </button>
            ) : (
              <div className="curric__row">
                <RowBody module={module} Icon={Icon} />
              </div>
            )}

            {module.children && (
              <div className="curric__panel" id={panelId}>
                <div>
                  <ol className="curric__children">
                    {module.children.map((child, i) => (
                      <li
                        className="curric__child"
                        key={child.title}
                        /* Each child lags the one above it, so an opening
                           group unfurls rather than appearing all at once. */
                        style={
                          { '--i': i } as React.CSSProperties
                        }
                      >
                        <span className="curric__child-title">
                          {child.title}
                        </span>
                        {child.description && (
                          <span className="curric__child-desc">
                            {child.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function RowBody({
  module,
  Icon,
}: {
  module: Module;
  Icon: (typeof ICONS)[keyof typeof ICONS];
}) {
  return (
    <>
      <span className="curric__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="curric__copy">
        <span className="curric__title">{module.title}</span>
        {module.description && (
          <span className="curric__desc">{module.description}</span>
        )}
      </span>
    </>
  );
}
