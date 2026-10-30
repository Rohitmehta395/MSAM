'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Input, Checkbox, CheckboxGroup, FormStatus } from '@/components/form';
import { Button } from '@/components/ui/Button';
import { howItWorksIntakeContent, type HowItWorksIntakeContent } from '@/content/how-it-works';
import { familyIntakeSchema, type FamilyIntakeInput } from '@/lib/validation';
import { useFormSubmission } from './useFormSubmission';

export interface IntakeFormProps {
  /** Optional content override */
  content?: Partial<HowItWorksIntakeContent>;
  /** Optional callback fired upon successful submission */
  onSuccess?: (values: FamilyIntakeInput) => void;
  /** Optional custom class name */
  className?: string;
}

/**
 * Manna Family Intake / Household Registration Form client component.
 * Grounded in updated Figma frame: `design-reference/How it works Page/Assistance request-updated.png`
 *
 * Integrates:
 * - Phase 4 `useFormSubmission` pipeline targeting `POST /api/intake`
 * - Zod validation via `familyIntakeSchema`
 * - Multi-select optional dietary preferences
 * - Full keyboard accessibility, aria-invalid, and semantic fieldsets
 */
export function IntakeForm({ content: contentOverride, onSuccess, className }: IntakeFormProps) {
  const content = {
    ...howItWorksIntakeContent,
    ...contentOverride,
  };

  const { fields, dietaryPreferences, submitLabel } = content;

  const { form, status, isSubmitting, isSuccess, message, submit, resetSubmission } =
    useFormSubmission<FamilyIntakeInput>({
      endpoint: '/api/intake',
      schema: familyIntakeSchema,
      defaultValues: {
        householdName: '',
        peopleCount: 1,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        dietaryPreferences: [],
        city: 'Broward County',
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
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Submission Status Notification */}
      <FormStatus status={status} message={message} />

      {isSuccess ? (
        /* Confirmation State */
        <div
          role="status"
          aria-live="polite"
          className="border-success/30 bg-sage/50 text-navy rounded-2xl border p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-success h-6 w-6 shrink-0" aria-hidden="true" />
            <h3 className="text-navy text-xl font-bold">Registration Request Submitted</h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Thank you! Your household registration has been received. Our team will prepare your
            support and reach out to coordinate your visit.
          </p>
          <div className="border-border/40 mt-5 space-y-2 rounded-xl border bg-white/80 p-5 text-sm text-slate-700">
            <p className="text-navy font-semibold">What happens next?</p>
            <p>1. Our team reviews your registration and dietary preferences.</p>
            <p>
              2. We will call you at the phone number provided to coordinate your Saturday visit.
            </p>
            <p>
              3. Service is by appointment every Saturday at Manna / Share A Meal in Broward County.
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
              Submit another household request
            </button>
          </div>
        </div>
      ) : (
        /* The Household Registration Intake Form */
        <form onSubmit={submit} noValidate className="flex flex-col gap-6">
          {/* Row 1: Household Name & Number of people */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Field label={fields.householdName.label} error={errors.householdName?.message}>
              <Input
                {...register('householdName')}
                placeholder={fields.householdName.placeholder}
                disabled={isSubmitting}
              />
            </Field>

            <Field label={fields.peopleCount.label} error={errors.peopleCount?.message}>
              <Input
                type="number"
                min={1}
                max={20}
                {...register('peopleCount', { valueAsNumber: true })}
                placeholder={fields.peopleCount.placeholder}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          {/* Row 2: First Name & Last Name */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Field label={fields.firstName.label} error={errors.firstName?.message}>
              <Input
                {...register('firstName')}
                placeholder={fields.firstName.placeholder}
                disabled={isSubmitting}
              />
            </Field>

            <Field label={fields.lastName.label} error={errors.lastName?.message}>
              <Input
                {...register('lastName')}
                placeholder={fields.lastName.placeholder}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          {/* Row 3: Phone Number & Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Field label={fields.phone.label} error={errors.phone?.message}>
              <Input
                type="tel"
                {...register('phone')}
                placeholder={fields.phone.placeholder}
                disabled={isSubmitting}
              />
            </Field>

            <Field label={fields.email.label} error={errors.email?.message}>
              <Input
                type="email"
                {...register('email')}
                placeholder={fields.email.placeholder}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          {/* Sub-section: Household Dietary Preferences */}
          <div className="mt-4 pt-2">
            <h3 className="text-navy text-xl font-bold tracking-tight sm:text-2xl">
              {dietaryPreferences.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              {dietaryPreferences.description}
            </p>
          </div>

          {/* Checkboxes: Dietary preferences (optional) */}
          <CheckboxGroup
            label={dietaryPreferences.fieldLabel}
            itemsClassName="flex flex-wrap items-center gap-5 sm:gap-8 pt-1"
          >
            {dietaryPreferences.options.map((option) => (
              <Checkbox
                key={option.id}
                value={option.id}
                label={option.label}
                disabled={isSubmitting}
                {...register('dietaryPreferences')}
              />
            ))}
          </CheckboxGroup>

          {/* Submit Button (Full Width Navy Pill matching Figma) */}
          <div className="mt-4">
            <Button
              type="submit"
              variant="dark"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
              className="justify-center rounded-full py-4 text-base font-semibold shadow-sm"
            >
              <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
                <span>{submitLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
