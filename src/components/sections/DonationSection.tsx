import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { CheckList } from '@/components/ui/CheckList';
import { TextLink } from '@/components/ui/TextLink';
import { DonationSelector } from '@/features/donation/DonationSelector';
import { homeDonationContent, type HomeDonationContent } from '@/content/home';

export interface DonationSectionProps {
  /** Optional custom content override */
  content?: Partial<HomeDonationContent>;
  /** Optional custom section class name */
  className?: string;
}

/**
 * Home page Donation section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/6-Donation.png`
 * Layout:
 * - Two-column split on navy background (`tone="navy"`).
 * - Left: "GIVE WITH STAYING POWER" gold eyebrow, headline, lead description,
 *   3 gold checklist points, and bottom mission quote with link.
 * - Right: DonationSelector card with frequency toggle, 6 preset amount tiles ($5–$300),
 *   impact note, custom amount input, full-width dynamic CTA, and official EIN line.
 */
export function DonationSection({ content, className }: DonationSectionProps) {
  const { eyebrow, headline, lead, checklist, quote, selector } = {
    ...homeDonationContent,
    ...content,
  };

  return (
    <Section
      bleed
      tone="navy"
      spacing="none"
      className={cn('py-16 text-white sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Mission copy, checklist & quote */}
          <div className="flex flex-col justify-between self-stretch lg:col-span-6">
            <div>
              <Eyebrow onDark className="mb-3">
                {eyebrow}
              </Eyebrow>
              <Heading
                as="h2"
                className="font-sans text-3xl leading-tight font-normal tracking-tight text-balance text-white sm:text-4xl lg:text-[40px]"
              >
                {headline}
              </Heading>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {lead}
              </p>

              {/* Three Checklist Points */}
              <CheckList items={checklist} onDark className="mt-8 mb-8" />
            </div>

            {/* Bottom Quote & Mission Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="font-serif text-sm text-white/70 italic sm:text-base">
                &ldquo;{quote.text}&rdquo;
              </p>
              <TextLink href={quote.action.href} onDark className="text-sm sm:text-base">
                {quote.action.label}
              </TextLink>
            </div>
          </div>

          {/* Right Column: Donation Card */}
          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <DonationSelector selectorContent={selector} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
