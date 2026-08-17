const G = require('./generate');
const D = require('./data');
const {
  ICON, cardIcon, roll, btn, arrowLink, section, sectionHeading, reveal, stat, statRow, media,
  heroIllustration, checkList, dotList, featureList, metaItem, cardValue, card, cardHeader, cardMedia,
  cardEyebrow, cardTitle, cardBody, cardMeta, badgeRow, curriculumHtml, stars, initialAvatar, quoteCard, accordion, site, offices, partnerSchools,
} = G;

/* ==========================================================================
   Home hero + hero note — ported from components/home-hero.tsx, hero-note.tsx
   ========================================================================== */
function homeHero() {
  return `<section class="section section--hero-light">
  <div class="container container--wide hero">
    <div class="stack gap-6">
      <h1 class="display">
        <span style="display:block">Your child has <em class="heading__mark">one career <span class="hero__hot-word">decision</span></em> to make.</span>
        <span style="display:block">We make sure it's <em class="heading__mark">the right one</em>.</span>
      </h1>
      <p class="lead measure">Psychometric assessment, 250+ researched careers and three one-to-one sessions with a trained expert — ending in a written plan from stream to college. Trusted by 40,000+ parents since 2011.</p>
      <div class="flex flex-wrap gap-4">
        <a href="free-assessment.html" class="btn btn--primary magnetic">${roll('Take the Free Assessment')}${ICON.arrowRight}</a>
      </div>
      <div class="hero__trust">
        ${stars()}
        <span>40,000+ parents trust Lodestar</span>
      </div>
    </div>
    <div class="hero__art">
      ${heroIllustration('images/illustrations/resources-hero.svg', 'An illustration of a student reading a book')}
      <div class="hero__float hero__float--a" aria-hidden="true"><div class="hero__float-card"><span class="hero__float-icon">${ICON.growth}</span><span class="hero__float-copy"><strong>40,000+</strong><span>Parents guided</span></span></div></div>
      <div class="hero__float hero__float--b" aria-hidden="true"><div class="hero__float-card"><span class="hero__float-icon hero__float-icon--check">${ICON.check}</span><span class="hero__float-copy"><strong>93%</strong><span>rate sessions excellent</span></span></div></div>
    </div>
  </div>
  <div class="container container--wide">
    ${statRow(D.heroStats, true)}
  </div>
</section>`;
}

function heroNote() {
  return `<div class="slant">
  <div class="container container--wide slant__rail">
    <aside class="slant__note" aria-label="Before you read on">
      <span class="slant__tape" aria-hidden="true"></span>
      <p class="slant__label">Before you read on</p>
      <ul class="slant__lines">
        <li>Grades 8–12</li>
        <li>Three one-to-one sessions</li>
        <li>A written 30-page plan</li>
        <li>Bangalore &amp; Hyderabad</li>
      </ul>
      <a class="slant__action" href="programs.html#method">How it works${ICON.arrowRight}</a>
    </aside>
  </div>
</div>`;
}

/* ==========================================================================
   Home page — ported from app/page.tsx
   ========================================================================== */
const homeProgramPicks = [
  { slug: 'foundation-building-plus', icon: 'compass', blurb: 'Assessment, webinars and three expert sessions — the complete start.' },
  { slug: 'core-decision', icon: 'target', blurb: 'The stream decision, made with data instead of guesswork.' },
  { slug: 'finalizing-decision', icon: 'growth', blurb: 'A college shortlist and a concrete plan before board exams.' },
];

