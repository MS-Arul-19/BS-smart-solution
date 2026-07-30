import React from 'react';
import { cn } from '../../utils/cn';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-brand-light/80 dark:bg-slate-800', className)}
      {...props}
    />
  );
}

export { Skeleton };
