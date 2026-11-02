import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { waysToHelpHeroContent, type WaysToHelpHeroContent } from '@/content/ways-to-help';

export interface WaysToHelpHeroProps {
  /** Optional content override */
  content?: Partial<WaysToHelpHeroContent>;
  /** Optional custom class name */
  className?: string;
}

// Backwards-compatible alias
export type MissionHeroProps = WaysToHelpHeroProps;

/**
 * Ways to Help / Donate Page Hero section: "Give, Serve, Share".
 *
 * Grounded in Figma frame: `design-reference/Donations Page/1-Hero.png` (1440 × 627 px).
 *
 * Visual hierarchy:
 * - Full-bleed canvas background (`tone="canvas"` / `#fcfbfd`).
 * - Centered hero composition with generous vertical whitespace.
 * - Circular pale-gold icon badge with navy sparkle icon and bold navy text.
 * - Bold serif H1 headline wrapping across two lines at desktop: "Give, Serve," / "Share".
 * - Centered muted slate-blue paragraph text.
 */
export function WaysToHelpHero({ content: contentOverride, className }: WaysToHelpHeroProps) {
  const content = {
    ...waysToHelpHeroContent,
    ...contentOverride,
  };

  const { eyebrow, headlineLine1, headlineLine2, description } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('pt-12 pb-20 sm:pt-14 sm:pb-24 lg:pt-[68px] lg:pb-[134px]', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow / Trust Badge */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3">
            <span
              className="bg-warm text-navy flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-2xs"
              aria-hidden="true"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-navy text-xs font-bold tracking-tight sm:text-sm">{eyebrow}</span>
          </div>

          {/* Main Display Heading */}
          <Heading
            as="h1"
            variant="display"
            className="text-navy mt-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight sm:mt-7 sm:text-5xl lg:text-[64px] lg:leading-[1.08]"
          >
            {headlineLine1} <br className="hidden sm:inline" />
            {headlineLine2}
          </Heading>

          {/* Supporting Paragraph */}
          <p className="text-muted mt-7 max-w-[500px] text-base leading-relaxed sm:mt-8 sm:text-lg sm:leading-[29px] lg:mt-[34px]">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}

// Backwards-compatible export
export const MissionHero = WaysToHelpHero;
