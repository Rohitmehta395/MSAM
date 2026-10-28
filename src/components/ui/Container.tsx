import React from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HTML element or component to render as. Default: 'div' */
  as?: React.ElementType;
  /** Content children */
  children?: React.ReactNode;
  /** Optional custom class name */
  className?: string;
}

/**
 * Centered layout container with responsive horizontal padding and max width 1296px.
 */
export function Container({
  as: Component = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-[1296px] px-5 sm:px-8 lg:px-12 xl:px-[72px]', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