function homePage() {
  const programsPicks = homeProgramPicks.map((pick, i) => {
    const program = D.programs.find(p => p.slug === pick.slug);
    return reveal(card({ tone: 'clay' },
      cardMedia(program.grade, { icon: cardIcon(pick.icon), src: program.image, alt: `Students in the ${program.gradeLabel} age group` }) +
      cardEyebrow(program.grade) +
      cardTitle(program.title, { size: 'lg' }) + cardBody(pick.blurb)
    ), { delay: i * 90 });
  }).join('\n');

  const stepsCards = D.steps.map((s, i) => reveal(
    card({ tone: i === 1 ? 'navy' : 'clay' }, cardHeader(cardIcon(s.icon), null, cardEyebrow(`Step ${s.n}`) + cardTitle(s.title)) + cardBody(s.body)),
    { delay: i * 90 }
  )).join('\n');

  const segmentCards = D.audienceSegments.map((seg, i) => reveal(`<article class="segment">
    <div class="segment__media"><img src="${seg.image}" alt="${seg.imageAlt}" loading="lazy"></div>
    <div class="segment__body">
      <div class="segment__head"><span class="segment__icon" aria-hidden="true">${cardIcon(seg.icon)}</span><div><h3 class="segment__title">${seg.label}</h3><p class="segment__tagline">${seg.tagline}</p></div></div>
      <p class="segment__desc">${seg.desc}</p>
      ${checkList(seg.offers)}
      <div class="segment__logos">
        <p class="segment__logos-label">Trusted by</p>
        <div class="segment__logo-row">${seg.members.map(m => `<span class="segment__logo"><span class="segment__logo-mark" aria-hidden="true">${m.trim().charAt(0)}</span><span class="segment__logo-name">${m}</span></span>`).join('')}</div>
      </div>
      <p class="segment__cta">${arrowLink(seg.cta.href, seg.cta.label)}</p>
    </div>
  </article>`, { delay: i * 100 })).join('\n');

  const resourceGrid = D.resourceCards.map((c, i) => reveal(
    card({ tone: 'clay', link: true }, cardMedia(c.tag, { icon: cardIcon(c.icon) }) + cardTitle(c.title, { href: c.href }) + cardBody(c.body) + cardMeta(`<a class="card__cta" href="${c.href}">Explore${ICON.arrowRight}</a>`)),
    { delay: i * 80 }
  )).join('\n');

  return homeHero() + heroNote() +
    section({ tone: 'soft', className: 'watermark-band' }, `
${reveal(`<div><h2 class="h2">Career decisions shouldn't feel like finding a needle in a haystack</h2><p class="body mt-6">Lodestar was founded by education entrepreneurs with more than 50 years of combined experience running Manipal Education, MeritTrac and Pearson. We replaced guesswork with data: scientific assessment, researched career guides validated by industry practitioners, and authentic information on 200+ colleges, 100+ exams and India's leading tutorials.</p><p class="mt-6">${arrowLink('programs.html#method', 'Discover the Lodestar way')}</p></div>${media('Founders / campus', { variant: 'wide', src: 'images/founders-campus.jpg', alt: 'Students at work in a modern Indian classroom' })}`, { className: 'split split--copy-wide' })}
<p class="watermark" aria-hidden="true">SINCE 2011</p>`) +

    section({ tone: 'plain' }, `
${sectionHeading({ overline: 'How it works', title: 'Three sessions. One confident decision.', lead: 'The same three-step process, refined across 60,000 counselling sessions and delivered one-to-one by a trained expert.' })}
<div class="grid grid--3 mt-12">${stepsCards}</div>`) +

    section({ tone: 'tint' }, `
${reveal(`${media('Counselling session in progress', { variant: 'tall', src: 'images/counselling-session.jpg', alt: 'A counsellor and a student in conversation' })}<div><h2 class="h2">Guesswork is expensive. We removed it.</h2><div class="mt-8">${featureList(D.whyLodestar)}</div></div>`, { className: 'split' })}`) +

    section({ tone: 'subtle' }, `
<div class="flex flex-wrap items-center justify-between gap-6 reveal" data-reveal>
  <div><p class="overline">Our programs</p><h2 class="h2 mt-4">One program for wherever your child is right now</h2></div>
  ${arrowLink('programs.html', 'Explore all programs')}
</div>
<div class="grid grid--3 mt-12">${programsPicks}</div>`) +

    section({ tone: 'plain', tight: true }, `
${reveal(`<div class="split split--copy-wide" style="align-items:center">
  <div>
    <p class="overline">Start here · Free</p>
    <h2 class="h2 mt-4">Not sure yet? Start with the free assessment.</h2>
    <p class="lead mt-5">Fifteen minutes online. Your child answers, you get an instant snapshot of their strengths and interest areas — and a clear sense of whether the full program is worth it. No payment, no obligation.</p>
  </div>
  <div class="stack gap-3" style="align-items:flex-start">
    <a href="free-assessment.html" class="btn btn--primary magnetic">${roll('Take the Free Assessment')}${ICON.arrowRight}</a>
    <p class="small">lodestar.guru/free-assessment · secure HTTPS</p>
  </div>
</div>`, { className: 'cta-panel' })}`) +

    section({ tone: 'plain' }, `
${sectionHeading({ overline: 'Who we work with', title: 'Beyond the family: schools and institutions', lead: 'The same science, delivered two ways. Find the offer that describes you.' })}
<div class="segments mt-14">${segmentCards}</div>`) +

    section({ tone: 'subtle', className: 'watermark-band watermark-band--right' }, `
${reveal(`<div class="text-center"><p class="overline">Parent stories</p><h2 class="h2 mt-4">Hear it from parents, in their words</h2><p class="lead mt-5 measure mx-auto" style="text-align:center">Short video stories from families who came through the same decision yours is facing now.</p></div>`)}
<div class="carousel-wrap mt-12 reveal" data-reveal>${G.carousel(D.videoTestimonials, { label: 'Parent video stories', type: 'video', autoplay: 7000 })}</div>
<p class="text-center mt-8 reveal" data-reveal>${arrowLink('testimonials.html#videos', 'Watch all parent stories')}</p>
<p class="watermark" aria-hidden="true">PARENT VOICES</p>`) +

    section({ tone: 'plain' }, `
<div class="flex flex-wrap items-center justify-between gap-6 reveal" data-reveal>
  <div><p class="overline">Resources</p><h2 class="h2 mt-4">Free tools before you commit to anything</h2></div>
  ${arrowLink('resources.html', 'View all resources')}
</div>
<div class="grid grid--4 mt-12">${resourceGrid}</div>`);
}

