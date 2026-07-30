import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverEffect = true, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/90 backdrop-blur-md border border-brand-border rounded-2xl p-6 shadow-soft transition-all duration-250 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-hover hover:border-brand-primary/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
