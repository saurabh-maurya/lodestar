const G = require('./generate');
const D = require('./data');
const P = require('./pages');
const {
  ICON, cardIcon, roll, btn, arrowLink, section, sectionHeading, reveal, stat, statRow, media,
  heroIllustration, checkList, dotList, featureList, metaItem, cardValue, card, cardHeader, cardMedia,
  cardEyebrow, cardTitle, cardBody, badgeRow, curriculumHtml, accordion, site,
} = G;

/* ==========================================================================
   Legal — ported from app/legal/[slug]/page.tsx
   ========================================================================== */
const legalPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lead: 'How Lodestar collects, uses and protects the information families share with us.',
    sections: [
      { heading: 'What we collect', body: 'When you request a free assessment, a callback or an institutional consultation, we collect the details you enter on that form — typically name, phone number, email address, city and the student’s current grade. We do not ask for payment details anywhere on this website.' },
      { heading: 'How we use it', body: 'Your details are used to deliver the assessment link, schedule counselling sessions and respond to your enquiry. Institutional enquiries are routed to our partnerships team. We never sell your data to third parties.' },
      { heading: 'Where it is stored', body: 'Lead records are stored in access-controlled systems available only to the Lodestar counselling and partnerships teams. Assessment results are held in the Lodestar product application under the account created for the student.' },
      { heading: 'Your choices', body: `You can ask us to correct or delete your information at any time by writing to ${site.email}. We will action verified requests within thirty days.` },
    ],
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    lead: 'The terms that apply when you use lodestar.guru or enrol in a Lodestar program.',
    sections: [
      { heading: 'Use of this site', body: 'The content on this website — including career research, program descriptions and sample reports — is provided for the personal use of students and parents evaluating Lodestar’s services. It may not be reproduced or redistributed commercially without written permission.' },
      { heading: 'Program delivery', body: 'Programs are delivered over the number of weeks stated on the Programs page. Group webinars run to a published schedule; one-to-one sessions are scheduled around your availability and confirmed with you in advance.' },
      { heading: 'Assessment results', body: 'Psychometric, aptitude and interest assessments are decision-support tools. They inform a recommendation made by a trained counsellor; they are not a guarantee of admission, examination performance or employment outcomes.' },
      { heading: 'Changes to these terms', body: 'We may update these terms as our programs evolve. The version published on this page is the one in force.' },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    lead: 'What happens if a Lodestar program is not right for your family.',
    sections: [
      { heading: 'Before the first session', body: 'If you cancel before the first one-to-one session takes place, the program fee is refundable in full, less any transaction charges levied by the payment provider.' },
      { heading: 'After sessions begin', body: 'Once counselling sessions have started, refunds are considered on a pro-rata basis against the sessions still outstanding. Written reports already delivered are not refundable.' },
      { heading: 'Quality guarantee', body: 'Feedback is collected after every session. If you are unhappy, corrective action can include additional sessions, further information or a change of counsellor before a refund is considered.' },
      { heading: 'Raising a request', body: `Write to ${site.email} or call ${site.phone}. We acknowledge refund requests within two working days.` },
    ],
  },
};

function legalPage(slug) {
  const page = legalPages[slug];
  const sections = page.sections.map(s => `<section><h2>${s.heading}</h2><p>${s.body}</p></section>`).join('\n');
  return G.pageHero({ overline: 'Legal', title: page.title, lead: page.lead }) +
    section({ tone: 'plain' }, `<div class="prose reveal" data-reveal>${sections}<p class="mt-12 small">Last updated 2026. Questions about this policy? Write to <a href="${site.emailHref}" style="text-decoration:underline">${site.email}</a>.</p></div>`);
}

/* ==========================================================================
   How popout — ported from components/how-popout.tsx
   ========================================================================== */
