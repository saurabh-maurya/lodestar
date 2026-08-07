import type { Metadata } from 'next';
import { SchoolsInquiryForm } from '@/components/forms';
import {
  ArrowLink,
  Button,
  Card,
  CardBody,
  CardEyebrow,
  CardHeader,
  CardTitle,
  CheckList,
  DotList,
  Media,
  Section,
  SectionHeading,
} from '@/components/ui';
import { cardIcon } from '@/components/card-icon-map';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { partnerSchools } from '@/lib/site';

export const metadata: Metadata = {
  title: 'For Schools — the Career Leaders Program',
  description:
    'A personalised, scientifically structured career guidance program for Grades 8–12, delivered inside your school by Lodestar counsellors. 300+ partner schools.',
};

const stats = [
  { value: '300+', label: 'Partner schools' },
  { value: '60,000', label: 'Students guided' },
  { value: '90%+', label: 'Positive parent feedback' },
  { value: '3 yrs', label: 'Structured journey' },
];

const pressures = [
  {
    n: '01',
    icon: 'users',
    title: 'Rising parent anxiety',
    body: "Parents want clarity on their child's future. Without a structured answer, that anxiety lands on your admissions and academic teams.",
  },
  {
    n: '02',
    icon: 'compass',
    title: 'No personalised guidance',
    body: "Generic aptitude tests don't map to real careers. Students still leave Class 10 unsure of streams, electives and next steps.",
  },
  {
    n: '03',
    icon: 'school',
    title: 'Admissions & retention',
    body: "Parents choose — and stay with — schools that visibly invest in a child's future beyond marks.",
  },
  {
    n: '04',
    icon: 'checklist',
    title: 'CBSE is evolving',
    body: 'New guidelines expect schools to embed career awareness. Our framework is already aligned with them.',
  },
];

const phases = [
  {
    pill: 'Phase 01 · Class 8',
    icon: 'spark',
    title: 'Inspire',
    tone: 'on-brand' as const,
    items: [
      'Career awareness workshops for parents',
      'Self-discovery workshops for students',
      'Meetups with career role models',
      'Learning style reports',
    ],
  },
  {
    pill: 'Phase 02 · Class 9',
    icon: 'chart',
    title: 'Inform',
    tone: 'on-brand' as const,
    items: [
      'Exposure to 250+ careers',
      'Unique career-related quizzes',
      'Scientific career-personality tests',
      'Cohort-level insight report for the school',
    ],
  },
  {
    pill: 'Phase 03 · Class 10',
    icon: 'chat',
    title: 'Initiate',
    tone: 'soft' as const,
    items: [
      '3 one-to-one counselling sessions per child',
      'Personalised top-2 career decisions',
      'College-to-career plan',
      'Detailed 20-page student report',
    ],
  },
];

const promises = [
  'No commitment — a 30-minute discovery call',
  'Custom rollout plan for your grade levels',
  'Sample reports and workshop preview',
  'Institutional pricing based on cohort size',
];

export default function ForSchoolsPage() {
  return (
    <>
      <PageHero
        overline="Institutional partnerships"
        title="Future-ready schools create future-ready students."
        mark="future-ready students"
        lead="A personalised, scientifically structured and research-driven career guidance program for Grades 8–12 — delivered inside your school, by our counsellors, on your calendar."
        actions={
          <>
            <Button href="#inquiry" arrow>
              Schedule a school consultation
            </Button>
            <Button href="#brochure" variant="outline">
              Download brochure
            </Button>
          </>
        }
        aside={<Media caption="Students in school classroom" variant="wide" />}
        stats={stats}
      >
        <p className="small mt-5" style={{ color: 'var(--ls-blue-400)', fontWeight: 700 }}>
          300+ schools already partner with Lodestar
        </p>
      </PageHero>

      <Section tone="plain">
        <div className="split split--copy-wide">
          <div>
            <p className="overline">Why schools need this</p>
            <h2 className="h2 mt-4">The pressure on schools has changed.</h2>
          </div>
          <p className="body">
            Parents no longer measure schools by marks alone. They ask what
            happens after Class 10 — and they expect the school to have an
            answer.
          </p>
        </div>

        <div className="grid grid--4 mt-12">
          {pressures.map((item, i) => (
            <Reveal delay={i * 90} key={item.n}>
              <Card tone="clay">
                <CardHeader icon={cardIcon(item.icon)}>
                  <CardEyebrow>{item.n}</CardEyebrow>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardBody>{item.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="brand">
        <SectionHeading
          overline="The Career Leaders Program"
          title="A 3-year journey. One confident decision."
          lead="The CLP systematically builds career leaders — from awareness in Class 8 to a concrete college-to-career plan in Class 10."
        />
        <div className="grid grid--3 mt-12">
          {phases.map((phase) => (
            <Card tone={phase.tone} key={phase.title}>
              <CardHeader icon={cardIcon(phase.icon)}>
                <CardEyebrow>{phase.pill}</CardEyebrow>
                <CardTitle>{phase.title}</CardTitle>
              </CardHeader>
              <CheckList items={phase.items} />
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          overline="The Lodestar advantage"
          title="Trusted by the schools you respect."
        />
        <div className="logo-row mt-12">
          {partnerSchools.map((school) => (
            <span key={school}>{school}</span>
          ))}
        </div>

        <figure className="card card--raised mt-12">
          <span className="quote-mark" aria-hidden="true">
            &rdquo;
          </span>
          <blockquote className="lead" style={{ color: 'var(--fg)' }}>
            There has been definite positive feedback from parents on the
            programme. Lodestar has brought a level of clarity to career
            guidance our students had not experienced before.
          </blockquote>
          <figcaption className="flex items-center gap-4 mt-4">
            <span className="avatar" aria-hidden="true" />
            <span>
              <span style={{ display: 'block', fontWeight: 700 }}>
                Shanthi Menon
              </span>
              <span className="small">Founder Principal · Deens Academy</span>
            </span>
          </figcaption>
        </figure>
      </Section>

      <Section tone="plain" id="inquiry">
        <div className="split split--form">
          <div>
            <p className="overline">Get started</p>
            <h2 className="h2 mt-4">Empower students for 21st-century careers.</h2>
            <p className="body mt-5">
              Tell us a little about your school. Our partnerships team will
              reach out within one working day to schedule a consultation.
            </p>
            <div className="mt-8">
              <DotList items={promises} />
            </div>
            <p className="mt-8" id="brochure">
              {/* The outcome section, now on /programs — the page that used
                  to hold this (/how-it-works) was folded into it. */}
              <ArrowLink href="/programs#outcome">
                Preview what the report covers
              </ArrowLink>
            </p>
          </div>
          <SchoolsInquiryForm />
        </div>
      </Section>
    </>
  );
}
