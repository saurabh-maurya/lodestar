/* Content data — ported from lib/content/home.ts and lib/content/programs.ts */
const heroStats = [
  { value: '40,000+', label: 'Parents guided' },
  { value: '250+', label: 'Careers researched' },
  { value: '300+', label: 'Partner schools' },
  { value: '93%', label: 'Rate sessions excellent' },
];

const steps = [
  { n: '01', icon: 'compass', title: 'Discover', body: "Scientific psychometric, aptitude and interest tests analyse your child's real strengths, personality and motivations — then open up the world of 250+ researched careers." },
  { n: '02', icon: 'route', title: 'Determine', body: 'Map the education path each shortlisted career actually requires: streams, electives, entrance exams, courses and the institutes that teach them.' },
  { n: '03', icon: 'target', title: 'Decide', body: 'Lock in Career Plan A and Plan B, the +2 subject combination, exams to write, tutorials to join and the colleges to aim for — in a written 30-page report.' },
];

const whyLodestar = [
  { title: 'A scientific approach', body: 'Validated tests and a decision algorithm match passion and aptitude to the right career and education path — not to whatever is fashionable this year.' },
  { title: '250+ researched careers', body: 'Every career is written up as a guide book and validated by practitioners who actually work in that field.' },
  { title: 'Authentic institutional data', body: "200+ colleges, 100+ entrance exams, 100+ special courses and 15 of India's best tutorials, kept current." },
  { title: 'Individual attention', body: 'Three one-to-one sessions per child with an expert from a team of 100+ trained counsellors.' },
  { title: 'End-to-end decisions', body: 'From career and stream to electives, exams, tutorials and college — documented, not just discussed.' },
];

const schoolPhases = [
  { pill: 'Phase 01 · Class 8', icon: 'spark', title: 'Inspire', body: 'Career awareness workshops for parents, self-discovery workshops for students, meetups with role models and learning-style reports.' },
  { pill: 'Phase 02 · Class 9', icon: 'chart', title: 'Inform', body: 'Exposure to 250+ careers, career-related quizzes and scientific career-personality testing for the whole cohort.' },
  { pill: 'Phase 03 · Class 10', icon: 'chat', title: 'Initiate', body: 'Three one-to-one counselling sessions per child, top two career decisions and a college-to-career plan with a 20-page report.' },
];

const featuredQuote = {
  quote: '"It is imperative that we guide our children into careers that suit them best, rather than impose our limited knowledge upon them. The Lodestar program allows us to understand the width of options that are possible and then guides us with a well-researched methodology. I strongly feel it should be part of the formal education system."',
  name: 'Shantanu',
  role: 'Parent · Deens Academy',
};

const resourceCards = [
  { tag: 'Sample Report', icon: 'document', title: 'See exactly what you get', body: 'The full 30-page education plan we hand over at the end of the program — download the real sample.', href: 'programs.html#outcome' },
  { tag: 'FAQ', icon: 'help', title: 'Common questions, answered', body: "Scheduling, test preparation, who your counsellor will be, and what happens if you're unhappy.", href: 'programs.html#faq' },
  { tag: 'Videos', icon: 'video', title: 'Founder & parent stories', body: 'Career mantras and parent interviews, now playing inline instead of sending you off to social media.', href: 'resources.html#videos' },
  { tag: 'Blog', icon: 'journal', title: 'Career guidance journal', body: 'Longer reads on streams, entrance exams and the decisions families face after Class 10.', href: 'resources.html#blog' },
];

