import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Upload, Search, X, Image as ImageIcon } from 'lucide-react';
import { Service } from '../../types';
import { api } from '../../api/client';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminServices: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    const list = await api.getServices();
    setServices(list);
  };

  const handleOpenAdd = () => {
    setEditingService({
      name: '',
      category: { name: 'Construction & Interior', slug: 'construction-interior', kind: 'BUSINESS' },
      shortDescription: '',
      description: '',
      priceLabel: 'ON_INSPECTION',
      coverageArea: 'Chennai Only',
      image: '',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      setEditingService((prev) => (prev ? { ...prev, image: res.url } : null));
    } catch {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.name) return;

    if (editingService.id) {
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? ({ ...s, ...editingService } as Service) : s))
      );
    } else {
      const newServ: Service = {
        id: `s-${Date.now()}`,
        slug: editingService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: editingService.name,
        category: editingService.category || { name: 'Construction & Interior', slug: 'construction-interior', kind: 'BUSINESS' },
        shortDescription: editingService.shortDescription || '',
        description: editingService.description || '',
        priceLabel: editingService.priceLabel || 'ON_INSPECTION',
        coverageArea: 'Chennai Only',
        image: editingService.image || '',
        featured: editingService.featured || false,
      };
      setServices((prev) => [newServ, ...prev]);
    }
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service/drive?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <Button variant="primary" size="sm" onClick={handleOpenAdd} icon={<Plus className="w-4 h-4" />}>
              Add New Service / Drive
            </Button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Manage Services & Social Drives</h1>
              <p className="text-xs text-brand-muted">Total catalogue count: {services.length} items | Showing {filteredServices.length}</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search services or drives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:border-brand-secondary"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-4">Service / Cause Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Kind</th>
                    <th className="p-4">Coverage</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {filteredServices.map((serv) => (
                    <tr key={serv.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary flex items-center space-x-3">
                        <img
                          src={serv.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=80'}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200"
                        />
                        <span className="line-clamp-1">{serv.name}</span>
                      </td>
                      <td className="p-4 text-brand-muted">{serv.category.name}</td>
                      <td className="p-4">
                        <Badge variant={serv.category.kind === 'SOCIAL' ? 'success' : 'primary'}>
                          {serv.category.kind}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold text-brand-text">{serv.coverageArea || 'Chennai Only'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(serv)}
                          className="p-1.5 rounded-lg border border-brand-border text-brand-primary hover:bg-brand-light"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(serv.id)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Add / Edit Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-brand-border shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-heading text-brand-primary">
              {editingService.id ? 'Edit Service / Social Drive' : 'Add New Service / Social Drive'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Name</label>
                <input
                  type="text"
                  required
                  value={editingService.name || ''}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                  placeholder="e.g. Electrical Maintenance or Food Donation Drive"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Short Description</label>
                <input
                  type="text"
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                  placeholder="Brief 1-line description"
                />
              </div>

              {/* Image Upload Component */}
              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Service / Drive Image</label>
                <div className="flex items-center gap-3">
                  {editingService.image ? (
                    <div className="w-16 h-16 rounded-xl border border-brand-border overflow-hidden bg-slate-50 flex items-center justify-center relative flex-shrink-0">
                      <img src={editingService.image} alt="" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-xl hover:bg-brand-secondary cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Uploading...' : 'Choose Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste Image URL directly"
                      value={editingService.image || ''}
                      onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-brand-border text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-border">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
