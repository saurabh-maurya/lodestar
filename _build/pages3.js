const G = require('./generate');
const D = require('./data');
const P = require('./pages');
const {
  ICON, cardIcon, roll, btn, arrowLink, section, sectionHeading, reveal, stat, statRow, media,
  heroIllustration, checkList, dotList, featureList, metaItem, cardValue, card, cardHeader, cardMedia,
  cardEyebrow, cardTitle, cardBody, curriculumHtml, accordion, site,
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
    section({ tone: 'plain' }, `<div class="prose">${sections}<p class="mt-12 small">Last updated 2026. Questions about this policy? Write to <a href="${site.emailHref}" style="text-decoration:underline">${site.email}</a>.</p></div>`);
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
function programCard(p) {
  const titleLines = p.titleLines.map(line => {
    if (p.titleAccent && line.includes(p.titleAccent)) {
      return `<span class="program__title-line">${line.replace(p.titleAccent, '')}<span class="program__accent">${p.titleAccent}</span></span>`;
    }
    return `<span class="program__title-line">${line}</span>`;
  }).join('');

  const cardHtml = card({ tone: 'plain' }, `
${cardMedia(p.grade, { src: p.image, alt: `Students in the ${p.gradeLabel} age group` })}
${cardEyebrow(p.grade)}
<h2 class="card__title card__title--lg">${titleLines}</h2>
<div class="card__meta card__meta--inline">${metaItem(ICON.clock, p.duration)}${cardValue(p.price, 'lg')}</div>
<a class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'} btn--block program__cta" href="programs-register.html?program=${p.slug}">${roll('View Details')}</a>`);

  const outcomeList = `<ul class="fan__list">${p.detail.outcome.map(l => `<li>${l}</li>`).join('')}</ul>`;
  const fan = `<div class="fan">
  <div class="fan__side">
    <div class="fan__card" data-panel="2">
      <p class="fan__head"><span class="fan__icon">${cardIcon('checklist')}</span>Program details</p>
      ${curriculumHtml(p.detail.modules, `${p.slug}-fan`, true)}
    </div>
  </div>
  <div class="fan__below">
    <div class="fan__card" data-panel="1">
      <p class="fan__head"><span class="fan__icon">${cardIcon('target')}</span>Outcome</p>
      ${outcomeList}
    </div>
  </div>
</div>`;

  return `<div class="program">${cardHtml}${fan}</div>`;
}

/* ==========================================================================
   Programs page — ported from app/programs/page.tsx
   ========================================================================== */
function programsPage() {
  const programCards = D.programs.map(programCard).join('\n');

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

  const sessionCards = D.methodSteps.map(s => `<article class="session-card">
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
  }) +
    section({ tone: 'plain' }, `
<div class="programs__bar"><p class="overline">Choose by grade</p>${howPopout()}</div>
<div class="grid grid--4 mt-8">${programCards}</div>
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
<p class="overline">Our method · The 3Ds</p>
<h2 class="h2 mt-4">Three one-to-one sessions, in this order, every time</h2>
<p class="lead mt-5">Refined across 60,000 counselling sessions and delivered by one of 100+ trained expert counsellors, each of whom has run at least a hundred individual sessions.</p>
<div class="mt-12">${sessionCards}</div>`) +
    section({ tone: 'tint', id: 'outcome' }, `
${sectionHeading({ overline: 'The outcome', title: 'What you actually walk away with', lead: 'Not advice you have to remember. A document you can act on, revisit and hand to a tutor or a school.' })}
<div class="grid grid--4 mt-12">${outcomeCards}</div>`) +
    section({ tone: 'subtle', id: 'faq' }, `
<div class="programs__bar">
  <div><p class="overline">FAQ</p><h2 class="h2 mt-4">Commonly asked questions</h2></div>
  <a class="btn btn--ghost btn--sm btn--auto" href="#faq">${roll('Download the FAQ')}${ICON.document}</a>
</div>
<div class="mt-10">${accordion(D.faqs)}</div>`);
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

  return `<div data-page="programs-register">
${G.pageHero({
    overline: 'Programs · loading…', overlineAttr: ' data-hero-overline', title: 'Program', tight: true,
    lead: "Everything included in this program, laid out in full — before you share a single detail.",
    backgroundImage: { src: 'images/program-class9.jpg', alt: '' },
    titleAttr: ' data-hero-title', /* JS fills this in from ?program= */
  })}
${section({ tone: 'plain' }, `
<div class="course">
  <div class="course__main">
    <div class="course__block"><h2 class="h3">What you'll get</h2><div data-outcome></div></div>
    <div class="course__block"><h2 class="h3">Program details</h2><div data-curriculum></div></div>
    <div class="course__block" id="how"><h2 class="h3">How this works</h2><div data-how></div></div>
    <p class="brush-note"><mark class="brush" data-brush-note></mark></p>
    <div class="course__block" id="register">${registerDetailsForm()}</div>
  </div>
  <aside class="course__sidebar">
    <div class="course-card">
      <div class="course-card__thumb" data-sidebar-thumb><img src="images/program-class9.jpg" alt=""></div>
      <div class="course-card__body">
        <div class="course-card__price-row"><span class="course-card__price" data-sidebar-price></span><span class="card__meta-item">${ICON.clock}<span data-sidebar-duration></span></span></div>
        <a href="#register" class="btn btn--primary btn--block">Register Now${ICON.arrowRight}</a>
        <ul class="course-card__included" data-sidebar-included></ul>
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
</div>`;
}

/* ==========================================================================
   Programs · Register · Payment — app/programs/register/payment/page.tsx
   ========================================================================== */
function paymentConfirmForm() {
  return `<form data-flow="/api/enrol" data-component="payment-form-el">
  <div class="form-card" data-shake="">
    <div><h2 class="h3">Confirm & pay</h2><p class="body mt-3">Nothing is charged on this screen — review your order and confirm.</p></div>
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
      <div><dt>Registering</dt><dd data-summary="registering"></dd></div>
      <div><dt>Parent</dt><dd data-summary="parent"></dd></div>
      <div><dt>Course</dt><dd data-summary="course"></dd></div>
      <div><dt>Duration</dt><dd data-summary="duration"></dd></div>
    </dl>
    <div class="field-group">
      <label class="field__label" for="discountCode">Discount code</label>
      ${P.inputField({ name: 'discountCode', label: 'Discount code', placeholder: 'Enter code', required: false })}
    </div>
    <div class="pay__total"><span>Total amount</span><strong data-pay-total></strong></div>
    ${P.submitBtn({ idle: 'Confirm & pay', busy: 'Submitting…', done: 'Registration received', arrow: true })}
    <p class="pay__note">You will not be charged on this screen. We confirm your slot and send a payment link by email within one working day.</p>
  </div>
</form>`;
}

function programsRegisterPaymentPage() {
  return `<div data-page="programs-register-payment">
${G.pageHero({
    overline: `<span class="flex items-center gap-2">${ICON.lock}Secure · HTTPS · no card details on this page</span>`,
    title: 'Confirm & pay', tight: true,
    lead: 'Review the amount below. Nothing is charged until you confirm.',
    titleAttr: ' data-hero-title',
  })}
${section({ tone: 'plain', className: 'payment-band' }, `
<div data-component="payment-form">
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
  <div class="journal__heading">
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
  const reviews = [
    { quote: 'Hats off to Lodestar for the range of career options they laid out on the table for my son. The volume of research they have done into different careers is amazing. I appreciate the skill sets of their team, the follow-up and the team spirit.', name: 'Santhosh', role: 'Parent · Innisfree House School' },
    { quote: "I'm really happy with the solution offered by Lodestar. With exposure to over 250 careers and a comprehensive career plan from career to college, they have truly enabled us to make a smart career decision for our child.", name: 'Anil', role: 'Parent · Samved' },
    { quote: 'The program provided information in a structured manner. The interaction with the specialist serves as a second opinion for the student, reducing parental pressure and bias.', name: 'Narendranath Pai', role: 'Parent · Innisfree' },
    { quote: 'The program provided a range of options open for my daughter, and helped her decide the way forward. An exceptional program recommended to all students who are yet to firm up their career choices.', name: 'Korath Abraham', role: 'Parent · Deens Academy' },
    { quote: 'The counsellor who guided us throughout the program was very enthusiastic and all our queries were answered without hesitation. I would surely recommend Lodestar to other parents.', name: 'Ram Prakash', role: 'Parent · Greenwood High' },
    { quote: 'Your career guidance program is truly exceptional and very informative. The approach quality and guiding capability of your counsellor is really appreciable, and the data collected by your research team is informative.', name: 'Toufiqul', role: 'Parent · Al Ameen Residential School' },
  ];

  const videoCards = videos.map((v, i) => reveal(
    card({ tone: 'clay' }, cardMedia('Video testimonial', { icon: ICON.play(11, 11), src: v.image, alt: v.alt }) + cardTitle(v.title) + cardBody('Plays inline — no jump to an external social platform.')),
    { delay: i * 90 }
  )).join('\n');
  const reviewCards = reviews.map((r, i) => reveal(G.quoteCard({ quote: r.quote, name: r.name, role: r.role, variant: 'raised' }), { delay: i * 70 })).join('\n');

  return G.pageHero({
    overline: 'Single source of truth', title: '40,000 parents have been through this decision with us', mark: '40,000 parents',
    lead: 'Every parent quote on the site now lives here. Other pages carry at most one or two relevant lines instead of repeating the same block on five pages.',
    aside: heroIllustration('images/illustrations/testimonials-hero.svg', 'An illustration of a family together'),
  }) +
    section({ tone: 'plain', id: 'videos' }, `<p class="overline">Video stories · Playing inline</p><h2 class="h2 mt-4">Watch parents describe the decision</h2><div class="grid grid--3 mt-10">${videoCards}</div>`) +
    section({ tone: 'tint' }, `<p class="overline">In their words</p><h2 class="h2 mt-4">What parents wrote after the program</h2><div class="grid grid--3 mt-10">${reviewCards}</div>`);
}

module.exports = { legalPage, programsPage, programsRegisterPage, programsRegisterPaymentPage, resourcesPage, testimonialsPage };
