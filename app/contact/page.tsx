import type { Metadata } from 'next';
import { CallbackForm } from '@/components/forms';
import { OfficeSelector } from '@/components/office-selector';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact — pick your city and we will call you back',
  description:
    'Bangalore and Hyderabad offices, phone numbers, email and counsellor availability — plus a callback request, usually answered the same working day.',
};

/**
 * Contact used to be two sections at the bottom of the programs page, which
 * meant the one thing a hesitant parent is looking for was buried under four
 * price cards. It is a page in the nav now.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Talk to us"
        title="Pick your city. We'll show you the right team."
        mark="the right team"
        lead="Choose a city and only that office, its phone numbers and its counsellor availability appear — or leave your number and we will call you back, usually the same working day."
        tight
      />

      <Section tone="plain" id="contact">
        <div className="split split--form">
          <OfficeSelector />
          <CallbackForm />
        </div>
      </Section>
    </>
  );
}
