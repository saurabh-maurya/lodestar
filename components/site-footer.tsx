import Link from 'next/link';
import { footerNav, legalNav, site } from '@/lib/site';
import { ArrowRightIcon, StarIcon } from './icons';
import { Roll } from './ui';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link href="/" className="brand" aria-label={`${site.name} — home`}>
              <StarIcon />
              {site.name.toUpperCase()}
            </Link>
            <p className="footer__about">{site.tagline}</p>
            <p className="footer__contact">
              <a href={site.phoneHref}>{site.phone}</a>
              <span className="footer__sep" aria-hidden="true">
                ·
              </span>
              <a href={site.emailHref}>{site.email}</a>
            </p>
          </div>

          {footerNav.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h2 className="footer__col-title">{col.title}</h2>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('http') ? (
                      <a href={item.href} rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__cta">
            <h2>Start with the free test</h2>
            <p>Fifteen minutes. Instant snapshot. No payment.</p>
            <Link className="btn btn--primary btn--sm btn--auto" href="/free-assessment">
              <Roll>Free Assessment</Roll>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Lodestar. All Rights Reserved.</p>
          <div className="footer__legal">
            {legalNav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="footer__sep" aria-hidden="true">
                    ·
                  </span>
                )}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
