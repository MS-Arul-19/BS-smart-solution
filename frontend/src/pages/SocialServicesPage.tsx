import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, Grid, MapPin, CheckCircle2, RefreshCw } from 'lucide-react';
import { Category, Service } from '../types';
import { api } from '../api/client';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SocialServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCauseSlug = searchParams.get('cause') || 'all';

  const [causes, setCauses] = useState<Category[]>([]);
  const [initiatives, setInitiatives] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const causeList = await api.getServiceCategories('social');
      setCauses(causeList);

      const inits = await api.getServices({
        category: selectedCauseSlug === 'all' ? undefined : selectedCauseSlug,
        kind: 'social',
      });
      setInitiatives(inits);
      setLoading(false);
    }
    loadData();
  }, [selectedCauseSlug]);

  const handleSelectCause = (slug: string) => {
    setSearchParams({ cause: slug });
  };

  const activeCauseObj = causes.find((c) => c.slug === selectedCauseSlug);

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Community & NGO Wing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              Social Impact & NGO Support Drives
            </h1>
            <p className="text-base text-brand-muted">
              Click on any cause below to view food donation, education sponsorship, digital device collection & community drives.
            </p>
          </div>

          {/* Section 1: 11 Interactive Cause Selector Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-600" /> Select Social Cause
              </h3>
              <span className="text-xs font-semibold text-brand-muted">
                10 Causes Active (Click to filter)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* Option Card 0: All Initiatives */}
              <GlassCard
                onClick={() => handleSelectCause('all')}
                className={`cursor-pointer group p-5 transition-all duration-300 flex flex-col justify-between ${
                  selectedCauseSlug === 'all'
                    ? 'border-2 border-emerald-600 bg-white ring-4 ring-emerald-500/15 shadow-md'
                    : 'hover:border-emerald-500/50 bg-white/80'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                      selectedCauseSlug === 'all'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-700 text-white group-hover:bg-emerald-600'
                    }`}>
                      <Heart className="w-5 h-5 fill-white text-white" />
                    </div>
                    {selectedCauseSlug === 'all' && (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600 gap-1">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" /> Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
                    All Initiatives
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    View all 43+ community welfare and NGO support programs.
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-border/40 mt-3 flex items-center justify-between text-xs font-semibold font-heading">
                  <span className="text-brand-muted">43 Drives</span>
                  <span className="text-emerald-600">Show All →</span>
                </div>
              </GlassCard>

              {/* 10 Cause Option Cards */}
              {causes.map((cause) => {
                const isSelected = selectedCauseSlug === cause.slug;
                return (
                  <GlassCard
                    key={cause.id}
                    onClick={() => handleSelectCause(cause.slug)}
                    className={`cursor-pointer group p-5 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-emerald-600 bg-white ring-4 ring-emerald-500/15 shadow-md'
                        : 'hover:border-emerald-500/50 bg-white/80'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                        }`}>
                          <Heart className={`w-5 h-5 ${isSelected ? 'fill-white' : ''}`} />
                        </div>
                        {isSelected && (
                          <span className="inline-flex items-center text-xs font-bold text-emerald-600 gap-1">
                            <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" /> Selected
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
                        {cause.name}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                        {cause.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-brand-border/40 mt-3 flex items-center justify-between text-xs font-semibold font-heading">
                      <span className="text-brand-muted">{cause.serviceCount || 4} Drives</span>
                      <span className="text-emerald-600">View List →</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Section 2: Social Cause Drive Cards (ALWAYS VISIBLE BELOW) */}
          <div className="space-y-6 pt-4 border-t border-brand-border/80">
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold font-heading">
                {selectedCauseSlug === 'all' ? 'All Social Initiatives' : activeCauseObj?.name || selectedCauseSlug}
              </span>
              <span className="text-xs font-semibold text-brand-muted">
                Showing {initiatives.length} {initiatives.length === 1 ? 'drive' : 'drives'}
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : initiatives.length > 0 ? (
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
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-brand-border space-y-3">
                <p className="text-base font-bold font-heading text-brand-primary">No initiatives found for this cause</p>
                <button
                  onClick={() => handleSelectCause('all')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Show All Social Drives
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
