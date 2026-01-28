import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cx } from './classNames';

type Accent = 'purple' | 'blue' | 'green' | 'amber' | 'rose' | 'slate';

const accentMap: Record<Accent, { bg: string; ring: string }> = {
  purple: { bg: 'bg-gradient-to-br from-purple-600 to-blue-600', ring: 'group-hover:ring-purple-200' },
  blue: { bg: 'bg-gradient-to-br from-blue-600 to-cyan-600', ring: 'group-hover:ring-blue-200' },
  green: { bg: 'bg-gradient-to-br from-emerald-600 to-green-600', ring: 'group-hover:ring-emerald-200' },
  amber: { bg: 'bg-gradient-to-br from-amber-500 to-orange-600', ring: 'group-hover:ring-amber-200' },
  rose: { bg: 'bg-gradient-to-br from-pink-600 to-rose-600', ring: 'group-hover:ring-rose-200' },
  slate: { bg: 'bg-gradient-to-br from-slate-800 to-slate-900', ring: 'group-hover:ring-slate-200' },
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

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'group text-left w-full bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 p-5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
        className
      )}
    >
      {imageUrl ? (
        <div className="w-full h-28 rounded-xl overflow-hidden border border-slate-200 mb-4 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={cx('inline-flex items-center justify-center w-14 h-14 rounded-2xl ring-4 ring-transparent mb-4', acc.bg, acc.ring)}>
          <span className="text-2xl text-white">{icon}</span>
        </div>
      )}

      <div className="min-h-[64px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold text-slate-900 leading-tight">{title}</h3>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 mt-1 transition-colors" aria-hidden="true" />
        </div>
        {description ? (
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">{description}</p>
        ) : null}
      </div>

      {meta ? <div className="mt-4">{meta}</div> : null}
    </button>
  );
}

