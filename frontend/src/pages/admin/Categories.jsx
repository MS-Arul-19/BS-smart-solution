import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => {
    api.get('/categories?includeInactive=true', true)
      .then((r) => setItems(r.data))
      .catch((e) => setError(e.message));
  }, []);

  useEffect(load, [load]);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      if (editId) await api.put(`/categories/${editId}`, form, true);
      else await api.post('/categories', form, true);
      setMsg(editId ? 'Category updated' : 'Category created');
      setForm({ name: '', description: '' });
      setEditId(null);
      load();
    } catch (err) {
      setError(err.errors?.map((x) => `${x.field}: ${x.message}`).join(' · ') || err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try { await api.delete(`/categories/${id}`, true); load(); } catch (e) { setError(e.message); }
  };

  return (
    <div>
      <h1>Manage Categories</h1>
      <div className="panel mt">
        <h2>{editId ? `Edit category #${editId}` : 'Add category'}</h2>
        <form className="form" onSubmit={submit}>
          <div><label>Name *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label>Description</label><input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          {error && <p className="error">{error}</p>}
          {msg && <p className="success-msg">{msg}</p>}
          <div className="row">
            <button className="btn">{editId ? 'Update' : 'Create'}</button>
            {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm({ name: '', description: '' }); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <table className="mt">
        <thead><tr><th>#</th><th>Name</th><th>Slug</th><th>Products</th><th></th></tr></thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.slug}</td>
              <td>{c._count?.products ?? 0}</td>
              <td className="row">
                <button className="btn btn-outline" onClick={() => { setEditId(c.id); setForm({ name: c.name, description: c.description || '' }); }}>Edit</button>
                <button className="btn btn-danger" onClick={() => remove(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={5}>No categories.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
