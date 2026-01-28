'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';
type IconVariant = 'default' | 'muted' | 'inverse' | 'brand';

export interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  icon: LucideIcon;
  size?: IconSize;
  variant?: IconVariant;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const sizeClasses: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const variantClasses: Record<IconVariant, string> = {
  default: 'text-slate-100',
  muted: 'text-slate-400',
  inverse: 'text-slate-900',
  brand: 'text-blue-400',
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = 'md', variant = 'default', className, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClasses[size], variantClasses[variant], className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

