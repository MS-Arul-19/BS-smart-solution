import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-brand-border p-5 shadow-soft hover:shadow-hover hover:border-brand-secondary/40 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Product Image Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{product.category}</Badge>
          </div>
        </div>

        {/* Product Title */}
        <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-1 mb-2">
          {product.name}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
          {product.shortDescription}
        </p>
      </div>

      {/* Footer Specs & Price */}
      <div className="pt-4 border-t border-brand-border/60 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-brand-muted flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-brand-primary" /> MOQ: <strong className="text-brand-text font-semibold">{product.moq}</strong>
          </span>
          <span className="text-brand-muted flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> B2B Verified
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] text-brand-muted font-medium uppercase tracking-wider">Price Range</p>
            <p className="text-sm font-extrabold font-heading text-brand-primary">{product.priceRange}</p>
          </div>

          <Link to={`/products/${product.slug}`}>
            <Button variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
