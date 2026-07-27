import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MessageSquare } from 'lucide-react';
import { LeadRecord, LeadStatus, EnquiryType } from '../../types';
import { api } from '../../api/client';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminLeads: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadLeads();
  }, [navigate]);

  const loadLeads = () => {
    api.getAdminLeads().then(setLeads);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await api.updateLeadStatus(id, newStatus);
    loadLeads();
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || lead.enquiryType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

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

          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Customer Lead Management</h1>
              <span className="text-xs text-brand-muted font-semibold">Total: {filteredLeads.length} Leads</span>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter name, phone or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border font-heading font-semibold focus:outline-none focus:border-brand-primary"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CONVERTED">CONVERTED</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border font-heading font-semibold focus:outline-none focus:border-brand-primary"
              >
                <option value="ALL">All Enquiry Types</option>
                <option value="PRODUCT">PRODUCT</option>
                <option value="SERVICE">SERVICE</option>
                <option value="GENERAL">GENERAL</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Item Enquired</th>
                    <th className="p-4">Quantity / Message</th>
                    <th className="p-4">Inline Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary">{lead.name}</td>
                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-brand-text">{lead.phone}</div>
                        {lead.email && <div className="text-[11px] text-brand-muted">{lead.email}</div>}
                      </td>
                      <td className="p-4">
                        <Badge variant="primary">{lead.enquiryType}</Badge>
                      </td>
                      <td className="p-4 text-brand-muted font-medium">
                        {lead.productName || lead.serviceName || 'General Enquiry'}
                      </td>
                      <td className="p-4 max-w-xs space-y-1">
                        {lead.quantity && <div className="font-semibold text-brand-primary">Qty: {lead.quantity}</div>}
                        {lead.message && <div className="text-[11px] text-brand-muted line-clamp-2">{lead.message}</div>}
                      </td>
                      <td className="p-4">
                        {/* Status Inline Dropdown per row */}
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-heading focus:outline-none ${
                            lead.status === 'NEW'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === 'CONTACTED'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : lead.status === 'IN_PROGRESS'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : lead.status === 'CONVERTED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
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
