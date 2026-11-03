import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { MediaImage } from '@/components/media/MediaImage';
import { volunteerHeroContent, type VolunteerHeroContent } from '@/content/community';

export interface VolunteerHeroProps {
  /** Optional content override */
  content?: Partial<VolunteerHeroContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Volunteers Page — Phase 7.3, Part B: Volunteer Hero.
 * Grounded in Figma frame:
 * `design-reference/Community Page/2-Volunteers/1-Volunteer hero - updated.png` (1440 × 668 px).
 *
 * Specifications:
 * - Two-column responsive desktop layout (vertically centered).
 * - Left column:
 *   - "SERVE WITH US" gold-accented eyebrow.
 *   - Display serif heading: "Be the hands and feet of Christ."
 *   - Supporting copy: "Volunteers are the lifeblood of Manna Share A Meal: a community of faithful people..."
 *   - Primary CTA: "Serve with Us" gold pill button with arrow linking to `#volunteer-form`.
 * - Right column:
 *   - Landscape photograph of community volunteers serving with generous rounded corners (`rounded-card`)
 *     and soft shadow (`shadow-card`).
 */
export function VolunteerHero({ content: contentOverride, className }: VolunteerHeroProps) {
  const content = {
    ...volunteerHeroContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, cta, imageKey } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24', className)}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Eyebrow, Heading, Description, CTA */}
          <div className="flex flex-col items-start lg:col-span-6">
            <Eyebrow className="mb-4 tracking-widest uppercase sm:mb-5">{eyebrow}</Eyebrow>

            <Heading
              as="h1"
              variant="display"
              className="text-navy font-serif text-4xl leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl lg:text-[54px] xl:text-[60px]"
            >
              {heading}
            </Heading>

            <p className="text-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>

            <div className="mt-8 sm:mt-10">
              <Button variant="primary" size="md" icon="arrow" href={cta.href}>
                {cta.label}
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Volunteer Community Food-Share Image */}
          <div className="w-full lg:col-span-6">
            <MediaImage
              assetKey={imageKey}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              priority
              rounded="card"
              className="shadow-card w-full"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
