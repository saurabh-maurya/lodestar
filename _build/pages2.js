const G = require('./generate');
const D = require('./data');
const P = require('./pages');
const {
  ICON, cardIcon, roll, btn, arrowLink, section, sectionHeading, reveal, stat, statRow, media,
  heroIllustration, checkList, dotList, featureList, metaItem, cardValue, card, cardHeader, cardMedia,
  cardEyebrow, cardTitle, cardBody, curriculumHtml, accordion,
} = G;

/* ==========================================================================
   How-it-works stepper — ported from components/how-it-works-steps.tsx
   ========================================================================== */
function howItWorksSteps(steps, images) {
  const track = `<div class="steps__track" aria-hidden="true">
  <div class="steps__fill" style="width:0%"></div>
  ${steps.map((_, i) => `<span class="steps__node${i === 0 ? ' is-passed is-active' : ''}"></span>`).join('')}
</div>`;
  const cards = steps.map((s, i) => reveal(
    card({ tone: 'clay', className: i === 0 ? 'step-card is-active' : 'step-card' }, cardMedia(`Step ${i + 1}`, { icon: cardIcon(s.icon), src: images[i] }) + cardTitle(s.title)),
    { delay: i * 90 }
  )).join('\n');
  return `<div data-component="how-it-works-steps">${track}<div class="grid grid--4 mt-6">${cards}</div></div>`;
}

/* ==========================================================================
   Expert price card — ported from components/expert-price-card.tsx
   ========================================================================== */
function expertPriceCard(showViewAll) {
  return `<div class="expert-price__top">
  <div class="expert-price__info">
    <p class="expert-price__label">${D.expertSession.label}</p>
    <p class="expert-price__amount">${D.expertSession.price}</p>
    <p class="expert-price__note">${D.expertSession.note}</p>
  </div>
  <div class="expert-price__actions">
    ${btn('contact.html', 'Book a Session')}
    ${showViewAll ? btn('experts.html', 'View All Experts', { variant: 'outline' }) : ''}
  </div>
</div>
<div class="expert-price__trust">
  <ul class="expert-price__badges">${D.expertBadges.map(b => `<li>${ICON.check}${b}</li>`).join('')}</ul>
  <ul class="expert-price__stats">${D.expertStats.map(s => `<li><strong>${s.star ? ICON.starRating : ''}${s.value}</strong><span>${s.label}</span></li>`).join('')}</ul>
</div>`;
}

/* ==========================================================================
   Experts index — ported from app/experts/page.tsx
   ========================================================================== */
const stepImages = ['images/expert-step-browse.jpg', 'images/expert-step-book.jpg', 'images/expert-step-session.jpg', 'images/expert-step-report.jpg'];
const panelIllustrations = {
  'career-experts': { src: 'images/illustrations/career-experts-panel.svg', alt: 'An illustration of a career counsellor tracking progress' },
  'student-experts': { src: 'images/illustrations/student-experts-panel.svg', alt: 'An illustration of college students outside their campus' },
};

function expertsPage() {
  const panels = D.expertPanels.map((panel, i) => {
    const reversed = i % 2 === 1;
    const illustration = panelIllustrations[panel.slug];
    return section({ tone: i % 2 === 0 ? 'tint' : 'subtle', id: panel.slug }, `
<div class="split expert-panel${reversed ? ' expert-panel--reverse' : ''}">
  ${illustration ? heroIllustration(illustration.src, illustration.alt) : ''}
  <div>
    <p class="overline">${panel.title}</p>
    <h2 class="h2 mt-4">${panel.body}</h2>
    <p class="body mt-6">They can help with:</p>
    <div class="mt-5">${checkList(panel.items)}</div>
    <div class="mt-8"><a class="btn btn--primary" href="${panel.href}">${panel.cta}</a></div>
  </div>
</div>`);
  }).join('\n');

  return G.pageHero({
    overline: 'Talk to an expert', title: 'Two kinds of guidance, one conversation away', mark: 'one conversation away',
    lead: 'A career expert has seen thousands of students choose a path. A student expert is living the result of one. Pick whichever answers the question you actually have.',
    aside: heroIllustration('images/illustrations/experts-hero.svg', 'An illustration of an expert giving advice over video'),
  }) +
    section({ tone: 'plain' }, `${sectionHeading({ overline: 'How it works', title: 'The same four steps, whichever you choose' })}<div class="mt-12">${howItWorksSteps(D.expertSteps, stepImages)}</div>`) +
    panels +
    section({ tone: 'plain' }, `${sectionHeading({ overline: 'Ready when you are', title: 'Book a session' })}${reveal(expertPriceCard(false), { className: 'expert-price mt-12' })}`);
}

