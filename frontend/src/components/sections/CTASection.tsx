import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-brand-dark rounded-2xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            {/* Left Brand Arcs Overlay Decorative */}
            <div className="absolute -left-10 -bottom-10 w-48 h-48 border-[12px] border-brand-secondary/20 rounded-full pointer-events-none" />
            <div className="absolute -right-10 -top-10 w-48 h-48 border-[12px] border-brand-primary/40 rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Need a Business Solution?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                We are here to help you with the right products, services and support for your business. Get custom bulk quotes within hours.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center md:items-end gap-2 flex-shrink-0">
              <Link to="/enquiry">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<MessageCircle className="w-5 h-5 text-white" />}
                  className="shadow-orange-glow hover:scale-105"
                >
                  Enquire on WhatsApp
                </Button>
              </Link>
              <span className="text-[11px] text-slate-400">
                Get a quick response from our team
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
