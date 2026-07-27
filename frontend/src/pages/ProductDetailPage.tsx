import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ShieldCheck, Package, Share2 } from 'lucide-react';
import { Product } from '../types';
import { api } from '../api/client';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (slug) {
      setLoading(true);
      api.getProductBySlug(slug).then((data) => {
        setProduct(data);
        if (data?.image) setSelectedImage(data.image);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-36 pb-20 max-w-[1280px] mx-auto px-4 text-center">
        <div className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 pb-20 max-w-[1280px] mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading text-brand-primary">Product Not Found</h2>
        <Link to="/products" className="text-brand-secondary hover:underline font-semibold text-sm">
          ← Back to All Products
        </Link>
      </div>
    );
  }

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        product.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
      ];

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          {/* Breadcrumb Back Button */}
          <div>
            <Link
              to={`/products?category=${product.categorySlug}`}
              className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {product.category}</span>
            </Link>
          </div>

          {/* Main Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft">
            
            {/* Left Image & Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-brand-border shadow-inner">
                <img
                  src={selectedImage || product.image || galleryImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="primary">{product.category}</Badge>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-brand-secondary ring-2 ring-brand-secondary/30' : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Specifications & Purchase Action Column */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
                  {product.name}
                </h1>

                {/* Supply Banner */}
                <div className="p-4 rounded-xl bg-brand-light border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-muted uppercase font-heading font-medium tracking-wider">Supply Model</span>
                    <p className="text-lg font-extrabold font-heading text-brand-primary mt-0.5">B2B & Bulk Distribution</p>
                  </div>
                  <div className="text-right border-l border-brand-border pl-4">
                    <span className="text-xs text-brand-muted uppercase font-heading font-medium tracking-wider">Procurement</span>
                    <p className="text-sm font-bold font-heading text-brand-secondary mt-0.5">Request Official Quote</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold font-heading text-brand-primary uppercase tracking-wide mb-2">Description</h3>
                  <p className="text-sm text-brand-muted leading-relaxed font-body">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Key/Value JSON Table */}
                {Object.keys(product.specifications || {}).length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold font-heading text-brand-primary uppercase tracking-wide mb-3">Specifications & Features</h3>
                    <div className="border border-brand-border rounded-xl overflow-hidden divide-y divide-brand-border text-xs">
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <div key={idx} className="grid grid-cols-3 p-3 bg-white hover:bg-brand-light/50">
                          <span className="font-semibold text-brand-primary col-span-1">{key}</span>
                          <span className="text-brand-muted col-span-2">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-brand-border space-y-3">
                <Link to={`/enquiry?type=PRODUCT&productId=${product.id}&name=${encodeURIComponent(product.name)}`}>
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full justify-center text-base font-bold shadow-lg"
                    icon={<MessageSquare className="w-5 h-5 text-white" />}
                  >
                    Enquire on WhatsApp
                  </Button>
                </Link>

                <p className="text-[11px] text-center text-brand-muted flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> B2B Verified Wholesale Supply • Direct Procurement
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
