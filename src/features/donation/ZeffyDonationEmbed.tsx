'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { ExternalLink, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ZeffyDonationEmbedProps {
  /** Relative form URL for the embed script (e.g. '/embed/donation-form/donate-to-change-lives-27650') */
  formUrl?: string;
  /** Full fallback iframe URL */
  fallbackUrl?: string;
  /** Modal fallback URL */
  modalUrl?: string;
  /** Custom class name */
  className?: string;
}

const DEFAULT_FORM_URL = '/embed/donation-form/donate-to-change-lives-27650';
const DEFAULT_FALLBACK_URL =
  'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-27650';
const DEFAULT_MODAL_URL =
  'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-27650?modal=true';
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
 * Official Zeffy embedded donation checkout integration for Next.js App Router.
 *
 * Implements:
 * 1. Single script load of https://www.zeffy.com/embed/v2/zeffy-embed.js using Next.js Script.
 * 2. Client-side re-initialization hook on route changes.
 * 3. Official fallback mechanism if script is blocked or fails to load.
 * 4. Modal checkout fallback link (`?modal=true`) opened in a secure new tab.
 * 5. Dynamic height adaptation without cutting off form fields.
 */
export function ZeffyDonationEmbed({
  formUrl = DEFAULT_FORM_URL,
  fallbackUrl = DEFAULT_FALLBACK_URL,
  modalUrl = DEFAULT_MODAL_URL,
  className,
}: ZeffyDonationEmbedProps) {
  const [hasScriptError, setHasScriptError] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    // If Zeffy script is already loaded on window (e.g. client-side navigation back to Home),
    // trigger init() to scan and bind the newly mounted data-zeffy-embed element.
    if (typeof window !== 'undefined') {
      const zeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
      if (zeffy?.embed?.init) {
        try {
          zeffy.embed.init();
        } catch (err) {
          console.warn('[ZeffyEmbed] Error initializing Zeffy embed:', err);
        }
      }
    }
  }, []);

  return (
    <div className={cn('w-full', className)} suppressHydrationWarning>
      {/* 1. Official Zeffy Embed Script via Next.js Script */}
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
                console.warn('[ZeffyEmbed] Error in onLoad init:', err);
              }
            }
          }
        }}
        onError={() => {
          console.warn(
            '[ZeffyEmbed] Failed to load official Zeffy embed script. Activating fallback iframe.',
          );
          setHasScriptError(true);
        }}
      />

      {/* 2. Official Zeffy Embed Mount Target */}
      <div
        data-zeffy-embed={isMounted ? true : undefined}
        data-form-url={formUrl}
        suppressHydrationWarning
        className={cn(
          'min-h-[460px] w-full transition-all duration-300',
          hasScriptError && 'hidden',
        )}
      />

      {/* 3. Official Fallback Iframe Container (rendered when script fails or is blocked) */}
      {hasScriptError && (
        <div
          data-zeffy-embed-fallback
          className="w-full space-y-4"
        >
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

      {/* 4. Trust Badges & Accessibility Pathways */}
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
