import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { foodProviderPartnersContent, type FoodProviderPartnersContent } from '@/content/community';
import { cn } from '@/lib/cn';

export interface FoodProviderPartnersProps {
  /** Optional content override */
  content?: Partial<FoodProviderPartnersContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * Authentic MSAM Brand Icon Emblem used as the decorative right-aligned header detail.
 * Rendered in brand gold with viewBox mapped to the brand icon vector geometry.
 */
function BrandEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="10 256 110 138"
      fill="currentColor"
      aria-hidden="true"
      className={cn('text-gold aspect-[110/138] h-9 w-auto shrink-0 select-none', className)}
    >
      <g>
        <path d="M94.4,361c2.3-4.1,4-8.2,5.6-12.4c0.4-1,0.6-2.1,0.6-3.2l0.1-8.4l0.2-6.5l0.2-4.4c-3.2,1.2-3.8,5.2-4.3,8.4l-0.2,1.9l-0.5,5.6c-0.2,2.2-0.9,4.3-2.3,6.1c0.6-2,1.1-3.8,1.2-5.8l0.1-4.6c0.1-4.1,0.6-8.8,3.5-11.8c1.1-1.2,3-1.8,3.7-1.1c0.2,0.2,0.4,0.8,0.4,1.1l-0.3,6.1l-0.2,13.4c0,1.8-0.5,3.6-1.3,5.2l-5,10.9c-0.9,1.9-4.2,4.9-6.1,6.4l-4.7,3.7c-2.5,1.9-4.9,3.8-6.7,6.5l-1.5,2.2c0.4-2.2,1.3-4,2.6-5.7c1.4-1.8,3.2-3.1,5-4.6l6-4.8C92,364,93.4,362.7,94.4,361z" />
        <path d="M22,346.2c0,0.6,0.2,1.5,0.4,2c1.7,4.4,3.5,8.7,5.8,12.9c1.1,1.9,2.7,3.3,4.3,4.6l4.6,3.7l1.3,1c3.1,2.4,6.7,5.6,7.1,9.7c-1.5-2.5-3.1-4.6-5.3-6.3l-7-5.5l-3-2.6c-2-1.8-3.4-3.8-4.6-6.3l-2.3-5c-1-2.3-2-4.5-2.6-7l-0.2-2.2L20.1,331l0-5.9c0-1,3.4-0.9,5.3,2.6c0.8,1.5,1.5,3.2,1.7,4.9l0.2,2l0.2,3.9l0.2,4.6l0.3,2l0.5,1.8c0.1,0.2,0,0.6-0.1,0.7c-1.4-1.9-1.8-4-2-6.1l-0.2-3.3l-0.4-3.5c-0.3-3-1.4-7.7-4.3-8.5l0.2,4.8l0.2,8.4L22,346.2z" />
        <path d="M30.5,343.6c-0.5-2.3-0.5-4.4-0.6-6.7l-0.1-2.3c-0.1-1.1-0.6-2.2-1.5-2.9l0,0l-0.8-1.4c2.1-0.2,3.4,2.2,3.8,4.4c0.3,1.6,0.1,3.3,0,5l0.1,3.6C31.4,343.4,30.9,343.6,30.5,343.6z" />
        <path d="M92.6,340.4l-0.4,2.6c0,0.1-0.1,0.4-0.2,0.6c-0.1,0.1-0.5,0.1-0.6,0c-0.2-0.2,0.2-2.3,0-4.7c-0.2-2.6-0.2-5.7,1.5-7.6c0.6-0.7,1.4-1,2.3-1l-0.4,1.3c-1.1,0.2-1.4,0.9-1.6,1.9l-0.5,2.1L92.6,340.4z" />
        <polygon points="28.7,347.7 28.7,347.8 28.7,347.9 28.7,348 28.7,347.9 28.7,347.8" />
        <path d="M13.5,323.5l0,3.5l0,4.3l0,7.2l0,2.1l0,4.3l0,8.7l0,4.8l0,3.7l0,2.1c0,0.2,0.1,0.4,0.3,0.5l14.4,8.4l11.4,6.7L57,390.1c0.4,0.2,0.9,0,0.9-0.5l0-11.9c0,0,0,0,0,0l-0.3-3.7c0,0,0,0,0-0.1l-0.7-3.7c-0.9-3.8-2.7-7.2-5.6-9.8c-3.6-3.2-7.4-3.3-12.4-8.7l-2.6-2.9c-1.3-1.4-3.6-3.2-4.8-2.5c-1.5,1,0.4,4.3,1.7,5.8l4.8,5.6c0.3,0.4,0.7,0.8,1,1.1c0.5,0.6-0.3,1.3-0.9,0.8l0,0l-4.4-4.5c0,0,0,0,0-0.1l-2.8-3.5c-1.6-2-2.4-5.4-0.3-6.6c2.6-1.5,5.5,1.4,7.5,3.5l4.4,4.5c2.7,2.8,9.4,3.3,13.6,11.1c1.5,2.7,2.4,5.6,2.8,8.7l0.3,2.8c0,0,0,0,0,0.1l0.1,16.4c0,0.2-0.2,0.7-0.4,0.8c-0.2,0.1-0.5,0-0.8,0c0,0-0.1,0-0.1-0.1l-17.3-10.3l-28.6-16.8c-0.2-0.1-0.3-0.3-0.3-0.5l0-51.4c0-0.2,0.1-0.4,0.3-0.5l16-9.2L61.2,285c0.2-0.1,0.4-0.1,0.6,0l10.7,6.1l18.7,10.7l19.3,11.2c0.2,0.1,0.3,0.3,0.3,0.5l0,51.6c0,0.2-0.1,0.4-0.3,0.5l-18.9,11.1l-27.2,16c-0.1,0.1-0.2,0.1-0.3,0.1c-0.4,0-0.9-0.3-0.9-0.7l0-15.7c0,0,0-0.1,0-0.1l0.2-1.7c0,0,0,0,0,0c0.3-5,1.9-9.7,5-13.6c0,0,0,0,0,0l2.2-2.2c0,0,0,0,0.1,0c3.1-2.5,6.6-3.5,9.1-5.6c1.7-1.4,3-3,4.5-4.6c2-2.2,5.3-5,7.8-3.4c0.8,0.5,1.4,1.7,1.1,2.9c-0.8,3.8-4.9,7.8-7.8,10.7l-1.1,1.1c-0.5,0.5-1.4-0.2-0.9-0.8c0,0,0.1-0.1,0.1-0.1l4.3-4.9c1.5-1.7,2.8-3.5,3.8-5.5c0.3-0.6,0.3-1.3,0-1.8c-0.8-1-2.8-0.3-3.7,0.6l-4.4,4.5c-2.2,2.3-4.6,4.2-7.5,5.5c-4.6,2.1-8,5.9-9.6,10.8c-0.9,2.7-1.5,5.5-1.5,8.4l-0.1,13.1c0,0.5,0.5,0.8,0.9,0.5l17.1-10.1l18.7-11l7.4-4.4c0.2-0.1,0.3-0.3,0.3-0.5l0-49.6c0-0.2-0.1-0.4-0.3-0.5l-32.1-18.5l-15-8.6c-0.2-0.1-0.4-0.1-0.6,0l-8.8,5l-38.5,22.1c-0.2,0.1-0.3,0.3-0.3,0.5l-0.1,3.9L13.5,323.5z" />
        <path d="M60.1,333.8c-5.4-0.7-9-5.3-8.7-10.6c0.3-4.6,3.6-8.2,8-9.2c1.4-0.3,2.5-0.3,3.9,0c5.3,1.1,8.8,6.2,7.9,11.5C70.3,330.7,65.5,334.5,60.1,333.8z M69.5,322.4c-0.9-4.5-5.1-7.6-9.6-6.8c-3.2,0.6-5.7,2.9-6.6,5.8c-1,3.3,0,6.6,2.5,8.8c2.3,2.1,5.6,2.6,8.6,1.4C68,330.2,70.3,326.2,69.5,322.4z" />
        <path d="M61.3,362.4c0,0-0.8-22.9-0.8-26.9l1.7,0C62.2,341.3,61.3,362.4,61.3,362.4z" />
        <polygon points="60.5,312.4 61.3,295 62.2,312.4" />
        <polygon points="35.9,324.2 33.2,323.9 33.1,323.7 36.5,323.6 38.4,323.4 42.3,323.3 49.7,323.1 49.8,324.8 46.6,324.7 40.3,324.5" />
        <path d="M87.3,324.2l-4.6,0.3l-6.3,0.2l-3.4,0.1l0-1.7l7,0.1l2.9,0.1l3.4,0.2l3.3,0.2C88.8,324.1,88.1,324.1,87.3,324.2z" />
        <path d="M54.1,314.4l-1.2,1.1l-3.5-4.1l-2.5-3.3c0.9,0.5,1.5,1,2.1,1.6L54.1,314.4z" />
        <path d="M71.6,313.6l-1.7,1.9l-1.3-1.2l4.3-3.8l2.9-2.4c-0.3,0.7-0.6,1.2-1,1.6l-1.5,1.9L71.6,313.6z" />
        <path d="M52.5,334.4l-5.6,4.8c1.1-1.9,2.4-3.4,3.8-5l2-2.4L54,333L52.5,334.4z" />
        <path d="M74.4,338.1l-5.7-5l1.2-1.2c2.1,2.3,4,4.6,5.8,7.2C75.2,338.8,74.8,338.4,74.4,338.1z" />
        <path d="M26.6,284l0-11.1l-3.8,5.3l-2.4,3.4l-4.9-3.4l-1.3-0.8l0,11.4l-2.3,0.8l0-16.3L13,273l3,2.2l4.5,3.2l2.5-3.6l4.3-6.2c0.5-0.7,0.9-1.3,1.8-1.3l0,15.9L26.6,284z" />
        <path d="M88.7,273.9l0,7.4c-0.6-0.1-1.3-0.4-1.8-0.7l-3.9-6.1l-5.8-8.8l0,11.5l-2.3-0.9l0-15.9l1.7,0.6l9.8,15l0.1-11.4l2.3,0.8l0,3L88.7,273.9z" />
        <path d="M68.3,266.5l0-5.6l0-3l-2.3-0.8l-0.1,11.4l-9.8-11.2l-1.7,0.7l0,15.9l2.3-0.8l0-11.5c0,0,8.3,9.8,9.7,11.6c0.6,0.4,1.2,0.6,1.8,0.7L68.3,266.5z" />
        <path d="M108,288.4l-5.8-13.4l-5.8,9.2l-2.6-1l8.1-12.7l0.4-0.2c0.1,0,0.3,0.3,0.4,0.5l8,18.5L108,288.4z" />
        <path d="M46.7,276.7l-5.8-9.2l-5.8,13.5l-2.6,0.9l8.1-18.6l0.4-0.5c0.1-0.1,0.3,0.1,0.4,0.2l8,12.7L46.7,276.7z" />
      </g>
    </svg>
  );
}

