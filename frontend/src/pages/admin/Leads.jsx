import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';
import Pagination from '../../components/Pagination';

const STATUSES = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];

export default function AdminLeads() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    const params = new URLSearchParams({ page, limit: 15 });
    if (status) params.set('status', status);
    if (type) params.set('enquiryType', type);
    if (search) params.set('search', search);
    api
      .get(`/leads?${params}`, true)
      .then((r) => { setItems(r.data); setMeta(r.meta); setError(''); })
      .catch((e) => setError(e.message));
  }, [page, status, type, search]);

  useEffect(load, [load]);

  const changeStatus = async (id, newStatus) => {
    try {
      await api.patch(`/leads/${id}/status`, { status: newStatus }, true);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Leads</h1>
      <div className="row">
        <input placeholder="Search name/phone…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ maxWidth: 220 }} />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={{ maxWidth: 170 }}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} style={{ maxWidth: 170 }}>
          <option value="">All types</option>
          <option>PRODUCT</option>
          <option>SERVICE</option>
          <option>GENERAL</option>
        </select>
      </div>
      {error && <p className="error mt">{error}</p>}
      <table className="mt">
        <thead>
          <tr><th>#</th><th>Name</th><th>Phone</th><th>Type</th><th>Item</th><th>Qty</th><th>Message</th><th>Status</th><th>When</th></tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.phone}</td>
              <td>{l.enquiryType}</td>
              <td>{l.product?.name || l.service?.name || '—'}</td>
              <td>{l.quantity || '—'}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.message || '—'}</td>
              <td>
                <select value={l.status} onChange={(e) => changeStatus(l.id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
              <td>{new Date(l.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={9}>No leads found.</td></tr>}
        </tbody>
      </table>
      <Pagination meta={meta} onPage={setPage} />
    </div>
  );
}
