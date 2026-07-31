import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Users, Target, Heart, Package, 
  Wrench, CheckCircle2, ArrowRight, Building, Truck, Clock, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: <Package className="w-8 h-8 text-brand-primary" />,
      title: 'Wholesale B2B Products',
      subtitle: 'Bulk Industrial Procurement',
      description: 'We supply high-demand packaging materials, safety equipment, electrical goods, plumbing supplies, office products, and industrial tools directly to businesses, factories, and contractors with minimum order quantities.',
      badge: 'B2B Marketplace'
    },
    {
      icon: <Wrench className="w-8 h-8 text-brand-secondary" />,
      title: 'Verified Local Services',
      subtitle: 'On-Demand Professional Services',
      description: 'From civil construction and interior design to AC repairs, IT solutions, and transport logistics, our certified technicians deliver reliable, on-time doorstep and commercial services.',
      badge: 'Certified Technicians'
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600 fill-emerald-100" />,
      title: 'Social Impact Wing',
      subtitle: 'NGO & Community Support',
      description: 'We connect generous donors and corporate CSR drives with nearby verified NGOs, orphanages, and old-age homes for surplus food, clothes, education support, and digital device donations.',
      badge: 'Community Mission'
    }
  ];

  const stats = [
    { label: 'Corporate Clients', value: '500+' },
    { label: 'Bulk Orders Fulfilled', value: '10,000+' },
    { label: 'Verified Service Partners', value: '150+' },
    { label: 'NGO & Social Drives', value: '50+' }
  ];

  const values = [
    {
      title: 'Quality Assurance',
      desc: 'Every product and service undergoes strict quality inspection before delivery to ensure zero compromise on standards.'
    },
    {
      title: 'Transparent Quotation',
      desc: 'No hidden charges. Quick WhatsApp-based customized quotation tailored to your bulk quantities and specifications.'
    },
    {
      title: 'Timely Execution',
      desc: 'Dedicated account managers ensuring on-time dispatch of bulk orders and rapid doorstep service technician dispatch.'
    },
    {
      title: 'Social Responsibility',
      desc: 'Reinvesting our resources into community drives, food distribution, and student education support.'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-16">
          
          {/* Section 1: Hero Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider">
              About BS Smart Solution
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-brand-primary tracking-tight leading-[1.12]">
              Building Stronger Businesses & <span className="text-brand-secondary">Communities</span>
            </h1>
            <p className="text-base sm:text-lg text-brand-muted font-body leading-relaxed">
              BS Smart Solution is India’s premier hybrid platform bridging B2B wholesale procurement, verified local services, and social impact initiatives under one seamless ecosystem.
            </p>
          </div>

          {/* Section 2: Visual Hero Graphic & Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-brand-border shadow-soft">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 rounded-md bg-brand-secondary/10 text-brand-secondary text-xs font-bold font-heading uppercase">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-brand-primary tracking-tight">
                One Platform for All Your Industrial, Service & Social Needs
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Founded with a vision to simplify commercial sourcing, BS Smart Solution combines the bulk wholesale power of a B2B marketplace with the convenience of on-demand local services and a dedicated community charity wing.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed">
                Whether you are an e-commerce seller needing 5,000 corrugated shipping boxes, a business seeking office interior renovation, or a company looking to donate surplus food to local orphanages, we coordinate everything smoothly through a single WhatsApp quotation system.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    Explore Products
                  </Button>
                </Link>
                <Link to="/enquiry">
                  <Button variant="secondary" size="md" icon={<MessageSquare className="w-4 h-4" />}>
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-brand-border">
                <img
                  src="/hero-illustration.jpg"
                  alt="BS Smart Solution Business & Industrial Hub"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Statistics Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-brand-border text-center shadow-soft hover:shadow-hover transition-all">
                <p className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary">{st.value}</p>
                <p className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">{st.label}</p>
              </div>
            ))}
          </div>

          {/* Section 4: Our 3 Core Pillars */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-extrabold font-heading text-brand-primary tracking-tight">
                Our 3 Core Business Pillars
              </h2>
              <p className="text-sm text-brand-muted">
                Engineered to support corporate buyers, facility managers, homeowners, and charitable donors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => (
                <GlassCard key={idx} className="p-8 flex flex-col justify-between h-full bg-white hover:border-brand-secondary/50">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center border border-brand-border">
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">{pillar.badge}</span>
                      <h3 className="text-xl font-bold font-heading text-brand-primary mt-1">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-brand-border/60">
                    <span className="text-xs font-semibold text-brand-primary flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Reliable Execution
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Section 5: Core Values */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-border shadow-soft space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="px-3 py-1 rounded-md bg-brand-primary/10 text-brand-primary text-xs font-bold font-heading uppercase">
                Why Choose Us
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-brand-primary tracking-tight">
                Built on Trust, Efficiency & Value
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-brand-light border border-brand-border/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold font-heading text-brand-primary">{v.title}</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5.5: Customer Testimonials & Reviews */}
          <TestimonialsSection />

          {/* Section 6: CTA Box */}
          <div className="bg-gradient-to-r from-brand-primary via-brand-dark to-brand-primary text-white p-10 sm:p-14 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
                Ready to Experience Smart Solutions?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with our team on WhatsApp for instant bulk product quotations or doorstep service scheduling.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link to="/products">
                  <Button variant="secondary" size="lg" icon={<Package className="w-5 h-5" />}>
                    Wholesale Products
                  </Button>
                </Link>
                <Link to="/enquiry">
                  <Button variant="whatsapp" size="lg" icon={<MessageSquare className="w-5 h-5" />}>
                    Request Quote on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
