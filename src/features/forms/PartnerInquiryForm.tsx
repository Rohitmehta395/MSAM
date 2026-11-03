'use client';

import React from 'react';
import { Handshake, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Input, Textarea, ConsentCheckbox, FormStatus } from '@/components/form';
import { Button } from '@/components/ui/Button';
import { partnerFormContent, type PartnerFormContent } from '@/content/community';
import { partnerInquirySchema, type PartnerInquiry } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export interface PartnerInquiryFormProps {
  /** Optional content override */
  content?: Partial<PartnerFormContent>;
  /** Optional callback fired upon verified successful submission */
  onSuccess?: (values: PartnerInquiry) => void;
  /** Optional custom class name */
  className?: string;
}

/**
 * Interactive Community Partner Inquiry Form for `/community/partners`.
 * Grounded in Figma frame:
 * `design-reference/Community Page/3-Partners/4-Partner form section - updated.png` (1440 × 1036 px).
 *
 * Specifications:
 * - Elevated white card on the left side of the lavender section.
 * - Small label: `COMMUNITY PARTNERS`.
 * - Icon and heading: `Explore Community Partnership` with Handshake emblem.
 * - Supporting text: "Share your interest in in-kind food drives, volunteer teams..."
 * - 4 Fields:
 *   1. Organization (Input)
 *   2. What kind of partnership are you exploring? (Input)
 *   3. Tell us about your capacity (Textarea)
 *   4. Primary contact (Input)
 * - Required consent checkbox.
 * - Full-width dark navy pill button: "Explore Partnership" with trailing gold arrow.
 * - Follow-up reassurance line with clock icon.
 * - Anti-spam protections (honeypot, minimum fill time, rate limiting).
 * - Target: POST /api/contact (`kind: 'partner'`).
 */
export function PartnerInquiryForm({
  content: contentOverride,
  onSuccess,
  className,
}: PartnerInquiryFormProps) {
  const content = {
    ...partnerFormContent,
    ...contentOverride,
  };

  const {
    cardLabel,
    cardTitle,
    cardDescription,
    fields,
    consentText,
    submitLabel,
    reassuranceText,
  } = content;

  const { form, status, isSubmitting, isSuccess, message, submit, resetSubmission } =
    useFormSubmission<PartnerInquiry>({
      endpoint: '/api/contact',
      schema: partnerInquirySchema,
      defaultValues: {
        kind: 'partner',
        organization: '',
        partnershipType: '',
        capacity: '',
        primaryContact: '',
        consent: false as unknown as true,
      },
      resetOnSuccess: false,
      onSuccess: (_response, values) => {
        onSuccess?.(values);
      },
    });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div
      className={cn(
        'border-border/40 shadow-card rounded-2xl border bg-white p-6 sm:p-8 lg:p-10',
        className,
      )}
    >
      {/* Submission Status Notification (Errors / Server Warnings) */}
      {!isSuccess && <FormStatus status={status} message={message} className="mb-6" />}

      {isSuccess ? (
        /* Verified Confirmation State */
        <div
          role="status"
          aria-live="polite"
          className="border-success/30 bg-sage/50 text-navy rounded-2xl border p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-success h-6 w-6 shrink-0" aria-hidden="true" />
            <h3 className="text-navy text-xl font-bold">Partnership Inquiry Received</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Thank you for exploring partnership with Manna Share A Meal! We have received your
            organization’s information. Our leadership team will review your message and reach out
            soon to discuss collaborative next steps.
          </p>
          <div className="border-border/40 mt-5 space-y-2 rounded-xl border bg-white/80 p-5 text-sm text-slate-700">
            <p>
              <span className="text-navy font-semibold">Organization:</span>{' '}
              {form.getValues('organization')}
            </p>
            <p>
              <span className="text-navy font-semibold">Partnership Type:</span>{' '}
              {form.getValues('partnershipType')}
            </p>
            <p>
              <span className="text-navy font-semibold">Primary Contact:</span>{' '}
              {form.getValues('primaryContact')}
            </p>
          </div>
          <div className="mt-6">
            <Button type="button" variant="secondary" size="sm" onClick={() => resetSubmission()}>
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        /* Interactive Form */
        <form onSubmit={submit} noValidate className="space-y-5">
          {/* Form Header */}
          <div>
            <span className="text-muted text-xs font-semibold tracking-wider uppercase">
              {cardLabel}
            </span>
            <div className="mt-2 flex items-center gap-3">
              <Handshake className="text-navy h-6 w-6 shrink-0" aria-hidden="true" />
              <h3 className="text-navy font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                {cardTitle}
              </h3>
            </div>
            <div className="bg-gold mt-4 mb-4 h-[2px] w-full rounded-full" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{cardDescription}</p>
          </div>

          <hr className="border-border/60 my-5" />

          {/* Hidden Honeypot Field */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="partner-website-hp">Do not fill this field</label>
            <input
              id="partner-website-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('hp' as unknown as 'organization')}
            />
          </div>

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Field 1: Organization */}
            <Field
              id="partner-org"
              label={fields.organization.label}
              required
              error={errors.organization?.message}
            >
              <Input
                id="partner-org"
                placeholder={fields.organization.placeholder}
                autoComplete="organization"
                disabled={isSubmitting}
                error={Boolean(errors.organization)}
                {...register('organization')}
              />
            </Field>

            {/* Field 2: What kind of partnership are you exploring? */}
            <Field
              id="partner-type"
              label={fields.partnershipType.label}
              required
              error={errors.partnershipType?.message}
            >
              <Input
                id="partner-type"
                placeholder={fields.partnershipType.placeholder}
                disabled={isSubmitting}
                error={Boolean(errors.partnershipType)}
                {...register('partnershipType')}
              />
            </Field>

            {/* Field 3: Tell us about your capacity */}
            <Field
              id="partner-capacity"
              label={fields.capacity.label}
              required
              error={errors.capacity?.message}
            >
              <Textarea
                id="partner-capacity"
                placeholder={fields.capacity.placeholder}
                rows={4}
                disabled={isSubmitting}
                error={Boolean(errors.capacity)}
                {...register('capacity')}
              />
            </Field>

            {/* Field 4: Primary contact */}
            <Field
              id="partner-contact"
              label={fields.primaryContact.label}
              required
              error={errors.primaryContact?.message}
            >
              <Input
                id="partner-contact"
                placeholder={fields.primaryContact.placeholder}
                disabled={isSubmitting}
                error={Boolean(errors.primaryContact)}
                {...register('primaryContact')}
              />
            </Field>
          </div>

          {/* Required Consent Checkbox */}
          <div className="pt-2">
            <ConsentCheckbox
              id="partner-consent"
              label={consentText}
              disabled={isSubmitting}
              error={errors.consent?.message}
              {...register('consent')}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="dark"
              size="lg"
              icon="arrow"
              iconClassName="text-gold"
              fullWidth
              disabled={isSubmitting}
              loading={isSubmitting}
              className="text-base font-semibold sm:text-lg"
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </div>

          {/* Follow-up Reassurance Note */}
          <div className="text-muted flex items-center gap-2 pt-1 text-xs sm:text-sm">
            <Clock className="text-success h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{reassuranceText}</span>
          </div>
        </form>
      )}
    </div>
  );
}
