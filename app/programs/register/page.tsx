import type { Metadata } from 'next';
import Link from 'next/link';
import { EnrolmentForm } from '@/components/forms';
import { PageHero } from '@/components/page-hero';
import {
  Card,
  CardHeader,
  CardTitle,
  DotList,
  Section,
} from '@/components/ui';
import { ArrowRightIcon, LockIcon } from '@/components/icons';
import { cardIcon } from '@/components/card-icon-map';
import { Curriculum } from '@/components/curriculum';
import {
  findProgram,
  programNote,
  programs,
  rupees,
} from '@/lib/content/programs';

export const metadata: Metadata = {
  title: 'Register — reserve your place on a Lodestar program',
  description:
    'Share your details and confirm the program, grade and amount. We confirm your slot and send a payment link within one working day.',
};

/**
 * The page "Register Now" leads to.
 *
 * Which program is being bought arrives in the query string, so the four
 * cards can all point here without four near-identical pages existing. An
 * unknown or missing slug falls back to the featured program rather than
 * 404ing — the course is a visible field, not a trap.
 */
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program: slug } = await searchParams;
  const program = findProgram(slug);

  return (
    <>
      {/* The hero is deliberately short here. This page has one job — get
          the form filled — and every band of decoration above it is a band
          the parent has to scroll past to start. */}
      <PageHero
        overline={
          <span className="flex items-center gap-2">
            <LockIcon />
            Secure · HTTPS · no card details on this page
          </span>
        }
        title={`Reserve your place on ${program.title}`}
        mark={program.title}
        lead="Nothing is charged on this screen — we confirm your slot first."
        tight
      />

      {/* Pulled up under the hero: two bands meeting means two lots of
          padding, and that gap is pure scrolling on a page whose only job is
          the form below it. */}
      <Section tone="plain" className="enrol-band">
        <EnrolmentForm program={program} />
      </Section>

      {/* The same three blocks the cards fan out on hover. They live here in
          full because a hover is not a place information can only exist:
          touch has no hover, and neither does a screen reader driving the
          page by headings. */}
      <Section tone="subtle">
        <p className="overline">What you are enrolling in</p>
        <h2 className="h2 mt-4">{program.title}, in full</h2>

        <div className="grid grid--3 mt-10">
          <Card tone="plain">
            <CardHeader icon={cardIcon('target')}>
              <CardTitle as="h3">Outcome</CardTitle>
            </CardHeader>
            <DotList items={program.detail.outcome} />
          </Card>

          <Card tone="plain">
            <CardHeader icon={cardIcon('checklist')}>
              <CardTitle as="h3">Program details</CardTitle>
            </CardHeader>
            <Curriculum
              modules={program.detail.modules}
              idPrefix={`${program.slug}-page`}
            />
          </Card>

          {/* The card's "How it works" trigger links straight here. */}
          <Card tone="plain" id="how">
            <CardHeader icon={cardIcon('route')}>
              <CardTitle as="h3">How this works</CardTitle>
            </CardHeader>
            <DotList items={program.detail.how} />
          </Card>
        </div>

        <p className="brush-note">
          <mark className="brush">{programNote}</mark>
        </p>
      </Section>

      <Section tone="plain">
        <p className="overline">Other programs</p>
        <h2 className="h2 mt-4">Enrolling for a different grade?</h2>
        <p className="body mt-5 measure">
          Each program is scoped to one grade. Switching here changes the
          course and the amount on the form above.
        </p>

        <div className="grid grid--4 mt-10">
          {programs.map((p) => {
            const current = p.slug === program.slug;
            return (
              <Link
                key={p.slug}
                href={`/programs/register?program=${p.slug}`}
                className="switch-card"
                aria-current={current ? 'true' : undefined}
              >
                <span className="switch-card__grade">{p.gradeLabel}</span>
                <span className="switch-card__title">{p.title}</span>
                <span className="switch-card__foot">
                  <span className="switch-card__price">
                    {rupees(p.amount)}
                  </span>
                  {current ? (
                    <span className="switch-card__current">Selected</span>
                  ) : (
                    <ArrowRightIcon />
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
