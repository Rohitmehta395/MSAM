'use client';

import React, { forwardRef, useId } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ChipToggleTone = 'warm' | 'lavender' | 'plain';

export interface ChipToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Input selection type: 'checkbox' for multi-select, 'radio' for single-select. Default: 'checkbox' */
  type?: 'checkbox' | 'radio';
  /** Visual tone matching MSAM form contexts. Default: 'warm' */
  tone?: ChipToggleTone;
  /** Whether to render a leading check icon when checked. Defaults to true for 'warm' and 'lavender', false for 'plain' */
  showCheck?: boolean;
  /** Chip content / label */
  children: React.ReactNode;
}

const toneStyles: Record<ChipToggleTone, { container: string; checked: string }> = {
  warm: {
    container: 'rounded-pill px-4 py-2 text-sm font-medium',
    checked: 'peer-checked:bg-warm peer-checked:border-gold peer-checked:text-navy',
  },
  lavender: {
    container: 'rounded-pill px-4 py-2 text-sm font-medium',
    checked: 'peer-checked:bg-lavender peer-checked:border-navy peer-checked:text-navy',
  },
  plain: {
    container: 'rounded-field px-5 py-3 text-base font-bold min-w-[84px] justify-center',
    checked: 'peer-checked:bg-warm peer-checked:border-gold peer-checked:text-navy',
  },
};

/**
 * Accessible selectable chip or donation tile powered by a visually hidden native input.
 */
export const ChipToggle = forwardRef<HTMLInputElement, ChipToggleProps>(function ChipToggle(
  {
    id: explicitId,
    type = 'checkbox',
    tone = 'warm',
    showCheck,
    className,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = explicitId || generatedId;
  const shouldShowCheck = showCheck ?? tone !== 'plain';

  return (
    <label
      htmlFor={id}
      className={cn(
        'group relative inline-flex cursor-pointer items-center select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type={type}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          'text-navy inline-flex items-center gap-2 border bg-white transition-colors',
          'border-border hover:border-navy/30 peer-checked:[&_svg]:inline-block',
          'peer-focus-visible:outline-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
          toneStyles[tone].container,
          toneStyles[tone].checked,
        )}
      >
        {shouldShowCheck && (
          <Check
            className="text-navy hidden h-3.5 w-3.5 shrink-0 stroke-[2.5]"
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </span>
    </label>
  );
});
