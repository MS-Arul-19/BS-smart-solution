import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, CheckCircle, Upload } from 'lucide-react';
import { Product, Category } from '../../types';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';

export const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    const prods = await api.getProducts();
    const cats = await api.getCategories();
    setProducts(prods);
    setCategories(cats);
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

          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Manage Products</h1>
              <p className="text-xs text-brand-muted">Total catalogue count: {products.length} items</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Price Range</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary flex items-center space-x-3">
                        <img src={prod.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <span>{prod.name}</span>
                      </td>
                      <td className="p-4 text-brand-muted">{prod.category}</td>
                      <td className="p-4 font-semibold text-brand-text">{prod.moq}</td>
                      <td className="p-4 font-extrabold font-heading text-brand-primary">{prod.priceRange}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${prod.featured ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                          {prod.featured ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
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

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
            <Upload className="w-4 h-4 flex-shrink-0" />
            <span>Image uploads support JPG, PNG, WEBP with max size 2 MB per handoff specification.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