const programs = [
  {
    slug: 'foundation-building-plus', image: 'images/program-class9.jpg', titleLines: ['Foundation', 'Building PLUS'], titleAccent: 'PLUS',
    grade: 'Class 9', gradeLabel: '9th Grade', title: 'Foundation Building PLUS', price: '₹12,000', amount: 12000, duration: '13 weeks', featured: true,
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
    slug: 'foundation-building', image: 'images/program-class9.jpg', titleLines: ['Foundation', 'Building'],
    grade: 'Class 9', gradeLabel: '9th Grade', title: 'Foundation Building', price: '₹5,000', amount: 5000, duration: '8 weeks',
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
    slug: 'core-decision', image: 'images/program-class10.jpg', titleLines: ['Core', 'Decision'],
    grade: 'Class 10', gradeLabel: '10th Grade', title: 'Core Decision', price: '₹7,000', amount: 7000, duration: '7 weeks',
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
    slug: 'finalizing-decision', image: 'images/program-class1112.jpg', titleLines: ['Finalizing', 'Decision'],
    grade: 'Class 11 / 12', gradeLabel: '11th / 12th Grade', title: 'Finalizing Decision', price: '₹7,000', amount: 7000, duration: '5 weeks',
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

const assessments = [
  { icon: 'users', eyebrow: 'Test 01', title: 'Personality profile', duration: 'Untimed', format: 'No preparation', items: ['Generic questions about everyday situations', 'Nothing to revise or prepare for', 'Taken online, at home, in one sitting'] },
  { icon: 'chart', eyebrow: 'Test 02', title: 'Aptitude assessment', duration: 'About 1 hour', format: 'Timed', items: ['Maths, logic and English', 'Pitched at 8th–9th grade level', 'Measures strength, not school marks'] },
  { icon: 'compass', eyebrow: 'Test 03', title: 'Interest inventory', duration: 'Untimed', format: 'No preparation', items: ['What your child is drawn to', 'Mapped against 250+ researched careers', 'Shortlists matched career families'] },
  { icon: 'journal', eyebrow: 'Test 04', title: 'Learning style report', duration: 'Untimed', format: 'No preparation', items: ['How your child takes information in', 'Feeds the study and tuition plan', 'Shared with you in the written report'] },
];

const findProgram = (slug) => programs.find(p => p.slug === slug) || programs[0];
const programNote = 'All webinars 1 hour duration. Test is online.';
const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;

const howItWorks = [
  { title: 'Pay and sign up', body: "Register for the program that matches your child's grade." },
  { title: 'We call you to schedule', body: 'Lodestar contacts you to fix session dates around your convenience.' },
  { title: 'Attend the sessions', body: 'Webinars run to a published schedule; one-to-ones are yours to set.' },
  { title: 'Get the written plan', body: 'Finalise the decision and receive the written report.' },
];

const methodSteps = [
  { label: 'Session 1', icon: 'compass', title: 'Discover', body: 'Test to analyse strength and interest + Explore the world of jobs across 250+ researched careers.', rows: ['Psychometric personality profile', 'Timed aptitude assessment', 'Interest inventory', 'Shortlist of matched career families'] },
  { label: 'Session 2', icon: 'route', title: 'Determine', body: 'Map the education path each shortlisted career requires — and what it costs in time and effort.', rows: ['Education path from +2 to PG', 'Entrance exams to target', 'Institutes and tutorials', 'Realistic timelines'] },
  { label: 'Session 3', icon: 'target', title: 'Decide', body: 'Lock the decision: career, stream and electives, exams, tutorials and college shortlist.', rows: ['Career Plan A and Plan B', '+2 subject combination', 'Exam and tuition calendar', '30-page written report'] },
];

const principles = [
  { n: '01', icon: 'compass', title: 'It speaks to their passions', body: "A career that doesn't connect with what a child cares about will erode their performance over time. A child passionate about languages may never give finance their full effort — however well it pays." },
  { n: '02', icon: 'chart', title: 'It aligns with their strengths', body: "Interest alone isn't enough. A child drawn to aerospace but weak in mathematics will hit a ceiling that no amount of motivation clears. Aptitude has to be measured, not assumed.", highlight: true },
  { n: '03', icon: 'growth', title: 'It has room to grow', body: 'Strength and passion still need a healthy industry behind them. If the sector is shrinking, the skills your child spends six years building lose their value on arrival.' },
];

const outcomes = [
  { icon: 'document', title: '35-page education plan', body: 'Career decision, stream, electives, exams, tutorials and target colleges, written down.' },
  { icon: 'journal', title: '250+ career guide books', body: 'Researched and validated by practitioners working in each field.' },
  { icon: 'school', title: 'Institutional data', body: '200+ colleges, 100+ entrance exams, 100+ special courses, 15 leading tutorials.' },
  { icon: 'checklist', title: 'Quality guarantee', body: 'Feedback collected after every session. Additional sessions or a change of counsellor if needed.' },
];

const faqs = [
  { q: 'When will the sessions be conducted?', a: ['The group webinars are conducted every week. You will be allotted the next batch available. The individual sessions are conducted as per your date and time convenience. The entire schedule will be discussed with you before finalising.', 'The sessions are fixed with your consent. In case of any emergency or unavoidable circumstance we will allot an alternate session date.'] },
  { q: 'Is any preparation required to take the test?', a: ['No, our tests do not require any prior preparation. The Personality test is based on generic questions on common life situations like “Do you like to work alone or in a team”. The Aptitude test has questions on Math, Logic, English etc. All this is at basic 8th–9th grade level.', 'The Personality test is not timed. The Aptitude test is timed, so you need to allot 1 hour.'] },
  { q: 'Who will be my counselor?', a: ['Lodestar has a team of 100+ expert and trained counselors. Each counselor has done more than 100 individual sessions. They are supported by the Lodestar Online platform, which has accurate information on careers, courses and colleges. The Lodestar platform assigns one of these expert counselors based on availability.'] },
  { q: 'What if I am unhappy with my sessions?', a: ['The Lodestar quality team collects feedback after each session, and based on your feedback quick corrective action is taken. This can include additional sessions, additional information, or even a change of counselor. You will have enough opportunity to redress your complaints or issues through the process.', '93% of our parents have rated the sessions as Excellent or Good till now.'] },
];

const expertPanels = [
  { slug: 'career-experts', icon: 'target', title: 'Career Experts', body: 'Speak with experienced career counsellors who help students choose the right education and career path.', items: ['Choosing the right career', 'Comparing multiple career options', 'Education roadmap', 'Alternative career paths'], cta: 'Browse Career Experts', href: 'experts-career-experts.html' },
  { slug: 'student-experts', icon: 'school', title: 'Student Experts', body: 'Connect with students studying at top colleges and get honest first-hand insight before you apply.', items: ['College life', 'Course curriculum', 'Placement reality', 'Campus culture'], cta: 'Talk to Student Expert', href: 'experts-student-experts.html' },
];

const expertSteps = [
  { icon: 'users', title: 'Choose an expert' },
  { icon: 'clock', title: 'Book a session' },
  { icon: 'video', title: 'Connect by video, phone or email' },
  { icon: 'target', title: 'Get personalised guidance' },
];

const expertSession = { label: '30-minute expert session', price: '₹500', note: 'Personalised guidance from verified experts.' };
const expertBadges = ['Verified experts', 'Real college students', 'Personalised advice', 'Flexible scheduling'];
const expertStats = [{ value: '4.9', label: 'Expert rating', star: true }, { value: '1000+', label: 'Sessions conducted' }, { value: '50+', label: 'Experts available' }];

const expertProfiles = {
  'career-experts': [
    { slug: 'career-a', name: 'Career Expert A', role: 'Sample profile · Engineering & Technology track', education: 'Sample education details — to be replaced with a real counsellor’s degrees.', bio: 'Sample bio. This slot will describe how this counsellor has helped students weigh engineering and technology careers once real experts are onboarded.', domains: ['Engineering', 'Technology', 'Stream selection'] },
    { slug: 'career-b', name: 'Career Expert B', role: 'Sample profile · Commerce & Management track', education: 'Sample education details — to be replaced with a real counsellor’s degrees.', bio: 'Sample bio. This slot will describe experience guiding students through commerce and management options once real experts are onboarded.', domains: ['Commerce', 'Management', 'Education roadmap'] },
    { slug: 'career-c', name: 'Career Expert C', role: 'Sample profile · Design & Humanities track', education: 'Sample education details — to be replaced with a real counsellor’s degrees.', bio: 'Sample bio. This slot will describe experience guiding students exploring design and humanities careers once real experts are onboarded.', domains: ['Design', 'Humanities', 'Alternative careers'] },
  ],
  'student-experts': [
    { slug: 'student-a', name: 'Student Expert A', role: 'Sample profile · Engineering college', education: 'Sample education details — to be replaced with a real student’s course and college.', bio: 'Sample bio. This slot will share first-hand insight on engineering college life and placements once real students are onboarded.', domains: ['College life', 'Placement reality', 'Campus culture'] },
    { slug: 'student-b', name: 'Student Expert B', role: 'Sample profile · Commerce college', education: 'Sample education details — to be replaced with a real student’s course and college.', bio: 'Sample bio. This slot will share first-hand insight on commerce college curriculum and campus life once real students are onboarded.', domains: ['Course curriculum', 'Campus culture', 'College life'] },
    { slug: 'student-c', name: 'Student Expert C', role: 'Sample profile · Design college', education: 'Sample education details — to be replaced with a real student’s course and college.', bio: 'Sample bio. This slot will share first-hand insight on design college coursework and portfolio life once real students are onboarded.', domains: ['Course curriculum', 'Campus culture', 'Placement reality'] },
  ],
};

const programLinks = [
  { icon: 'document', title: 'Download a sample report', body: 'The full written plan we hand over at the end of the program.', href: '#outcome', cta: 'View what it covers' },
  { icon: 'users', title: 'Check out what our happy parents say about us', body: 'Video stories and written reviews from families who finished the program.', href: 'testimonials.html', cta: 'Read parent stories' },
  { icon: 'chat', title: 'Talk to a counsellor', body: 'Pick your city and we will call you back, usually the same working day.', href: 'contact.html', cta: 'Request a callback' },
];

module.exports = {
  heroStats, steps, whyLodestar, schoolPhases, featuredQuote, resourceCards, programs, assessments,
  findProgram, programNote, rupees, howItWorks, methodSteps, principles, outcomes, faqs,
  expertPanels, expertSteps, expertSession, expertBadges, expertStats, expertProfiles, programLinks,
};
