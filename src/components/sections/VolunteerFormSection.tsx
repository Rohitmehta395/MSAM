import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { MediaImage } from '@/components/media/MediaImage';
import { volunteerFormContent, type VolunteerFormContent } from '@/content/community';
import { VolunteerInterestForm } from '@/features/forms';
import { cn } from '@/lib/cn';

export interface VolunteerFormSectionProps {
  /** Optional content override */
  content?: Partial<VolunteerFormContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Volunteers Page — Phase 7.3, Part D: Volunteer Interest Form Section.
 * Grounded in Figma frame:
 * `design-reference/Community Page/2-Volunteers/3-Volunteer Form - updated.png` (1440 × 725 px).
 *
 * Specifications:
 * - Tone: Lavender (`#F2EDFA` / `bg-lavender`).
 * - Anchor id: `volunteer-form` with scroll-margin offset for sticky header/subnav.
 * - Two-column responsive desktop layout (items-start):
 *   - Left column (lg:col-span-5):
 *     - "GET STARTED" gold dash eyebrow.
 *     - Large serif section heading: "Bring your heart for service."
 *     - Warm supporting paragraph about finding a role and taking next steps.
 *     - 4:3 warehouse food-prep photo placeholder with generous rounded corners and shadow-card.
 *   - Right column (lg:col-span-7):
 *     - Elevated white volunteer interest form card with gold divider, 5 fields, and dark navy pill button.
 */
export function VolunteerFormSection({
  content: contentOverride,
  className,
}: VolunteerFormSectionProps) {
  const content = {
    ...volunteerFormContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, imageKey } = content;

  return (
    <Section
      bleed
      tone="lavender"
      spacing="none"
      id="volunteer-form"
      className={cn(
        'scroll-mt-24 py-14 sm:scroll-mt-28 sm:py-20 lg:scroll-mt-32 lg:py-24',
        className,
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Copy & Warehouse Food Logistics Photo */}
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

          {/* Right Column: Volunteer Interest Form Card */}
          <div className="lg:col-span-7">
            <VolunteerInterestForm content={content} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
