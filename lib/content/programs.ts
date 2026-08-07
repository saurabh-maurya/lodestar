/**
 * The four programs, in one place.
 *
 * The cards on /programs and the registration page both read from here. That
 * matters more than it looks: the price shown on the card and the amount a
 * parent is asked to pay have to be the same number, and the only way to
 * guarantee that is for there to be one number.
 */
/**
 * The three panels that fan out of a program card on hover.
 *
 * The card itself only carries what is comparable across all four — grade,
 * title, duration, price. Everything that differs lives here, so the grid
 * stays scannable and the detail is one hover away instead of four columns
 * of unequal lists.
 */
/**
 * One row of the curriculum.
 *
 * `kind` drives the icon and the colour accent — an assessment, a webinar
 * and a one-to-one session are different sorts of thing, and the list says
 * so with typography and colour rather than by boxing each one.
 *
 * A module with `children` is a parent category: it collapses, and its
 * children sit indented under a connector line.
 */
export type Module = {
  kind: 'assessment' | 'webinar' | 'session' | 'note';
  title: string;
  description?: string;
  children?: { title: string; description?: string }[];
};

export type ProgramDetail = {
  /** What the child walks away with. */
  outcome: string[];
  /** What is actually delivered, in order, as a curriculum. */
  modules: Module[];
  /** The four steps from paying to holding the report. */
  how: string[];
};

export type Program = {
  /** URL slug — what /programs/register?program= carries. */
  slug: string;
  /**
   * The title broken the way the card should set it — one array entry per
   * line. Every card runs to two lines whether or not its title would wrap
   * on its own, so the prices below them land on the same baseline across
   * the row. `title` stays the plain string for headings, forms and records.
   */
  titleLines: string[];
  /**
   * A word inside the title set apart in gold. Only "PLUS" uses it: it is
   * the upgrade marker, and it is the one thing that distinguishes two cards
   * whose names are otherwise identical.
   */
  titleAccent?: string;
  /** The eyebrow on the card. */
  grade: string;
  /** The grade as the registration form states it. */
  gradeLabel: string;
  title: string;
  /** Display price, formatted. */
  price: string;
  /** The same amount as a number, for the payment summary and any total. */
  amount: number;
  duration: string;
  featured?: boolean;
  /** The summary list — still used on the registration page. */
  items: string[];
  detail: ProgramDetail;
};

