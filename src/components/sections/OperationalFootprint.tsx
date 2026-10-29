import React from 'react';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { TextLink } from '@/components/ui/TextLink';
import { MediaImage } from '@/components/media/MediaImage';
import {
  homeOperationalFootprintContent,
  type HomeOperationalFootprintContent,
} from '@/content/home';

export interface OperationalFootprintProps {
  /** Optional content override */
  content?: Partial<HomeOperationalFootprintContent>;
  /** Optional custom section class name */
  className?: string;
}

/**
 * Home page Operational Footprint section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/5-Operational footprint.png`
 * Layout:
 * 1. Top Two-Column Block:
 *    - Left: Primary operational warehouse photograph (`aspect-[4/3] rounded-card`) with
 *      the floating "Saturday support" mini-timeline card anchored at the bottom-right.
 *    - Right: "BUILT FOR DEPENDABLE ACCESS" eyebrow, section headline, explanatory lead copy,
 *      warm-tinted Lightbulb callout card, and "Learn more about our mission →" link.
 * 2. Bottom Three Feature Cards:
 *    - Cold-safe receiving (Snowflake icon in lavender badge)
 *    - Flexible staging (Boxes icon in lavender badge)
 *    - Neighborhood reach (MapPin icon in lavender badge)
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas" spacing="none">` with a single `<Container className="max-w-[1440px]">`
 *   to align horizontally with the Header, Hero, Mission, Impact, Food Journey, and Footer without nested padding.
 */
export function OperationalFootprint({ content, className }: OperationalFootprintProps) {
  const { eyebrow, headline, lead, callout, action, imageKey, miniTimeline, features } = {
    ...homeOperationalFootprintContent,
    ...content,
  };

  const CalloutIcon = callout.icon;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        {/* Top Two-Column Block */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Primary Operational Image + Floating Mini-Timeline Card */}
          <div className="relative pb-10 sm:pb-12 lg:col-span-6 lg:pb-0">
            {/* Primary Warehouse Photograph */}
            <div className="rounded-card shadow-card border-border/20 relative aspect-[4/3] w-full overflow-hidden border">
              <MediaImage
                assetKey={imageKey}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fillContainer
                rounded="card"
              />
            </div>

            {/* Floating "Saturday support" Mini-Timeline Card */}
            <div className="rounded-card shadow-float border-border/50 absolute right-4 -bottom-4 z-10 w-[240px] border bg-white p-5 sm:right-6 sm:-bottom-6 sm:w-[260px] sm:p-6">
              {/* Card Header: Title + Share/Flow Icon */}
              <div className="flex items-center justify-between">
                <span className="text-navy/70 text-[11px] font-bold tracking-widest uppercase">
                  {miniTimeline.title}
                </span>
                <Share2 className="text-gold h-4 w-4 shrink-0 stroke-[2.2]" />
              </div>

              {/* 3-Step Timeline Dots */}
              <div className="relative mt-4 flex flex-col">
                {/* Connecting Rail Line */}
                <div
                  aria-hidden="true"
                  className="bg-border/80 absolute top-2 bottom-2 left-[5px] w-0.5"
                />

                {miniTimeline.steps.map((step) => (
                  <div key={step.id} className="relative flex items-center gap-3 py-1.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'z-10 h-3 w-3 shrink-0 rounded-full ring-2 ring-white',
                        step.isHighlighted ? 'bg-gold ring-gold/20' : 'bg-lavender-deep',
                      )}
                    />
                    <span
                      className={cn(
                        'text-xs',
                        step.isHighlighted ? 'text-navy font-bold' : 'text-navy/80 font-medium',
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer Note */}
              <p className="border-border/40 text-navy/60 mt-3 border-t pt-3 text-[11px] leading-snug sm:text-xs">
                {miniTimeline.note}
              </p>
            </div>
          </div>

          {/* Right Column: Copy, Callout, & Action */}
          <div className="flex flex-col items-start lg:col-span-6">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              className="text-navy font-sans text-3xl leading-tight font-normal tracking-tight text-balance sm:text-4xl lg:text-[40px]"
            >
              {headline}
            </Heading>
            <p className="text-navy/75 mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>

            {/* Lightbulb Callout Box */}
            <div className="border-gold/30 text-navy mt-6 flex max-w-xl items-center gap-3.5 rounded-2xl border bg-[#FAF3E2] p-4 sm:p-5">
              <CalloutIcon className="text-navy h-5 w-5 shrink-0" />
              <p className="text-navy/90 text-sm leading-snug font-medium sm:text-base">
                {callout.text}
              </p>
            </div>

            {/* Link to Mission */}
            <div className="mt-6 sm:mt-8">
              <TextLink href={action.href} className="text-sm sm:text-base">
                {action.label}
              </TextLink>
            </div>
          </div>
        </div>

        {/* Bottom Three Feature Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3 lg:mt-24 lg:gap-8">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <div
                key={feature.id}
                className="rounded-panel border-border/60 flex items-start gap-4 border bg-white p-6 shadow-xs transition-all duration-200 sm:gap-5 sm:p-8"
              >
                {/* Icon Badge in soft lavender */}
                <div className="bg-lavender text-navy flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs">
                  <FeatureIcon className="h-6 w-6 stroke-[1.75]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-navy text-lg font-bold tracking-tight sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-navy/70 mt-1.5 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
