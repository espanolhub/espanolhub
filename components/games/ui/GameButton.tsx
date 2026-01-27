import React from 'react';
import { cx } from './classNames';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export default function GameButton({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2';

  const sizes: Record<Size, string> = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const variants: Record<Variant, string> = {
    primary: 'bg-slate-900 text-white border border-slate-900 hover:bg-slate-800',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-50',
  };

  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

