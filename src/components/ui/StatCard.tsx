import React from 'react';
import { cn } from '@/lib/cn';

export type StatCardVariant = 'light' | 'navy' | 'warm';

const cardStyles: Record<StatCardVariant, string> = {
  light: 'bg-white border-border text-navy shadow-card',
  navy: 'bg-white/5 border-white/15 text-white shadow-none on-dark',
  warm: 'bg-warm border-border text-navy shadow-card',
};

const valueStyles: Record<StatCardVariant, string> = {
  light: 'text-navy',
  navy: 'text-gold',
  warm: 'text-navy',
};

const labelStyles: Record<StatCardVariant, string> = {
  light: 'text-navy',
  navy: 'text-white',
  warm: 'text-navy',
};

const captionStyles: Record<StatCardVariant, string> = {
  light: 'text-muted',
  navy: 'text-white/70',
  warm: 'text-navy/70',
};

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Large numerical or statistical metric */
  value: React.ReactNode;
  /** Primary bold description */
  label: React.ReactNode;
  /** Secondary contextual explanation */
  caption?: React.ReactNode;
  /** Visual color theme variant. Default: 'light' */
  variant?: StatCardVariant;
  /** Optional custom class name */
  className?: string;
}

/**
 * Metric card component displaying large key statistics, bold labels, and supporting captions.
 */
export function StatCard({
  value,
  label,
  caption,
  variant = 'light',
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-card flex flex-col justify-between border p-6 md:p-8',
        cardStyles[variant],
        className,
      )}
      {...props}
    >
      <div>
        <span
          className={cn(
            'block text-3xl leading-none font-bold tracking-tight sm:text-4xl lg:text-5xl',
            valueStyles[variant],
          )}
        >
          {value}
        </span>
        <p className={cn('mt-3 text-base leading-snug font-bold md:text-lg', labelStyles[variant])}>
          {label}
        </p>
      </div>
      {caption && (
        <p className={cn('mt-2 text-xs leading-normal md:text-sm', captionStyles[variant])}>
          {caption}
        </p>
      )}
    </div>
  );
}
