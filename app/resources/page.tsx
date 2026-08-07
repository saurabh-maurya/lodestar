import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog-index';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/ui';
import { getLatestPosts } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Career guidance journal — longer reads for parents',
  description:
    'Longer reads on streams, entrance exams and the decisions families face after Class 10. Search the Lodestar career guidance journal.',
};

// Blog content comes from headless WordPress; re-fetch every 10 minutes.
export const revalidate = 600;

export default async function ResourcesPage() {
  // More than the old five: this is the archive now, not a teaser row.
  const posts = await getLatestPosts(12);

  return (
    <>
      <PageHero
        overline="Journal"
        title="Longer reads on the decisions families face after Class 10"
        mark="the decisions families face"
        lead="Streams, entrance exams, psychometrics and college shortlists — written for parents making the call, not for search engines."
      />

      <Section tone="plain">
        <BlogIndex posts={posts} />
      </Section>
    </>
  );
}
