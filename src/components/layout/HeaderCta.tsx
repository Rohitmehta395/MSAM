'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Button,
  type ButtonVariant,
  type ButtonIcon,
  type ButtonSize,
} from '@/components/ui/Button';
import { headerCtas, type NavItem } from '@/content/navigation';
import { cn } from '@/lib/cn';

export interface HeaderCtaProps {
  /** Navigation item containing label and href */
  item: NavItem;
  /** Button visual style variant. Default: 'secondary' */
  variant?: ButtonVariant;
  /** Trailing decorative icon. Default: 'none' */
  icon?: ButtonIcon;
  /** Button sizing tier. Default: 'md' */
  size?: ButtonSize;
  /** Optional custom class name */
  className?: string;
}

/**
 * Client CTA button wrapper that activates route-specific states (e.g. lavender-deep fill on /get-help).
 */
export function HeaderCta({
  item,
  variant = 'secondary',
  icon = 'none',
  size = 'md',
  className,
}: HeaderCtaProps) {
  const pathname = usePathname();

  // Active state for 'Get Food Support' pathway (/get-help)
  const isGetHelpActive =
    item.href === '/get-help' && (pathname === '/get-help' || pathname?.startsWith('/get-help/'));

  return (
    <Button
      href={item.href}
      variant={variant}
      size={size}
      icon={icon}
      className={cn(
        isGetHelpActive &&
          'bg-lavender-deep hover:bg-lavender-deep/90 active:bg-lavender-deep/80 focus-visible:outline-navy border-transparent text-white',
        className,
      )}
    >
      {item.label}
    </Button>
  );
}

export interface HeaderCtasProps {
  /** Optional custom container class name */
  className?: string;
  /** Button sizing tier. Default: 'md' */
  size?: ButtonSize;
}

/**
 * Group of desktop header CTA buttons using centralized navigation configuration.
 */
export function HeaderCtas({ className, size = 'md' }: HeaderCtasProps) {
  const getHelpCta = headerCtas.find((c) => c.href === '/get-help') ?? headerCtas[0];
  const donateCta = headerCtas.find((c) => c.href === '/donate') ?? headerCtas[1];

  return (
    <div className={cn('flex items-center gap-2.5 xl:gap-3', className)}>
      {getHelpCta && (
        <HeaderCta
          item={getHelpCta}
          variant="secondary"
          icon="arrow"
          size={size}
          className="px-4.5 text-sm xl:px-6 xl:text-base"
        />
      )}
      {donateCta && (
        <HeaderCta
          item={donateCta}
          variant="primary"
          icon="heart"
          size={size}
          className="px-4.5 text-sm xl:px-6 xl:text-base"
        />
      )}
    </div>
  );
}