/* ==========================================================================
   About — ported from app/about/page.tsx
   ========================================================================== */
function aboutPage() {
  const stats = [
    { value: '2011', label: 'Founded' },
    { value: '50+ yrs', label: 'Combined leadership experience' },
    { value: '100+', label: 'Trained expert counsellors' },
    { value: '60,000', label: 'Counselling sessions delivered' },
  ];
  const teams = [
    { banner: 'Career specialists', icon: 'compass', title: 'Career Specialists', body: 'Psychometrics & aptitude interpretation' },
    { banner: 'Research team', icon: 'chart', title: 'Research Team', body: '250+ career guide books, validated by practitioners' },
    { banner: 'Education analysts', icon: null, title: 'Education Analysts', body: 'Colleges, entrance exams, courses and tutorials' },
    { banner: 'Quality team', icon: null, title: 'Quality Team', body: 'Post-session feedback and corrective action' },
  ];
  const teamCards = teams.map((t, i) => reveal(
    card({ tone: 'clay' }, cardMedia(t.banner, { icon: t.icon ? cardIcon(t.icon) : undefined }) + cardTitle(t.title) + cardBody(t.body)),
    { delay: i * 90 }
  )).join('\n');

  return G.pageHero({
    overline: 'About Lodestar', title: 'Who is behind this — and can you trust them?', mark: 'can you trust them?',
    lead: 'The question every parent is actually asking. Company history and our expert bench, on one page instead of three.',
    stats: [{ value: '2011', label: 'Founded' }, { value: '50+ yrs', label: 'Combined leadership experience' }, { value: '100+', label: 'Trained expert counsellors' }, { value: '60,000', label: 'Counselling sessions delivered' }],
  }) +
    section({ tone: 'plain' }, reveal(`<div>
  <h2 class="h2">Founded in 2011 by people who had already built India's education infrastructure</h2>
  <p class="body mt-6">Lodestar is India's first scientific career guidance program. It helps parents and children make a smart career decision using accurate data and evolved decision-making tools — exposure to 250+ career options, expert guidance from trained specialists, individual attention for every child, and a complete written career plan at the end.</p>
  <p class="body mt-5">The company was founded by education entrepreneurs and professionals with more than 50 years of combined experience running large institutions including Manipal Education, MeritTrac and Pearson. That background is why the program is built around measurement and research rather than intuition.</p>
</div>${media('Students, in the classroom', { variant: 'wide', src: 'images/founders-campus.jpg' })}`, { className: 'split split--copy-wide' })) +
    section({ tone: 'soft', tight: true }, `<div class="hero__stats reveal" data-reveal style="margin-top:0">${stats.map(s => stat(s.value, s.label, true)).join('')}</div>`) +
    section({ tone: 'plain', id: 'careers' }, `
${reveal(`<div>
  <p class="overline">Our experts</p>
  <h2 class="h2 mt-4">The people your child actually sits with</h2>
  <p class="body mt-6">Every counsellor on the bench has run at least a hundred individual sessions and is supported by the Lodestar platform's current data on careers, courses and colleges.</p>
  <p class="body mt-5">Behind each session sits a research team, education analysts and a quality team — the four groups below — so the advice your child hears is measured, current and checked.</p>
  <p class="mt-8">${arrowLink('experts.html', 'Meet the expert bench')}</p>
</div>${media('A Lodestar counselling session in progress', { variant: 'tall', src: 'images/counselling-session.jpg', alt: 'A counsellor guiding a student through their options' })}`, { className: 'split split--reverse' })}
<div class="grid grid--4 mt-14">${teamCards}</div>`);
}

