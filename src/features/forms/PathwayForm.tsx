'use client';

import React from 'react';
import { Controller, type DefaultValues, type FieldValues, type Path } from 'react-hook-form';
import type { ZodType } from 'zod';
import { cn } from '@/lib/cn';
import {
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  ChipToggle,
  ConsentCheckbox,
  FormStatus,
} from '@/components/form';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import type { FormConfig } from '@/lib/validation/field-config';
import type { ApiResponse } from '@/lib/api/types';
import { useFormSubmission } from './useFormSubmission';

export interface PathwayFormProps<TFieldValues extends FieldValues = FieldValues> {
  /** Form definition containing field list, title, description, and defaults */
  config: FormConfig;
  /** Submission API target route handler (e.g. '/api/contact') */
  endpoint: string;
  /** Zod validation schema matching the pathway */
  schema?: ZodType<TFieldValues>;
  /** Initial form values */
  defaultValues?: DefaultValues<TFieldValues>;
  /** Submit button text label. Defaults to config.submitLabel or 'Submit' */
  submitLabel?: string;
  /** Visual variant of the submit button */
  submitVariant?: ButtonVariant;
  /** Trailing icon for submit button */
  submitIcon?: 'arrow' | 'heart' | 'none';
  /** Optional explicit consent agreement text */
  consentLabel?: React.ReactNode;
  /** Form field key for consent agreement. Default: 'agreedToContact' */
  consentFieldName?: string;
  /** Whether to reset form fields on verified success. Default: true (clears submitted personal data after confirmed success) */
  resetOnSuccess?: boolean;
  /** Callback fired upon verified successful submission */
  onSuccess?: (response: ApiResponse, values: TFieldValues) => void;
  /** Callback fired upon submission error */
  onError?: (error: { message: string; errors?: Record<string, string[]> }) => void;
  /** Optional custom class name for the form wrapper */
  className?: string;
}

/**
 * Reusable configuration-driven client pathway form component.
 * Powers pathway contact forms across Home, Mission, Community, and Donate.
 */
