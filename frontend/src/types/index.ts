export type EnquiryType = 'PRODUCT' | 'SERVICE' | 'GENERAL';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CONVERTED' | 'CLOSED';

export type ServiceKind = 'BUSINESS' | 'SOCIAL';

export type PriceType = 'FIXED' | 'STARTING_FROM' | 'ON_INSPECTION';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount?: number;
  serviceCount?: number;
  icon?: string;
  kind?: ServiceKind;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  moq: string;
  priceRange: string;
  unit: string;
  image: string | null;
  gallery?: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: {
    name: string;
    slug: string;
    kind: ServiceKind;
  };
  shortDescription: string;
  description: string;
  priceLabel: PriceType;
  priceValue?: string;
  coverageArea?: string;
  image: string | null;
  gallery?: string[];
  featured?: boolean;
}

export interface LeadPayload {
  name: string;
  phone: string;
  enquiryType: EnquiryType;
  productId?: string;
  serviceId?: string;
  quantity?: number | string;
  message?: string;
  email?: string;
}

export interface LeadResponse {
  lead: {
    id: string;
    createdAt: string;
    status: LeadStatus;
  };
  whatsappUrl: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  createdAt: string;
  status: LeadStatus;
  productName?: string;
  serviceName?: string;
}

export interface PublicSettings {
  whatsapp_number: string;
  business_name: string;
  business_address: string;
  business_email: string;
  business_phone: string;
}

export interface AdminStats {
  totalLeads: number;
  todayLeads: number;
  weekLeads: number;
  monthLeads: number;
  activeProducts: number;
  activeServices: number;
  leadsByStatus: Record<LeadStatus, number>;
}
