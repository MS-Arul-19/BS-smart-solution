import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, CheckCircle, Upload, Search, X, Image as ImageIcon } from 'lucide-react';
import { Product, Category } from '../../types';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';

export const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleOpenAdd = () => {
    setEditingProduct({
      name: '',
      category: categories[0]?.name || 'Packaging Materials',
      categorySlug: categories[0]?.slug || 'packaging-materials',
      shortDescription: '',
      description: '',
      moq: 'Bulk Supply',
      priceRange: 'Quote on Request',
      unit: 'Piece',
      image: '',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      setEditingProduct((prev) => (prev ? { ...prev, image: res.url } : null));
    } catch {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;

    if (editingProduct.id) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? ({ ...p, ...editingProduct } as Product) : p))
      );
    } else {
      // Add new
      const newProd: Product = {
        id: `p-${Date.now()}`,
        slug: editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: editingProduct.name,
        category: editingProduct.category || 'Packaging Materials',
        categorySlug: editingProduct.categorySlug || 'packaging-materials',
        shortDescription: editingProduct.shortDescription || '',
        description: editingProduct.description || '',
        moq: editingProduct.moq || 'Bulk Supply',
        priceRange: editingProduct.priceRange || 'Quote on Request',
        unit: editingProduct.unit || 'Piece',
        image: editingProduct.image || '',
        featured: editingProduct.featured || false,
      };
      setProducts((prev) => [newProd, ...prev]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="inline-flex items-center space-x-2 text-sm font-heading font-semibold text-brand-primary hover:text-brand-secondary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <Button variant="primary" size="sm" onClick={handleOpenAdd} icon={<Plus className="w-4 h-4" />}>
              Add New Product
            </Button>
          </div>

          {/* Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold font-heading text-brand-primary">Manage Products Catalogue</h1>
              <p className="text-xs text-brand-muted">Total items: {products.length} products | Showing {filteredProducts.length}</p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:border-brand-secondary"
              />
            </div>
          </div>

          {/* Products Table */}
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
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-brand-light/40">
                      <td className="p-4 font-bold text-brand-primary flex items-center space-x-3">
                        <img
                          src={prod.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80'}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200"
                        />
                        <span className="line-clamp-1">{prod.name}</span>
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
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 rounded-lg border border-brand-border text-brand-primary hover:bg-brand-light"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
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

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
            <Upload className="w-4 h-4 flex-shrink-0" />
            <span>Neon DB Connected. Image upload supports JPG, PNG, WEBP max 2 MB per file.</span>
          </div>

        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-brand-border shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-heading text-brand-primary">
              {editingProduct.id ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                  placeholder="e.g. Heavy Duty Corrugated Boxes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-brand-primary">Category</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => {
                      const selectedCat = categories.find((c) => c.name === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                        categorySlug: selectedCat?.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-brand-primary">MOQ</label>
                  <input
                    type="text"
                    value={editingProduct.moq || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                    placeholder="e.g. 500 Boxes"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Short Description</label>
                <input
                  type="text"
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:border-brand-secondary"
                  placeholder="Brief 1-line description"
                />
              </div>

              {/* Image Upload Component */}
              <div>
                <label className="block font-semibold mb-1 text-brand-primary">Product Image</label>
                <div className="flex items-center gap-3">
                  {editingProduct.image ? (
                    <div className="w-16 h-16 rounded-xl border border-brand-border overflow-hidden bg-slate-50 flex items-center justify-center relative flex-shrink-0">
                      <img src={editingProduct.image} alt="" className="w-full h-full object-contain" />
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
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-brand-border text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProduct.featured || false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  className="rounded text-brand-secondary focus:ring-brand-secondary"
                />
                <label htmlFor="featured" className="font-semibold text-brand-primary">
                  Highlight as Featured Product on Homepage
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-border">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
