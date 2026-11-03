'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { communitySubNav, type NavItem } from '@/content/navigation';

export interface CommunitySubNavProps {
  /** Optional custom class name */
  className?: string;
  /** Optional navigation items override */
  items?: readonly NavItem[];
}

/**
 * Community sub-navigation bar for nested routing under /community/*.
 *
 * Grounded in Figma frame:
 * `design-reference/Community Page/Community sub-navigation - After Header.png` (1440 × 58 px).
 *
 * Specifications:
 * - Surface: Full-bleed soft lavender bar (`bg-lavender` / `#F2EDFA`), height 58px (`h-[58px]`).
 * - Centered navigation items: Food Providers, Volunteers, Partners.
 * - Active State: Deep lavender full-height pill background (`bg-lavender-deep` / `#CDB5E8`),
 *   navy bold text (`text-navy font-semibold`), and `aria-current="page"`.
 * - Inactive State: Navy medium text (`text-navy font-medium`), subtle hover highlight (`hover:bg-lavender-deep/40`).
 * - Accessibility: `<nav aria-label="Community navigation">` landmark with semantic list structure
 *   and high-visibility keyboard focus rings (`focus-visible:outline-navy focus-visible:outline-offset-[-2px]`).
 * - Responsiveness: Centered on desktop/tablet, smooth horizontal scroll container on narrow mobile viewports.
 */
export function CommunitySubNav({ className, items = communitySubNav }: CommunitySubNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Community navigation"
      className={cn('bg-lavender relative w-full select-none', className)}
    >
      <div className="mx-auto flex h-[58px] max-w-7xl items-center justify-center px-4 sm:px-6">
        <ul
          className="no-scrollbar flex h-full items-center justify-center overflow-x-auto"
          role="list"
        >
          {items.map((item) => {
            const isActive =
              pathname === item.href || (pathname?.startsWith(`${item.href}/`) ?? false);

            return (
              <li key={item.href} className="h-full shrink-0">
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-full items-center justify-center px-4 text-sm whitespace-nowrap transition-colors duration-150 sm:px-6 sm:text-base',
                    'focus-visible:outline-navy focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                    isActive
                      ? 'bg-lavender-deep text-navy font-semibold'
                      : 'text-navy hover:bg-lavender-deep/40 font-medium',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
