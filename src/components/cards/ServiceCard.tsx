import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Tag } from 'lucide-react';
import { Service } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isSocial = service.category.kind === 'SOCIAL';

  return (
    <div className="group bg-white rounded-2xl border border-brand-border p-5 shadow-soft hover:shadow-hover hover:border-brand-secondary/40 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Service Image Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
          <img
            src={service.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'}
            alt={service.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={isSocial ? 'success' : 'primary'}>
              {service.category.name}
            </Badge>
          </div>
        </div>

        {/* Service Title */}
        <h4 className="text-lg font-bold font-heading text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-1 mb-2">
          {service.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
          {service.shortDescription}
        </p>
      </div>

      {/* Footer Details & Action */}
      <div className="pt-4 border-t border-brand-border/60 space-y-3">
        {service.coverageArea && (
          <div className="flex items-center text-xs text-brand-muted">
            <MapPin className="w-3.5 h-3.5 text-brand-secondary mr-1 flex-shrink-0" />
            <span className="truncate">{service.coverageArea}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] text-brand-muted font-medium uppercase tracking-wider">Pricing / Model</p>
            <p className={`text-sm font-extrabold font-heading ${isSocial ? 'text-emerald-600' : 'text-brand-primary'}`}>
              {isSocial ? 'Free Initiative' : (service.priceValue || 'Price on Inspection')}
            </p>
          </div>

          <Link to={`/services/${service.slug}`}>
            <Button
              variant={isSocial ? 'outline' : 'secondary'}
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
