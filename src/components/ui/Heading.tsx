import React from 'react';
import { cn } from '@/lib/cn';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = 'display' | 'section' | 'statement' | 'card';

const variantStyles: Record<HeadingVariant, string> = {
  display: 'text-display',
  section: 'text-section',
  statement: 'text-statement',
  card: 'text-card-title',
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading tag. Default: 'h2' */
  as?: HeadingTag;
  /** Visual typography variant controlling styling independently of the semantic tag. Default: 'section' */
  variant?: HeadingVariant;
  /** If true, applies light text coloring for dark surfaces. Default: false */
  onDark?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Heading content */
  children: React.ReactNode;
}

/**
 * Semantic heading component with visual styles decoupled from HTML tag hierarchy.
 */
export function Heading({
  as: Component = 'h2',
  variant = 'section',
  onDark = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(variantStyles[variant], onDark ? 'text-white' : 'text-navy', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
