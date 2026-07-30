import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-heading font-bold transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] rounded-full focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] group',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[#FF7A00] to-[#F58220] text-white hover:from-[#e56d00] hover:to-[#e07517] shadow-[0_8px_20px_rgba(245,130,32,0.35)] hover:shadow-[0_12px_28px_rgba(245,130,32,0.48)] hover:-translate-y-0.5',
        secondary: 'bg-white text-brand-primary border border-slate-200/90 hover:bg-slate-50 hover:border-brand-primary/40 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5',
        dark: 'bg-brand-dark text-white hover:bg-brand-darkHover shadow-soft hover:-translate-y-0.5',
        ghost: 'bg-transparent text-brand-primary hover:bg-brand-light hover:text-brand-secondary',
        outline: 'border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white',
        whatsapp: 'bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_24px_rgba(37,211,102,0.45)] hover:-translate-y-0.5',
      },
      size: {
        sm: 'h-9 px-5 text-xs tracking-wide',
        md: 'h-11 px-7 text-sm',
        lg: 'h-13 px-8 text-base py-3.5',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, icon, iconPosition = 'right', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="mr-2.5 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="ml-2.5 transition-transform group-hover:translate-x-1">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
