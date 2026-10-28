'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { useFieldContext } from './Field';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** If true, renders textarea in validation error styling independently of Field wrapper */
  error?: boolean;
}

/**
 * Presentational multi-line textarea component styled with MSAM design tokens and full ref forwarding.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id: explicitId, className, error, disabled, required, ...props },
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
    <textarea
      ref={ref}
      id={id}
      required={isRequired}
      disabled={isDisabled}
      aria-invalid={hasError ? 'true' : undefined}
      aria-describedby={describedBy}
      className={cn(
        'rounded-field text-navy min-h-[112px] w-full resize-y border bg-white px-4 py-3 text-base transition-colors',
        'placeholder:text-muted/70',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        hasError
          ? 'border-danger focus-visible:outline-danger'
          : 'border-border hover:border-navy/40 focus-visible:outline-navy',
        isDisabled && 'bg-canvas cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    />
  );
});
