'use client';

import React, { createContext, useContext, useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface FieldContextValue {
  /** Unique ID of the associated form control */
  id: string;
  /** ID of the error message element, if present */
  errorId?: string;
  /** ID of the hint message element, if present */
  hintId?: string;
  /** Combined aria-describedby string for hint and error */
  describedBy?: string;
  /** Whether the field is in an error state */
  hasError: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Hook to access field context from wrapped form controls.
 */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps {
  /** Explicit HTML ID for the control. If omitted, a unique ID is automatically generated. */
  id?: string;
  /** Label text displayed above the control */
  label?: React.ReactNode;
  /** Whether the field is required. Renders a danger-toned asterisk */
  required?: boolean;
  /** Optional secondary hint/help text */
  hint?: React.ReactNode;
  /** Optional validation error message */
  error?: React.ReactNode;
  /** Whether the wrapped control is disabled */
  disabled?: boolean;
  /** Optional custom class name for the field container */
  className?: string;
  /** Form control(s) and accompanying elements */
  children: React.ReactNode;
}

/**
 * Accessible field wrapper associating labels, hints, and error messages with form controls.
 */
export function Field({
  id: explicitId,
  label,
  required = false,
  hint,
  error,
  disabled = false,
  className,
  children,
}: FieldProps) {
  const generatedId = useId();
  const fieldId = explicitId || generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;
  const hasError = Boolean(error);

  const contextValue: FieldContextValue = {
    id: fieldId,
    errorId,
    hintId,
    describedBy,
    hasError,
    required,
    disabled,
  };

  return (
    <FieldContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'text-navy text-sm font-medium select-none',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {label}
            {required && (
              <span className="text-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {children}

        {hint && (
          <p id={hintId} className="text-muted text-xs leading-normal">
            {hint}
          </p>
        )}

        {error && (
          <div
            id={errorId}
            className="text-danger flex items-center gap-1.5 text-xs leading-normal font-medium"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </FieldContext.Provider>
  );
}
