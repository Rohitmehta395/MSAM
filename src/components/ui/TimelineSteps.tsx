import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { MediaImage } from '@/components/media/MediaImage';
import type { FoodJourneyStep } from '@/content/home';

export interface TimelineStepsProps {
  /** Array of timeline steps */
  steps: FoodJourneyStep[];
  /** Optional custom class name */
  className?: string;
}

/**
 * Reusable vertical timeline component for process workflows.
 *
 * Grounded in Figma frame: `design-reference/Home Page/3-Food journey.png`
 * Displays:
 * - A left rail with gold connecting lines and numbered circular nodes ('01', '02', etc.)
 * - Supporting imagery using MediaImage with `rounded-panel`
 * - Category badge with icon and tracking-widest uppercase label
 * - Step heading, descriptive copy, and green checkmark assurance line
 *
 * Responsive behavior:
 * - Stacks cleanly on mobile without horizontal overflow
 * - Expands into a balanced rail-image-content layout on tablet and desktop
 */
export function TimelineSteps({ steps, className }: TimelineStepsProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const CategoryIcon = step.categoryIcon;

          return (
            <div
              key={step.id}
              className="relative flex gap-4 pb-12 last:pb-0 sm:gap-8 sm:pb-16 lg:gap-10 lg:pb-20"
            >
              {/* Left Rail: Gold Node + Vertical Connecting Line */}
              <div className="flex shrink-0 flex-col items-center">
                <div
                  aria-label={`Step ${step.stepNumber}`}
                  className="bg-gold text-navy ring-lavender flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs ring-4 sm:h-12 sm:w-12 sm:text-sm lg:h-13 lg:w-13 lg:text-base"
                >
                  {step.stepNumber}
                </div>

                {/* Connecting Gold Line */}
                {!isLast ? (
                  <div aria-hidden="true" className="bg-gold/60 mt-3 w-0.5 flex-1" />
                ) : (
                  <div aria-hidden="true" className="bg-gold/60 mt-3 h-8 w-0.5" />
                )}
              </div>

              {/* Step Content: Image + Text Information */}
              <div className="grid min-w-0 flex-1 grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
                {/* Step Image */}
                <div className="rounded-panel shadow-card border-border/20 relative aspect-[4/3] w-full overflow-hidden border lg:col-span-5 xl:col-span-4">
                  <MediaImage
                    assetKey={step.imageKey}
                    sizes="(min-width: 1280px) 420px, (min-width: 1024px) 380px, 100vw"
                    fillContainer
                    rounded="panel"
                  />
                </div>

                {/* Step Text Details */}
                <div className="flex min-w-0 flex-1 flex-col gap-2.5 pt-1 lg:col-span-7 xl:col-span-8">
                  {/* Category Badge */}
                  <div className="text-navy/70 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                    <span
                      aria-hidden="true"
                      className="bg-navy/5 text-navy flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-7 sm:w-7"
                    >
                      <CategoryIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                    <span>{step.category}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-navy text-base font-bold tracking-tight text-balance sm:text-xl lg:text-2xl">
                    {step.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-navy/75 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {step.description}
                  </p>

                  {/* Check Line / Reassurance */}
                  <div className="text-navy/90 mt-1 flex items-center gap-2 text-xs font-medium sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{step.checkText}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