function howPopout() {
  const steps = D.howItWorks.map((s, i) => `<li style="--i:${i}"><span class="howpop__n">${String(i + 1).padStart(2, '0')}</span><span class="howpop__copy"><span class="howpop__step-title">${s.title}</span><span class="howpop__step-body">${s.body}</span></span></li>`).join('\n');
  return `<div class="howpop">
  <a class="howpop__btn" href="#method"><span class="howpop__icon">${cardIcon('route')}</span>How it works${ICON.chevronDown('howpop__chevron')}</a>
  <div class="howpop__panel">
    <p class="howpop__title">Four steps, start to finish</p>
    <ol class="howpop__steps">${steps}</ol>
    <p class="howpop__foot">Read the full method${ICON.arrowRight}</p>
  </div>
</div>`;
}

/* ==========================================================================
   Program card (with fan) — ported from components/program-card.tsx
   ========================================================================== */
/* Horizontal program card — photo on one side, everything a parent compares
   (grade, title, price, what's included) on the other. One wide card reads
   far better than a cramped quarter-column, and there is now room to show the
   inclusions inline instead of hiding them behind a hover fan. */
function programCard(p, index) {
  const title = p.titleLines.map(line =>
    p.titleAccent && line.includes(p.titleAccent)
      ? `${line.replace(p.titleAccent, '')}<span class="program__accent">${p.titleAccent}</span>`
      : line
  ).join(' ');

  const items = `<ul class="pcard__items">${p.items.map(it => `<li>${ICON.check}<span>${it}</span></li>`).join('')}</ul>`;

  return `<article class="pcard${p.featured ? ' pcard--featured' : ''} reveal" data-reveal style="--reveal-delay:${(index || 0) * 90}ms">
  <div class="pcard__media">
    <img src="${p.image}" alt="Students in the ${p.gradeLabel} age group" class="pcard__img" loading="lazy">
    ${p.featured ? '<span class="pcard__ribbon">Most chosen</span>' : ''}
  </div>
  <div class="pcard__body">
    <p class="pcard__grade">${p.grade}</p>
    <h2 class="pcard__title">${title}</h2>
    <div class="pcard__price-row">
      <span class="pcard__price">${p.price}</span>
      <span class="pcard__duration">${ICON.clock}${p.duration}</span>
    </div>
    ${items}
    <a class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'} btn--block pcard__cta" href="programs-register.html?program=${p.slug}">${roll('View Details')}${ICON.arrowRight}</a>
  </div>
</article>`;
}

/* ==========================================================================
   Programs page — ported from app/programs/page.tsx
   ========================================================================== */
