import React from 'react';
import { cx } from './classNames';

export type GameTabItem<T extends string> = {
  key: T;
  label: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  badge?: React.ReactNode;
};

export default function GameTabs<T extends string>({
  value,
  onChange,
  items,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  items: Array<GameTabItem<T>>;
  className?: string;
}) {
  return (
    <div className={cx('flex justify-center', className)}>
      <div className="inline-flex flex-nowrap items-center gap-3 min-w-0 overflow-x-auto">
        {items.map((item) => {
          const active = item.key === value;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={cx(
                'inline-flex items-center justify-center gap-2 h-12 min-w-[140px] px-6 rounded-xl font-bold border-2 transition-all duration-200 whitespace-nowrap',
                active
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
              )}
              aria-pressed={active}
            >
              {Icon ? (
                <Icon className={cx('w-6 h-6 flex-shrink-0', active ? 'text-white' : 'text-slate-900')} aria-hidden="true" />
              ) : null}
              <span className={cx('text-sm sm:text-base', active ? 'text-white' : 'text-slate-900')}>{item.label}</span>
              {item.badge ? <span className="flex-shrink-0">{item.badge}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

