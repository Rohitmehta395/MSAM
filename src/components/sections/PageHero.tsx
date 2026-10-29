import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Button } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/IconBadge';
import { MediaImage } from '@/components/media/MediaImage';
import {
  homeHeroContent,
  homeTrustStripItems,
  type HeroAction,
  type HeroFloatingCard,
  type TrustStripItem,
} from '@/content/home';

export interface PageHeroProps {
  /** Eyebrow pill text */
  eyebrow?: string;
  /** Display H1 headline */
  headline?: string;
  /** Editorial lead paragraph */
  lead?: string;
  /** Primary call-to-action */
  primaryAction?: HeroAction;
  /** Secondary call-to-action */
  secondaryAction?: HeroAction;
  /** Reassurance line below CTAs */
  reassurance?: string;
  /** Floating badge card overlaid on the hero mosaic */
  floatingCard?: HeroFloatingCard;
  /** Three-item trust strip rendered below the hero columns */
  trustStrip?: TrustStripItem[];
  /** Optional custom class name */
  className?: string;
}

/**
 * Home & Landing Page Hero section.
 *
 * Grounded in Figma frame: `design-reference/Home Page/1-Hero.png` (1440px wide).
 * Aligns horizontally with the site Header's inner content boundaries.
 *
 * Architecture note:
 * - Uses `<Section bleed ...>` so the outer `<section>` acts as the full-bleed canvas surface.
 * - Wraps content in a single `<Container className="max-w-[1440px]">`, matching the exact
 *   container configuration of `<Header>` and `<Footer>` and eliminating nested container padding.
 * - Displays a balanced two-column hero layout with verified temporary Unsplash photography.
 * - Spans the divided trust strip across the exact same horizontal boundaries as the Header.
 */
export function PageHero({
  eyebrow = homeHeroContent.eyebrow,
  headline = homeHeroContent.headline,
  lead = homeHeroContent.lead,
  primaryAction = homeHeroContent.primaryAction,
  secondaryAction = homeHeroContent.secondaryAction,
  reassurance = homeHeroContent.reassurance,
  floatingCard = homeHeroContent.floatingCard,
  trustStrip = homeTrustStripItems,
  className,
}: PageHeroProps) {
  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      className={cn('pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20', className)}
    >
      <Container className="max-w-[1440px]">
        {/* Split Hero: Text Column (Left) + 3-Image Mosaic (Right) */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-center xl:gap-10">
          {/* Left Column: Copy & Actions */}
          <div className="flex w-full flex-col items-start lg:max-w-[560px] xl:max-w-[580px]">
            {/* Eyebrow Pill */}
            {eyebrow && (
              <div className="mb-4 sm:mb-5">
                <Badge tone="outline" dot>
                  {eyebrow}
                </Badge>
              </div>
            )}

            {/* Display Headline */}
            <Heading
              as="h1"
              variant="display"
              className="text-navy max-w-xl tracking-tight text-balance"
            >
              {headline}
            </Heading>

            {/* Lead Copy */}
            {lead && (
              <Lead className="text-muted mt-4 max-w-xl text-base sm:mt-5 sm:text-lg sm:leading-relaxed">
                {lead}
              </Lead>
            )}

            {/* Actions */}
            <div className="mt-8 flex w-full flex-wrap items-center gap-3.5 sm:w-auto sm:gap-4">
              {primaryAction && (
                <Button
                  href={primaryAction.href}
                  variant={primaryAction.variant ?? 'primary'}
                  size="md"
                  icon={primaryAction.icon ?? 'none'}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant={secondaryAction.variant ?? 'secondary'}
                  size="md"
                  icon={secondaryAction.icon ?? 'none'}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>

            {/* Reassurance Guarantee Line */}
            {reassurance && (
              <div className="text-muted mt-4 flex items-center gap-2 text-xs font-medium select-none">
                <CheckCircle2 className="text-success h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{reassurance}</span>
              </div>
            )}
          </div>

          {/* Right Column: 3-Image Mosaic with Floating Appointment Card */}
          <div className="w-full shrink-0 lg:w-auto">
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_200px] xl:grid-cols-[440px_212px]">
              {/* Main Feature Image (4/5 aspect ratio at mobile, filling 585px height on desktop) */}
              <div className="rounded-panel shadow-card relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:h-[480px] lg:h-[585px]">
                <MediaImage
                  assetKey="home.hero.main"
                  sizes="(min-width: 1280px) 440px, (min-width: 1024px) 35vw, 100vw"
                  priority
                  fillContainer
                  rounded="panel"
                />

                {/* Floating Appointment Card */}
                {floatingCard && (
                  <div
                    role="region"
                    aria-label="Appointment support information"
                    className="rounded-card border-border shadow-float absolute right-4 bottom-4 left-4 z-10 flex items-center gap-3.5 border bg-white/95 p-3.5 backdrop-blur-md select-none sm:right-5 sm:bottom-5 sm:left-5 sm:p-4"
                  >
                    <IconBadge size="sm" tint="gold" icon={Calendar} className="shrink-0" />
                    <div className="min-w-0">
                      <p className="text-navy text-sm leading-snug font-semibold">
                        {floatingCard.title}
                      </p>
                      <p className="text-muted mt-0.5 text-xs leading-tight">
                        {floatingCard.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary Stacked Column (two images filling 585px column height with 16px gap) */}
              <div className="grid grid-cols-2 gap-4 sm:h-[480px] sm:grid-cols-1 lg:h-[585px]">
                <div className="rounded-panel relative aspect-[4/3] w-full overflow-hidden shadow-sm sm:aspect-auto sm:h-full">
                  <MediaImage
                    assetKey="home.hero.top"
                    sizes="(min-width: 1280px) 212px, (min-width: 1024px) 16vw, 50vw"
                    fillContainer
                    rounded="panel"
                  />
                </div>
                <div className="rounded-panel relative aspect-[4/3] w-full overflow-hidden shadow-sm sm:aspect-auto sm:h-full">
                  <MediaImage
                    assetKey="home.hero.bottom"
                    sizes="(min-width: 1280px) 212px, (min-width: 1024px) 16vw, 50vw"
                    fillContainer
                    rounded="panel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        {trustStrip && trustStrip.length > 0 && (
          <div className="rounded-panel border-border mt-12 w-full overflow-hidden border bg-white shadow-sm lg:mt-16">
            <div className="divide-border grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
              {trustStrip.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-4.5 sm:px-6 sm:py-5 lg:px-8 lg:py-5"
                  >
                    <IconBadge size="sm" tint="lavender" icon={Icon} className="shrink-0" />
                    <div className="min-w-0">
                      <p className="text-navy text-sm font-semibold tracking-tight">{item.title}</p>
                      <p className="text-muted mt-0.5 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