/* ==========================================================================
   Contact — ported from app/contact/page.tsx + office-selector.tsx
   ========================================================================== */
function officeSelector() {
  const tabs = offices.map((o, i) => `<button type="button" role="tab" id="tab-${o.id}" data-office="${o.id}" aria-selected="${i === 0}" aria-controls="panel-${o.id}" tabindex="${i === 0 ? 0 : -1}" class="btn btn--auto ${i === 0 ? 'btn--navy' : 'btn--ghost'}">${roll(o.city)}</button>`).join('\n');
  const panels = offices.map((o, i) => `<div class="office-card mt-6" data-office="${o.id}" role="tabpanel" id="panel-${o.id}" aria-labelledby="tab-${o.id}"${i === 0 ? '' : ' hidden'}>
  <p class="card__eyebrow">${o.eyebrow}</p>
  <h3 class="card__title card__title--lg office-card__address">${ICON.mapPin}${o.address}</h3>
  <dl class="office-rows">
    <div class="office-row"><dt>${ICON.phone}<span class="sr-only">Phone</span></dt><dd><a href="tel:${o.phone.replace(/\s/g, '')}">${o.phone}</a>${copyBtn(o.phone, `Copy phone number for ${o.city}`, 'Phone number')}</dd></div>
    <div class="office-row"><dt>${ICON.phone}<span class="sr-only">Alternate phone</span></dt><dd><a href="tel:${o.alternate.replace(/\s/g, '')}">${o.alternate}</a><span class="office-row__note">Alternate</span>${copyBtn(o.alternate, `Copy alternate phone number for ${o.city}`, 'Phone number')}</dd></div>
    <div class="office-row"><dt>${ICON.mail}<span class="sr-only">Email</span></dt><dd><a href="mailto:${o.email}">${o.email}</a>${copyBtn(o.email, `Copy email address for ${o.city}`, 'Email address')}</dd></div>
    <div class="office-row"><dt>${ICON.clock}<span class="sr-only">Hours</span></dt><dd>${o.hours}</dd></div>
  </dl>
  <div class="office-map mt-6"><iframe class="office-map__frame" src="https://www.google.com/maps?q=${encodeURIComponent(o.address)}&output=embed" title="Map showing the Lodestar office in ${o.address}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  <p class="mt-4">${arrowLink(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`, 'Get directions', true)}</p>
</div>`).join('\n');

  return `<div data-component="office-selector">
  <div class="chip-group tabs" role="tablist" aria-label="Choose a city" data-ready="false">
    <span class="tabs__marker" aria-hidden="true"></span>
    ${tabs}
  </div>
  ${panels}
</div>`;
}
function copyBtn(value, label, what) {
  return `<button type="button" class="copy-btn" data-value="${value}" data-label="${label}" data-what="${what}" aria-label="${label}"><span class="copy-btn__icons" aria-hidden="true">${ICON.copy.replace('<svg ', '<svg class="copy-btn__rest" ')}${ICON.check.replace('<svg ', '<svg class="copy-btn__done" ')}</span></button>`;
}

function honeypot() {
  return `<div class="sr-only" aria-hidden="true"><label for="company-website">Leave this field empty</label><input id="company-website" name="companyWebsite" tabindex="-1" autocomplete="off"></div>`;
}
function formProgress() {
  return `<div class="progress" data-state="filling">
  <div class="progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="0" aria-label="Form completion">
    <span class="progress__fill" style="--progress:0" aria-hidden="true"></span>
  </div>
  <p class="progress__label"></p>
</div>`;
}
function inputField(opts) {
  const attrs = [
    `class="input"`, `id="${opts.name}"`, `name="${opts.name}"`, `type="${opts.type || 'text'}"`,
    `placeholder="${opts.placeholder}"`, opts.required === false ? '' : 'required',
    opts.autoComplete ? `autocomplete="${opts.autoComplete}"` : '',
    opts.pattern ? `pattern="${opts.pattern}"` : '',
    opts.invalidMessage ? `data-invalid-message="${opts.invalidMessage}"` : '',
  ].filter(Boolean).join(' ');
  return `<div class="field">
  <label class="sr-only" for="${opts.name}">${opts.label}</label>
  <input ${attrs}>
  ${ICON.check.replace('<svg ', '<svg class="field__tick" ')}
  <p class="field__error" id="${opts.name}-error"></p>
