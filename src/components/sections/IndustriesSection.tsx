import React from 'react';
import { Building, Factory, Stethoscope, GraduationCap, Building2, ShoppingCart, Truck, Utensils } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    { name: 'Construction', icon: Building },
    { name: 'Manufacturing', icon: Factory },
    { name: 'Healthcare', icon: Stethoscope },
    { name: 'Education', icon: GraduationCap },
    { name: 'Corporate', icon: Building2 },
    { name: 'Retail', icon: ShoppingCart },
    { name: 'Logistics', icon: Truck },
    { name: 'Hospitality', icon: Utensils },
  ];

  return (
    <section className="py-20 bg-brand-light/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center space-y-10">
          
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              Empowering diverse business sectors with specialized supply chain and service execution
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {industries.map((ind, idx) => {
              const IconComponent = ind.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-primary/30 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center space-y-3 cursor-pointer group"
                >
                  <div className="p-3.5 rounded-xl bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                    {ind.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
