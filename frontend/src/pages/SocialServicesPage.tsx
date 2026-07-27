import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Grid, MapPin, ArrowRight } from 'lucide-react';
import { Category, Service } from '../types';
import { api } from '../api/client';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SocialServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCauseSlug = searchParams.get('cause');

  const [causes, setCauses] = useState<Category[]>([]);
  const [initiatives, setInitiatives] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const causeList = await api.getServiceCategories('social');
      setCauses(causeList);

      const inits = await api.getServices({
        category: selectedCauseSlug || undefined,
        kind: 'social',
      });
      setInitiatives(inits);
      setLoading(false);
    }
    loadData();
  }, [selectedCauseSlug]);

  const handleSelectCause = (slug: string | null) => {
    if (slug) {
      setSearchParams({ cause: slug });
    } else {
      setSearchParams({});
    }
  };

  const activeCauseObj = causes.find((c) => c.slug === selectedCauseSlug);

  return (
    <div className="pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Community Wing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              Social Initiatives & Volunteer Drives
            </h1>
            <p className="text-base text-brand-muted">
              Join our community initiatives for food distribution, education sponsorship, digital literacy, and environmental care.
            </p>
          </div>

          {/* Step 1: 11 Option Cards (All Initiatives + 10 Causes) */}
          {!selectedCauseSlug ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-600" /> Select Social Cause
                </h3>
                <span className="text-xs text-brand-muted">10 Causes Active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Option Card 1: All Initiatives */}
                <GlassCard
                  onClick={() => handleSelectCause('all')}
                  className="cursor-pointer group hover:border-emerald-500/50 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl group-hover:bg-emerald-700 transition-colors">
                      <Heart className="w-6 h-6 fill-white" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
                      All Initiatives
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      View all 42+ community welfare and volunteer programs.
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold font-heading text-emerald-600 flex items-center justify-end group-hover:translate-x-1 transition-transform">
                    Browse All →
                  </div>
                </GlassCard>

                {/* 10 Cause Option Cards */}
                {causes.map((cause) => (
                  <GlassCard
                    key={cause.id}
                    onClick={() => handleSelectCause(cause.slug)}
                    className="cursor-pointer group hover:border-emerald-500/50 p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
                        {cause.name}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                        {cause.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-xs font-semibold font-heading">
                      <span className="text-brand-muted">{cause.serviceCount || 4} Drives</span>
                      <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">View →</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Initiative Cards (No prices anywhere as per PDF rules) */
            <div className="space-y-6">
              
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
                <button
                  onClick={() => handleSelectCause(null)}
                  className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-emerald-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← All Social Causes</span>
                </button>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold font-heading">
                  {activeCauseObj?.name || 'All Initiatives'}
                </span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {initiatives.map((init) => (
                    <div
                      key={init.id}
                      className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft hover:shadow-hover hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full"
                    >
                      <div className="space-y-4">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={init.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'}
                            alt={init.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge variant="success">{init.category.name}</Badge>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold font-heading text-brand-primary">
                          {init.name}
                        </h4>

                        <p className="text-xs text-brand-muted leading-relaxed">
                          {init.shortDescription}
                        </p>
                      </div>

                      <div className="pt-6 mt-4 border-t border-brand-border space-y-3">
                        {init.coverageArea && (
                          <p className="text-xs text-brand-muted flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {init.coverageArea}
                          </p>
                        )}

                        <Link to={`/services/${init.slug}`}>
                          <Button
                            variant="whatsapp"
                            size="md"
                            className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 font-bold"
                            icon={<Heart className="w-4 h-4 text-white fill-white" />}
                          >
                            Join / Donate
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
