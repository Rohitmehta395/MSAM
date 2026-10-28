import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckboxGroupProps {
  /** Legend title for the fieldset group */
  label?: React.ReactNode;
  /** Optional secondary description or instruction text */
  description?: React.ReactNode;
  /** Optional validation error message for the group */
  error?: React.ReactNode;
  /** Whether the entire group is marked required */
  required?: boolean;
  /** Optional custom class name for the fieldset */
  className?: string;
  /** Optional custom class name for the checkbox container */
  itemsClassName?: string;
  /** Checkbox items */
  children: React.ReactNode;
}

/**
 * Semantic fieldset container for grouping multiple related checkbox controls.
 */
export function CheckboxGroup({
  label,
  description,
  error,
  required = false,
  className,
  itemsClassName,
  children,
}: CheckboxGroupProps) {
  const generatedId = useId();
  const descriptionId = description ? `${generatedId}-desc` : undefined;
  const errorId = error ? `${generatedId}-error` : undefined;

  return (
    <fieldset
      aria-describedby={[errorId, descriptionId].filter(Boolean).join(' ') || undefined}
      className={cn('flex flex-col gap-2', className)}
    >
      {label && (
        <legend className="text-navy text-sm font-medium select-none">
          {label}
          {required && (
            <span className="text-danger ml-1" aria-hidden="true">
              *
            </span>
          )}
        </legend>
      )}

      {description && (
        <p id={descriptionId} className="text-muted -mt-1 text-xs leading-normal">
          {description}
        </p>
      )}

      <div className={cn('flex flex-wrap gap-4 pt-1', itemsClassName)}>{children}</div>

      {error && (
        <div
          id={errorId}
          className="text-danger mt-0.5 flex items-center gap-1.5 text-xs leading-normal font-medium"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </fieldset>
  );
}
