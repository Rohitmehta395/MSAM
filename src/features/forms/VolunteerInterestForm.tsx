'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Input, Textarea, Checkbox, CheckboxGroup, FormStatus } from '@/components/form';
import { Button } from '@/components/ui/Button';
import { volunteerFormContent, type VolunteerFormContent } from '@/content/community';
import { volunteerInquirySchema, type VolunteerInquiry } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export interface VolunteerInterestFormProps {
  /** Optional content override */
  content?: Partial<VolunteerFormContent>;
  /** Optional callback fired upon verified successful submission */
  onSuccess?: (values: VolunteerInquiry) => void;
  /** Optional custom class name */
  className?: string;
}

/**
 * Interactive Volunteer Interest Form for `/community/volunteers`.
 * Grounded in Figma frame:
 * `design-reference/Community Page/2-Volunteers/3-Volunteer Form - updated.png` (1440 × 725 px).
 *
 * Specifications:
 * - Card container: white background, rounded-2xl, soft shadow-card, subtle border.
 * - Header: "Volunteer Interest Form" title with solid gold divider bar.
 * - 5 Fields in exact order:
 *   1. Full Name (Input, placeholder "Name")
 *   2. Phone (Input, placeholder "Phone Number")
 *   3. Email (Input, placeholder "Email")
 *   4. Areas of Interest (CheckboxGroup with multiple selections supported, at least one required)
 *      - Food Packing
 *      - Food Distribution
 *      - Food Drives
 *      - Other
 *   5. Availability and Notes (Textarea, placeholder "Share your availability, preferred role, or any questions.")
 * - Full-width dark navy pill button: "Submit Interest" with trailing gold arrow.
 * - Anti-spam protections (honeypot, minimum fill time, rate limiting).
 * - Target: POST /api/contact (`kind: 'volunteer'`).
 */
export function VolunteerInterestForm({
  content: contentOverride,
  onSuccess,
  className,
}: VolunteerInterestFormProps) {
  const content = {
    ...volunteerFormContent,
    ...contentOverride,
  };

  const { cardTitle, interestOptions, fields, submitLabel } = content;

  const { form, status, isSubmitting, isSuccess, message, submit, resetSubmission } =
    useFormSubmission<VolunteerInquiry>({
      endpoint: '/api/contact',
      schema: volunteerInquirySchema,
      defaultValues: {
        kind: 'volunteer',
        fullName: '',
        phone: '',
        email: '',
        interests: [],
        availabilityAndNotes: '',
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
            <h3 className="text-navy text-xl font-bold">Interest Received</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Thank you for your heart to serve! Your volunteer interest has been received. Our team
            will review your information and connect with you soon to discuss upcoming opportunities
            and next steps.
          </p>
          <div className="border-border/40 mt-5 space-y-2 rounded-xl border bg-white/80 p-5 text-sm text-slate-700">
            <p>
              <span className="text-navy font-semibold">Name:</span> {form.getValues('fullName')}
            </p>
            <p>
              <span className="text-navy font-semibold">Email:</span> {form.getValues('email')}
            </p>
            <p>
              <span className="text-navy font-semibold">Phone:</span> {form.getValues('phone')}
            </p>
            <p>
              <span className="text-navy font-semibold">Areas of Interest:</span>{' '}
              {(form.getValues('interests') || []).join(', ')}
            </p>
            {form.getValues('availabilityAndNotes') ? (
              <p>
                <span className="text-navy font-semibold">Notes:</span>{' '}
                {form.getValues('availabilityAndNotes')}
              </p>
            ) : null}
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
            <h3 className="text-navy font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              {cardTitle}
            </h3>
            <div className="bg-gold mt-4 h-1 w-full rounded-full" aria-hidden="true" />
          </div>

          {/* Hidden Honeypot Field */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="volunteer-website-hp">Do not fill this field</label>
            <input
              id="volunteer-website-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('hp' as unknown as 'fullName')}
            />
          </div>

          {/* Field 1: Full Name */}
          <Field
            id="volunteer-fullName"
            label={fields.fullName.label}
            required
            error={errors.fullName?.message}
          >
            <Input
              id="volunteer-fullName"
              placeholder={fields.fullName.placeholder}
              autoComplete="name"
              disabled={isSubmitting}
              error={Boolean(errors.fullName)}
              {...register('fullName')}
            />
          </Field>

          {/* Field 2: Phone */}
          <Field
            id="volunteer-phone"
            label={fields.phone.label}
            required
            error={errors.phone?.message}
          >
            <Input
              id="volunteer-phone"
              type="tel"
              placeholder={fields.phone.placeholder}
              autoComplete="tel"
              disabled={isSubmitting}
              error={Boolean(errors.phone)}
              {...register('phone')}
            />
          </Field>

          {/* Field 3: Email */}
          <Field
            id="volunteer-email"
            label={fields.email.label}
            required
            error={errors.email?.message}
          >
            <Input
              id="volunteer-email"
              type="email"
              placeholder={fields.email.placeholder}
              autoComplete="email"
              disabled={isSubmitting}
              error={Boolean(errors.email)}
              {...register('email')}
            />
          </Field>

          {/* Field 4: Areas of Interest Checkboxes */}
          <CheckboxGroup
            label={fields.interests.label}
            required
            error={errors.interests?.message}
            itemsClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
          >
            {interestOptions.map((option) => {
              const optionId = `volunteer-interest-${option.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Checkbox
                  key={option}
                  id={optionId}
                  value={option}
                  label={option}
                  disabled={isSubmitting}
                  error={Boolean(errors.interests)}
                  {...register('interests')}
                />
              );
            })}
          </CheckboxGroup>

          {/* Field 5: Availability and Notes */}
          <Field
            id="volunteer-notes"
            label={fields.availabilityAndNotes.label}
            error={errors.availabilityAndNotes?.message}
          >
            <Textarea
              id="volunteer-notes"
              placeholder={fields.availabilityAndNotes.placeholder}
              rows={3}
              disabled={isSubmitting}
              error={Boolean(errors.availabilityAndNotes)}
              {...register('availabilityAndNotes')}
            />
          </Field>

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
        </form>
      )}
    </div>
  );
}
