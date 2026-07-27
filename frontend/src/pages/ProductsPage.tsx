import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Package, Sparkles } from 'lucide-react';
import { Category, Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/cards/ProductCard';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategorySlug = searchParams.get('category');

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const cats = await api.getCategories();
      setCategories(cats);

      const prods = await api.getProducts({
        search: searchQuery || undefined,
      });
      setProducts(prods);
      setLoading(false);
    }
    loadData();
  }, [searchQuery]);

  const handleSelectCategory = (slug: string | null) => {
    if (slug && slug !== 'all') {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  // Group products category-wise
  const displayCategories = selectedCategorySlug && selectedCategorySlug !== 'all'
    ? categories.filter(c => c.slug === selectedCategorySlug)
    : categories;

  return (
    <div className="pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" /> B2B Wholesale Catalogue
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              Wholesale Products Category-Wise
            </h1>
            <p className="text-base text-brand-muted">
              Browse bulk products organized category by category for e-commerce, factories, offices, and contractors.
            </p>
          </div>

          {/* Search & Category Quick Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-brand-border shadow-soft space-y-4">
            
            {/* Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-muted absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search products across all categories (e.g. Corrugated boxes, Gloves, LED...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-2xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
                />
              </div>

              {selectedCategorySlug && (
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-brand-light text-brand-primary font-heading font-semibold text-xs hover:bg-brand-primary hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Show All Categories</span>
                </button>
              )}
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
              <button
                onClick={() => handleSelectCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                  !selectedCategorySlug || selectedCategorySlug === 'all'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-light text-brand-muted hover:bg-brand-primary/10 hover:text-brand-primary'
                }`}
              >
                All Categories (10)
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                    selectedCategorySlug === cat.slug
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-brand-light text-brand-muted hover:bg-brand-primary/10 hover:text-brand-primary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>

          {/* Category-Wise Products Listing */}
          {loading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : displayCategories.length > 0 ? (
            <div className="space-y-14">
              {displayCategories.map((cat) => {
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                if (catProducts.length === 0 && searchQuery) return null;

                return (
                  <section key={cat.id} className="space-y-6 pt-4 border-t border-brand-border/60 first:border-0 first:pt-0">
                    
                    {/* Category Header Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-brand-border/80 shadow-soft">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold shadow-sm">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                            {cat.name}
                          </h2>
                          <p className="text-xs text-brand-muted leading-relaxed">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold font-heading">
                          {catProducts.length} Items Available
                        </span>
                        <button
                          onClick={() => handleSelectCategory(cat.slug)}
                          className="text-xs font-heading font-semibold text-brand-secondary hover:underline pl-2"
                        >
                          Focus Category →
                        </button>
                      </div>
                    </div>

                    {/* Products Grid for this Category */}
                    {catProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {catProducts.map((prod) => (
                          <ProductCard key={prod.id} product={prod} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white/60 rounded-2xl border border-dashed border-brand-border text-xs text-brand-muted">
                        No products available under {cat.name} matching search "{searchQuery}".
                      </div>
                    )}

                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-brand-border space-y-3">
              <Sparkles className="w-8 h-8 text-brand-muted mx-auto" />
              <p className="text-base font-bold font-heading text-brand-primary">No categories or products found</p>
              <button
                onClick={() => { setSearchQuery(''); handleSelectCategory(null); }}
                className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl"
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
