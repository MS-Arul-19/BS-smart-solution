import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertCircle } from 'lucide-react';
import { Category } from '../../types';
import { api } from '../../api/client';

export const AdminCategories: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!api.isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    api.getCategories().then(setCategories);
  }, [navigate]);

  const handleDelete = (cat: Category) => {
    if (cat.productCount && cat.productCount > 0) {
      setError(`Cannot delete category "${cat.name}" because it contains ${cat.productCount} products.`);
    } else {
      setError(null);
    }
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
            <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Manage Categories</h1>
            <p className="text-xs text-brand-muted">Product category taxonomy and item counts</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-light font-heading uppercase text-brand-muted text-[10px] tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-4">Category Name</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Product Count</th>
                    <th className="p-4 text-right">Delete Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary">{cat.name}</td>
                      <td className="p-4 text-brand-muted font-mono text-[11px]">{cat.slug}</td>
                      <td className="p-4 text-brand-muted">{cat.description}</td>
                      <td className="p-4 font-semibold text-brand-text">{cat.productCount || 0} Products</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
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
    </div>
  );
};
