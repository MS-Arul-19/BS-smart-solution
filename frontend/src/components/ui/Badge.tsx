import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  const variants = {
    primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
    secondary: 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20',
    outline: 'bg-white/80 text-brand-muted border border-brand-border',
    dark: 'bg-brand-dark text-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };

  return (
    <span className={cn('inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full font-heading tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
};
