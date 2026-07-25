import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/services/${slug}`).then((r) => setService(r.data)).catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <p className="error">{error}</p>;
  if (!service) return <p>Loading…</p>;

  const isSocial = service.category?.kind === 'SOCIAL';
  const price =
    service.priceType === 'FIXED'
      ? service.priceValue
      : service.priceType === 'STARTING_FROM'
        ? `Starting from ${service.priceValue}`
        : 'Decided after inspection';

  return (
    <div className="panel">
      <h1>{service.name}</h1>
      {service.image && (
        <img src={service.image} alt={service.name} style={{ maxWidth: 360, borderRadius: 6, margin: '12px 0' }} />
      )}
      <p style={{ margin: '12px 0' }}>{service.description}</p>
      {isSocial
        ? <p><strong>Free community initiative</strong> — no charges involved.</p>
        : <p><strong>Price:</strong> {price}</p>}
      {service.coverageArea && <p><strong>Coverage:</strong> {service.coverageArea}</p>}

      {service.gallery?.length > 0 && (
        <div className="row mt">
          {service.gallery.map((g) => (
            <img key={g.id} src={g.image} alt={g.title || ''} style={{ width: 110, height: 80, objectFit: 'cover', borderRadius: 6 }} />
          ))}
        </div>
      )}

      <div className="mt">
        <Link className="btn btn-success" to={`/enquiry?type=SERVICE&serviceId=${service.id}&name=${encodeURIComponent(service.name)}`}>
          {isSocial ? 'Join / Donate on WhatsApp' : 'Enquire on WhatsApp'}
        </Link>
      </div>
    </div>
  );
}
