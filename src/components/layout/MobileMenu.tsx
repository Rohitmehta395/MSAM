'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { primaryNav, headerCtas, urgentMessage } from '@/content/navigation';
import { Logo } from '@/components/media/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export interface MobileMenuProps {
  /** Optional custom class name for trigger container */
  className?: string;
}

/**
 * Accessible mobile navigation sheet powered by native HTML <dialog>.
 * Client island providing accessible modal focus containment, scroll locking, and touch navigation.
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const originalOverflowRef = useRef<string>('');
  const pathname = usePathname();

  // Dialog native close handler (restores body scroll and state)
  const handleDialogClose = useCallback(() => {
    document.body.style.overflow = originalOverflowRef.current;
    setIsOpen(false);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }

    if (restoreFocus && typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!dialogRef.current) return;
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current.showModal();
    setIsOpen(true);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  }, [isOpen, closeMenu, openMenu]);

  // Close on outside (backdrop) click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const isInPanel =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!isInPanel) {
      closeMenu(true);
    }
  };

  // Close modal when route changes
  useEffect(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [pathname]);

  // Close when viewport expands to desktop (>= 1024px) without focusing hidden trigger
  useEffect(() => {
    const checkDesktop = () => {
      if (window.innerWidth >= 1024 && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };

    const mql = window.matchMedia('(min-width: 1024px)');
    const handleViewportChange = (e: MediaQueryListEvent) => {
      if (e.matches && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };

    mql.addEventListener('change', handleViewportChange);
    window.addEventListener('resize', checkDesktop);

    return () => {
      mql.removeEventListener('change', handleViewportChange);
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, []);

  const getHelpCta = headerCtas.find((c) => c.href === '/get-help') ?? headerCtas[0];
  const donateCta = headerCtas.find((c) => c.href === '/donate') ?? headerCtas[1];
  const isGetHelpActive =
    pathname === '/get-help' || (pathname ? pathname.startsWith('/get-help/') : false);

  return (
    <div className={cn('relative lg:hidden', className)}>
      {/* Mobile trigger button */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-dialog"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={toggleMenu}
        className={cn(
          'rounded-field text-navy inline-flex h-11 w-11 items-center justify-center select-none',
          'hover:bg-navy/5 active:bg-navy/10 transition-colors duration-150',
          'focus-visible:outline-navy focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 shrink-0" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6 shrink-0" aria-hidden="true" />
        )}
      </button>

      {/* Native HTML Dialog Sheet */}
      <dialog
        id="mobile-navigation-dialog"
        ref={dialogRef}
        aria-labelledby="mobile-nav-title"
        onCancel={(e) => {
          e.preventDefault();
          closeMenu(true);
        }}
        onClose={handleDialogClose}
        onClick={handleDialogClick}
        className={cn(
          'fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0',
          'backdrop:bg-navy/50 backdrop:backdrop-blur-xs',
        )}
      >
        <div
          ref={panelRef}
          className={cn(
            'border-border shadow-float ml-auto flex h-full w-full max-w-[360px] flex-col border-l bg-white sm:max-w-sm',
            'transition-transform duration-300 ease-out motion-reduce:transition-none',
          )}
        >
          {/* Sheet header with logo and close button */}
          <div className="border-border flex h-[72px] shrink-0 items-center justify-between border-b px-5">
            <Link
              href="/"
              onClick={() => closeMenu(false)}
              aria-label="Manna Share A Meal Home"
              className="focus-visible:outline-navy inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Logo variant="header" className="h-9 w-auto" />
            </Link>

            <button
              type="button"
              autoFocus
              onClick={() => closeMenu(true)}
              aria-label="Close menu"
              className={cn(
                'rounded-field text-navy inline-flex h-11 w-11 items-center justify-center select-none',
                'hover:bg-navy/5 active:bg-navy/10 transition-colors duration-150',
                'focus-visible:outline-navy focus-visible:outline-2 focus-visible:outline-offset-2',
              )}
            >
              <X className="h-6 w-6 shrink-0" aria-hidden="true" />
            </button>
          </div>

          <h2 id="mobile-nav-title" className="sr-only">
            Site Navigation
          </h2>

          {/* Scrollable sheet body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
            {/* Primary navigation list */}
            <nav aria-label="Mobile Primary">
              <ul role="list" className="space-y-2">
                {primaryNav.map((item) => {
                  const isCommunity =
                    item.href === '/community' || item.href.startsWith('/community/');
                  const isActive = isCommunity
                    ? pathname === '/community' ||
                      (pathname ? pathname.startsWith('/community/') : false)
                    : pathname === item.href;

                  return (
                    <li key={item.href} className="space-y-1">
                      <Link
                        href={item.href}
                        onClick={() => closeMenu(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-[44px] w-full items-center py-2 text-[19px] transition-colors duration-150',
                          'focus-visible:outline-navy rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2',
                          isActive
                            ? 'text-navy font-semibold'
                            : 'text-navy/85 hover:text-navy font-normal',
                        )}
                      >
                        <span className="relative">
                          {item.label}
                          {isActive && (
                            <span
                              className="bg-gold absolute inset-x-0 -bottom-1 h-[2px] rounded-full"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Link>

                      {/* Expanded Community child links */}
                      {item.children && item.children.length > 0 && (
                        <ul
                          role="list"
                          aria-label={`${item.label} sub-routes`}
                          className="border-lavender mt-1 ml-2 space-y-1 border-l-2 pl-4"
                        >
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => closeMenu(false)}
                                  aria-current={isChildActive ? 'page' : undefined}
                                  className={cn(
                                    'inline-flex min-h-[40px] w-full items-center py-1.5 text-base transition-colors duration-150',
                                    'focus-visible:outline-navy rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2',
                                    isChildActive
                                      ? 'text-navy font-semibold'
                                      : 'text-muted hover:text-navy font-normal',
                                  )}
                                >
                                  <span className="relative">
                                    {child.label}
                                    {isChildActive && (
                                      <span
                                        className="bg-gold absolute inset-x-0 -bottom-1 h-[2px] rounded-full"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <hr className="border-border" />

            {/* Call to action buttons */}
            <div className="space-y-3 pt-1">
              {getHelpCta && (
                <Button
                  href={getHelpCta.href}
                  variant="secondary"
                  size="lg"
                  icon="arrow"
                  fullWidth
                  onClick={() => closeMenu(false)}
                  className={cn(
                    isGetHelpActive &&
                      'bg-lavender-deep hover:bg-lavender-deep/90 active:bg-lavender-deep/80 border-transparent text-white',
                  )}
                >
                  {getHelpCta.label}
                </Button>
              )}

              {donateCta && (
                <Button
                  href={donateCta.href}
                  variant="primary"
                  size="lg"
                  icon="heart"
                  fullWidth
                  onClick={() => closeMenu(false)}
                >
                  {donateCta.label}
                </Button>
              )}
            </div>

            {/* Direct-dial telephone prayer link */}
            <div className="pt-2 text-center">
              <a
                href={urgentMessage.phoneHref}
                onClick={() => closeMenu(false)}
                className={cn(
                  'rounded-field text-navy/90 hover:text-navy inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold',
                  'focus-visible:outline-navy transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
              >
                <Phone className="text-gold h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{urgentMessage.text}</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