function programsPage() {
  const programCards = D.programs.map((p, i) => programCard(p, i)).join('\n');

  const assessRows = D.assessments.map((test, i) => `<li>${reveal(`
<div class="assess-row">
  <span class="assess-row__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  <span class="assess-row__icon">${cardIcon(test.icon)}</span>
  <div class="assess-row__copy"><p class="assess-row__eyebrow">${test.eyebrow}</p><h3 class="assess-row__title">${test.title}</h3></div>
  <div class="assess-row__meta">${metaItem(ICON.clock, test.format)}${cardValue(test.duration)}</div>
  ${checkList(test.items)}
</div>`, { delay: i * 90 })}</li>`).join('\n');

  const menuRows = D.programLinks.map((link, i) => `<a class="menu-row" href="${link.href}">
  <span class="menu-row__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  <span class="menu-row__icon">${cardIcon(link.icon)}</span>
  <span class="menu-row__copy"><span class="menu-row__title">${link.title}</span><span class="menu-row__body">${link.body}</span></span>
  <span class="menu-row__cta">${link.cta}${ICON.arrowRight}</span>
</a>`).join('\n');

  const principleCards = D.principles.map((p, i) => reveal(
    card({ tone: p.highlight ? 'navy' : 'clay' }, cardHeader(cardIcon(p.icon), null, cardEyebrow(p.n) + cardTitle(p.title, { as: 'h2' })) + cardBody(p.body)),
    { delay: i * 90 }
  )).join('\n');

  const sessionCards = D.methodSteps.map((s, i) => `<article class="session-card reveal" data-reveal style="--reveal-delay:${i * 90}ms">
  <div>
    ${cardHeader(cardIcon(s.icon), null, `<p class="overline">${s.label}</p><h3 class="h3 mt-1">${s.title}</h3>`)}
    <p class="body mt-5">${s.body}</p>
  </div>
  <div class="session-card__rows">${s.rows.map(r => `<p class="arrow-row">${ICON.arrowRight}${r}</p>`).join('')}</div>
</article>`).join('\n');

  const outcomeCards = D.outcomes.map((o, i) => reveal(
    card({ tone: 'clay' }, cardHeader(cardIcon(o.icon), null, cardTitle(o.title)) + cardBody(o.body)),
    { delay: i * 90 }
  )).join('\n');

  return G.pageHero({
    overline: 'Our programs', title: 'Built around the decision your child is facing right now', mark: 'the decision',
    lead: 'A Class 9 student needs awareness. A Class 10 student needs a stream decision. A Class 12 student needs a college shortlist. Each program is scoped to one grade so nothing is padded and nothing is missing.',
    aside: heroIllustration('images/illustrations/programs-hero.svg', 'An illustration of a teacher guiding a student'),
    stats: [{ value: '3', label: 'Programs, one per grade band' }, { value: '4', label: 'Assessments included' }, { value: '3', label: 'One-to-one sessions' }, { value: '30-page', label: 'Written plan you keep' }],
  }) +
    section({ tone: 'plain' }, `
<div class="programs__bar reveal" data-reveal><p class="overline">Choose by grade</p>${howPopout()}</div>
<div class="grid grid--2 program-grid mt-8">${programCards}</div>
<p class="brush-note"><mark class="brush">${D.programNote}</mark></p>`) +
    section({ tone: 'subtle', id: 'tests' }, `
${sectionHeading({ overline: 'What your child actually sits', title: 'Four assessments. None of them revisable.', lead: 'Every program runs the same four. They measure how your child thinks and what they are drawn to — not what they memorised last term.' })}
<ol class="assess-list mt-12">${assessRows}</ol>`) +
    section({ tone: 'plain' }, `
${sectionHeading({ overline: 'Before you decide', title: 'See the work before you buy it', lead: "The report we hand over, the families who have been through it, and a counsellor on the phone — none of it behind a payment." })}
<div class="menu-list mt-12">${menuRows}</div>`) +
    section({ tone: 'plain' }, `
${sectionHeading({ overline: 'The principle', title: 'What actually makes a career path the right one?', lead: 'A child must discover their true career path — not inherit ours. Three things have to be true at once, and most career advice only checks the first.' })}
<div class="grid grid--3 mt-12">${principleCards}</div>`) +
    section({ tone: 'tint', id: 'method' }, `
<div class="reveal" data-reveal>
  <p class="overline">Our method · The 3Ds</p>
  <h2 class="h2 mt-4">Three one-to-one sessions, in this order, every time</h2>
  <p class="lead mt-5">Refined across 60,000 counselling sessions and delivered by one of 100+ trained expert counsellors, each of whom has run at least a hundred individual sessions.</p>
</div>
<div class="mt-12">${sessionCards}</div>`) +
    section({ tone: 'tint', id: 'outcome' }, `
${sectionHeading({ overline: 'The outcome', title: 'What you actually walk away with', lead: 'Not advice you have to remember. A document you can act on, revisit and hand to a tutor or a school.' })}
<div class="grid grid--4 mt-12">${outcomeCards}</div>`) +
    section({ tone: 'subtle', id: 'faq' }, `
<div class="programs__bar reveal" data-reveal>
  <div><p class="overline">FAQ</p><h2 class="h2 mt-4">Commonly asked questions</h2></div>
  <a class="btn btn--ghost btn--sm btn--auto" href="#faq">${roll('Download the FAQ')}${ICON.document}</a>
</div>
<div class="mt-10 reveal" data-reveal style="--reveal-delay:90ms">${accordion(D.faqs)}</div>`);
}

