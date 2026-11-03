import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { MediaImage } from '@/components/media/MediaImage';
import { partnerFormContent, type PartnerFormContent } from '@/content/community';
import { PartnerInquiryForm } from '@/features/forms';
import { cn } from '@/lib/cn';

export interface PartnerFormSectionProps {
  /** Optional content override */
  content?: Partial<PartnerFormContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Community Partners Page — Phase 7.4, Section D: Partner Form Section.
 * Grounded in Figma frame:
 * `design-reference/Community Page/3-Partners/4-Partner form section - updated.png` (1440 × 1036 px).
 *
 * Specifications:
 * - Tone: Lavender (`#F2EDFA` / `bg-lavender`).
 * - Anchor id: `partner-form` with scroll-margin offset for sticky header/subnav.
 * - Two-column responsive desktop layout (items-start):
 *   - Left column (lg:col-span-7):
 *     - Elevated white partner inquiry form card (`PartnerInquiryForm`).
 *   - Right column (lg:col-span-5):
 *     - "PARTNER WITH US" gold dash eyebrow.
 *     - Large serif section heading: "Put compassion into action."
 *     - Warm supporting paragraph on bringing churches, businesses, and organizations into the mission.
 *     - 4:3 warehouse food logistics photo with generous rounded corners and shadow-card.
 */
export function PartnerFormSection({
  content: contentOverride,
  className,
}: PartnerFormSectionProps) {
  const content = {
    ...partnerFormContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, imageKey } = content;

  return (
    <Section
      bleed
      tone="lavender"
      spacing="none"
      id="partner-form"
      className={cn(
        'scroll-mt-24 py-14 sm:scroll-mt-28 sm:py-20 lg:scroll-mt-32 lg:py-24',
        className,
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <PartnerInquiryForm content={content} />
          </div>

          {/* Right Column: Heading, Copy & Warehouse Logistics Photo */}
          <div className="flex flex-col lg:col-span-5">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              variant="section"
              className="text-navy mb-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
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
        </div>
      </Container>
    </Section>
  );
}
