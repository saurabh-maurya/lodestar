import { HeroNote } from '@/components/hero-note';
import { HomeHero } from '@/components/home-hero';
import { ArrowRightIcon } from '@/components/icons';
import { MagneticLink } from '@/components/magnetic-link';
import { Reveal } from '@/components/reveal';
import {
  ArrowLink,
  Button,
  Card,
  CardBody,
  CardEyebrow,
  CardHeader,
  CardMedia,
  CardTitle,
  FeatureList,
  Media,
  Roll,
  Section,
  SectionHeading,
  Stars,
} from '@/components/ui';
import { cardIcon } from '@/components/card-icon-map';
import {
  featuredQuote,
  resourceCards,
  schoolPhases,
  steps,
  whyLodestar,
} from '@/lib/content/home';
import { programs } from '@/lib/content/programs';
import { partnerSchools } from '@/lib/site';
import Link from 'next/link';

/**
 * Three of the four /programs cards, not all four — Foundation Building and
 * Foundation Building PLUS only make sense side by side once the hover
 * detail explains the difference, which this teaser doesn't have room for.
 * One card per grade-stage instead, so the section reads as "wherever your
 * child is, there is a program" rather than a second pricing grid. Grade,
 * title and price still come from lib/content/programs — the one place
 * those numbers are allowed to live — only the icon and the one-line blurb
 * are curated here for this section specifically.
 */
