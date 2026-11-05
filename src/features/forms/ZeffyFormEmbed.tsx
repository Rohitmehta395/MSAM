'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { loadZeffyScript, initZeffyEmbeds, type ZeffyGlobal } from './zeffyScriptLoader';

export interface ZeffyFormEmbedProps {
  /** Relative form URL for the embed script (e.g. '/en-US/embed/newsletter-form/volunteer-interest-form-11') */
  formPath: string;
  /** Full fallback iframe URL */
  fallbackUrl: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Minimum container height during loading / fallback. Set to 'auto' to allow natural content height. Default: '280px' */
  minHeight?: string | number;
  /** Whether to lazy load the embed using IntersectionObserver. Default: true */
  lazy?: boolean;
  /** Root margin for IntersectionObserver viewport detection. Default: '250px 0px' */
  rootMargin?: string;
  /** Optional custom class name for the wrapper */
  className?: string;
  /** Optional custom class name for the fallback container */
  fallbackClassName?: string;
  /** Optional custom class name for the [data-zeffy-embed] element */
  embedClassName?: string;
  /** Optional inline styles for the [data-zeffy-embed] element */
  embedStyle?: React.CSSProperties;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Reusable official Zeffy embedded form component with lazy-loading and on-demand script lifecycle.
 *
 * Optimizations:
 * 1. IntersectionObserver lazy-loading: delays iframe creation and script fetching until the embed
 *    approaches the viewport, dramatically reducing initial page load weight and third-party requests.
 * 2. On-demand script loader: loads https://www.zeffy.com/embed/v2/zeffy-embed.js once only when needed.
 * 3. Zero layout shift: reserves height during loading/placeholder state.
 * 4. Proper cleanup: observer disconnects and unmounting completely releases iframe memory.
 */
export function ZeffyFormEmbed({
  formPath,
  fallbackUrl,
  title = 'Signup form powered by Zeffy',
  minHeight = '280px',
  lazy = true,
  rootMargin = '250px 0px',
  className,
  fallbackClassName,
  embedClassName,
  embedStyle,
}: ZeffyFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [hasScriptError, setHasScriptError] = useState(false);
  const fallbackActiveRef = useRef(false);
  const isMounted = useIsMounted();

  // 1. IntersectionObserver to detect when embed approaches viewport
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
        console.warn(`[ZeffyFormEmbed] Failed to load official Zeffy embed script for ${formPath}:`, err);
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
  }, [isVisible, formPath]);

  const isAutoMinHeight = minHeight === 'auto' || minHeight === undefined;
  const minHeightStyle = isAutoMinHeight
    ? undefined
    : typeof minHeight === 'number'
      ? `${minHeight}px`
      : minHeight;
  const fallbackMinHeight = minHeightStyle || '240px';

  // 3. Render lightweight placeholder until approached
  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className={cn('w-full', className)}
        style={{ minHeight: minHeightStyle }}
        aria-busy="true"
      >
        <div
          className={cn(
            'flex w-full items-center justify-center rounded-xl transition-colors',
            embedClassName,
          )}
          style={{ minHeight: fallbackMinHeight, ...embedStyle }}
        >
          <span className="sr-only">Loading form...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('w-full', className)} suppressHydrationWarning>
      {/* 1. Official Zeffy Embed Mount Target: unmounted if fallback has taken over */}
      {!hasScriptError && (
        <div
          data-zeffy-embed={isMounted ? true : undefined}
          data-form-url={formPath}
          suppressHydrationWarning
          style={{
            ...(minHeightStyle ? { minHeight: minHeightStyle } : {}),
            ...embedStyle,
          }}
          className={cn(
            'w-full transition-all duration-300',
            embedClassName,
          )}
        />
      )}

      {/* 2. Official Fallback Iframe Container (rendered only when script fails or watchdog triggers) */}
      {hasScriptError && (
        <div
          data-zeffy-embed-fallback
          className={cn('w-full space-y-3', fallbackClassName)}
        >
          <div
            className="border-border/40 bg-canvas/30 relative w-full overflow-hidden rounded-xl border"
            style={{ minHeight: fallbackMinHeight }}
          >
            <iframe
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              src={fallbackUrl}
              data-zeffy-embed-src={fallbackUrl}
              allow="payment"
            />
          </div>

          {/* Fallback direct link banner */}
          <div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/90 p-3 text-xs text-amber-900 sm:flex-row sm:text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              <span>Standard form embed could not be initialized.</span>
            </div>
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-amber-950 underline hover:text-black"
            >
              <span>Open form in new window</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      <noscript>
        <div
          className="border-border/40 bg-canvas/30 relative w-full overflow-hidden rounded-xl border"
          style={{ minHeight: fallbackMinHeight }}
        >
          <iframe
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            src={fallbackUrl}
            allow="payment"
          />
        </div>
      </noscript>
    </div>
  );
}
