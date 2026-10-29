import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { TextLink } from '@/components/ui/TextLink';
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
 * - Section header with "HOW WE SERVE" eyebrow, display headline, lead paragraph,
 *   and "THE PATH CONTINUES" downward continuation cue on the right.
 * - Reusable 4-step vertical timeline (`TimelineSteps`) with gold numbered nodes ('01'-'04'),
 *   continuous vertical line, step photography, category badges, headings, and check lines.
 * - White Summary Card with split header, pathway link ("See how we measure impact →"),
 *   and 4 stat chips connected by arrows (highlighting the 100-family weekly goal).
 *
 * Architecture note:
 * - Uses `<Section bleed tone="lavender" spacing="none">` with a single
 *   `<Container className="max-w-[1440px]">` to maintain horizontal alignment
 *   with the Header, Hero, Mission, Impact, and Footer without nested padding.
 */
export function FoodJourneySection({ content, className }: FoodJourneySectionProps) {
  const { eyebrow, headline, lead, pathCue, steps, summaryCard } = {
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

        {/* 4-Step Vertical Timeline */}
        <TimelineSteps steps={steps} className="mt-12 sm:mt-16 lg:mt-20" />

        {/* White Summary Card */}
        <div className="rounded-panel shadow-card border-border mt-16 border bg-white p-6 sm:mt-20 sm:p-8 lg:mt-24 lg:p-12">
          {/* Card Header: Split layout with heading & lead on left, action link on right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-navy text-2xl font-bold tracking-tight sm:text-3xl">
                {summaryCard.headline}
              </h3>
              <p className="text-navy/70 mt-1.5 text-sm leading-relaxed sm:text-base">
                {summaryCard.lead}
              </p>
            </div>
            <div className="shrink-0 pt-2 sm:pt-0">
              <TextLink href={summaryCard.action.href} className="text-sm">
                {summaryCard.action.label}
              </TextLink>
            </div>
          </div>

          {/* 4 Stat Chips with Arrow Connectors */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:flex lg:items-center lg:gap-3 xl:gap-4">
            {summaryCard.chips.map((chip, index) => {
              const isLast = index === summaryCard.chips.length - 1;

              return (
                <React.Fragment key={chip.id}>
                  {/* Stat Chip Card */}
                  <div
                    className={cn(
                      'rounded-panel flex min-w-0 flex-1 flex-col justify-between p-5 transition-all sm:p-6',
                      chip.isHighlighted
                        ? 'bg-cream border-gold/40 border shadow-xs'
                        : 'bg-warm/40 border-border/40 border',
                    )}
                  >
                    <div className="text-navy text-2xl font-bold tracking-tight sm:text-3xl xl:text-4xl">
                      {chip.value}
                    </div>
                    <div className="text-navy/70 mt-2 text-xs leading-snug sm:text-sm">
                      {chip.label}
                    </div>
                  </div>

                  {/* Arrow Connector between chips (Desktop) */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="hidden shrink-0 items-center justify-center lg:flex"
                    >
                      <ArrowRight className="text-gold h-5 w-5 font-bold" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
