'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import { Loader2, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ChipToggle } from '@/components/form/ChipToggle';
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
 * custom amount input, dynamic CTA, and hand-off to /api/donate/intent.
 */
export function DonationSelector({
  selectorContent = homeDonationContent.selector,
  className,
}: DonationSelectorProps) {
  const customInputId = useId();
  const errorId = useId();
  const statusId = useId();

  // 1. Frequency state ('once' | 'monthly')
  const [frequency, setFrequency] = useState<DonationFrequency>(selectorContent.defaultFrequency);

  // 2. Amount state
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    selectorContent.defaultAmount,
  );
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);

  // 3. Submission state
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Anti-spam mount time tracking for minimum fill-time checks
  const mountTimeRef = useRef<number | null>(null);
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Active numerical amount calculation
  const parsedCustom = parseFloat(customAmountInput);
  const isCustomValid =
    isCustom &&
    !customAmountInput.startsWith('-') &&
    !isNaN(parsedCustom) &&
    parsedCustom > 0 &&
    parsedCustom <= 100000;
  const activeAmount = isCustom ? (isCustomValid ? parsedCustom : null) : selectedPreset;

  // Active impact note text
  const currentImpact =
    !isCustom && selectedPreset && selectorContent.impactNotes[selectedPreset]
      ? selectorContent.impactNotes[selectedPreset]
      : selectorContent.defaultImpactNote;

  // Preset amount tile click handler
  const handleSelectPreset = (amount: number) => {
    setSelectedPreset(amount);
    setIsCustom(false);
    setCustomAmountInput('');
    setInputError(null);
    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
      setStatusMessage(null);
    }
  };

  // Custom amount change handler
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow leading minus, digits, and a single decimal point
    const hasMinus = raw.trim().startsWith('-');
    const withoutMinus = raw.replace(/-/g, '').replace(/[^0-9.]/g, '');
    const parts = withoutMinus.split('.');
    const cleanNumbers = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : withoutMinus;
    const sanitized = hasMinus ? `-${cleanNumbers}` : cleanNumbers;

    setIsCustom(true);
    setSelectedPreset(null);
    setCustomAmountInput(sanitized);

    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
      setStatusMessage(null);
    }

    if (sanitized === '' || sanitized === '-') {
      if (sanitized === '-') {
        setInputError('Donation amount must be greater than zero');
      } else {
        setInputError(null);
      }
      return;
    }

    const num = parseFloat(sanitized);
    if (isNaN(num)) {
      setInputError('Please enter a valid donation amount');
    } else if (sanitized.startsWith('-') || num < 0) {
      setInputError('Donation amount must be greater than zero');
    } else if (num === 0) {
      setInputError('Please enter an amount greater than $0');
    } else if (num > 100000) {
      setInputError('Donation amount exceeds $100,000 processing limit');
    } else {
      setInputError(null);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionStatus === 'submitting') return;

    let finalAmount: number | null = null;
    if (isCustom) {
      const num = parseFloat(customAmountInput);
      if (customAmountInput.startsWith('-') || num < 0) {
        setInputError('Donation amount must be greater than zero');
        return;
      }
      if (isNaN(num) || num === 0) {
        setInputError('Please enter an amount greater than $0');
        return;
      }
      if (num > 100000) {
        setInputError('Donation amount exceeds $100,000 processing limit');
        return;
      }
      finalAmount = num;
    } else {
      finalAmount = selectedPreset ?? selectorContent.defaultAmount;
    }

    if (!finalAmount || finalAmount <= 0) {
      setInputError('Please select or enter a donation amount');
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
        // Validate destination URL scheme before navigating
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

        // Destination is configured: proceed to checkout
        setSubmissionStatus('success');
        setStatusMessage(
          'Donation intent received. Redirecting to secure checkout (please confirm your gift amount and frequency on the form)...',
        );
        if (typeof window !== 'undefined') {
          window.location.assign(redirectUrl);
        }
      } else {
        // Destination is not configured: display truthful explanation
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

  // Dynamic button label
  const buttonLabel =
    activeAmount !== null && activeAmount > 0
      ? `${selectorContent.ctaBaseText} $${activeAmount.toLocaleString()}`
      : 'Select an Amount';

  const isButtonDisabled =
    submissionStatus === 'submitting' || Boolean(inputError) || activeAmount === null;

  return (
    <div
      className={cn(
        'rounded-card shadow-float border-border/50 text-navy w-full max-w-xl border bg-white p-6 sm:p-8 md:p-10',
        className,
      )}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* 1. Frequency Control */}
        <div>
          <label className="text-navy/70 mb-3 block text-xs font-bold tracking-wider uppercase">
            {selectorContent.frequencyLabel}
          </label>
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
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-navy/70 block text-xs font-bold tracking-wider uppercase">
              {selectorContent.amountsLabel}
            </label>
            {selectorContent.amountsSubtitle && (
              <span className="text-navy/50 text-xs">{selectorContent.amountsSubtitle}</span>
            )}
          </div>

          {/* 6 Preset Amount Tiles: exactly $5, $10, $15, $20, $150, $300 */}
          <div
            role="radiogroup"
            aria-label="Preset donation amounts"
            className="grid grid-cols-3 gap-3"
          >
            {selectorContent.presetAmounts.map((amount) => {
              const isChecked = !isCustom && selectedPreset === amount;

              return (
                <ChipToggle
                  key={amount}
                  type="radio"
                  name="home-donation-preset-group"
                  value={String(amount)}
                  tone="plain"
                  checked={isChecked}
                  onChange={() => handleSelectPreset(amount)}
                  className="w-full justify-center [&>span]:w-full"
                >
                  ${amount}
                </ChipToggle>
              );
            })}
          </div>
        </div>

        {/* 3. Impact Note */}
        <div className="border-border/40 bg-canvas/70 rounded-2xl border p-4 transition-all duration-150">
          <p className="text-navy text-sm leading-snug font-bold">{currentImpact.headline}</p>
          <p className="text-navy/70 mt-1 text-xs leading-relaxed">{currentImpact.description}</p>
        </div>

        {/* 4. Custom Amount Input */}
        <div>
          <label htmlFor={customInputId} className="text-navy/80 mb-2 block text-xs font-semibold">
            {selectorContent.customAmountLabel}
          </label>
          <div className="relative">
            <input
              id={customInputId}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder={selectorContent.customAmountPlaceholder}
              value={customAmountInput}
              onChange={handleCustomChange}
              aria-invalid={Boolean(inputError)}
              aria-describedby={inputError ? errorId : undefined}
              className={cn(
                'rounded-field text-navy placeholder:text-muted/70 h-[52px] w-full border bg-white px-4 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                inputError
                  ? 'border-danger focus-visible:outline-danger'
                  : isCustom && isCustomValid
                    ? 'border-gold focus-visible:outline-navy bg-[#FAF3E2]/40'
                    : 'border-border hover:border-navy/40 focus-visible:outline-navy',
              )}
            />
          </div>
          {inputError && (
            <p
              id={errorId}
              role="alert"
              className="text-danger mt-1.5 flex items-center gap-1.5 text-xs font-medium"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{inputError}</span>
            </p>
          )}
        </div>

        {/* 5. Status Feedback Banner */}
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

        {/* 6. Primary Action CTA */}
        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon="heart"
            disabled={isButtonDisabled}
            loading={submissionStatus === 'submitting'}
          >
            {buttonLabel}
          </Button>

          {/* 7. Tax-deductible notice & EIN line */}
          <p className="text-navy/60 text-center text-xs leading-relaxed">
            {selectorContent.taxExemptNotice} • EIN {siteConfig.ein}
          </p>
        </div>
      </form>
    </div>
  );
}
