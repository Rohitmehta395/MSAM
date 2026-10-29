import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { MediaImage } from '@/components/media/MediaImage';
import { homeWaysToHelpContent, type HomeWaysToHelpContent } from '@/content/home';

export interface WaysToHelpProps {
  /** Optional content override */
  content?: Partial<HomeWaysToHelpContent>;
  /** Optional custom section class name */
  className?: string;
}

const toneCardStyles: Record<string, string> = {
  lavender: 'bg-[#F3EFF8] border-border/50',
  warm: 'bg-[#FAF3E2] border-border/50',
  sage: 'bg-[#EEF5F1] border-border/50',
};

/**
 * Home page Ways to Help & Many Hands section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/4-Ways to take part.png`
 * Layout:
 * 1. Centered Section Header: "WAYS TO HELP" eyebrow, "Three ways to help." headline,
 *    and clear editorial lead copy.
 * 2. Three Pathway Cards:
 *    - For Neighbors (Request Food Support) in soft lavender surface
 *    - For Food and Site Partners (Partner with Us) in soft warm surface
 *    - For Funders and Sponsors (Fund the Mission) in soft sage surface
 *    Each card includes a white icon badge, uppercase audience tag, title, description,
 *    feature checklist with green checkmarks, and a dark pill button.
 * 3. "MADE OF MANY HANDS" Mosaic Card:
 *    - Contained navy card with statement headline and description on the left
 *    - Community tag chips (`Neighbors`, `Food donors`, `Site hosts`, `Drivers`, etc.)
 *    - "Learn more about partnership →" white button
 *    - Right-hand photographic mosaic band with 3 coordinated community images.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas" spacing="none">` with a single `<Container className="max-w-[1440px]">`
 *   to align with the Header, Hero, Mission, Impact, Food Journey, and Footer without nested padding.
 */
export function WaysToHelp({ content, className }: WaysToHelpProps) {
  const { eyebrow, headline, lead, pathways, manyHands } = {
    ...homeWaysToHelpContent,
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
        {/* Section Header: Centered */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mb-3 justify-center">{eyebrow}</Eyebrow>
          <Heading
            as="h2"
            className="text-navy font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            {headline}
          </Heading>
          {lead && (
            <Lead className="text-navy/75 mx-auto mt-3 max-w-xl text-base leading-relaxed sm:text-lg">
              {lead}
            </Lead>
          )}
        </div>

        {/* Three Pathway Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 lg:gap-8">
          {pathways.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={cn(
                  'rounded-card flex flex-col justify-between border p-6 shadow-xs transition-all duration-200 sm:p-8',
                  toneCardStyles[card.tone] ?? 'border-border/50 bg-white',
                )}
              >
                <div>
                  {/* Card Header: Icon Badge on left + Audience on right */}
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="text-navy flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs"
                    >
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </span>
                    <span className="text-navy/70 text-xs font-bold tracking-widest uppercase">
                      {card.audience}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-navy mt-6 text-2xl font-bold tracking-tight sm:text-[26px]">
                    {card.title}
                  </h3>
                  <p className="text-navy/70 mt-2 text-sm leading-relaxed sm:text-base">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <CheckList items={card.features} className="mt-6 mb-8" />
                </div>

                {/* Primary Action Button */}
                <Button
                  href={card.action.href}
                  variant="dark"
                  icon="arrow"
                  fullWidth
                  size="md"
                  className="justify-center"
                >
                  {card.action.label}
                </Button>
              </div>
            );
          })}
        </div>

        {/* "MADE OF MANY HANDS" Mosaic Card */}
        <div className="rounded-card bg-navy shadow-card border-border/10 mt-16 overflow-hidden border text-white sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Left Column: Copy, Tag Chips & CTA */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-6 lg:p-12 xl:p-14">
              <div>
                <Eyebrow onDark className="mb-4">
                  {manyHands.eyebrow}
                </Eyebrow>
                <h3 className="font-sans text-2xl leading-snug font-light tracking-tight text-balance text-white sm:text-3xl lg:text-[32px] xl:text-[34px]">
                  {manyHands.headline}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                  {manyHands.description}
                </p>

                {/* Tag Chips */}
                <div
                  className="flex flex-wrap gap-2 pt-6 sm:pt-8"
                  role="list"
                  aria-label="Community partners and contributors"
                >
                  {manyHands.tags.map((tag) => (
                    <span
                      key={tag}
                      role="listitem"
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-8 sm:pt-10">
                <Button href={manyHands.action.href} variant="light" icon="arrow" size="md">
                  {manyHands.action.label}
                </Button>
              </div>
            </div>

            {/* Right Column: Photographic Mosaic */}
            <div className="flex flex-col gap-2 p-2 sm:p-3 lg:col-span-6 lg:gap-2 lg:p-0">
              {/* Top Landscape Feature Image */}
              <div className="lg:rounded-tr-card relative aspect-[16/9] w-full overflow-hidden rounded-xl lg:rounded-none">
                <MediaImage
                  assetKey={manyHands.images.main}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  fillContainer
                />
              </div>

              {/* Bottom Two Images */}
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:rounded-none">
                  <MediaImage
                    assetKey={manyHands.images.hands}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    fillContainer
                  />
                </div>
                <div className="lg:rounded-br-card relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:rounded-none">
                  <MediaImage
                    assetKey={manyHands.images.community}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    fillContainer
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
