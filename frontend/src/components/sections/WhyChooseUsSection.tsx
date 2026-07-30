import React from 'react';
import { ShieldCheck, Users, Clock, CheckCircle2, Box } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      title: 'Reliable',
      subtitle: 'Solutions',
      description: 'Dependable industrial supply chains & verified quality standards.',
      icon: ShieldCheck,
    },
    {
      title: 'Professional',
      subtitle: 'Team',
      description: 'Dedicated account managers & expert technical field advisors.',
      icon: Users,
    },
    {
      title: 'On Time',
      subtitle: 'Delivery',
      description: 'Punctual logistics execution with pan-India dispatch tracking.',
      icon: Clock,
    },
    {
      title: 'Verified',
      subtitle: 'Quality',
      description: 'Strict multi-stage inspection & IS/ISO compliance certifications.',
      icon: CheckCircle2,
    },
    {
      title: 'Bulk Supply',
      subtitle: 'Available',
      description: 'Direct B2B wholesale pricing with flexible payment terms.',
      icon: Box,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center space-y-12">
          
          {/* Section Heading */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
              Why Choose <span className="text-brand-secondary">BS Smart Solution?</span>
            </h2>
            <p className="text-sm text-brand-muted">
              We bring trust, speed, and corporate excellence to every business partnership.
            </p>
          </div>

          {/* 5 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <GlassCard
                  key={idx}
                  className="flex flex-col items-center text-center p-6 hover:border-brand-secondary/40 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-4 group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-lg font-bold font-heading text-brand-primary">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-secondary font-heading mb-2">
                    {feature.subtitle}
                  </span>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
