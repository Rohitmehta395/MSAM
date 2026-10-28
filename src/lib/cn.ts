import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-section',
        'text-statement',
        'text-card-title',
        'text-lead',
        'text-label',
      ],
    },
  },
});

/**
 * Merges Tailwind CSS class names with clsx conflict resolution and custom typography support.
 */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
