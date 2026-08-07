/**
 * Hero copy. The Figma frame also carries a Students-facing variant behind a
 * segmented control; the site ships the parent-facing copy only, which is the
 * state the frame shows by default and the primary audience for the program.
 */
export const heroCopy = {
  /**
   * Each line carries the phrase inside it that gets the accent colour.
   * `mark` must appear verbatim in `line` — the renderer splits on it rather
   * than the copy carrying markup, so this stays plain readable text.
   *
   * The two marked phrases are the promise the page is making: the decision
   * itself, and that it will be the right one. Colouring those and nothing
   * else means a parent who reads four words of this page reads the four
   * that matter.
   */
  headline: [
    { line: 'Your child has one career decision to make.', mark: 'one career decision' },
    { line: "We make sure it's the right one.", mark: 'the right one' },
  ],
  body: 'Psychometric assessment, 250+ researched careers and three one-to-one sessions with a trained expert — ending in a written plan from stream to college. Trusted by 40,000+ parents since 2011.',
} as const;

export const heroStats = [
  { value: '40,000+', label: 'Parents guided' },
  { value: '250+', label: 'Careers researched' },
  { value: '300+', label: 'Partner schools' },
  { value: '93%', label: 'Rate sessions excellent' },
];

/**
 * The note pinned at the seam between the hero and the founder story: the
 * few facts a parent wants before they read anything else. Kept to four short
 * lines — it is a mini paper note, and the moment it needs a paragraph it has
 * stopped being one.
 *
 * This is the only place its copy lives. To run an announcement instead (an
 * intake date, a new city), swap `lines` and point `action` at the page that
 * closes it.
 */
export const heroNote = {
  label: 'Before you read on',
  lines: [
    'Grades 8–12',
    'Three one-to-one sessions',
    'A written 30-page plan',
    'Bangalore & Hyderabad',
  ],
  action: { label: 'How it works', href: '/programs#method' },
} as const;

export const steps = [
  {
    n: '01',
    icon: 'compass',
    title: 'Discover',
    body: "Scientific psychometric, aptitude and interest tests analyse your child's real strengths, personality and motivations — then open up the world of 250+ researched careers.",
  },
  {
    n: '02',
    icon: 'route',
    title: 'Determine',
    body: 'Map the education path each shortlisted career actually requires: streams, electives, entrance exams, courses and the institutes that teach them.',
  },
  {
    n: '03',
    icon: 'target',
    title: 'Decide',
    body: 'Lock in Career Plan A and Plan B, the +2 subject combination, exams to write, tutorials to join and the colleges to aim for — in a written 30-page report.',
  },
];

export const whyLodestar = [
  {
    title: 'A scientific approach',
    body: 'Validated tests and a decision algorithm match passion and aptitude to the right career and education path — not to whatever is fashionable this year.',
  },
  {
    title: '250+ researched careers',
    body: 'Every career is written up as a guide book and validated by practitioners who actually work in that field.',
  },
  {
    title: 'Authentic institutional data',
    body: "200+ colleges, 100+ entrance exams, 100+ special courses and 15 of India's best tutorials, kept current.",
  },
  {
    title: 'Individual attention',
    body: 'Three one-to-one sessions per child with an expert from a team of 100+ trained counsellors.',
  },
  {
    title: 'End-to-end decisions',
    body: 'From career and stream to electives, exams, tutorials and college — documented, not just discussed.',
  },
];

export const schoolPhases = [
  {
    pill: 'Phase 01 · Class 8',
    icon: 'spark',
    title: 'Inspire',
    body: 'Career awareness workshops for parents, self-discovery workshops for students, meetups with role models and learning-style reports.',
  },
  {
    pill: 'Phase 02 · Class 9',
    icon: 'chart',
    title: 'Inform',
    body: 'Exposure to 250+ careers, career-related quizzes and scientific career-personality testing for the whole cohort.',
  },
  {
    pill: 'Phase 03 · Class 10',
    icon: 'chat',
    title: 'Initiate',
    body: 'Three one-to-one counselling sessions per child, top two career decisions and a college-to-career plan with a 20-page report.',
  },
];

export const featuredQuote = {
  quote:
    '"It is imperative that we guide our children into careers that suit them best, rather than impose our limited knowledge upon them. The Lodestar program allows us to understand the width of options that are possible and then guides us with a well-researched methodology. I strongly feel it should be part of the formal education system."',
  name: 'Shantanu',
  role: 'Parent · Deens Academy',
};

export const resourceCards = [
  {
    tag: 'Sample Report',
    icon: 'document',
    title: 'See exactly what you get',
    body: 'The full 30-page education plan we hand over at the end of the program — download the real sample.',
    href: '/programs#outcome',
  },
  {
    tag: 'FAQ',
    icon: 'help',
    title: 'Common questions, answered',
    body: "Scheduling, test preparation, who your counsellor will be, and what happens if you're unhappy.",
    href: '/programs#faq',
  },
  {
    tag: 'Videos',
    icon: 'video',
    title: 'Founder & parent stories',
    body: 'Career mantras and parent interviews, now playing inline instead of sending you off to social media.',
    href: '/resources#videos',
  },
  {
    tag: 'Blog',
    icon: 'journal',
    title: 'Career guidance journal',
    body: 'Longer reads on streams, entrance exams and the decisions families face after Class 10.',
    href: '/resources#blog',
  },
];
