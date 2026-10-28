import React from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'lavender' | 'warm' | 'navy' | 'outline' | 'gold';

const toneStyles: Record<BadgeTone, string> = {
  lavender: 'bg-lavender text-navy',
  warm: 'bg-warm text-navy',
  navy: 'bg-navy text-white',
  outline: 'bg-transparent border border-border text-navy',
  gold: 'bg-gold text-navy',
};

const dotToneStyles: Record<BadgeTone, string> = {
  lavender: 'bg-gold',
  warm: 'bg-gold',
  navy: 'bg-gold',
  outline: 'bg-gold',
  gold: 'bg-navy',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual background and text tone. Default: 'lavender' */
  tone?: BadgeTone;
  /** Whether to render leading circular status dot. Default: false */
  dot?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Badge content */
  children: React.ReactNode;
}

/**
 * Pill-shaped badge component for status indicators, categorization, and contextual callouts.
 */
export function Badge({
  tone = 'lavender',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-pill inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide select-none',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotToneStyles[tone])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
