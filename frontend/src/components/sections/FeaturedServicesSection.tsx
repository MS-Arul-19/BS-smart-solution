import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Service } from '../../types';
import { api } from '../../api/client';
import { ServiceCard } from '../cards/ServiceCard';

export const FeaturedServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    api.getServices({ featured: true }).then(data => {
      setServices(data);
    });
  }, []);

  const nextSlide = () => {
    if (services.length > 4) {
      setScrollIndex((prev) => (prev + 1) % (services.length - 3));
    }
  };

  const prevSlide = () => {
    if (services.length > 4) {
      setScrollIndex((prev) => (prev === 0 ? services.length - 4 : prev - 1));
    }
  };

  return (
    <section className="py-16 bg-brand-light/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-brand-primary tracking-tight">
                Featured Services
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Turnkey corporate solutions, civil interior fitouts & IT infrastructure
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link
                to="/services"
                className="inline-flex items-center text-sm font-heading font-semibold text-brand-secondary hover:underline"
              >
                <span>View all services</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-brand-border text-brand-primary hover:bg-white transition-colors"
                  aria-label="Previous Services"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-brand-border text-brand-primary hover:bg-white transition-colors"
                  aria-label="Next Services"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(scrollIndex, scrollIndex + 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
