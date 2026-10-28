'use client';

import React, { useId, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

export interface SegmentedControlOption<T extends string = string> {
  /** Value identifying the option */
  value: T;
  /** Primary label content */
  label: React.ReactNode;
  /** Optional badge text or node (e.g. 'MOST IMPACT') */
  badge?: React.ReactNode;
  /** Whether this specific option is disabled */
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  /** Group name for the underlying native radio inputs */
  name?: string;
  /** Accessible label for the radiogroup */
  'aria-label'?: string;
  /** List of segmented options */
  options: SegmentedControlOption<T>[];
  /** Controlled selected value */
  value?: T;
  /** Initial selected value for uncontrolled operation */
  defaultValue?: T;
  /** Change callback invoked when selection changes */
  onChange?: (value: T) => void;
  /** Whether the entire control is disabled */
  disabled?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Segmented control component featuring a lavender pill track and navy active pill selection.
 */
export function SegmentedControl<T extends string = string>({
  name: explicitName,
  'aria-label': ariaLabel,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className,
}: SegmentedControlProps<T>) {
  const generatedName = useId();
  const groupName = explicitName || generatedName;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue ?? options[0]?.value,
  );

  const currentValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (val: T) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'rounded-pill bg-lavender inline-flex w-full items-center p-1 select-none sm:w-auto',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        const isOptionDisabled = disabled || option.disabled;
        const optionId = `${groupName}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={cn(
              'group rounded-pill relative flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-2 text-center text-sm font-semibold transition-colors sm:flex-initial',
              isSelected ? 'bg-navy text-white shadow-sm' : 'text-navy/70 hover:text-navy',
              isOptionDisabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <input
              id={optionId}
              type="radio"
              name={groupName}
              value={option.value}
              checked={isSelected}
              disabled={isOptionDisabled}
              onChange={() => handleSelect(option.value)}
              className="peer sr-only"
            />
            <span className="rounded-pill peer-focus-visible:outline-navy pointer-events-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
              {option.label}
            </span>

            {option.badge && (
              <span className="pointer-events-none shrink-0">
                {typeof option.badge === 'string' ? (
                  <Badge
                    tone="gold"
                    className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                  >
                    {option.badge}
                  </Badge>
                ) : (
                  option.badge
                )}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
