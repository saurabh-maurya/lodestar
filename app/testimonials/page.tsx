import type { Metadata } from 'next';
import { PlayIcon } from '@/components/icons';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import {
  Card,
  CardBody,
  CardMedia,
  CardTitle,
  QuoteCard,
  Section,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Testimonials — 40,000 parents have been through this decision',
  description:
    'Every parent quote on the site lives here: video stories and written reviews from families who completed the Lodestar career guidance program.',
};

const videos = [
  'We found all the information we needed to plan my child’s career',
  'I discovered wide career options in Arts after the Lodestar program',
  'Lodestar helped us find a world of careers beyond engineering',
];

const reviews = [
  {
    quote:
      'Hats off to Lodestar for the range of career options they laid out on the table for my son. The volume of research they have done into different careers is amazing. I appreciate the skill sets of their team, the follow-up and the team spirit.',
    name: 'Santhosh',
    role: 'Parent · Innisfree House School',
  },
  {
    quote:
      "I'm really happy with the solution offered by Lodestar. With exposure to over 250 careers and a comprehensive career plan from career to college, they have truly enabled us to make a smart career decision for our child.",
    name: 'Anil',
    role: 'Parent · Samved',
  },
  {
    quote:
      'The program provided information in a structured manner. The interaction with the specialist serves as a second opinion for the student, reducing parental pressure and bias.',
    name: 'Narendranath Pai',
    role: 'Parent · Innisfree',
  },
  {
    quote:
      'The program provided a range of options open for my daughter, and helped her decide the way forward. An exceptional program recommended to all students who are yet to firm up their career choices.',
    name: 'Korath Abraham',
    role: 'Parent · Deens Academy',
  },
  {
    quote:
      'The counsellor who guided us throughout the program was very enthusiastic and all our queries were answered without hesitation. I would surely recommend Lodestar to other parents.',
    name: 'Ram Prakash',
    role: 'Parent · Greenwood High',
  },
  {
    quote:
      'Your career guidance program is truly exceptional and very informative. The approach quality and guiding capability of your counsellor is really appreciable, and the data collected by your research team is informative.',
    name: 'Toufiqul',
    role: 'Parent · Al Ameen Residential School',
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        overline="Single source of truth"
        title="40,000 parents have been through this decision with us"
        mark="40,000 parents"
        lead="Every parent quote on the site now lives here. Other pages carry at most one or two relevant lines instead of repeating the same block on five pages."
      />

      <Section tone="plain" id="videos">
        <p className="overline">Video stories · Playing inline</p>
        <h2 className="h2 mt-4">Watch parents describe the decision</h2>

        <div className="grid grid--3 mt-10">
          {videos.map((title, i) => (
            <Reveal delay={i * 90} key={title}>
              <Card tone="clay">
                <CardMedia
                  caption="Video testimonial"
                  icon={<PlayIcon width={11} height={11} />}
                />
                <CardTitle>{title}</CardTitle>
                <CardBody>
                  Plays inline — no jump to an external social platform.
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <p className="overline">In their words</p>
        <h2 className="h2 mt-4">What parents wrote after the program</h2>

        <div className="grid grid--3 mt-10">
          {reviews.map((r, i) => (
            <Reveal delay={i * 70} key={r.name}>
              <QuoteCard
                quote={r.quote}
                name={r.name}
                role={r.role}
                variant="raised"
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
