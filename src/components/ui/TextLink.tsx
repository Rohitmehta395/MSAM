import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface TextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Navigation destination URL */
  href: LinkProps['href'];
  /** Optional Next.js prefetch behavior */
  prefetch?: LinkProps['prefetch'];
  /** Optional Next.js replace navigation */
  replace?: LinkProps['replace'];
  /** Optional Next.js scroll control */
  scroll?: LinkProps['scroll'];
  /** Optional Next.js shallow routing */
  shallow?: LinkProps['shallow'];
  /** If true, renders light text colors for dark surfaces. Default: false */
  onDark?: boolean;
  /** Whether to render trailing arrow icon. Default: true */
  icon?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Link content */
  children: React.ReactNode;
}

/**
 * Semantic text link component with bold styling, hover underline, and animated trailing arrow.
 */
export function TextLink({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  onDark = false,
  icon = true,
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      className={cn(
        'group inline-flex items-center gap-1.5 font-bold transition-colors duration-150',
        'underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2',
        onDark
          ? 'text-white hover:text-white/90 focus-visible:outline-white'
          : 'text-navy hover:text-navy/90 focus-visible:outline-navy',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
