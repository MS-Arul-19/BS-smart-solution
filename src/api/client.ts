import { 
  Category, Product, Service, LeadPayload, LeadResponse, 
  LeadRecord, PublicSettings, AdminStats 
} from '../types';
import { 
  INITIAL_SETTINGS, PRODUCT_CATEGORIES, SERVICE_CATEGORIES, 
  SOCIAL_CAUSES, MOCK_PRODUCTS, MOCK_SERVICES, MOCK_LEADS 
} from './mockData';
import { generateWhatsAppMessage, buildWhatsAppRedirectUrl } from '../utils/whatsapp';

const API_BASE = '/api/v1';

// LocalStorage Persistence Keys
const LS_LEADS_KEY = 'bs_leads_store';
const LS_PRODUCTS_KEY = 'bs_products_store';
const LS_SERVICES_KEY = 'bs_services_store';
const LS_SETTINGS_KEY = 'bs_settings_store';
const LS_AUTH_KEY = 'bs_admin_jwt';

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
  return JSON.parse(saved);
}

function getStoredServices(): Service[] {
  const saved = localStorage.getItem(LS_SERVICES_KEY);
  if (!saved) {
    localStorage.setItem(LS_SERVICES_KEY, JSON.stringify(MOCK_SERVICES));
    return MOCK_SERVICES;
  }
  return JSON.parse(saved);
}

function getStoredSettings(): PublicSettings {
  const saved = localStorage.getItem(LS_SETTINGS_KEY);
  if (!saved) {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  return JSON.parse(saved);
}

export const api = {
  // 1. Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const json = await res.json();
        return json.data || json;
      }
    } catch {
      // Fallback
    }
    return PRODUCT_CATEGORIES;
  },

  async getServiceCategories(kind?: 'social' | 'business'): Promise<Category[]> {
    try {
      const query = kind ? `?kind=${kind}` : '';
      const res = await fetch(`${API_BASE}/services/categories/all${query}`);
      if (res.ok) {
        const json = await res.json();
        return json.data || json;
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
      if (params?.category) q.append('category', params.category);
      if (params?.search) q.append('search', params.search);
      if (params?.featured) q.append('featured', 'true');
      q.append('limit', '100');

      const res = await fetch(`${API_BASE}/products?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        return json.data || json;
      }
    } catch {
      // Fallback
    }
    let list = getStoredProducts();
    if (params?.category && params.category !== 'all') {
      list = list.filter(p => p.categorySlug === params.category);
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
        return json.data || json;
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
      if (params?.category) q.append('category', params.category);
      if (params?.kind) q.append('kind', params.kind);
      if (params?.featured) q.append('featured', 'true');

      const res = await fetch(`${API_BASE}/services?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        return json.data || json;
      }
    } catch {
      // Fallback
    }
    let list = getStoredServices();
    if (params?.kind) {
      const targetKind = params.kind === 'social' ? 'SOCIAL' : 'BUSINESS';
      list = list.filter(s => s.category.kind === targetKind);
    }
    if (params?.category && params.category !== 'all') {
      list = list.filter(s => s.category.slug === params.category);
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
        return json.data || json;
      }
    } catch {
      // Fallback
    }
    const services = getStoredServices();
    return services.find(s => s.slug === slug || s.id === slug) || null;
  },

  // 4. Submit Lead
  async submitLead(payload: LeadPayload): Promise<LeadResponse> {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.whatsappUrl) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }

    // Fallback lead creation
    const leads = getStoredLeads();
    const settings = getStoredSettings();
    const products = getStoredProducts();
    const services = getStoredServices();

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
        return json.data || json;
      }
    } catch {
      // Fallback
    }
    return getStoredSettings();
  },

  // 6. Admin API
  async adminLogin(password: string): Promise<boolean> {
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
    return getStoredLeads();
  },

  async updateLeadStatus(id: string, status: LeadRecord['status']): Promise<void> {
    const leads = getStoredLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      localStorage.setItem(LS_LEADS_KEY, JSON.stringify(leads));
    }
  },

  async saveSettings(settings: PublicSettings): Promise<void> {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  }
};
