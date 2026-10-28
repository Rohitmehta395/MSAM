import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/media/Logo';
import { primaryNav } from '@/content/navigation';
import { NavLink } from '@/components/layout/NavLink';
import { HeaderCtas } from '@/components/layout/HeaderCta';
import { cn } from '@/lib/cn';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional custom class name */
  className?: string;
}

/**
 * Main site header component rendering the brand logo, desktop primary navigation, and CTAs.
 * Server Component with client island sub-components for pathname-dependent active states.
 */
export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn('border-border relative w-full border-b bg-white select-none', className)}
      {...props}
    >
      <Container className="flex h-[88px] max-w-[1440px] items-center justify-between">
        {/* Brand logo linked to home */}
        <Link
          href="/"
          aria-label="Manna Share A Meal Home"
          className="focus-visible:outline-navy inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Logo variant="header" className="h-11 w-auto sm:h-12" />
        </Link>

        {/* Primary desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-8">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop call-to-action buttons */}
        <div className="hidden lg:flex lg:items-center">
          <HeaderCtas />
        </div>

        {/* Reserved slot for future mobile menu trigger (Part 3.3) */}
        <div className="flex items-center lg:hidden" aria-hidden="true">
          {/* MobileMenu trigger placeholder */}
        </div>
      </Container>
    </header>
  );
}
