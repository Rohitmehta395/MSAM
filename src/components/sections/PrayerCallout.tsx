import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { howItWorksPrayerContent, type HowItWorksPrayerContent } from '@/content/how-it-works';

export interface PrayerCalloutProps {
  /** Optional content override */
  content?: Partial<HowItWorksPrayerContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * How It Works Page — Prayer Callout Band.
 *
 * Grounded in Figma frame: `design-reference/How it works Page/5-Prayer callout.png` (1440px wide).
 *
 * Layout:
 * - Full-bleed warm band (`bg-warm` / `#fbf4df`).
 * - Section anchor ID: `prayer` with `scroll-mt-24` to prevent header occlusion.
 * - Horizontal flex layout:
 *   - Left side:
 *     - "NEED PRAYER" eyebrow with gold dash.
 *     - Display headline "Need Prayer" in bold navy sans-serif.
 *     - Direct phone call prompt: "Call for Prayer: (954) 406-7580" with interactive tel link.
 *   - Right side:
 *     - Gold circular decorative badge (`h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-gold`)
 *       containing a navy stroke outline heart (`lucide-react` Heart).
 */
export function PrayerCallout({ content, className }: PrayerCalloutProps) {
  const { eyebrow, headline, phoneLabel } = {
    ...howItWorksPrayerContent,
    ...content,
  };
  const phoneHref = content?.phoneHref ?? siteConfig.phoneHref;
  const phoneNumber = content?.phoneNumber ?? siteConfig.phoneDisplay;

  return (
    <Section
      bleed
      tone="warm"
      spacing="none"
      id="prayer"
      className={cn('scroll-mt-24 py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Left Side: Eyebrow, Heading & Phone Call Prompt */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <Eyebrow className="mb-2 sm:mb-3">{eyebrow}</Eyebrow>

            {/* Headline */}
            <h2 className="text-navy text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[46px]">
              {headline}
            </h2>

            {/* Phone Call Prompt */}
            <p className="mt-3 text-base text-slate-600 sm:mt-4 sm:text-lg">
              {phoneLabel}:{' '}
              <a
                href={phoneHref}
                className="text-navy decoration-navy/40 hover:decoration-navy focus-visible:outline-navy font-medium underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {phoneNumber}
              </a>
            </p>
          </div>

          {/* Right Side: Gold Circular Heart Badge */}
          <div
            className="bg-gold flex h-28 w-28 shrink-0 items-center justify-center rounded-full shadow-sm sm:h-32 sm:w-32 lg:h-36 lg:w-36"
            aria-hidden="true"
          >
            <Heart
              className="text-navy h-12 w-12 stroke-[1.75] sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              fill="none"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
