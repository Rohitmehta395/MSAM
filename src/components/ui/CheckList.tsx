import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Array of checklist item contents */
  items: (React.ReactNode | string)[];
  /** Whether the list is rendered on a dark background. Default: false */
  onDark?: boolean;
  /** Optional custom class name for the <ul> wrapper */
  className?: string;
  /** Optional custom class name for each <li> row */
  itemClassName?: string;
}

/**
 * Checklist component rendering list items with success-toned checkmarks or dark-mode badges.
 */
export function CheckList({
  items,
  onDark = false,
  className,
  itemClassName,
  ...props
}: CheckListProps) {
  return (
    <ul className={cn('flex flex-col gap-2.5', className)} {...props}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            'flex items-start gap-3 text-sm leading-relaxed md:text-base',
            onDark ? 'text-white/90' : 'text-navy/90',
            itemClassName,
          )}
        >
          <span
            className={cn(
              'mt-0.5 flex shrink-0 items-center justify-center',
              onDark ? 'text-gold h-5 w-5 rounded-full bg-white/10' : 'text-success',
            )}
            aria-hidden="true"
          >
            <Check
              className={cn(onDark ? 'h-3 w-3 stroke-[2.5]' : 'h-4.5 w-4.5 stroke-[2.5]')}
              aria-hidden="true"
            />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
