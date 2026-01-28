import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cx } from './classNames';

type Accent = 'purple' | 'blue' | 'green' | 'amber' | 'rose' | 'slate' | 'pink' | 'orange';

export type GameCardAccent = Accent;

const accentMap: Record<Accent, { bg: string; ring: string }> = {
  purple: { bg: 'bg-gradient-to-br from-purple-600 to-blue-600', ring: 'group-hover:ring-purple-200' },
  blue: { bg: 'bg-gradient-to-br from-blue-600 to-cyan-600', ring: 'group-hover:ring-blue-200' },
  green: { bg: 'bg-gradient-to-br from-emerald-600 to-green-600', ring: 'group-hover:ring-emerald-200' },
  amber: { bg: 'bg-gradient-to-br from-amber-500 to-orange-600', ring: 'group-hover:ring-amber-200' },
  rose: { bg: 'bg-gradient-to-br from-pink-600 to-rose-600', ring: 'group-hover:ring-rose-200' },
  slate: { bg: 'bg-gradient-to-br from-slate-800 to-slate-900', ring: 'group-hover:ring-slate-200' },
  pink: { bg: 'bg-gradient-to-br from-pink-500 to-purple-600', ring: 'group-hover:ring-pink-200' },
  orange: { bg: 'bg-gradient-to-br from-orange-500 to-red-600', ring: 'group-hover:ring-orange-200' },
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
        'group text-left w-full bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 px-5 py-6',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
        className
      )}
    >
      {imageUrl ? (
        <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-200 mb-4 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          {normalizedIcon ? (
            <div
              className={cx(
                'absolute left-3 top-3 inline-flex items-center justify-center w-10 h-10 rounded-xl ring-4 ring-white/70 shadow-sm',
                acc.bg
              )}
              aria-hidden="true"
            >
              {normalizedIcon}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={cx('inline-flex items-center justify-center w-14 h-14 rounded-2xl ring-4 ring-transparent mb-4', acc.bg, acc.ring)}>
          {normalizedIcon}
        </div>
      )}

      <div className="min-h-[72px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-tight">{title}</h3>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 mt-1 transition-colors" aria-hidden="true" />
        </div>
        {description ? (
          <p className="text-sm md:text-base text-slate-600 mt-2">{description}</p>
        ) : null}
      </div>

      {meta ? <div className="mt-4">{meta}</div> : null}
    </button>
  );
}

