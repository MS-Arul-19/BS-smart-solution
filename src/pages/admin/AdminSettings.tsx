import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { PublicSettings } from '../../types';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';

export const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<PublicSettings>({
    whatsapp_number: '919876543210',
    business_name: 'BS Smart Solution',
    business_address: '123 Business Park, Guindy, Chennai, Tamil Nadu - 600032',
    business_email: 'info@bssmartsolution.com',
    business_phone: '+91 98765 43210',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    api.getPublicSettings().then(setSettings);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="pt-28 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft">
            <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Platform Key/Value Settings</h1>
            <p className="text-xs text-brand-muted">Configure target WhatsApp phone number and corporate business identity</p>
          </div>

          {saved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft space-y-5 max-w-2xl">
            
            <div>
              <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
                Target WhatsApp Number (International format without +)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-brand-border font-mono focus:outline-none focus:border-brand-primary"
              />
              <p className="text-[11px] text-brand-muted mt-1">Example: 919876543210 for India (+91)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
                Business Address
              </label>
              <textarea
                rows={2}
                value={settings.business_address}
                onChange={(e) => setSettings({ ...settings, business_address: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">
                Official Business Email
              </label>
              <input
                type="email"
                value={settings.business_email}
                onChange={(e) => setSettings({ ...settings, business_email: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={<Save className="w-4 h-4" />}
            >
              Save Settings
            </Button>

          </form>

        </div>
      </div>
    </div>
  );
};
