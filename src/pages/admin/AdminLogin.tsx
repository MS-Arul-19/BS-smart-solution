import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@bssmartsolution.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    const success = await api.adminLogin(password);
    setLoading(false);

    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Password hint: admin123');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-brand-border shadow-soft space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center mx-auto shadow-soft font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-brand-primary">Admin Portal Login</h2>
          <p className="text-xs text-brand-muted">BS Smart Solution Lead Management Console</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold font-heading text-brand-primary mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="Enter admin password (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-brand-border font-body focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </Button>
        </form>

        <p className="text-[11px] text-center text-brand-muted">
          Demo Credentials: Password is <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">admin123</code>
        </p>

      </div>
    </div>
  );
};
