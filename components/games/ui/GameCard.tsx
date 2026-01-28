import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cx } from './classNames';

type Accent = 'purple' | 'blue' | 'green' | 'amber' | 'rose' | 'slate' | 'pink' | 'orange';

export type GameCardAccent = Accent;

const accentMap: Record<Accent, { bg: string; ring: string; hover: string; text: string }> = {
  purple: { 
    bg: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700', 
    ring: 'group-hover:ring-purple-300',
    hover: 'hover:border-purple-300 hover:shadow-purple-100',
    text: 'text-purple-700'
  },
  blue: { 
    bg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-700', 
    ring: 'group-hover:ring-blue-300',
    hover: 'hover:border-blue-300 hover:shadow-blue-100',
    text: 'text-blue-700'
  },
  green: { 
    bg: 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700', 
    ring: 'group-hover:ring-emerald-300',
    hover: 'hover:border-emerald-300 hover:shadow-emerald-100',
    text: 'text-emerald-700'
  },
  amber: { 
    bg: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-600', 
    ring: 'group-hover:ring-amber-300',
    hover: 'hover:border-amber-300 hover:shadow-amber-100',
    text: 'text-amber-700'
  },
  rose: { 
    bg: 'bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700', 
    ring: 'group-hover:ring-rose-300',
    hover: 'hover:border-rose-300 hover:shadow-rose-100',
    text: 'text-rose-700'
  },
  slate: { 
    bg: 'bg-gradient-to-br from-slate-600 via-slate-700 to-gray-800', 
    ring: 'group-hover:ring-slate-300',
    hover: 'hover:border-slate-300 hover:shadow-slate-100',
    text: 'text-slate-700'
  },
  pink: { 
    bg: 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600', 
    ring: 'group-hover:ring-pink-300',
    hover: 'hover:border-pink-300 hover:shadow-pink-100',
    text: 'text-pink-700'
  },
  orange: { 
    bg: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600', 
    ring: 'group-hover:ring-orange-300',
    hover: 'hover:border-orange-300 hover:shadow-orange-100',
    text: 'text-orange-700'
  },
};

export default function GameCard({
  title,
  description,
  icon,
  meta,
  imageUrl,
  accent = 'slate',
  onClick,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  imageUrl?: string | null;
  accent?: Accent;
  onClick?: () => void;
  className?: string;
}) {
  const acc = accentMap[accent];
  const normalizedIcon = (() => {
    if (!icon) return null;
    if (typeof icon === 'string' || typeof icon === 'number') {
      return <span className="text-[22px] leading-none text-white">{icon}</span>;
    }
    if (React.isValidElement(icon)) {
      type IconProps = { className?: string; 'aria-hidden'?: boolean };
      const el = icon as React.ReactElement<IconProps>;
      const prev = el.props.className ?? '';
      return React.cloneElement<IconProps>(el, {
        className: cx('w-7 h-7 text-white', prev),
        'aria-hidden': el.props['aria-hidden'] ?? true,
      });
    }
    return null;
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'group text-left w-full bg-white rounded-xl border border-slate-200 transition-all duration-200 px-5 py-5',
        'hover:border-blue-300 hover:shadow-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        className
      )}
    >
      {imageUrl ? (
        <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-200 mb-4 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          {normalizedIcon ? (
            <div
              className={cx(
                'absolute left-3 top-3 inline-flex items-center justify-center w-10 h-10 rounded-lg ring-2 ring-white/80 shadow-md',
                acc.bg
              )}
              aria-hidden="true"
            >
              {normalizedIcon}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={cx(
          'inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-sm',
          acc.bg
        )}>
          {normalizedIcon}
        </div>
      )}

      <div className="min-h-[68px]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
            {title}
          </h3>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5 transition-colors duration-200" aria-hidden="true" />
        </div>
        {description ? (
          <p className="text-sm text-slate-600 mt-1.5 leading-snug">{description}</p>
        ) : null}
      </div>

      {meta ? <div className="mt-4">{meta}</div> : null}
    </button>
  );
}

