#!/usr/bin/env node
/* eslint-disable */
/*
 * Static-site generator for the Lodestar pure-HTML build.
 * Not part of the served site — run with `node generate.js` from this
 * folder to (re)produce the .html files one level up. Kept here so the
 * repeated header/footer/icon markup lives in one place instead of being
 * hand-duplicated across 16 files.
 */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..');

/* ==========================================================================
   Icons — ported from components/icons.tsx
   ========================================================================== */
function svg(inner, attrs) {
  attrs = attrs || '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${inner}</svg>`;
}
const ICON = {
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z"/></svg>',
  arrowRight: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"/></svg>',
  check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8.5 3.5 3.5L13 5"/></svg>',
  starRating: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .8 10 5.6l5.2.4-4 3.4 1.3 5.1L8 11.7l-4.5 2.8 1.3-5.1-4-3.4 5.2-.4L8 .8Z"/></svg>',
  lock: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" width="12" height="12"><rect x="3.25" y="7" width="9.5" height="6.5" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>',
  play: (w,h) => `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" ${w?`width="${w}" height="${h}"`:''}><path d="M4.5 3v10l8-5-8-5Z"/></svg>`,
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="22" height="22"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: (w,h) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="${w||22}" height="${h||22}"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  compass: svg('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z"/>'),
  route: svg('<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h5a4 4 0 0 0 0-8h-3a4 4 0 0 1 0-8"/>'),
  target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
  document: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  video: svg('<rect x="3" y="5" width="13" height="14" rx="2.5"/><path d="m16 10.5 5-2.8v8.6l-5-2.8"/>'),
  journal: svg('<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v20H7.5A2.5 2.5 0 0 1 5 19.5v-15Z"/><path d="M5 17.5h14M9.5 7h6"/>'),
  help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7"/><path d="M12 17.2h.01"/>'),
  school: svg('<path d="M12 3 2.5 8 12 13l9.5-5L12 3Z"/><path d="M6.5 10.5V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.5"/><path d="M21.5 8v5.5"/>'),
  users: svg('<circle cx="9.5" cy="8" r="3.2"/><path d="M3.5 20a6 6 0 0 1 12 0"/><path d="M17 5.4a3.2 3.2 0 0 1 0 6.2M18 14.6a6 6 0 0 1 3.5 5.4"/>'),
  user: svg('<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/>'),
  mapPin: svg('<path d="M12 21.5S5 15.6 5 10.3a7 7 0 1 1 14 0c0 5.3-7 11.2-7 11.2Z"/><circle cx="12" cy="10" r="2.6"/>'),
  phone: svg('<path d="M8.4 3.5H5.6A2.1 2.1 0 0 0 3.5 5.8c0 8.2 6.5 14.7 14.7 14.7a2.1 2.1 0 0 0 2.3-2.1v-2.8l-4.4-1.5-1.9 2.3a15.6 15.6 0 0 1-6.3-6.3l2.3-1.9L8.4 3.5Z"/>'),
  mail: svg('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  chart: svg('<path d="M4 20h16"/><path d="M7 20v-6M12 20V6M17 20v-9"/>'),
  checklist: svg('<path d="m3.5 7 2 2 3-3.5M3.5 16l2 2 3-3.5"/><path d="M12.5 7.5h8M12.5 16.5h8"/>'),
  growth: svg('<path d="M3.5 17.5 9 12l3.5 3.5L20.5 7"/><path d="M15.5 7h5v5"/>'),
  chat: svg('<path d="M20.5 12.5c0 4-3.8 7.2-8.5 7.2a9.9 9.9 0 0 1-2.7-.4L4 21.5l1.5-3.9a6.9 6.9 0 0 1-2-4.6C3.5 8.7 7.3 5.5 12 5.5s8.5 3.2 8.5 7Z"/>'),
  link: svg('<path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7"/>'),
  copy: svg('<rect x="9" y="9" width="11.5" height="11.5" rx="2.5"/><path d="M6 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v1"/>'),
  checkCircle: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.8 2.8L16.2 9.6"/>'),
  alert: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.2"/><path d="M12 16.4h.01"/>'),
  spinner: '<svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" opacity="0.28"/><path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5"/></svg>',
  search: svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/>'),
  chevronDown: (cls) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${cls?` class="${cls}"`:''}><path d="m6 9.5 6 6 6-6"/></svg>`,
  plusMinus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4.5 12h15"/><path class="plusminus__bar" d="M12 4.5v15"/></svg>',
};
const cardIconKeys = {
  compass: ICON.compass, route: ICON.route, target: ICON.target, document: ICON.document,
  video: ICON.video, journal: ICON.journal, help: ICON.help, school: ICON.school,
  users: ICON.users, clock: ICON.clock, chart: ICON.chart, checklist: ICON.checklist,
  growth: ICON.growth, chat: ICON.chat, spark: ICON.star,
};
function cardIcon(key) { return cardIconKeys[key] || ICON.star; }

/* ==========================================================================
   Site data — ported from lib/site.ts
   ========================================================================== */
const site = {
  name: 'Lodestar',
  tagline: "India's first scientific career guidance company, helping students in Grades 8–12 make confident, research-backed career decisions.",
  phone: '+91 89715 20005',
  phoneHref: 'tel:+918971520005',
  email: 'info@lodestar.guru',
  emailHref: 'mailto:info@lodestar.guru',
  productAppUrl: 'https://www.lodestar.guru:8443/edupath_webui/',
};

const primaryNav = [
  { label: 'Programs', section: 'programs', href: 'programs.html' },
  { label: 'Experts', section: 'experts', href: 'experts.html' },
  { label: 'For Schools', section: 'for-schools', href: 'for-schools.html' },
  { label: 'Testimonials', section: 'testimonials', href: 'testimonials.html' },
  { label: 'Resources', section: 'resources', href: 'resources.html' },
  { label: 'Contact', section: 'contact', href: 'contact.html' },
];

const footerNav = [
  { title: 'Explore', items: [
    { label: 'Home', href: 'index.html' },
    { label: 'For Schools', href: 'for-schools.html' },
    { label: 'About Us', href: 'about.html' },
    { label: 'Testimonials', href: 'testimonials.html' },
    { label: 'Talk to an Expert', href: 'experts.html' },
  ] },
  { title: 'Resources', items: [
    { label: 'Journal', href: 'resources.html' },
    { label: 'FAQs', href: 'programs.html#faq' },
    { label: 'Sample Report', href: 'programs.html#outcome' },
    { label: 'Videos', href: 'testimonials.html#videos' },
    { label: 'Programs', href: 'programs.html' },
  ] },
  { title: 'Company', items: [
    { label: 'Contact', href: 'contact.html' },
    { label: 'Bangalore office', href: 'contact.html' },
    { label: 'Hyderabad office', href: 'contact.html' },
    { label: 'Student Login', href: site.productAppUrl },
    { label: 'Careers', href: 'about.html#careers' },
  ] },
];

const legalNav = [
  { label: 'Privacy Policy', href: 'legal-privacy-policy.html' },
  { label: 'Terms & Conditions', href: 'legal-terms-conditions.html' },
  { label: 'Refund Policy', href: 'legal-refund-policy.html' },
];

const offices = [
  { id: 'bangalore', city: 'Bangalore', eyebrow: 'Bangalore · Head office', address: 'Jayanagar, Bengaluru, Karnataka', phone: '+91 89715 20005', alternate: '+91 94824 23888', email: 'info@lodestar.guru', hours: 'Mon–Sat, 9:30am – 6:30pm IST' },
  { id: 'hyderabad', city: 'Hyderabad', eyebrow: 'Hyderabad · Regional office', address: 'Banjara Hills, Hyderabad, Telangana', phone: '+91 89715 20005', alternate: '+91 94824 23888', email: 'info@lodestar.guru', hours: 'Mon–Sat, 9:30am – 6:30pm IST' },
];

const partnerSchools = ['GEAR Innovative Intl. School', 'Deens Academy', 'National Public School', 'Ekya Schools', 'Greenwood High', 'Inventure Academy'];

/* ==========================================================================
   Generic component helpers
   ========================================================================== */
function roll(text) {
  return `<span class="roll"><span class="roll__in">${text}</span><span class="roll__out" aria-hidden="true">${text}</span></span>`;
}
function btn(href, text, opts) {
  opts = opts || {};
  const variant = opts.variant || 'primary';
  const cls = ['btn', `btn--${variant}`, opts.size === 'sm' ? 'btn--sm' : '', opts.block ? 'btn--block' : ''].filter(Boolean).join(' ');
  const tag = opts.external ? 'a' : 'a';
  const relAttr = opts.external ? ' rel="noopener noreferrer"' : '';
  return `<a class="${cls}" href="${href}"${relAttr}>${roll(text)}${opts.arrow ? ICON.arrowRight : ''}</a>`;
}
function arrowLink(href, text, external) {
  return `<a class="link-arrow" href="${href}"${external ? ' rel="noopener noreferrer"' : ''}>${text}${ICON.arrowUpRight}</a>`;
}
function section(opts, inner) {
  const tone = opts.tone || 'plain';
  const cls = ['section', `section--${tone}`, opts.tight ? 'section--tight' : '', opts.className || ''].filter(Boolean).join(' ');
  const idAttr = opts.id ? ` id="${opts.id}"` : '';
  return `<section${idAttr} class="${cls}">\n<div class="container">\n${inner}\n</div>\n</section>`;
}
function sectionHeading(opts) {
  const centred = (opts.align || 'center') === 'center';
  const Tag = opts.as || 'h2';
  return `<div class="reveal${centred ? ' text-center' : ''}" data-reveal>
  ${opts.overline ? `<p class="overline">${opts.overline}</p>` : ''}
  <${Tag} class="h2${opts.overline ? ' mt-4' : ''}">${opts.title}</${Tag}>
  ${opts.lead ? `<p class="lead mt-5 measure${centred ? ' mx-auto' : ''}"${centred ? ' style="text-align:center"' : ''}>${opts.lead}</p>` : ''}
</div>`;
}
function reveal(inner, opts) {
  opts = opts || {};
  const cls = ['reveal', opts.className || ''].filter(Boolean).join(' ');
  const style = opts.delay ? ` style="--reveal-delay:${opts.delay}ms"` : '';
  return `<div class="${cls}" data-reveal${style}>${inner}</div>`;
}
function stat(value, label, animate) {
  return `<div><p class="stat__value">${animate ? `<span data-countup="${value}">${value}</span>` : value}</p><p class="stat__label">${label}</p></div>`;
}
function statRow(items, animate) {
  return `<div class="hero__stats">${items.map(s => stat(s.value, s.label, animate)).join('')}</div>`;
}
function media(caption, opts) {
  opts = opts || {};
  const variant = opts.variant || 'wide';
  const cls = `media media--${variant}${opts.src ? ' media--photo' : ''}${opts.className ? ' ' + opts.className : ''}`;
  const img = opts.src ? `<img src="${opts.src}" alt="${opts.alt || ''}" class="media__img" loading="lazy">` : '';
  return `<div class="${cls}" role="img" aria-label="${caption}">${img}<span class="media__caption" aria-hidden="true">${caption}</span></div>`;
}
function heroIllustration(src, alt) {
  return `<div class="hero-illustration"><img src="${src}" alt="${alt}"></div>`;
}
function checkList(items) {
  return `<ul class="check-list">${items.map(i => `<li>${ICON.check}<span>${i}</span></li>`).join('')}</ul>`;
}
function dotList(items) {
  return `<ul class="dot-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}
function featureList(items) {
  return `<ul class="feature-list">${items.map(i => `<li class="feature"><span class="feature__icon" aria-hidden="true">${ICON.star}</span><div><h3 class="h4">${i.title}</h3><p class="body mt-2">${i.body}</p></div></li>`).join('')}</ul>`;
}
function metaItem(iconHtml, text) {
  return `<span class="card__meta-item">${iconHtml}${text}</span>`;
}
function cardValue(text, size) {
  return `<span class="card__value card__value--${size || 'md'}">${text}</span>`;
}

/* --- Card system ---------------------------------------------------------- */
function card(opts, inner) {
  const tone = opts.tone || 'subtle';
  const Tag = opts.as || 'article';
  const cls = ['card', `card--${tone}`, opts.link ? 'card--link' : '', opts.className || ''].filter(Boolean).join(' ');
  const idAttr = opts.id ? ` id="${opts.id}"` : '';
  return `<${Tag}${idAttr} class="${cls}">${inner}</${Tag}>`;
}
function cardHeader(iconHtml, indexStr, copyHtml) {
  const iconInner = indexStr ? `<span class="card__index">${indexStr}</span>` : (iconHtml || '');
  return `<div class="card__header"><span class="card__icon" aria-hidden="true">${iconInner}</span><div class="card__header-copy">${copyHtml}</div></div>`;
}
function cardMedia(caption, opts) {
  opts = opts || {};
  const cls = `card__media${opts.tall ? ' card__media--tall' : ''}${opts.src ? ' card__media--photo' : ''}`;
  const img = opts.src ? `<img src="${opts.src}" alt="${opts.alt || ''}" class="card__media-img" loading="lazy">` : '';
  return `<div class="${cls}" role="img" aria-label="${caption}">${img}<span class="card__tag" aria-hidden="true">${opts.icon || ''}${caption}</span></div>`;
}
function cardEyebrow(text) { return `<p class="card__eyebrow">${text}</p>`; }
function cardTitle(text, opts) {
  opts = opts || {};
  const Tag = opts.as || 'h3';
  const cls = `card__title card__title--${opts.size || 'md'}`;
  const inner = opts.href ? `<a href="${opts.href}">${text}</a>` : text;
  return `<${Tag} class="${cls}">${inner}</${Tag}>`;
}
function cardBody(text) { return `<p class="card__body">${text}</p>`; }
function cardMeta(inner) { return `<div class="card__meta">${inner}</div>`; }

/* A pill-style category/tag badge, and a row of them. Reused by program cards
   (grade + focus), the schools/institutions grid and anywhere a card needs a
   scannable category label that reads as a badge rather than a caption.
   Pass a string for a plain badge, or { label, tone, icon } for a variant. */
function badge(item) {
  const o = typeof item === 'string' ? { label: item } : item;
  const cls = ['badge', o.tone ? `badge--${o.tone}` : '', o.icon ? 'badge--icon' : ''].filter(Boolean).join(' ');
  return `<span class="${cls}">${o.icon || ''}${o.label}</span>`;
}
function badgeRow(items) {
  return `<div class="card__badges">${items.map(badge).join('')}</div>`;
}

function simpleCard(tone, iconKey, eyebrow, title, body, opts) {
  opts = opts || {};
  return card({ tone }, cardHeader(cardIcon(iconKey), opts.index, `${eyebrow ? cardEyebrow(eyebrow) : ''}${cardTitle(title, { as: opts.titleAs })}`) + cardBody(body));
}
function mediaCard(tone, caption, iconKey, src, alt, title, body, opts) {
  opts = opts || {};
  return card({ tone, link: opts.link, id: opts.id }, cardMedia(caption, { icon: iconKey ? cardIcon(iconKey) : undefined, src, alt }) + cardTitle(title, { href: opts.href }) + cardBody(body));
}

/* ==========================================================================
   Page hero — ported from components/page-hero.tsx
   ========================================================================== */
function pageHero(opts) {
  const markSplit = opts.mark ? opts.title.split(opts.mark) : [opts.title, ''];
  const titleInner = opts.mark
    ? `${markSplit[0]}<em class="heading__mark">${opts.mark}</em>${markSplit[1]}`
    : opts.title;
  const copy = `<div${opts.aside ? '' : ' class="page-hero__copy"'}>
    ${opts.overline ? `<p class="overline"${opts.overlineAttr || ''}>${opts.overline}</p>` : ''}
    <h1 class="h1${opts.overline ? ' mt-4' : ''}"${opts.titleAttr || ''}>${titleInner}</h1>
    ${opts.lead ? `<p class="lead mt-5 measure">${opts.lead}</p>` : ''}
    ${opts.children || ''}
    ${opts.actions ? `<div class="flex flex-wrap items-center gap-4 mt-8">${opts.actions}</div>` : ''}
  </div>`;
  const cls = `section section--hero-light${opts.tight ? ' section--tight' : ''}`;
  const bg = opts.backgroundImage
    ? `<div class="page-hero__bg" aria-hidden="true" data-hero-bg><img src="${opts.backgroundImage.src}" alt="${opts.backgroundImage.alt || ''}" class="page-hero__bg-img"></div>`
    : '';
  const body = opts.aside
    ? `<div class="split ${opts.layout === 'form' ? 'split--form' : 'split--copy-wide'}">${copy}${opts.aside}</div>`
    : copy;
  return `<section class="${cls}"${opts.id ? ` id="${opts.id}"` : ''}>
${bg}
<div class="container container--wide">
${body}
${opts.stats ? statRow(opts.stats, true) : ''}
</div>
</section>`;
}

/* ==========================================================================
   Layout — header, footer, floating CTA, document shell
   ========================================================================== */
function isCurrentSection(navSection, pageSection) {
  return navSection === pageSection;
}
function header(pageSection) {
  const navLinks = primaryNav.map(item => {
    const current = isCurrentSection(item.section, pageSection);
    return `<a href="${item.href}" class="header__link"${current ? ' aria-current="page"' : ''} data-label="${item.label}">${item.label}</a>`;
  }).join('\n');
  const mobileLinks = primaryNav.map(item => {
    const current = isCurrentSection(item.section, pageSection);
    return `<li><a href="${item.href}"${current ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
  }).join('\n');
  return `<span class="header__progress" aria-hidden="true"></span>
<header class="header" data-scrolled="false" data-open="false">
  <div class="header__inner">
    <a href="index.html" class="brand" aria-label="${site.name} — home">
      <img src="images/lodestar-logo.jpg" alt="" width="163" height="70" class="brand__logo">
    </a>
    <nav class="header__nav" aria-label="Primary" data-ind="off" data-ind-ready="false">
      ${navLinks}
    </nav>
    <span class="header__divider" aria-hidden="true"></span>
    <div class="header__actions">
      <a class="header__login" href="${site.productAppUrl}" rel="noopener noreferrer">Login</a>
      <a class="btn btn--primary btn--sm btn--auto" href="https://www.lodestar.guru:8443/edupath_webui/Test/SendMessageToChlid" target="_blank" rel="noopener">${roll('Free Assessment')}</a>
      <button type="button" class="header__menu-btn" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
        ${ICON.menu}
      </button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" data-open="false">
    <ul class="mobile-nav__list">
      ${mobileLinks}
    </ul>
    <div class="mobile-nav__actions">
      <a class="btn btn--primary" href="https://www.lodestar.guru:8443/edupath_webui/Test/SendMessageToChlid" target="_blank" rel="noopener">${roll('Free Assessment')}</a>
      <a class="btn btn--ghost" href="${site.productAppUrl}" rel="noopener noreferrer">${roll('Login')}</a>
    </div>
  </div>
</header>`;
}

function footer() {
  const cols = footerNav.map(col => {
    const items = col.items.map(item => {
      const isExternal = item.href.startsWith('http');
      return `<li>${isExternal ? `<a href="${item.href}" rel="noopener noreferrer">${item.label}</a>` : `<a href="${item.href}">${item.label}</a>`}</li>`;
    }).join('\n');
    return `<nav class="footer__col" aria-label="${col.title}"><h2 class="footer__col-title">${col.title}</h2><ul>${items}</ul></nav>`;
  }).join('\n');

  const legal = legalNav.map((item, i) => `<span class="flex items-center gap-3">${i > 0 ? '<span class="footer__sep" aria-hidden="true">·</span>' : ''}<a href="${item.href}">${item.label}</a></span>`).join('\n');

  return `<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <a href="index.html" class="brand" aria-label="${site.name} — home">${ICON.star}${site.name.toUpperCase()}</a>
        <p class="footer__about">${site.tagline}</p>
        <p class="footer__contact">
          <a href="${site.phoneHref}">${site.phone}</a>
          <span class="footer__sep" aria-hidden="true">·</span>
          <a href="${site.emailHref}">${site.email}</a>
        </p>
      </div>
      ${cols}
      <div class="footer__cta">
        <h2>Start with the free test</h2>
        <p>Fifteen minutes. Instant snapshot. No payment.</p>
        <a class="btn btn--primary btn--sm btn--auto" href="https://www.lodestar.guru:8443/edupath_webui/Test/SendMessageToChlid" target="_blank" rel="noopener">${roll('Free Assessment')}${ICON.arrowRight}</a>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 Lodestar. All Rights Reserved.</p>
      <div class="footer__legal">${legal}</div>
    </div>
  </div>
</footer>`;
}

function floatingCta() {
  return `<div class="floatcta" data-visible="false" aria-hidden="true" inert>
  <span class="floatcta__copy"><strong>Start with the free test</strong><span>Fifteen minutes. No payment.</span></span>
  <a class="btn btn--primary btn--sm btn--auto" href="https://www.lodestar.guru:8443/edupath_webui/Test/SendMessageToChlid" target="_blank" rel="noopener">${roll('Free Assessment')}${ICON.arrowRight}</a>
  <button type="button" class="floatcta__close" aria-label="Dismiss this prompt">${ICON.close(16, 16)}</button>
</div>`;
}

function layout(opts) {
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${opts.title} · Lodestar</title>
<meta name="description" content="${opts.description}">
<link rel="stylesheet" href="css/globals.css">
</head>
<body data-page="${opts.page}">
<a class="skip-link" href="#main">Skip to content</a>
${header(opts.section)}
<main id="main">
${opts.content}
</main>
${footer()}
${floatingCta()}
<script src="js/site.js"></script>
</body>
</html>`;
}

/* ==========================================================================
   Curriculum — ported from components/curriculum.tsx
   ========================================================================== */
const CURRIC_ICON = { assessment: ICON.chart, webinar: ICON.video, session: ICON.chat, note: ICON.clock };
function curriculumHtml(modules, idPrefix, startCollapsed) {
  let html = '<ol class="curric">';
  modules.forEach((module) => {
    const isOpen = !startCollapsed || !module.children;
    const panelId = `${idPrefix}-${module.title.replace(/\W+/g, '-')}`;
    const rowBody = `<span class="curric__icon" aria-hidden="true">${CURRIC_ICON[module.kind]}</span>
      <span class="curric__copy"><span class="curric__title">${module.title}</span>${module.description ? `<span class="curric__desc">${module.description}</span>` : ''}</span>`;
    html += `<li class="curric__item" data-kind="${module.kind}"${module.children ? ` data-open="${isOpen}"` : ''}>`;
    if (module.children) {
      html += `<button type="button" class="curric__row curric__row--parent" aria-expanded="${isOpen}" aria-controls="${panelId}">${rowBody}${ICON.chevronDown('curric__chevron')}</button>`;
    } else {
      html += `<div class="curric__row">${rowBody}</div>`;
    }
    if (module.children) {
      html += `<div class="curric__panel" id="${panelId}"><div><ol class="curric__children">`;
      module.children.forEach((child, i) => {
        html += `<li class="curric__child" style="--i:${i}"><span class="curric__child-title">${child.title}</span>${child.description ? `<span class="curric__child-desc">${child.description}</span>` : ''}</li>`;
      });
      html += '</ol></div></div>';
    }
    html += '</li>';
  });
  return html + '</ol>';
}

/* ==========================================================================
   Small remaining component helpers
   ========================================================================== */
function stars(count) {
  return `<div class="stars" role="img" aria-label="${count || 5} out of 5 stars">${Array.from({ length: count || 5 }, () => ICON.starRating).join('')}</div>`;
}
const AVATAR_TINTS = [
  { bg: 'var(--ls-blue-200)', fg: 'var(--ls-navy-800)' },
  { bg: 'var(--ls-blue-650)', fg: 'var(--ls-white)' },
  { bg: 'var(--ls-blue-400)', fg: 'var(--ls-navy-900)' },
  { bg: 'var(--clay-surface)', fg: 'var(--ls-navy-800)' },
];
function initialAvatar(name) {
  const initial = name.trim().charAt(0).toUpperCase();
  const tint = AVATAR_TINTS[name.charCodeAt(0) % AVATAR_TINTS.length];
  return `<span class="avatar avatar--initial" style="background:${tint.bg};color:${tint.fg}" aria-hidden="true">${initial}</span>`;
}
function quoteCard(opts) {
  return `<figure class="card card--${opts.variant || 'plain'}">
  <span class="card__quote-mark" aria-hidden="true">&rdquo;</span>
  <blockquote class="card__quote">${opts.quote}</blockquote>
  <figcaption class="card__meta card__byline">
    ${initialAvatar(opts.name)}
    <span class="card__byline-copy"><strong>${opts.name}</strong><span>${opts.role}</span></span>
    ${opts.showStars === false ? '' : `<span class="card__value">${stars()}</span>`}
  </figcaption>
</figure>`;
}
/* ==========================================================================
   Testimonial carousel — a scroll-snap track of quote cards, one slide at a
   time, with prev/next buttons and dot indicators. See initCarousel() in
   site.js for the scroll-sync and hookup.
   ========================================================================== */
/* One video-story slide: a play-button poster that links through to the
   testimonials page, with the quote and parent overlaid on a scrim. */
function videoTestimonialCard(item) {
  return `<div class="vtcard">
  <a class="vtcard__media" href="testimonials.html#videos" aria-label="Watch ${item.name}'s video story">
    <img src="${item.image}" alt="${item.alt || ''}" class="vtcard__img" loading="lazy">
    <span class="vtcard__scrim" aria-hidden="true"></span>
    <span class="vtcard__badge" aria-hidden="true">${ICON.video}Video story</span>
    <span class="vtcard__play" aria-hidden="true"><span class="vtcard__play-ring">${ICON.play(20, 20)}</span></span>
    <span class="vtcard__overlay">
      <span class="vtcard__quote">${item.quote}</span>
      <span class="vtcard__by"><strong>${item.name}</strong><span>${item.role}</span></span>
    </span>
  </a>
</div>`;
}

function carousel(items, opts) {
  opts = opts || {};
  const variant = opts.variant || 'clay';
  const slides = items.map((item, i) => {
    const inner = opts.type === 'video'
      ? videoTestimonialCard(item)
      : quoteCard({ quote: item.quote, name: item.name, role: item.role, variant });
    return `<div class="carousel__slide${i === 0 ? ' is-active' : ''}" data-carousel-slide role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">${inner}</div>`;
  }).join('');
  const dots = items.map((_, i) => `<button type="button" class="carousel__dot${i === 0 ? ' is-active' : ''}" data-carousel-dot aria-label="Go to testimonial ${i + 1}"></button>`).join('');
  const autoAttr = opts.autoplay ? ` data-autoplay="${opts.autoplay}"` : '';
  const modClass = opts.type === 'video' ? ' carousel--video' : '';
  return `<div class="carousel${modClass}" data-component="carousel"${autoAttr} aria-roledescription="carousel" aria-label="${opts.label || 'Testimonials'}">
  <div class="carousel__track" data-carousel-track>${slides}</div>
  <div class="carousel__controls">
    <button type="button" class="carousel__btn carousel__btn--prev" data-carousel-prev aria-label="Previous testimonial">${ICON.arrowRight}</button>
    <div class="carousel__dots" data-carousel-dots>${dots}</div>
    <button type="button" class="carousel__btn carousel__btn--next" data-carousel-next aria-label="Next testimonial">${ICON.arrowRight}</button>
  </div>
</div>`;
}

function accordion(items, idPrefix) {
  const html = items.map((item, i) => {
    const isOpen = i === 0;
    const paras = (Array.isArray(item.a) ? item.a : [item.a]).map(p => `<p>${p}</p>`).join('');
    return `<details class="accordion-item" data-open="${isOpen}" open>
  <summary aria-expanded="${isOpen}">${item.q}${ICON.plusMinus.replace('<svg ', '<svg class="accordion-item__marker" ')}</summary>
  <div class="accordion-item__panel"><div>${paras}</div></div>
</details>`;
  }).join('\n');
  return `<div class="accordion">${html}</div>`;
}

module.exports = {
  fs, path, OUT, ICON, cardIcon, site, primaryNav, footerNav, legalNav, offices, partnerSchools,
  roll, btn, arrowLink, section, sectionHeading, reveal, stat, statRow, media, heroIllustration,
  checkList, dotList, featureList, metaItem, cardValue, card, cardHeader, cardMedia, cardEyebrow,
  cardTitle, cardBody, cardMeta, badge, badgeRow, simpleCard, mediaCard, pageHero, header, footer, floatingCta, layout,
  curriculumHtml, stars, initialAvatar, quoteCard, carousel, accordion,
};
