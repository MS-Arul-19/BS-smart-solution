import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { api } from '../api/client';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (slug) {
      setLoading(true);
      api.getServiceBySlug(slug).then((data) => {
        setService(data);
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

  if (!service) {
    return (
      <div className="pt-36 pb-20 max-w-[1280px] mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading text-brand-primary">Service Not Found</h2>
        <Link to="/services" className="text-brand-secondary hover:underline font-semibold text-sm">
          ← Back to All Services
        </Link>
      </div>
    );
  }

  const isSocial = service.category.kind === 'SOCIAL';

  const galleryImages = service.gallery && service.gallery.length > 0
    ? service.gallery
    : [
        service.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
      ];

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          <div>
            <Link
              to={isSocial ? '/social-service' : '/services'}
              className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {isSocial ? 'Social Initiatives' : 'Corporate Services'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-brand-border shadow-soft">
            
            {/* Image & Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 border border-brand-border shadow-inner">
                <img
                  src={selectedImage || service.image || galleryImages[0]}
                  alt={service.name}
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={isSocial ? 'success' : 'primary'}>
                    {service.category.name}
                  </Badge>
                </div>
              </div>

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

            {/* Description & Action Column */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-primary tracking-tight">
                  {service.name}
                </h1>

                {/* Service Status / Coverage Banner */}
                <div className="p-4 rounded-xl bg-brand-light border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-muted uppercase font-heading font-medium tracking-wider">
                      Initiative Type
                    </span>
                    <p className={`text-lg font-extrabold font-heading ${isSocial ? 'text-emerald-600' : 'text-brand-primary'} mt-0.5`}>
                      {isSocial ? 'Community Service & Contribution' : 'Professional On-Demand Service'}
                    </p>
                  </div>
                  {service.coverageArea && (
                    <div className="text-right border-l border-brand-border pl-4">
                      <span className="text-xs text-brand-muted uppercase font-heading font-medium tracking-wider">Service Coverage</span>
                      <p className="text-xs font-semibold font-heading text-brand-text mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-secondary" /> {service.coverageArea}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold font-heading text-brand-primary uppercase tracking-wide mb-2">Service Overview</h3>
                  <p className="text-sm text-brand-muted leading-relaxed font-body">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-brand-border space-y-3">
                <Link to={`/enquiry?type=SERVICE&serviceId=${service.id}&name=${encodeURIComponent(service.name)}`}>
                  {isSocial ? (
                    <Button
                      variant="whatsapp"
                      size="lg"
                      className="w-full justify-center text-base font-bold shadow-lg bg-emerald-600 hover:bg-emerald-700"
                      icon={<Heart className="w-5 h-5 text-white" />}
                    >
                      Join / Support on WhatsApp
                    </Button>
                  ) : (
                    <Button
                      variant="whatsapp"
                      size="lg"
                      className="w-full justify-center text-base font-bold shadow-lg"
                      icon={<MessageSquare className="w-5 h-5 text-white" />}
                    >
                      Enquire on WhatsApp
                    </Button>
                  )}
                </Link>

                <p className="text-[11px] text-center text-brand-muted flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {isSocial ? '100% Verified Community Drive' : 'Dedicated Professional Support & SLA Assurance'}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
