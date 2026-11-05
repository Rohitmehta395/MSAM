'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { ExternalLink, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  loadZeffyScript,
  initZeffyEmbeds,
  type ZeffyGlobal,
} from '@/features/forms/zeffyScriptLoader';

export interface ZeffyDonationEmbedProps {
  /** Relative form URL for the embed script (e.g. '/embed/donation-form/donate-to-change-lives-27650') */
  formUrl?: string;
  /** Full fallback iframe URL */
  fallbackUrl?: string;
  /** Modal fallback URL */
  modalUrl?: string;
  /** Whether to lazy load the embed using IntersectionObserver. Default: true */
  lazy?: boolean;
  /** Root margin for IntersectionObserver viewport detection. Default: '250px 0px' */
  rootMargin?: string;
  /** Custom class name */
  className?: string;
}

const DEFAULT_FORM_URL = '/embed/donation-form/donate-to-change-lives-27650';
const DEFAULT_FALLBACK_URL =
  'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-27650';
const DEFAULT_MODAL_URL =
  'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-27650?modal=true';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Official Zeffy embedded donation checkout integration with lazy loading and on-demand script lifecycle.
 *
 * Optimizations:
 * 1. IntersectionObserver lazy-loading: delays iframe instantiation until user scrolls towards the donation section.
 * 2. Shared on-demand script loader: deduplicates script injection and concurrent loading.
 * 3. Complete memory reclamation on unmount (e.g. when switching tabs in Ways to Help).
 * 4. Fallback modal link and secure payment badges.
 */
export function ZeffyDonationEmbed({
  formUrl = DEFAULT_FORM_URL,
  fallbackUrl = DEFAULT_FALLBACK_URL,
  modalUrl = DEFAULT_MODAL_URL,
  lazy = true,
  rootMargin = '250px 0px',
  className,
}: ZeffyDonationEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [hasScriptError, setHasScriptError] = useState(false);
  const fallbackActiveRef = useRef(false);
  const isMounted = useIsMounted();

  // 1. IntersectionObserver for viewport lazy-loading
  useEffect(() => {
    if (!lazy || isVisible) return;

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, isVisible, rootMargin]);

  // 2. Once visible, trigger on-demand script loading and initialization
  useEffect(() => {
    if (!isVisible) return;

    let isSubscribed = true;
    let watchdogTimer: NodeJS.Timeout | null = null;

    loadZeffyScript()
      .then(() => {
        if (!isSubscribed || fallbackActiveRef.current) return;
        if (watchdogTimer) {
          clearTimeout(watchdogTimer);
          watchdogTimer = null;
        }
        requestAnimationFrame(() => {
          if (!isSubscribed || fallbackActiveRef.current) return;
          initZeffyEmbeds();
        });
      })
      .catch((err) => {
        if (!isSubscribed) return;
        if (watchdogTimer) {
          clearTimeout(watchdogTimer);
          watchdogTimer = null;
        }
        console.warn('[ZeffyDonationEmbed] Failed to load official Zeffy embed script:', err);
        fallbackActiveRef.current = true;
        setHasScriptError(true);
      });

    // Fallback watchdog (7 seconds): if network stalls, ad-blocker silently swallows, or script hangs.
    // 7s provides ample time on slow mobile connections before falling back, preventing premature triggers.
    watchdogTimer = setTimeout(() => {
      if (!isSubscribed || fallbackActiveRef.current) return;
      const currentZeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
      if (!currentZeffy?.embed?.init) {
        fallbackActiveRef.current = true;
        setHasScriptError(true);
      }
    }, 7000);

    return () => {
      isSubscribed = false;
      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
    };
  }, [isVisible, formUrl]);

  // 3. Lightweight placeholder while out of viewport
  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className={cn('flex min-h-[460px] w-full items-center justify-center rounded-xl', className)}
        aria-busy="true"
      >
        <span className="sr-only">Loading donation form...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('w-full', className)} suppressHydrationWarning>
      {/* 1. Official Zeffy Embed Mount Target: unmounted if fallback has taken over */}
      {!hasScriptError && (
        <div
          data-zeffy-embed={isMounted ? true : undefined}
          data-form-url={formUrl}
          suppressHydrationWarning
          className="min-h-[460px] w-full transition-all duration-300"
        />
      )}

      {/* 2. Official Fallback Iframe Container (rendered only when script fails or watchdog triggers) */}
      {hasScriptError && (
        <div data-zeffy-embed-fallback className="w-full space-y-4">
          <div className="border-border/40 bg-canvas/30 relative min-h-[480px] w-full overflow-hidden rounded-xl border">
            <iframe
              title="Donation form powered by Zeffy"
              className="absolute inset-0 h-full w-full border-0"
              src={fallbackUrl}
              data-zeffy-embed-src={fallbackUrl}
              allow="payment"
            />
          </div>

          {/* Informative fallback banner with direct modal link */}
          <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs text-amber-900 sm:flex-row sm:text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              <span>Standard checkout embed could not be initialized.</span>
            </div>
            <a
              href={modalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-amber-950 underline hover:text-black"
            >
              <span>Open secure donation form</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      <noscript>
        <div className="border-border/40 bg-canvas/30 relative min-h-[480px] w-full overflow-hidden rounded-xl border">
          <iframe
            title="Donation form powered by Zeffy"
            className="absolute inset-0 h-full w-full border-0"
            src={fallbackUrl}
            allow="payment"
          />
        </div>
      </noscript>

      {/* 3. Trust Badges & Accessibility Pathways */}
      <div className="border-border/40 text-navy/70 mt-4 flex flex-col items-center justify-center gap-1.5 border-t pt-3 text-center text-xs">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-medium">
          <span className="inline-flex items-center gap-1">
            <Lock
              className="h-3.5 w-3.5 shrink-0 stroke-[2.2] text-emerald-700"
              aria-hidden="true"
            />
            <span>Registered 501(c)(3), EIN 65-0637594</span>
          </span>
          <span className="text-navy/30 hidden sm:inline" aria-hidden="true">
            •
          </span>
          <span className="text-navy/80 inline-flex items-center gap-1">
            <ShieldCheck className="text-navy/60 h-3.5 w-3.5" aria-hidden="true" />
            <span>100% Free for Nonprofits via Zeffy</span>
          </span>
        </div>

        <div className="text-navy/50 text-[11px]">
          Trouble viewing the form?{' '}
          <a
            href={modalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-navy inline-flex items-center gap-0.5 font-medium underline transition-colors"
          >
            Open secure donation checkout in new window
            <ExternalLink className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
