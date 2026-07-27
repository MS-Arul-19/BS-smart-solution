import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Package, Grid, Filter } from 'lucide-react';
import { Category, Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/cards/ProductCard';
import { GlassCard } from '../components/ui/GlassCard';

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
        category: selectedCategorySlug || undefined,
        search: searchQuery || undefined,
      });
      setProducts(prods);
      setLoading(false);
    }
    loadData();
  }, [selectedCategorySlug, searchQuery]);

  const handleSelectCategory = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const activeCategoryObj = categories.find(c => c.slug === selectedCategorySlug);

  return (
    <div className="pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider">
              Product Catalogue
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              B2B Industrial Supplies & Materials
            </h1>
            <p className="text-base text-brand-muted">
              Select a category to browse wholesale bulk products with minimum order quantities & verified specifications.
            </p>
          </div>

          {/* Step 1: 11 Large Option Cards (shown when no category is selected, or as filter bar) */}
          {!selectedCategorySlug ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                  <Grid className="w-5 h-5 text-brand-secondary" /> Select Product Category
                </h3>
                <span className="text-xs text-brand-muted">10 Categories Available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Option Card 1: All Products */}
                <GlassCard
                  onClick={() => handleSelectCategory('all')}
                  className="cursor-pointer group hover:border-brand-secondary/50 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl group-hover:bg-brand-secondary transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                      All Products
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      View all 55+ industrial products across all categories.
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold font-heading text-brand-secondary flex items-center justify-end group-hover:translate-x-1 transition-transform">
                    Browse All →
                  </div>
                </GlassCard>

                {/* 10 Product Category Cards */}
                {categories.map((cat) => (
                  <GlassCard
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="cursor-pointer group hover:border-brand-secondary/50 p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center font-bold group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Package className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-xs font-semibold font-heading">
                      <span className="text-brand-muted">{cat.productCount || 6} Items</span>
                      <span className="text-brand-secondary group-hover:translate-x-1 transition-transform">Explore →</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Category Product Grid with Search & Back Button */
            <div className="space-y-6">
              
              {/* Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
                
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← All Categories</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Category Pill Indicator */}
                  <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold font-heading">
                    {activeCategoryObj?.name || 'All Products'}
                  </span>

                  {/* Search Box */}
                  <div className="relative flex-1 sm:w-80">
                    <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search products by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

              </div>

              {/* Product Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-brand-border space-y-3">
                  <p className="text-base font-bold font-heading text-brand-primary">No products found matching your search</p>
                  <p className="text-xs text-brand-muted">Try clearing the search filter or select another category.</p>
                  <button
                    onClick={() => { setSearchQuery(''); handleSelectCategory(null); }}
                    className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl"
                  >
                    Reset Filters
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
