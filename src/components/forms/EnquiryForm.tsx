import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Phone, User, Mail, MessageSquare, Package } from 'lucide-react';
import { LeadPayload, EnquiryType } from '../../types';
import { api } from '../../api/client';
import { Button } from '../ui/Button';

interface EnquiryFormProps {
  initialType?: EnquiryType;
  productId?: string;
  serviceId?: string;
  itemName?: string;
  onSuccess?: (whatsappUrl: string) => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialType = 'GENERAL',
  productId,
  serviceId,
  itemName,
  onSuccess,
}) => {
  const [searchParams] = useSearchParams();

  const queryType = (searchParams.get('type') as EnquiryType) || initialType;
  const queryProdId = searchParams.get('productId') || productId || '';
  const queryServId = searchParams.get('serviceId') || serviceId || '';
  const queryName = searchParams.get('name') || itemName || '';

  const [formData, setFormData] = useState<LeadPayload>({
    name: '',
    phone: '',
    email: '',
    enquiryType: queryType,
    productId: queryProdId,
    serviceId: queryServId,
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (queryType) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: queryType,
        productId: queryProdId,
        serviceId: queryServId,
      }));
    }
  }, [queryType, queryProdId, queryServId]);

  const validatePhone = (phone: string): boolean => {
    const indianMobileRegex = /^[6-9]\d{9}$/;
    const internationalE164Regex = /^\+?[1-9]\d{1,14}$/;
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    return indianMobileRegex.test(cleanPhone) || internationalE164Regex.test(cleanPhone);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number (e.g. 9876543210)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await api.submitLead(formData);
      if (response.whatsappUrl) {
        if (onSuccess) {
          onSuccess(response.whatsappUrl);
        } else {
          // Standard handoff requirement: browser redirects to returned whatsappUrl
          window.location.href = response.whatsappUrl;
        }
      }
    } catch {
      setSubmitError('Failed to submit enquiry. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-soft">
      
      {queryName && (
        <div className="p-3.5 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center space-x-3 text-sm text-brand-primary font-medium">
          <Package className="w-5 h-5 text-brand-secondary flex-shrink-0" />
          <span>Enquiring for: <strong>{queryName}</strong></span>
        </div>
      )}

      {submitError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Enquiry Type Selector */}
      <div>
        <label className="block text-xs font-semibold font-heading text-brand-primary uppercase tracking-wider mb-2">
          Enquiry Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['PRODUCT', 'SERVICE', 'GENERAL'] as EnquiryType[]).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFormData({ ...formData, enquiryType: type })}
              className={`py-2.5 px-3 text-xs font-heading font-semibold rounded-xl border transition-all ${
                formData.enquiryType === type
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                  : 'bg-brand-light text-brand-muted border-brand-border hover:bg-white'
              }`}
            >
              {type === 'PRODUCT' ? 'Product' : type === 'SERVICE' ? 'Service' : 'General'}
            </button>
          ))}
        </div>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="e.g. Rajesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border font-body transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 ${
              errors.name ? 'border-red-500 bg-red-50/50' : 'border-brand-border focus:border-brand-primary'
            }`}
          />
        </div>
        {errors.name && <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
          Mobile / Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
          <input
            type="tel"
            placeholder="e.g. 9876543210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border font-body transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 ${
              errors.phone ? 'border-red-500 bg-red-50/50' : 'border-brand-border focus:border-brand-primary'
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
          Email Address <span className="text-brand-muted font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
          <input
            type="email"
            placeholder="e.g. rajesh@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border font-body transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 ${
              errors.email ? 'border-red-500 bg-red-50/50' : 'border-brand-border focus:border-brand-primary'
            }`}
          />
        </div>
        {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
      </div>

      {/* Quantity Field (Product Only) */}
      {formData.enquiryType === 'PRODUCT' && (
        <div>
          <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
            Required Quantity / Volume
          </label>
          <input
            type="text"
            placeholder="e.g. 500 Boxes / 100 Meters"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-secondary/30"
          />
        </div>
      )}

      {/* Message Field */}
      <div>
        <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
          Additional Requirements / Message
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
          <textarea
            rows={3}
            placeholder="Describe your requirement, specifications, or preferred delivery timeline..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-secondary/30"
          />
        </div>
      </div>

      {/* Submit Action */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full justify-center"
        icon={<Send className="w-4 h-4" />}
      >
        {isSubmitting ? 'Submitting & Redirecting...' : 'Submit & Redirect to WhatsApp'}
      </Button>

      <p className="text-[11px] text-center text-brand-muted">
        🔒 Submitting saves your lead & opens official WhatsApp chat with pre-filled details.
      </p>

    </form>
  );
};
