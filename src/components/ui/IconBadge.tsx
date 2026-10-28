import React from 'react';
import { cn } from '@/lib/cn';

export type IconBadgeSize = 'sm' | 'md' | 'lg';
export type IconBadgeTint = 'lavender' | 'warm' | 'sage' | 'white' | 'gold';

const sizeStyles: Record<IconBadgeSize, string> = {
  sm: 'h-9 w-9 rounded-xl [&>svg]:h-4.5 [&>svg]:w-4.5',
  md: 'h-12 w-12 rounded-2xl [&>svg]:h-6 [&>svg]:w-6',
  lg: 'h-14 w-14 rounded-2xl [&>svg]:h-7 [&>svg]:w-7',
};

const tintStyles: Record<IconBadgeTint, string> = {
  lavender: 'bg-lavender text-navy',
  warm: 'bg-warm text-navy',
  sage: 'bg-sage text-navy',
  white: 'border-border/50 bg-white text-navy shadow-sm border',
  gold: 'bg-gold text-navy',
};

export interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon component */
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  /** Tile size tier. Default: 'md' */
  size?: IconBadgeSize;
  /** Background tint. Default: 'lavender' */
  tint?: IconBadgeTint;
  /** Optional custom class name */
  className?: string;
  /** Optional custom icon children */
  children?: React.ReactNode;
}

/**
 * Rounded square icon tile component for featured cards, steps, and visual callouts.
 */
export function IconBadge({
  icon: Icon,
  size = 'md',
  tint = 'lavender',
  className,
  children,
  ...props
}: IconBadgeProps) {
  const isLabeled = Boolean(props['aria-label']);

  return (
    <div
      role={isLabeled ? 'img' : undefined}
      aria-hidden={isLabeled ? undefined : (props['aria-hidden'] ?? true)}
      className={cn(
        'inline-flex shrink-0 items-center justify-center select-none',
        sizeStyles[size],
        tintStyles[tint],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="shrink-0" aria-hidden="true" />}
      {children}
    </div>
  );
}
