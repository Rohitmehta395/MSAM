'use client';

import React, { forwardRef, useId } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label content displayed next to the checkbox */
  label?: React.ReactNode;
  /** Optional secondary description text below the label */
  description?: React.ReactNode;
  /** If true, renders checkbox in validation error styling */
  error?: boolean;
}

/**
 * Accessible checkbox component using a native checkbox input and custom styled visual box.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id: explicitId, label, description, className, disabled, error, ...props },
  ref,
) {
  const generatedId = useId();
  const id = explicitId || generatedId;
  const descriptionId = description ? `${id}-desc` : undefined;

  return (
    <label
      htmlFor={id}
      className={cn(
        'group relative inline-flex cursor-pointer items-start gap-3 select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <div className="relative flex items-center pt-0.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          aria-describedby={descriptionId}
          aria-invalid={error ? 'true' : undefined}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border bg-white transition-colors',
            'peer-focus-visible:outline-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
            error
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

      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-navy text-sm leading-snug font-medium">{label}</span>}
          {description && (
            <span id={descriptionId} className="text-muted mt-0.5 text-xs leading-normal">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
});
