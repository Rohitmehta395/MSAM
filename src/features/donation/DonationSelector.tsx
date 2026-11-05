'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { ZeffyDonationEmbed } from './ZeffyDonationEmbed';
import type { HomeDonationContent } from '@/content/home';

export interface DonationSelectorProps {
  /** Optional custom selector content override */
  selectorContent?: HomeDonationContent['selector'];
  /** Optional custom class name */
  className?: string;
}

export type DonationFrequency = 'once' | 'monthly';

/**
 * Donation card container hosting the official Zeffy embedded checkout.
 *
 * Grounded in:
 * - Approved Home Donation section design & white card geometry
 * - Official Zeffy embed integration (https://www.zeffy.com/embed/v2/zeffy-embed.js)
 *
 * Preserves the white card styling, rounded corners, float shadow,
 * border treatment, and responsive layout while delegating the full
 * donation selection and payment workflow to Zeffy.
 */
export function DonationSelector({ className }: DonationSelectorProps) {
  return (
    <div
      className={cn(
        'rounded-card shadow-float border-border/50 text-navy w-full max-w-xl border bg-white p-4 transition-all sm:p-6 md:p-8',
        className,
      )}
    >
      <ZeffyDonationEmbed />
    </div>
  );
}
