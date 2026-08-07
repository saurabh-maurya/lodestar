import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardEyebrow,
  CardHeader,
  CardTitle,
  CheckList,
  Section,
  SectionHeading,
} from '@/components/ui';
import { cardIcon } from '@/components/card-icon-map';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { ExpertPriceCard } from '@/components/expert-price-card';
import { expertPanels, expertSteps } from '@/lib/content/programs';

export const metadata: Metadata = {
  title: 'Talk to an Expert — career experts and student experts',
  description:
    'Book a one-to-one session with an experienced career counsellor or a current college student, and get answers tailored to your goals.',
};

/**
 * Where "Browse Career Experts" and "Talk to Students" actually go.
 *
 * There is no expert-matching backend behind this yet — no logins, no
 * per-expert profiles — so this page does not invent named experts with
 * photos and bios to fill the space. What it can say honestly is what each
 * kind of expert helps with (the same copy the panels on /programs already
 * promise) and how to reach one, which is the callback form on /contact.
 * When real expert profiles exist, each category section below is where a
 * grid of them belongs.
 */
export default function ExpertsPage() {
  return (
    <>
      <PageHero
        overline="Talk to an expert"
        title="Two kinds of guidance, one conversation away"
        mark="one conversation away"
        lead="A career expert has seen thousands of students choose a path. A student expert is living the result of one. Pick whichever answers the question you actually have."
      />

      <Section tone="plain">
        <SectionHeading
          overline="How it works"
          title="The same four steps, whichever you choose"
        />
        <div className="grid grid--4 mt-12">
          {expertSteps.map((step, i) => (
            <Reveal delay={i * 90} key={step.title}>
              <Card tone="clay">
                <CardHeader icon={cardIcon(step.icon)}>
                  <CardEyebrow>Step {i + 1}</CardEyebrow>
                  <CardTitle as="h3">{step.title}</CardTitle>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {expertPanels.map((panel, i) => (
        <Section
          tone={i % 2 === 0 ? 'tint' : 'subtle'}
          id={panel.slug}
          key={panel.slug}
        >
          <div className="split split--copy-wide">
            <div>
              <p className="overline">{panel.title}</p>
              <h2 className="h2 mt-4">{panel.body}</h2>
            </div>
            <div>
              <p className="body">They can help with:</p>
              <div className="mt-5">
                <CheckList items={panel.items} />
              </div>
              <div className="mt-8">
                <Link className="btn btn--primary" href="/contact">
                  {panel.cta}
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="plain">
        <SectionHeading
          overline="Ready when you are"
          title="Book a session"
        />
        <Reveal className="expert-price mt-12">
          <ExpertPriceCard showViewAll={false} />
        </Reveal>
      </Section>
    </>
  );
}
