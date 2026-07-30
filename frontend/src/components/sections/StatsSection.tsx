import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Package, Cog, Heart, Building2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      value: 55,
      suffix: '+',
      title: 'Products',
      description: 'Quality business supplies',
      icon: Package,
    },
    {
      value: 93,
      suffix: '+',
      title: 'Services',
      description: 'Professional solutions',
      icon: Cog,
    },
    {
      value: 42,
      suffix: '+',
      title: 'Social Initiatives',
      description: 'Community programs',
      icon: Heart,
    },
    {
      value: 500,
      suffix: '+',
      title: 'Business Clients',
      description: 'Across various industries',
      icon: Building2,
    },
  ];

  return (
    <section className="py-10" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-brand-dark rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Background Subtle Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#F68B00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-secondary/40 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-soft">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <div className="text-left">
                      <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                        {inView ? (
                          <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                        ) : (
                          `0${stat.suffix}`
                        )}
                      </div>
                      <div className="text-sm font-semibold font-heading text-brand-secondary mt-0.5">
                        {stat.title}
                      </div>
                      <div className="text-xs text-slate-300">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
