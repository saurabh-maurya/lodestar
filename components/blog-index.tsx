'use client';

import { useMemo, useState } from 'react';
import type { Post } from '@/lib/wordpress';
import {
  ArrowRightIcon,
  ClockIcon,
  CloseIcon,
  JournalIcon,
  SearchIcon,
  UserIcon,
} from './icons';

/**
 * The journal index: a search field, the posts it matches, and a rail of the
 * most recent ones.
 *
 * Search runs in the browser over the posts already on the page rather than
 * round-tripping to WordPress. For a journal this size that is the right
 * trade: results appear as the parent types, with no spinner and no empty
 * frame between keystrokes. If the archive outgrows one page this becomes a
 * query against the API instead — the shape of the component does not change.
 */
export function BlogIndex({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q),
    );
  }, [posts, query]);

  // The rail always shows the newest posts, never the filtered set — it is a
  // way out of an empty search, so it must not empty with it.
  const recent = posts.slice(0, 5);

  return (
    <div className="journal">
      <div className="journal__bar">
        {/* The field is compact at rest and opens on focus — the page is
            about the writing, and a search box the width of the column would
            claim otherwise until someone actually wants it. */}
        <div className="search" data-filled={query ? 'true' : undefined}>
          <SearchIcon className="search__icon" />
          <input
            type="search"
            className="search__input"
            placeholder="Search the journal"
            aria-label="Search the journal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <CloseIcon width={14} height={14} />
            </button>
          )}
        </div>

        {/* Announced, so a screen reader hears the count change as the
            filtering happens rather than discovering it by exploring. */}
        <p className="journal__count" role="status" aria-live="polite">
          {query
            ? `${results.length} ${results.length === 1 ? 'post' : 'posts'} matching “${query}”`
            : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
        </p>
      </div>

      <div className="journal__body">
        <div className="journal__list">
          {results.length === 0 ? (
            <div className="journal__empty">
              <span className="journal__empty-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <p className="h4">Nothing matches “{query}”</p>
              <p className="body mt-2">
                Try a broader word — “stream”, “exams”, “college” — or clear
                the search to see everything.
              </p>
              <button
                type="button"
                className="btn btn--ghost btn--sm btn--auto mt-5"
                onClick={() => setQuery('')}
              >
                Clear search
              </button>
            </div>
          ) : (
            results.map((post) => (
              <article className="post-row" key={post.id} id={post.slug}>
                {/* The thumbnail slot. A real featured image when WordPress
                    has one; otherwise the gradient block the rest of the
                    site uses for a picture that has not been shot yet — so
                    the row keeps its shape either way. */}
                {post.image ? (
                  <img
                    className="post-row__thumb post-row__thumb--img"
                    src={post.image}
                    alt={post.imageAlt || ''}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="post-row__thumb" aria-hidden="true">
                    <JournalIcon />
                  </span>
                )}
                <div className="post-row__copy">
                  <h3>{post.title}</h3>
                  {post.excerpt && (
                    <p className="post-row__excerpt">{post.excerpt}</p>
                  )}
                  <p className="post-row__meta">
                    <span className="card__meta-item">
                      <UserIcon />
                      {post.author}
                    </span>
                  </p>
                </div>
                <span className="post-row__time">
                  <ClockIcon />
                  {post.readingTime}
                </span>
              </article>
            ))
          )}
        </div>

        <aside className="journal__rail" aria-label="Recent posts">
          <p className="overline">Recent posts</p>
          <ol className="quicklinks">
            {recent.map((post, i) => (
              <li key={post.id}>
                <a href={`#${post.slug}`} className="quicklink">
                  <span className="quicklink__n">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="quicklink__copy">
                    <span className="quicklink__title">{post.title}</span>
                    <span className="quicklink__time">
                      <ClockIcon />
                      {post.readingTime}
                    </span>
                  </span>
                  <ArrowRightIcon className="quicklink__arrow" />
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
