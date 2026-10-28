'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { FormSubmissionStatus } from '@/features/forms/useFormSubmission';

export interface FormStatusProps {
  /** Current submission lifecycle state */
  status: FormSubmissionStatus;
  /** Status announcement message */
  message?: string | null;
  /** Optional custom class name */
  className?: string;
}

/**
 * Accessible presentational banner communicating form submission state:
 * - 'idle': renders nothing
 * - 'submitting': accessible polite loading indicator
 * - 'success': positive confirmation announcement with success styling
 * - 'error': prominent recovery alert announcement with danger styling
 */
export function FormStatus({ status, message, className }: FormStatusProps) {
  if (status === 'idle' || !message) {
    return null;
  }

  if (status === 'submitting') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'rounded-field border-border bg-canvas text-navy flex items-center gap-3 border px-4 py-3 text-sm leading-snug',
          className,
        )}
      >
        <Loader2 className="text-gold h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
        <div>
          <span className="sr-only">Submitting: </span>
          <span>{message}</span>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'rounded-field border-success/30 bg-sage text-navy flex items-start gap-3 border px-4 py-3 text-sm leading-snug',
          className,
        )}
      >
        <CheckCircle2
          className="text-success mt-0.5 h-4 w-4 shrink-0 stroke-[2.5]"
          aria-hidden="true"
        />
        <div>
          <span className="sr-only">Success: </span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={cn(
          'rounded-field border-danger/30 bg-danger/10 text-navy flex items-start gap-3 border px-4 py-3 text-sm leading-snug',
          className,
        )}
      >
        <AlertCircle
          className="text-danger mt-0.5 h-4 w-4 shrink-0 stroke-[2.5]"
          aria-hidden="true"
        />
        <div>
          <span className="sr-only">Error: </span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    );
  }

  return null;
}
