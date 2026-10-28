import React from 'react';
import { cn } from '@/lib/cn';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target element ID to skip to without leading hash. Default: 'main' */
  targetId?: string;
  /** Optional custom class name */
  className?: string;
}

/**
 * Accessible keyboard navigation skip link that becomes visible on focus.
 * Directs focus past repetitive navigation header directly to the primary main landmark.
 */
export function SkipLink({ targetId = 'main', className, ...props }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={cn('skip-link', className)} {...props}>
      Skip to main content
    </a>
  );
}
