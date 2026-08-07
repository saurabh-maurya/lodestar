import type { Metadata } from 'next';
import {
  Card,
  CardBody,
  CardMedia,
  CardTitle,
  Media,
  Section,
  Stat,
} from '@/components/ui';
import { cardIcon } from '@/components/card-icon-map';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'About Us — who is behind this',
  description:
    "Lodestar was founded in 2011 by education entrepreneurs with 50+ years of combined experience running Manipal Education, MeritTrac and Pearson. Company history and our expert bench, on one page.",
};

const stats = [
  { value: '2011', label: 'Founded' },
  { value: '50+ yrs', label: 'Combined leadership experience' },
  { value: '100+', label: 'Trained expert counsellors' },
  { value: '60,000', label: 'Counselling sessions delivered' },
];

const teams = [
  {
    banner: 'Career specialists',
    icon: 'compass',
    title: 'Career Specialists',
    body: 'Psychometrics & aptitude interpretation',
  },
  {
    banner: 'Research team',
    icon: 'chart',
    title: 'Research Team',
    body: '250+ career guide books, validated by practitioners',
  },
  {
    banner: 'Education analysts',
    title: 'Education Analysts',
    body: 'Colleges, entrance exams, courses and tutorials',
  },
  {
    banner: 'Quality team',
    title: 'Quality Team',
    body: 'Post-session feedback and corrective action',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About Lodestar"
        title="Who is behind this — and can you trust them?"
        mark="can you trust them?"
        lead="The question every parent is actually asking. Company history and our expert bench, on one page instead of three."
      />

      <Section tone="plain">
        <Reveal className="split split--copy-wide">
          <div>
            <h2 className="h2">
              Founded in 2011 by people who had already built India&apos;s
              education infrastructure
            </h2>
            <p className="body mt-6">
              Lodestar is India&apos;s first scientific career guidance program.
              It helps parents and children make a smart career decision using
              accurate data and evolved decision-making tools — exposure to 250+
              career options, expert guidance from trained specialists,
              individual attention for every child, and a complete written
              career plan at the end.
            </p>
            <p className="body mt-5">
              The company was founded by education entrepreneurs and
              professionals with more than 50 years of combined experience
              running large institutions including Manipal Education, MeritTrac
              and Pearson. That background is why the program is built around
              measurement and research rather than intuition.
            </p>
          </div>
          <Media
            caption="Founding team"
            variant="wide"
            src="/images/founders-campus.jpg"
            alt=""
          />
        </Reveal>
      </Section>

      <Section tone="soft" tight>
        <div className="hero__stats" style={{ marginTop: 0 }}>
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} animate />
          ))}
        </div>
      </Section>

      <Section tone="plain" id="careers">
        <p className="overline">Our experts</p>
        <h2 className="h2 mt-4">The people your child actually sits with</h2>
        <p className="body mt-5">
          Every counsellor on the bench has run at least a hundred individual
          sessions and is supported by the Lodestar platform&apos;s current data
          on careers, courses and colleges.
        </p>

        <div className="grid grid--4 mt-12">
          {teams.map((team, i) => (
            <Reveal delay={i * 90} key={team.title}>
              <Card tone="clay">
                <CardMedia caption={team.banner} icon={cardIcon(team.icon)} />
                <CardTitle>{team.title}</CardTitle>
                <CardBody>{team.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