/* ==========================================================================
   Expert category pages — ported from app/experts/[category]/page.tsx
   ========================================================================== */
function expertCategoryPage(slug) {
  const panel = D.expertPanels.find(p => p.slug === slug);
  const profiles = D.expertProfiles[slug] || [];
  const cards = profiles.map((profile, i) => reveal(
    card({ tone: 'subtle', className: 'expert-card' }, `
${cardHeader(null, null, cardEyebrow(profile.role) + cardTitle(profile.name, { as: 'h3' }))}
<p class="expert-card__education">${profile.education}</p>
${cardBody(profile.bio)}
<div class="expert-card__domains">${profile.domains.map(d => `<span class="pill pill--soft">${d}</span>`).join('')}</div>
<div class="card__meta card__meta--inline">${metaItem(ICON.clock, D.expertSession.label)}${cardValue(D.expertSession.price, 'lg')}</div>
<a class="btn btn--primary btn--block" href="contact.html">Book Session</a>`),
    { delay: i * 90 }
  )).join('\n');

  return G.pageHero({ overline: `Talk to an expert · ${panel.title}`, title: panel.title, lead: panel.body }) +
    section({ tone: 'plain' }, `<div class="grid grid--3">${cards}</div>`);
}

/* ==========================================================================
   For Schools — ported from app/for-schools/page.tsx
   ========================================================================== */
