import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, Package, Grid, RefreshCw } from 'lucide-react';
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
        category: selectedCategorySlug && selectedCategorySlug !== 'all' ? selectedCategorySlug : undefined,
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
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-heading font-semibold uppercase tracking-wider">
              Wholesale Product Catalogue
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              {selectedCategorySlug && selectedCategorySlug !== 'all'
                ? activeCategoryObj?.name || 'Category Products'
                : 'B2B Industrial Supplies & Materials'}
            </h1>
            <p className="text-base text-brand-muted">
              {selectedCategorySlug && selectedCategorySlug !== 'all'
                ? `Browse all verified items available under ${activeCategoryObj?.name || 'this category'}.`
                : 'Select any product category below to open its dedicated page and view its respective products.'}
            </p>
          </div>

          {/* PAGE VIEW 1: Main Category Selection Overview Grid (When NO category is selected) */}
          {!selectedCategorySlug ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading text-brand-primary flex items-center gap-2">
                  <Grid className="w-5 h-5 text-brand-secondary" /> Select Product Category
                </h3>
                <span className="text-xs font-semibold text-brand-muted">
                  10 Categories Available (Click to view products)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Option Card 0: All Products */}
                <GlassCard
                  onClick={() => handleSelectCategory('all')}
                  className="cursor-pointer group hover:border-brand-secondary/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl group-hover:bg-brand-secondary transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors">
                      All Products
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      View all 54+ wholesale industrial items across all categories.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-brand-secondary group-hover:translate-x-1 transition-transform">
                    <span>54 Items</span>
                    <span>Browse All Products →</span>
                  </div>
                </GlassCard>

                {/* 10 Product Category Cards */}
                {categories.map((cat) => (
                  <GlassCard
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="cursor-pointer group hover:border-brand-secondary/50 bg-white p-6 flex flex-col justify-between hover:shadow-hover transition-all duration-300"
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
                    <div className="pt-4 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs font-semibold font-heading text-brand-secondary group-hover:translate-x-1 transition-transform">
                      <span className="text-brand-muted">{cat.productCount || 5} Items</span>
                      <span>View Products →</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ) : (
            /* PAGE VIEW 2: Dedicated Category Products Page (Shown when user clicks a category) */
            <div className="space-y-6">
              
              {/* Category Navigation Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-soft">
                
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to All Categories</span>
                </button>

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
                  <button
                    onClick={() => { setSearchQuery(''); handleSelectCategory('all'); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl hover:bg-brand-secondary transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Show All Products
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
