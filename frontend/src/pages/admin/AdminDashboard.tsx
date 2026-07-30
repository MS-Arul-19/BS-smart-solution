import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, Cog, Settings, LogOut, CheckCircle, Clock, ListFilter } from 'lucide-react';
import { AdminStats, LeadRecord } from '../../types';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadRecord[]>([]);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    api.getAdminStats().then(setStats);
    api.getAdminLeads().then((leads) => setRecentLeads(leads.slice(0, 5)));
  }, [navigate]);

  const handleLogout = () => {
    api.adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="pt-28 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-brand-border shadow-soft">
            <div>
              <span className="text-xs font-bold font-heading text-brand-secondary uppercase tracking-wider">Admin Management Portal</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-primary">Dashboard Overview</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={handleLogout} variant="ghost" size="sm" icon={<LogOut className="w-4 h-4" />}>
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Admin Nav Links */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Link to="/admin/leads" className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-soft text-center font-heading font-semibold text-xs text-brand-primary flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-brand-secondary" />
              <span>Leads ({stats?.totalLeads || 0})</span>
            </Link>

            <Link to="/admin/products" className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-soft text-center font-heading font-semibold text-xs text-brand-primary flex items-center justify-center space-x-2">
              <Package className="w-4 h-4 text-brand-secondary" />
              <span>Products ({stats?.activeProducts || 0})</span>
            </Link>

            <Link to="/admin/services" className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-soft text-center font-heading font-semibold text-xs text-brand-primary flex items-center justify-center space-x-2">
              <Cog className="w-4 h-4 text-brand-secondary" />
              <span>Services ({stats?.activeServices || 0})</span>
            </Link>

            <Link to="/admin/categories" className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-soft text-center font-heading font-semibold text-xs text-brand-primary flex items-center justify-center space-x-2">
              <ListFilter className="w-4 h-4 text-brand-secondary" />
              <span>Categories</span>
            </Link>

            <Link to="/admin/settings" className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-soft text-center font-heading font-semibold text-xs text-brand-primary flex items-center justify-center space-x-2">
              <Settings className="w-4 h-4 text-brand-secondary" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Stat Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-semibold font-heading text-brand-muted uppercase">Total Enquiries</span>
              <p className="text-3xl font-extrabold font-heading text-brand-primary">{stats?.totalLeads || 0}</p>
              <p className="text-[11px] text-emerald-600 font-medium">All-time lead inquiries saved</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-semibold font-heading text-brand-muted uppercase">Today's Leads</span>
              <p className="text-3xl font-extrabold font-heading text-brand-secondary">{stats?.todayLeads || 0}</p>
              <p className="text-[11px] text-brand-muted">Leads received today</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-semibold font-heading text-brand-muted uppercase">Active Products</span>
              <p className="text-3xl font-extrabold font-heading text-brand-primary">{stats?.activeProducts || 0}</p>
              <p className="text-[11px] text-brand-muted">Published catalogue products</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-2">
              <span className="text-xs font-semibold font-heading text-brand-muted uppercase">Active Services</span>
              <p className="text-3xl font-extrabold font-heading text-brand-primary">{stats?.activeServices || 0}</p>
              <p className="text-[11px] text-brand-muted">Corporate & social initiatives</p>
            </div>
          </div>

          {/* Recharts Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Leads Breakdown Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <h3 className="text-lg font-bold font-heading text-brand-primary">Leads Status Analytics</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { status: 'NEW', count: stats?.leadsByStatus.NEW || 0, fill: '#3B82F6' },
                      { status: 'CONTACTED', count: stats?.leadsByStatus.CONTACTED || 0, fill: '#D97706' },
                      { status: 'IN_PROGRESS', count: stats?.leadsByStatus.IN_PROGRESS || 0, fill: '#9333EA' },
                      { status: 'CONVERTED', count: stats?.leadsByStatus.CONVERTED || 0, fill: '#10B981' },
                      { status: 'CLOSED', count: stats?.leadsByStatus.CLOSED || 0, fill: '#64748B' },
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="status" tick={{ fontSize: 10, fontWeight: 600 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {['#3B82F6', '#D97706', '#9333EA', '#10B981', '#64748B'].map((color, idx) => (
                        <Cell key={`cell-${idx}`} fill={color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Catalogue Distribution Pie Chart */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <h3 className="text-lg font-bold font-heading text-brand-primary">Catalogue Overview</h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Active Products', value: stats?.activeProducts || 1 },
                        { name: 'Active Services', value: stats?.activeServices || 1 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#0A2540" />
                      <Cell fill="#F58220" />
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-brand-primary">
                  <span className="w-3 h-3 rounded-full bg-brand-primary inline-block" /> Products ({stats?.activeProducts || 0})
                </span>
                <span className="flex items-center gap-1.5 text-brand-secondary">
                  <span className="w-3 h-3 rounded-full bg-brand-secondary inline-block" /> Services ({stats?.activeServices || 0})
                </span>
              </div>
            </div>

          </div>

          {/* Recent Leads Table */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-brand-primary">Recent Lead Inquiries</h3>
              <Link to="/admin/leads" className="text-xs font-bold font-heading text-brand-secondary hover:underline">
                View All Leads →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Enquiry Type</th>
                    <th className="p-4">Item Enquired</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-semibold text-brand-primary">{lead.name}</td>
                      <td className="p-4 text-brand-text">{lead.phone}</td>
                      <td className="p-4">
                        <Badge variant="primary">{lead.enquiryType}</Badge>
                      </td>
                      <td className="p-4 text-brand-muted">{lead.productName || lead.serviceName || 'General Enquiry'}</td>
                      <td className="p-4 font-semibold text-brand-secondary">{lead.status}</td>
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
