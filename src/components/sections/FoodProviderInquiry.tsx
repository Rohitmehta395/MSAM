import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { MediaImage } from '@/components/media/MediaImage';
import { foodProviderInquiryContent, type FoodProviderInquiryContent } from '@/content/community';
import { ZeffyFormEmbed } from '@/features/forms';
import { cn } from '@/lib/cn';

export interface FoodProviderInquiryProps {
  /** Optional content override */
  content?: Partial<FoodProviderInquiryContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Food Providers Page — Part 7.2C: Food Provider Inquiry Section.
 * Grounded in Figma frame:
 * `design-reference/Community Page/1-Food Providers/3-Food Provider Form - updated.png` (1440 × 913 px).
 *
 * Specifications:
 * - Tone: Lavender (`#F2EDFA` / `bg-lavender`).
 * - Anchor id: `food-provider-inquiry` with scroll-margin offset for sticky header/subnav.
 * - Two-column responsive desktop layout (items-start):
 *   - Left column (lg:col-span-5):
 *     - "BECOME A PARTNER" gold dash eyebrow.
 *     - Large serif section heading: "We Pick Up The Food".
 *     - Warm supporting paragraph on dignity, nutrition, and community.
 *     - 4:3 warehouse food-prep photo placeholder with generous rounded corners and shadow-card.
 *   - Right column (lg:col-span-7):
 *     - Elevated white inquiry form card with gold divider, 4 fields, consent, navy pill button,
 *       and follow-up reassurance note.
 */
export function FoodProviderInquiry({
  content: contentOverride,
  className,
}: FoodProviderInquiryProps) {
  const content = {
    ...foodProviderInquiryContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, imageKey } = content;

  return (
    <Section
      bleed
      tone="lavender"
      spacing="none"
      id="food-provider-inquiry"
      className={cn(
        'scroll-mt-24 py-14 sm:scroll-mt-28 sm:py-20 lg:scroll-mt-32 lg:py-24',
        className,
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Copy & Warehouse Logistics Photo */}
          <div className="flex flex-col lg:col-span-5">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              variant="section"
              className="text-navy mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {heading}
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              {description}
            </p>

            <MediaImage
              assetKey={imageKey}
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
              rounded="card"
              className="shadow-card w-full"
            />
          </div>

          {/* Right Column: Inquiry Form Card with Zeffy Embed */}
          <div className="lg:col-span-7">
            <div className="rounded-card shadow-card border-border relative w-full border bg-white p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <h3 className="text-navy font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                  {content.cardTitle}
                </h3>
                <p className="text-navy/75 mt-2 text-sm leading-relaxed sm:text-base">
                  {content.cardPrompt}
                </p>
                <div className="bg-gold mt-4 h-1 w-full rounded-full" aria-hidden="true" />
              </div>
              <ZeffyFormEmbed
                formPath="/en-US/embed/newsletter-form/food-provider-inquiry"
                fallbackUrl="https://www.zeffy.com/en-US/embed/newsletter-form/food-provider-inquiry"
                title="Signup form powered by Zeffy"
                minHeight="500px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
