import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/media/Logo';
import { siteConfig } from '@/config/site';
import { footerColumns, legalLinks } from '@/content/navigation';
import { NewsletterForm } from '@/features/forms/NewsletterForm';
import { cn } from '@/lib/cn';

const CURRENT_YEAR = 2026;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional custom class name */
  className?: string;
}

/**
 * Global site footer Server Component displaying brand mission, navigation columns,
 * newsletter subscription pathway, and legal compliance links.
 */
export function Footer({ className, ...props }: FooterProps) {
  const waysToHelpColumn = footerColumns[0];
  const aboutColumn = footerColumns[1];

  return (
    <footer
      role="contentinfo"
      className={cn('bg-navy w-full text-white select-none', className)}
      {...props}
    >
      <Container className="max-w-[1440px] pt-16 sm:pt-20">
        {/* Main Four-Column Grid:
            - Mobile (< sm): Single column stack with gap-10.
            - Tablet (sm to lg): 2-column grid with gap-8.
            - Desktop (lg and above): 4 equal columns (300px each at 1440px) with 32px gaps inside the 1296px container.
        */}
        <div className="grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Block */}
          <div className="space-y-6">
            <Link
              href="/"
              aria-label="Manna Share A Meal Home"
              className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Logo variant="footer" className="h-24 w-auto" />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/75">
              {siteConfig.missionStatement}
            </p>

            {/* Social links: Instagram, Facebook, and LinkedIn */}
            <div className="flex items-center gap-3">
              {[
                {
                  name: 'Instagram',
                  url: siteConfig.socials.instagram,
                  Icon: InstagramIcon,
                  ariaLabel: 'Visit Share A Meal on Instagram',
                },
                {
                  name: 'Facebook',
                  url: siteConfig.socials.facebook,
                  Icon: FacebookIcon,
                  ariaLabel: 'Visit Share A Meal on Facebook',
                },
                {
                  name: 'LinkedIn',
                  url: siteConfig.socials.linkedin,
                  Icon: LinkedInIcon,
                  ariaLabel: 'Visit Share A Meal on LinkedIn',
                },
              ].map(({ name, url, Icon, ariaLabel }) => {
                const isValidUrl = Boolean(
                  url && url !== '#' && (url.startsWith('https://') || url.startsWith('http://')),
                );

                if (isValidUrl) {
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                }

                return (
                  <span
                    key={name}
                    aria-label={`${name} profile not yet configured`}
                    className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/50"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                );
              })}
            </div>
          </div>

          {/* Column 2: Ways to Help */}
          {waysToHelpColumn && (
            <div className="col-span-1 space-y-4">
              <h3 className="text-label text-gold font-bold">{waysToHelpColumn.title}</h3>
              <ul role="list" className="space-y-3">
                {waysToHelpColumn.links
                  .filter((link) => !link.hidden)
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[32px] items-center rounded-sm text-sm text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Column 3: About */}
          {aboutColumn && (
            <div className="col-span-1 space-y-4">
              <h3 className="text-label text-gold font-bold">{aboutColumn.title}</h3>
              <ul role="list" className="space-y-3">
                {aboutColumn.links
                  .filter((link) => !link.hidden)
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[32px] items-center rounded-sm text-sm text-white/80 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-label text-gold font-bold">Newsletter</h3>

            <p className="text-sm text-white/75">
              Monthly stories, volunteer opportunities, and practical ways to help.
            </p>

            <NewsletterForm />

            <div className="space-y-1 pt-1 text-sm text-white/70">
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                Community line:{' '}
                <a
                  href={siteConfig.phoneHref}
                  className="rounded-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Legal Row */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center text-xs text-white/60 sm:flex-row sm:text-left sm:text-sm">
          <p>© {CURRENT_YEAR} Manna / Share A Meal. All rights reserved.</p>

          <ul role="list" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
