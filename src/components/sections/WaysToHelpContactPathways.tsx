import React from 'react';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  waysToHelpContactPathwaysContent,
  type WaysToHelpContactPathwaysContent,
} from '@/content/ways-to-help';
import { WaysToHelpInquiryForm } from '@/features/forms/WaysToHelpInquiryForm';

export interface WaysToHelpContactPathwaysProps {
  /** Optional content override */
  content?: Partial<WaysToHelpContactPathwaysContent>;
  /** Optional custom class name */
  className?: string;
}

// Backwards-compatible alias
export type MissionContactPathwaysProps = WaysToHelpContactPathwaysProps;

/**
 * Ways to Help / Donate Page — Contact Pathways Section: Tabs and Inquiry Form.
 * Grounded in Figma frame: `design-reference/Donations Page/3-Contact pathways.png` (1440x1116).
 *
 * Layout:
 * - Canvas background (`tone="canvas"` / `#fcfbfd`).
 * - Section anchor ID: `contact-pathways`.
 * - Top Split Header:
 *   - Eyebrow with gold accent dash: "— EXPLORE WAYS TO HELP".
 *   - Bold serif headline: "Explore ways to give, serve, and share."
 *   - Right-aligned contact helper linking to telephone line: "Questions about giving or serving? Call (954) 406-7580."
 * - Central Elevated Card:
 *   - White surface, `rounded-card` (32px), border `border-border/60`, `shadow-card`.
 *   - Houses interactive `WaysToHelpInquiryForm` with 3 accessible tabs, complete form controls, and anti-spam protection.
 */
export function WaysToHelpContactPathways({
  content: contentOverride,
  className,
}: WaysToHelpContactPathwaysProps) {
  const content = {
    ...waysToHelpContactPathwaysContent,
    ...contentOverride,
  };

  const { eyebrow, headline, contactPrompt } = content;

  return (
    <Section
      bleed
      tone="canvas"
      spacing="none"
      id="contact-pathways"
      className={cn('scroll-mt-24 py-16 sm:py-20 lg:py-24', className)}
    >
      <Container className="max-w-[1296px]">
        {/* Top Header Row: Left Eyebrow + Headline & Right Contact Prompt */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            <Eyebrow className="tracking-widest uppercase">{eyebrow}</Eyebrow>
            <h2 className="text-navy mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-[46px]">
              {headline}
            </h2>
          </div>

          <div className="pb-1 text-sm text-slate-600 sm:text-base md:text-right">
            <span>{contactPrompt.prefix} </span>
            <a
              href={contactPrompt.phoneHref}
              className="text-navy focus-visible:outline-navy font-semibold hover:underline focus-visible:outline-2"
            >
              {contactPrompt.phoneText}
            </a>
          </div>
        </div>

        {/* Central Elevated White Card */}
        <div className="rounded-card border-border/60 shadow-card mt-8 border bg-white p-6 sm:mt-10 sm:p-10 lg:mt-12 lg:p-12">
          <WaysToHelpInquiryForm content={content} />
        </div>
      </Container>
    </Section>
  );
}

// Backwards-compatible export
export const MissionContactPathways = WaysToHelpContactPathways;
