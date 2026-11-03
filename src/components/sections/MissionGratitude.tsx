import React from 'react';
import { Heart, HandHeart, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  missionGratitudeContent,
  type MissionGratitudeContent,
  type MissionGratitudeIcon,
} from '@/content/mission';

export interface MissionGratitudeProps {
  /** Optional content override */
  content?: Partial<MissionGratitudeContent>;
  /** Optional custom class name */
  className?: string;
}

const iconMap: Record<MissionGratitudeIcon, React.ElementType> = {
  Heart,
  HandHeart,
  CircleDollarSign,
};

/**
 * Mission Page — Part 2: Gratitude & Community Impact.
 * Grounded in Figma frame: `design-reference/Mission Page/Hero.png` (Section 2).
 *
 * Structure:
 * - Full-bleed warm cream canvas background (`tone="cream"` / `#faf7ee`).
 * - Section header area:
 *   - Left: "THANK YOU FOR MAKING THE DIFFERENCE" gold-accented eyebrow +
 *     "Every meal shared is more than nourishment." bold sans-serif heading +
 *     warm supporting paragraph.
 *   - Right: "A HEARTFELT THANKS" uppercase tracking-wider label.
 * - Three gratitude cards in a responsive grid:
 *   - Card 1: Heart icon, "A message someone cares"
 *   - Card 2: HandHeart icon, "Gifts strengthen families"
 *   - Card 3: CircleDollarSign icon, "We are grateful"
 *   Each card features a white elevated background, rounded corners, soft shadow,
 *   subtle border, warm-toned icon container (`bg-warm`), and navy heading.
 */
export function MissionGratitude({ content: contentOverride, className }: MissionGratitudeProps) {
  const content = {
    ...missionGratitudeContent,
    ...contentOverride,
  };

  const { eyebrow, headlineLine1, headlineLine2, description, badgeLabel, cards } = content;

  return (
    <Section
      bleed
      tone="cream"
      spacing="none"
      className={cn('pt-0 pb-16 sm:pt-2 sm:pb-20 lg:pt-4 lg:pb-28', className)}
    >
      <Container>
        {/* Section Header: Left text content + Right label */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl">
            <Eyebrow className="mb-4 tracking-widest uppercase sm:mb-5">{eyebrow}</Eyebrow>

            <Heading
              as="h2"
              variant="section"
              className="text-navy font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[1.18]"
            >
              {headlineLine1} <br className="hidden sm:inline" />
              {headlineLine2}
            </Heading>

            <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          </div>

          <div className="shrink-0 self-start pb-1 lg:self-end">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              {badgeLabel}
            </span>
          </div>
        </div>

        {/* Three Gratitude Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon];
            const isLastOnTablet = index === 2;

            return (
              <div
                key={card.id}
                className={cn(
                  'rounded-card border-border/80 shadow-card flex flex-col items-start border bg-white p-7 sm:p-8',
                  isLastOnTablet && 'md:col-span-2 lg:col-span-1',
                )}
              >
                {/* Warm Icon Container */}
                <div className="bg-warm text-navy mb-6 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl">
                  <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                </div>

                {/* Card Title */}
                <h3 className="text-navy font-sans text-xl font-bold tracking-tight sm:text-2xl">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-muted mt-2.5 text-sm leading-relaxed sm:text-base">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
