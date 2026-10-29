import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
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
 * Grounded in Figma frame: `design-reference/Home Page/2-Mission and origin.png`
 * Layout:
 * - Contained 1296px Navy (`bg-navy`) panel on the canvas background with `rounded-panel` corners.
 * - Split header with gold-dash "OUR IMPACT" eyebrow + section headline on the left,
 *   and supporting sentence subordinated on the right.
 * - 4 compact stat cards (`StatCard variant="navy" compact`) with restrained gold metrics,
 *   tight label/caption grouping, and 24px panel radius.
 *
 * Architecture note:
 * - Uses `<Section bleed tone="canvas">` with a single `<Container className="max-w-[1440px]">`
 *   to align horizontally with the site Header, Hero, and Footer without nested padding.
 */
export function ImpactSection({ content, className }: ImpactSectionProps) {
  const { eyebrow, headline, description, stats } = {
    ...homeImpactContent,
    ...content,
  };

  return (
    <Section bleed tone="canvas" spacing="none" className={cn('py-8 sm:py-10 lg:py-12', className)}>
      <Container className="max-w-[1440px]">
        {/* Contained Navy Impact Card */}
        <div className="rounded-panel border-border/10 bg-navy border p-6 text-white shadow-sm sm:p-8 lg:px-10.5 lg:py-11">
          {/* Section Header: Split layout with Eyebrow + Heading on left, supporting sentence on right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow onDark className="mb-2 sm:mb-2.5">
                {eyebrow}
              </Eyebrow>
              <Heading
                as="h2"
                variant="section"
                onDark
                className="max-w-lg tracking-tight text-balance text-white"
              >
                {headline}
              </Heading>
            </div>
            {description && (
              <div className="shrink-0 sm:text-right">
                <p className="max-w-xs text-xs leading-relaxed text-white/70 sm:text-sm">
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Four Compact Stat Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                variant="navy"
                compact
                value={stat.value}
                label={stat.label}
                caption={stat.caption}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
