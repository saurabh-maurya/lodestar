export const site = {
  name: 'Lodestar',
  domain: 'lodestar.guru',
  tagline:
    "India's first scientific career guidance company, helping students in Grades 8–12 make confident, research-backed career decisions.",
  phone: '+91 89715 20005',
  phoneHref: 'tel:+918971520005',
  email: 'info@lodestar.guru',
  emailHref: 'mailto:info@lodestar.guru',
  /**
   * The test itself still lives in the EduPath product app. This is the clean
   * HTTPS entry point that replaces the old :8443 link with the path typo.
   */
  productAppUrl: 'https://app.lodestar.guru/login',
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  /* "How It Works" used to be its own entry here, pointing at a separate
     page. That page's content — the principle, the method, the outcome —
     now lives inside /programs itself, so a second nav item pointing at the
     same destination would just be Programs under a different name.

     "About Us" was dropped from here too, at your request — it still has a
     page and a footer link, just not a place in the primary nav. */
  { label: 'Programs', href: '/programs' },
  { label: 'Experts', href: '/experts' },
  { label: 'For Schools', href: '/for-schools' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Explore',
    items: [
      { label: 'Home', href: '/' },
      { label: 'For Schools', href: '/for-schools' },
      { label: 'About Us', href: '/about' },
      { label: 'Testimonials', href: '/testimonials' },
      /* Not in the primary nav — the two "Browse Career Experts" / "Talk to
         Students" CTAs on /programs are the main route in. This is so the
         page has at least one link pointing to it from every page on the
         site, rather than being reachable only from wherever those two
         buttons happen to sit. */
      { label: 'Talk to an Expert', href: '/experts' },
    ],
  },
  /**
   * /resources is the journal now — nothing else lives there. These four
   * used to point at cards on that page; they point at the pages that
   * actually hold each thing instead, so no footer link lands on a section
   * that no longer exists.
   */
  {
    title: 'Resources',
    items: [
      { label: 'Journal', href: '/resources' },
      { label: 'FAQs', href: '/programs#faq' },
      { label: 'Sample Report', href: '/programs#outcome' },
      { label: 'Videos', href: '/testimonials#videos' },
      { label: 'Programs', href: '/programs' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Bangalore office', href: '/contact' },
      { label: 'Hyderabad office', href: '/contact' },
      { label: 'Student Login', href: site.productAppUrl },
      { label: 'Careers', href: '/about#careers' },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms & Conditions', href: '/legal/terms-conditions' },
  { label: 'Refund Policy', href: '/legal/refund-policy' },
];

export const offices = [
  {
    id: 'bangalore',
    city: 'Bangalore',
    eyebrow: 'Bangalore · Head office',
    address: 'Jayanagar, Bengaluru, Karnataka',
    phone: '+91 89715 20005',
    alternate: '+91 94824 23888',
    email: 'info@lodestar.guru',
    hours: 'Mon–Sat, 9:30am – 6:30pm IST',
    mapCaption: 'Map · Jayanagar Bengaluru',
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    eyebrow: 'Hyderabad · Regional office',
    address: 'Banjara Hills, Hyderabad, Telangana',
    phone: '+91 89715 20005',
    alternate: '+91 94824 23888',
    email: 'info@lodestar.guru',
    hours: 'Mon–Sat, 9:30am – 6:30pm IST',
    mapCaption: 'Map · Banjara Hills Hyderabad',
  },
] as const;

export const partnerSchools = [
  'GEAR Innovative Intl. School',
  'Deens Academy',
  'National Public School',
  'Ekya Schools',
  'Greenwood High',
  'Inventure Academy',
];
