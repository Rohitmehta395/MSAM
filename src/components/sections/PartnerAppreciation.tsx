import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaImage } from '@/components/media/MediaImage';
import { partnerAppreciationContent, type PartnerAppreciationContent } from '@/content/community';

export interface PartnerAppreciationProps {
  /** Optional content override */
  content?: Partial<PartnerAppreciationContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Community Partners Page — Phase 7.4, Section C: Partner Appreciation.
 * Grounded in Figma frame:
 * `design-reference/Community Page/3-Partners/3-Appreciation - updated.png` (1440 × 726 px).
 *
 * Specifications:
 * - Tone: White surface (`tone="white"`).
 * - Two-column responsive desktop layout (image on left, content on right).
 * - Left column:
 *   - Community group photograph with generous rounded corners (`rounded-card`) and soft shadow (`shadow-card`).
 *   - Floating warm-toned card overlapping the image with Heart icon and quote:
 *     "Volunteers are the heartbeat of our ministry."
 * - Right column:
 *   - "WITH GRATITUDE" gold-accented eyebrow.
 *   - Large serif section heading: "Many gifts. One shared purpose."
 *   - Warm, inspiring supporting paragraph about how individuals, businesses, and churches sustain this 100% donor-funded ministry.
 */
export function PartnerAppreciation({
  content: contentOverride,
  className,
}: PartnerAppreciationProps) {
  const content = {
    ...partnerAppreciationContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, floatingCard, imageKey } = content;

  return (
    <Section bleed tone="white" spacing="none" className={cn('py-14 sm:py-20 lg:py-24', className)}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Column: Community Group Photo with Overlapping Floating Card */}
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
