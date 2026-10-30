import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaImage } from '@/components/media/MediaImage';
import { howItWorksTimelineContent, type HowItWorksTimelineContent } from '@/content/how-it-works';

export interface HowItWorksTimelineProps {
  /** Optional content override */
  content?: Partial<HowItWorksTimelineContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * How It Works Page Three-Step Timeline section.
 *
 * Grounded in Figma frame: `design-reference/How it works Page/2-How it works.png` (1440px wide).
 *
 * Layout:
 * - Full-bleed lavender background band (`bg-lavender`).
 * - Header row: "WHAT WE OFFER" eyebrow with gold dash, sans-serif headline "Getting Food Is Simple".
 * - Left continuous timeline rail:
 *   - Continuous vertical gold connecting line (`w-0.5 bg-gold/60`).
 *   - Gold circular step nodes ('01', '02', '03') positioned at the top of each step.
 * - Three process steps:
 *   - Step 1: Call for an Appointment (3:2 image, title, description).
 *   - Step 2: Come As You Are (3:2 image, title, description).
 *   - Step 3: Leave with More Than Food (3:2 image, title, description).
 * - Step structure: 2-column layout (Step image on left, title & description on right).
 */
export function HowItWorksTimeline({ content, className }: HowItWorksTimelineProps) {
  const { eyebrow, headline, steps } = {
    ...howItWorksTimelineContent,
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
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Eyebrow className="mb-3 sm:mb-4">{eyebrow}</Eyebrow>
          <h2 className="text-navy text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[44px]">
            {headline}
          </h2>
        </div>

        {/* Vertical Timeline Steps */}
        <div className="relative w-full">
          <div className="flex flex-col">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className="relative flex gap-4 pb-12 last:pb-0 sm:gap-8 sm:pb-16 lg:gap-10 lg:pb-20"
                >
                  {/* Left Rail: Numbered Gold Circle + Continuous Vertical Line */}
                  <div className="flex shrink-0 flex-col items-center">
                    <div
                      aria-label={`Step ${step.stepNumber}`}
                      className="bg-gold text-navy flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-xs sm:h-12 sm:w-12 sm:text-base"
                    >
                      {step.stepNumber}
                    </div>

                    {/* Connecting Gold Line */}
                    {!isLast ? (
                      <div aria-hidden="true" className="bg-gold/50 mt-3 w-0.5 flex-1" />
                    ) : (
                      <div aria-hidden="true" className="bg-gold/50 mt-3 h-10 w-0.5" />
                    )}
                  </div>

                  {/* Step Content: Image + Text Details */}
                  <div className="grid min-w-0 flex-1 grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Step Image */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px] shadow-sm sm:rounded-[24px] lg:col-span-5 xl:col-span-4">
                      <MediaImage
                        assetKey={step.imageKey}
                        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 35vw, 100vw"
                        fillContainer
                        rounded="none"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Step Text Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center lg:col-span-7 xl:col-span-8">
                      <h3 className="text-navy text-xl leading-snug font-bold tracking-tight sm:text-2xl lg:text-[28px]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
