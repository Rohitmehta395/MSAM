import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { howItWorksIntakeContent, type HowItWorksIntakeContent } from '@/content/how-it-works';
import { IntakeForm } from '@/features/forms/IntakeForm';

export interface IntakeFormSectionProps {
  /** Optional content override */
  content?: Partial<HowItWorksIntakeContent>;
  /** Optional custom class name */
  className?: string;
}

/**
 * How It Works Page — Assistance Request / Manna Family Intake Form Section.
 * Grounded in Figma frame: `design-reference/How it works Page/4-Assistance request.png` (1440px wide).
 *
 * Layout:
 * - Full-bleed canvas background (`tone="canvas"` / `#fcfbfd`).
 * - Section anchor ID: `assistance-request` (also accepts `#intake`).
 * - Top Header:
 *   - Eyebrow: "READY TO VISIT? WE'RE READY FOR YOU."
 *   - Heading: "Ready to Visit? We’re Ready for You."
 *   - Right Action: "Call for an Appointment →" navy pill button linking to telephone line.
 * - Central Elevated Card:
 *   - White surface, `rounded-card` (32px), subtle border, soft shadow.
 *   - Form Title: "Manna Family Intake Form"
 *   - Subheading: "Tell us about your household."
 *   - Explanatory copy.
 *   - Integrated `IntakeForm` client component with `FileAttach`.
 */
export function IntakeFormSection({ content: contentOverride, className }: IntakeFormSectionProps) {
  const content = {
    ...howItWorksIntakeContent,
    ...contentOverride,
  };

  const {
    sectionEyebrow,
    sectionHeadline,
    sectionAction,
    cardTitle,
    cardSubtitle,
    cardDescription,
  } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      id="assistance-request"
      className={cn('scroll-mt-24 py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1440px]">
        {/* Top Header Row: Eyebrow + Heading (left) & Call for an Appointment CTA (right) */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start">
            <Eyebrow className="mb-2 sm:mb-3">{sectionEyebrow}</Eyebrow>
            <h2 className="text-navy text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[46px]">
              {sectionHeadline}
            </h2>
          </div>

          <Button
            href={sectionAction.href}
            variant="dark"
            size="md"
            icon="arrow"
            className="shrink-0 rounded-full shadow-xs"
          >
            {sectionAction.label}
          </Button>
        </div>

        {/* Main Intake Form Card with lavender top accent */}
        <div className="rounded-card border-border shadow-card border-t-lavender mt-8 border border-t-[5px] bg-white p-6 sm:mt-10 sm:p-10 lg:mt-12 lg:p-12">
          {/* Card Header: Title, Subheading & Description */}
          <div className="mb-8">
            <h3 className="text-navy text-2xl font-normal tracking-tight sm:text-3xl">
              {cardTitle}
            </h3>

            <div className="mt-6">
              <h4 className="text-navy text-lg font-semibold tracking-tight sm:text-xl">
                {cardSubtitle}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                {cardDescription}
              </p>
            </div>
          </div>

          {/* Form Component */}
          <IntakeForm content={content} />
        </div>
      </Container>
    </Section>
  );
}
