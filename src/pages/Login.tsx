import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Map username to a dummy email for Supabase Auth
    const email = username === 'ironman' ? 'ironman@portfolio.com' : `${username}@portfolio.com`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid username or password');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base text-fg px-6 py-28 relative overflow-hidden">
      <div className="dotgrid absolute inset-0 opacity-60" aria-hidden />
      
      <div className="relative max-w-md w-full bg-card p-10 rounded-2xl card-shadow-lg transition-all duration-500 hover:card-shadow">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-black tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-sm text-muted">Sign in to edit your portfolio content.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-display text-sm font-bold mb-2 text-fg">Username</label>
            <input
              type="text"
              required
              className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-fg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all card-shadow-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ironman"
            />
          </div>
          <div>
            <label className="block font-display text-sm font-bold mb-2 text-fg">Password</label>
            <input
              type="password"
              required
              className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-fg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all card-shadow-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center rounded-xl bg-ink px-5 py-3.5 font-display text-sm font-bold text-white btn-shadow transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? 'Authenticating...' : 'Sign in to Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="font-mono text-xs text-muted hover:text-accent transition-colors">
            ← Back to live site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
