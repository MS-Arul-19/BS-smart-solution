import React from 'react';
import { Star, Quote, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Venkatesh R.',
    role: 'Supply Chain & Logistics Head',
    company: 'Logistics Corp Chennai',
    location: 'Kolathur, Chennai',
    rating: 5,
    comment:
      'BS Smart Solution delivered 2,000 heavy-duty corrugated packing boxes and stretch films to our Kolathur warehouse within 24 hours. Superior burst strength, exact dimensions, and unbeatable wholesale pricing!',
    verified: true,
    category: 'Packaging Materials',
  },
  {
    id: 2,
    name: 'Ananya Krishnan',
    role: 'Facilities & Infrastructure Manager',
    company: 'TechSpace Solutions',
    location: 'Guindy, Chennai',
    rating: 5,
    comment:
      'We contracted BS Smart Solution for complete office electrical maintenance and commercial AC servicing across 3 floors. Professional certified technicians, zero downtime, and transparent B2B billing.',
    verified: true,
    category: 'Corporate Services',
  },
  {
    id: 3,
    name: 'Dr. S. Sundaram',
    role: 'Managing Trustee',
    company: 'Hope Community Foundation',
    location: 'Ambattur, Chennai',
    rating: 5,
    comment:
      'Their community food donation drive and winter clothes distribution in Chennai are truly inspiring. Instant WhatsApp updates, doorstep pickups, and genuine ground-level social impact.',
    verified: true,
    category: 'Social Impact Wing',
  },
  {
    id: 4,
    name: 'Karthik Raja',
    role: 'Procurement Director',
    company: 'Apex Manufacturing Ltd.',
    location: 'Sriperumbudur, Chennai',
    rating: 5,
    comment:
      'Finding a single trusted supplier for industrial safety helmets, reflective jackets, and custom printed employee ID lanyards was easy with BS Smart Solution. Outstanding quality & prompt dispatch.',
    verified: true,
    category: 'Safety & Industrial Supplies',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-light via-white to-brand-light relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-brand-secondary text-brand-secondary" /> Client Feedback & Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
              Trusted by B2B Clients & NGO Partners across Chennai
            </h2>
            <p className="text-base text-brand-muted">
              Here is what corporate procurement managers, factory heads, and community trustees say about our prompt delivery and quality solutions.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((review) => (
              <GlassCard
                key={review.id}
                className="bg-white p-7 rounded-2xl border border-brand-border/80 shadow-soft hover:shadow-hover hover:border-brand-secondary/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                      ))}
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-brand-light text-brand-primary text-[11px] font-bold font-heading border border-brand-border">
                      {review.category}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-brand-text leading-relaxed italic relative pl-4 border-l-2 border-brand-secondary">
                    "{review.comment}"
                  </p>
                </div>

                {/* Client Info Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-brand-primary text-sm">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified B2B Client
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brand-muted flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" /> {review.role} — <span className="font-semibold text-slate-700">{review.company}</span>
                    </p>
                  </div>

                  <span className="text-[11px] text-brand-muted flex items-center gap-1 flex-shrink-0">
                    <MapPin className="w-3 h-3 text-brand-secondary" /> {review.location}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="bg-brand-primary text-white p-6 rounded-2xl border border-brand-primary shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-heading font-bold text-lg">Have a custom wholesale or service requirement?</h4>
              <p className="text-xs text-slate-300">Connect with our Chennai team for instant quotes and volume discounts.</p>
            </div>
            <a
              href="https://wa.me/919345838895?text=Hello%20BS%20Smart%20Solution,%20I%20would%20like%20to%20get%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-amber-600 text-white text-xs font-heading font-bold shadow-md transition-colors flex-shrink-0"
            >
              Chat on WhatsApp: +91 93458 38895
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
