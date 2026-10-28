import React from 'react';
import { cn } from '@/lib/cn';

export type CardTint = 'white' | 'lavender' | 'warm' | 'sage' | 'navy';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardTag = 'div' | 'article' | 'section';

const tintStyles: Record<CardTint, string> = {
  white: 'bg-white border-border text-navy shadow-card',
  lavender: 'bg-lavender border-border text-navy shadow-card',
  warm: 'bg-warm border-border text-navy shadow-card',
  sage: 'bg-sage border-border text-navy shadow-card',
  navy: 'bg-navy border-white/10 text-white shadow-card on-dark',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4 md:p-6',
  md: 'p-6 md:p-8',
  lg: 'p-6 sm:p-8 md:p-10',
};

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic HTML tag. Default: 'div' */
  as?: CardTag;
  /** Surface background tint. Default: 'white' */
  tint?: CardTint;
  /** Inner padding tier. Default: 'lg' */
  padding?: CardPadding;
  /** Optional custom class name */
  className?: string;
  /** Card content */
  children: React.ReactNode;
}

/**
 * Surface card component featuring 32px rounded corners, subtle border, and soft elevation.
 */
export function Card({
  as: Component = 'div',
  tint = 'white',
  padding = 'lg',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-card border transition-shadow',
        tintStyles[tint],
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
