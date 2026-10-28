import React from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export type SectionTone = 'canvas' | 'white' | 'lavender' | 'warm' | 'cream' | 'navy';
export type SectionSpacing = 'sm' | 'md' | 'lg' | 'none';

const toneStyles: Record<SectionTone, string> = {
  canvas: 'bg-canvas text-navy',
  white: 'bg-white text-navy',
  lavender: 'bg-lavender text-navy',
  warm: 'bg-warm text-navy',
  cream: 'bg-cream text-navy',
  navy: 'bg-navy text-white on-dark',
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-[72px]',
  lg: 'py-14 md:py-[88px]',
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Background tone for the section surface. Default: 'canvas' */
  tone?: SectionTone;
  /** Vertical padding scale. Default: 'lg' */
  spacing?: SectionSpacing;
  /** If true, skips wrapping children in a Container for full-width content. Default: false */
  bleed?: boolean;
  /** HTML element or component to render as. Default: 'section' */
  as?: React.ElementType;
  /** Section identifier for navigation and anchors */
  id?: string;
  /** Optional custom class name for the section wrapper */
  className?: string;
  /** Optional custom class name for the inner Container when bleed is false */
  containerClassName?: string;
  /** Section content */
  children?: React.ReactNode;
}

/**
 * Top-level page section establishing background tone, vertical rhythm, and container boundary.
 */
export function Section({
  tone = 'canvas',
  spacing = 'lg',
  bleed = false,
  as: Component = 'section',
  id,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn('relative w-full', toneStyles[tone], spacingStyles[spacing], className)}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Component>
  );
}
