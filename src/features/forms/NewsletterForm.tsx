'use client';

import React from 'react';
import type { ZodType } from 'zod';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { FormStatus } from '@/components/form/FormStatus';
import { newsletterSchema, type NewsletterInput } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export type NewsletterFormValues = NewsletterInput & {
  _hp?: string;
};

export interface NewsletterFormProps {
  /** Optional custom class name */
  className?: string;
  /** Submission source attribution tag (default: 'footer') */
  source?: string;
}

/**
 * Client-side newsletter subscription form in the global footer.
 * Fully wired to `POST /api/newsletter` with Zod validation, anti-spam tokens,
 * accessible status announcements, and safe success resets.
 */
export function NewsletterForm({ className, source = 'footer' }: NewsletterFormProps) {
  const { form, status, isSubmitting, isError, message, submit } =
    useFormSubmission<NewsletterFormValues>({
      endpoint: '/api/newsletter',
      schema: newsletterSchema as unknown as ZodType<NewsletterFormValues>,
      defaultValues: {
        email: '',
        source,
        _hp: '',
      },
      resetOnSuccess: true,
    });

  const {
    register,
    formState: { errors },
  } = form;

  const emailError = errors.email?.message;
  const hasError = Boolean(emailError);

  const errorId = 'newsletter-email-error';
  const statusId = 'newsletter-status';

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-busy={isSubmitting}
      className={cn('relative w-full min-w-0', className)}
    >
      {/* Anti-spam honeypot - hidden from sighted users and assistive tech */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-hp">Leave this field blank</label>
        <input
          id="newsletter-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute top-0 left-0 h-0 w-0 opacity-0"
          {...register('_hp')}
        />
      </div>

      {/* Hidden source field */}
      <input type="hidden" value={source} {...register('source')} />

      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div
        className={cn(
          'relative flex h-12 w-full min-w-0 items-center rounded-full border bg-white/5 pr-1.5 pl-4 transition-colors duration-150',
          hasError
            ? 'border-amber-400 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400'
            : 'focus-within:border-gold focus-within:ring-gold border-white/20 focus-within:ring-1 hover:border-white/30',
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          spellCheck={false}
          disabled={isSubmitting}
          aria-invalid={hasError || isError}
          aria-describedby={
            [hasError ? errorId : null, message ? statusId : null].filter(Boolean).join(' ') ||
            undefined
          }
          className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none disabled:opacity-50"
          {...register('email')}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? 'Submitting newsletter subscription' : 'Subscribe to newsletter'
          }
          className="bg-gold text-navy hover:bg-gold/90 active:bg-gold/80 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Inline validation feedback for email errors */}
      {emailError && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-amber-300"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{emailError}</span>
        </p>
      )}

      {/* Accessible submission lifecycle status announcement */}
      {message && (
        <div id={statusId} className="mt-3">
          <FormStatus
            status={status}
            message={message}
            className={cn(
              'text-xs',
              status === 'error' && 'border-amber-400/40 bg-amber-400/10 text-white',
            )}
          />
        </div>
      )}
    </form>
  );
}
