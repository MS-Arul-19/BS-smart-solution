import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';

/**
 * Social Service — donation & volunteer catalogue.
 * Same two-step browser as Products/Services, backed by the services API
 * with kind=social. Enquiries flow through the normal lead → WhatsApp path.
 */
export default function SocialService() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('category') || '';

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/services/categories/all?kind=social').then((r) => setCategories(r.data)).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    const q = new URLSearchParams({ limit: 100, kind: 'social' });
    if (selected !== 'all') q.set('category', selected);
    api
      .get(`/services?${q}`)
      .then((r) => { setItems(r.data); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selected]);

  const choose = (value) => setParams(value ? { category: value } : {});
  const active = categories.find((c) => c.slug === selected);

  /* ---------- Step 1: category buttons ---------- */
  if (!selected) {
    return (
      <div>
        <div className="hero">
          <h1>Social Service</h1>
          <p>
            We believe in giving back. Donate, volunteer or request community support —
            choose a cause below and connect with us on WhatsApp.
          </p>
        </div>
        <div className="option-grid">
          <button className="option-card option-click" onClick={() => choose('all')}>
            <span className="option-title">All Initiatives</span>
            <span className="option-text">See every donation and volunteer option.</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} className="option-card option-click" onClick={() => choose(c.slug)}>
              <span className="option-title">{c.name}</span>
              {c.description && <span className="option-text">{c.description}</span>}
            </button>
          ))}
        </div>
        {error && <p className="error mt">{error}</p>}
      </div>
    );
  }

  /* ---------- Step 2: initiatives in the chosen category ---------- */
  return (
    <div>
      <div className="row spread">
        <h1>{active ? active.name : 'All Initiatives'}</h1>
        <button className="btn btn-outline" onClick={() => choose('')}>← All Causes</button>
      </div>

      {error && <p className="error mt">{error}</p>}

      <div className="grid mt">
        {items.map((s) => (
          <div key={s.id} className="card">
            {s.image
              ? <img src={s.image} alt={s.name} />
              : <div className="img-placeholder">Community initiative</div>}
            <span className="title">{s.name}</span>
            {s.category && <span className="dim">{s.category.name}</span>}
            <Link
              className="btn btn-success"
              style={{ marginTop: 'auto', textAlign: 'center' }}
              to={`/enquiry?type=SERVICE&serviceId=${s.id}&name=${encodeURIComponent(s.name)}`}
            >
              Join / Donate
            </Link>
          </div>
        ))}
      </div>

      {!loading && items.length === 0 && !error && (
        <p className="mt" style={{ color: 'var(--text-dim)' }}>
          Nothing here yet — <Link to="/enquiry">send us a general enquiry</Link>.
        </p>
      )}
    </div>
  );
}
