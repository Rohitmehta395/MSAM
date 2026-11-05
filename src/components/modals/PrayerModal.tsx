'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { bibleVerses, getRandomVerse, type BibleVerse } from '@/content/verses';

export interface PrayerModalProps {
  /** Controlled open state */
  isOpen: boolean;
  /** Callback fired when dialog requests close (Escape, backdrop click, or close button) */
  onClose: () => void;
  /** Optional element ID to return focus to after closing */
  restoreFocusId?: string;
  /** Optional custom class name for the dialog container */
  className?: string;
}

/**
 * MSAM Clean & Dignified Random Bible Verse Prayer Modal.
 *
 * Design:
 * - Wide card (`max-w-2xl` / 672px) so the entire content fits comfortably without vertical scrolling on desktop/laptop.
 * - Restrained, clean typography and editorial styling matching MSAM's core aesthetic.
 * - Removed gimmicky decorative icons/badges, keeping only purpose-driven, relevant controls (close button, phone CTA).
 * - Accessible native <dialog showModal()> with keyboard focus trap, Escape dismissal, backdrop click dismiss, and focus restoration.
 */
export function PrayerModal({
  isOpen,
  onClose,
  restoreFocusId,
  className,
}: PrayerModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const originalOverflowRef = useRef<string>('');
  const lastIndexRef = useRef<number>(0);

  // Deterministic initial verse (index 0) prevents SSR hydration mismatches
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(bibleVerses[0]);

  // When isOpen transitions to true, pick a fresh, non-repeating verse
  useEffect(() => {
    if (isOpen) {
      const { verse, index } = getRandomVerse(lastIndexRef.current);
      lastIndexRef.current = index;
      setCurrentVerse(verse);
    }
  }, [isOpen]);

  // Synchronize modal state with native HTML dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        originalOverflowRef.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        try {
          dialog.showModal();
        } catch {
          // Fallback if already open or polyfilled
        }
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = originalOverflowRef.current;
      if (restoreFocusId) {
        requestAnimationFrame(() => {
          document.getElementById(restoreFocusId)?.focus();
        });
      }
    }

    return () => {
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [isOpen, restoreFocusId]);

  // Native dialog cancel / close event (e.g. Escape key)
  const handleDialogClose = useCallback(() => {
    document.body.style.overflow = originalOverflowRef.current;
    onClose();
  }, [onClose]);

  // Backdrop click dismiss: closes when clicking outside the panel
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
      return;
    }
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!isInside) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="prayer-modal-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prayer-modal-title"
      aria-describedby="prayer-modal-description"
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className={cn(
        'fixed inset-0 z-50 m-auto p-0',
        'w-[calc(100%-2rem)] max-w-2xl',
        'rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xl',
        'backdrop:bg-navy/70 backdrop:backdrop-blur-sm',
        'open:flex open:flex-col',
        'max-h-[92vh] overflow-hidden',
        'motion-safe:transition-all motion-safe:duration-200',
        className,
      )}
    >
      <div
        ref={panelRef}
        className="flex max-h-[92vh] flex-col overflow-y-auto p-5 sm:p-7"
      >
        {/* Top Header Row: Clean Gold Eyebrow & Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-gold h-1 w-5 rounded-full" aria-hidden="true" />
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              A Moment of Hope
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close prayer modal"
            className="text-slate-400 hover:text-navy hover:bg-slate-100 focus-visible:outline-navy -mr-1.5 -mt-1.5 flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Heading & Compassionate Subtext */}
        <div className="mt-2">
          <h2
            id="prayer-modal-title"
            className="text-navy font-serif text-xl font-bold tracking-tight sm:text-2xl lg:text-[26px]"
          >
            You are not alone.
          </h2>
          <p
            id="prayer-modal-description"
            className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm"
          >
            Whatever you&apos;re going through, we&apos;re here to listen and pray with you.
          </p>
        </div>

        {/* Section: A Verse For Today (Clean Editorial Card) */}
        <div className="mt-3.5 rounded-xl border border-amber-200/60 bg-[#FBF8F3] p-4 sm:p-5">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800/80 sm:text-xs">
            A verse for today
          </p>
          <blockquote className="border-gold/70 border-l-2 py-0.5 pl-3.5 sm:pl-4">
            <p className="font-serif text-sm leading-relaxed text-slate-800 italic sm:text-base">
              {currentVerse.text}
            </p>
            <footer className="mt-2 text-right">
              <cite className="not-italic font-sans text-xs font-semibold text-slate-700">
                — {currentVerse.reference}{' '}
                <span className="font-normal text-slate-400">({currentVerse.translation})</span>
              </cite>
            </footer>
          </blockquote>
        </div>

        {/* Section: Compact Contact & Call for Prayer Bar */}
        <div className="mt-3.5 flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div>
            <h3 className="text-navy font-serif text-sm font-bold sm:text-base">
              Would you like someone to pray with you?
            </h3>
            <p className="mt-0.5 text-xs text-slate-600">
              We&apos;re here to listen. Call{' '}
              <a
                href={siteConfig.phoneHref}
                className="text-navy font-semibold hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>

          <Button
            href={siteConfig.phoneHref}
            variant="primary"
            size="sm"
            className="min-h-[40px] shrink-0 justify-center shadow-xs sm:w-auto"
          >
            <Phone className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Call us for prayer</span>
          </Button>
        </div>

        {/* Subtle Closing Tagline */}
        <div className="mt-3 text-center sm:mt-4">
          <p className="font-serif text-[11px] italic text-slate-400 sm:text-xs">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </dialog>
  );
}
