'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import { Loader2, AlertCircle, Info, ExternalLink, Heart, Lock, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { donationIntentSchema } from '@/lib/validation';
import { homeDonationContent, type HomeDonationContent } from '@/content/home';
import type { ApiResponse } from '@/lib/api/types';
import type { DonationIntentResponse } from '@/app/api/donate/intent/route';

export interface DonationSelectorProps {
  /** Optional custom selector content override */
  selectorContent?: HomeDonationContent['selector'];
  /** Optional custom class name */
  className?: string;
}

export type DonationFrequency = 'once' | 'monthly';

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error';

/**
 * Interactive donation selection card with frequency toggle, preset amount tiles,
 * dynamic impact note, full-width CTA, and hand-off to /api/donate/intent.
 *
 * Grounded in: `design-reference/Home Page/6-Donation - updated.png`
 */
export function DonationSelector({
  selectorContent = homeDonationContent.selector,
  className,
}: DonationSelectorProps) {
  const statusId = useId();

  // 1. Frequency state ('once' | 'monthly')
  const [frequency, setFrequency] = useState<DonationFrequency>(selectorContent.defaultFrequency);

  // 2. Amount state
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    selectorContent.defaultAmount,
  );
  const [inputError, setInputError] = useState<string | null>(null);

  // 3. Submission state
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Anti-spam mount time tracking for minimum fill-time checks
  const mountTimeRef = useRef<number | null>(null);
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const activeAmount = selectedPreset;

  // Active impact note text
  const currentImpact =
    selectedPreset && selectorContent.impactNotes[selectedPreset]
      ? selectorContent.impactNotes[selectedPreset]
      : selectorContent.defaultImpactNote;

  // Preset amount tile click handler
  const handleSelectPreset = (amount: number) => {
    setSelectedPreset(amount);
    setInputError(null);
    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
      setStatusMessage(null);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionStatus === 'submitting') return;

    const finalAmount = selectedPreset ?? selectorContent.defaultAmount;

    if (!finalAmount || finalAmount <= 0) {
      setInputError('Please select a donation amount');
      return;
    }

    // Validate against shared Zod schema
    const validation = donationIntentSchema.safeParse({
      amount: finalAmount,
      frequency,
      designation: 'where-needed-most',
    });

    if (!validation.success) {
      const firstIssue = validation.error.issues[0]?.message || 'Invalid donation amount';
      setInputError(firstIssue);
      return;
    }

    setSubmissionStatus('submitting');
    setStatusMessage('Connecting to secure checkout...');
    setInputError(null);

    try {
      const res = await fetch('/api/donate/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validation.data,
          _hp: '',
          _t: mountTimeRef.current ?? Date.now(),
        }),
      });

      const json = (await res.json()) as ApiResponse<DonationIntentResponse>;

      if (!res.ok || !json.ok) {
        setSubmissionStatus('error');
        setStatusMessage(json.message || 'Unable to start checkout. Please try again.');
        return;
      }

      const redirectUrl = json.data?.redirectUrl;

      if (redirectUrl) {
        let isValidUrl = false;
        try {
          const parsed = new URL(redirectUrl);
          isValidUrl = parsed.protocol === 'https:' || parsed.protocol === 'http:';
        } catch {
          isValidUrl = false;
        }

        if (!isValidUrl) {
          setSubmissionStatus('error');
          setStatusMessage(
            'Invalid checkout destination received. Please try again or contact us directly.',
          );
          return;
        }

        setSubmissionStatus('success');
        setStatusMessage(
          'Donation intent received. Redirecting to secure checkout (please confirm your gift amount and frequency on the form)...',
        );
        if (typeof window !== 'undefined') {
          window.location.assign(redirectUrl);
        }
      } else {
        setSubmissionStatus('unconfigured');
        setStatusMessage(
          `Online checkout is currently being established. Your intent to give $${finalAmount.toLocaleString()} ${
            frequency === 'monthly' ? 'monthly' : 'once'
          } was received, but no payment was processed. For assistance, please call us at ${
            siteConfig.phoneDisplay
          }.`,
        );
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage(
        'A network error occurred while connecting. Please try again or contact us directly.',
      );
    }
  };

  // Dynamic button label: e.g. "Donate $150"
  const buttonLabel =
    activeAmount !== null && activeAmount > 0
      ? `${selectorContent.ctaBaseText} $${activeAmount.toLocaleString()}`
      : 'Select an Amount';

  const isButtonDisabled =
    submissionStatus === 'submitting' || Boolean(inputError) || activeAmount === null;

  return (
    <div
      className={cn(
        'rounded-card shadow-float border-border/50 text-navy w-full max-w-xl border bg-white p-4.5 sm:p-8 md:p-10',
        className,
      )}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* 1. Frequency Control */}
        <div>
          <SegmentedControl<DonationFrequency>
            aria-label={selectorContent.frequencyLabel}
            name="home-donation-frequency"
            value={frequency}
            onChange={(val) => {
              setFrequency(val);
              if (submissionStatus === 'error') {
                setSubmissionStatus('idle');
                setStatusMessage(null);
              }
            }}
            options={selectorContent.frequencies}
            className="w-full"
          />
        </div>

        {/* 2. Amount Options */}
        <div>
          <h3 className="text-navy font-sans text-xl font-medium tracking-tight">
            {selectorContent.amountsLabel}
          </h3>
          {selectorContent.amountsSubtitle && (
            <p className="text-navy/60 mt-0.5 text-sm">{selectorContent.amountsSubtitle}</p>
          )}

          {/* Preset Amount Grid: $5, $10, $15, $20, $150 */}
          <div
            role="radiogroup"
            aria-label="Preset donation amounts"
            className="mt-4 grid grid-cols-3 gap-3"
          >
            {selectorContent.presetAmounts.map((amount) => {
              const isChecked = selectedPreset === amount;

              return (
                <button
                  key={amount}
                  type="button"
                  role="radio"
                  aria-checked={isChecked}
                  onClick={() => handleSelectPreset(amount)}
                  className={cn(
                    'focus-visible:outline-navy flex h-14 cursor-pointer items-center justify-center rounded-2xl border text-base font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-16 sm:text-lg',
                    isChecked
                      ? 'border-gold text-navy ring-gold/40 bg-[#FAF3E2] shadow-xs ring-1'
                      : 'border-border/60 hover:border-navy/30 hover:bg-canvas/50 text-navy bg-white',
                  )}
                >
                  ${amount}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Impact Callout */}
        <div className="border-gold/30 flex items-center gap-3.5 rounded-2xl border bg-[#FAF3E2] p-4 transition-all duration-150 sm:p-4.5">
          <div className="bg-gold/80 text-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ShoppingBag className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-navy text-sm leading-snug font-semibold sm:text-base">
              {currentImpact.headline}
            </p>
            <p className="text-navy/70 mt-0.5 text-xs leading-normal sm:text-sm">
              {currentImpact.description}
            </p>
          </div>
        </div>

        {/* Status Feedback Banner */}
        {submissionStatus !== 'idle' && statusMessage && (
          <div
            id={statusId}
            role={submissionStatus === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={cn(
              'rounded-field flex items-start gap-3 border p-4 text-xs leading-relaxed sm:text-sm',
              submissionStatus === 'submitting' && 'border-border bg-canvas text-navy',
              submissionStatus === 'success' && 'border-success/30 bg-sage text-navy',
              submissionStatus === 'unconfigured' && 'border-amber-300 bg-amber-50 text-amber-900',
              submissionStatus === 'error' && 'border-danger/30 bg-rose-50 text-rose-900',
            )}
          >
            {submissionStatus === 'submitting' && (
              <Loader2
                className="text-gold mt-0.5 h-4 w-4 shrink-0 animate-spin"
                aria-hidden="true"
              />
            )}
            {submissionStatus === 'success' && (
              <ExternalLink className="text-navy mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            {submissionStatus === 'unconfigured' && (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
            )}
            {submissionStatus === 'error' && (
              <AlertCircle className="text-danger mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <div className="flex-1">
              <p>{statusMessage}</p>
            </div>
          </div>
        )}

        {/* 4. Primary Action CTA */}
        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon="none"
            disabled={isButtonDisabled}
            loading={submissionStatus === 'submitting'}
            className="h-14 text-base font-bold sm:text-lg"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Heart className="fill-navy/10 h-5 w-5 shrink-0 stroke-[2]" aria-hidden="true" />
              <span>{buttonLabel}</span>
            </span>
          </Button>

          {/* 5. Registered 501(c)(3) Notice & Lock Icon */}
          <div className="text-navy/70 flex items-center justify-center gap-1.5 text-center text-xs">
            <Lock
              className="h-3.5 w-3.5 shrink-0 stroke-[2.2] text-emerald-700"
              aria-hidden="true"
            />
            <span className="leading-tight">{selectorContent.taxExemptNotice}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
