import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';
import Pagination from '../../components/Pagination';

const EMPTY = {
  name: '', description: '', shortDescription: '', categoryId: '',
  minOrderQty: '', priceRange: '', unit: '', isFeatured: false,
};

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => {
    api.get(`/products/admin/all?page=${page}&limit=10&sortBy=createdAt&sortOrder=desc`, true)
      .then((r) => { setItems(r.data); setMeta(r.meta); })
      .catch((e) => setError(e.message));
  }, [page]);

  useEffect(() => {
    api.get('/categories?includeInactive=true', true).then((r) => setCategories(r.data)).catch(() => {});
  }, []);
  useEffect(load, [load]);

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      shortDescription: p.shortDescription || '',
      categoryId: String(p.categoryId),
      minOrderQty: p.minOrderQty || '',
      priceRange: p.priceRange || '',
      unit: p.unit || '',
      isFeatured: p.isFeatured,
    });
    window.scrollTo(0, 0);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      if (editId) await api.putForm(`/products/${editId}`, fd);
      else await api.postForm('/products', fd);
      setMsg(editId ? 'Product updated' : 'Product created');
      setForm(EMPTY); setEditId(null); setImage(null);
      load();
    } catch (err) {
      setError(err.errors?.map((x) => `${x.field}: ${x.message}`).join(' · ') || err.message);
    }
  };

  const toggle = async (id) => { await api.patch(`/products/${id}/status`, {}, true); load(); };
  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await api.delete(`/products/${id}`, true); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div>
      <h1>Manage Products</h1>
      <div className="panel mt">
        <h2>{editId ? `Edit product #${editId}` : 'Add product'}</h2>
        <form className="form" onSubmit={submit}>
          <div><label>Name *</label><input value={form.name} onChange={set('name')} required /></div>
          <div>
            <label>Category *</label>
            <select value={form.categoryId} onChange={set('categoryId')} required>
              <option value="">Select…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label>Short description</label><input value={form.shortDescription} onChange={set('shortDescription')} /></div>
          <div><label>Description *</label><textarea rows={4} value={form.description} onChange={set('description')} required /></div>
          <div className="row">
            <div><label>Min order qty</label><input value={form.minOrderQty} onChange={set('minOrderQty')} /></div>
            <div><label>Price range</label><input value={form.priceRange} onChange={set('priceRange')} /></div>
            <div><label>Unit</label><input value={form.unit} onChange={set('unit')} /></div>
          </div>
          <div><label><input type="checkbox" checked={form.isFeatured} onChange={set('isFeatured')} style={{ width: 'auto', marginRight: 6 }} />Featured</label></div>
          <div><label>Image (JPG/PNG/WEBP, max 2 MB)</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /></div>
          {error && <p className="error">{error}</p>}
          {msg && <p className="success-msg">{msg}</p>}
          <div className="row">
            <button className="btn">{editId ? 'Update' : 'Create'}</button>
            {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm(EMPTY); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <table className="mt">
        <thead><tr><th>#</th><th>Name</th><th>Category</th><th>Active</th><th>Featured</th><th></th></tr></thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>{p.isActive ? 'Yes' : 'No'}</td>
              <td>{p.isFeatured ? '★' : ''}</td>
              <td className="row">
                <button className="btn btn-outline" onClick={() => startEdit(p)}>Edit</button>
                <button className="btn btn-outline" onClick={() => toggle(p.id)}>{p.isActive ? 'Disable' : 'Enable'}</button>
                <button className="btn btn-danger" onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={6}>No products.</td></tr>}
        </tbody>
      </table>
      <Pagination meta={meta} onPage={setPage} />
    </div>
  );
}
