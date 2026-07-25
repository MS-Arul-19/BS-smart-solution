import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';

const priceLabel = (s) => {
  if (s.priceType === 'FIXED') return s.priceValue;
  if (s.priceType === 'STARTING_FROM') return `From ${s.priceValue}`;
  return 'Price on inspection';
};

/**
 * Category-first service browser, landing-page style:
 * step 1 — big option buttons (All Services + 16 categories);
 * step 2 — the chosen category's services as cards.
 */
export default function Services() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('category') || '';

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/services/categories/all').then((r) => setCategories(r.data)).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    const q = new URLSearchParams({ limit: 100 });
    if (search) q.set('search', search);
    if (selected !== 'all') q.set('category', selected);
    api
      .get(`/services?${q}`)
      .then((r) => { setItems(r.data); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selected, search]);

  const choose = (value) => {
    setSearch('');
    setParams(value ? { category: value } : {});
  };

  const active = categories.find((c) => c.slug === selected);

  /* ---------- Step 1: option buttons ---------- */
  if (!selected) {
    return (
      <div>
        <div className="hero">
          <h1>Services</h1>
          <p>Trusted local & business services. Choose a category to start browsing.</p>
        </div>
        <div className="option-grid">
          <button className="option-card option-click" onClick={() => choose('all')}>
            <span className="option-title">All Services</span>
            <span className="option-text">Browse every service we offer across all categories.</span>
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

  /* ---------- Step 2: services in the chosen category ---------- */
  return (
    <div>
      <div className="row spread">
        <h1>{active ? active.name : 'All Services'}</h1>
        <button className="btn btn-outline" onClick={() => choose('')}>← All Categories</button>
      </div>

      <input
        placeholder={active ? `Search in ${active.name}…` : 'Search all services…'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 280 }}
        className="mt"
      />

      {error && <p className="error mt">{error}</p>}

      <div className="grid mt">
        {items.map((s) => (
          <Link key={s.id} to={`/services/${s.slug}`} className="card">
            {s.image
              ? <img src={s.image} alt={s.name} />
              : <div className="img-placeholder">No image yet</div>}
            <span className="title">{s.name}</span>
            {s.category && <span className="dim">{s.category.name}</span>}
            {s.shortDescription && <span className="dim">{s.shortDescription}</span>}
            <span className="dim">{priceLabel(s)}</span>
          </Link>
        ))}
      </div>

      {!loading && items.length === 0 && !error && (
        <p className="mt" style={{ color: 'var(--text-dim)' }}>
          No services found{search ? ` for "${search}"` : ''} — try another category or{' '}
          <Link to="/enquiry">send us a general enquiry</Link>.
        </p>
      )}
    </div>
  );
}
