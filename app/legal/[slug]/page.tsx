import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui';
import { PageHero } from '@/components/page-hero';
import { site } from '@/lib/site';

const pages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lead: 'How Lodestar collects, uses and protects the information families share with us.',
    sections: [
      {
        heading: 'What we collect',
        body: 'When you request a free assessment, a callback or an institutional consultation, we collect the details you enter on that form — typically name, phone number, email address, city and the student’s current grade. We do not ask for payment details anywhere on this website.',
      },
      {
        heading: 'How we use it',
        body: 'Your details are used to deliver the assessment link, schedule counselling sessions and respond to your enquiry. Institutional enquiries are routed to our partnerships team. We never sell your data to third parties.',
      },
      {
        heading: 'Where it is stored',
        body: 'Lead records are stored in access-controlled systems available only to the Lodestar counselling and partnerships teams. Assessment results are held in the Lodestar product application under the account created for the student.',
      },
      {
        heading: 'Your choices',
        body: `You can ask us to correct or delete your information at any time by writing to ${site.email}. We will action verified requests within thirty days.`,
      },
    ],
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    lead: 'The terms that apply when you use lodestar.guru or enrol in a Lodestar program.',
    sections: [
      {
        heading: 'Use of this site',
        body: 'The content on this website — including career research, program descriptions and sample reports — is provided for the personal use of students and parents evaluating Lodestar’s services. It may not be reproduced or redistributed commercially without written permission.',
      },
      {
        heading: 'Program delivery',
        body: 'Programs are delivered over the number of weeks stated on the Programs page. Group webinars run to a published schedule; one-to-one sessions are scheduled around your availability and confirmed with you in advance.',
      },
      {
        heading: 'Assessment results',
        body: 'Psychometric, aptitude and interest assessments are decision-support tools. They inform a recommendation made by a trained counsellor; they are not a guarantee of admission, examination performance or employment outcomes.',
      },
      {
        heading: 'Changes to these terms',
        body: 'We may update these terms as our programs evolve. The version published on this page is the one in force.',
      },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    lead: 'What happens if a Lodestar program is not right for your family.',
    sections: [
      {
        heading: 'Before the first session',
        body: 'If you cancel before the first one-to-one session takes place, the program fee is refundable in full, less any transaction charges levied by the payment provider.',
      },
      {
        heading: 'After sessions begin',
        body: 'Once counselling sessions have started, refunds are considered on a pro-rata basis against the sessions still outstanding. Written reports already delivered are not refundable.',
      },
      {
        heading: 'Quality guarantee',
        body: 'Feedback is collected after every session. If you are unhappy, corrective action can include additional sessions, further information or a change of counsellor before a refund is considered.',
      },
      {
        heading: 'Raising a request',
        body: `Write to ${site.email} or call ${site.phone}. We acknowledge refund requests within two working days.`,
      },
    ],
  },
} as const;

type Slug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) return {};
  return { title: page.title, description: page.lead };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) notFound();

  return (
    <>
      <PageHero overline="Legal" title={page.title} lead={page.lead} />

      <Section tone="plain">
        <div className="prose">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <p className="mt-12 small">
            Last updated {new Date().getFullYear()}. Questions about this
            policy? Write to{' '}
            <a href={site.emailHref} style={{ textDecoration: 'underline' }}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
