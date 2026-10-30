import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaImage } from '@/components/media/MediaImage';
import {
  howItWorksWhoWeServeContent,
  type HowItWorksWhoWeServeContent,
} from '@/content/how-it-works';

export interface WhoWeServeProps {
  /** Optional content override */
  content?: Partial<HowItWorksWhoWeServeContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * How It Works Page — Who We Serve section.
 *
 * Grounded in Figma frame: `design-reference/How it works Page/3-Who we serve.png` (1440px wide).
 *
 * Layout:
 * - Two-column responsive split on clean canvas tone (`bg-canvas`).
 * - Left column:
 *   - Photographic feature of diverse community members, seniors, and families sharing a meal.
 *   - Substantial panel rounding (`rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]`) with soft shadow.
 * - Right column:
 *   - "WHO WE SERVE" eyebrow with gold dash.
 *   - Display headline "Who We Serve" in bold navy sans-serif.
 *   - Descriptive paragraph about all neighbors facing food insecurity without income requirements.
 *   - Warm callout container (`bg-warm rounded-[16px] sm:rounded-[20px] p-5 sm:p-6`) pairing a
 *     HeartHandshake icon with reassurance statement:
 *     "No income verification. No paperwork. No judgment. Bring yourself and your family."
 */
export function WhoWeServe({ content, className }: WhoWeServeProps) {
  const { eyebrow, headline, paragraphs, callout, imageKey } = {
    ...howItWorksWhoWeServeContent,
    ...content,
  };

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Feature Image */}
          <div className="w-full lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-sm sm:rounded-[28px] lg:rounded-[32px]">
              <MediaImage
                assetKey={imageKey}
                sizes="(min-width: 1280px) 570px, (min-width: 1024px) 45vw, 100vw"
                fillContainer
                rounded="none"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Copy & Warm Callout */}
          <div className="flex flex-col items-start justify-center lg:col-span-6 lg:pl-4 xl:pl-6">
            {/* Eyebrow */}
            <Eyebrow className="mb-3 sm:mb-4">{eyebrow}</Eyebrow>

            {/* Headline */}
            <h2 className="text-navy text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[44px]">
              {headline}
            </h2>

            {/* Paragraphs */}
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              {paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Warm Reassurance Callout Box */}
            {callout && (
              <div className="border-border/40 bg-warm mt-8 flex w-full items-center gap-3.5 rounded-[16px] border p-5 shadow-xs sm:rounded-[20px] sm:p-6">
                <HeartHandshake className="text-navy h-6 w-6 shrink-0" aria-hidden="true" />
                <p className="text-navy text-sm leading-relaxed font-medium sm:text-base">
                  {callout.text}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
