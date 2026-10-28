'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

export interface NavLinkProps {
  /** Target URL destination */
  href: string;
  /** Navigation display text or elements */
  children: React.ReactNode;
  /** Optional custom class name */
  className?: string;
  /**
   * Explicit control over exact vs prefix matching.
   * If omitted, routes under /community use prefix matching while others use exact matching.
   */
  exact?: boolean;
}

/**
 * Client navigation link with accessible active page indicator and 2px gold underline.
 */
export function NavLink({ href, children, className, exact }: NavLinkProps) {
  const pathname = usePathname();

  // Active route matching:
  // The 'Community' pathway is active for /community and any /community/* subroute.
  // Other navigation items default to exact path matching.
  const isCommunityRoute = href === '/community' || href.startsWith('/community/');
  const isExactMatch = exact ?? !isCommunityRoute;

  const isActive = isExactMatch
    ? pathname === href
    : pathname === '/community' || pathname?.startsWith('/community/');

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group text-navy relative inline-flex h-11 items-center px-1 text-[15px] select-none',
        'transition-colors duration-150 ease-out',
        'focus-visible:outline-navy rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4',
        isActive ? 'font-semibold' : 'hover:text-navy/80 font-normal',
        className,
      )}
    >
      <span className="relative py-1">
        {children}
        {isActive && (
          <span
            className="bg-gold absolute inset-x-0 -bottom-1 h-[2px] rounded-full"
            aria-hidden="true"
          />
        )}
      </span>
    </Link>
  );
}
