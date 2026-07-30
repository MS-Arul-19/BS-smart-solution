import { 
  Category, Product, Service, LeadPayload, LeadResponse, 
  LeadRecord, PublicSettings, AdminStats, ServiceKind, PriceType 
} from '../types';
import { 
  INITIAL_SETTINGS, PRODUCT_CATEGORIES, SERVICE_CATEGORIES, 
  SOCIAL_CAUSES, MOCK_PRODUCTS, MOCK_SERVICES, MOCK_SOCIAL_SERVICES, MOCK_LEADS 
} from './mockData';
import { generateWhatsAppMessage, buildWhatsAppRedirectUrl } from '../utils/whatsapp';

const API_BASE = '/api/v1';

// LocalStorage Persistence Keys (Dev / Fallback Mode)
const LS_LEADS_KEY = 'bs_leads_store';
const LS_PRODUCTS_KEY = 'bs_products_store_v10';
const LS_SERVICES_KEY = 'bs_services_store_v10';
const LS_SETTINGS_KEY = 'bs_settings_store';
const LS_AUTH_KEY = 'bs_admin_jwt';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(LS_AUTH_KEY);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function getStoredLeads(): LeadRecord[] {
  const saved = localStorage.getItem(LS_LEADS_KEY);
  if (!saved) {
    localStorage.setItem(LS_LEADS_KEY, JSON.stringify(MOCK_LEADS));
    return MOCK_LEADS;
  }
  return JSON.parse(saved);
}

function getStoredProducts(): Product[] {
  const saved = localStorage.getItem(LS_PRODUCTS_KEY);
  if (!saved) {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS));
    return MOCK_PRODUCTS;
  }
  const parsed: Product[] = JSON.parse(saved);
  // Synchronize latest local image mappings from MOCK_PRODUCTS
  const updated = parsed.map(p => {
    const match = MOCK_PRODUCTS.find(m => m.id === p.id || m.slug === p.slug || m.name === p.name);
    if (match && match.image) {
      return { ...p, image: match.image };
    }
    return p;
  });
  localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(updated));
  return updated;
}

function getStoredServices(): Service[] {
  const saved = localStorage.getItem(LS_SERVICES_KEY);
  const allMockServices = [...MOCK_SERVICES, ...MOCK_SOCIAL_SERVICES];
  if (!saved) {
    localStorage.setItem(LS_SERVICES_KEY, JSON.stringify(allMockServices));
    return allMockServices;
  }
  const parsed: Service[] = JSON.parse(saved);
  const updated = parsed.map(s => {
    const match = allMockServices.find(m => m.id === s.id || m.slug === s.slug || m.name === s.name);
    if (match && match.image) {
      return { ...s, image: match.image, coverageArea: 'Chennai Only' };
    }
    return { ...s, coverageArea: 'Chennai Only' };
  });
  localStorage.setItem(LS_SERVICES_KEY, JSON.stringify(updated));
  return updated;
}

