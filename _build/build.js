const G = require('./generate');
const P1 = require('./pages');
const P2 = require('./pages2');
const P3 = require('./pages3');
const { fs, path, OUT, layout } = G;

const PAGES = [
  { file: 'index.html', title: "Lodestar — India's first scientific career guidance program", description: "Psychometric assessment, 250+ researched careers and three one-to-one sessions with a trained expert — ending in a written plan from stream to college. Trusted by 40,000+ parents since 2011.", section: 'home', page: 'home', content: P1.homePage() },
  { file: 'about.html', title: 'About Us — who is behind this', description: "Lodestar was founded in 2011 by education entrepreneurs with 50+ years of combined experience running Manipal Education, MeritTrac and Pearson. Company history and our expert bench, on one page.", section: 'about', page: 'about', content: P1.aboutPage() },
  { file: 'contact.html', title: 'Contact — pick your city and we will call you back', description: 'Bangalore and Hyderabad offices, phone numbers, email and counsellor availability — plus a callback request, usually answered the same working day.', section: 'contact', page: 'contact', content: P1.contactPage() },
  { file: 'experts.html', title: 'Talk to an Expert — career experts and student experts', description: 'Book a one-to-one session with an experienced career counsellor or a current college student, and get answers tailored to your goals.', section: 'experts', page: 'experts', content: P2.expertsPage() },
  { file: 'experts-career-experts.html', title: 'Career Experts — book a session', description: 'Speak with experienced career counsellors who help students choose the right education and career path.', section: 'experts', page: 'experts-category', content: P2.expertCategoryPage('career-experts') },
  { file: 'experts-student-experts.html', title: 'Student Experts — book a session', description: 'Connect with students studying at top colleges and get honest first-hand insight before you apply.', section: 'experts', page: 'experts-category', content: P2.expertCategoryPage('student-experts') },
  { file: 'for-schools.html', title: 'For Schools — the Career Leaders Program', description: 'A personalised, scientifically structured career guidance program for Grades 8–12, delivered inside your school by Lodestar counsellors. 300+ partner schools.', section: 'for-schools', page: 'for-schools', content: P2.forSchoolsPage() },
  { file: 'free-assessment.html', title: 'Free Assessment — find out where your child stands', description: 'A short psychometric and interest screener. Fifteen minutes online, an instant snapshot of strengths, personality type and matched career families — before you spend a rupee.', section: null, page: 'free-assessment', content: P2.freeAssessmentPage() },
  { file: 'legal-privacy-policy.html', title: 'Privacy Policy', description: 'How Lodestar collects, uses and protects the information families share with us.', section: null, page: 'legal', content: P3.legalPage('privacy-policy') },
  { file: 'legal-terms-conditions.html', title: 'Terms & Conditions', description: 'The terms that apply when you use lodestar.guru or enrol in a Lodestar program.', section: null, page: 'legal', content: P3.legalPage('terms-conditions') },
  { file: 'legal-refund-policy.html', title: 'Refund Policy', description: 'What happens if a Lodestar program is not right for your family.', section: null, page: 'legal', content: P3.legalPage('refund-policy') },
  { file: 'programs.html', title: 'Programs — scoped to the decision your child faces now', description: 'Foundation Building, Core Decision and Finalizing Decision — the programs, the method behind them, and the outcome, all on one page.', section: 'programs', page: 'programs', content: P3.programsPage() },
  { file: 'programs-register.html', title: 'Register — reserve your place on a Lodestar program', description: 'The full program — outcome, curriculum and how it runs — plus what it costs, before you share a single detail.', section: 'programs', page: 'programs-register', content: P3.programsRegisterPage() },
  { file: 'programs-register-payment.html', title: 'Confirm & pay — Lodestar', description: 'Review the program and the amount, add a discount code if you have one, and confirm. Nothing is charged on this screen.', section: 'programs', page: 'programs-register-payment', content: P3.programsRegisterPaymentPage() },
  { file: 'resources.html', title: 'Career guidance journal — longer reads for parents', description: 'Longer reads on streams, entrance exams and the decisions families face after Class 10. Search the Lodestar career guidance journal.', section: 'resources', page: 'resources', content: P3.resourcesPage() },
  { file: 'testimonials.html', title: 'Testimonials — 40,000 parents have been through this decision', description: 'Every parent quote on the site lives here: video stories and written reviews from families who completed the Lodestar career guidance program.', section: 'testimonials', page: 'testimonials', content: P3.testimonialsPage() },
];

PAGES.forEach(p => {
  const html = layout(p);
  fs.writeFileSync(path.join(OUT, p.file), html, 'utf8');
  console.log('wrote', p.file);
});
console.log(`\n${PAGES.length} pages written to ${OUT}`);
