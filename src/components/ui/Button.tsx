import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { ArrowRight, Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIcon = 'arrow' | 'heart' | 'none';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-navy hover:bg-gold/90 active:bg-gold/80 focus-visible:outline-navy',
  secondary:
    'bg-transparent border border-navy text-navy hover:bg-navy/5 active:bg-navy/10 focus-visible:outline-navy',
  dark: 'bg-navy text-white hover:bg-navy/90 active:bg-navy/80 focus-visible:outline-navy',
  light: 'bg-white text-navy hover:bg-white/90 active:bg-white/80 focus-visible:outline-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm gap-2',
  md: 'h-12 px-6 text-base gap-2.5',
  lg: 'h-14 px-8 text-lg gap-3',
};

const iconSizes: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-5 h-5',
};

interface BaseButtonProps {
  /** Visual styling variant. Default: 'primary' */
  variant?: ButtonVariant;
  /** Button height and sizing tier. Default: 'md' */
  size?: ButtonSize;
  /** Trailing icon type. Default: 'none' */
  icon?: ButtonIcon;
  /** When true, disables interactions and displays spinner while preserving layout dimensions. Default: false */
  loading?: boolean;
  /** When true, stretches button to occupy 100% of parent width. Default: false */
  fullWidth?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Button content */
  children?: React.ReactNode;
}

export type ButtonAsButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: LinkProps['href'];
    prefetch?: LinkProps['prefetch'];
    replace?: LinkProps['replace'];
    scroll?: LinkProps['scroll'];
    shallow?: LinkProps['shallow'];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * Polymorphic button component rendering either a Next.js Link or an HTML button with consistent design tokens.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon = 'none',
  loading = false,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isButtonDisabled =
    loading ||
    ('disabled' in props &&
      Boolean((props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled));

  const baseClasses = cn(
    'relative group inline-flex items-center justify-center rounded-pill font-semibold select-none whitespace-nowrap',
    'transition-colors duration-150 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    isButtonDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  const iconClass = cn(
    'shrink-0',
    iconSizes[size],
    variant === 'dark' && icon === 'arrow' ? 'text-gold' : undefined,
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <Loader2
          className={cn(
            'shrink-0 animate-spin',
            iconSizes[size],
            variant === 'dark' ? 'text-gold' : undefined,
          )}
          aria-hidden="true"
        />
      );
    }

    if (icon === 'arrow') {
      return (
        <ArrowRight
          className={cn(iconClass, 'transition-transform group-hover:translate-x-0.5')}
          aria-hidden="true"
        />
      );
    }

    if (icon === 'heart') {
      return <Heart className={iconClass} aria-hidden="true" />;
    }

    return null;
  };

  const content = (
    <>
      <span
        className={cn(
          'inline-flex items-center gap-[inherit]',
          loading && icon === 'none' && 'invisible',
        )}
      >
        <span>{children}</span>
        {icon !== 'none' && renderIcon()}
      </span>
      {loading && icon === 'none' && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Loader2
            className={cn(
              'shrink-0 animate-spin',
              iconSizes[size],
              variant === 'dark' ? 'text-gold' : undefined,
            )}
          />
        </span>
      )}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, prefetch, replace, scroll, shallow, ...anchorProps } = props as ButtonAsLinkProps;
    // Strip button-specific attributes so they cannot leak into Link as invalid DOM attributes
    const cleanAnchorProps = { ...anchorProps } as Record<string, unknown>;
    delete cleanAnchorProps.type;
    delete cleanAnchorProps.disabled;
    delete cleanAnchorProps.form;
    delete cleanAnchorProps.formAction;
    delete cleanAnchorProps.formEncType;
    delete cleanAnchorProps.formMethod;
    delete cleanAnchorProps.formNoValidate;
    delete cleanAnchorProps.formTarget;

    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        className={baseClasses}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isButtonDisabled ? 'true' : undefined}
        tabIndex={isButtonDisabled ? -1 : undefined}
        {...(cleanAnchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={buttonProps.type ?? 'button'}
      disabled={isButtonDisabled}
      aria-busy={loading ? 'true' : undefined}
      className={baseClasses}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
