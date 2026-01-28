import React from 'react';
import { cx } from './classNames';

export default function GameShell({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cx(
        'min-h-[500px] rounded-2xl border border-slate-200 shadow-sm bg-white',
        className
      )}
    >
      <div className={cx('p-4 md:p-6', contentClassName)}>{children}</div>
    </div>
  );
}

