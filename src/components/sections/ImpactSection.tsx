import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { StatCard } from '@/components/ui/StatCard';
import { homeImpactContent, type HomeImpactContent } from '@/content/home';

export interface ImpactSectionProps {
  /** Optional content override */
  content?: Partial<HomeImpactContent>;
  /** Optional custom section class name */
  className?: string;
}

/**
 * Home page Navy Impact Panel.
 *
 * Grounded in revised design reference:
 * `design-reference/Home Page/Mission and origin - updated.png`
 *
 * Layout:
 * - Contained 1296px Navy (`bg-navy`) panel on the canvas background with rounded-[32px]/[40px] corners.
 * - Split header with gold-dash "OUR IMPACT" eyebrow + bold white headline on the left,
 *   and right-aligned supporting sentences ("Serving Broward County for over 35 years...").
 * - Four metric cards (`StatCard variant="navy" compact`) with vibrant gold metrics,
 *   crisp white descriptions, and subdued captions.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas">` with `<Container className="max-w-[1440px]">`
 *   to align horizontally with the site Header, Hero, and Footer without nested padding.
 */
export function ImpactSection({ content, className }: ImpactSectionProps) {
  const { eyebrow, headline, description, stats } = {
    ...homeImpactContent,
    ...content,
  };

  return (
    <Section bleed tone="canvas" spacing="none" className={cn('py-8 sm:py-12 lg:py-16', className)}>
      <Container className="max-w-[1440px]">
        {/* Contained Navy Impact Card */}
        <div className="bg-navy rounded-[28px] border border-white/10 p-6 text-white shadow-xl sm:rounded-[36px] sm:p-8 lg:rounded-[40px] lg:p-9 xl:p-14">
          {/* Section Header: Split layout with Eyebrow + Heading on left, supporting sentence on right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow onDark className="mb-2.5 sm:mb-3">
                {eyebrow}
              </Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[36px] lg:leading-tight">
                {headline}
              </h2>
            </div>
            {description && (
              <div className="shrink-0 sm:text-right">
                <p className="max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
                  {description.includes('Current impact') ? (
                    <>
                      Serving Broward County for over 35 years.
                      <br className="hidden sm:inline" /> Current impact and our next goal, at a
                      glance.
                    </>
                  ) : (
                    description
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Four Compact Stat Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-4.5 lg:mt-12 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                variant="navy"
                compact
                value={stat.value}
                label={stat.label}
                caption={stat.caption}
                className="min-h-[175px] rounded-[20px] border border-white/12 bg-white/[0.06] p-5 sm:min-h-[190px] sm:p-6 xl:p-7"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
