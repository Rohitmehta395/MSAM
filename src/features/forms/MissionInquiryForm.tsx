'use client';

import React, { useState } from 'react';
import { BadgeDollarSign, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Input, Textarea, ConsentCheckbox, FormStatus } from '@/components/form';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  missionContactPathwaysContent,
  type MissionContactPathwaysContent,
  type PathwayTabId,
} from '@/content/mission';
import { pathwayInquirySchema, type PathwayInquiry } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export interface MissionInquiryFormProps {
  /** Optional content override */
  content?: Partial<MissionContactPathwaysContent>;
  /** Optional callback fired upon verified successful submission */
  onSuccess?: (values: PathwayInquiry) => void;
  /** Optional custom class name */
  className?: string;
}

/**
 * Interactive Contact Pathways Inquiry Form for the Mission page.
 * Grounded in Figma frame: `design-reference/Mission Page/Contact pathways-updated.png` (1440x1116).
 *
 * Features:
 * - 3 Accessible pathway tabs: Give Food, Serve, Give Funds with gold underline indicator.
 * - Exact field structure: Name and organization, Area of interest, Tell us more, Contact details.
 * - Consent confirmation checkbox with respectful handling disclosure.
 * - Full-width navy pill submit button with trailing gold arrow using shared Button.
 * - Submission pipeline via Phase 4 `useFormSubmission` targeting POST /api/contact.
 * - Anti-spam honeypot, minimum fill-time, rate limiting, and zero PII logging.
 */
export function MissionInquiryForm({
  content: contentOverride,
  onSuccess,
  className,
}: MissionInquiryFormProps) {
  const content = {
    ...missionContactPathwaysContent,
    ...contentOverride,
  };

  const { tabs, subheading, fields, consentText, submitLabel, reassuranceText } = content;

  const [activeTab, setActiveTab] = useState<PathwayTabId>('give-food');

  const { form, status, isSubmitting, isSuccess, message, submit, resetSubmission } =
    useFormSubmission<PathwayInquiry>({
      endpoint: '/api/contact',
      schema: pathwayInquirySchema,
      defaultValues: {
        kind: 'pathway',
        pathway: 'give-food',
        nameAndOrg: '',
        areaOfInterest: '',
        tellUsMore: '',
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
    setValue,
    formState: { errors },
  } = form;

  const handleTabChange = (val: string) => {
    const nextTab = val as PathwayTabId;
    setActiveTab(nextTab);
    setValue('pathway', nextTab, { shouldValidate: true });
  };

  return (
    <div className={cn('w-full', className)}>
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
            Thank you! Your inquiry has been received. Our team will review your interest and
            connect with you soon with the best next step.
          </p>
          <div className="border-border/40 mt-5 space-y-2 rounded-xl border bg-white/80 p-5 text-sm text-slate-700">
            <p className="text-navy font-semibold">What happens next?</p>
            <p>1. Our community team reviews your interest area and capacity.</p>
            <p>2. We will follow up via the contact details provided (email or phone).</p>
            <p>3. If urgent, feel free to call our direct line at (954) 406-7580.</p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                resetSubmission();
                form.reset();
                setValue('pathway', activeTab);
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
          {/* Accessible Pathway Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            aria-label="Contact pathways"
            className="w-full"
          >
            <TabsList aria-label="Select pathway" className="border-border/80 border-b pb-px">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  icon={BadgeDollarSign}
                  className="px-4 py-3 text-base sm:text-lg"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Subheading Prompt directly below tabs */}
          <div className="pt-6 pb-4">
            <p className="text-sm text-slate-600 sm:text-base">{subheading}</p>
          </div>

          <hr className="border-border/60 mb-6" />

          {/* Hidden pathway discriminator for DOM accessibility */}
          <input type="hidden" {...register('kind')} value="pathway" />
          <input type="hidden" {...register('pathway')} value={activeTab} />

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

            {/* Field 2: Area of interest */}
            <Field label={fields.areaOfInterest.label} error={errors.areaOfInterest?.message}>
              <Input
                {...register('areaOfInterest')}
                placeholder={fields.areaOfInterest.placeholder}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </Field>

            {/* Field 3: Tell us more */}
            <Field label={fields.tellUsMore.label} error={errors.tellUsMore?.message}>
              <Textarea
                {...register('tellUsMore')}
                placeholder={fields.tellUsMore.placeholder}
                rows={4}
                disabled={isSubmitting}
                className="resize-y text-base"
              />
            </Field>

            {/* Field 4: Contact details */}
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