/* ==========================================================================
   Programs · Register (client-rendered per ?program=) — app/programs/register/page.tsx
   ========================================================================== */
function registerDetailsForm() {
  return `<form data-local-step novalidate id="register">
  <div class="form-card" data-shake="">
    <div><h2 class="h3">Share your details</h2><p class="body mt-3">One step left — confirm the amount on the next screen and we hold your slot.</p></div>
    ${P.honeypot()}
    ${P.formProgress()}
    <div class="enrol__grid">
      ${P.labelledInput({ name: 'parentName', label: 'Parent name', placeholder: 'Enter parent name', autoComplete: 'name' })}
      ${P.labelledInput({ name: 'studentName', label: 'Student name', placeholder: 'Enter name' })}
      ${P.selectField({ name: 'gender', label: 'Gender', placeholder: 'Select gender', options: ['Female', 'Male', 'Other', 'Prefer not to say'] })}
      ${P.selectField({ name: 'studentClass', label: 'Class', placeholder: 'Select class', options: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'] })}
      ${P.labelledInput({ name: 'parentEmail', label: 'Parent email ID', placeholder: 'Enter email ID', type: 'email', autoComplete: 'email' })}
      ${P.labelledInput({ name: 'parentMobile', label: 'Parent mobile no.', placeholder: 'Enter mobile no.', type: 'tel', autoComplete: 'tel', pattern: P.PHONE_PATTERN, invalidMessage: P.PHONE_INVALID })}
      ${P.labelledInput({ name: 'testEmail', label: 'Email ID for test link', placeholder: 'Enter email ID', type: 'email' })}
    </div>
    <button class="btn btn--primary btn--block" type="submit">${roll('Continue to payment')}<svg class="btn__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg></button>
  </div>
</form>`;
}

