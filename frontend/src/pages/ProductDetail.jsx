import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${slug}`).then((r) => setProduct(r.data)).catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Loading…</p>;

  return (
    <div className="panel">
      <h1>{product.name}</h1>
      <p className="dim" style={{ color: 'var(--text-dim)' }}>
        Category: {product.category?.name}
      </p>
      {product.image && (
        <img src={product.image} alt={product.name} style={{ maxWidth: 360, borderRadius: 6, margin: '12px 0' }} />
      )}
      <p style={{ margin: '12px 0' }}>{product.description}</p>

      {product.specifications && (
        <>
          <h2>Specifications</h2>
          <table style={{ maxWidth: 480, marginBottom: 16 }}>
            <tbody>
              {Object.entries(product.specifications).map(([k, v]) => (
                <tr key={k}>
                  <th style={{ width: 160 }}>{k}</th>
                  <td>{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <p>
        {product.priceRange && <><strong>Price:</strong> {product.priceRange} · </>}
        {product.minOrderQty && <><strong>Min. order:</strong> {product.minOrderQty}</>}
      </p>

      {product.gallery?.length > 0 && (
        <div className="row mt">
          {product.gallery.map((g) => (
            <img key={g.id} src={g.image} alt={g.title || ''} style={{ width: 110, height: 80, objectFit: 'cover', borderRadius: 6 }} />
          ))}
        </div>
      )}

      <div className="mt">
        <Link className="btn btn-success" to={`/enquiry?type=PRODUCT&productId=${product.id}&name=${encodeURIComponent(product.name)}`}>
          Enquire on WhatsApp
        </Link>
      </div>
    </div>
  );
}
