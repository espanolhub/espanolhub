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
        'min-h-[600px] rounded-3xl border border-slate-200 shadow-sm bg-gradient-to-br from-purple-50 via-white to-blue-50',
        className
      )}
    >
      <div className={cx('p-4 sm:p-6 md:p-8', contentClassName)}>{children}</div>
    </div>
  );
}

