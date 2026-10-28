'use client';

import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useFieldContext } from './Field';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** If true, renders select in validation error styling independently of Field wrapper */
  error?: boolean;
}

/**
 * Styled native HTML select component with custom chevron indicator and full ref forwarding.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id: explicitId, className, error, disabled, required, children, ...props },
  ref,
) {
  const fieldContext = useFieldContext();

  const id = explicitId ?? fieldContext?.id;
  const isRequired = required ?? fieldContext?.required;
  const isDisabled = disabled ?? fieldContext?.disabled;
  const hasError = error ?? fieldContext?.hasError;

  const describedBy =
    [props['aria-describedby'], fieldContext?.describedBy].filter(Boolean).join(' ') || undefined;

  return (
    <div className="relative w-full">
      <select
        ref={ref}
        id={id}
        required={isRequired}
        disabled={isDisabled}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          'rounded-field text-navy h-[52px] w-full appearance-none border bg-white py-3 pr-10 pl-4 text-base transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          hasError
            ? 'border-danger focus-visible:outline-danger'
            : 'border-border hover:border-navy/40 focus-visible:outline-navy',
          isDisabled && 'bg-canvas cursor-not-allowed opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className={cn(
          'text-muted/70 pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2',
          isDisabled && 'opacity-50',
        )}
        aria-hidden="true"
      />
    </div>
  );
});
