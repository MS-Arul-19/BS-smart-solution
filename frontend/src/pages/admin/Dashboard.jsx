import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/stats', true).then((r) => setStats(r.data)).catch((e) => setError(e.message));
    api.get('/dashboard/recent-leads', true).then((r) => setRecent(r.data)).catch(() => {});
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Loading…</p>;

  return (
    <div>
      <div className="row spread">
        <h1>Dashboard</h1>
        <div className="row">
          <Link className="btn btn-outline" to="/admin/leads">Leads</Link>
          <Link className="btn btn-outline" to="/admin/products">Products</Link>
          <Link className="btn btn-outline" to="/admin/services">Services</Link>
          <Link className="btn btn-outline" to="/admin/categories">Categories</Link>
          <Link className="btn btn-outline" to="/admin/settings">Settings</Link>
        </div>
      </div>

      <div className="stat-grid mt">
        <div className="stat"><div className="num">{stats.leads.total}</div><div className="lbl">Total leads</div></div>
        <div className="stat"><div className="num">{stats.leads.today}</div><div className="lbl">Leads today</div></div>
        <div className="stat"><div className="num">{stats.leads.thisWeek}</div><div className="lbl">This week</div></div>
        <div className="stat"><div className="num">{stats.leads.thisMonth}</div><div className="lbl">This month</div></div>
        <div className="stat"><div className="num">{stats.products.active}/{stats.products.total}</div><div className="lbl">Active products</div></div>
        <div className="stat"><div className="num">{stats.services.active}/{stats.services.total}</div><div className="lbl">Active services</div></div>
      </div>

      <h2 className="mt">Leads by status</h2>
      <div className="row">
        {Object.entries(stats.leads.byStatus).map(([k, v]) => (
          <span key={k} className={`badge ${k}`}>{k}: {v}</span>
        ))}
      </div>

      <h2 className="mt">Recent leads</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Phone</th><th>Type</th><th>Item</th><th>Status</th><th>When</th></tr>
        </thead>
        <tbody>
          {recent.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.phone}</td>
              <td>{l.enquiryType}</td>
              <td>{l.product?.name || l.service?.name || '—'}</td>
              <td><span className={`badge ${l.status}`}>{l.status}</span></td>
              <td>{new Date(l.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {recent.length === 0 && <tr><td colSpan={6}>No leads yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
