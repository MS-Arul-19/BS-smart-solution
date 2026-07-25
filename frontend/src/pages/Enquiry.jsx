import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';

/**
 * Enquiry form. Submits to the API (lead is stored server-side),
 * then redirects the customer to the returned WhatsApp deep-link.
 */
export default function Enquiry() {
  const [params] = useSearchParams();
  const type = ['PRODUCT', 'SERVICE'].includes(params.get('type')) ? params.get('type') : 'GENERAL';
  const itemName = params.get('name');

  const [form, setForm] = useState({ name: '', phone: '', email: '', quantity: '', message: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const body = {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        message: form.message || undefined,
        quantity: form.quantity || undefined,
        enquiryType: type,
        productId: params.get('productId') ? Number(params.get('productId')) : undefined,
        serviceId: params.get('serviceId') ? Number(params.get('serviceId')) : undefined,
      };
      const res = await api.post('/leads', body);
      if (res.data?.whatsappUrl) {
        window.location.href = res.data.whatsappUrl; // hand off to WhatsApp
      } else {
        setError('Enquiry saved, but WhatsApp redirect is unavailable.');
      }
    } catch (err) {
      setError(err.errors?.map((x) => `${x.field}: ${x.message}`).join(' · ') || err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="panel" style={{ maxWidth: 560 }}>
      <h1>Send Enquiry</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 16 }}>
        {itemName ? `Enquiring about: ${itemName}` : 'General enquiry'} — we will connect with you on WhatsApp.
      </p>
      <form className="form" onSubmit={submit}>
        <div>
          <label>Your name *</label>
          <input value={form.name} onChange={set('name')} required minLength={2} />
        </div>
        <div>
          <label>Phone (WhatsApp) *</label>
          <input value={form.phone} onChange={set('phone')} required placeholder="98765 43210" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={form.email} onChange={set('email')} />
        </div>
        {type === 'PRODUCT' && (
          <div>
            <label>Quantity</label>
            <input value={form.quantity} onChange={set('quantity')} placeholder="e.g. 50 units" />
          </div>
        )}
        <div>
          <label>Message</label>
          <textarea rows={4} value={form.message} onChange={set('message')} />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-success" disabled={sending}>
          {sending ? 'Sending…' : 'Send to WhatsApp'}
        </button>
      </form>
    </div>
  );
}
