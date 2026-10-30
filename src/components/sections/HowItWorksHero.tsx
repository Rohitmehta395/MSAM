import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { MediaImage } from '@/components/media/MediaImage';
import { howItWorksHeroContent, type HowItWorksHeroContent } from '@/content/how-it-works';

export interface HowItWorksHeroProps {
  /** Optional content override */
  content?: Partial<HowItWorksHeroContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * How It Works Page Hero section.
 *
 * Grounded in Figma frame: `design-reference/How it works Page/1-Help hero.png` (1440px wide).
 *
 * Layout:
 * - Two-column responsive hero on full-bleed canvas tone.
 * - Left column:
 *   - "GET HELP" eyebrow with gold dash.
 *   - Display headline "Getting Food Is Simple" in bold navy serif.
 *   - Editorial lead paragraph with phone call instructions.
 *   - Two primary/secondary CTA buttons:
 *     - Primary: "Call for an Appointment" (gold pill, links to tel:9544067580).
 *     - Secondary: "Need Prayer" (navy outline pill, smooth scrolls to #prayer).
 *   - Reassurance check line: "No income verification. No paperwork. No judgment."
 * - Right column:
 *   - 3-photo mosaic gallery:
 *     - Large feature portrait image on left (outdoor community harvest table).
 *     - Two stacked landscape images on right (produce sorting top, family cooking bottom).
 *     - Generous panel rounding (`rounded-[28px] sm:rounded-[32px]`).
 */
export function HowItWorksHero({ content, className }: HowItWorksHeroProps) {
  const {
    eyebrow,
    headline,
    lead,
    primaryAction,
    secondaryAction,
    reassurance,
    images: heroImages,
  } = {
    ...howItWorksHeroContent,
    ...content,
  };

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Copy, Actions & Assurance */}
          <div className="flex flex-col items-start justify-center lg:col-span-6 xl:col-span-6">
            {/* Eyebrow */}
            <Eyebrow className="mb-3 sm:mb-4">{eyebrow}</Eyebrow>

            {/* Headline */}
            <h1 className="text-navy font-serif text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-[56px] xl:text-[62px]">
              {headline}
            </h1>

            {/* Editorial Lead */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg lg:text-xl">
              {lead}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <Button
                href={primaryAction.href}
                variant="primary"
                size="md"
                icon="arrow"
                className="w-full justify-center sm:w-auto"
              >
                {primaryAction.label}
              </Button>

              <Button
                href={secondaryAction.href}
                variant="secondary"
                size="md"
                icon="arrow"
                className="w-full justify-center sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            </div>

            {/* Reassurance Line */}
            {reassurance && (
              <div className="mt-8 flex items-center gap-2.5 text-xs font-medium text-slate-600 sm:text-sm">
                <svg
                  className="h-5 w-5 shrink-0 text-emerald-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>{reassurance}</span>
              </div>
            )}
          </div>

          {/* Right Column: 3-Photo Mosaic Gallery */}
          <div className="w-full lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:h-[480px] sm:grid-cols-[1.5fr_1fr] sm:items-stretch lg:h-[520px] xl:h-[550px] xl:grid-cols-[440px_200px]">
              {/* Primary Large Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-sm sm:aspect-auto sm:h-full sm:rounded-[28px] lg:rounded-[32px]">
                <MediaImage
                  assetKey={heroImages.main}
                  sizes="(min-width: 1280px) 440px, (min-width: 1024px) 35vw, 100vw"
                  fillContainer
                  priority
                  rounded="none"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Stacked Secondary Column */}
              <div className="grid grid-cols-2 gap-4 sm:flex sm:h-full sm:flex-col">
                {/* Top Secondary Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-sm sm:aspect-auto sm:flex-1 sm:rounded-[24px]">
                  <MediaImage
                    assetKey={heroImages.top}
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 18vw, 50vw"
                    fillContainer
                    rounded="none"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Bottom Secondary Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-sm sm:aspect-auto sm:flex-1 sm:rounded-[24px]">
                  <MediaImage
                    assetKey={heroImages.bottom}
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 18vw, 50vw"
                    fillContainer
                    rounded="none"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
