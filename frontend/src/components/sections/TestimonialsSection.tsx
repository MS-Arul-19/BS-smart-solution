import React, { useState } from 'react';
import { Star, CheckCircle2, Building2, MapPin, Plus, MessageSquare, X, Send } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

export interface TestimonialItem {
  id: number | string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  comment: string;
  verified: boolean;
  category: string;
}

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'Venkatesh R.',
    role: 'Supply Chain & Logistics Head',
    company: 'Logistics Corp Chennai',
    location: 'Kolathur, Chennai',
    rating: 5,
    comment:
      'BS 1 Solutions delivered 2,000 heavy-duty corrugated packing boxes and stretch films to our Kolathur warehouse within 24 hours. Superior burst strength, exact dimensions, and unbeatable wholesale pricing!',
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
  const [reviews, setReviews] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    location: 'Chennai',
    rating: 5,
    category: 'Products / Services',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newReview: TestimonialItem = {
      id: `review-${Date.now()}`,
      name: form.name,
      role: form.role || 'Verified Client',
      company: form.company || 'Business Client',
      location: form.location || 'Chennai',
      rating: form.rating,
      comment: form.comment,
      verified: true,
      category: form.category,
    };

    setReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setForm({
        name: '',
        role: '',
        company: '',
        location: 'Chennai',
        rating: 5,
        category: 'Products / Services',
        comment: '',
      });
    }, 1800);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-brand-light via-white to-brand-light relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-brand-secondary text-brand-secondary" /> Client Feedback & Reviews
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
              Trusted by B2B Clients & NGO Partners across Chennai
            </h2>

            <p className="text-base text-brand-muted">
              Here is what corporate procurement managers, factory heads, and community trustees say about our prompt delivery and quality solutions.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
                className="bg-brand-primary hover:bg-brand-secondary shadow-md font-heading"
              >
                Submit Your Client Feedback
              </Button>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
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
                          <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified Client
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

          {/* Bottom Callout Banner */}
          <div className="bg-brand-primary text-white p-6 rounded-2xl border border-brand-primary shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-heading font-bold text-lg">Have a custom wholesale or service requirement?</h4>
              <p className="text-xs text-slate-300">Connect with our Chennai team for instant quotes and volume discounts.</p>
            </div>
            <a
              href="https://wa.me/918637634156?text=Hello%20BS%201%20Solutions,%20I%20would%20like%20to%20get%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-amber-600 text-white text-xs font-heading font-bold shadow-md transition-colors flex-shrink-0"
            >
              Chat on WhatsApp: +91 86376 34156
            </a>
          </div>

        </div>
      </div>

      {/* Client Feedback Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-brand-border shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-md bg-brand-primary/10 text-brand-primary text-[11px] font-bold uppercase">
                Client Review
              </span>
              <h3 className="text-xl font-bold font-heading text-brand-primary">
                Share Your Experience & Feedback
              </h3>
              <p className="text-xs text-brand-muted">
                Your feedback helps us continuously improve our product quality and delivery standards.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-heading text-brand-primary">Thank You for Your Feedback!</h4>
                <p className="text-xs text-brand-muted max-w-xs mx-auto">
                  Your review has been successfully submitted and added to our client feedback showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Role / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Procurement Manager"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Industries"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Kolathur, Chennai"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Solution Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary bg-white"
                    >
                      <option value="Packaging Materials">Packaging Materials</option>
                      <option value="Safety Products">Safety Products</option>
                      <option value="Corporate Services">Corporate Services</option>
                      <option value="Social Impact Wing">Social Impact Wing</option>
                      <option value="Industrial Supplies">Industrial Supplies</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-brand-primary">Rating</label>
                    <div className="flex items-center space-x-1.5 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= form.rating
                                ? 'fill-brand-secondary text-brand-secondary'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-brand-primary">Feedback / Review *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your feedback regarding our product quality, delivery speed, or customer service..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-brand-border">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />}>
                    Submit Review
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