function forSchoolsPage() {
  const stats = [
    { value: '300+', label: 'Partner schools' }, { value: '60,000', label: 'Students guided' },
    { value: '90%+', label: 'Positive parent feedback' }, { value: '3 yrs', label: 'Structured journey' },
  ];
  const pressures = [
    { n: '01', icon: 'users', title: 'Rising parent anxiety', body: "Parents want clarity on their child's future. Without a structured answer, that anxiety lands on your admissions and academic teams." },
    { n: '02', icon: 'compass', title: 'No personalised guidance', body: "Generic aptitude tests don't map to real careers. Students still leave Class 10 unsure of streams, electives and next steps." },
    { n: '03', icon: 'school', title: 'Admissions & retention', body: "Parents choose — and stay with — schools that visibly invest in a child's future beyond marks." },
    { n: '04', icon: 'checklist', title: 'CBSE is evolving', body: 'New guidelines expect schools to embed career awareness. Our framework is already aligned with them.' },
  ];
  const phases = [
    { pill: 'Phase 01 · Class 8', icon: 'spark', title: 'Inspire', tone: 'on-brand', items: ['Career awareness workshops for parents', 'Self-discovery workshops for students', 'Meetups with career role models', 'Learning style reports'] },
    { pill: 'Phase 02 · Class 9', icon: 'chart', title: 'Inform', tone: 'on-brand', items: ['Exposure to 250+ careers', 'Unique career-related quizzes', 'Scientific career-personality tests', 'Cohort-level insight report for the school'] },
    { pill: 'Phase 03 · Class 10', icon: 'chat', title: 'Initiate', tone: 'soft', items: ['3 one-to-one counselling sessions per child', 'Personalised top-2 career decisions', 'College-to-career plan', 'Detailed 20-page student report'] },
  ];
  const promises = ['No commitment — a 30-minute discovery call', 'Custom rollout plan for your grade levels', 'Sample reports and workshop preview', 'Institutional pricing based on cohort size'];

  const pressureCards = pressures.map((item, i) => reveal(
    card({ tone: 'clay' }, cardHeader(cardIcon(item.icon), null, cardEyebrow(item.n) + cardTitle(item.title)) + cardBody(item.body)),
    { delay: i * 90 }
  )).join('\n');
  const phaseCards = phases.map(p => card({ tone: p.tone }, cardHeader(cardIcon(p.icon), null, cardEyebrow(p.pill) + cardTitle(p.title)) + checkList(p.items))).join('\n');

  return G.pageHero({
    overline: 'Institutional partnerships', title: 'Future-ready schools create future-ready students.', mark: 'future-ready students',
    lead: 'A personalised, scientifically structured and research-driven career guidance program for Grades 8–12 — delivered inside your school, by our counsellors, on your calendar.',
    actions: `${btn('#inquiry', 'Schedule a school consultation', { arrow: true })}${btn('#brochure', 'Download brochure', { variant: 'outline' })}`,
    aside: heroIllustration('images/illustrations/for-schools-hero.svg', 'An illustration of students outside their high school'),
    stats,
    children: `<p class="small mt-5" style="color:var(--ls-blue-400);font-weight:700">300+ schools already partner with Lodestar</p>`,
  }) +
    section({ tone: 'plain' }, `
<div class="split split--copy-wide" style="align-items:center">
  <div><p class="overline">Why schools need this</p><h2 class="h2 mt-4">The pressure on schools has changed.</h2></div>
  <p class="lead">Parents no longer measure schools by marks alone. They ask what happens after Class 10 — and they expect the school to have an answer.</p>
</div>
<div class="grid grid--4 mt-12">${pressureCards}</div>`) +
    section({ tone: 'brand' }, `
${sectionHeading({ overline: 'The Career Leaders Program', title: 'A 3-year journey. One confident decision.', lead: 'The CLP systematically builds career leaders — from awareness in Class 8 to a concrete college-to-career plan in Class 10.' })}
<div class="grid grid--3 mt-12">${phaseCards}</div>`) +
    section({ tone: 'tint' }, `
${sectionHeading({ overline: 'The Lodestar advantage', title: 'Trusted by the schools you respect.' })}
<div class="logo-row mt-12">${(G.partnerSchools || []).map(s => `<span>${s}</span>`).join('')}</div>
<figure class="card card--raised mt-12">
  <span class="quote-mark" aria-hidden="true">&rdquo;</span>
  <blockquote class="lead" style="color:var(--fg)">There has been definite positive feedback from parents on the programme. Lodestar has brought a level of clarity to career guidance our students had not experienced before.</blockquote>
  <figcaption class="flex items-center gap-4 mt-4">
    <span class="avatar" aria-hidden="true"></span>
    <span><span style="display:block;font-weight:700">Shanthi Menon</span><span class="small">Founder Principal · Deens Academy</span></span>
  </figcaption>
</figure>`) +
    section({ tone: 'plain', id: 'inquiry' }, `
<div class="split split--form">
  <div>
    <p class="overline">Get started</p>
    <h2 class="h2 mt-4">Empower students for 21st-century careers.</h2>
    <p class="body mt-5">Tell us a little about your school. Our partnerships team will reach out within one working day to schedule a consultation.</p>
    <div class="mt-8">${dotList(promises)}</div>
    <p class="mt-8" id="brochure">${arrowLink('programs.html#outcome', 'Preview what the report covers')}</p>
  </div>
  ${schoolsInquiryForm()}
</div>`);
}

function schoolsInquiryForm() {
  return `<form data-flow="/api/schools-inquiry" novalidate>
  <div class="form-card form-card--subtle" data-shake="">
    <div><h2 class="h3">Request a consultation</h2></div>
    ${P.honeypot()}
    ${P.formProgress()}
    ${P.inputField({ name: 'schoolName', label: 'School name', placeholder: 'School name', autoComplete: 'organization' })}
    ${P.inputField({ name: 'contactName', label: 'Principal or coordinator name', placeholder: 'Principal / Coordinator name', autoComplete: 'name' })}
    ${P.inputField({ name: 'city', label: 'City', placeholder: 'City', autoComplete: 'address-level2' })}
    ${P.inputField({ name: 'phone', label: 'Phone', placeholder: 'Phone', type: 'tel', autoComplete: 'tel', pattern: P.PHONE_PATTERN, invalidMessage: P.PHONE_INVALID })}
    ${P.inputField({ name: 'email', label: 'Email', placeholder: 'Email', type: 'email', autoComplete: 'email' })}
    ${P.chipRadios({ name: 'preferredProgram', legend: 'Preferred grade levels', options: ['Class 8', 'Class 9', 'Class 10', 'Class 11–12'], defaultValue: 'Class 8' })}
    ${P.submitBtn({ idle: 'Schedule my consultation', busy: 'Sending…', done: 'Request received', variant: 'navy' })}
    <p class="form-note">We reply within one working day. No spam, ever. Your institutional brochure is emailed instantly on submit.</p>
  </div>
</form>`;
}