function getStoredSettings(): PublicSettings {
  const saved = localStorage.getItem(LS_SETTINGS_KEY);
  if (!saved) {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  return JSON.parse(saved);
}

// Data Normalization Utilities for Backend API Responses
function normalizeProduct(p: any): Product {
  const localMatch = MOCK_PRODUCTS.find(m => m.slug === p.slug || m.id === String(p.id) || m.name.toLowerCase() === (p.name || '').toLowerCase());
  return {
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    category: p.category?.name || p.categoryName || '',
    categorySlug: p.category?.slug || p.categorySlug || '',
    shortDescription: p.shortDescription || p.description?.substring(0, 100) || '',
    description: p.description || '',
    specifications: typeof p.specifications === 'object' && p.specifications ? p.specifications : {},
    moq: p.minOrderQty || p.moq || 'Contact for MOQ',
    priceRange: p.priceRange || 'On Request',
    unit: p.unit || 'piece',
    image: (p.image && !p.image.includes('placeholder')) ? p.image : (localMatch?.image || null),
    gallery: p.gallery ? p.gallery.map((g: any) => typeof g === 'string' ? g : g.image) : [],
    featured: p.isFeatured ?? p.featured ?? false,
  };
}

function normalizeService(s: any): Service {
  const allMockServices = [...MOCK_SERVICES, ...MOCK_SOCIAL_SERVICES];
  const localMatch = allMockServices.find(m => m.slug === s.slug || m.id === String(s.id) || m.name.toLowerCase() === (s.name || '').toLowerCase());
  return {
    id: String(s.id),
    slug: s.slug,
    name: s.name,
    category: {
      name: s.category?.name || 'General',
      slug: s.category?.slug || 'general',
      kind: (s.category?.kind as ServiceKind) || 'BUSINESS',
    },
    shortDescription: s.shortDescription || s.description?.substring(0, 100) || '',
    description: s.description || '',
    priceLabel: (s.priceType || s.priceLabel || 'ON_INSPECTION') as PriceType,
    priceValue: s.priceValue || '',
    coverageArea: s.coverageArea || 'Chennai Only',
    image: (s.image && !s.image.includes('placeholder')) ? s.image : (localMatch?.image || null),
    gallery: s.gallery ? s.gallery.map((g: any) => typeof g === 'string' ? g : g.image) : [],
    featured: s.isFeatured ?? s.featured ?? false,
  };
}

function normalizeCategory(c: any): Category {
  return {
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    productCount: c._count?.products || c.productCount,
    serviceCount: c._count?.services || c.serviceCount,
    kind: c.kind,
  };
}

function normalizeLead(l: any): LeadRecord {
  return {
    id: String(l.id),
    name: l.name,
    phone: l.phone,
    email: l.email || '',
    message: l.message || '',
    enquiryType: l.enquiryType || 'GENERAL',
    productId: l.productId ? String(l.productId) : undefined,
    serviceId: l.serviceId ? String(l.serviceId) : undefined,
    productName: l.product?.name || l.productName,
    serviceName: l.service?.name || l.serviceName,
    quantity: l.quantity,
    createdAt: l.createdAt,
    status: l.status || 'NEW',
  };
}

export const api = {
  // 1. Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const json = await res.json();
        const rawItems = json.data?.items || json.data || json;
        if (Array.isArray(rawItems) && rawItems.length > 0) {
          return rawItems.map(normalizeCategory);
        }
      }
    } catch {
      // Fallback to local data
    }
    return PRODUCT_CATEGORIES;
  },

  async getServiceCategories(kind?: 'social' | 'business'): Promise<Category[]> {
    try {
      const query = kind ? `?kind=${kind}` : '';
      const res = await fetch(`${API_BASE}/services/categories/all${query}`);
      if (res.ok) {
        const json = await res.json();
        const rawItems = json.data?.items || json.data || json;
        if (Array.isArray(rawItems) && rawItems.length > 0) {
          return rawItems.map(normalizeCategory);
        }
      }
    } catch {
      // Fallback
    }
    return kind === 'social' ? SOCIAL_CAUSES : SERVICE_CATEGORIES;
  },

  // 2. Products
  async getProducts(params?: { category?: string; search?: string; featured?: boolean }): Promise<Product[]> {
    try {
      const q = new URLSearchParams();
      if (params?.category && params.category !== 'all') q.append('category', params.category);
      if (params?.search) q.append('search', params.search);
      if (params?.featured) q.append('featured', 'true');
      q.append('limit', '100');

      const res = await fetch(`${API_BASE}/products?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        const rawItems = json.data?.items || json.data?.products || json.data || [];
        if (Array.isArray(rawItems) && rawItems.length > 0) {
          return rawItems.map(normalizeProduct);
        }
      }
    } catch {
      // Fallback
    }

    let list = getStoredProducts();
    if (params?.category && params.category !== 'all') {
      const catParam = params.category.toLowerCase();
      list = list.filter(p => 
        p.categorySlug.toLowerCase() === catParam || 
        p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === catParam
      );
    }
    if (params?.search) {
      const term = params.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(term) || p.shortDescription.toLowerCase().includes(term));
    }
    if (params?.featured) {
      list = list.filter(p => p.featured);
    }
    return list;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (res.ok) {
        const json = await res.json();
        const data = json.data || json;
        if (data && data.name) {
          return normalizeProduct(data);
        }
      }
    } catch {
      // Fallback
    }
    const products = getStoredProducts();
    return products.find(p => p.slug === slug || p.id === slug) || null;
  },

  // 3. Services
  async getServices(params?: { category?: string; kind?: 'social' | 'business'; featured?: boolean }): Promise<Service[]> {
    try {
      const q = new URLSearchParams();
      if (params?.category && params.category !== 'all') q.append('category', params.category);
      if (params?.kind) q.append('kind', params.kind);
      if (params?.featured) q.append('featured', 'true');
      q.append('limit', '100');

      const res = await fetch(`${API_BASE}/services?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        const rawItems = json.data?.items || json.data?.services || json.data || [];
        if (Array.isArray(rawItems) && rawItems.length > 0) {
          return rawItems.map(normalizeService);
        }
      }
    } catch {
      // Fallback
    }

    let list = params?.kind === 'social' ? MOCK_SOCIAL_SERVICES : getStoredServices();
    if (params?.kind && params.kind !== 'social') {
      const targetKind = 'BUSINESS';
      list = list.filter(s => s.category.kind === targetKind);
    }
    if (params?.category && params.category !== 'all') {
      const catParam = params.category.toLowerCase();
      list = list.filter(s => 
        s.category.slug.toLowerCase() === catParam || 
        s.category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === catParam
      );
    }
    if (params?.featured) {
      list = list.filter(s => s.featured);
    }
    return list;
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      const res = await fetch(`${API_BASE}/services/${slug}`);
      if (res.ok) {
        const json = await res.json();
        const data = json.data || json;
        if (data && data.name) {
          return normalizeService(data);
        }
      }
    } catch {
      // Fallback
    }
    const allServices = [...getStoredServices(), ...MOCK_SOCIAL_SERVICES];
    return allServices.find(s => s.slug === slug || s.id === slug) || null;
  },

  // 4. Submit Lead
  async submitLead(payload: LeadPayload): Promise<LeadResponse> {
    try {
      const numProductId = payload.productId ? parseInt(payload.productId, 10) : undefined;
      const numServiceId = payload.serviceId ? parseInt(payload.serviceId, 10) : undefined;

      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          email: payload.email || undefined,
          message: payload.message || undefined,
          enquiryType: payload.enquiryType,
          quantity: payload.quantity ? String(payload.quantity) : undefined,
          ...(numProductId && !isNaN(numProductId) && { productId: numProductId }),
          ...(numServiceId && !isNaN(numServiceId) && { serviceId: numServiceId }),
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.whatsappUrl) {
          return {
            lead: {
              id: String(json.data.lead?.id || Date.now()),
              createdAt: json.data.lead?.createdAt || new Date().toISOString(),
              status: json.data.lead?.status || 'NEW',
            },
            whatsappUrl: json.data.whatsappUrl,
          };
        }
      }
    } catch {
      // Fallback
    }

    // Fallback lead creation
    const leads = getStoredLeads();
    const settings = getStoredSettings();
    const products = getStoredProducts();
    const services = [...getStoredServices(), ...MOCK_SOCIAL_SERVICES];

    let targetTitle = '';
    if (payload.productId) {
      const prod = products.find(p => p.id === payload.productId);
      if (prod) targetTitle = prod.name;
    } else if (payload.serviceId) {
      const serv = services.find(s => s.id === payload.serviceId);
      if (serv) targetTitle = serv.name;
    }

    const newLead: LeadRecord = {
      ...payload,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      productName: payload.productId ? targetTitle : undefined,
      serviceName: payload.serviceId ? targetTitle : undefined,
    };

    leads.unshift(newLead);
    localStorage.setItem(LS_LEADS_KEY, JSON.stringify(leads));

    const encodedText = generateWhatsAppMessage(payload, targetTitle);
    const whatsappUrl = buildWhatsAppRedirectUrl(settings.whatsapp_number, encodedText);

    return {
      lead: {
        id: newLead.id,
        createdAt: newLead.createdAt,
        status: newLead.status,
      },
      whatsappUrl,
    };
  },

  // 5. Public Settings
  async getPublicSettings(): Promise<PublicSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings/public`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {
      // Fallback
    }
    return getStoredSettings();
  },

  // 6. Admin Authentication & Dashboard
  async adminLogin(password: string, email: string = 'admin@bssmartsolution.com'): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const json = await res.json();
        const token = json.data?.accessToken || json.data?.token || json.accessToken;
        if (token) {
          localStorage.setItem(LS_AUTH_KEY, token);
          return true;
        }
      }
    } catch {
      // Fallback
    }

    if (password === 'admin123' || password === 'admin') {
      localStorage.setItem(LS_AUTH_KEY, 'mock-jwt-token-123456');
      return true;
    }
    return false;
  },

  isAdminAuthenticated(): boolean {
    return !!localStorage.getItem(LS_AUTH_KEY);
  },

  adminLogout(): void {
    localStorage.removeItem(LS_AUTH_KEY);
  },

  async getAdminStats(): Promise<AdminStats> {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          return {
            totalLeads: json.data.totalLeads ?? 0,
            todayLeads: json.data.todayLeads ?? 0,
            weekLeads: json.data.weekLeads ?? 0,
            monthLeads: json.data.monthLeads ?? 0,
            activeProducts: json.data.activeProducts ?? 0,
            activeServices: json.data.activeServices ?? 0,
            leadsByStatus: json.data.leadsByStatus || {
              NEW: 0, CONTACTED: 0, IN_PROGRESS: 0, CONVERTED: 0, CLOSED: 0
            },
          };
        }
      }
    } catch {
      // Fallback
    }

    const leads = getStoredLeads();
    const products = getStoredProducts();
    const services = getStoredServices();

    const leadsByStatus = {
      NEW: leads.filter(l => l.status === 'NEW').length,
      CONTACTED: leads.filter(l => l.status === 'CONTACTED').length,
      IN_PROGRESS: leads.filter(l => l.status === 'IN_PROGRESS').length,
      CONVERTED: leads.filter(l => l.status === 'CONVERTED').length,
      CLOSED: leads.filter(l => l.status === 'CLOSED').length,
    };

    return {
      totalLeads: leads.length,
      todayLeads: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length,
      weekLeads: leads.length,
      monthLeads: leads.length,
      activeProducts: products.length,
      activeServices: services.length,
      leadsByStatus,
    };
  },

  async getAdminLeads(): Promise<LeadRecord[]> {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        const rawItems = json.data?.items || json.data?.leads || json.data || [];
        if (Array.isArray(rawItems)) {
          return rawItems.map(normalizeLead);
        }
      }
    } catch {
      // Fallback
    }
    return getStoredLeads();
  },

  async updateLeadStatus(id: string, status: LeadRecord['status']): Promise<void> {
    try {
      await fetch(`${API_BASE}/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
      });
    } catch {
      // Fallback
    }
    const leads = getStoredLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      localStorage.setItem(LS_LEADS_KEY, JSON.stringify(leads));
    }
  },

  async saveSettings(settings: PublicSettings): Promise<void> {
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(settings),
      });
    } catch {
      // Fallback
    }
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  }
};