export const programs: Program[] = [
  {
    slug: 'foundation-building-plus',
    titleLines: ['Foundation', 'Building PLUS'],
    titleAccent: 'PLUS',
    grade: 'Class 9',
    gradeLabel: '9th Grade',
    title: 'Foundation Building PLUS',
    price: '₹12,000',
    amount: 12000,
    duration: '13 weeks',
    featured: true,
    items: [
      'Psychometric + aptitude + interest test',
      '4 group webinars',
      '3 one-to-one expert sessions',
      '30-page report + stream decision',
    ],
    detail: {
      outcome: [
        "Child's potential mapping",
        'Awareness for child on — Personality, Aptitude, Interest, Aspiration',
        'Awareness for child on World of Work — basics of working',
        'Info and awareness on careers in Science, Arts, Commerce',
        'Decision on stream + education path post Grade 10',
      ],
      modules: [
        {
          kind: 'assessment',
          title: 'Assessment',
          description: 'Psychometric + Aptitude + Interest Test',
        },
        {
          kind: 'webinar',
          title: 'Four group webinars',
          description: 'One hour each, live',
          children: [
            { title: 'Webinar 1', description: 'Know Yourself' },
            { title: 'Webinar 2', description: 'World of Work' },
            {
              title: 'Webinar 3',
              description: 'World of Careers 1 — Science Careers',
            },
            {
              title: 'Webinar 4',
              description: 'World of Careers 2 — Commerce & Arts Careers',
            },
          ],
        },
        {
          kind: 'session',
          title: 'Three one-on-one sessions',
          description: 'With a trained expert',
          children: [
            { title: 'Session 1', description: 'Discover' },
            { title: 'Session 2', description: 'Determine' },
            { title: 'Session 3', description: 'Decide' },
          ],
        },
      ],
      how: [
        'Pay and sign up for the program',
        'Lodestar will contact you to schedule sessions',
        'Attend sessions as per schedule',
        'Finalise decision and get a 30-page report',
      ],
    },
  },
  {
    slug: 'foundation-building',
    titleLines: ['Foundation', 'Building'],
    grade: 'Class 9',
    gradeLabel: '9th Grade',
    title: 'Foundation Building',
    price: '₹5,000',
    amount: 5000,
    duration: '8 weeks',
    items: [
      'Psychometric + aptitude + interest test',
      '4 group webinars',
      'Careers across Science, Commerce, Arts',
      'Potential mapping report',
    ],
    /* Same four webinars as PLUS, without the one-to-one sessions — which is
       the whole difference between the two, and why this one stops at a
       potential map rather than at a stream decision. */
    detail: {
      outcome: [
        "Child's potential mapping",
        'Awareness for child on — Personality, Aptitude, Interest, Aspiration',
        'Awareness for child on World of Work — basics of working',
        'Info and awareness on careers in Science, Arts, Commerce',
      ],
      modules: [
        {
          kind: 'assessment',
          title: 'Assessment',
          description: 'Psychometric + Aptitude + Interest Test',
        },
        {
          kind: 'webinar',
          title: 'Four group webinars',
          description: 'One hour each, live',
          children: [
            { title: 'Webinar 1', description: 'Know Yourself' },
            { title: 'Webinar 2', description: 'World of Work' },
            {
              title: 'Webinar 3',
              description: 'World of Careers 1 — Science Careers',
            },
            {
              title: 'Webinar 4',
              description: 'World of Careers 2 — Commerce & Arts Careers',
            },
          ],
        },
      ],
      how: [
        'Pay and sign up for the program',
        'Lodestar will contact you to schedule the webinars',
        'Attend webinars as per schedule',
        'Receive the potential mapping report',
      ],
    },
  },
  {
    slug: 'core-decision',
    titleLines: ['Core', 'Decision'],
    grade: 'Class 10',
    gradeLabel: '10th Grade',
    title: 'Core Decision',
    price: '₹7,000',
    amount: 7000,
    duration: '7 weeks',
    items: [
      'Career Plan A + Plan B',
      'Stream & +2 subject combination',
      'Entrance exams to target in 12th',
      'Degree and college shortlist',
    ],
    detail: {
      outcome: [
        'Career Plan A and Plan B',
        'Stream and +2 subject combination decided',
        'Entrance exams to target in 12th',
        'Degree and college shortlist',
      ],
      modules: [
        {
          kind: 'assessment',
          title: 'Assessment',
          description: 'Psychometric + Aptitude + Interest Test',
        },
        {
          kind: 'webinar',
          title: 'Stream-specific career webinar',
          description: 'One hour, live',
        },
        {
          kind: 'session',
          title: 'Three one-on-one sessions',
          description: 'With a trained expert',
          children: [
            { title: 'Session 1', description: 'Discover' },
            { title: 'Session 2', description: 'Determine' },
            { title: 'Session 3', description: 'Decide' },
          ],
        },
      ],
      how: [
        'Pay and sign up for the program',
        'Lodestar will contact you to schedule sessions',
        'Attend sessions as per schedule',
        'Finalise decision and get the written report',
      ],
    },
  },
  {
    slug: 'finalizing-decision',
    titleLines: ['Finalizing', 'Decision'],
    grade: 'Class 11 / 12',
    gradeLabel: '11th / 12th Grade',
    title: 'Finalizing Decision',
    price: '₹7,000',
    amount: 7000,
    duration: '5 weeks',
    items: [
      'Degree & specialisation decision',
      'Stream-specific career webinar',
      'Tuition and entrance exam plan',
      'Final college selection',
    ],
    detail: {
      outcome: [
        'Degree and specialisation decision',
        'Tuition and entrance exam plan',
        'Final college selection',
      ],
      modules: [
        {
          kind: 'assessment',
          title: 'Assessment',
          description: 'Psychometric + Aptitude + Interest Test',
        },
        {
          kind: 'webinar',
          title: 'Stream-specific career webinar',
          description: 'One hour, live',
        },
        {
          kind: 'session',
          title: 'Three one-on-one sessions',
          description: 'With a trained expert',
          children: [
            { title: 'Session 1', description: 'Discover' },
            { title: 'Session 2', description: 'Determine' },
            { title: 'Session 3', description: 'Decide' },
          ],
        },
      ],
      how: [
        'Pay and sign up for the program',
        'Lodestar will contact you to schedule sessions',
        'Attend sessions as per schedule',
        'Finalise decision and get the written report',
      ],
    },
  },
];

