import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { MainOptionCards } from '../components/sections/MainOptionCards';
import { FeaturedProductsSection } from '../components/sections/FeaturedProductsSection';
import { FeaturedServicesSection } from '../components/sections/FeaturedServicesSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { CTASection } from '../components/sections/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Statistics Bar */}
      <StatsSection />

      {/* 3. Three Main Category Option Cards */}
      <MainOptionCards />

      {/* 4. Featured Products */}
      <FeaturedProductsSection />

      {/* 5. Featured Services */}
      <FeaturedServicesSection />

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 7. Client Reviews & Feedback */}
      <TestimonialsSection />

      {/* 8. Industries We Serve */}
      <IndustriesSection />

      {/* 9. Call To Action Banner */}
      <CTASection />
    </div>
  );
};
