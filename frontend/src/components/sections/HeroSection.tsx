import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-brand-light/50 to-white">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-brand-primary tracking-tight leading-[1.12]">
              Your Trusted Partner <br className="hidden sm:inline" />
              for <span className="text-brand-secondary underline decoration-brand-secondary/30 decoration-wavy decoration-2">Business & Local Services</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-brand-muted max-w-xl font-body leading-relaxed">
              Wholesale B2B products & local verified services connected directly to your WhatsApp for instant quotes, delivery, and social impact drives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Wholesale Products
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Local Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators Row */}
            <div className="pt-8 border-t border-brand-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Reliable</p>
                  <p className="text-[11px] text-brand-muted">Solutions</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Professional</p>
                  <p className="text-[11px] text-brand-muted">Team</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">On Time</p>
                  <p className="text-[11px] text-brand-muted">Delivery</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Customer</p>
                  <p className="text-[11px] text-brand-muted">Focused</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Illustration */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <img
                src="/hero-illustration.jpg"
                alt="BS Smart Solution Industrial & Business Solutions Illustration"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700 drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
