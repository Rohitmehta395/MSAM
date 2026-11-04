import React from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { TimelineSteps } from '@/components/ui/TimelineSteps';
import { homeFoodJourneyContent, type HomeFoodJourneyContent } from '@/content/home';

export interface FoodJourneySectionProps {
  /** Optional content override */
  content?: Partial<HomeFoodJourneyContent>;
  /** Optional custom section class name */
  className?: string;
}

/**
 * Home page Food Journey section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/3-Food journey.png`
 * Layout:
 * - Full-bleed lavender background band (`bg-lavender`) with single shared Container.
 * - Section header with "OUR PURPOSE" eyebrow, display headline, lead paragraph,
 *   and "THE PATH CONTINUES" downward continuation cue on the right.
 * - Reusable 3-step vertical timeline (`TimelineSteps`) with gold numbered nodes ('01'-'03'),
 *   continuous vertical line, step photography, category badges, headings, and check lines.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="lavender" spacing="none">` with a single
 *   `<Container className="max-w-[1440px]">` to maintain horizontal alignment
 *   with the Header, Hero, Mission, Impact, and Footer without nested padding.
 */
export function FoodJourneySection({ content, className }: FoodJourneySectionProps) {
  const { eyebrow, headline, lead, pathCue, steps } = {
    ...homeFoodJourneyContent,
    ...content,
  };

  return (
    <Section
      bleed
      tone="lavender"
      spacing="none"
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        {/* Section Header: Left details + Right "The path continues" cue */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              className="text-navy font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {headline}
            </Heading>
            {lead && (
              <p className="text-navy/75 mt-3 max-w-xl text-base leading-relaxed sm:text-lg">
                {lead}
              </p>
            )}
          </div>

          {/* Continuation Cue */}
          <div className="text-navy/60 flex items-center gap-2 self-start sm:flex-col sm:items-center sm:gap-1 sm:self-auto lg:self-end lg:pb-1">
            <span className="text-[11px] font-bold tracking-widest uppercase">{pathCue.label}</span>
            <ArrowDown aria-hidden="true" className="text-navy/60 h-4 w-4 shrink-0" />
          </div>
        </div>

        {/* Vertical Timeline */}
        <TimelineSteps steps={steps} className="mt-12 sm:mt-16 lg:mt-20" />
      </Container>
    </Section>
  );
}
