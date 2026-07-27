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
              for <span className="text-brand-secondary underline decoration-brand-secondary/30 decoration-wavy decoration-2">Business Solutions</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-brand-muted max-w-xl font-body leading-relaxed">
              We provide high quality products, professional services and social initiatives to help businesses and communities grow stronger together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Explore Products
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Our Services
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

          {/* Right Hero Visual Collage */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              
              {/* Outer Brand Arch Circle matching Logo */}
              <div className="absolute inset-0 rounded-full border-[14px] border-brand-secondary/90 transform -rotate-12 scale-95 shadow-orange-glow pointer-events-none z-0" />
              <div className="absolute inset-2 rounded-full border-[10px] border-brand-primary transform rotate-6 scale-90 opacity-90 pointer-events-none z-0" />

              {/* Main Circular Mask Frame */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                  alt="BS Smart Solution Industrial & Business Collage"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
