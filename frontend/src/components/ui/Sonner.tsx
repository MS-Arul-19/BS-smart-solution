import React from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-brand-primary group-[.toaster]:border-brand-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-heading font-medium',
          description: 'group-[.toast]:text-brand-muted',
          actionButton:
            'group-[.toast]:bg-brand-primary group-[.toast]:text-white font-semibold',
          cancelButton:
            'group-[.toast]:bg-brand-light group-[.toast]:text-brand-muted',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
