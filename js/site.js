/*!
 * Lodestar — static site behaviour.
 * Vanilla-JS port of the original Next.js/React components. Every effect
 * here reproduces one component from the source app 1:1 against the same
 * CSS (css/*.css, copied unchanged) so the animation and motion feel is
 * identical — only the framework underneath changed.
 */
(function () {
  'use strict';

  /* ==========================================================================
     Toaster — mirrors components/toast.tsx
     ========================================================================== */
  var Toast = (function () {
    var toaster;
    var nextId = 1;

    function ensureToaster() {
      if (toaster) return toaster;
      toaster = document.createElement('div');
      toaster.className = 'toaster';
      toaster.setAttribute('aria-live', 'polite');
      toaster.setAttribute('aria-atomic', 'false');
      document.body.appendChild(toaster);
      return toaster;
    }

    function icon(tone) {
      if (tone === 'error') {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.2"/><path d="M12 16.4h.01"/></svg>';
      }
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.8 2.8L16.2 9.6"/></svg>';
    }

    function show(message, opts) {
      opts = opts || {};
      var tone = opts.tone || 'success';
      var duration = opts.duration || (tone === 'error' ? 6000 : 3600);
      var host = ensureToaster();

      // Identical consecutive messages replace each other.
      Array.prototype.forEach.call(
        host.querySelectorAll('[data-message="' + cssEscape(message) + '"][data-tone="' + tone + '"]'),
        function (el) { el.remove(); }
      );

      var el = document.createElement('div');
      el.className = 'toast';
      el.dataset.tone = tone;
      el.dataset.message = message;
      el.setAttribute('role', tone === 'error' ? 'alert' : 'status');
      el.innerHTML =
        '<span class="toast__icon" aria-hidden="true">' + icon(tone) + '</span>' +
        '<p class="toast__message"></p>' +
        '<button type="button" class="toast__close" aria-label="Dismiss notification">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
      el.querySelector('.toast__message').textContent = message;
      host.appendChild(el);

      // Ceiling of three.
      var items = host.querySelectorAll('.toast');
      while (items.length > 3) {
        items[0].remove();
        items = host.querySelectorAll('.toast');
      }

      var dismiss = function () {
        el.setAttribute('data-leaving', '');
        window.setTimeout(function () { el.remove(); }, 240);
      };
      el.querySelector('.toast__close').addEventListener('click', dismiss);
      window.setTimeout(dismiss, duration);
      return nextId++;
    }

    return { show: show };
  })();

  function cssEscape(s) {
    return String(s).replace(/["\\]/g, '\\$&');
  }

  /* ==========================================================================
     Header — mirrors components/site-header.tsx
     ========================================================================== */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var nav = header.querySelector('.header__nav');
    var progress = document.querySelector('.header__progress');
    var menuBtn = header.querySelector('.header__menu-btn');
    var mobileNav = document.getElementById('mobile-nav');
    var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('.header__link')) : [];

    function moveTo(el) {
      if (!nav) return;
      if (!el) {
        nav.dataset.ind = 'off';
        return;
      }
      nav.style.setProperty('--ind-x', el.offsetLeft + 'px');
      nav.style.setProperty('--ind-w', el.offsetWidth + 'px');
      nav.dataset.ind = 'on';
    }

    function settle() {
      var current = nav && nav.querySelector('[aria-current="page"]');
      moveTo(current || null);
    }

    settle();
    window.requestAnimationFrame(function () {
      if (nav) nav.dataset.indReady = 'true';
    });

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () { moveTo(link); });
      link.addEventListener('focus', function () { moveTo(link); });
    });
    if (nav) {
      nav.addEventListener('mouseleave', settle);
      nav.addEventListener('focusout', settle);
    }
    window.addEventListener('resize', settle);

    // Scroll tier + read progress, one rAF per frame at most.
    var frame = 0;
    function read() {
      frame = 0;
      header.dataset.scrolled = window.scrollY > 12 ? 'true' : 'false';
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var fraction = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progress) progress.style.setProperty('--progress', String(fraction));
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(read);
    }
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Mobile disclosure.
    var open = false;
    function setOpen(next) {
      open = next;
      header.dataset.open = String(open);
      if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
      if (mobileNav) mobileNav.dataset.open = String(open);
    }
    if (menuBtn) {
      menuBtn.addEventListener('click', function () { setOpen(!open); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) setOpen(false);
    });
    document.addEventListener('pointerdown', function (e) {
      if (open && !header.contains(e.target)) setOpen(false);
    });
    if (mobileNav) {
      Array.prototype.forEach.call(mobileNav.querySelectorAll('a'), function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
    }
  }

  /* ==========================================================================
     Hash scroll — mirrors components/hash-scroll.tsx
     ========================================================================== */
  function initHashScroll() {
    var hash = window.location.hash.slice(1);
    if (!hash) return;
    var attempts = 0;
    function tryScroll() {
      var el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(tryScroll, 50);
    }
    tryScroll();
  }

  /* ==========================================================================
     Floating CTA — mirrors components/floating-cta.tsx
     ========================================================================== */
  function initFloatingCta() {
    var el = document.querySelector('.floatcta');
    if (!el) return;
    if (document.body.dataset.page === 'free-assessment') {
      el.remove();
      return;
    }
    var dismissed = false;
    function apply() {
      var shown = window.scrollY > window.innerHeight * 0.6;
      var visible = shown && !dismissed;
      el.dataset.visible = String(visible);
      el.setAttribute('aria-hidden', String(!visible));
      if (visible) el.removeAttribute('inert');
      else el.setAttribute('inert', '');
    }
    window.addEventListener('scroll', apply, { passive: true });
    apply();
    var close = el.querySelector('.floatcta__close');
    if (close) {
      close.addEventListener('click', function () {
        dismissed = true;
        apply();
      });
    }
  }

  /* ==========================================================================
     Reveal on scroll — mirrors components/reveal.tsx
     ========================================================================== */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = 'shown';
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    Array.prototype.forEach.call(els, function (el) {
      if (el.getBoundingClientRect().top <= window.innerHeight) {
        el.dataset.reveal = 'shown';
        return;
      }
      el.dataset.reveal = 'hidden';
      io.observe(el);
    });
  }

  /* ==========================================================================
     Count up — mirrors components/count-up.tsx
     ========================================================================== */
  function initCountUp() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = document.querySelectorAll('[data-countup]');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          runCountUp(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  function runCountUp(el) {
    var value = el.getAttribute('data-countup') || el.textContent;
    var match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!match) return;
    var target = parseInt(match[2].replace(/,/g, ''), 10);
    if (!isFinite(target)) return;
    var prefix = match[1];
    var suffix = match[3];
    el.textContent = prefix + '0' + suffix;

    var duration = 1100;
    var start = performance.now();
    function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var current = Math.round(target * eased);
      el.textContent = prefix + current.toLocaleString('en-US') + suffix;
      if (t < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  /* ==========================================================================
     Magnetic link — mirrors components/magnetic-link.tsx
     ========================================================================== */
  function initMagnetic() {
    Array.prototype.forEach.call(document.querySelectorAll('.magnetic'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var pull = 8;
        var mx = ((e.clientX - r.left) / r.width - 0.5) * pull;
        var my = ((e.clientY - r.top) / r.height - 0.5) * pull;
        el.style.setProperty('--mx', mx + 'px');
        el.style.setProperty('--my', my + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }

  /* ==========================================================================
     Accordion — mirrors components/accordion.tsx
     ========================================================================== */
  function initAccordion() {
    Array.prototype.forEach.call(document.querySelectorAll('.accordion'), function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll('.accordion-item'));
      items.forEach(function (item, i) {
        var summary = item.querySelector('summary');
        if (!summary) return;
        summary.addEventListener('click', function (e) {
          e.preventDefault();
          var isOpen = item.dataset.open === 'true';
          items.forEach(function (other) {
            other.dataset.open = 'false';
            var s = other.querySelector('summary');
            if (s) s.setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) {
            item.dataset.open = 'true';
            summary.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  /* ==========================================================================
     Curriculum collapse — mirrors components/curriculum.tsx
     ========================================================================== */
  function initCurriculum() {
    // Delegated on document: the register page renders its curriculum block
    // dynamically after DOMContentLoaded, so per-node listeners would miss it.
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.curric__row--parent');
      if (!btn) return;
      var item = btn.closest('.curric__item');
      if (!item) return;
      var open = item.dataset.open === 'true';
      item.dataset.open = String(!open);
      btn.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ==========================================================================
     Copy button — mirrors components/copy-button.tsx
     ========================================================================== */
  function initCopyButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('.copy-btn'), function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-value') || '';
        var what = btn.getAttribute('data-what') || 'Value';
        var label = btn.getAttribute('data-label') || 'Copy';
        var restore = function () {
          btn.removeAttribute('data-copied');
          btn.setAttribute('aria-label', label);
        };
        navigator.clipboard.writeText(value).then(
          function () {
            btn.setAttribute('data-copied', '');
            btn.setAttribute('aria-label', what + ' copied');
            Toast.show(what + ' copied — ' + value);
            window.clearTimeout(btn._copyTimer);
            btn._copyTimer = window.setTimeout(restore, 1800);
          },
          function () {
            Toast.show('Could not copy that. You can select it and copy manually.', { tone: 'error' });
          }
        );
      });
    });
  }

  /* ==========================================================================
     Office selector — mirrors components/office-selector.tsx
     ========================================================================== */
  function initTabGroup(root, opts) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var marker = root.querySelector('.tabs__marker');

    function measure() {
      var selected = root.querySelector('[aria-selected="true"]');
      if (!selected) return;
      root.style.setProperty('--tab-x', selected.offsetLeft + 'px');
      root.style.setProperty('--tab-y', selected.offsetTop + 'px');
      root.style.setProperty('--tab-w', selected.offsetWidth + 'px');
      root.style.setProperty('--tab-h', selected.offsetHeight + 'px');
    }

    function select(tab) {
      tabs.forEach(function (t) {
        var isSel = t === tab;
        t.setAttribute('aria-selected', String(isSel));
        t.tabIndex = isSel ? 0 : -1;
      });
      measure();
      window.setTimeout(function () { root.dataset.ready = 'true'; }, 0);
      if (opts && opts.onSelect) opts.onSelect(tab);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
        if (keys.indexOf(e.key) === -1) return;
        e.preventDefault();
        var next =
          e.key === 'Home' ? 0 :
          e.key === 'End' ? tabs.length - 1 :
          e.key === 'ArrowRight' ? (i + 1) % tabs.length :
          (i - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        select(tabs[next]);
      });
    });

    measure();
    window.setTimeout(function () { root.dataset.ready = 'true'; }, 0);
    window.addEventListener('resize', measure);
    return { measure: measure, select: select, tabs: tabs };
  }

  function initOfficeSelector() {
    var root = document.querySelector('[data-component="office-selector"]');
    if (!root) return;
    var tabsEl = root.querySelector('.tabs');
    var panels = Array.prototype.slice.call(root.querySelectorAll('.office-card'));

    initTabGroup(tabsEl, {
      onSelect: function (tab) {
        var id = tab.getAttribute('data-office');
        panels.forEach(function (panel) {
          var match = panel.getAttribute('data-office') === id;
          panel.hidden = !match;
          if (match) {
            // Re-trigger the panel-in animation on every switch.
            panel.style.animation = 'none';
            void panel.offsetWidth;
            panel.style.animation = '';
          }
        });
      },
    });
  }

  /* ==========================================================================
     Blog index — mirrors components/blog-index.tsx
     ========================================================================== */
  var WORDPRESS_API_URL = ''; // e.g. 'https://cms.internal.lodestar.guru' — set to enable live posts; empty uses the built-in fallback list below (matches the original app's un-configured behaviour).

  var fallbackPosts = [
    { id: 'featured', slug: 'one-career-decision', title: 'You look at your child and see one career decision. There is more to it than that.', excerpt: 'The stream choice after Class 10 is not one decision but a chain of them — electives, entrance exams, tutorials, degree, college. Here is how the chain actually works.', author: 'Lodestar Editorial', readingTime: '6 min read', date: '5 Aug 2026', category: 'Careers', image: 'images/founders-campus.jpg', imageAlt: 'Students at work in a modern Indian classroom' },
    { id: 2, slug: 'which-stream-after-10th', title: 'Which stream to choose after 10th: a decision framework', excerpt: 'Science, Commerce or Arts is the visible choice. The one that actually decides a career is the set of electives underneath it.', author: 'Lodestar Editorial', readingTime: '6 min read', date: '28 Jul 2026', category: 'Streams', image: 'images/program-class10.jpg', imageAlt: 'A student weighing a decision in the classroom' },
    { id: 3, slug: 'aptitude-vs-interest', title: 'Why aptitude testing matters more than interest alone', excerpt: 'A child can be interested in something they have no aptitude for, and good at something they have never considered. The test is what tells the two apart.', author: 'Lodestar Editorial', readingTime: '6 min read', date: '20 Jul 2026', category: 'Psychometrics', image: 'images/program-class9.jpg', imageAlt: 'Students sitting an assessment in class' },
    { id: 4, slug: 'beyond-engineering', title: 'Beyond engineering: 250 careers most parents have never heard of', excerpt: 'Engineering and medicine are the two careers every parent already knows the name of. Here is what the other 248 actually are.', author: 'Lodestar Editorial', readingTime: '6 min read', date: '12 Jul 2026', category: 'Careers', image: 'images/program-class1112.jpg', imageAlt: 'Students discussing career options together' },
    { id: 5, slug: 'reading-a-psychometric-report', title: 'How to read a psychometric report without over-interpreting it', excerpt: 'A 30-page report is not a verdict. Here is which sections to weigh heavily, and which are context rather than instruction.', author: 'Lodestar Editorial', readingTime: '6 min read', date: '3 Jul 2026', category: 'Psychometrics', image: 'images/expert-step-report.jpg', imageAlt: 'Hands reviewing a written report' },
  ];

  function stripHtml(input) {
    return String(input)
      .replace(/<[^>]*>/g, '')
      .replace(/&hellip;/g, '…')
      .replace(/&#8217;/g, '\u2019')
      .replace(/&#8216;/g, '\u2018')
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }

  function formatPostDate(iso) {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function categoryFrom(termGroups) {
    var flat = [].concat.apply([], termGroups || []);
    var found = flat.filter(function (t) { return t.taxonomy === 'category'; })[0];
    return found ? found.name : 'Careers';
  }

  function thumbnailFrom(media) {
    if (!media) return {};
    var sizes = (media.media_details && media.media_details.sizes) || {};
    var src =
      (sizes.medium_large && sizes.medium_large.source_url) ||
      (sizes.medium && sizes.medium.source_url) ||
      (sizes.thumbnail && sizes.thumbnail.source_url) ||
      media.source_url;
    return src ? { image: src, imageAlt: media.alt_text || '' } : {};
  }

  function fetchPosts(limit) {
    if (!WORDPRESS_API_URL) return Promise.resolve(fallbackPosts.slice(0, limit));
    var base = WORDPRESS_API_URL.replace(/\/$/, '');
    return fetch(base + '/wp-json/wp/v2/posts?per_page=' + limit + '&_embed=author,wp:featuredmedia,wp:term')
      .then(function (res) {
        if (!res.ok) throw new Error('WordPress responded ' + res.status);
        return res.json();
      })
      .then(function (posts) {
        return posts.map(function (post) {
          var words = stripHtml((post.content && post.content.rendered) || post.excerpt.rendered).split(/\s+/).filter(Boolean).length;
          var embedded = post._embedded || {};
          var out = {
            id: post.id,
            slug: post.slug,
            title: stripHtml(post.title.rendered),
            excerpt: stripHtml(post.excerpt.rendered),
            author: (embedded.author && embedded.author[0] && embedded.author[0].name) || 'Lodestar Editorial',
            readingTime: Math.max(1, Math.round(words / 200)) + ' min read',
            date: formatPostDate(post.date),
            category: categoryFrom(embedded['wp:term']),
          };
          var thumb = thumbnailFrom(embedded['wp:featuredmedia'] && embedded['wp:featuredmedia'][0]);
          out.image = thumb.image;
          out.imageAlt = thumb.imageAlt;
          return out;
        });
      })
      .catch(function (err) {
        console.warn('[wordpress] falling back to static posts:', err);
        return fallbackPosts.slice(0, limit);
      });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function initBlogIndex() {
    var root = document.querySelector('[data-component="blog-index"]');
    if (!root) return;

    fetchPosts(12).then(function (posts) {
      renderBlogIndex(root, posts);
    });
  }

  function renderBlogIndex(root, posts) {
    var query = '';
    var category = 'All';
    var categories = ['All'].concat(
      posts
        .map(function (p) { return p.category; })
        .filter(function (c, i, arr) { return arr.indexOf(c) === i; })
    );

    var tabsWrap = root.querySelector('.journal__categories');
    tabsWrap.innerHTML = '<span class="tabs__marker" aria-hidden="true"></span>' +
      categories.map(function (c, i) {
        return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" class="btn btn--auto btn--sm ' + (i === 0 ? 'btn--navy' : 'btn--ghost') + '">' + escapeHtml(c) + '</button>';
      }).join('');

    var searchWrap = root.querySelector('.search');
    var searchInput = searchWrap.querySelector('.search__input');
    var clearBtn = searchWrap.querySelector('.search__clear');

    var countEl = root.querySelector('.journal__count');
    var resultsWrap = root.querySelector('.journal__results');

    function render() {
      var q = query.trim().toLowerCase();
      var results = posts.filter(function (post) {
        var matchesCategory = category === 'All' || post.category === category;
        var matchesQuery = !q ||
          post.title.toLowerCase().indexOf(q) !== -1 ||
          post.excerpt.toLowerCase().indexOf(q) !== -1 ||
          post.author.toLowerCase().indexOf(q) !== -1;
        return matchesCategory && matchesQuery;
      });

      if (query || category !== 'All') {
        countEl.textContent = results.length + ' ' + (results.length === 1 ? 'post' : 'posts') +
          (category !== 'All' ? ' in ' + category : '') +
          (query ? ' matching \u201c' + query + '\u201d' : '');
      } else {
        countEl.textContent = posts.length + ' ' + (posts.length === 1 ? 'post' : 'posts');
      }

      searchWrap.toggleAttribute('data-filled', !!query);
      clearBtn.hidden = !query;

      if (results.length === 0) {
        resultsWrap.innerHTML =
          '<div class="journal__empty mt-6">' +
          '<span class="journal__empty-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/></svg></span>' +
          '<p class="h4">Nothing matches here</p>' +
          '<p class="body mt-2">Try a broader word, a different category, or clear the search to see everything.</p>' +
          '<button type="button" class="btn btn--ghost btn--sm btn--auto mt-5" id="blog-clear-filters">Clear filters</button>' +
          '</div>';
        document.getElementById('blog-clear-filters').addEventListener('click', function () {
          query = '';
          category = 'All';
          searchInput.value = '';
          Array.prototype.forEach.call(tabsWrap.querySelectorAll('[role="tab"]'), function (t, i) {
            t.setAttribute('aria-selected', String(i === 0));
          });
          measureTabs();
          render();
        });
        return;
      }

      var featured = results[0];
      var rest = results.slice(1);

      resultsWrap.innerHTML = featuredPostHtml(featured) +
        (rest.length ? '<div class="journal__grid">' + rest.map(postCardHtml).join('') + '</div>' : '');
    }

    function featuredPostHtml(post) {
      var media = post.image
        ? '<img src="' + escapeHtml(post.image) + '" alt="' + escapeHtml(post.imageAlt || '') + '" decoding="async">'
        : '<span class="feature-post__thumb-icon" aria-hidden="true">' + journalIcon() + '</span>';
      return '<article class="feature-post" id="' + escapeHtml(post.slug) + '">' +
        '<div class="feature-post__media">' + media +
        '<div class="feature-post__overlay">' +
        '<span class="card__tag feature-post__category" aria-hidden="true">' + escapeHtml(post.category) + '</span>' +
        '<h3 class="feature-post__title">' + escapeHtml(post.title) + '</h3>' +
        (post.excerpt ? '<p class="feature-post__excerpt">' + escapeHtml(post.excerpt) + '</p>' : '') +
        '<div class="feature-post__foot">' +
        '<span class="avatar avatar--sm" aria-hidden="true"></span>' +
        '<span class="feature-post__byline"><strong>' + escapeHtml(post.author) + '</strong><span>' + escapeHtml(post.date) + ' \u00b7 ' + escapeHtml(post.readingTime) + '</span></span>' +
        '<span class="feature-post__arrow" aria-hidden="true">' + arrowIcon() + '</span>' +
        '</div></div></div></article>';
    }

    function postCardHtml(post) {
      var media = post.image
        ? '<img src="' + escapeHtml(post.image) + '" alt="' + escapeHtml(post.imageAlt || '') + '" loading="lazy" decoding="async">'
        : '<span class="post-card__thumb-icon" aria-hidden="true">' + journalIcon() + '</span>';
      return '<article class="post-card" id="' + escapeHtml(post.slug) + '">' +
        '<div class="post-card__thumb">' + media +
        '<span class="card__tag post-card__category" aria-hidden="true">' + escapeHtml(post.category) + '</span>' +
        '<span class="post-card__hover-arrow" aria-hidden="true">' + arrowIcon() + '</span>' +
        '</div><div class="post-card__body"><h3>' + escapeHtml(post.title) + '</h3>' +
        (post.excerpt ? '<p class="post-card__excerpt">' + escapeHtml(post.excerpt) + '</p>' : '') +
        '<p class="post-card__meta"><span class="avatar avatar--sm" aria-hidden="true"></span>' +
        '<span class="post-card__byline"><strong>' + escapeHtml(post.author) + '</strong>' +
        '<span class="post-card__date">' + escapeHtml(post.date) +
        '<span class="post-card__time">' + clockIcon() + escapeHtml(post.readingTime) + '</span></span></span></p>' +
        '</div></article>';
    }

    function journalIcon() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v20H7.5A2.5 2.5 0 0 1 5 19.5v-15Z"/><path d="M5 17.5h14M9.5 7h6"/></svg>';
    }
    function arrowIcon() {
      return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>';
    }
    function clockIcon() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/></svg>';
    }

    function measureTabs() {
      var selected = tabsWrap.querySelector('[aria-selected="true"]');
      if (!selected) return;
      tabsWrap.style.setProperty('--tab-x', selected.offsetLeft + 'px');
      tabsWrap.style.setProperty('--tab-y', selected.offsetTop + 'px');
      tabsWrap.style.setProperty('--tab-w', selected.offsetWidth + 'px');
      tabsWrap.style.setProperty('--tab-h', selected.offsetHeight + 'px');
      window.setTimeout(function () { tabsWrap.dataset.ready = 'true'; }, 0);
    }

    tabsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[role="tab"]');
      if (!btn) return;
      category = btn.textContent.trim();
      Array.prototype.forEach.call(tabsWrap.querySelectorAll('[role="tab"]'), function (t) {
        var isSel = t === btn;
        t.setAttribute('aria-selected', String(isSel));
        t.classList.toggle('btn--navy', isSel);
        t.classList.toggle('btn--ghost', !isSel);
        t.tabIndex = isSel ? 0 : -1;
      });
      measureTabs();
      render();
    });

    searchInput.addEventListener('input', function () {
      query = searchInput.value;
      render();
    });
    clearBtn.addEventListener('click', function () {
      query = '';
      searchInput.value = '';
      render();
    });
    window.addEventListener('resize', measureTabs);

    measureTabs();
    render();
  }

  /* ==========================================================================
     How-it-works stepper — mirrors components/how-it-works-steps.tsx
     ========================================================================== */
  function initStepper() {
    var wrap = document.querySelector('[data-component="how-it-works-steps"]');
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var track = wrap.querySelector('.steps__track');
    var fill = wrap.querySelector('.steps__fill');
    var nodes = Array.prototype.slice.call(wrap.querySelectorAll('.steps__node'));
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.step-card'));
    var total = nodes.length;
    var active = 0;
    var STEP_DURATION = 2600;
    var timer;

    function paint() {
      fill.style.width = (active / (total - 1)) * 100 + '%';
      nodes.forEach(function (node, i) {
        node.classList.toggle('is-passed', i <= active);
        node.classList.toggle('is-active', i === active);
      });
      cards.forEach(function (card, i) {
        card.classList.toggle('is-active', i === active);
      });
    }

    function advance() {
      active = (active + 1) % total;
      if (active === 0) {
        // Remount the fill so it always grows forward from 0, never sweeps back.
        fill.style.transition = 'none';
        fill.style.width = '0%';
        void fill.offsetWidth;
        fill.style.transition = '';
      }
      paint();
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            timer = window.setInterval(advance, STEP_DURATION);
          } else if (timer) {
            window.clearInterval(timer);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(wrap);
    paint();
  }

  /* ==========================================================================
     Testimonial carousel — the buttons and dots drive the track's native
     scroll; an IntersectionObserver on the slides keeps the dots in sync
     when the visitor scrolls or swipes the track directly instead.
     ========================================================================== */
  function initCarousel() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-component="carousel"]'), function (root) {
      var track = root.querySelector('[data-carousel-track]');
      var slides = Array.prototype.slice.call(root.querySelectorAll('[data-carousel-slide]'));
      var dots = Array.prototype.slice.call(root.querySelectorAll('[data-carousel-dot]'));
      var prevBtn = root.querySelector('[data-carousel-prev]');
      var nextBtn = root.querySelector('[data-carousel-next]');
      if (!track || !slides.length) return;
      var active = 0;
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // The video carousel runs as a "peek"/coverflow: the active slide is
      // centred by translating the track, with the prev/next slides showing
      // dimmed at the edges. It also loops infinitely (see the ring below).
      var peek = root.classList.contains('carousel--video');
      var realCount = slides.length;
      var TRANSITION_MS = 600;

      // Infinite ring (peek only): clone the whole set on both sides so a
      // centred slide always has real neighbours to peek at, then jump —
      // transition-free — to a clone's identical twin whenever we drift off the
      // middle copy. Originals live at indices realCount .. 2*realCount-1.
      if (peek && realCount > 1) {
        var before = document.createDocumentFragment();
        var after = document.createDocumentFragment();
        slides.forEach(function (s) {
          var b = s.cloneNode(true), a = s.cloneNode(true);
          [b, a].forEach(function (c) {
            c.setAttribute('aria-hidden', 'true');
            Array.prototype.forEach.call(c.querySelectorAll('a,button'), function (el) { el.setAttribute('tabindex', '-1'); });
          });
          before.appendChild(b);
          after.appendChild(a);
        });
        track.insertBefore(before, slides[0]);
        track.appendChild(after);
        slides = Array.prototype.slice.call(track.querySelectorAll('[data-carousel-slide]'));
        active = realCount; // first original
      }

      function realIndex(i) { return realCount > 1 ? ((i % realCount) + realCount) % realCount : i; }
      function setActive(i) {
        active = i;
        var r = peek ? realIndex(i) : i;
        dots.forEach(function (dot, di) { dot.classList.toggle('is-active', di === r); });
        // Mark the centred slide so CSS can lift/brighten it and dim the rest.
        slides.forEach(function (s, si) { s.classList.toggle('is-active', si === i); });
      }
      function layout(instant) {
        if (!peek) return;
        // Centre the active slide by translating the track. offsetLeft is the
        // pre-transform layout position — exactly what we translate back out.
        if (instant) track.style.transition = 'none';
        var slide = slides[active];
        var x = Math.round(root.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2));
        track.style.transform = 'translateX(' + x + 'px)';
        if (instant) { void track.offsetWidth; track.style.transition = ''; }
      }
      function goTo(i) {
        if (peek) {
          setActive(i);
          layout(false); // the CSS transition on the track animates the move
          // Landed on a clone? Once the slide has animated in, snap silently to
          // its identical twin in the middle copy so the ring never ends.
          if (realCount > 1 && (i < realCount || i > 2 * realCount - 1)) {
            var target = i;
            window.setTimeout(function () {
              if (active !== target) return; // a newer nav already moved us
              setActive(realCount + realIndex(target));
              layout(true);
            }, reduceMotion ? 0 : TRANSITION_MS);
          }
          return;
        }
        // Scroll the track itself, not the slide via scrollIntoView() — that
        // walks every scrollable ancestor including the window and yanked the
        // whole page on autoplay. scrollBy on the overflow container only ever
        // moves the track.
        var clamped = Math.max(0, Math.min(slides.length - 1, i));
        var slide = slides[clamped];
        var delta = slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
        track.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function next() { goTo(peek ? active + 1 : (active + 1 >= slides.length ? 0 : active + 1)); }
      function prev() { goTo(peek ? active - 1 : (active - 1 < 0 ? slides.length - 1 : active - 1)); }

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);
      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(peek && realCount > 1 ? realCount + i : i); });
      });

      if (peek) {
        // Clicking a dimmed neighbour brings it to the centre instead of
        // following its link; the centred slide's link still works.
        slides.forEach(function (s, i) {
          s.addEventListener('click', function (e) {
            if (i !== active) { e.preventDefault(); goTo(i); }
          });
        });
        setActive(active);
        layout(true);
        window.addEventListener('load', function () { layout(true); });
        var resizeT;
        window.addEventListener('resize', function () {
          window.clearTimeout(resizeT);
          resizeT = window.setTimeout(function () { layout(true); }, 120);
        });
      } else {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                setActive(slides.indexOf(entry.target));
              }
            });
          },
          { root: track, threshold: 0.6 }
        );
        slides.forEach(function (slide) { io.observe(slide); });
      }

      /* Auto-rotate (opt-in via data-autoplay="ms"). Never runs under reduced
         motion; pauses while the pointer is over the carousel, while focus is
         inside it, and while the tab is hidden, so it never fights the reader
         or a keyboard user. The peek carousel loops forever via the ring. */
      var autoMs = parseInt(root.getAttribute('data-autoplay'), 10);
      if (autoMs > 0 && !reduceMotion && realCount > 1) {
        var timer = null;
        var paused = false;
        var tick = function () { if (!paused && !document.hidden) next(); };
        var start = function () { if (!timer) timer = window.setInterval(tick, autoMs); };
        var stop = function () { if (timer) { window.clearInterval(timer); timer = null; } };
        root.addEventListener('mouseenter', function () { paused = true; });
        root.addEventListener('mouseleave', function () { paused = false; });
        root.addEventListener('focusin', function () { paused = true; });
        root.addEventListener('focusout', function () { paused = false; });
        document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
        start();
      }
    });
  }

  /* ==========================================================================
     Forms — mirrors components/forms.tsx (useFormFlow)
     Visual-only: validation, progress, honeypot and the shake/success/error
     states all run exactly as in the source app. There is no backend in this
     static build, so submission simulates the network round trip and always
     resolves to the success state after a short delay — see the note in the
     project docs about wiring a real form endpoint back in.
     ========================================================================== */
  var PHONE_RE = /^[+\d][\d\s-]{7,17}$/;

  function initForms() {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-flow]'), function (form) {
      setupFormFlow(form);
    });
    Array.prototype.forEach.call(document.querySelectorAll('form[data-local-step]'), function (form) {
      setupLocalStep(form);
    });
    setupPaymentForm();
  }

  function fieldsIn(form) {
    return Array.prototype.slice.call(form.querySelectorAll('[required]'));
  }

  function readProgress(form) {
    var fields = fieldsIn(form);
    var done = fields.filter(function (el) { return el.value.trim() !== '' && el.checkValidity(); }).length;
    var bar = form.querySelector('.progress');
    if (!bar) return;
    var total = fields.length;
    if (total === 0) return;
    var status = form.dataset.status || 'idle';
    var complete = status === 'success';
    var fraction = complete ? 1 : done / total;
    var fill = bar.querySelector('.progress__fill');
    var label = bar.querySelector('.progress__label');
    var track = bar.querySelector('.progress__track');
    var state = status === 'submitting' ? 'submitting' : complete ? 'complete' : 'filling';
    bar.dataset.state = state;
    if (fill) fill.style.setProperty('--progress', String(fraction));
    var text = complete ? 'Sent' : status === 'submitting' ? 'Sending…' : done + ' of ' + total + ' details complete';
    if (label) label.textContent = text;
    if (track) {
      track.setAttribute('aria-valuemax', String(total));
      if (status === 'submitting') track.removeAttribute('aria-valuenow');
      else track.setAttribute('aria-valuenow', String(done));
      track.setAttribute('aria-valuetext', text);
    }
  }

  function wireFieldValidation(form) {
    Array.prototype.forEach.call(form.querySelectorAll('.field'), function (fieldEl) {
      var input = fieldEl.querySelector('.input, .textarea');
      if (!input) return;
      var errorEl = fieldEl.querySelector('.field__error');
      var invalidMessage = input.getAttribute('data-invalid-message');

      function check() {
        if (input.value.trim() === '') {
          fieldEl.removeAttribute('data-valid');
          fieldEl.removeAttribute('data-invalid');
          return;
        }
        if (input.checkValidity()) {
          fieldEl.setAttribute('data-valid', 'true');
          fieldEl.removeAttribute('data-invalid');
        } else {
          fieldEl.removeAttribute('data-valid');
          fieldEl.setAttribute('data-invalid', 'true');
          if (errorEl) {
            errorEl.querySelector('span, .field__error-text') ||
              (errorEl.innerHTML = alertIcon() + '<span class="field__error-text"></span>');
            errorEl.querySelector('.field__error-text').textContent = invalidMessage || input.validationMessage;
          }
        }
      }
      input.addEventListener('blur', check);
      input.addEventListener('input', function () {
        if (fieldEl.hasAttribute('data-invalid')) check();
      });
      form.addEventListener('form-reset-fields', function () {
        fieldEl.removeAttribute('data-valid');
        fieldEl.removeAttribute('data-invalid');
      });
    });

    Array.prototype.forEach.call(form.querySelectorAll('select.input'), function (select) {
      var fieldEl = select.closest('.field');
      if (!fieldEl) return;
      function check() {
        if (select.value) fieldEl.setAttribute('data-valid', 'true');
        else fieldEl.removeAttribute('data-valid');
      }
      select.addEventListener('change', check);
      select.addEventListener('blur', check);
      form.addEventListener('form-reset-fields', function () {
        fieldEl.removeAttribute('data-valid');
      });
    });
  }

  function alertIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.2"/><path d="M12 16.4h.01"/></svg>';
  }

  function shakeForm(form) {
    var card = form.querySelector('.form-card') || form;
    card.removeAttribute('data-shake');
    void card.offsetWidth;
    card.setAttribute('data-shake', 'true');
    window.setTimeout(function () { card.removeAttribute('data-shake'); }, 360);
  }

  function setButtonState(btn, state, labels) {
    if (!btn) return;
    var rollIn = btn.querySelector('.roll__in');
    var rollOut = btn.querySelector('.roll__out');
    var text = state === 'loading' ? labels.busy : state === 'success' ? labels.done : labels.idle;
    if (rollIn) rollIn.textContent = text;
    if (rollOut) rollOut.textContent = text;
    if (state === 'loading') {
      btn.setAttribute('data-state', 'loading');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
    } else if (state === 'success') {
      btn.setAttribute('data-state', 'success');
      btn.disabled = false;
      btn.setAttribute('aria-busy', 'false');
    } else {
      btn.removeAttribute('data-state');
      btn.disabled = false;
      btn.setAttribute('aria-busy', 'false');
    }
    var spinner = btn.querySelector('.spinner');
    if (spinner) spinner.style.display = state === 'loading' ? '' : 'none';
    var check = btn.querySelector('.btn__check');
    if (check) check.style.display = state === 'success' ? '' : 'none';
    var arrow = btn.querySelector('.btn__arrow');
    if (arrow) arrow.style.display = state === 'idle' ? '' : 'none';
  }

  function setupFormFlow(form) {
    wireFieldValidation(form);
    form.dataset.status = 'idle';
    readProgress(form);

    form.addEventListener('input', function () {
      readProgress(form);
      if (form.dataset.status === 'success' || form.dataset.status === 'error') {
        form.dataset.status = 'idle';
        var note = form.querySelector('.form-note[data-status-note]');
        if (note) note.remove();
      }
    });
    form.addEventListener('change', function () { readProgress(form); });

    var submitBtn = form.querySelector('button[type="submit"]');
    var labels = {
      idle: submitBtn ? submitBtn.getAttribute('data-idle-label') : '',
      busy: submitBtn ? submitBtn.getAttribute('data-busy-label') : '',
      done: submitBtn ? submitBtn.getAttribute('data-done-label') || 'Sent' : '',
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        shakeForm(form);
        return;
      }
      // Honeypot: a filled hidden field means a bot — accept silently, do nothing visible.
      var honeypot = form.querySelector('input[name="companyWebsite"]');
      if (honeypot && honeypot.value.trim()) return;

      form.dataset.status = 'submitting';
      readProgress(form);
      setButtonState(submitBtn, 'loading', labels);

      window.setTimeout(function () {
        form.dataset.status = 'success';
        readProgress(form);
        setButtonState(submitBtn, 'success', labels);
        showFormNote(form, 'Thanks — we have your details and will be in touch.', false);
        Toast.show('Sent. We have your details and will be in touch.');
        var oldValues = null;
        form.reset();
        readProgress(form);
        form.dispatchEvent(new CustomEvent('form-reset-fields'));
      }, 700);
    });
  }

  function showFormNote(form, message, isError) {
    var existing = form.querySelector('.form-note[data-status-note]');
    if (existing) existing.remove();
    var p = document.createElement('p');
    p.className = 'form-note';
    p.setAttribute('data-status-note', '');
    p.setAttribute('role', 'status');
    p.setAttribute('aria-live', 'polite');
    p.style.color = isError ? '#c0392b' : 'var(--accent)';
    p.style.fontWeight = '600';
    p.textContent = message;
    var shell = form.querySelector('.form-card');
    (shell || form).appendChild(p);
  }

  /* -------------------------------------------------------------------------
     Registration hand-off — mirrors RegisterDetailsForm / PaymentConfirmForm
     ---------------------------------------------------------------------- */
  var REGISTER_STORAGE_PREFIX = 'lodestar:register:';

  function setupLocalStep(form) {
    wireFieldValidation(form);
    readProgress(form);
    form.addEventListener('input', function () { readProgress(form); });
    form.addEventListener('change', function () { readProgress(form); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        shakeForm(form);
        return;
      }
      var program = form.getAttribute('data-program');
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      var modal = document.getElementById('payment-modal');
      if (modal) {
        openPaymentModal(modal, program, data);
        return;
      }
      // No modal on this page (shouldn't happen on the current build, but
      // keeps the standalone payment page reachable if it's ever linked to
      // directly): fall back to the old hand-off.
      sessionStorage.setItem(REGISTER_STORAGE_PREFIX + program, JSON.stringify(data));
      window.location.href = 'programs-register-payment.html?program=' + encodeURIComponent(program);
    });
  }

  /* -------------------------------------------------------------------------
     Payment modal — same paymentConfirmForm() markup as the standalone
     programs-register-payment.html, populated from the step-1 form data and
     the selected program, then shown as a native <dialog>. Its own submit
     handling (validation, progress, success state) is already wired by
     initForms(), since the form inside it carries the same data-flow
     attribute every other form on the site does.
     ---------------------------------------------------------------------- */
  function openPaymentModal(modal, programSlug, data) {
    var prog = findProgram(programSlug);
    var formEl = modal.querySelector('form');
    if (!formEl) return;

    Object.keys(data).forEach(function (key) {
      var hidden = formEl.querySelector('input[name="' + key + '"]');
      if (hidden) hidden.value = data[key];
    });
    var setSummary = function (key, value) {
      var el = formEl.querySelector('[data-summary="' + key + '"]');
      if (el) el.textContent = value;
    };
    // Registering / Parent rows only make sense when step-1 supplied a name;
    // opened straight from "Register Now" they'd be empty, so hide them.
    var toggleRow = function (key, show) {
      var row = formEl.querySelector('[data-summary-row="' + key + '"]');
      if (row) row.hidden = !show;
    };
    toggleRow('registering', !!data.studentName);
    toggleRow('parent', !!data.parentName);
    if (data.studentName) setSummary('registering', data.studentName + ' · ' + prog.gradeLabel);
    if (data.parentName) setSummary('parent', data.parentName);
    setSummary('course', prog.title);
    setSummary('duration', prog.duration);

    var setHidden = function (name, value) {
      var el = formEl.querySelector('input[name="' + name + '"]');
      if (el) el.value = value;
    };
    setHidden('grade', prog.gradeLabel);
    setHidden('course', prog.title);
    setHidden('programSlug', prog.slug);

    var totalEl = formEl.querySelector('[data-pay-total]');
    if (totalEl) totalEl.textContent = rupees(prog.amount);

    var amountLabel = 'Confirm & pay ' + rupees(prog.amount);
    var submitBtn = formEl.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.setAttribute('data-idle-label', amountLabel);
      var rollIn = submitBtn.querySelector('.roll__in');
      var rollOut = submitBtn.querySelector('.roll__out');
      if (rollIn) rollIn.textContent = amountLabel;
      if (rollOut) rollOut.textContent = amountLabel;
    }

    // A fresh attempt after a previous success in the same visit should not
    // still show "Registration received" — reset to idle before reopening.
    if (formEl.dataset.status === 'success') {
      formEl.dataset.status = 'idle';
      setButtonState(submitBtn, 'idle', { idle: amountLabel, busy: 'Submitting…', done: 'Registration received' });
      readProgress(formEl);
      var note = formEl.querySelector('.form-note[data-status-note]');
      if (note) note.remove();
    }

    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }

  function initPaymentModal() {
    var modal = document.getElementById('payment-modal');
    if (!modal) return;
    var closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });
    // A click that lands on the dialog element itself (not inside the
    // form-card panel it wraps) is a click on the backdrop.
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
  }

  function setupPaymentForm() {
    var pay = document.querySelector('[data-component="payment-form"]');
    if (!pay) return;
    var program = pay.getAttribute('data-program');
    var raw = sessionStorage.getItem(REGISTER_STORAGE_PREFIX + program);

    var emptyState = pay.querySelector('[data-payment-empty]');
    var formEl = pay.querySelector('form');

    if (!raw) {
      if (formEl) formEl.hidden = true;
      if (emptyState) emptyState.hidden = false;
      return;
    }
    if (emptyState) emptyState.hidden = true;
    if (!formEl) return;
    formEl.hidden = false;

    var details = JSON.parse(raw);
    Object.keys(details).forEach(function (key) {
      var row = formEl.querySelector('[data-summary="' + key + '"]');
      if (row) row.textContent = details[key];
      var hidden = formEl.querySelector('input[name="' + key + '"]');
      if (hidden) hidden.value = details[key];
    });

    setupFormFlow(formEl);
    formEl.addEventListener('submit', function () {
      window.setTimeout(function () {
        sessionStorage.removeItem(REGISTER_STORAGE_PREFIX + program);
      }, 750);
    });
  }

  /* ==========================================================================
     Program data — ported from lib/content/programs.ts.
     The register/payment pages are single, query-string-driven pages (as in
     the source app: /programs/register?program=slug), so this static build
     renders their program-specific content client-side from this data.
     ========================================================================== */
  var LODESTAR_PROGRAMS = [
    {
      slug: 'foundation-building-plus', image: 'images/program-class9.jpg',
      title: 'Foundation Building PLUS', grade: 'Class 9', gradeLabel: '9th Grade',
      price: '₹12,000', amount: 12000, duration: '13 weeks',
      items: ['Psychometric + aptitude + interest test', '4 group webinars', '3 one-to-one expert sessions', '30-page report + stream decision'],
      detail: {
        outcome: ["Child's potential mapping", 'Awareness for child on — Personality, Aptitude, Interest, Aspiration', 'Awareness for child on World of Work — basics of working', 'Info and awareness on careers in Science, Arts, Commerce', 'Decision on stream + education path post Grade 10'],
        modules: [
          { kind: 'assessment', title: 'Assessment', description: 'Psychometric + Aptitude + Interest Test' },
          { kind: 'webinar', title: 'Four group webinars', description: 'One hour each, live', children: [{ title: 'Webinar 1', description: 'Know Yourself' }, { title: 'Webinar 2', description: 'World of Work' }, { title: 'Webinar 3', description: 'World of Careers 1 — Science Careers' }, { title: 'Webinar 4', description: 'World of Careers 2 — Commerce & Arts Careers' }] },
          { kind: 'session', title: 'Three one-on-one sessions', description: 'With a trained expert', children: [{ title: 'Session 1', description: 'Discover' }, { title: 'Session 2', description: 'Determine' }, { title: 'Session 3', description: 'Decide' }] },
        ],
        how: ['Pay and sign up for the program', 'Lodestar will contact you to schedule sessions', 'Attend sessions as per schedule', 'Finalise decision and get a 30-page report'],
      },
    },
    {
      slug: 'foundation-building', image: 'images/program-class9.jpg',
      title: 'Foundation Building', grade: 'Class 9', gradeLabel: '9th Grade',
      price: '₹5,000', amount: 5000, duration: '8 weeks',
      items: ['Psychometric + aptitude + interest test', '4 group webinars', 'Careers across Science, Commerce, Arts', 'Potential mapping report'],
      detail: {
        outcome: ["Child's potential mapping", 'Awareness for child on — Personality, Aptitude, Interest, Aspiration', 'Awareness for child on World of Work — basics of working', 'Info and awareness on careers in Science, Arts, Commerce'],
        modules: [
          { kind: 'assessment', title: 'Assessment', description: 'Psychometric + Aptitude + Interest Test' },
          { kind: 'webinar', title: 'Four group webinars', description: 'One hour each, live', children: [{ title: 'Webinar 1', description: 'Know Yourself' }, { title: 'Webinar 2', description: 'World of Work' }, { title: 'Webinar 3', description: 'World of Careers 1 — Science Careers' }, { title: 'Webinar 4', description: 'World of Careers 2 — Commerce & Arts Careers' }] },
        ],
        how: ['Pay and sign up for the program', 'Lodestar will contact you to schedule the webinars', 'Attend webinars as per schedule', 'Receive the potential mapping report'],
      },
    },
    {
      slug: 'core-decision', image: 'images/program-class10.jpg',
      title: 'Core Decision', grade: 'Class 10', gradeLabel: '10th Grade',
      price: '₹7,000', amount: 7000, duration: '7 weeks',
      items: ['Career Plan A + Plan B', 'Stream & +2 subject combination', 'Entrance exams to target in 12th', 'Degree and college shortlist'],
      detail: {
        outcome: ['Career Plan A and Plan B', 'Stream and +2 subject combination decided', 'Entrance exams to target in 12th', 'Degree and college shortlist'],
        modules: [
          { kind: 'assessment', title: 'Assessment', description: 'Psychometric + Aptitude + Interest Test' },
          { kind: 'webinar', title: 'Stream-specific career webinar', description: 'One hour, live' },
          { kind: 'session', title: 'Three one-on-one sessions', description: 'With a trained expert', children: [{ title: 'Session 1', description: 'Discover' }, { title: 'Session 2', description: 'Determine' }, { title: 'Session 3', description: 'Decide' }] },
        ],
        how: ['Pay and sign up for the program', 'Lodestar will contact you to schedule sessions', 'Attend sessions as per schedule', 'Finalise decision and get the written report'],
      },
    },
    {
      slug: 'finalizing-decision', image: 'images/program-class1112.jpg',
      title: 'Finalizing Decision', grade: 'Class 11 / 12', gradeLabel: '11th / 12th Grade',
      price: '₹7,000', amount: 7000, duration: '5 weeks',
      items: ['Degree & specialisation decision', 'Stream-specific career webinar', 'Tuition and entrance exam plan', 'Final college selection'],
      detail: {
        outcome: ['Degree and specialisation decision', 'Tuition and entrance exam plan', 'Final college selection'],
        modules: [
          { kind: 'assessment', title: 'Assessment', description: 'Psychometric + Aptitude + Interest Test' },
          { kind: 'webinar', title: 'Stream-specific career webinar', description: 'One hour, live' },
          { kind: 'session', title: 'Three one-on-one sessions', description: 'With a trained expert', children: [{ title: 'Session 1', description: 'Discover' }, { title: 'Session 2', description: 'Determine' }, { title: 'Session 3', description: 'Decide' }] },
        ],
        how: ['Pay and sign up for the program', 'Lodestar will contact you to schedule sessions', 'Attend sessions as per schedule', 'Finalise decision and get the written report'],
      },
    },
  ];
  var PROGRAM_NOTE = 'All webinars 1 hour duration. Test is online.';

  function rupees(n) { return '₹' + n.toLocaleString('en-IN'); }

  function findProgram(slug) {
    var found = LODESTAR_PROGRAMS.filter(function (p) { return p.slug === slug; })[0];
    return found || LODESTAR_PROGRAMS[0];
  }

  var CURRIC_ICONS = {
    assessment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16"/><path d="M7 20v-6M12 20V6M17 20v-9"/></svg>',
    webinar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="13" height="14" rx="2.5"/><path d="m16 10.5 5-2.8v8.6l-5-2.8"/></svg>',
    session: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 12.5c0 4-3.8 7.2-8.5 7.2a9.9 9.9 0 0 1-2.7-.4L4 21.5l1.5-3.9a6.9 6.9 0 0 1-2-4.6C3.5 8.7 7.3 5.5 12 5.5s8.5 3.2 8.5 7Z"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/></svg>',
  };
  var CHEVRON_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="curric__chevron" aria-hidden="true"><path d="m6 9.5 6 6 6-6"/></svg>';

  function curriculumHtml(modules, idPrefix, startCollapsed) {
    var html = '<ol class="curric">';
    modules.forEach(function (module) {
      var isOpen = !startCollapsed || !module.children;
      var panelId = idPrefix + '-' + module.title.replace(/\W+/g, '-');
      var rowBody = '<span class="curric__icon" aria-hidden="true">' + CURRIC_ICONS[module.kind] + '</span>' +
        '<span class="curric__copy"><span class="curric__title">' + escapeHtml(module.title) + '</span>' +
        (module.description ? '<span class="curric__desc">' + escapeHtml(module.description) + '</span>' : '') + '</span>';

      html += '<li class="curric__item" data-kind="' + module.kind + '"' + (module.children ? ' data-open="' + isOpen + '"' : '') + '>';
      if (module.children) {
        html += '<button type="button" class="curric__row curric__row--parent" aria-expanded="' + isOpen + '" aria-controls="' + panelId + '">' + rowBody + CHEVRON_DOWN + '</button>';
      } else {
        html += '<div class="curric__row">' + rowBody + '</div>';
      }
      if (module.children) {
        html += '<div class="curric__panel" id="' + panelId + '"><div><ol class="curric__children">';
        module.children.forEach(function (child, i) {
          html += '<li class="curric__child" style="--i:' + i + '"><span class="curric__child-title">' + escapeHtml(child.title) + '</span>' +
            (child.description ? '<span class="curric__child-desc">' + escapeHtml(child.description) + '</span>' : '') + '</li>';
        });
        html += '</ol></div></div>';
      }
      html += '</li>';
    });
    return html + '</ol>';
  }

  function dotListHtml(items) {
    return '<ul class="dot-list">' + items.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') + '</ul>';
  }

  function renderRegisterPage() {
    var root = document.querySelector('[data-page="programs-register"]');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var program = findProgram(params.get('program'));

    document.title = program.title + ' · Lodestar';
    var heroOverline = root.querySelector('[data-hero-overline]');
    var heroTitle = root.querySelector('[data-hero-title]');
    if (heroOverline) heroOverline.textContent = 'Programs · ' + program.gradeLabel;
    if (heroTitle) heroTitle.textContent = program.title;
    var heroBg = root.querySelector('[data-hero-bg] img');
    if (heroBg) { heroBg.src = program.image; heroBg.alt = 'Students in the ' + program.gradeLabel + ' age group'; }
    var metaDuration = root.querySelector('[data-meta-duration]');
    if (metaDuration) metaDuration.textContent = program.duration;
    var metaLevel = root.querySelector('[data-meta-level]');
    if (metaLevel) metaLevel.textContent = program.gradeLabel;

    // The sidebar "Register Now" button opens the checkout modal directly,
    // pre-filled with this program (no step-1 data needed — the modal collects
    // name/email/card itself).
    var payBtn = root.querySelector('[data-open-payment]');
    if (payBtn) {
      payBtn.addEventListener('click', function () {
        var modal = document.getElementById('payment-modal');
        if (modal) openPaymentModal(modal, program.slug, {});
      });
    }

    var outcomeEl = root.querySelector('[data-outcome]');
    if (outcomeEl) outcomeEl.innerHTML = dotListHtml(program.detail.outcome);
    var curricEl = root.querySelector('[data-curriculum]');
    if (curricEl) curricEl.innerHTML = curriculumHtml(program.detail.modules, program.slug + '-page', false);
    var howEl = root.querySelector('[data-how]');
    if (howEl) howEl.innerHTML = dotListHtml(program.detail.how);
    var noteEl = root.querySelector('[data-brush-note]');
    if (noteEl) noteEl.textContent = PROGRAM_NOTE;

    var form = root.querySelector('form[data-local-step]');
    if (form) form.setAttribute('data-program', program.slug);

    var thumb = root.querySelector('[data-sidebar-thumb] img');
    if (thumb) { thumb.src = program.image; thumb.alt = 'Students in the ' + program.gradeLabel + ' age group'; }
    var priceEl = root.querySelector('[data-sidebar-price]');
    if (priceEl) priceEl.textContent = program.price;
    var durationEl = root.querySelector('[data-sidebar-duration]');
    if (durationEl) durationEl.textContent = program.duration;
    var includedEl = root.querySelector('[data-sidebar-included]');
    if (includedEl) {
      includedEl.innerHTML = program.items.map(function (item) {
        return '<li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8.5 3.5 3.5L13 5"/></svg><span>' + escapeHtml(item) + '</span></li>';
      }).join('');
    }

    var switchGrid = root.querySelector('[data-switch-grid]');
    if (switchGrid) {
      switchGrid.innerHTML = LODESTAR_PROGRAMS.map(function (p) {
        var current = p.slug === program.slug;
        return '<a href="programs-register.html?program=' + p.slug + '" class="switch-card"' + (current ? ' aria-current="true"' : '') + '>' +
          '<span class="switch-card__grade">' + escapeHtml(p.gradeLabel) + '</span>' +
          '<span class="switch-card__title">' + escapeHtml(p.title) + '</span>' +
          '<span class="switch-card__foot"><span class="switch-card__price">' + rupees(p.amount) + '</span>' +
          (current ? '<span class="switch-card__current">Selected</span>' : '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>') +
          '</span></a>';
      }).join('');
    }
  }

  function renderPaymentPage() {
    var root = document.querySelector('[data-page="programs-register-payment"]');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var program = findProgram(params.get('program'));

    document.title = 'Confirm & pay — Lodestar';
    var heroTitle = root.querySelector('[data-hero-title]');
    if (heroTitle) heroTitle.innerHTML = 'Confirm & pay for <em class="heading__mark">' + escapeHtml(program.title) + '</em>';

    var pay = root.querySelector('[data-component="payment-form"]');
    if (pay) pay.setAttribute('data-program', program.slug);

    var submitBtn = root.querySelector('button[type="submit"]');
    var amountLabel = 'Confirm & pay ' + rupees(program.amount);
    if (submitBtn) {
      submitBtn.setAttribute('data-idle-label', amountLabel);
      var rollIn = submitBtn.querySelector('.roll__in');
      var rollOut = submitBtn.querySelector('.roll__out');
      if (rollIn) rollIn.textContent = amountLabel;
      if (rollOut) rollOut.textContent = amountLabel;
    }
    var totalEl = root.querySelector('[data-pay-total]');
    if (totalEl) totalEl.textContent = rupees(program.amount);
    var courseEl = root.querySelector('[data-summary="course"]');
    if (courseEl) courseEl.textContent = program.title;
    var durationEl = root.querySelector('[data-summary="duration"]');
    if (durationEl) durationEl.textContent = program.duration;
    var gradeInput = root.querySelector('input[name="grade"]');
    if (gradeInput) gradeInput.value = program.gradeLabel;
    var courseInput = root.querySelector('input[name="course"]');
    if (courseInput) courseInput.value = program.title;
    var slugInput = root.querySelector('input[name="programSlug"]');
    if (slugInput) slugInput.value = program.slug;

    // Registering / Parent rows come from step 1's sessionStorage payload —
    // filled in by setupPaymentForm() once it reads the same stash.
    var raw = sessionStorage.getItem(REGISTER_STORAGE_PREFIX + program.slug);
    if (raw) {
      var details = JSON.parse(raw);
      var regEl = root.querySelector('[data-summary="registering"]');
      if (regEl) regEl.textContent = (details.studentName || '') + ' · ' + program.gradeLabel;
      var parentEl = root.querySelector('[data-summary="parent"]');
      if (parentEl) parentEl.textContent = details.parentName || '';
    }
  }

  /* ==========================================================================
     Init
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    renderRegisterPage();
    renderPaymentPage();

    initHeader();
    initHashScroll();
    initFloatingCta();
    initReveal();
    initCountUp();
    initMagnetic();
    initAccordion();
    initCurriculum();
    initCopyButtons();
    initOfficeSelector();
    initBlogIndex();
    initStepper();
    initCarousel();
    initForms();
    initPaymentModal();
  });

  window.LodestarToast = Toast;
})();
