'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">Vault</span>
        </div>
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign in'}
          </button>
        </form>

        <p className="hint">
          Demo credentials: <code>demo@example.com</code> / <code>password123</code>
        </p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
        :global(body) {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          color: #e8e8f0;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(99, 60, 255, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 80%, rgba(255, 60, 130, 0.08) 0%, transparent 60%),
            #0a0a0f;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 0 1px rgba(99,60,255,0.1), 0 40px 80px rgba(0,0,0,0.5);
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .brand-icon {
          font-size: 1.5rem;
          color: #8b5cf6;
          line-height: 1;
        }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          color: #fff;
        }

        .title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.75rem;
          color: #ffffff;
          line-height: 1.2;
        }
        .subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          margin-top: 0.35rem;
          margin-bottom: 2rem;
        }

        .form { display: flex; flex-direction: column; gap: 1.2rem; }

        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field label {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .field input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field input::placeholder { color: rgba(255,255,255,0.2); }
        .field input:focus {
          border-color: rgba(139, 92, 246, 0.6);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
        }

        .error {
          background: rgba(255, 60, 80, 0.1);
          border: 1px solid rgba(255, 60, 80, 0.25);
          border-radius: 8px;
          padding: 0.65rem 0.9rem;
          font-size: 0.85rem;
          color: #ff6b7a;
        }

        .btn {
          margin-top: 0.4rem;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.85rem;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
        }
        .btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(124, 58, 237, 0.5);
        }
        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hint {
          margin-top: 1.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.25);
          text-align: center;
          line-height: 1.6;
        }
        .hint code {
          font-size: 0.78rem;
          color: rgba(139, 92, 246, 0.8);
          background: rgba(139, 92, 246, 0.08);
          padding: 0.1em 0.35em;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
