import React from 'react';
import { Handshake } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { partnerRosterContent, type PartnerRosterContent } from '@/content/community';
import { cn } from '@/lib/cn';

export interface PartnerRosterProps {
  /** Optional content override */
  content?: Partial<PartnerRosterContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Community Partners Page — Phase 7.4, Section B: Partner Logo Roster.
 * Grounded in Figma frame:
 * `design-reference/Community Page/3-Partners/2-Partner roster - updated.png` (1440 × 401 px).
 *
 * Specifications:
 * - Section Eyebrow: `SERVING TOGETHER` (gold uppercase tracking)
 * - Section Heading: `Our community partners` (Fraunces serif)
 * - Right-aligned decorative gold Handshake icon
 * - Five clean, empty placeholder boxes on warm gold/cream surfaces (`#FAF3E0`), ready for authentic partner logos later.
 * - At 1440px and 1024px desktop: all five partner boxes are completely visible in a single row with
 *   identical dimensions and consistent spacing within the content container.
 * - On tablet and mobile (768px and 375px): provides a smooth, contained horizontal scroll track.
 */
export function PartnerRoster({ content: contentOverride, className }: PartnerRosterProps) {
  const content = {
    ...partnerRosterContent,
    ...contentOverride,
  };

  const { eyebrow, heading, slots } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('overflow-x-clip pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24', className)}
    >
      <Container>
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 pb-2 sm:pb-3">
          <div>
            <Eyebrow className="mb-3 tracking-widest uppercase sm:mb-4">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              className="text-navy font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-[34px]"
            >
              {heading}
            </Heading>
          </div>

          {/* Right-aligned decorative gold Handshake emblem */}
          <div className="hidden shrink-0 items-center pb-1 sm:flex" aria-hidden="true">
            <Handshake className="text-gold h-9 w-9 stroke-[1.75]" />
          </div>
        </div>

        {/* Five Clean Empty Partner Placeholder Boxes */}
        <div className="mt-8 sm:mt-10 lg:mt-14">
          <div
            role="region"
            aria-label="Community Partners Roster"
            tabIndex={0}
            className={cn(
              'flex items-center gap-4 sm:gap-5 lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-6',
              'overflow-x-auto pt-1 pb-4 lg:overflow-visible lg:pb-0',
              '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
              'focus-visible:ring-gold snap-x snap-mandatory focus:outline-none focus-visible:ring-2',
            )}
          >
            {slots.map((slot) => (
              <div
                key={slot.id}
                role="presentation"
                data-slot-id={slot.id}
                className={cn(
                  'relative flex h-24 w-[180px] shrink-0 snap-start items-center justify-center sm:h-28 sm:w-[200px]',
                  'rounded-2xl border border-[#D9B75F]/35 bg-[#FAF3E0] shadow-xs select-none',
                  'lg:h-28 lg:w-full',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
