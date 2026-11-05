'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ZeffyFormEmbedProps {
  /** Relative form URL for the embed script (e.g. '/en-US/embed/newsletter-form/volunteer-interest-form-11') */
  formPath: string;
  /** Full fallback iframe URL */
  fallbackUrl: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Minimum container height during loading / fallback. Set to 'auto' to allow natural content height. Default: '280px' */
  minHeight?: string | number;
  /** Optional custom class name for the wrapper */
  className?: string;
  /** Optional custom class name for the fallback container */
  fallbackClassName?: string;
  /** Optional custom class name for the [data-zeffy-embed] element */
  embedClassName?: string;
  /** Optional inline styles for the [data-zeffy-embed] element */
  embedStyle?: React.CSSProperties;
}

const ZEFFY_EMBED_SCRIPT_URL = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';

interface ZeffyGlobal {
  embed?: {
    version?: string;
    init: () => void;
  };
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
 * Reusable official Zeffy embedded form component for Next.js App Router.
 *
 * Implements:
 * 1. Single script load of https://www.zeffy.com/embed/v2/zeffy-embed.js using Next.js Script deduplication (`id="zeffy-embed-v2"`).
 * 2. Client-side re-initialization hook on route changes / mounts.
 * 3. Official fallback mechanism if script is blocked or fails to load.
 * 4. Responsive iframe sizing with accessible title and overflow handling.
 */
export function ZeffyFormEmbed({
  formPath,
  fallbackUrl,
  title = 'Signup form powered by Zeffy',
  minHeight = '280px',
  className,
  fallbackClassName,
  embedClassName,
  embedStyle,
}: ZeffyFormEmbedProps) {
  const [hasScriptError, setHasScriptError] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {

    // If Zeffy script is already loaded on window (e.g. client-side navigation),
    // trigger init() to scan and bind the newly mounted data-zeffy-embed element.
    if (typeof window !== 'undefined') {
      const zeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
      if (zeffy?.embed?.init) {
        try {
          zeffy.embed.init();
        } catch (err) {
          console.warn('[ZeffyFormEmbed] Error initializing Zeffy embed:', err);
        }
      } else {
        // Fallback watchdog: if script fails to load or is blocked by an extension without firing onError
        const timer = setTimeout(() => {
          const currentZeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
          if (!currentZeffy?.embed?.init) {
            setHasScriptError(true);
          }
        }, 3500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const isAutoMinHeight = minHeight === 'auto' || minHeight === undefined;
  const minHeightStyle = isAutoMinHeight
    ? undefined
    : typeof minHeight === 'number'
      ? `${minHeight}px`
      : minHeight;
  const fallbackMinHeight = minHeightStyle || '240px';

  return (
    <div className={cn('w-full', className)} suppressHydrationWarning>
      {/* 1. Official Zeffy Embed Script via Next.js Script (deduplicated by id="zeffy-embed-v2") */}
      <Script
        id="zeffy-embed-v2"
        src={ZEFFY_EMBED_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            const zeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
            if (zeffy?.embed?.init) {
              try {
                zeffy.embed.init();
              } catch (err) {
                console.warn('[ZeffyFormEmbed] Error in onLoad init:', err);
              }
            }
          }
        }}
        onError={() => {
          console.warn(
            `[ZeffyFormEmbed] Failed to load official Zeffy embed script for ${formPath}. Activating fallback iframe.`,
          );
          setHasScriptError(true);
        }}
      />

      {/* 2. Official Zeffy Embed Mount Target */}
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
          hasScriptError && 'hidden',
        )}
      />

      {/* 3. Official Fallback Iframe Container (rendered when script fails or is blocked) */}
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
