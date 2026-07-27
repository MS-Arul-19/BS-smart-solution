import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Cog, Grid, RefreshCw } from 'lucide-react';
import { Category, Service } from '../types';
import { api } from '../api/client';
import { ServiceCard } from '../components/cards/ServiceCard';
import { GlassCard } from '../components/ui/GlassCard';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategorySlug = searchParams.get('category');

  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const cats = await api.getServiceCategories('business');
      setCategories(cats);

      const servs = await api.getServices({
        category: selectedCategorySlug && selectedCategorySlug !== 'all' ? selectedCategorySlug : undefined,
        kind: 'business',
      });
      setServices(servs);
      setLoading(false);
    }
    loadData();
  }, [selectedCategorySlug]);

  const handleSelectCategory = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const filteredServices = services.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q);
  });

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategorySlug);

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider">
              Corporate & Local Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              {selectedCategorySlug && selectedCategorySlug !== 'all'
                ? activeCategoryObj?.name || 'Category Services'
                : 'Professional Business & Engineering Services'}
            </h1>
            <p className="text-base text-brand-muted">
              {selectedCategorySlug && selectedCategorySlug !== 'all'
                ? `Browse all professional solutions available under ${activeCategoryObj?.name || 'this sector'}.`
                : 'Select any service sector below to open its dedicated page and view its respective services.'}
            </p>
          </div>

          {/* PAGE VIEW 1: Main Service Sector Selection Grid (When NO category is selected) */}
          {!selectedCategorySlug ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                  <Grid className="w-5 h-5 text-brand-secondary" /> Select Service Sector
                </h3>
                <span className="text-xs font-semibold text-brand-muted">
                  16 Sectors Available (Click to view services)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Option Card 0: All Services */}
                <GlassCard
                  onClick={() => handleSelectCategory('all')}
                  className="cursor-pointer group hover:border-brand-secondary/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl group-hover:bg-brand-secondary transition-colors">
                      <Cog className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                      All Services
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      View all 104+ local & corporate services.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-brand-secondary group-hover:translate-x-1 transition-transform">
                    <span>104 Solutions</span>
                    <span>Browse All Services →</span>
                  </div>
                </GlassCard>

                {/* 16 Service Category Cards */}
                {categories.map((cat) => (
                  <GlassCard
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="cursor-pointer group hover:border-brand-secondary/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center font-bold group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Cog className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-brand-secondary group-hover:translate-x-1 transition-transform">
                      <span className="text-brand-muted">{cat.serviceCount || 6} Services</span>
                      <span>View Services →</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ) : (
            /* PAGE VIEW 2: Dedicated Category Services Page (Shown when user clicks a service category) */
            <div className="space-y-6">
              
              {/* Category Navigation Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
                
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to All Service Sectors</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold font-heading">
                    {selectedCategorySlug === 'all' ? 'All Services Catalog' : activeCategoryObj?.name || selectedCategorySlug}
                  </span>
                  <span className="text-xs font-semibold text-brand-muted">
                    Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
                  </span>
                </div>

                {/* Search Box */}
                <div className="relative flex-1 sm:w-80">
                  <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search services by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
                  />
                </div>

              </div>

              {/* Service Cards Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredServices.map((serv) => (
                    <ServiceCard key={serv.id} service={serv} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-brand-border space-y-3">
                  <p className="text-base font-bold font-heading text-brand-primary">No services found matching your criteria</p>
                  <button
                    onClick={() => { setSearchQuery(''); handleSelectCategory('all'); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl hover:bg-brand-secondary transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Show All Services
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
