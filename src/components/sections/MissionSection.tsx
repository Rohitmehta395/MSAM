import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
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
 * Home page Mission & Origin section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/2-Mission and origin.png`
 * Layout:
 * - Left column: Photographic collage pairing a tall primary pantry image,
 *   a secondary produce image, and a lavender "Our origin" statement tile.
 * - Right column: "OUR MISSION" eyebrow, section heading, mission statement copy,
 *   and link leading to `/mission`.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas">` with a single `<Container className="max-w-[1440px]">`
 *   to align horizontally with the site Header, Hero, and Footer without nested padding.
 */
export function MissionSection({ content, className }: MissionSectionProps) {
  const { eyebrow, headline, paragraphs, action, originTile } = {
    ...homeMissionContent,
    ...content,
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
          {/* Left Column: Photographic Collage + Lavender Origin Card */}
          <div className="w-full lg:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:h-[480px] sm:grid-cols-[1.4fr_1fr] sm:items-stretch lg:h-[520px] xl:grid-cols-[400px_220px]">
              {/* Primary Tall Feature Image */}
              <div className="rounded-panel shadow-card relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:h-full">
                <MediaImage
                  assetKey="home.mission.primary"
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, 100vw"
                  fillContainer
                  rounded="panel"
                />
              </div>

              {/* Secondary Column: Upper Produce Image + Lower Lavender Origin Card */}
              <div className="flex flex-col gap-4 sm:h-full">
                {/* Secondary Image */}
                <div className="rounded-panel relative aspect-[4/3] w-full overflow-hidden shadow-sm sm:aspect-auto sm:min-h-[200px] sm:flex-1">
                  <MediaImage
                    assetKey="home.mission.secondary"
                    sizes="(min-width: 1280px) 220px, (min-width: 1024px) 18vw, 50vw"
                    fillContainer
                    rounded="panel"
                  />
                </div>

                {/* Lavender Origin Tile */}
                <div className="rounded-panel border-border/60 bg-lavender flex shrink-0 flex-col justify-between border p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-2 select-none">
                    <span
                      className="bg-gold h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="text-label text-navy tracking-wider">
                      {originTile.eyebrow}
                    </span>
                  </div>
                  <p className="text-navy mt-3 font-serif text-lg leading-snug font-bold lg:text-xl">
                    {originTile.statement}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Copy & Pathway Link */}
          <div className="flex flex-col items-start justify-center lg:col-span-6 lg:pl-2 xl:pl-6">
            {/* Eyebrow */}
            <Eyebrow className="mb-3 sm:mb-4">{eyebrow}</Eyebrow>

            {/* Section Headline */}
            <Heading
              as="h2"
              variant="section"
              className="text-navy max-w-xl tracking-tight text-balance"
            >
              {headline}
            </Heading>

            {/* Mission Statement Paragraphs */}
            <div className="text-muted mt-6 max-w-xl space-y-4 text-base leading-relaxed sm:text-lg">
              {paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Action Pathway Link */}
            <div className="mt-8">
              <TextLink href={action.href}>{action.label}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
