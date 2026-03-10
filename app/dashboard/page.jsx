'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">Vault</span>
        </div>
        <button className="logout-btn" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </header>

      <main className="main">
        <div className="badge">✦ Authenticated</div>
        <h1 className="hero">
          Hello,<br />
          <span className="world">World.</span>
        </h1>
        <p className="description">
          You're now inside the protected dashboard. Only authenticated users can see this page.
        </p>

        <div className="cards">
          <div className="stat-card">
            <div className="stat-icon">🔐</div>
            <div className="stat-label">Session</div>
            <div className="stat-value">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-label">User</div>
            <div className="stat-value">demo@example.com</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <div className="stat-label">Route</div>
            <div className="stat-value">Protected</div>
          </div>
        </div>
      </main>

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
          background:
            radial-gradient(ellipse 80% 40% at 50% -10%, rgba(99, 60, 255, 0.18) 0%, transparent 70%),
            #0a0a0f;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(10,10,15,0.8);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .brand-icon { font-size: 1.4rem; color: #8b5cf6; }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: 0.05em;
          color: #fff;
        }

        .logout-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.5rem 1.1rem;
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.2);
        }
        .logout-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .main {
          max-width: 760px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          margin-bottom: 2rem;
        }

        .hero {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 10vw, 6rem);
          line-height: 1.05;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .world {
          background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .description {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 3.5rem;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.5rem 1.25rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(139, 92, 246, 0.25);
        }

        .stat-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.3rem;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
}
