import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Grid, CheckCircle2, RefreshCw } from 'lucide-react';
import { Category, Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/cards/ProductCard';
import { GlassCard } from '../components/ui/GlassCard';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategorySlug = searchParams.get('category') || 'all';

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
        category: selectedCategorySlug === 'all' ? undefined : selectedCategorySlug,
        search: searchQuery || undefined,
      });
      setProducts(prods);
      setLoading(false);
    }
    loadData();
  }, [selectedCategorySlug, searchQuery]);

  const handleSelectCategory = (slug: string) => {
    setSearchParams({ category: slug });
  };

  const activeCategoryObj = categories.find(c => c.slug === selectedCategorySlug);

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider">
              Wholesale Product Catalogue
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              B2B Industrial Supplies & Materials
            </h1>
            <p className="text-base text-brand-muted">
              Click on any product category below to view its complete list of items, bulk minimum order quantities & verified specifications.
            </p>
          </div>

          {/* Section 1: 11 Interactive Category Selector Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                <Grid className="w-5 h-5 text-brand-secondary" /> Select Product Category
              </h3>
              <span className="text-xs font-semibold text-brand-muted">
                10 Categories Available (Click to filter)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* Option Card 0: All Products */}
              <GlassCard
                onClick={() => handleSelectCategory('all')}
                className={`cursor-pointer group p-5 transition-all duration-300 flex flex-col justify-between ${
                  selectedCategorySlug === 'all'
                    ? 'border-2 border-brand-secondary bg-white ring-4 ring-brand-secondary/15 shadow-md'
                    : 'hover:border-brand-secondary/50 bg-white/80'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                      selectedCategorySlug === 'all'
                        ? 'bg-brand-secondary text-white'
                        : 'bg-brand-primary text-white group-hover:bg-brand-secondary'
                    }`}>
                      <Package className="w-5 h-5" />
                    </div>
                    {selectedCategorySlug === 'all' && (
                      <span className="inline-flex items-center text-xs font-bold text-brand-secondary gap-1">
                        <CheckCircle2 className="w-4 h-4 fill-brand-secondary text-white" /> Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                    All Products
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    View all 54+ wholesale industrial items across all categories.
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-border/40 mt-3 flex items-center justify-between text-xs font-semibold font-heading">
                  <span className="text-brand-muted">54 Items</span>
                  <span className="text-brand-secondary">Show All →</span>
                </div>
              </GlassCard>

              {/* 10 Category Option Cards */}
              {categories.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug;
                return (
                  <GlassCard
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`cursor-pointer group p-5 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-brand-secondary bg-white ring-4 ring-brand-secondary/15 shadow-md'
                        : 'hover:border-brand-secondary/50 bg-white/80'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-colors ${
                          isSelected
                            ? 'bg-brand-primary text-white'
                            : 'bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white'
                        }`}>
                          <Package className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="inline-flex items-center text-xs font-bold text-brand-secondary gap-1">
                            <CheckCircle2 className="w-4 h-4 fill-brand-secondary text-white" /> Selected
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-brand-border/40 mt-3 flex items-center justify-between text-xs font-semibold font-heading">
                      <span className="text-brand-muted">{cat.productCount || 5} Items</span>
                      <span className="text-brand-secondary">View List →</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Section 2: Products List (ALWAYS VISIBLE BELOW) */}
          <div className="space-y-6 pt-4 border-t border-brand-border/80">
            
            {/* Filter & Search Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
              
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold font-heading">
                  {selectedCategorySlug === 'all' ? 'All Products Catalog' : activeCategoryObj?.name || selectedCategorySlug}
                </span>
                <span className="text-xs font-semibold text-brand-muted">
                  Showing {products.length} {products.length === 1 ? 'item' : 'items'}
                </span>
              </div>

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

            {/* Product Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
                <p className="text-base font-bold font-heading text-brand-primary">No products found for this category or search term</p>
                <p className="text-xs text-brand-muted">Try clicking "All Products" or clearing your search query.</p>
                <button
                  onClick={() => { setSearchQuery(''); handleSelectCategory('all'); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl hover:bg-brand-secondary transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Show All Products
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
