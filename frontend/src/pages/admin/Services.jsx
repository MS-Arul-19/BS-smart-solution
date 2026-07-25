import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';
import Pagination from '../../components/Pagination';

const EMPTY = {
  name: '', description: '', shortDescription: '',
  priceType: 'ON_INSPECTION', priceValue: '', coverageArea: '', categoryId: '', isFeatured: false,
};

export default function AdminServices() {
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
    api.get(`/services/admin/all?page=${page}&limit=10&sortBy=createdAt&sortOrder=desc`, true)
      .then((r) => { setItems(r.data); setMeta(r.meta); })
      .catch((e) => setError(e.message));
  }, [page]);

  useEffect(load, [load]);

  useEffect(() => {
    api.get('/services/categories/all').then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const startEdit = (s) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      description: s.description,
      shortDescription: s.shortDescription || '',
      priceType: s.priceType,
      priceValue: s.priceValue || '',
      coverageArea: s.coverageArea || '',
      categoryId: s.categoryId ? String(s.categoryId) : '',
      isFeatured: s.isFeatured,
    });
    window.scrollTo(0, 0);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      const fd = new FormData();
      // Skip empty categoryId so Zod doesn't reject a blank string.
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'categoryId' && v === '') return;
        fd.append(k, v);
      });
      if (image) fd.append('image', image);
      if (editId) await api.putForm(`/services/${editId}`, fd);
      else await api.postForm('/services', fd);
      setMsg(editId ? 'Service updated' : 'Service created');
      setForm(EMPTY); setEditId(null); setImage(null);
      load();
    } catch (err) {
      setError(err.errors?.map((x) => `${x.field}: ${x.message}`).join(' · ') || err.message);
    }
  };

  const toggle = async (id) => { await api.patch(`/services/${id}/status`, {}, true); load(); };
  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}`, true); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div>
      <h1>Manage Services</h1>
      <div className="panel mt">
        <h2>{editId ? `Edit service #${editId}` : 'Add service'}</h2>
        <form className="form" onSubmit={submit}>
          <div><label>Name *</label><input value={form.name} onChange={set('name')} required /></div>
          <div>
            <label>Category</label>
            <select value={form.categoryId} onChange={set('categoryId')}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label>Short description</label><input value={form.shortDescription} onChange={set('shortDescription')} /></div>
          <div><label>Description *</label><textarea rows={4} value={form.description} onChange={set('description')} required /></div>
          <div className="row">
            <div>
              <label>Price type</label>
              <select value={form.priceType} onChange={set('priceType')}>
                <option value="FIXED">Fixed</option>
                <option value="STARTING_FROM">Starting from</option>
                <option value="ON_INSPECTION">On inspection</option>
              </select>
            </div>
            <div><label>Price value</label><input value={form.priceValue} onChange={set('priceValue')} placeholder="₹499" /></div>
            <div><label>Coverage area</label><input value={form.coverageArea} onChange={set('coverageArea')} /></div>
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
        <thead><tr><th>#</th><th>Name</th><th>Category</th><th>Price</th><th>Active</th><th>Featured</th><th></th></tr></thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.category?.name || '—'}</td>
              <td>{s.priceType === 'ON_INSPECTION' ? 'On inspection' : s.priceValue}</td>
              <td>{s.isActive ? 'Yes' : 'No'}</td>
              <td>{s.isFeatured ? '★' : ''}</td>
              <td className="row">
                <button className="btn btn-outline" onClick={() => startEdit(s)}>Edit</button>
                <button className="btn btn-outline" onClick={() => toggle(s.id)}>{s.isActive ? 'Disable' : 'Enable'}</button>
                <button className="btn btn-danger" onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={7}>No services.</td></tr>}
        </tbody>
      </table>
      <Pagination meta={meta} onPage={setPage} />
    </div>
  );
}