/**
 * Phase 7.2B: Food Provider Partners Roster
 *
 * Reproduces the updated design reference (`2-Food Provider roster - updated.png`):
 * - Section Eyebrow: `OUR COMMUNITY PARTNERS` (uppercase tracking, muted tone)
 * - Section Heading: `Food Provider Partners` (Fraunces serif)
 * - Decorative right-aligned MSAM brand emblem in gold
 * - Five clean, empty placeholder boxes on warm gold/cream surfaces, ready for real partner logos later.
 * - At 1440px and 1024px desktop, all five partner boxes are completely visible in a single row with
 *   identical dimensions and consistent spacing within the content container.
 * - On tablet and mobile (768px and 375px), provides a smooth, contained horizontal scroll track.
 */
export function FoodProviderPartners({
  content: contentOverride,
  className,
}: FoodProviderPartnersProps) {
  const content = {
    ...foodProviderPartnersContent,
    ...contentOverride,
  };

  const { eyebrow, heading, slotCount } = content;
  const slots = Array.from({ length: slotCount });

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

          {/* Right-aligned decorative gold brand emblem */}
          <div className="hidden shrink-0 items-center pb-1 sm:flex" aria-hidden="true">
            <BrandEmblem />
          </div>
        </div>

        {/* Five Clean Empty Partner Placeholder Boxes */}
        <div className="mt-8 sm:mt-10 lg:mt-14">
          <div
            role="region"
            aria-label="Food Provider Partners"
            tabIndex={0}
            className={cn(
              'flex items-center gap-4 sm:gap-5 lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-6',
              'overflow-x-auto pt-1 pb-4 lg:overflow-visible lg:pb-0',
              '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
              'focus-visible:ring-gold snap-x snap-mandatory focus:outline-none focus-visible:ring-2',
            )}
          >
            {slots.map((_, index) => (
              <div
                key={index}
                role="presentation"
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
