import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';

/**
 * Category-first product browser, landing-page style:
 * step 1 — 11 big option buttons (All Products + 10 categories);
 * step 2 — after picking one, the product grid with images.
 * Selection lives in the URL (?category=all | <slug>) so links are shareable.
 */
export default function Products() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('category') || ''; // '' = choosing, 'all' = every product

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data)).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    // limit=100 (API max) — the whole catalogue fits on one page, no pagination UI.
    const q = new URLSearchParams({ limit: 100 });
    if (search) q.set('search', search);
    if (selected !== 'all') q.set('category', selected);
    api
      .get(`/products?${q}`)
      .then((r) => { setItems(r.data); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selected, search]);

  const choose = (value) => {
    setSearch('');
    setParams(value ? { category: value } : {});
  };

  const active = categories.find((c) => c.slug === selected);

  /* ---------- Step 1: 11 landing-style option buttons ---------- */
  if (!selected) {
    return (
      <div>
        <div className="hero">
          <h1>Products</h1>
          <p>Bulk supplies for every business. Choose a category to start browsing.</p>
        </div>
        <div className="option-grid">
          <button className="option-card option-click" onClick={() => choose('all')}>
            <span className="option-title">All Products</span>
            <span className="option-text">Browse the complete catalogue across every category.</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} className="option-card option-click" onClick={() => choose(c.slug)}>
              <span className="option-title">{c.name}</span>
              {c.description && (
                <span className="option-text">{c.description.split('.')[0]}.</span>
              )}
            </button>
          ))}
        </div>
        {error && <p className="error mt">{error}</p>}
      </div>
    );
  }

  /* ---------- Step 2: product grid for the chosen option ---------- */
  return (
    <div>
      <div className="row spread">
        <h1>{active ? active.name : 'All Products'}</h1>
        <button className="btn btn-outline" onClick={() => choose('')}>← All Categories</button>
      </div>
      {active?.description && (
        <p style={{ color: 'var(--text-dim)', margin: '4px 0 12px', fontSize: 14 }}>{active.description}</p>
      )}

      <input
        placeholder={active ? `Search in ${active.name}…` : 'Search all products…'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 280 }}
      />

      {error && <p className="error mt">{error}</p>}

      <div className="grid mt">
        {items.map((p) => (
          <Link key={p.id} to={`/products/${p.slug}`} className="card">
            {p.image
              ? <img src={p.image} alt={p.name} />
              : <div className="img-placeholder">No image yet</div>}
            <span className="title">{p.name}</span>
            <span className="dim">{p.category?.name}</span>
            {p.shortDescription && <span className="dim">{p.shortDescription}</span>}
            {p.priceRange && <span className="dim">{p.priceRange}</span>}
          </Link>
        ))}
      </div>

      {!loading && items.length === 0 && !error && (
        <p className="mt" style={{ color: 'var(--text-dim)' }}>
          No products found{search ? ` for "${search}"` : ''} — try another category or{' '}
          <Link to="/enquiry">send us a general enquiry</Link>.
        </p>
      )}
    </div>
  );
}
