import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const MainOptionCards: React.FC = () => {
  const options = [
    {
      title: 'Products',
      description: 'Wide range of quality products for your business needs',
      ctaText: 'Explore Products',
      link: '/products',
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto text-brand-primary">
          <rect x="20" y="40" width="40" height="40" rx="8" fill="#0D2F63" opacity="0.9" />
          <rect x="70" y="25" width="45" height="55" rx="8" fill="#F68B00" opacity="0.95" />
          <rect x="40" y="60" width="35" height="35" rx="6" fill="#081F44" opacity="0.8" />
          <path d="M 40 40 L 60 20 L 80 40" stroke="#F68B00" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Services',
      description: 'Professional services to help your business grow',
      ctaText: 'Explore Services',
      link: '/services',
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto">
          <circle cx="80" cy="45" r="22" fill="#0D2F63" opacity="0.9" />
          <path d="M 45 95 C 45 75, 115 75, 115 95" fill="#081F44" />
          <path d="M 100 35 L 125 20 M 110 50 L 130 50 M 100 65 L 125 75" stroke="#F68B00" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Social Services',
      description: 'Join our initiatives for a better and stronger community',
      ctaText: 'Explore Initiatives',
      link: '/social-service',
      illustration: (
        <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto">
          <path d="M 80 30 C 65 10, 40 25, 55 45 L 80 70 L 105 45 C 120 25, 95 10, 80 30 Z" fill="#25D366" />
          <path d="M 30 75 C 50 60, 110 60, 130 75 C 120 90, 40 90, 30 75 Z" fill="#0D2F63" opacity="0.85" />
          <circle cx="80" cy="40" r="10" fill="#F68B00" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {options.map((item, idx) => (
            <Link key={idx} to={item.link} className="group block">
              <GlassCard className="h-full flex flex-col justify-between text-center p-8 gradient-border-hover relative overflow-hidden group-hover:border-brand-secondary/50">
                
                {/* Illustration Header */}
                <div className="py-4 bg-brand-light/60 rounded-2xl mb-6 transform group-hover:scale-105 transition-transform duration-300">
                  {item.illustration}
                </div>

                {/* Content Body */}
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* CTA Link Footer */}
                <div className="pt-6 mt-4 flex items-center justify-center space-x-2 text-brand-secondary font-heading font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

              </GlassCard>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};