/**
 * The four assessments every program runs, in the order a child sits them.
 *
 * Every claim here is one the site already makes elsewhere — the FAQ on How
 * It Works ("the personality test … isn't timed", "the aptitude test covers
 * maths, logic and English at 8th–9th grade level and needs about an hour"),
 * the session breakdown, and the learning-style reports in the schools
 * program. Nothing about timing or difficulty is invented: a parent reading
 * this and then reading the FAQ must not find two different answers.
 */
export type Assessment = {
  icon: string;
  eyebrow: string;
  title: string;
  /** The deciding value on the card — how long it takes. */
  duration: string;
  /** Timed or not: the thing parents actually worry about. */
  format: string;
  items: string[];
};

export const assessments: Assessment[] = [
  {
    icon: 'users',
    eyebrow: 'Test 01',
    title: 'Personality profile',
    duration: 'Untimed',
    format: 'No preparation',
    items: [
      'Generic questions about everyday situations',
      'Nothing to revise or prepare for',
      'Taken online, at home, in one sitting',
    ],
  },
  {
    icon: 'chart',
    eyebrow: 'Test 02',
    title: 'Aptitude assessment',
    duration: 'About 1 hour',
    format: 'Timed',
    items: [
      'Maths, logic and English',
      'Pitched at 8th–9th grade level',
      'Measures strength, not school marks',
    ],
  },
  {
    icon: 'compass',
    eyebrow: 'Test 03',
    title: 'Interest inventory',
    duration: 'Untimed',
    format: 'No preparation',
    items: [
      'What your child is drawn to',
      'Mapped against 250+ researched careers',
      'Shortlists matched career families',
    ],
  },
  {
    icon: 'journal',
    eyebrow: 'Test 04',
    title: 'Learning style report',
    duration: 'Untimed',
    format: 'No preparation',
    items: [
      'How your child takes information in',
      'Feeds the study and tuition plan',
      'Shared with you in the written report',
    ],
  },
];

/** The details every enrolment asks for, previewed on the card's popover. */
export const enrolmentFields = [
  'Parent name',
  'Student name',
  'Gender',
  'Class',
  'Parent email ID',
  'Parent mobile no.',
  'Email ID for the test link',
];

export function findProgram(slug: string | undefined): Program {
  // Falls back to the featured program rather than 404ing: a parent who lands
  // on /programs/register with no slug still gets a working form, and the
  // course is a field they can change.
  return programs.find((p) => p.slug === slug) ?? programs[0];
}

/**
 * True of every program, so it is stated once beneath the whole grid rather
 * than repeated as the last line of four curriculums.
 */
export const programNote = 'All webinars 1 hour duration. Test is online.';

/**
 * The four steps from paying to holding the report. The same for every
 * program, which is why there is now one of these above the grid instead of
 * one on each of four cards saying near-identical things.
 *
 * The per-program `detail.how` still exists and still differs in its last
 * line — a 30-page report, a potential map — and the registration page uses
 * that, because there the parent has already chosen.
 */
export const howItWorks = [
  {
    title: 'Pay and sign up',
    body: 'Register for the program that matches your child’s grade.',
  },
  {
    title: 'We call you to schedule',
    body: 'Lodestar contacts you to fix session dates around your convenience.',
  },
  {
    title: 'Attend the sessions',
    body: 'Webinars run to a published schedule; one-to-ones are yours to set.',
  },
  {
    title: 'Get the written plan',
    body: 'Finalise the decision and receive the written report.',
  },
];

