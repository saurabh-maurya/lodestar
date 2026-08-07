/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Retired campaign pages consolidate onto the single conversion URL,
    // per the Website Restructure & Fix Plan v4.
    return [
      { source: '/campaign.html', destination: '/free-assessment', permanent: true },
      { source: '/campaign', destination: '/free-assessment', permanent: true },
      { source: '/campaign-apr', destination: '/free-assessment', permanent: true },
      { source: '/happycustomers.html', destination: '/testimonials', permanent: true },
      { source: '/aboutus.html', destination: '/about', permanent: true },
      { source: '/what-we-do.html', destination: '/how-it-works', permanent: true },
      { source: '/lodestar-way.html', destination: '/how-it-works', permanent: true },
      { source: '/career-guidance.html', destination: '/how-it-works', permanent: true },
      { source: '/contact.html', destination: '/programs', permanent: true },
    ];
  },
};

export default nextConfig;
