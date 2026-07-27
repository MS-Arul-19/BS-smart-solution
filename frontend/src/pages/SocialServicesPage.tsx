import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Search, MapPin, Sparkles } from 'lucide-react';
import { Category, Service } from '../types';
import { api } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SocialServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCauseSlug = searchParams.get('cause');

  const [causes, setCauses] = useState<Category[]>([]);
  const [initiatives, setInitiatives] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const causeList = await api.getServiceCategories('social');
      setCauses(causeList);

      const inits = await api.getServices({
        kind: 'social',
      });
      setInitiatives(inits);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSelectCause = (slug: string | null) => {
    if (slug && slug !== 'all') {
      setSearchParams({ cause: slug });
    } else {
      setSearchParams({});
    }
  };

  const displayCauses = selectedCauseSlug && selectedCauseSlug !== 'all'
    ? causes.filter(c => c.slug === selectedCauseSlug)
    : causes;

  return (
    <div className="pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Social Impact Wing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              Social Services & NGO Drives Category-Wise
            </h1>
            <p className="text-base text-brand-muted">
              Donate extra food, clothes, books & digital devices or register as a volunteer across our 10 community welfare causes.
            </p>
          </div>

          {/* Search & Cause Quick Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-brand-border shadow-soft space-y-4">
            
            {/* Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-muted absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search social causes (e.g. Extra food, Old clothes, Books, Blood donation...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-2xl border border-brand-border font-body focus:outline-none focus:border-emerald-600"
                />
              </div>

              {selectedCauseSlug && (
                <button
                  onClick={() => handleSelectCause(null)}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-brand-light text-brand-primary font-heading font-semibold text-xs hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Show All Causes</span>
                </button>
              )}
            </div>

            {/* Cause Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
              <button
                onClick={() => handleSelectCause(null)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                  !selectedCauseSlug || selectedCauseSlug === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-brand-light text-brand-muted hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                All Causes (10)
              </button>
              {causes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCause(c.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                    selectedCauseSlug === c.slug
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-brand-light text-brand-muted hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

          </div>

          {/* Category-Wise Social Initiatives Listing */}
          {loading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : displayCauses.length > 0 ? (
            <div className="space-y-14">
              {displayCauses.map((cause) => {
                const causeInits = initiatives.filter((init) => {
                  const matchCause = init.category.slug === cause.slug;
                  if (!searchQuery) return matchCause;
                  const q = searchQuery.toLowerCase();
                  return matchCause && (init.name.toLowerCase().includes(q) || init.shortDescription.toLowerCase().includes(q));
                });

                if (causeInits.length === 0 && searchQuery) return null;

                return (
                  <section key={cause.id} className="space-y-6 pt-4 border-t border-brand-border/60 first:border-0 first:pt-0">
                    
                    {/* Cause Header Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-brand-border/80 shadow-soft">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                          <Heart className="w-5 h-5 fill-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                            {cause.name}
                          </h2>
                          <p className="text-xs text-brand-muted leading-relaxed">
                            {cause.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold font-heading">
                          {causeInits.length} Initiatives Active
                        </span>
                        <button
                          onClick={() => handleSelectCause(cause.slug)}
                          className="text-xs font-heading font-semibold text-emerald-600 hover:underline pl-2"
                        >
                          Focus Cause →
                        </button>
                      </div>
                    </div>

                    {/* Initiatives Grid for this Cause */}
                    {causeInits.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {causeInits.map((init) => (
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
                      <div className="p-8 text-center bg-white/60 rounded-2xl border border-dashed border-brand-border text-xs text-brand-muted">
                        No initiatives active under {cause.name}.
                      </div>
                    )}

                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-brand-border space-y-3">
              <Sparkles className="w-8 h-8 text-brand-muted mx-auto" />
              <p className="text-base font-bold font-heading text-brand-primary">No social initiatives found</p>
              <button
                onClick={() => { setSearchQuery(''); handleSelectCause(null); }}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