/**
 * The 3Ds — Lodestar's method, in the order every program runs it. This is
 * the fuller story behind the four `howItWorks` steps above: not just "you
 * pay, then we call you", but what the three one-to-one sessions actually
 * cover.
 *
 * Used in full on /programs, in the section that used to be a separate page
 * (/how-it-works). That page was folded back in here — a parent comparing
 * four cards and a parent reading the method were never really two
 * different visits, and a second page just added a click between them.
 */
export type MethodStep = {
  label: string;
  icon: string;
  title: string;
  body: string;
  rows: string[];
};

export const methodSteps: MethodStep[] = [
  {
    label: 'Session 1',
    icon: 'compass',
    title: 'Discover',
    body: 'Test to analyse strength and interest + Explore the world of jobs across 250+ researched careers.',
    rows: [
      'Psychometric personality profile',
      'Timed aptitude assessment',
      'Interest inventory',
      'Shortlist of matched career families',
    ],
  },
  {
    label: 'Session 2',
    icon: 'route',
    title: 'Determine',
    body: 'Map the education path each shortlisted career requires — and what it costs in time and effort.',
    rows: [
      'Education path from +2 to PG',
      'Entrance exams to target',
      'Institutes and tutorials',
      'Realistic timelines',
    ],
  },
  {
    label: 'Session 3',
    icon: 'target',
    title: 'Decide',
    body: 'Lock the decision: career, stream and electives, exams, tutorials and college shortlist.',
    rows: [
      'Career Plan A and Plan B',
      '+2 subject combination',
      'Exam and tuition calendar',
      '30-page written report',
    ],
  },
];

/**
 * The principle behind the method: why a career recommendation needs three
 * things true at once, not just one. Sits above the 3Ds on /programs — the
 * "why this order" before the order itself.
 */
export const principles = [
  {
    n: '01',
    icon: 'compass',
    title: 'It speaks to their passions',
    body: "A career that doesn't connect with what a child cares about will erode their performance over time. A child passionate about languages may never give finance their full effort — however well it pays.",
  },
  {
    n: '02',
    icon: 'chart',
    title: 'It aligns with their strengths',
    body: "Interest alone isn't enough. A child drawn to aerospace but weak in mathematics will hit a ceiling that no amount of motivation clears. Aptitude has to be measured, not assumed.",
    highlight: true,
  },
  {
    n: '03',
    icon: 'growth',
    title: 'It has room to grow',
    body: 'Strength and passion still need a healthy industry behind them. If the sector is shrinking, the skills your child spends six years building lose their value on arrival.',
  },
];

/**
 * What a family actually walks away with — the section a parent lands on
 * from "Sample Report" links elsewhere on the site (`#outcome` on
 * /programs).
 */
export const outcomes = [
  {
    icon: 'document',
    title: '35-page education plan',
    body: 'Career decision, stream, electives, exams, tutorials and target colleges, written down.',
  },
  {
    icon: 'journal',
    title: '250+ career guide books',
    body: 'Researched and validated by practitioners working in each field.',
  },
  {
    icon: 'school',
    title: 'Institutional data',
    body: '200+ colleges, 100+ entrance exams, 100+ special courses, 15 leading tutorials.',
  },
  {
    icon: 'checklist',
    title: 'Quality guarantee',
    body: 'Feedback collected after every session. Additional sessions or a change of counsellor if needed.',
  },
];

/**
 * The FAQ. Rendered once, at the bottom of /programs — the same page that
 * now also carries the programs, the method and the outcome, so there is
 * only the one place left it could live.
 *
 * Answers are arrays because several of them are genuinely two paragraphs —
 * the caveat in the second one is the part parents actually write in about.
 */
