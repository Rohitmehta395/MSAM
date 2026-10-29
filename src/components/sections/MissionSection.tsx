import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';
import { MediaImage } from '@/components/media/MediaImage';
import { homeMissionContent, type HomeMissionContent } from '@/content/home';

export interface MissionSectionProps {
  /** Optional content override */
  content?: Partial<HomeMissionContent>;
  /** Optional custom section class name */
  className?: string;
}

/**
 * Home page Mission & Legacy section.
 *
 * Grounded in revised design reference:
 * `design-reference/Home Page/Mission and origin - updated.png`
 *
 * Layout:
 * - Left column: Asymmetrical photographic collage:
 *   - Large portrait image on left (hands joined in unity, `home.mission.primary`).
 *   - Stacked secondary column on right:
 *     - Top: Supporting community embrace image (`home.mission.secondary`).
 *     - Bottom: Pale lavender legacy card (`bg-[#f2edfa]`) celebrating over 35 years of service.
 * - Right column: "OUR MISSION" eyebrow with gold dash, bold navy serif headline
 *   ("Feeding the body. Nourishing the soul."), two contextual paragraphs,
 *   and "Learn more about our mission →" pathway link leading to `/mission`.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas">` with `<Container className="max-w-[1440px]">`
 *   to match horizontal alignment across the homepage.
 */
export function MissionSection({ content, className }: MissionSectionProps) {
  const { eyebrow, headline, paragraphs, action, legacyCard, originTile } = {
    ...homeMissionContent,
    ...content,
  };

  const card = legacyCard || {
    eyebrow: originTile?.eyebrow || 'OUR LEGACY',
    headline: 'More than 35 years',
    supportingText: originTile?.statement || 'of Christ-centered service to our neighbors.',
  };

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Asymmetrical Photographic Collage + Pale Lavender Legacy Card */}
          <div className="w-full lg:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:h-[490px] sm:grid-cols-[1.6fr_1fr] sm:items-stretch lg:h-[530px] xl:grid-cols-[380px_200px]">
              {/* Primary Tall Feature Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-sm sm:aspect-auto sm:h-full sm:rounded-[28px]">
                <MediaImage
                  assetKey="home.mission.primary"
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 32vw, 100vw"
                  fillContainer
                  rounded="none"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Secondary Column: Upper Support Image + Lower Pale Lavender Legacy Card */}
              <div className="flex flex-col gap-4 sm:h-full">
                {/* Secondary Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-sm sm:aspect-auto sm:flex-1 sm:rounded-[28px]">
                  <MediaImage
                    assetKey="home.mission.secondary"
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 18vw, 50vw"
                    fillContainer
                    rounded="none"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Pale Lavender Legacy Card */}
                <div className="flex shrink-0 flex-col justify-between rounded-[24px] border border-[#e2d9f3]/70 bg-[#f2edfa] p-5.5 shadow-sm sm:rounded-[28px] sm:p-6">
                  <span className="text-navy text-[11px] font-bold tracking-wider uppercase sm:text-xs">
                    {card.eyebrow}
                  </span>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-navy font-serif text-2xl leading-[1.08] font-bold sm:text-3xl lg:text-[32px]">
                      {card.headline}
                    </p>
                    <p className="text-navy/70 mt-2 text-xs leading-snug sm:text-sm">
                      {card.supportingText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Copy & Pathway Link */}
          <div className="flex flex-col items-start justify-center lg:col-span-6 lg:pl-4 xl:pl-8">
            {/* Eyebrow */}
            <Eyebrow className="mb-3 sm:mb-4">{eyebrow}</Eyebrow>

            {/* Section Headline */}
            <h2 className="text-navy max-w-xl font-serif text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-4xl lg:text-[46px] xl:text-[50px]">
              {headline}
            </h2>

            {/* Mission Statement Paragraphs */}
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed sm:text-lg">
              {paragraphs.map((para, index) => (
                <p key={index} className={cn(index === 0 ? 'text-slate-800' : 'text-slate-600')}>
                  {para}
                </p>
              ))}
            </div>

            {/* Action Pathway Link */}
            <div className="mt-8">
              <TextLink
                href={action.href}
                className="text-navy hover:text-navy/80 text-base font-semibold sm:text-lg"
              >
                {action.label}
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