function programsRegisterPage() {
  const switchCards = D.programs.map(p => `<a href="programs-register.html?program=${p.slug}" class="switch-card">
  <span class="switch-card__grade">${p.gradeLabel}</span>
  <span class="switch-card__title">${p.title}</span>
  <span class="switch-card__foot"><span class="switch-card__price">${D.rupees(p.amount)}</span>${ICON.arrowRight}</span>
</a>`).join('\n');

  const inst = D.programInstructor;
  const instructorBlock = `<div class="course__block reveal" data-reveal id="instructor"><h2 class="h3">Your counsellor</h2>
  <div class="instructor">
    <span class="instructor__avatar" aria-hidden="true">${inst.name.trim().charAt(0)}</span>
    <div class="instructor__copy">
      <p class="instructor__name">${inst.name}</p>
      <p class="instructor__title">${inst.title}</p>
      <div class="instructor__rating">${G.stars()}<span>${inst.rating} · ${inst.ratingCount}</span></div>
      <p class="instructor__bio">${inst.bio}</p>
      <ul class="instructor__creds">${inst.credentials.map(c => `<li>${ICON.check}<span>${c}</span></li>`).join('')}</ul>
    </div>
  </div>
  <p class="instructor__bench"><span class="instructor__bench-icon" aria-hidden="true">${ICON.users}</span><span>${inst.bench}</span></p>
</div>`;

  return `<div data-page="programs-register">
${G.pageHero({
    overline: 'Programs · loading…', overlineAttr: ' data-hero-overline', title: 'Program', tight: true,
    lead: "Everything included in this program, laid out in full — before you share a single detail.",
    backgroundImage: { src: 'images/program-class9.jpg', alt: '' },
    titleAttr: ' data-hero-title', /* JS fills this in from ?program= */
    children: `<ul class="course-meta" data-hero-meta>
      <li class="course-meta__item">${ICON.starRating}<span><strong data-meta-rating>4.8</strong> rating <span class="course-meta__sub" data-meta-rating-count>· 1,000+ families guided</span></span></li>
      <li class="course-meta__item">${ICON.clock}<span><strong data-meta-duration>—</strong> · self-paced scheduling</span></li>
      <li class="course-meta__item">${ICON.school}<span>Level <strong data-meta-level>—</strong></span></li>
    </ul>`,
    stats: [{ value: '40,000+', label: 'Parents guided' }, { value: '93%', label: 'Rate sessions excellent' }, { value: '100+', label: 'Trained counsellors' }, { value: '30-page', label: 'Written plan you keep' }],
  })}
${section({ tone: 'plain' }, `
<div class="course">
  <div class="course__main">
    <div class="course__block reveal" data-reveal><h2 class="h3">What you'll get</h2><div data-outcome></div></div>
    <div class="course__block reveal" data-reveal style="--reveal-delay:60ms"><h2 class="h3">Program details</h2><div data-curriculum></div></div>
    <div class="course__block reveal" data-reveal id="how" style="--reveal-delay:120ms"><h2 class="h3">How this works</h2><div data-how></div></div>
    <p class="brush-note"><mark class="brush" data-brush-note></mark></p>
    ${instructorBlock}
    <div class="course__block" id="register">${registerDetailsForm()}</div>
  </div>
  <aside class="course__sidebar">
    <div class="course-card">
      <div class="course-card__thumb" data-sidebar-thumb><img src="images/program-class9.jpg" alt=""></div>
      <div class="course-card__body">
        <div class="course-card__price-row"><span class="course-card__price" data-sidebar-price></span><span class="card__meta-item">${ICON.clock}<span data-sidebar-duration></span></span></div>
        <div class="course-card__rating">${G.stars()}<span>4.8 · 1,000+ families guided</span></div>
        <button type="button" class="btn btn--primary btn--block" data-open-payment>Register Now${ICON.arrowRight}</button>
        <ul class="course-card__included" data-sidebar-included></ul>
        <p class="course-card__note">${ICON.checkCircle}Quality guarantee — additional sessions or a change of counsellor if you're unhappy</p>
        <p class="course-card__note">${ICON.lock}Secure · nothing is charged until you confirm on the payment step</p>
      </div>
    </div>
  </aside>
</div>`)}
${section({ tone: 'subtle' }, `
<p class="overline">Other programs</p>
<h2 class="h2 mt-4">Registering for a different grade?</h2>
<p class="body mt-5 measure">Each program is scoped to one grade. Switching here changes the course this page — and the amount on the next screen — is for.</p>
<div class="grid grid--4 mt-10" data-switch-grid>${switchCards}</div>`)}
${paymentModal()}
</div>`;
}

/* ==========================================================================
   Payment modal — the "Continue to payment" step, as a dialog over the
   register page instead of a second page navigation. Reuses the exact same
   paymentConfirmForm() markup the standalone programs-register-payment.html
   still renders, so the two stay visually and behaviourally identical; see
   openPaymentModal() in site.js for how it gets populated and shown.
   ========================================================================== */
function paymentModal() {
  return `<dialog class="modal" id="payment-modal" aria-label="Confirm and pay">
  <button type="button" class="modal__close" data-modal-close aria-label="Close">${ICON.close(18, 18)}</button>
  ${paymentConfirmForm()}
</dialog>`;
}

/* ==========================================================================
   Programs · Register · Payment — app/programs/register/payment/page.tsx
   ========================================================================== */
/* A single placeholder payment field, styled to match the site's other inputs
   (.field / .input / tick / error). autocomplete="off" throughout so browsers
   never offer a real saved card into this demo-only checkout. */
function payField(name, label, opts) {
  opts = opts || {};
  const attrs = [
    'class="input"', `id="${name}"`, `name="${name}"`, `type="${opts.type || 'text'}"`,
    `placeholder="${opts.placeholder || ''}"`, 'autocomplete="off"',
    opts.inputmode ? `inputmode="${opts.inputmode}"` : '',
    opts.maxlength ? `maxlength="${opts.maxlength}"` : '',
    opts.required === false ? '' : 'required',
  ].filter(Boolean).join(' ');
  const tick = ICON.check.replace('<svg ', '<svg class="field__tick" ');
  return `<div class="field-group">
  <label class="field__label" for="${name}">${label}</label>
  <div class="field"><input ${attrs}>${tick}<p class="field__error" id="${name}-error"></p></div>
</div>`;
}