export const faqs: { q: string; a: string[] }[] = [
  {
    q: 'When will the sessions be conducted?',
    a: [
      'The group webinars are conducted every week. You will be allotted the next batch available. The individual sessions are conducted as per your date and time convenience. The entire schedule will be discussed with you before finalising.',
      'The sessions are fixed with your consent. In case of any emergency or unavoidable circumstance we will allot an alternate session date.',
    ],
  },
  {
    q: 'Is any preparation required to take the test?',
    a: [
      'No, our tests do not require any prior preparation. The Personality test is based on generic questions on common life situations like “Do you like to work alone or in a team”. The Aptitude test has questions on Math, Logic, English etc. All this is at basic 8th–9th grade level.',
      'The Personality test is not timed. The Aptitude test is timed, so you need to allot 1 hour.',
    ],
  },
  {
    q: 'Who will be my counselor?',
    a: [
      'Lodestar has a team of 100+ expert and trained counselors. Each counselor has done more than 100 individual sessions. They are supported by the Lodestar Online platform, which has accurate information on careers, courses and colleges. The Lodestar platform assigns one of these expert counselors based on availability.',
    ],
  },
  {
    q: 'What if I am unhappy with my sessions?',
    a: [
      'The Lodestar quality team collects feedback after each session, and based on your feedback quick corrective action is taken. This can include additional sessions, additional information, or even a change of counselor. You will have enough opportunity to redress your complaints or issues through the process.',
      '93% of our parents have rated the sessions as Excellent or Good till now.',
    ],
  },
];

/* ==========================================================================
   Talk to an expert
   A one-to-one session sold separately from the programs.

   PLACEHOLDERS — every number below is unverified and public-facing. The
   price, the rating, the session count and the expert count are all figures
   a parent will read as a promise, so they need replacing with real ones
   before this goes live. They are grouped here so that is one edit.
   ========================================================================== */
export const expertPanels = [
  {
    slug: 'career-experts',
    icon: 'target',
    title: 'Career Experts',
    body: 'Speak with experienced career counsellors who help students choose the right education and career path.',
    items: [
      'Choosing the right career',
      'Comparing multiple career options',
      'Education roadmap',
      'Alternative career paths',
    ],
    cta: 'Browse Career Experts',
    href: '/experts#career-experts',
  },
  {
    slug: 'student-experts',
    icon: 'school',
    title: 'Student Experts',
    body: 'Connect with students studying at top colleges and get honest first-hand insight before you apply.',
    items: [
      'College life',
      'Course curriculum',
      'Placement reality',
      'Campus culture',
    ],
    cta: 'Talk to Students',
    href: '/experts#student-experts',
  },
];

export const expertSteps = [
  { icon: 'users', title: 'Choose an expert' },
  { icon: 'clock', title: 'Book a session' },
  { icon: 'video', title: 'Connect by video, phone or email' },
  { icon: 'target', title: 'Get personalised guidance' },
];

export const expertSession = {
  label: '30-minute expert session',
  price: '₹500',
  note: 'Personalised guidance from verified experts.',
};

export const expertBadges = [
  'Verified experts',
  'Real college students',
  'Personalised advice',
  'Flexible scheduling',
];

export const expertStats = [
  { value: '4.9', label: 'Expert rating', star: true },
  { value: '1000+', label: 'Sessions conducted' },
  { value: '50+', label: 'Experts available' },
];

/**
 * The two files a parent asks for by name, plus the page that answers the
 * question behind them.
 *
 * NOTE — the PDFs do not exist in the repo yet. Rather than ship two links
 * that 404, these point at the section that holds the same material today —
 * `#outcome` further down this same page. When the files land in
 * /public/downloads/, change `href` to the commented path and add `download`
 * to the link; nothing else needs to move.
 */
export const programLinks = [
  {
    icon: 'document',
    title: 'Download a sample report',
    body: 'The full written plan we hand over at the end of the program.',
    // href: '/downloads/lodestar-sample-report.pdf'
    href: '#outcome',
    cta: 'View what it covers',
  },
  {
    icon: 'users',
    title: 'Check out what our happy parents say about us',
    body: 'Video stories and written reviews from families who finished the program.',
    href: '/testimonials',
    cta: 'Read parent stories',
  },
  {
    icon: 'chat',
    title: 'Talk to a counsellor',
    body: 'Pick your city and we will call you back, usually the same working day.',
    href: '/contact',
    cta: 'Request a callback',
  },
];

export const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
