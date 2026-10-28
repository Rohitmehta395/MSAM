import React from 'react';
import { cn } from '@/lib/cn';

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** If true, applies light text coloring for dark surfaces. Default: false */
  onDark?: boolean;
  /** HTML element or component to render as. Default: 'p' */
  as?: React.ElementType;
  /** Optional custom class name */
  className?: string;
  /** Paragraph content */
  children: React.ReactNode;
}

/**
 * Editorial lead paragraph styled with accessible 18px / 1.6 typography.
 */
export function Lead({
  onDark = false,
  as: Component = 'p',
  className,
  children,
  ...props
}: LeadProps) {
  return (
    <Component
      className={cn('text-lead', onDark ? 'text-white/80' : 'text-navy/80', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
