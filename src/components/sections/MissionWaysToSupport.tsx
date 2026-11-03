import React from 'react';
import { HandHeart, Handshake, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CheckList } from '@/components/ui/CheckList';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import {
  missionWaysToSupportContent,
  type MissionWaysToSupportContent,
  type MissionSupportCardIcon,
  type MissionSupportCardTone,
} from '@/content/mission';

export interface MissionWaysToSupportProps {
  /** Optional content override */
  content?: Partial<MissionWaysToSupportContent>;
  /** Optional custom class name */
  className?: string;
}

const toneCardStyles: Record<MissionSupportCardTone, string> = {
  lavender: 'bg-lavender border-border/60',
  warm: 'bg-warm border-border/60',
  sage: 'bg-sage border-border/60',
};

const iconMap: Record<MissionSupportCardIcon, React.ElementType> = {
  HandHeart,
  Handshake,
  CircleDollarSign,
};

/**
 * Mission Page — Part 3: Ways to Support ("Support neighbors, volunteers, and year-round service.")
 * Grounded in Figma frame: `design-reference/Mission Page/Hero.png` (Section 3).
 *
 * Structure:
 * - Full-bleed warm cream canvas background (`tone="cream"` / `#faf7ee`).
 * - Two-column responsive section header:
 *   - Left: "WAYS TO GIVE" gold-accented eyebrow + serif heading + supporting copy.
 *   - Right: Contact prompt with direct telephone link to siteConfig.phoneDisplay.
 * - Three support participation cards in a responsive grid:
 *   - Card 1: Give Food (Lavender) with HandHeart icon, audience tag, checklist, and "Donate Food" navy pill button.
 *   - Card 2: Give Time (Warm yellow) with Handshake icon, audience tag, checklist, and "Volunteer" navy pill button.
 *   - Card 3: Give Funds (Sage green) with CircleDollarSign icon, audience tag, checklist, and "Give Financially" navy pill button.
 *   Each card features a white icon container, top-right audience label, checklist with green checks,
 *   subtle divider, and full-width navy pill Button with a gold arrow.
 */
export function MissionWaysToSupport({
  content: contentOverride,
  className,
}: MissionWaysToSupportProps) {
  const content = {
    ...missionWaysToSupportContent,
    ...contentOverride,
  };

  const { eyebrow, heading, description, cards } = content;

  return (
    <Section
      bleed
      tone="cream"
      spacing="none"
      className={cn('pt-4 pb-20 sm:pt-6 sm:pb-24 lg:pt-8 lg:pb-32', className)}
    >
      <Container>
        {/* Section Header: Left copy + Right phone link */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl">
            <Eyebrow className="mb-4 tracking-widest uppercase sm:mb-5">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              variant="section"
              className="text-navy font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-[1.18]"
            >
              {heading}
            </Heading>
            <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          </div>

          <div className="shrink-0 pb-1 text-sm text-slate-600 sm:text-base lg:text-right">
            <a
              href={siteConfig.phoneHref}
              className="text-navy focus-visible:outline-gold rounded-xs font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Three Support Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon];
            const isLastOnTablet = index === 2;

            return (
              <div
                key={card.id}
                className={cn(
                  'rounded-card relative flex flex-col justify-between border p-8 shadow-xs transition-shadow duration-200 hover:shadow-md sm:p-10',
                  toneCardStyles[card.tone],
                  isLastOnTablet &&
                    'md:col-span-2 md:mx-auto md:w-full md:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none',
                )}
              >
                <div>
                  {/* Card Header: Icon in White Container (left) + Audience Tag (right) */}
                  <div className="flex items-center justify-between">
                    <div className="text-navy flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-2xs">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="text-navy/70 text-xs font-bold tracking-widest uppercase">
                      {card.audience}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-navy mt-6 text-2xl font-bold tracking-tight sm:text-[26px]">
                    {card.title}
                  </h3>
                  <p className="text-muted mt-2.5 text-sm leading-relaxed sm:text-base">
                    {card.description}
                  </p>

                  {/* Feature Checklist */}
                  <CheckList items={card.checklist} className="mt-6 mb-8" />
                </div>

                {/* Divider & Full-Width Navy Pill Button with Gold Arrow */}
                <div className="border-navy/10 mt-auto border-t pt-6">
                  <Button variant="dark" size="md" icon="arrow" fullWidth href={card.action.href}>
                    {card.action.label}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
