import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  Card,
  CardBody,
  CardEyebrow,
  CardHeader,
  CardIcon,
  CardTitle,
  CardValue,
  CheckList,
  MetaItem,
  Roll,
  Section,
  SectionHeading,
} from '@/components/ui';
import { ArrowRightIcon, ClockIcon, DocumentIcon } from '@/components/icons';
import { cardIcon } from '@/components/card-icon-map';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { ProgramCard } from '@/components/program-card';
import { HowPopout } from '@/components/how-popout';
import {
  assessments,
  faqs,
  methodSteps,
  outcomes,
  principles,
  programLinks,
  programNote,
  programs,
} from '@/lib/content/programs';

export const metadata: Metadata = {
  title: 'Programs — scoped to the decision your child faces now',
  description:
    'Foundation Building, Core Decision and Finalizing Decision — the programs, the method behind them, and the outcome, all on one page.',
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        overline="Our programs"
        title="Built around the decision your child is facing right now"
        mark="the decision"
        lead="A Class 9 student needs awareness. A Class 10 student needs a stream decision. A Class 12 student needs a college shortlist. Each program is scoped to one grade so nothing is padded and nothing is missing."
      />

      <Section tone="plain">
        {/* One "How it works" for the section, top right — the four steps are
            the same whichever program you pick, so four copies of them on
            four cards was the same sentence written four times. */}
        <div className="programs__bar">
          <p className="overline">Choose by grade</p>
          <HowPopout />
        </div>

        <div className="grid grid--4 mt-8">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>

        {/* True of all four programs, so it is stated once here rather than
            as the last line of four curriculums. */}
        <p className="brush-note">
          <mark className="brush">{programNote}</mark>
        </p>
      </Section>

      {/* The tests behind every program. Same card anatomy as the programs
          above — icon and headline on one line, the deciding value right of
          the rule, then what it covers — so the two rows read as one system
          rather than as two designs stacked. */}
      <Section tone="subtle" id="tests">
        <SectionHeading
          overline="What your child actually sits"
          title="Four assessments. None of them revisable."
          lead="Every program runs the same four. They measure how your child thinks and what they are drawn to — not what they memorised last term."
        />

        <div className="grid grid--4 mt-12">
          {assessments.map((test, i) => (
            <Reveal delay={i * 90} key={test.title}>
              <Card tone="clay">
                <CardHeader icon={cardIcon(test.icon)}>
                  <CardEyebrow>{test.eyebrow}</CardEyebrow>
                  <CardTitle as="h3">{test.title}</CardTitle>
                </CardHeader>

                <div className="card__meta card__meta--inline">
                  <MetaItem icon={<ClockIcon />}>{test.format}</MetaItem>
                  <CardValue>{test.duration}</CardValue>
                </div>

                <CheckList items={test.items} />
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The three things a parent asks for before they commit. */}
      <Section tone="plain">
        <SectionHeading
          overline="Before you decide"
          title="See the work before you buy it"
          lead="The report we hand over, the families who have been through it, and a counsellor on the phone — none of it behind a payment."
        />

        <div className="grid grid--3 mt-12">
          {programLinks.map((link) => (
            <Link className="linkcard" href={link.href} key={link.title}>
              <span className="linkcard__icon">{cardIcon(link.icon)}</span>
              <span className="linkcard__title">{link.title}</span>
              <span className="linkcard__body">{link.body}</span>
              <span className="linkcard__cta">
                {link.cta}
                <ArrowRightIcon />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* The principle, the method and the outcome — the whole of what used
          to be the separate /how-it-works page, folded in here in full. A
          parent comparing four cards and a parent reading the method were
          never really two different visits; a second page just put a click
          between the two halves of one decision. */}
      <Section tone="plain">
        <SectionHeading
          overline="The principle"
          title="What actually makes a career path the right one?"
          lead="A child must discover their true career path — not inherit ours. Three things have to be true at once, and most career advice only checks the first."
        />
        <div className="grid grid--3 mt-12">
          {principles.map((p, i) => (
            <Reveal delay={i * 90} key={p.n}>
              <Card tone={p.highlight ? 'navy' : 'clay'}>
                <CardHeader icon={cardIcon(p.icon)}>
                  <CardEyebrow>{p.n}</CardEyebrow>
                  <CardTitle as="h2">{p.title}</CardTitle>
                </CardHeader>
                <CardBody>{p.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="brand" id="method">
        <p className="overline">Our method · The 3Ds</p>
        <h2 className="h2 mt-4">
          Three one-to-one sessions, in this order, every time
        </h2>
        <p className="lead mt-5">
          Refined across 60,000 counselling sessions and delivered by one of
          100+ trained expert counsellors, each of whom has run at least a
          hundred individual sessions.
        </p>

        <div className="mt-12">
          {methodSteps.map((s) => (
            <article className="session-card" key={s.title}>
              <div>
                {/* Same anatomy as every other card: the glyph and the
                    headline on one line, supporting copy beneath. The card
                    itself runs horizontally because the deliverables beside
                    it are the payload. */}
                <div className="card__header">
                  <CardIcon>{cardIcon(s.icon)}</CardIcon>
                  <div className="card__header-copy">
                    <p className="overline">{s.label}</p>
                    <h3 className="h3 mt-1">{s.title}</h3>
                  </div>
                </div>
                <p className="body mt-5">{s.body}</p>
              </div>
              <div className="session-card__rows">
                {s.rows.map((row) => (
                  <p className="arrow-row" key={row}>
                    <ArrowRightIcon />
                    {row}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="tint" id="outcome">
        <SectionHeading
          overline="The outcome"
          title="What you actually walk away with"
          lead="Not advice you have to remember. A document you can act on, revisit and hand to a tutor or a school."
        />
        <div className="grid grid--4 mt-12">
          {outcomes.map((o, i) => (
            <Reveal delay={i * 90} key={o.title}>
              <Card tone="clay">
                <CardHeader icon={cardIcon(o.icon)}>
                  <CardTitle>{o.title}</CardTitle>
                </CardHeader>
                <CardBody>{o.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="subtle" id="faq">
        <div className="programs__bar">
          <div>
            <p className="overline">FAQ</p>
            <h2 className="h2 mt-4">Commonly asked questions</h2>
          </div>
          {/* Same honesty as the sample report: this points at the FAQ
              itself, right below it on this page, until there is a PDF to
              hand over. */}
          <Link className="btn btn--ghost btn--sm btn--auto" href="#faq">
            <Roll>Download the FAQ</Roll>
            <DocumentIcon width={15} height={15} />
          </Link>
        </div>

        <div className="mt-10">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