</div>`;
}
function labelledInput(opts) {
  return `<div class="field-group">
  <label class="field__label" for="${opts.name}">${opts.label}</label>
  ${inputField(opts)}
</div>`;
}
function selectField(opts) {
  const options = opts.options.map(o => `<option value="${o}">${o}</option>`).join('');
  return `<div class="field">
  <label class="field__label" for="${opts.name}">${opts.label}</label>
  <div class="select-wrap">
    <select class="input select" id="${opts.name}" name="${opts.name}" required>
      <option value="" disabled selected>${opts.placeholder}</option>
      ${options}
    </select>
    ${ICON.chevronDown('select-wrap__chevron')}
  </div>
</div>`;
}
function chipRadios(opts) {
  const chips = opts.options.map(o => `<label class="chip"><input type="radio" name="${opts.name}" value="${o}"${o === opts.defaultValue ? ' checked' : ''}><span>${ICON.check.replace('<svg ', '<svg class="chip__check" ')}${o}</span></label>`).join('\n');
  return `<fieldset style="border:0;padding:0;margin:0">
  <legend class="field__label" style="margin-bottom:var(--space-3)">${opts.legend}</legend>
  <div class="chip-group">${chips}</div>
</fieldset>`;
}
function submitBtn(opts) {
  const arrow = opts.arrow ? `<svg class="btn__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>` : '';
  return `<button class="btn btn--${opts.variant || 'primary'} btn--block" type="submit" data-idle-label="${opts.idle}" data-busy-label="${opts.busy}" data-done-label="${opts.done || 'Sent'}">
  <svg class="spinner" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" opacity="0.28"/><path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5"/></svg>
  ${roll(opts.idle)}
  <svg class="btn__check" style="display:none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="m3 8.5 3.5 3.5L13 5"/></svg>
  ${arrow}
</button>`;
}
const PHONE_PATTERN = '[+\\d][\\d\\s\\-]{7,17}';
const PHONE_INVALID = 'Enter a phone number with 8–18 digits, e.g. +91 98765 43210.';

function callbackForm() {
  return `<form data-flow="/api/contact" novalidate>
  <div class="form-card form-card--tint" data-shake="">
    <div><h2 class="h3">Request a callback</h2><p class="body mt-3">Tell us where you are in the decision and we'll call you back — usually the same working day.</p></div>
    ${honeypot()}
    ${formProgress()}
    ${inputField({ name: 'name', label: 'Your name', placeholder: 'Your name', autoComplete: 'name' })}
    ${inputField({ name: 'phone', label: 'Phone number', placeholder: 'Phone number', type: 'tel', autoComplete: 'tel', pattern: PHONE_PATTERN, invalidMessage: PHONE_INVALID })}
    ${inputField({ name: 'email', label: 'Email address', placeholder: 'Email address', type: 'email', autoComplete: 'email' })}
    ${inputField({ name: 'grade', label: "Student's current grade", placeholder: "Student's current grade" })}
    <div class="field"><label class="sr-only" for="topic">What would you like to discuss?</label><textarea class="textarea" id="topic" name="topic" placeholder="What would you like to discuss?" required></textarea></div>
    ${submitBtn({ idle: 'Request my callback', busy: 'Sending…', done: 'Callback requested' })}
    <a class="arrow-row" href="for-schools.html#inquiry" style="background:var(--bg-brand-soft);color:var(--fg-on-soft);font-weight:600">Representing a school? Use the institutional form instead<svg style="margin-left:auto;color:currentColor" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg></a>
  </div>
</form>`;
}

function contactPage() {
  return G.pageHero({
    overline: 'Talk to us', title: "Pick your city. We'll show you the right team.", mark: 'the right team',
    lead: "Choose a city and only that office, its phone numbers and its counsellor availability appear — or leave your number and we will call you back, usually the same working day.",
    aside: heroIllustration('images/illustrations/contact-hero.svg', 'An illustration of a support representative ready to help'),
    tight: true,
    stats: [{ value: '2', label: 'City offices' }, { value: '<1 day', label: 'Average response time' }, { value: '100+', label: 'Trained counsellors' }, { value: '40,000+', label: 'Parents guided' }],
  }) +
    section({ tone: 'plain', id: 'contact' }, reveal(`${officeSelector()}${callbackForm()}`, { className: 'split split--form' }));
}

module.exports = { homePage, aboutPage, contactPage, honeypot, formProgress, inputField, labelledInput, selectField, chipRadios, submitBtn, PHONE_PATTERN, PHONE_INVALID, copyBtn };