function paymentConfirmForm() {
  return `<form data-flow="/api/enrol" data-component="payment-form-el">
  <div class="form-card" data-shake="">
    <div><h2 class="h3">Checkout</h2><p class="body mt-3">Review your order and enter payment details to reserve your slot.</p></div>
    ${P.honeypot()}
    <input type="hidden" name="programSlug">
    <input type="hidden" name="course">
    <input type="hidden" name="grade">
    <input type="hidden" name="parentName">
    <input type="hidden" name="studentName">
    <input type="hidden" name="gender">
    <input type="hidden" name="studentClass">
    <input type="hidden" name="parentEmail">
    <input type="hidden" name="parentMobile">
    <input type="hidden" name="testEmail">
    <dl class="pay__rows">
      <div data-summary-row="registering"><dt>Registering</dt><dd data-summary="registering"></dd></div>
      <div data-summary-row="parent"><dt>Parent</dt><dd data-summary="parent"></dd></div>
      <div><dt>Course</dt><dd data-summary="course"></dd></div>
      <div><dt>Duration</dt><dd data-summary="duration"></dd></div>
    </dl>
    <div class="pay__section">
      <p class="pay__section-title">Payment details</p>
      <p class="pay__demo">${ICON.lock}<span>Demo checkout — these are placeholder fields. No real card is charged, validated or stored.</span></p>
      ${payField('cardName', 'Name on card', { placeholder: 'Name as printed on card' })}
      ${payField('cardEmail', 'Email for receipt', { type: 'email', placeholder: 'you@example.com' })}
      ${payField('cardNumber', 'Card number', { placeholder: '1234 5678 9012 3456', inputmode: 'numeric', maxlength: '19' })}
      <div class="pay__card-row">
        ${payField('cardExpiry', 'Expiry', { placeholder: 'MM/YY', inputmode: 'numeric', maxlength: '5' })}
        ${payField('cardCvc', 'CVC', { placeholder: '123', inputmode: 'numeric', maxlength: '4' })}
      </div>
    </div>
    <div class="field-group">
      <label class="field__label" for="discountCode">Discount code</label>
      ${P.inputField({ name: 'discountCode', label: 'Discount code', placeholder: 'Enter code', required: false })}
    </div>
    <div class="pay__total"><span>Total amount</span><strong data-pay-total></strong></div>
    ${P.submitBtn({ idle: 'Confirm & pay', busy: 'Processing…', done: 'Registration received', arrow: true })}
    <p class="pay__note">${ICON.lock} This is a UI demo — no payment is processed. On the live site we confirm your slot and email a secure payment link within one working day.</p>
  </div>
</form>`;
}

function programsRegisterPaymentPage() {
  return `<div data-page="programs-register-payment">
${G.pageHero({
    overline: `<span class="flex items-center gap-2">${ICON.lock}Secure checkout · demo — no real payment is processed</span>`,
    title: 'Confirm & pay', tight: true,
    lead: 'Review the amount and enter payment details below. This is a UI demo — nothing is charged.',
    titleAttr: ' data-hero-title',
  })}
${section({ tone: 'plain', className: 'payment-band' }, `
<div data-component="payment-form" class="reveal" data-reveal>
  <div data-payment-empty hidden class="pay pay--empty">
    <p class="body">We don't have your registration details yet — that step comes first.</p>
    <a class="btn btn--primary btn--auto mt-2" href="programs-register.html#register">${roll('Start registration')}</a>
  </div>
  ${paymentConfirmForm()}
</div>`)}
</div>`;
}

/* ==========================================================================
   Resources — ported from app/resources/page.tsx + components/blog-index.tsx
   ========================================================================== */
