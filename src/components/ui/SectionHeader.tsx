import React from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Heading, HeadingTag, HeadingVariant } from './Heading';
import { Lead } from './Lead';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow text or custom element placed above the heading */
  eyebrow?: React.ReactNode;
  /** Main heading content */
  heading: React.ReactNode;
  /** Semantic HTML heading tag. Default: 'h2' */
  headingAs?: HeadingTag;
  /** Visual typography variant for the heading. Default: 'section' */
  headingVariant?: HeadingVariant;
  /** Optional lead descriptive paragraph */
  lead?: React.ReactNode;
  /** Content alignment. Default: 'left' */
  align?: 'left' | 'center';
  /** Optional right-hand slot for split layouts (e.g. secondary copy or actions) */
  rightSlot?: React.ReactNode;
  /** If true, applies light text coloring for dark surfaces. Default: false */
  onDark?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Composite header component orchestrating Eyebrow, Heading, Lead, and optional right-hand slot.
 */
export function SectionHeader({
  eyebrow,
  heading,
  headingAs = 'h2',
  headingVariant = 'section',
  lead,
  align = 'left',
  rightSlot,
  onDark = false,
  className,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === 'center' && !rightSlot;

  if (rightSlot) {
    return (
      <div
        className={cn(
          'flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
          className,
        )}
        {...props}
      >
        <div className="w-full max-w-2xl space-y-3">
          {eyebrow &&
            (typeof eyebrow === 'string' ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : eyebrow)}
          <Heading as={headingAs} variant={headingVariant} onDark={onDark}>
            {heading}
          </Heading>
          {lead && (typeof lead === 'string' ? <Lead onDark={onDark}>{lead}</Lead> : lead)}
        </div>
        <div className="w-full shrink-0 lg:w-auto lg:max-w-md">{rightSlot}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full space-y-3',
        isCentered ? 'mx-auto flex max-w-3xl flex-col items-center text-center' : 'max-w-2xl',
        className,
      )}
      {...props}
    >
      {eyebrow &&
        (typeof eyebrow === 'string' ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : eyebrow)}
      <Heading as={headingAs} variant={headingVariant} onDark={onDark}>
        {heading}
      </Heading>
      {lead && (typeof lead === 'string' ? <Lead onDark={onDark}>{lead}</Lead> : lead)}
    </div>
  );
}
