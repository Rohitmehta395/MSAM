import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { urgentMessage } from '@/content/navigation';
import { cn } from '@/lib/cn';

export interface UrgentMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional custom class name */
  className?: string;
}

/**
 * Top notification bar displaying urgent prayer assistance phone link and recurring donation CTA.
 * Server Component rendered above the main site header.
 */
export function UrgentMessage({ className, ...props }: UrgentMessageProps) {
  return (
    <div
      role="region"
      aria-label="Urgent Notification"
      className={cn(
        'bg-navy border-b border-white/10 text-xs font-semibold text-white select-none sm:text-[13px] md:text-sm',
        'flex h-[38px] items-center',
        className,
      )}
      {...props}
    >
      <Container className="flex items-center justify-between gap-2 text-xs font-semibold sm:gap-4 sm:text-[13px] md:text-sm">
        {/* Direct-dial telephone link */}
        <a
          href={urgentMessage.phoneHref}
          className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-sm py-1 text-white/95 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="truncate">{urgentMessage.text}</span>
        </a>

        {/* Recurring contribution pathway */}
        <Link
          href={urgentMessage.action.href}
          className="group text-gold hover:text-gold/90 inline-flex shrink-0 items-center gap-1 rounded-sm py-1 font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span>{urgentMessage.action.label}</span>
          <ArrowRight
            className="inline-block h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </div>
  );
}
