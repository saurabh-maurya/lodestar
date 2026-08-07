import type { Metadata } from 'next';
import { FreeAssessmentForm } from '@/components/forms';
import { LockIcon } from '@/components/icons';
import {
  Card,
  CardBody,
  CardEyebrow,
  CardHeader,
  CardTitle,
  DotList,
  Section,
  SectionHeading,
} from '@/components/ui';
import { cardIcon } from '@/components/card-icon-map';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Free Assessment — find out where your child stands',
  description:
    'A short psychometric and interest screener. Fifteen minutes online, an instant snapshot of strengths, personality type and matched career families — before you spend a rupee.',
};

const promises = [
  'No payment and no card details required',
  'Takes about 15 minutes, no preparation needed',
  'Instant summary emailed to you',
  'Counsellor callback only if you ask for one',
];

const steps = [
  {
    n: '01',
    icon: 'document',
    title: 'Test link arrives',
    body: 'Sent to your inbox and by SMS within a minute of submitting this form.',
    highlight: true,
  },
  {
    n: '02',
    icon: 'clock',
    title: 'Your child takes it',
    body: 'About 15 minutes online, at home, whenever suits. No preparation, no time pressure on the personality section.',
  },
  {
    n: '03',
    icon: 'chart',
    title: 'Instant snapshot',
    body: 'A summary of strengths, personality type and matched career families lands in your inbox.',
  },
  {
    n: '04',
    icon: 'chat',
    title: 'Optional call',
    body: 'If you want to go further, a counsellor walks you through the full program. Only if you ask.',
  },
];

export default function FreeAssessmentPage() {
  return (
    <>
      <PageHero
        overline={
          <span className="flex items-center gap-2">
            <LockIcon />
            Secure · HTTPS · lodestar.guru/free-assessment
          </span>
        }
        title="Find out where your child stands. In fifteen minutes."
        mark="In fifteen minutes."
        lead="A short psychometric and interest screener. Your child answers online, you get an instant snapshot of their strengths, personality type and the career families that fit — before you spend a rupee."
        aside={<FreeAssessmentForm />}
        layout="form"
      >
        <div className="mt-8">
          <DotList items={promises} />
        </div>

        <div className="notice mt-10">
          <p className="overline">Fix applied</p>
          <p>
            This page replaces the old test link on port :8443 with the
            SendMessageToChlid path typo. Both /campaign.html and
            /campaign-apr/ now 301-redirect here so ad traffic and SEO
            authority consolidate on one URL.
          </p>
        </div>
      </PageHero>

      <Section tone="plain">
        <SectionHeading
          overline="What happens next"
          title="Four steps, no surprises"
        />
        <div className="grid grid--4 mt-12">
          {steps.map((step, i) => (
            <Reveal delay={i * 90} key={step.n}>
              <Card tone={step.highlight ? 'navy' : 'clay'}>
                <CardHeader icon={cardIcon(step.icon)}>
                  <CardEyebrow>Step {step.n}</CardEyebrow>
                  <CardTitle as="h2">{step.title}</CardTitle>
                </CardHeader>
                <CardBody>{step.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
