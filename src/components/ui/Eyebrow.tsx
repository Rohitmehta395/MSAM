import React from 'react';
import { cn } from '@/lib/cn';

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If true, applies light text coloring for dark surfaces. Default: false */
  onDark?: boolean;
  /** HTML element or component to render as. Default: 'div' */
  as?: React.ElementType;
  /** Optional custom class name */
  className?: string;
  /** Eyebrow label content */
  children: React.ReactNode;
}

/**
 * Section eyebrow combining a 24px gold dash with uppercase label typography.
 */
export function Eyebrow({
  onDark = false,
  as: Component = 'div',
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Component
      className={cn(
        'text-label inline-flex items-center gap-2.5',
        onDark ? 'text-white/90' : 'text-navy',
        className,
      )}
      {...props}
    >
      <span className="bg-gold h-[2px] w-6 shrink-0 rounded-full" aria-hidden="true" />
      <span>{children}</span>
    </Component>
  );
}
