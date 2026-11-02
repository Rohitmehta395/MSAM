import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { missionHeroContent, type MissionHeroContent } from '@/content/mission';

export interface MissionHeroProps {
  /** Optional content override */
  content?: Partial<MissionHeroContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Mission Page — Part 1: Mission Hero & Impact Card.
 * Grounded in Figma frame: `design-reference/Mission Page/Hero.png` (Section 1).
 *
 * Structure:
 * - Full-bleed warm cream canvas background (`tone="cream"` / `#faf7ee`).
 * - Two-column responsive desktop layout (left: mission message, right: compact impact card).
 * - Left column:
 *   - "WHY YOUR GIFT MATTERS" eyebrow with gold accent dash.
 *   - Display headline: "Your gift puts hope on the table."
 *   - Supporting paragraph explaining 100% donor-funded mission.
 *   - Three benefit statements with gold circular markers.
 * - Right column:
 *   - Compact elevated white card with rounded-card borders and soft shadow.
 *   - Top header row with card heading and "LOCAL SERVICE" warm badge.
 *   - Full-width supporting copy wrapping cleanly in 2 lines.
 *   - Three compact warm stat tiles: Families Served (40–60), Annual Groceries ($390k+), Goal (100).
 */
export function MissionHero({ content: contentOverride, className }: MissionHeroProps) {
  const content = {
    ...missionHeroContent,
    ...contentOverride,
  };

  const { eyebrow, headlineLine1, headlineLine2, description, benefits, impactCard } = content;

  return (
    <Section
      bleed
      tone="cream"
      spacing="none"
      className={cn('pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24', className)}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* Left Column: Mission Message & Benefits */}
          <div className="flex flex-col items-start lg:col-span-7">
            <Eyebrow className="mb-4 tracking-widest uppercase sm:mb-5">{eyebrow}</Eyebrow>

            <Heading
              as="h1"
              variant="display"
              className="text-navy font-serif text-4xl leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl lg:text-[52px] xl:text-[60px]"
            >
              {headlineLine1} <br className="hidden sm:inline" />
              {headlineLine2}
            </Heading>

            <p className="text-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>

            {/* Three Benefit Statements with Gold Bullets */}
            <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5" role="list">
              {benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base leading-normal text-slate-700 sm:leading-relaxed"
                >
                  <span className="bg-gold mt-2 h-2 w-2 shrink-0 rounded-full" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Compact Impact Statistics Card */}
          <div className="w-full lg:col-span-5">
            <div className="rounded-card border-border/80 shadow-card border bg-white p-5 sm:p-6 lg:ml-auto lg:max-w-[415px]">
              {/* Card Header Top Row: Title + Local Service Badge */}
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-navy font-sans text-lg font-bold tracking-tight sm:text-xl xl:text-[22px]">
                  {impactCard.heading}
                </h2>
                <span className="bg-warm text-navy shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase">
                  {impactCard.badge}
                </span>
              </div>

              {/* Supporting Copy spanning wider across the card to prevent excessive height */}
              <p className="text-muted mt-2 text-xs leading-relaxed sm:text-[13px] sm:leading-normal">
                {impactCard.description}
              </p>

              {/* Three Compact Metric Tiles */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-2.5">
                {impactCard.stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-warm flex min-h-[90px] flex-col justify-between rounded-xl p-2.5 text-left sm:min-h-[94px] sm:rounded-2xl sm:p-3"
                  >
                    <span className="text-[10px] leading-tight font-bold tracking-wider text-slate-600 uppercase sm:text-[11px]">
                      {stat.label}
                    </span>
                    <span className="text-navy my-0.5 font-sans text-xl font-bold tracking-tight whitespace-nowrap sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="text-[11px] leading-tight text-slate-500 sm:text-xs">
                      {stat.supportingText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
