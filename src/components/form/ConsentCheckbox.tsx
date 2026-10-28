'use client';

import React, { forwardRef, useId } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ConsentCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /** Optional field name identifier (already supplied if spreading register()) */
  name?: string;
  /** Label content displayed next to the checkbox */
  label: React.ReactNode;
  /** Optional secondary description text below the label */
  description?: React.ReactNode;
  /** Optional validation error message */
  error?: string;
  /** Whether consent is required */
  required?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Accessible consent confirmation checkbox for compliance agreements,
 * terms confirmation, and privacy disclosures.
 *
 * NOTE: Never defaults to checked=true. Explicit user action is strictly required.
 */
export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  function ConsentCheckbox(
    {
      id: explicitId,
      name,
      label,
      description,
      error,
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const id = explicitId || generatedId;
    const descriptionId = description ? `${id}-desc` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    const describedBy = [errorId, descriptionId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label
          htmlFor={id}
          className={cn(
            'group relative inline-flex cursor-pointer items-start gap-3 select-none',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <div className="relative flex items-center pt-0.5">
            <input
              ref={ref}
              id={id}
              name={name}
              type="checkbox"
              required={required}
              disabled={disabled}
              aria-invalid={hasError ? 'true' : undefined}
              aria-describedby={describedBy}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border bg-white transition-colors',
                'peer-focus-visible:outline-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                hasError
                  ? 'border-danger peer-focus-visible:outline-danger'
                  : 'border-border peer-hover:border-navy/50',
                'peer-checked:border-navy peer-checked:bg-navy',
                disabled && 'bg-canvas',
              )}
              aria-hidden="true"
            >
              <Check className="peer-checked:group-[]:opacity-100 h-3.5 w-3.5 stroke-[3] text-white opacity-0 transition-opacity" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-navy text-sm leading-snug font-medium">
              {label}
              {required && (
                <span className="text-danger ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </span>
            {description && (
              <span id={descriptionId} className="text-muted mt-0.5 text-xs leading-normal">
                {description}
              </span>
            )}
          </div>
        </label>

        {error && (
          <div
            id={errorId}
            className="text-danger flex items-center gap-1.5 pl-8 text-xs leading-normal font-medium"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  },
);
