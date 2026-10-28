'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface NewsletterFormProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * Presentational newsletter subscription form.
 * Visual form only for Part 3.4; submission handling will be wired in Part 4.4.
 */
export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Wire up newsletter submission API / Server Action in Part 4.4
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('relative w-full', className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="focus-within:border-gold focus-within:ring-gold relative flex h-12 w-full items-center rounded-full border border-white/20 bg-white/5 pr-1.5 pl-4 transition-colors duration-150 focus-within:ring-1 hover:border-white/30">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          autoComplete="email"
          className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="bg-gold text-navy hover:bg-gold/90 active:bg-gold/80 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
