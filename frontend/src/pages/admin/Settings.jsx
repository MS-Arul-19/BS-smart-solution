import { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/settings', true).then((r) => setSettings(r.data)).catch((e) => setError(e.message));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try {
      const payload = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const res = await api.put('/settings', { settings: payload }, true);
      setSettings(res.data);
      setMsg('Settings saved');
    } catch (err) {
      setError(err.errors?.map((x) => `${x.field}: ${x.message}`).join(' · ') || err.message);
    }
  };

  return (
    <div className="panel" style={{ maxWidth: 560 }}>
      <h1>Settings</h1>
      <form className="form" onSubmit={save}>
        {Object.entries(settings).map(([key, value]) => (
          <div key={key}>
            <label>{key}</label>
            <input value={value} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />
          </div>
        ))}
        {error && <p className="error">{error}</p>}
        {msg && <p className="success-msg">{msg}</p>}
        <button className="btn">Save</button>
      </form>
    </div>
  );
}