export function PathwayForm<TFieldValues extends FieldValues = FieldValues>({
  config,
  endpoint,
  schema,
  defaultValues,
  submitLabel,
  submitVariant = 'dark',
  submitIcon = 'arrow',
  consentLabel,
  consentFieldName = 'agreedToContact',
  resetOnSuccess = true,
  onSuccess,
  onError,
  className,
}: PathwayFormProps<TFieldValues>) {
  // Construct default values from field configurations if not explicitly provided
  const initialValues = React.useMemo(() => {
    if (defaultValues) {
      return defaultValues;
    }
    const defaults: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.type === 'consent') {
        defaults[field.name] = false;
      } else if (field.defaultValue !== undefined) {
        defaults[field.name] = field.defaultValue;
      }
    }
    return defaults as DefaultValues<TFieldValues>;
  }, [config.fields, defaultValues]);

  const { form, status, isSubmitting, message, submit } = useFormSubmission<TFieldValues>({
    endpoint,
    schema,
    defaultValues: initialValues,
    resetOnSuccess,
    onSuccess,
    onError,
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form
      id={config.id}
      onSubmit={submit}
      noValidate
      aria-busy={isSubmitting}
      className={cn('flex flex-col gap-6', className)}
    >
      {/* Anti-spam honeypot input - offscreen and hidden from assistive technology */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${config.id}-hp`}>Leave this field blank</label>
        <input
          id={`${config.id}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_hp' as Path<TFieldValues>)}
        />
      </div>

      {(config.title || config.description) && (
        <div className="flex flex-col gap-1.5">
          {config.title && (
            <h3 className="text-navy text-xl font-bold tracking-tight md:text-2xl">
              {config.title}
            </h3>
          )}
          {config.description && (
            <p className="text-muted text-sm leading-relaxed">{config.description}</p>
          )}
        </div>
      )}

      {/* Dynamic responsive field grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        {config.fields.map((field) => {
          const fieldError = errors[field.name]?.message as string | undefined;
          const isFullWidth =
            field.colSpan === 2 ||
            field.type === 'textarea' ||
            field.type === 'chip-toggle' ||
            field.type === 'checkbox-group' ||
            field.type === 'checkbox' ||
            field.type === 'consent';

          // 1. Textarea control
          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="col-span-full">
                <Field
                  label={field.label}
                  required={field.required}
                  hint={field.helperText}
                  error={fieldError}
                  disabled={field.disabled || isSubmitting}
                >
                  <Textarea
                    placeholder={field.placeholder}
                    rows={4}
                    disabled={field.disabled || isSubmitting}
                    {...register(field.name as Path<TFieldValues>)}
                  />
                </Field>
              </div>
            );
          }

          // 2. Select dropdown control
          if (field.type === 'select') {
            return (
              <div key={field.name} className={isFullWidth ? 'col-span-full' : 'col-span-1'}>
                <Field
                  label={field.label}
                  required={field.required}
                  hint={field.helperText}
                  error={fieldError}
                  disabled={field.disabled || isSubmitting}
                >
                  <Select
                    disabled={field.disabled || isSubmitting}
                    {...register(field.name as Path<TFieldValues>)}
                  >
                    <option value="">{field.placeholder || 'Please select...'}</option>
                    {field.options?.map((option) => (
                      <option
                        key={String(option.value)}
                        value={String(option.value)}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            );
          }

          // 3. Explicit consent checkbox control
          if (field.type === 'consent') {
            return (
              <div key={field.name} className="col-span-full">
                <ConsentCheckbox
                  label={field.label}
                  description={field.helperText}
                  required={field.required ?? true}
                  error={fieldError}
                  disabled={field.disabled || isSubmitting}
                  {...register(field.name as Path<TFieldValues>)}
                />
              </div>
            );
          }

          // 4. Standard boolean checkbox control (non-consent)
          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="col-span-full">
                <Checkbox
                  label={field.label}
                  description={field.helperText}
                  disabled={field.disabled || isSubmitting}
                  error={Boolean(fieldError)}
                  {...register(field.name as Path<TFieldValues>)}
                />
                {fieldError && (
                  <p className="text-danger mt-1 text-xs font-medium" role="alert">
                    {fieldError}
                  </p>
                )}
              </div>
            );
          }

          // 4. Multi-select Chip Toggle control
          if (field.type === 'chip-toggle') {
            return (
              <div key={field.name} className="col-span-full">
                <Field
                  label={field.label}
                  required={field.required}
                  hint={field.helperText}
                  error={fieldError}
                  disabled={field.disabled || isSubmitting}
                >
                  <Controller
                    control={control}
                    name={field.name as Path<TFieldValues>}
                    render={({ field: controllerField }) => {
                      const selectedValues: string[] = Array.isArray(controllerField.value)
                        ? controllerField.value
                        : [];

                      const toggleChip = (val: string) => {
                        if (selectedValues.includes(val)) {
                          controllerField.onChange(selectedValues.filter((v) => v !== val));
                        } else {
                          controllerField.onChange([...selectedValues, val]);
                        }
                      };

                      return (
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {field.options?.map((option) => (
                            <ChipToggle
                              key={String(option.value)}
                              checked={selectedValues.includes(String(option.value))}
                              onChange={() => toggleChip(String(option.value))}
                              disabled={field.disabled || option.disabled || isSubmitting}
                            >
                              {option.label}
                            </ChipToggle>
                          ))}
                        </div>
                      );
                    }}
                  />
                </Field>
              </div>
            );
          }

          // 5. Multi-select Checkbox Group control
          if (field.type === 'checkbox-group') {
            return (
              <div key={field.name} className="col-span-full">
                <Controller
                  control={control}
                  name={field.name as Path<TFieldValues>}
                  render={({ field: controllerField }) => {
                    const selectedValues: string[] = Array.isArray(controllerField.value)
                      ? controllerField.value
                      : [];

                    const toggleCheckbox = (val: string) => {
                      if (selectedValues.includes(val)) {
                        controllerField.onChange(selectedValues.filter((v) => v !== val));
                      } else {
                        controllerField.onChange([...selectedValues, val]);
                      }
                    };

                    return (
                      <CheckboxGroup
                        label={field.label}
                        description={field.helperText}
                        error={fieldError}
                        required={field.required}
                      >
                        {field.options?.map((option) => (
                          <Checkbox
                            key={String(option.value)}
                            label={option.label}
                            description={option.description}
                            checked={selectedValues.includes(String(option.value))}
                            onChange={() => toggleCheckbox(String(option.value))}
                            disabled={field.disabled || option.disabled || isSubmitting}
                          />
                        ))}
                      </CheckboxGroup>
                    );
                  }}
                />
              </div>
            );
          }

          // 6. Standard input (text, email, tel, number)
          return (
            <div key={field.name} className={isFullWidth ? 'col-span-full' : 'col-span-1'}>
              <Field
                label={field.label}
                required={field.required}
                hint={field.helperText}
                error={fieldError}
                disabled={field.disabled || isSubmitting}
              >
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  disabled={field.disabled || isSubmitting}
                  {...register(field.name as Path<TFieldValues>, {
                    valueAsNumber: field.type === 'number',
                  })}
                />
              </Field>
            </div>
          );
        })}

        {/* Optional explicit consent agreement checkbox */}
        {consentLabel && (
          <div className="col-span-full pt-1">
            <ConsentCheckbox
              label={consentLabel}
              required={true}
              error={errors[consentFieldName]?.message as string | undefined}
              disabled={isSubmitting}
              {...register(consentFieldName as Path<TFieldValues>)}
            />
          </div>
        )}
      </div>

      {/* Accessible submission status banner */}
      <FormStatus status={status} message={message} />

      {/* Submit action */}
      <div className="pt-2">
        <Button
          type="submit"
          variant={submitVariant}
          icon={submitIcon}
          loading={isSubmitting}
          className="w-full sm:w-auto sm:min-w-[200px]"
        >
          {isSubmitting ? 'Submitting...' : submitLabel || config.submitLabel || 'Submit'}
        </Button>
      </div>
    </form>
  );
}
