import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaImage } from '@/components/media/MediaImage';
import {
  volunteerAppreciationContent,
  type VolunteerAppreciationContent,
} from '@/content/community';

export interface VolunteerAppreciationProps {
  /** Optional content override */
  content?: Partial<VolunteerAppreciationContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Volunteers Page — Phase 7.3, Part C: Volunteer Appreciation Section.
 * Grounded in Figma frame:
 * `design-reference/Community Page/2-Volunteers/2-Appreciation - updated.png` (1440 × 726 px).
 *
 * Specifications:
 * - Tone: White surface (`tone="white"`).
 * - Two-column responsive desktop layout (image on left, content on right).
 * - Left column:
 *   - Volunteer group photograph with generous rounded corners (`rounded-card`) and soft shadow (`shadow-card`).
 *   - Floating warm-toned card overlapping the image with Heart icon and quote:
 *     "Volunteers are the lifeblood of Manna Share A Meal."
 * - Right column:
 *   - "WHY SERVE" gold-accented eyebrow.
 *   - Large serif section heading: "Make a difference. Find community."
 *   - Warm, inspiring supporting paragraph about everyday acts of care and community.
 */
export function VolunteerAppreciation({
  content: contentOverride,
  className,
}: VolunteerAppreciationProps) {
  const content = {
    ...volunteerAppreciationContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, floatingCard, imageKey } = content;

  return (
    <Section bleed tone="white" spacing="none" className={cn('py-14 sm:py-20 lg:py-24', className)}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Column: Volunteer Group Photo with Overlapping Floating Card */}
          <div className="relative w-full lg:col-span-6">
            <div className="relative">
              <MediaImage
                assetKey={imageKey}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 100vw"
                rounded="card"
                className="shadow-card w-full"
              />

              {/* Floating Warm-Toned Appreciation Card */}
              <div
                className={cn(
                  'absolute right-3 -bottom-4 sm:-right-4 sm:-bottom-6 lg:-right-6 lg:-bottom-6',
                  'w-[210px] sm:w-[240px] md:w-[260px]',
                  'rounded-2xl border border-[#EAD8A4]/80 bg-[#FBF4DF] p-4 sm:p-5',
                  'shadow-card transition-transform duration-200 hover:scale-[1.02]',
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-gold/20 text-gold flex h-7 w-7 items-center justify-center rounded-full">
                    <Heart className="fill-gold text-gold h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-navy text-xs leading-snug font-semibold sm:text-sm">
                  {floatingCard.text}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Eyebrow, Heading, Supporting Copy */}
          <div className="flex flex-col items-start lg:col-span-6">
            <Eyebrow className="mb-3 tracking-widest uppercase sm:mb-4">{eyebrow}</Eyebrow>

            <Heading
              as="h2"
              variant="section"
              className="text-navy mb-5 font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {heading}
            </Heading>

            <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
