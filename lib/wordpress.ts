export type Post = {
  id: number | string;
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  readingTime: string;
  /**
   * The post's featured image, when WordPress has one. Absent on the
   * fallback posts and on any post published without one, in which case the
   * index draws the gradient placeholder instead — a row never renders a
   * broken image or a hole where a thumbnail should be.
   */
  image?: string;
  imageAlt?: string;
};

/**
 * Fallback copy shown when WORDPRESS_API_URL is not configured, or when the
 * WordPress instance is unreachable at build time. Matches the posts in the
 * Figma Resources frame so the page never renders empty.
 */
const fallbackPosts: Post[] = [
  {
    id: 'featured',
    slug: 'one-career-decision',
    title:
      'You look at your child and see one career decision. There is more to it than that.',
    excerpt:
      'The stream choice after Class 10 is not one decision but a chain of them — electives, entrance exams, tutorials, degree, college. Here is how the chain actually works.',
    author: 'Lodestar Editorial',
    readingTime: '6 min read',
  },
  {
    id: 2,
    slug: 'which-stream-after-10th',
    title: 'Which stream to choose after 10th: a decision framework',
    excerpt: '',
    author: 'Lodestar Editorial',
    readingTime: '6 min read',
  },
  {
    id: 3,
    slug: 'aptitude-vs-interest',
    title: 'Why aptitude testing matters more than interest alone',
    excerpt: '',
    author: 'Lodestar Editorial',
    readingTime: '6 min read',
  },
  {
    id: 4,
    slug: 'beyond-engineering',
    title: 'Beyond engineering: 250 careers most parents have never heard of',
    excerpt: '',
    author: 'Lodestar Editorial',
    readingTime: '6 min read',
  },
  {
    id: 5,
    slug: 'reading-a-psychometric-report',
    title: 'How to read a psychometric report without over-interpreting it',
    excerpt: '',
    author: 'Lodestar Editorial',
    readingTime: '6 min read',
  },
];

function stripHtml(input: string) {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&hellip;/g, '…')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

type WpMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WpPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    'wp:featuredmedia'?: WpMedia[];
  };
};

/**
 * Prefers a resized derivative over the original upload: a thumbnail slot
 * 112px wide has no use for a 2000px JPEG, and WordPress has already made
 * the smaller ones.
 */
function thumbnailFrom(media: WpMedia | undefined) {
  if (!media) return {};
  const sizes = media.media_details?.sizes;
  const src =
    sizes?.medium_large?.source_url ??
    sizes?.medium?.source_url ??
    sizes?.thumbnail?.source_url ??
    media.source_url;
  return src ? { image: src, imageAlt: media.alt_text || '' } : {};
}

/**
 * Pulls the latest posts from the headless WordPress REST API.
 *
 * WordPress is kept as a CMS only — editors keep the admin they know, while
 * these pages are rendered by Next.js. Revalidates every 10 minutes (ISR);
 * a publish webhook can additionally trigger on-demand revalidation.
 */
export async function getLatestPosts(limit = 5): Promise<Post[]> {
  const base = process.env.WORDPRESS_API_URL;
  if (!base) return fallbackPosts.slice(0, limit);

  try {
    const res = await fetch(
      `${base.replace(/\/$/, '')}/wp-json/wp/v2/posts?per_page=${limit}&_embed=author,wp:featuredmedia`,
      { next: { revalidate: 600, tags: ['wp-posts'] } },
    );
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);

    const posts = (await res.json()) as WpPost[];
    return posts.map((post) => {
      const words = stripHtml(post.content?.rendered ?? post.excerpt.rendered)
        .split(/\s+/)
        .filter(Boolean).length;
      return {
        id: post.id,
        slug: post.slug,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered),
        author: post._embedded?.author?.[0]?.name ?? 'Lodestar Editorial',
        readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
        ...thumbnailFrom(post._embedded?.['wp:featuredmedia']?.[0]),
      };
    });
  } catch (error) {
    console.warn('[wordpress] falling back to static posts:', error);
    return fallbackPosts.slice(0, limit);
  }
}
