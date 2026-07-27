import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Target } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const targetCustomers = product.specifications?.['Target Customers'];

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
        <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-1 mb-1.5">
          {product.name}
        </h4>

        {/* Target Customers Badge if specified */}
        {targetCustomers && (
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-heading text-brand-secondary bg-brand-light px-2.5 py-0.5 rounded-md border border-brand-border/60 line-clamp-1">
              <Target className="w-3 h-3 flex-shrink-0" /> {targetCustomers}
            </span>
          </div>
        )}

        {/* Short Description */}
        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
          {product.shortDescription}
        </p>
      </div>

      {/* Footer Details & Action */}
      <div className="pt-4 border-t border-brand-border/60 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-brand-muted flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-brand-primary" /> Supply: <strong className="text-brand-text font-semibold">Wholesale Bulk</strong>
          </span>
          <span className="text-brand-muted flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold font-heading text-brand-primary">
            Request Quote
          </span>

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
