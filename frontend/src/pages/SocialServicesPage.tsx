import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Grid, MapPin, RefreshCw, Search } from 'lucide-react';
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
  const [causeSearch, setCauseSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fallbackImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const causeList = await api.getServiceCategories('social');
      setCauses(causeList);

      const inits = await api.getServices({
        category: selectedCauseSlug && selectedCauseSlug !== 'all' ? selectedCauseSlug : undefined,
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

  const causeQuery = causeSearch.trim().toLowerCase();
  const visibleCauses = causeQuery
    ? causes.filter(c =>
        c.name.toLowerCase().includes(causeQuery) ||
        (c.description || '').toLowerCase().includes(causeQuery)
      )
    : causes;

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
              <motion.div
                animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              </motion.div>
              Community & NGO Wing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              {selectedCauseSlug && selectedCauseSlug !== 'all'
                ? activeCauseObj?.name || 'Social Cause Drives'
                : 'Social Impact & NGO Support Drives'}
            </h1>
            <p className="text-base text-brand-muted">
              {selectedCauseSlug && selectedCauseSlug !== 'all'
                ? `Browse all active volunteer & donation drives under ${activeCauseObj?.name || 'this cause'}.`
                : 'Select any social cause below to open its dedicated page and view its respective drives.'}
            </p>
          </div>

          {/* PAGE VIEW 1: Main Cause Selection Overview Grid (When NO cause is selected) */}
          {!selectedCauseSlug ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-600" /> Select Social Cause
                </h3>
                <span className="text-xs font-semibold text-brand-muted">
                  {causeQuery
                    ? `${visibleCauses.length} ${visibleCauses.length === 1 ? 'cause matches' : 'causes match'} your search`
                    : `${causes.length} Causes Active (Click to view drives)`}
                </span>
              </div>

              {/* Cause Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search social causes... (e.g. food, education, environment)"
                  value={causeSearch}
                  onChange={(e) => setCauseSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-brand-border bg-white font-body shadow-soft focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Option Card 0: All Initiatives */}
                {!causeQuery && (
                <GlassCard
                  onClick={() => handleSelectCause('all')}
                  className="cursor-pointer group hover:border-emerald-500/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl group-hover:bg-emerald-700 transition-colors">
                      <Heart className="w-6 h-6 fill-white text-white" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
                      All Initiatives
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      View all 43+ community welfare and NGO support programs.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-emerald-600 group-hover:translate-x-1 transition-transform">
                    <span>43 Drives</span>
                    <span>Browse All Drives →</span>
                  </div>
                </GlassCard>
                )}

                {/* 10 Cause Option Cards */}
                {visibleCauses.map((cause) => (
                  <GlassCard
                    key={cause.id}
                    onClick={() => handleSelectCause(cause.slug)}
                    className="cursor-pointer group hover:border-emerald-500/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
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
                    <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-emerald-600 group-hover:translate-x-1 transition-transform">
                      <span className="text-brand-muted">{cause.serviceCount || 4} Drives</span>
                      <span>View Drives →</span>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {causeQuery && visibleCauses.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-brand-border space-y-3">
                  <p className="text-base font-bold font-heading text-brand-primary">No social causes match "{causeSearch}"</p>
                  <button
                    onClick={() => setCauseSearch('')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Clear Search
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* PAGE VIEW 2: Dedicated Cause Drives Page (Shown when user clicks a social cause) */
            <div className="space-y-6">
              
              {/* Category Navigation Toolbar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
                
                <button
                  onClick={() => handleSelectCause(null)}
                  className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-emerald-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Social Causes</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold font-heading">
                    {selectedCauseSlug === 'all' ? 'All Social Initiatives' : activeCauseObj?.name || selectedCauseSlug}
                  </span>
                  <span className="text-xs font-semibold text-brand-muted">
                    Showing {initiatives.length} {initiatives.length === 1 ? 'drive' : 'drives'}
                  </span>
                </div>

              </div>

              {/* Social Drive Cards Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : initiatives.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {initiatives.map((init) => (
                    <Link key={init.id} to={`/services/${init.slug}`} className="block h-full group">
                      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft hover:shadow-hover hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                            <img
                              src={init.image || fallbackImage}
                              alt={init.name}
                              className="w-full h-full object-contain p-1 transform group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = fallbackImage;
                              }}
                            />
                          </div>

                          <h4 className="text-xl font-bold font-heading text-brand-primary group-hover:text-emerald-600 transition-colors">
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

                          <Button
                            variant="whatsapp"
                            size="md"
                            className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 font-bold"
                            icon={<Heart className="w-4 h-4 text-white fill-white" />}
                          >
                            Join / Donate
                          </Button>
                        </div>
                      </div>
                    </Link>
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
          )}

        </div>
      </div>
    </div>
  );
};