function blogIndexShell() {
  return `<div class="journal" data-component="blog-index">
  <div class="journal__heading reveal" data-reveal>
    <p class="overline">Browse Our Resources</p>
    <h2 class="h2 mt-4">Filter by what you're deciding right now</h2>
    <p class="lead mt-4 measure">Every article the journal has published, searchable and sorted by topic — pick a category or search for a word.</p>
  </div>
  <div class="journal__bar mt-10">
    <div class="chip-group tabs journal__categories" role="tablist" aria-label="Filter by category" data-ready="false"></div>
    <div class="search">
      ${ICON.search.replace('<svg ', '<svg class="search__icon" ')}
      <input type="search" class="search__input" placeholder="Search the journal" aria-label="Search the journal">
      <button type="button" class="search__clear" aria-label="Clear search" hidden>${ICON.close(14, 14)}</button>
    </div>
  </div>
  <p class="journal__count mt-4" role="status" aria-live="polite"></p>
  <div class="journal__results mt-6"></div>
</div>`;
}

function resourcesPage() {
  return G.pageHero({
    overline: 'Journal', title: 'Longer reads on the decisions families face after Class 10', mark: 'the decisions families face',
    lead: 'Streams, entrance exams, psychometrics and college shortlists — written for parents making the call, not for search engines.',
    aside: heroIllustration('images/illustrations/resources-hero.svg', 'An illustration of people reading books'),
    stats: [{ value: '250+', label: 'Career guides' }, { value: '100+', label: 'Entrance exams covered' }, { value: '200+', label: 'Colleges researched' }, { value: 'Free', label: 'No payment required' }],
  }) + section({ tone: 'plain' }, blogIndexShell());
}

/* ==========================================================================
   Testimonials — ported from app/testimonials/page.tsx
   ========================================================================== */
function testimonialsPage() {
  const videos = [
    { title: 'We found all the information we needed to plan my child’s career', image: 'images/parent-child-home.jpg', alt: 'A parent and child talking at home' },
    { title: 'I discovered wide career options in Arts after the Lodestar program', image: 'images/program-class1112.jpg', alt: 'Students discussing career options together' },
    { title: 'Lodestar helped us find a world of careers beyond engineering', image: 'images/founders-campus.jpg', alt: 'Students at work in a modern Indian classroom' },
  ];
  const reviews = D.parentReviews;

  const videoCards = videos.map((v, i) => reveal(
    card({ tone: 'clay' }, cardMedia('Video testimonial', { icon: ICON.play(11, 11), src: v.image, alt: v.alt }) + cardTitle(v.title) + cardBody('Plays inline — no jump to an external social platform.')),
    { delay: i * 90 }
  )).join('\n');
  const reviewCards = reviews.map((r, i) => reveal(G.quoteCard({ quote: r.quote, name: r.name, role: r.role, variant: 'raised' }), { delay: i * 70 })).join('\n');

  return G.pageHero({
    overline: 'Single source of truth', title: '40,000 parents have been through this decision with us', mark: '40,000 parents',
    lead: 'Every parent quote on the site now lives here. Other pages carry at most one or two relevant lines instead of repeating the same block on five pages.',
    aside: heroIllustration('images/illustrations/testimonials-hero.svg', 'An illustration of a family together'),
    stats: [{ value: '40,000+', label: 'Parents guided since 2011' }, { value: '93%', label: 'Rate sessions excellent' }, { value: '300+', label: 'Partner schools' }, { value: '100+', label: 'Trained counsellors' }],
  }) +
    section({ tone: 'plain', id: 'videos' }, `<div class="reveal" data-reveal><p class="overline">Video stories · Playing inline</p><h2 class="h2 mt-4">Watch parents describe the decision</h2></div><div class="grid grid--3 mt-10">${videoCards}</div>`) +
    section({ tone: 'tint' }, `<div class="reveal" data-reveal><p class="overline">In their words</p><h2 class="h2 mt-4">What parents wrote after the program</h2></div><div class="grid grid--3 mt-10">${reviewCards}</div>`);
}

module.exports = { legalPage, programsPage, programsRegisterPage, programsRegisterPaymentPage, resourcesPage, testimonialsPage };
