import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { Service } from '../../types';
import { api } from '../../api/client';
import { Badge } from '../../components/ui/Badge';

export const AdminServices: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    api.getServices().then(setServices);
  }, [navigate]);

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
            <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Manage Services & Social Causes</h1>
            <p className="text-xs text-brand-muted">Covers business service categories and social initiatives</p>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-4">Service / Cause Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Kind</th>
                    <th className="p-4">Price Type</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {services.map((serv) => (
                    <tr key={serv.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary">{serv.name}</td>
                      <td className="p-4 text-brand-muted">{serv.category.name}</td>
                      <td className="p-4">
                        <Badge variant={serv.category.kind === 'SOCIAL' ? 'success' : 'primary'}>
                          {serv.category.kind}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold text-brand-text">{serv.priceLabel}</td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 rounded-lg border border-brand-border text-brand-primary hover:bg-brand-light">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
