import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-neutral-800 border border-black',
  secondary: 'bg-white text-black hover:bg-neutral-50 border border-black',
  ghost: 'bg-transparent text-black hover:underline border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button(props: ButtonProps): React.JSX.Element {
  const { variant = 'primary', size = 'md', className, children } = props;

  const classes = cn(
    'inline-flex items-center justify-center text-caption tracking-widest transition-all duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
