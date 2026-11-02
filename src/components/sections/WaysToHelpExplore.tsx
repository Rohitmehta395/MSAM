import React from 'react';
import Link from 'next/link';
import { HandHeart, Handshake, CircleDollarSign, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { CheckList } from '@/components/ui/CheckList';
import { siteConfig } from '@/config/site';
import {
  waysToHelpExploreContent,
  type WaysToHelpExploreContent,
  type ParticipationCardIcon,
} from '@/content/ways-to-help';

export interface WaysToHelpExploreProps {
  /** Optional content override */
  content?: Partial<WaysToHelpExploreContent>;
  /** Optional custom class name */
  className?: string;
}

const toneCardStyles: Record<string, string> = {
  lavender: 'bg-lavender border-border/60',
  warm: 'bg-warm border-border/60',
  sage: 'bg-sage border-border/60',
};

const iconMap: Record<ParticipationCardIcon, React.ElementType> = {
  HandHeart,
  Handshake,
  CircleDollarSign,
};

/**
 * Ways to Help / Donate Page — Ways to Take Part / Explore section: "Explore ways to give, serve, and share."
 *
 * Grounded in Figma frame: `design-reference/Donations Page/2-Ways to take part.png` (1440 × 631 px).
 *
 * Structure:
 * 1. Two-column responsive section header:
 *    - Left: "EXPLORE WAYS TO HELP" gold-accented eyebrow + "Explore ways to give, serve, and share." serif heading.
 *    - Right: Supporting contact text with direct dial to siteConfig.phoneDisplay.
 * 2. Three participation cards in a single desktop row:
 *    - Card 1: Give Food (Lavender) with HandHeart icon
 *    - Card 2: Serve (Warm yellow) with Handshake icon
 *    - Card 3: Give Funds (Sage green) with CircleDollarSign icon
 *    Each card includes a white icon container, uppercase category tag, title, description,
 *    3-item green-check checklist, subtle top divider, and bold navy text-link CTA.
 */
export function WaysToHelpExplore({ content: contentOverride, className }: WaysToHelpExploreProps) {
  const content = {
    ...waysToHelpExploreContent,
    ...contentOverride,
  };

  const { eyebrow, headline, contactPrompt, cards } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('pt-4 pb-20 sm:pt-6 sm:pb-24 lg:pt-8 lg:pb-32', className)}
    >
      <Container className="max-w-[1440px]">
        {/* Section Header: Two-column layout matching reference */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading
              as="h2"
              variant="section"
              className="text-navy font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.15]"
            >
              {headline}
            </Heading>
          </div>

          <div className="shrink-0 pb-1 text-sm text-slate-600 sm:text-base lg:text-right">
            {contactPrompt}{' '}
            <a
              href={siteConfig.phoneHref}
              className="text-navy focus-visible:outline-gold rounded-xs font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Three Participation Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-1 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon];
            const isLastOnTablet = index === 2;

            return (
              <div
                key={card.id}
                className={cn(
                  'rounded-card relative flex flex-col justify-between border p-8 shadow-xs transition-shadow duration-200 hover:shadow-md sm:p-10',
                  toneCardStyles[card.tone],
                  // When on 2-col tablet layout, stretch the 3rd card full-width for balanced visual hierarchy
                  isLastOnTablet && 'md:col-span-2 lg:col-span-1',
                )}
              >
                <div>
                  {/* Card Header: Icon in White Box + Audience Tag */}
                  <div className="flex items-center gap-4">
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
                  <CheckList items={card.features} className="mt-6 mb-8" />
                </div>

                {/* Divider & Text Link CTA */}
                <div className="border-border mt-auto border-t pt-6">
                  <Link
                    href={card.action.href}
                    className="group text-navy hover:text-navy/80 inline-flex items-center gap-2 text-sm font-bold transition-colors sm:text-base"
                  >
                    <span>{card.action.label}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
