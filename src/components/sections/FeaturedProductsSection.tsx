import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { api } from '../../api/client';
import { ProductCard } from '../cards/ProductCard';

export const FeaturedProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    api.getProducts({ featured: true }).then(data => {
      setProducts(data);
    });
  }, []);

  const nextSlide = () => {
    if (products.length > 4) {
      setScrollIndex((prev) => (prev + 1) % (products.length - 3));
    }
  };

  const prevSlide = () => {
    if (products.length > 4) {
      setScrollIndex((prev) => (prev === 0 ? products.length - 4 : prev - 1));
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-brand-primary tracking-tight">
                Featured Products
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Browse our top bulk supply product categories & industrial hardware
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link
                to="/products"
                className="inline-flex items-center text-sm font-heading font-semibold text-brand-secondary hover:underline"
              >
                <span>View all products</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              {/* Carousel Arrows */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-brand-border text-brand-primary hover:bg-brand-light transition-colors"
                  aria-label="Previous Products"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-brand-border text-brand-primary hover:bg-brand-light transition-colors"
                  aria-label="Next Products"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / Carousel Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(scrollIndex, scrollIndex + 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
