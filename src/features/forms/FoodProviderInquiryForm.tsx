'use client';

import React from 'react';
import { BadgeDollarSign, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Input, Textarea, ConsentCheckbox, FormStatus } from '@/components/form';
import { Button } from '@/components/ui/Button';
import { foodProviderInquiryContent, type FoodProviderInquiryContent } from '@/content/community';
import { foodProviderInquirySchema, type FoodProviderInquiry } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export interface FoodProviderInquiryFormProps {
  /** Optional content override */
  content?: Partial<FoodProviderInquiryContent>;
  /** Optional callback fired upon verified successful submission */
  onSuccess?: (values: FoodProviderInquiry) => void;
  /** Optional custom class name */
  className?: string;
}

/**
 * Interactive Food Provider Inquiry Form for `/community/food-providers`.
 * Grounded in Figma frame:
 * `design-reference/Community Page/1-Food Providers/3-Food Provider Form - updated.png` (1440 × 913 px).
 *
 * Specifications:
 * - Card container: white background, rounded-2xl, soft shadow-card, subtle border.
 * - Header: BadgeDollarSign icon + "Food Provider Inquiry" title, solid gold divider bar.
 * - Prompt text: "Tell us about the food you’d like to share..." followed by subtle divider.
 * - 4 Fields in exact order:
 *   1. Name and organization (Input)
 *   2. Food type (Input)
 *   3. Quantity and frequency (Textarea)
 *   4. Availability and contact (Input)
 * - Required consent checkbox with respectful handling disclosure.
 * - Full-width dark navy pill button: "Start a Conversation" with trailing gold arrow.
 * - Follow-up reassurance line with green clock icon.
 * - Submission pipeline via Phase 4 `useFormSubmission` targeting POST /api/contact (`kind: 'food_provider'`).
 */
export function FoodProviderInquiryForm({
  content: contentOverride,
  onSuccess,
  className,
}: FoodProviderInquiryFormProps) {
  const content = {
    ...foodProviderInquiryContent,
    ...contentOverride,
  };

  const { cardTitle, cardPrompt, fields, consentText, submitLabel, reassuranceText } = content;

  const { form, status, isSubmitting, isSuccess, message, submit, resetSubmission } =
    useFormSubmission<FoodProviderInquiry>({
      endpoint: '/api/contact',
      schema: foodProviderInquirySchema,
      defaultValues: {
        kind: 'food_provider',
        nameAndOrg: '',
        foodType: '',
        quantityAndFrequency: '',
        contactDetails: '',
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
            <h3 className="text-navy text-xl font-bold">Inquiry Sent Successfully</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Thank you! Your food provider inquiry has been received. Our team will review your
            details and connect with you soon to discuss pickup, timing, and distribution.
          </p>
          <div className="border-border/40 mt-5 space-y-2 rounded-xl border bg-white/80 p-5 text-sm text-slate-700">
            <p className="text-navy font-semibold">What happens next?</p>
            <p>1. Our operations team reviews your food type and approximate volume.</p>
            <p>2. We coordinate a respectful and timely pickup schedule with our van network.</p>
            <p>
              3. If urgent or time-sensitive, feel free to call our direct line at (954) 406-7580.
            </p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                resetSubmission();
                form.reset();
              }}
              className="text-navy hover:text-navy/80 focus-visible:outline-navy text-sm font-semibold underline underline-offset-4 focus-visible:outline-2"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        /* The Inquiry Form */
        <form onSubmit={submit} noValidate className="flex flex-col">
          {/* Card Header: Icon + Title */}
          <div className="flex items-center gap-3">
            <BadgeDollarSign className="text-navy h-6 w-6 shrink-0" aria-hidden="true" />
            <h3 className="text-navy text-xl font-bold tracking-tight sm:text-2xl">{cardTitle}</h3>
          </div>

          {/* Solid Gold Accent Divider Bar */}
          <div className="bg-gold mt-4 mb-4 h-[2px] w-full rounded-full" aria-hidden="true" />

          {/* Introductory Prompt Text */}
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{cardPrompt}</p>

          <hr className="border-border/60 my-6" />

          {/* Hidden kind discriminator for DOM accessibility */}
          <input type="hidden" {...register('kind')} value="food_provider" />

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Field 1: Name and organization */}
            <Field label={fields.nameAndOrg.label} error={errors.nameAndOrg?.message}>
              <Input
                {...register('nameAndOrg')}
                placeholder={fields.nameAndOrg.placeholder}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </Field>

            {/* Field 2: Food type */}
            <Field label={fields.foodType.label} error={errors.foodType?.message}>
              <Input
                {...register('foodType')}
                placeholder={fields.foodType.placeholder}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </Field>

            {/* Field 3: Quantity and frequency */}
            <Field
              label={fields.quantityAndFrequency.label}
              error={errors.quantityAndFrequency?.message}
            >
              <Textarea
                {...register('quantityAndFrequency')}
                placeholder={fields.quantityAndFrequency.placeholder}
                rows={4}
                disabled={isSubmitting}
                className="resize-y text-base"
              />
            </Field>

            {/* Field 4: Availability and contact */}
            <Field label={fields.contactDetails.label} error={errors.contactDetails?.message}>
              <Input
                {...register('contactDetails')}
                placeholder={fields.contactDetails.placeholder}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </Field>

            {/* Consent Checkbox */}
            <div className="pt-1">
              <ConsentCheckbox
                {...register('consent')}
                error={errors.consent?.message}
                disabled={isSubmitting}
                label={consentText}
              />
            </div>

            {/* Submit Button (Full Width Navy Pill matching Figma) */}
            <div className="mt-2">
              <Button
                type="submit"
                variant="dark"
                size="lg"
                icon="arrow"
                loading={isSubmitting}
                disabled={isSubmitting}
                fullWidth
                className="justify-center rounded-full text-base font-semibold shadow-sm"
              >
                {submitLabel}
              </Button>

              {/* Follow-up Reassurance Note */}
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Clock className="text-success h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{reassuranceText}</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