/* ==========================================================================
   Free assessment — ported from app/free-assessment/page.tsx
   ========================================================================== */
function freeAssessmentForm() {
  return `<form data-flow="/api/free-assessment">
  <div class="form-card" data-shake="">
    <div><h2 class="h3">Start the free assessment</h2><p class="body mt-3">Step 1 of 2 — we'll send the test link straight to your child.</p></div>
    ${P.honeypot()}
    ${P.formProgress()}
    ${P.inputField({ name: 'parentName', label: 'Parent name', placeholder: 'Parent name', autoComplete: 'name' })}
    ${P.inputField({ name: 'mobile', label: 'Mobile number', placeholder: 'Mobile number', type: 'tel', autoComplete: 'tel', pattern: P.PHONE_PATTERN, invalidMessage: 'Enter a mobile number with 8–18 digits, e.g. +91 98765 43210.' })}
    ${P.inputField({ name: 'email', label: 'Email address', placeholder: 'Email address', type: 'email', autoComplete: 'email' })}
    ${P.inputField({ name: 'studentName', label: 'Student name', placeholder: 'Student name' })}
    ${P.inputField({ name: 'city', label: 'City', placeholder: 'City', autoComplete: 'address-level2' })}
    ${P.chipRadios({ name: 'grade', legend: 'Current grade', options: ['Class 8', 'Class 9', 'Class 10', 'Class 11–12'], defaultValue: 'Class 10' })}
    ${P.submitBtn({ idle: 'Send me the free test', busy: 'Sending…', done: 'Test link on its way', arrow: true })}
    <p class="form-note">By continuing you agree to our <a href="legal-privacy-policy.html" style="text-decoration:underline">Privacy Policy</a>. We never sell your data.</p>
  </div>
</form>`;
}

function freeAssessmentPage() {
  const promises = ['No payment and no card details required', 'Takes about 15 minutes, no preparation needed', 'Instant summary emailed to you', 'Counsellor callback only if you ask for one'];
  const steps = [
    { n: '01', icon: 'document', title: 'Test link arrives', body: 'Sent to your inbox and by SMS within a minute of submitting this form.', highlight: true },
    { n: '02', icon: 'clock', title: 'Your child takes it', body: 'About 15 minutes online, at home, whenever suits. No preparation, no time pressure on the personality section.' },
    { n: '03', icon: 'chart', title: 'Instant snapshot', body: 'A summary of strengths, personality type and matched career families lands in your inbox.' },
    { n: '04', icon: 'chat', title: 'Optional call', body: 'If you want to go further, a counsellor walks you through the full program. Only if you ask.' },
  ];
  const stepCards = steps.map((s, i) => reveal(
    card({ tone: s.highlight ? 'navy' : 'clay' }, cardHeader(cardIcon(s.icon), null, cardEyebrow(`Step ${s.n}`) + cardTitle(s.title, { as: 'h2' })) + cardBody(s.body)),
    { delay: i * 90 }
  )).join('\n');

  return G.pageHero({
    overline: `<span class="flex items-center gap-2">${ICON.lock}Secure · HTTPS · lodestar.guru/free-assessment</span>`,
    title: 'Find out where your child stands. In fifteen minutes.', mark: 'In fifteen minutes.',
    lead: "A short psychometric and interest screener. Your child answers online, you get an instant snapshot of their strengths, personality type and the career families that fit — before you spend a rupee.",
    aside: freeAssessmentForm(), layout: 'form',
    children: `<div class="mt-8">${dotList(promises)}</div>
<div class="notice mt-10"><p class="overline">Fix applied</p><p>This page replaces the old test link on port :8443 with the SendMessageToChlid path typo. Both /campaign.html and /campaign-apr/ now 301-redirect here so ad traffic and SEO authority consolidate on one URL.</p></div>`,
  }) +
    section({ tone: 'plain' }, `${sectionHeading({ overline: 'What happens next', title: 'Four steps, no surprises' })}<div class="grid grid--4 mt-12">${stepCards}</div>`);
}

module.exports = { expertsPage, expertCategoryPage, forSchoolsPage, freeAssessmentPage, howItWorksSteps, expertPriceCard };