const homeProgramPicks = [
  {
    slug: 'foundation-building-plus',
    icon: 'compass',
    blurb: 'Assessment, webinars and three expert sessions — the complete start.',
  },
  {
    slug: 'core-decision',
    icon: 'target',
    blurb: 'The stream decision, made with data instead of guesswork.',
  },
  {
    slug: 'finalizing-decision',
    icon: 'growth',
    blurb: 'A college shortlist and a concrete plan before board exams.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HeroNote />

      {/* Founder story ------------------------------------------------- */}
      <Section tone="soft" className="watermark-band">
        <Reveal className="split split--copy-wide">
          <div>
            <h2 className="h2">
              Career decisions shouldn&apos;t feel like finding a needle in a
              haystack
            </h2>
            <p className="body mt-6">
              Lodestar was founded by education entrepreneurs with more than 50
              years of combined experience running Manipal Education, MeritTrac
              and Pearson. We replaced guesswork with data: scientific
              assessment, researched career guides validated by industry
              practitioners, and authentic information on 200+ colleges, 100+
              exams and India&apos;s leading tutorials.
            </p>
            <p className="mt-6">
              <ArrowLink href="/programs#method">
                Discover the Lodestar way
              </ArrowLink>
            </p>
          </div>
          <Media
            caption="Founders / campus"
            variant="wide"
            src="/images/founders-campus.jpg"
            alt="Two colleagues reviewing data together in a modern office"
          />
        </Reveal>
        <p className="watermark" aria-hidden="true">
          SINCE 2011
        </p>
      </Section>

      {/* How it works -------------------------------------------------- */}
      <Section tone="plain">
        <SectionHeading
          overline="How it works"
          title="Three sessions. One confident decision."
          lead="The same three-step process, refined across 60,000 counselling sessions and delivered one-to-one by a trained expert."
        />
        <div className="grid grid--3 mt-12">
          {steps.map((step, i) => (
            <Reveal delay={i * 90} key={step.n}>
              <Card tone={i === 1 ? 'navy' : 'clay'}>
                <CardHeader icon={cardIcon(step.icon)}>
                  <CardEyebrow>Step {step.n}</CardEyebrow>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardBody>{step.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Lodestar --------------------------------------------------- */}
      <Section tone="tint">
        <Reveal className="split">
          <Media
            caption="Counselling session in progress"
            variant="tall"
            src="/images/counselling-session.jpg"
            alt="A counsellor and a student in conversation"
          />
          <div>
            <h2 className="h2">Guesswork is expensive. We removed it.</h2>
            <div className="mt-8">
              <FeatureList items={whyLodestar} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Programs --------------------------------------------------------- */}
      <Section tone="subtle">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="overline">Our programs</p>
            <h2 className="h2 mt-4">One program for wherever your child is right now</h2>
          </div>
          <ArrowLink href="/programs">Explore all programs</ArrowLink>
        </div>

        <div className="grid grid--3 mt-12">
          {homeProgramPicks.map((pick, i) => {
            const program = programs.find((p) => p.slug === pick.slug);
            if (!program) return null;
            return (
              <Reveal delay={i * 90} key={pick.slug}>
                <Card tone="clay">
                  <CardHeader icon={cardIcon(pick.icon)}>
                    <CardEyebrow>{program.grade}</CardEyebrow>
                    <CardTitle>{program.title}</CardTitle>
                  </CardHeader>
                  <CardBody>{pick.blurb}</CardBody>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Free assessment CTA -------------------------------------------- */}
      {/* White section, not the navy full-bleed band the frame shows: the
          brand colour is a rare accent site-wide now, carried here by the
          clay panel's puffy shadow rather than a solid fill. */}
      <Section tone="plain" tight>
        <Reveal className="cta-panel">
          <div className="split split--copy-wide" style={{ alignItems: 'center' }}>
            <div>
              <p className="overline">Start here · Free</p>
              <h2 className="h2 mt-4">
                Not sure yet? Start with the free assessment.
              </h2>
              <p className="lead mt-5">
                Fifteen minutes online. Your child answers, you get an instant
                snapshot of their strengths and interest areas — and a clear sense
                of whether the full program is worth it. No payment, no
                obligation.
              </p>
            </div>
            <div className="stack gap-3" style={{ alignItems: 'flex-start' }}>
              <MagneticLink href="/free-assessment" className="btn btn--primary magnetic">
                <Roll>Take the Free Assessment</Roll>
                <ArrowRightIcon />
              </MagneticLink>
              <p className="small">lodestar.guru/free-assessment · secure HTTPS</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* For schools ---------------------------------------------------- */}
      <Section tone="plain">
        <Reveal className="split split--copy-wide">
          <div>
            <p className="overline">For schools &amp; institutions</p>
            <h2 className="h2 mt-4">
              Future-ready schools create future-ready students
            </h2>
          </div>
          <div>
            <p className="body">
              Parents no longer measure schools by marks alone — they ask what
              happens after Class 10, and they expect an answer. The Career
              Leaders Program embeds structured career guidance inside your
              school across Grades 8 to 12.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <Button href="/for-schools" variant="navy">
                Schedule a school consultation
              </Button>
              <ArrowLink href="/for-schools#brochure">
                Download brochure
              </ArrowLink>
            </div>
          </div>
        </Reveal>

        <div className="grid grid--3 mt-12">
          {schoolPhases.map((phase, i) => (
            <Reveal delay={i * 90} key={phase.title}>
              <Card tone="clay">
                <CardHeader icon={cardIcon(phase.icon)}>
                  <CardEyebrow>{phase.pill}</CardEyebrow>
                  <CardTitle>{phase.title}</CardTitle>
                </CardHeader>
                <CardBody>{phase.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="logo-row mt-12">
          {partnerSchools.map((school) => (
            <span key={school}>{school}</span>
          ))}
        </div>
      </Section>

      {/* Parent voices --------------------------------------------------- */}
      <Section tone="subtle" className="watermark-band watermark-band--right">
        <Reveal className="split">
          <Media
            caption="Parent & child at home"
            variant="tall"
            src="/images/parent-child-home.jpg"
            alt="A parent helping their child study at home"
          />
          <div>
            <p className="overline">What parents say</p>
            <h2 className="h2 mt-4">Hear what parents have to say</h2>
            <div className="mt-6">
              <Stars />
            </div>
            <blockquote className="body mt-5" style={{ color: 'var(--fg)' }}>
              {featuredQuote.quote}
            </blockquote>
            <div className="flex items-center gap-4 mt-6">
              <span className="avatar" aria-hidden="true" />
              <span>
                <span style={{ display: 'block', fontWeight: 700 }}>
                  {featuredQuote.name}
                </span>
                <span className="small">{featuredQuote.role}</span>
              </span>
            </div>
            <p className="mt-6">
              <ArrowLink href="/testimonials">Read all parent stories</ArrowLink>
            </p>
          </div>
        </Reveal>
        <p className="watermark" aria-hidden="true">
          PARENT VOICES
        </p>
      </Section>

      {/* Resources ------------------------------------------------------- */}
      <Section tone="plain">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="overline">Resources</p>
            <h2 className="h2 mt-4">Free tools before you commit to anything</h2>
          </div>
          <ArrowLink href="/resources">View all resources</ArrowLink>
        </div>

        <div className="grid grid--4 mt-12">
          {resourceCards.map((card, i) => (
            <Reveal delay={i * 80} key={card.title}>
              <Card tone="clay" link>
                <CardMedia caption={card.tag} icon={cardIcon(card.icon)} />
                <CardTitle href={card.href}>{card.title}</CardTitle>
                <CardBody>{card.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
